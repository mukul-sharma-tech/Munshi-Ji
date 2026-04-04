import Link from "next/link";
import {
  TrendingUp, TrendingDown, DollarSign, ArrowDownLeft, ArrowUpRight, PiggyBank,
  Home, AlertTriangle, BarChart2, Heart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BalanceTrendChart } from "@/components/balance-trend-chart";
import { SpendingBreakdownChart } from "@/components/spending-breakdown-chart";
import { transactions } from "@/lib/data";

const stats = [
  {
    label: "Total Balance",
    value: "$55,083.93",
    change: "+2.5%",
    trend: "up",
    sub: "from last month",
    icon: DollarSign,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Total Income",
    value: "$13,220.00",
    change: "+8.1%",
    trend: "up",
    sub: "from last month",
    icon: ArrowUpRight,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Total Expenses",
    value: "$7,236.15",
    change: "-98.3%",
    trend: "down",
    sub: "vs $9,152.71 last month",
    icon: ArrowDownLeft,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    label: "Savings Rate",
    value: "45.3%",
    change: "+3.2%",
    trend: "up",
    sub: "from last month",
    icon: PiggyBank,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
];

const insights = [
  {
    icon: Home,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-500/10",
    title: "Highest Spending",
    badge: "Your top expense is Housing.",
    badgeVariant: "destructive" as const,
    value: "$26,324.26",
    note: "Focus on reducing this to save more.",
  },
  {
    icon: BarChart2,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    title: "Monthly Comparison",
    badge: "Falling",
    badgeVariant: "secondary" as const,
    value: "Expenses decreased by 98.3%",
    note: "vs. $9,152.71 last month.",
  },
  {
    icon: Heart,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    title: "Savings Health",
    badge: "HEALTHY",
    badgeVariant: "outline" as const,
    value: "Your current savings rate is 45.3%",
    note: "Great job! Keep it up.",
  },
];

const recent = transactions.slice(0, 6);

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back, Mukul Sharma</h1>
        <p className="text-sm text-muted-foreground mt-1">Here&apos;s your financial overview for June 2024.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <div className={`p-2 rounded-lg ${s.bg}`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {s.trend === "up" ? (
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-rose-500" />
                )}
                <span className={`text-xs font-medium ${s.trend === "up" ? "text-emerald-500" : "text-rose-500"}`}>
                  {s.change}
                </span>
                <span className="text-xs text-muted-foreground">{s.sub}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Insights */}
      <div>
        <h2 className="text-base font-semibold mb-3">Recent Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {insights.map((ins) => (
            <Card key={ins.title}>
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <div className={`p-2 rounded-lg ${ins.iconBg}`}>
                  <ins.icon className={`h-4 w-4 ${ins.iconColor}`} />
                </div>
                <CardTitle className="text-sm font-medium">{ins.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <Badge variant={ins.badgeVariant} className="text-xs">{ins.badge}</Badge>
                <p className="text-base font-semibold">{ins.value}</p>
                <p className="text-xs text-muted-foreground">&quot;{ins.note}&quot;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold">Recent Transactions</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/transactions">Show All</Link>
          </Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recent.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-full ${tx.type === "credit" ? "bg-emerald-500/10" : "bg-rose-500/10"}`}>
                      {tx.type === "credit"
                        ? <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                        : <TrendingDown className="h-3.5 w-3.5 text-rose-500" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">{tx.date} · {tx.category}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-semibold ${tx.type === "credit" ? "text-emerald-500" : "text-rose-500"}`}>
                    {tx.type === "credit" ? "+" : "-"}${tx.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
