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
  Card,
} from "@/components/ui/card";
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
  
  // Local state for transactions to allow mutations (Add/Edit/Delete)
  const [localTransactions, setLocalTransactions] = useState<Transaction[]>(transactions);
  
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

  type ColKey = "date" | "description" | "category" | "type" | "amount";
  const [visibleCols, setVisibleCols] = useState<Record<ColKey, boolean>>({
    date: true, description: true, category: true, type: true, amount: true,
  });

  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    const filtered = [...localTransactions].filter((transaction) => {
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

      if (sortBy === "amount") {
        aValue = a.amount;
        bValue = b.amount;
      }

      if (sortBy === "date") {
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
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
  }, [localTransactions, searchTerm, sortBy, sortOrder, typeFilter, categoryFilter, dateFromFilter, dateToFilter, amountMinFilter, amountMaxFilter]);

  // Get unique categories for filter dropdown
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(localTransactions.map(t => t.category)));
    return uniqueCategories.sort();
  }, [localTransactions]);

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

  const [showFilters, setShowFilters] = useState(false);
  const [showColumns, setShowColumns] = useState(false);

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
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      date: formData.date || new Date().toISOString().split("T")[0],
      description: formData.description,
      category: formData.category,
      type: formData.type,
      amount: parseFloat(formData.amount) || 0,
    };
    
    setLocalTransactions((prev) => [newTransaction, ...prev]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  // Handle edit transaction
  const handleEditTransaction = () => {
    if (!editingTransaction) return;
    
    setLocalTransactions((prev) => 
      prev.map((t) => 
        t.id === editingTransaction.id 
          ? { 
              ...t, 
              date: formData.date, 
              description: formData.description, 
              category: formData.category, 
              type: formData.type, 
              amount: parseFloat(formData.amount) || 0 
            } 
          : t
      )
    );
    setIsEditDialogOpen(false);
    setEditingTransaction(null);
    resetForm();
  };

  // Handle delete transaction
  const handleDeleteTransaction = (id: string) => {
    setLocalTransactions((prev) => prev.filter((t) => t.id !== id));
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
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">Transactions</h1>
          <p className="text-xs text-muted-foreground font-medium">Manage and audit your full financial history across all accounts.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={exportToCSV} variant="outline" size="default" className="shadow-none">
            <DownloadIcon size={16} className="text-slate-500 mr-2" />
            Export CSV
          </Button>
          {isAdmin && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="default" className="shadow-none font-semibold">
                  <PlusIcon size={16} className="mr-2" />
                  Add Transaction
                </Button>
              </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Transaction</DialogTitle>
                <DialogDescription>
                  Enter the details for a new financial record.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="date" className="text-xs font-semibold">Date</Label>
                  <Input id="date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description" className="text-xs font-semibold">Description</Label>
                  <Input id="description" placeholder="e.g. Starbucks Coffee" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category" className="text-xs font-semibold">Category</Label>
                  <Input id="category" placeholder="e.g. Food & Drink" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type" className="text-xs font-semibold">Type</Label>
                    <Select value={formData.type} onValueChange={(value: "credit" | "debit") => setFormData({ ...formData, type: value })}>
                      <SelectTrigger id="type"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit">Income</SelectItem>
                        <SelectItem value="debit">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount" className="text-xs font-semibold">Amount</Label>
                    <Input id="amount" type="number" step="0.01" placeholder="0.00" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="h-9">Cancel</Button>
                <Button onClick={handleAddTransaction} className="h-9 font-semibold">Save Transaction</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          )}
        </div>
      </div>

      {/* Search + Filter + Columns */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1 group">
          <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Filter transactions by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-9 border-slate-200 focus-visible:ring-offset-0"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Filter popover */}
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="default" className="h-9 relative gap-2 border-slate-200">
                <FilterIcon size={16} className="text-slate-500" />
                <span className="text-xs font-semibold">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ml-1">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" sideOffset={8} className="w-80 p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Advanced Filters</span>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1">
                    <XIcon size={12} /> Clear all
                  </button>
                )}
              </div>
              <div className="grid gap-4">
                <div className="grid gap-1.5">
                  <Label className="text-xs font-semibold">Transaction Type</Label>
                  <Select value={typeFilter} onValueChange={(v: "all" | "credit" | "debit") => setTypeFilter(v)}>
                    <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="credit">Income Only</SelectItem>
                      <SelectItem value="debit">Expenses Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <Label className="text-xs font-semibold">Category</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <Label className="text-xs font-semibold">From Date</Label>
                    <Input type="date" className="h-8 text-xs" value={dateFromFilter} onChange={(e) => setDateFromFilter(e.target.value)} />
                  </div>
                  <div className="grid gap-1.5">
                    <Label className="text-xs font-semibold">To Date</Label>
                    <Input type="date" className="h-8 text-xs" value={dateToFilter} onChange={(e) => setDateToFilter(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 h-8 text-xs" onClick={() => setShowFilters(false)}>Cancel</Button>
                <Button size="sm" className="flex-1 h-8 text-xs font-semibold" onClick={() => setShowFilters(false)}>Apply Filters</Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Columns popover */}
          <Popover open={showColumns} onOpenChange={setShowColumns}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="default" className="h-9 gap-2 border-slate-200">
                <Columns2Icon size={16} className="text-slate-500" />
                <span className="text-xs font-semibold">View</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" sideOffset={8} className="w-48 p-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-3">Visible Columns</span>
              <div className="grid gap-2">
                {(["date", "description", "category", "type", "amount"] as ColKey[]).map((col) => (
                  <label key={col} className="flex items-center gap-2.5 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={visibleCols[col]}
                        onChange={() => toggleCol(col)}
                        className="peer h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary accent-primary cursor-pointer transition-all"
                      />
                    </div>
                    <span className="text-xs font-medium capitalize text-slate-600 group-hover:text-foreground transition-colors">{col}</span>
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Transactions Table wrapped in Card */}
      <Card className="overflow-hidden border-border/80 shadow-none">
        <Table>
          <TableHeader className="bg-slate-50/50 dark:bg-slate-900/20">
            <TableRow className="hover:bg-transparent border-b">
              {visibleCols.date && <TableHead className="py-2.5"><Button variant="ghost" onClick={() => handleSort("date")} className="h-auto p-0 text-[11px] font-bold uppercase tracking-wider hover:bg-transparent text-muted-foreground">Date{renderSortIcon("date")}</Button></TableHead>}
              {visibleCols.description && <TableHead className="py-2.5"><Button variant="ghost" onClick={() => handleSort("description")} className="h-auto p-0 text-[11px] font-bold uppercase tracking-wider hover:bg-transparent text-muted-foreground">Description{renderSortIcon("description")}</Button></TableHead>}
              {visibleCols.category && <TableHead className="py-2.5"><Button variant="ghost" onClick={() => handleSort("category")} className="h-auto p-0 text-[11px] font-bold uppercase tracking-wider hover:bg-transparent text-muted-foreground text-center flex justify-center">Category{renderSortIcon("category")}</Button></TableHead>}
              {visibleCols.type && <TableHead className="py-2.5"><Button variant="ghost" onClick={() => handleSort("type")} className="h-auto p-0 text-[11px] font-bold uppercase tracking-wider hover:bg-transparent text-muted-foreground text-center flex justify-center">Type{renderSortIcon("type")}</Button></TableHead>}
              {visibleCols.amount && <TableHead className="py-2.5 text-right"><Button variant="ghost" onClick={() => handleSort("amount")} className="h-auto p-0 text-[11px] font-bold uppercase tracking-wider hover:bg-transparent text-muted-foreground ml-auto flex justify-end">Amount{renderSortIcon("amount")}</Button></TableHead>}
              {isAdmin && <TableHead className="w-12" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors group">
                {visibleCols.date && <TableCell className="text-xs font-medium text-slate-500">{transaction.date}</TableCell>}
                {visibleCols.description && (
                  <TableCell>
                    <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{transaction.description}</span>
                  </TableCell>
                )}
                {visibleCols.category && (
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="bg-slate-100/80 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-none px-2">{transaction.category}</Badge>
                  </TableCell>
                )}
                {visibleCols.type && (
                  <TableCell className="text-center">
                    <Badge variant={transaction.type === "credit" ? "success" : "secondary"} className="uppercase tracking-tighter">
                      {transaction.type}
                    </Badge>
                  </TableCell>
                )}
                {visibleCols.amount && (
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className={`text-sm font-bold tabular-nums ${transaction.type === "credit" ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
                        {transaction.type === "credit" ? "+" : "−"}₹{transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </TableCell>
                )}
                {isAdmin && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" className="hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-foreground transition-all">
                          <MoreHorizontalIcon size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem onClick={() => openEditDialog(transaction)} className="text-xs gap-2">
                          <EditIcon size={14} className="text-slate-500" />Edit Record
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteTransaction(transaction.id)} 
                          className="text-xs text-rose-600 focus:text-rose-600 gap-2 cursor-pointer"
                        >
                          <XIcon size={14} />Delete Record
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

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
          <div className="flex flex-col gap-3 py-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-date">Date</Label>
              <Input id="edit-date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-description">Description</Label>
              <Input id="edit-description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-category">Category</Label>
              <Input id="edit-category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-type">Type</Label>
              <Select value={formData.type} onValueChange={(value: "credit" | "debit") => setFormData({ ...formData, type: value })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit">Credit</SelectItem>
                  <SelectItem value="debit">Debit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-amount">Amount</Label>
              <Input id="edit-amount" type="number" step="0.01" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
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
