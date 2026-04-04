"use client";

import Link from "next/link";
import { TrendingUp, TrendingDown, DollarSign, ArrowDownLeft, ArrowUpRight, PiggyBank, Home, BarChart2, Heart, ArrowRight, Sparkles, AlertTriangle } from "lucide-react";
import { BalanceTrendChart } from "@/components/balance-trend-chart";
import { SpendingBreakdownChart } from "@/components/spending-breakdown-chart";
import { transactions } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Balance",  value: "₹55,083.93", change: "+2.5%",  trend: "up",   sub: "from last month",         icon: DollarSign,    accent: "border-l-blue-500",    iconCls: "text-blue-500"    },
  { label: "Total Income",   value: "₹13,220.00", change: "+8.1%",  trend: "up",   sub: "from last month",         icon: ArrowUpRight,  accent: "border-l-emerald-500", iconCls: "text-emerald-500" },
  { label: "Total Expenses", value: "₹7,236.15",  change: "−98.3%", trend: "down", sub: "vs ₹9,152.71 last month", icon: ArrowDownLeft, accent: "border-l-rose-500",    iconCls: "text-rose-500"    },
  { label: "Savings Rate",   value: "45.3%",       change: "+3.2%",  trend: "up",   sub: "from last month",         icon: PiggyBank,     accent: "border-l-violet-500",  iconCls: "text-violet-500"  },
];

const insights = [
  { icon: Home,      title: "Highest Spending",   badge: "Housing",   badgeCls: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400",   value: "₹26,324.26", valueCls: "text-rose-600 dark:text-rose-400",    note: "Top expense category · 68% of total",  bar: "bg-rose-500",    barW: "68%" },
  { icon: BarChart2, title: "Monthly Comparison", badge: "Falling",   badgeCls: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400", value: "−98.3%",     valueCls: "text-amber-600 dark:text-amber-400",  note: "vs ₹9,152.71 last month",              bar: "bg-amber-500",   barW: "18%" },
  { icon: Heart,     title: "Savings Health",     badge: "Healthy",   badgeCls: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400", value: "45.3%", valueCls: "text-emerald-600 dark:text-emerald-400", note: "Above 40% target · on track",        bar: "bg-emerald-500", barW: "45%" },
];

const recent = transactions.slice(0, 6);

export default function DashboardPage() {
  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Dashboard</h1>
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
          <span>April 2026</span>
          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span>Mukul Sharma</span>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-none border-border/80">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{s.label}</CardTitle>
              <s.icon size={16} className="text-slate-400" />
            </CardHeader>
            <CardContent className="pb-4">
              <div className="text-2xl font-bold tracking-tight">{s.value}</div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className={`flex items-center gap-0.5 text-xs font-semibold ${s.trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>
                  {s.trend === "up" ? <TrendingUp size={12} strokeWidth={2.5} /> : <TrendingDown size={12} strokeWidth={2.5} />}
                  {s.change}
                </span>
                <span className="text-[11px] text-muted-foreground font-medium">{s.sub}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column (Charts) */}
        <div className="xl:col-span-2 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="col-span-1 lg:col-span-2 shadow-none border-border/80">
              <CardHeader>
                <CardTitle>Balance Trend</CardTitle>
                <CardDescription>Visualizing your wealth over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <BalanceTrendChart />
              </CardContent>
            </Card>
            
            <Card className="shadow-none border-border/80">
              <CardHeader>
                <CardTitle>Spending Categories</CardTitle>
                <CardDescription>Breakdown by major expense groups</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex flex-col justify-center">
                <SpendingBreakdownChart />
              </CardContent>
            </Card>

            <Card className="shadow-none border-border/80">
              <CardHeader>
                <CardTitle>Recent Insights</CardTitle>
                <CardDescription>AI-generated financial observations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {insights.map((ins) => (
                  <div key={ins.title} className="group">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <ins.icon size={14} className="text-slate-500" />
                        <span className="text-xs font-semibold text-foreground/80">{ins.title}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border border-current/20 ${ins.badgeCls}`}>{ins.badge}</span>
                    </div>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className={`text-base font-bold tabular-nums ${ins.valueCls}`}>{ins.value}</span>
                      <span className="text-[10px] text-muted-foreground font-medium">{ins.note}</span>
                    </div>
                    <div className="h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className={`h-full ${ins.bar} rounded-full transition-all duration-500`} style={{ width: ins.barW }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column (Transactions + Info) */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="shadow-none border-border/80">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Last 7 days of activity</CardDescription>
              </div>
              <Button variant="ghost" size="xs" asChild className="text-muted-foreground hover:text-foreground -mr-2">
                <Link href="/transactions">
                  View All <ArrowRight size={12} className="ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/60">
                {recent.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 border ${tx.type === "credit" ? "bg-emerald-50/50 border-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20" : "bg-rose-50/50 border-rose-100 text-rose-600 dark:bg-rose-500/10 dark:border-rose-500/20"}`}>
                        {tx.type === "credit" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">{tx.description}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{tx.date} · {tx.category}</p>
                      </div>
                    </div>
                    <div className="text-right ml-3">
                      <span className={`text-sm font-bold tabular-nums ${tx.type === "credit" ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
                        {tx.type === "credit" ? "+" : ""}₹{tx.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 pt-2">
                <Button variant="outline" className="w-full text-xs font-semibold h-9" asChild>
                  <Link href="/transactions">View More History</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* New Minimal Info Section */}
          <Card className="shadow-none border-border/80 bg-slate-50/50 dark:bg-slate-900/10">
            <CardHeader className="py-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <Sparkles size={16} className="text-primary" />
                Smart Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pb-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Monthly Spending Limit</span>
                  <span className="text-foreground">₹42,300 / ₹65,000</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: "65%" }} />
                </div>
              </div>

              <div className="pt-2">
                <div className="rounded-md border border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-950 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                      <Heart size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-bold">Auto-Savings Active</p>
                      <p className="text-[10px] text-muted-foreground">₹2.5k saved this month</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="xs" className="h-7 text-[10px] font-bold">Manage</Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold gap-2">
                  <AlertTriangle size={12} className="text-amber-500" />
                  Audit Log
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold gap-2">
                  <BarChart2 size={12} className="text-blue-500" />
                  Limits
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
