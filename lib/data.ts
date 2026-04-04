export type Transaction = {
  id: string;
  date: string;
  description: string;
  type: "credit" | "debit";
  amount: number;
  category: string;
};

export const transactions: Transaction[] = [
  { id: "1", date: "2026-03-28", description: "Salary Deposit", type: "credit", amount: 8500.00, category: "Income" },
  { id: "2", date: "2026-03-27", description: "Rent Payment", type: "debit", amount: 2200.00, category: "Housing" },
  { id: "3", date: "2026-03-26", description: "Freelance Payment", type: "credit", amount: 1250.00, category: "Income" },
  { id: "4", date: "2026-03-25", description: "Grocery Store", type: "debit", amount: 184.50, category: "Food" },
  { id: "5", date: "2026-03-24", description: "Netflix Subscription", type: "debit", amount: 15.99, category: "Entertainment" },
  { id: "6", date: "2026-03-23", description: "Electricity Bill", type: "debit", amount: 112.00, category: "Utilities" },
  { id: "7", date: "2026-03-22", description: "Dividend Income", type: "credit", amount: 340.00, category: "Investment" },
  { id: "8", date: "2026-03-21", description: "Restaurant Dinner", type: "debit", amount: 78.40, category: "Food" },
  { id: "9", date: "2026-03-20", description: "Gym Membership", type: "debit", amount: 49.99, category: "Health" },
  { id: "10", date: "2026-03-19", description: "Amazon Purchase", type: "debit", amount: 234.99, category: "Shopping" },
  { id: "11", date: "2026-03-18", description: "Bonus Payment", type: "credit", amount: 2000.00, category: "Income" },
  { id: "12", date: "2026-03-17", description: "Internet Bill", type: "debit", amount: 59.99, category: "Utilities" },
  { id: "13", date: "2026-03-16", description: "Coffee Shop", type: "debit", amount: 12.50, category: "Food" },
  { id: "14", date: "2026-03-15", description: "Uber Ride", type: "debit", amount: 24.80, category: "Transport" },
  { id: "15", date: "2026-03-14", description: "Stock Dividend", type: "credit", amount: 180.00, category: "Investment" },
  { id: "16", date: "2026-03-13", description: "Phone Bill", type: "debit", amount: 45.00, category: "Utilities" },
  { id: "17", date: "2026-03-12", description: "Clothing Store", type: "debit", amount: 320.00, category: "Shopping" },
  { id: "18", date: "2026-03-11", description: "Consulting Fee", type: "credit", amount: 950.00, category: "Income" },
  { id: "19", date: "2026-03-10", description: "Fuel", type: "debit", amount: 68.00, category: "Transport" },
  { id: "20", date: "2026-03-09", description: "Medical Checkup", type: "debit", amount: 150.00, category: "Health" },
];
