"use client";

import { useState, useMemo } from "react";
import { transactions, type Transaction } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRole } from "@/lib/role-context";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  PlusIcon,
  DownloadIcon,
  MoreHorizontalIcon,
  EditIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowUpDownIcon,
  FilterIcon,
  XIcon,
  Columns2Icon,
  ArrowUpIcon as SortAscIcon,
  ArrowDownIcon as SortDescIcon,
} from "lucide-react";

const ITEMS_PER_PAGE = 10;

type SortField = "date" | "description" | "category" | "type" | "amount";
type SortOrder = "asc" | "desc";

export default function TransactionsPage() {
  const { role } = useRole();
  const isAdmin = role === "Admin";
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    type: "credit" as "credit" | "debit",
    amount: "",
  });

  // Filter states
  const [typeFilter, setTypeFilter] = useState<"all" | "credit" | "debit">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [dateFromFilter, setDateFromFilter] = useState<string>("");
  const [dateToFilter, setDateToFilter] = useState<string>("");
  const [amountMinFilter, setAmountMinFilter] = useState<string>("");
  const [amountMaxFilter, setAmountMaxFilter] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [showColumns, setShowColumns] = useState(false);

  type ColKey = "date" | "description" | "category" | "type" | "amount";
  const [visibleCols, setVisibleCols] = useState<Record<ColKey, boolean>>({
    date: true, description: true, category: true, type: true, amount: true,
  });
  const toggleCol = (col: ColKey) =>
    setVisibleCols((prev) => ({ ...prev, [col]: !prev[col] }));

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    const filtered = transactions.filter((transaction) => {
      // Search filter
      const matchesSearch = searchTerm === "" ||
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase());

      // Type filter
      const matchesType = typeFilter === "all" || transaction.type === typeFilter;

      // Category filter
      const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter;

      // Date range filter
      const transactionDate = new Date(transaction.date);
      const matchesDateFrom = dateFromFilter === "" || transactionDate >= new Date(dateFromFilter);
      const matchesDateTo = dateToFilter === "" || transactionDate <= new Date(dateToFilter);

      // Amount range filter
      const matchesAmountMin = amountMinFilter === "" || transaction.amount >= parseFloat(amountMinFilter);
      const matchesAmountMax = amountMaxFilter === "" || transaction.amount <= parseFloat(amountMaxFilter);

      return matchesSearch && matchesType && matchesCategory && matchesDateFrom && matchesDateTo && matchesAmountMin && matchesAmountMax;
    });

    // Sort the filtered transactions
    filtered.sort((a, b) => {
      let aValue: string | number | Date = a[sortBy];
      let bValue: string | number | Date = b[sortBy];

      // Special handling for amount (convert to number)
      if (sortBy === "amount") {
        aValue = a.amount;
        bValue = b.amount;
      }

      // Special handling for date (convert to Date object)
      if (sortBy === "date") {
        aValue = new Date(a.date);
        bValue = new Date(b.date);
      }

      if (aValue < bValue) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, sortBy, sortOrder, typeFilter, categoryFilter, dateFromFilter, dateToFilter, amountMinFilter, amountMaxFilter]);

  // Get unique categories for filter dropdown
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(transactions.map(t => t.category)));
    return uniqueCategories.sort();
  }, []);

  // Clear all filters
  const clearFilters = () => {
    setTypeFilter("all");
    setCategoryFilter("all");
    setDateFromFilter("");
    setDateToFilter("");
    setAmountMinFilter("");
    setAmountMaxFilter("");
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Check if any filters are active
  const hasActiveFilters = searchTerm !== "" || typeFilter !== "all" || categoryFilter !== "all" ||
    dateFromFilter !== "" || dateToFilter !== "" || amountMinFilter !== "" || amountMaxFilter !== "";
  const activeFilterCount = [typeFilter !== "all", categoryFilter !== "all", dateFromFilter !== "", dateToFilter !== "", amountMinFilter !== "", amountMaxFilter !== ""].filter(Boolean).length;
  const totalPages = Math.ceil(filteredAndSortedTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedTransactions, currentPage]);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Date", "Description", "Category", "Type", "Amount"];
    const csvContent = [
      headers.join(","),
      ...filteredAndSortedTransactions.map((transaction) =>
        [
          transaction.date,
          `"${transaction.description}"`,
          transaction.category,
          transaction.type,
          transaction.amount.toFixed(2),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle add transaction
  const handleAddTransaction = () => {
    // In a real app, this would make an API call
    console.log("Adding transaction:", formData);
    setIsAddDialogOpen(false);
    resetForm();
  };

  // Handle edit transaction
  const handleEditTransaction = () => {
    // In a real app, this would make an API call
    console.log("Editing transaction:", editingTransaction?.id, formData);
    setIsEditDialogOpen(false);
    setEditingTransaction(null);
    resetForm();
  };

  // Open edit dialog
  const openEditDialog = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      date: transaction.date,
      description: transaction.description,
      category: transaction.category,
      type: transaction.type,
      amount: transaction.amount.toString(),
    });
    setIsEditDialogOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      date: "",
      description: "",
      category: "",
      type: "credit",
      amount: "",
    });
  };

  // Render sort icon
  const renderSortIcon = (field: SortField) => {
    if (sortBy !== field) {
      return <ArrowUpDownIcon className="h-4 w-4 ml-1 opacity-50" />;
    }
    return sortOrder === "asc" ?
      <SortAscIcon className="h-4 w-4 ml-1" /> :
      <SortDescIcon className="h-4 w-4 ml-1" />;
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Transactions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            View and manage all your financial transactions.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          {isAdmin && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Transaction
                </Button>
              </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Transaction</DialogTitle>
                <DialogDescription>
                  Add a new transaction to your records.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: "credit" | "debit") =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit">Credit</SelectItem>
                      <SelectItem value="debit">Debit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddTransaction}>Add Transaction</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          )}
        </div>
      </div>

      {/* Search + Filter + Columns */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter popover */}
        <Popover open={showFilters} onOpenChange={setShowFilters}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="relative gap-1.5">
              <FilterIcon className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" sideOffset={6} className="w-72 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Filters</span>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-0.5">
                  <XIcon className="h-3 w-3" /> Clear all
                </button>
              )}
            </div>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label className="text-xs">Type</Label>
                <Select value={typeFilter} onValueChange={(v: "all" | "credit" | "debit") => setTypeFilter(v)}>
                  <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="credit">Credit</SelectItem>
                    <SelectItem value="debit">Debit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Category</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Date From</Label>
                  <Input type="date" className="h-7 text-xs" value={dateFromFilter} onChange={(e) => setDateFromFilter(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Date To</Label>
                  <Input type="date" className="h-7 text-xs" value={dateToFilter} onChange={(e) => setDateToFilter(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Min $</Label>
                  <Input type="number" step="0.01" placeholder="0.00" className="h-7 text-xs" value={amountMinFilter} onChange={(e) => setAmountMinFilter(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Max $</Label>
                  <Input type="number" step="0.01" placeholder="0.00" className="h-7 text-xs" value={amountMaxFilter} onChange={(e) => setAmountMaxFilter(e.target.value)} />
                </div>
              </div>
            </div>
            <Button size="sm" className="w-full mt-3 h-7 text-xs" onClick={() => setShowFilters(false)}>Apply</Button>
          </PopoverContent>
        </Popover>

        {/* Columns popover */}
        <Popover open={showColumns} onOpenChange={setShowColumns}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Columns2Icon className="h-4 w-4" />
              Columns
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" sideOffset={6} className="w-44 p-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground block mb-2">Columns</span>
            <div className="space-y-1.5">
              {(["date", "description", "category", "type", "amount"] as ColKey[]).map((col) => (
                <label key={col} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visibleCols[col]}
                    onChange={() => toggleCol(col)}
                    className="rounded border-input accent-primary"
                  />
                  <span className="text-sm capitalize">{col}</span>
                </label>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Transactions Table */}
      <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleCols.date && <TableHead><Button variant="ghost" onClick={() => handleSort("date")} className="h-auto p-0 font-medium hover:bg-transparent">Date{renderSortIcon("date")}</Button></TableHead>}
              {visibleCols.description && <TableHead><Button variant="ghost" onClick={() => handleSort("description")} className="h-auto p-0 font-medium hover:bg-transparent">Description{renderSortIcon("description")}</Button></TableHead>}
              {visibleCols.category && <TableHead><Button variant="ghost" onClick={() => handleSort("category")} className="h-auto p-0 font-medium hover:bg-transparent">Category{renderSortIcon("category")}</Button></TableHead>}
              {visibleCols.type && <TableHead><Button variant="ghost" onClick={() => handleSort("type")} className="h-auto p-0 font-medium hover:bg-transparent">Type{renderSortIcon("type")}</Button></TableHead>}
              {visibleCols.amount && <TableHead className="text-right"><Button variant="ghost" onClick={() => handleSort("amount")} className="h-auto p-0 font-medium hover:bg-transparent">Amount{renderSortIcon("amount")}</Button></TableHead>}
              {isAdmin && <TableHead className="w-[50px]" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-accent/30 transition-colors group">
                {visibleCols.date && <TableCell>{transaction.date}</TableCell>}
                {visibleCols.description && <TableCell>{transaction.description}</TableCell>}
                {visibleCols.category && <TableCell>{transaction.category}</TableCell>}
                {visibleCols.type && (
                  <TableCell>
                    <Badge variant={transaction.type === "credit" ? "default" : "secondary"}>{transaction.type}</Badge>
                  </TableCell>
                )}
                {visibleCols.amount && (
                  <TableCell className="text-right font-medium">
                    <div className="flex items-center justify-end gap-1">
                      {transaction.type === "credit" ? (
                        <><ArrowUpIcon className="h-4 w-4 text-emerald-500" /><span className="font-bold text-emerald-500">+₹{transaction.amount.toFixed(2)}</span></>
                      ) : (
                        <><ArrowDownIcon className="h-4 w-4 text-rose-500" /><span className="font-bold text-rose-500">−₹{transaction.amount.toFixed(2)}</span></>
                      )}
                    </div>
                  </TableCell>
                )}
                {isAdmin && (
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm"><MoreHorizontalIcon className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(transaction)}>
                          <EditIcon className="h-4 w-4 mr-2" />Edit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedTransactions.length)} of{" "}
            {filteredAndSortedTransactions.length} transactions
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon className="h-4 w-4" />
              Previous
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
            <DialogDescription>
              Make changes to your transaction.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-date" className="text-right">
                Date
              </Label>
              <Input
                id="edit-date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">
                Description
              </Label>
              <Input
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-category" className="text-right">
                Category
              </Label>
              <Input
                id="edit-category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-type" className="text-right">
                Type
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value: "credit" | "debit") =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit">Credit</SelectItem>
                  <SelectItem value="debit">Debit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-amount" className="text-right">
                Amount
              </Label>
              <Input
                id="edit-amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEditTransaction}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
