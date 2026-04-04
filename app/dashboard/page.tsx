"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, ArrowDownLeft, ArrowUpRight, PiggyBank, Home, BarChart2, Heart, ArrowRight, Sparkles, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BalanceTrendChart } from "@/components/balance-trend-chart";
import { SpendingBreakdownChart } from "@/components/spending-breakdown-chart";
import { transactions } from "@/lib/data";

const stats = [
  { label: "Total Balance",  value: "₹55,083.93", change: "+2.5%",  trend: "up",   sub: "from last month",         icon: DollarSign,    accent: "blue"    },
  { label: "Total Income",   value: "₹13,220.00", change: "+8.1%",  trend: "up",   sub: "from last month",         icon: ArrowUpRight,  accent: "emerald" },
  { label: "Total Expenses", value: "₹7,236.15",  change: "-98.3%", trend: "down", sub: "vs ₹9,152.71 last month", icon: ArrowDownLeft, accent: "rose"    },
  { label: "Savings Rate",   value: "45.3%",      change: "+3.2%",  trend: "up",   sub: "from last month",         icon: PiggyBank,     accent: "violet"  },
];

const accentMap: Record<string, { border: string; iconBg: string; iconColor: string }> = {
  blue:    { border: "border-blue-500/20",    iconBg: "bg-blue-500/10",    iconColor: "text-blue-500"    },
  emerald: { border: "border-emerald-500/20", iconBg: "bg-emerald-500/10", iconColor: "text-emerald-500" },
  rose:    { border: "border-rose-500/20",    iconBg: "bg-rose-500/10",    iconColor: "text-rose-500"    },
  violet:  { border: "border-violet-500/20",  iconBg: "bg-violet-500/10",  iconColor: "text-violet-500"  },
};

const insights = [
  { icon: Home,     accent: "rose",    title: "Highest Spending",   badge: "Housing",   value: "₹26,324.26", note: "Focus on reducing this to save more.", extra: "68% of total expenses",        extraIcon: AlertTriangle, barColor: "bg-rose-500",    barWidth: "68%" },
  { icon: BarChart2,accent: "amber",   title: "Monthly Comparison", badge: "↓ Falling", value: "98.3%",      note: "vs. ₹9,152.71 last month.",           extra: "Expenses dropped significantly", extraIcon: TrendingDown,   barColor: "bg-amber-500",   barWidth: "18%" },
  { icon: Heart,    accent: "emerald", title: "Savings Health",     badge: "HEALTHY",   value: "45.3%",      note: "Great job! Keep it up.",              extra: "Above 40% target",               extraIcon: Sparkles,       barColor: "bg-emerald-500", barWidth: "45%" },
];

const insightAccent: Record<string, { border: string; iconBg: string; iconColor: string; badgeClass: string; valueColor: string; extraColor: string }> = {
  rose:    { border: "border-rose-500/20",    iconBg: "bg-rose-500/10",    iconColor: "text-rose-500",    badgeClass: "bg-rose-500/10 text-rose-500 border-rose-500/20",       valueColor: "text-rose-500",    extraColor: "text-rose-500"    },
  amber:   { border: "border-amber-500/20",   iconBg: "bg-amber-500/10",   iconColor: "text-amber-500",   badgeClass: "bg-amber-500/10 text-amber-500 border-amber-500/20",     valueColor: "text-amber-500",   extraColor: "text-amber-500"   },
  emerald: { border: "border-emerald-500/20", iconBg: "bg-emerald-500/10", iconColor: "text-emerald-500", badgeClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20", valueColor: "text-emerald-500", extraColor: "text-emerald-500" },
};

const recent = transactions.slice(0, 6);

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, Mukul 👋</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Here&apos;s your financial overview for April 2026.</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s, i) => {
          const a = accentMap[s.accent];
          return (
            <div key={s.label} className={`rounded-xl border ${a.border} bg-card p-4 sm:p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
                <div className={`p-1.5 rounded-lg ${a.iconBg}`}><s.icon className={`h-4 w-4 ${a.iconColor}`} /></div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold tracking-tight">{s.value}</div>
              <div className="flex items-center gap-1 mt-1.5">
                {s.trend === "up" ? <TrendingUp className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> : <TrendingDown className="h-3.5 w-3.5 text-rose-500 shrink-0" />}
                <span className={`text-sm font-semibold ${s.trend === "up" ? "text-emerald-500" : "text-rose-500"}`}>{s.change}</span>
                <span className="text-sm text-muted-foreground truncate">{s.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-wider mb-3">Recent Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {insights.map((ins, i) => {
            const a = insightAccent[ins.accent];
            return (
              <div key={ins.title} className={`rounded-xl border ${a.border} bg-card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: `${(i + 4) * 60}ms` }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${a.iconBg}`}><ins.icon className={`h-4 w-4 ${a.iconColor}`} /></div>
                    <span className="text-base font-semibold">{ins.title}</span>
                  </div>
                  <span className={`text-sm font-medium px-2 py-0.5 rounded-full border ${a.badgeClass}`}>{ins.badge}</span>
                </div>
                <div className={`text-2xl font-bold ${a.valueColor} mb-1`}>{ins.value}</div>
                <p className="text-sm text-muted-foreground mb-4">{ins.note}</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <ins.extraIcon className={`h-3.5 w-3.5 ${a.extraColor}`} /><span>{ins.extra}</span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                    <div className={`h-full ${ins.barColor} rounded-full transition-all duration-700`} style={{ width: mounted ? ins.barWidth : "0%", transitionDelay: `${i * 100 + 400}ms` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-wider">Recent Transactions</h2>
          <Button variant="ghost" size="sm" className="text-sm gap-1 hover:text-primary" asChild>
            <Link href="/transactions">Show All <ArrowRight className="h-3 w-3" /></Link>
          </Button>
        </div>
        <div className="rounded-xl border border-border overflow-hidden">
          {recent.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between px-4 py-3 hover:bg-muted/40 transition-colors border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg ${tx.type === "credit" ? "bg-emerald-500/10" : "bg-rose-500/10"}`}>
                  {tx.type === "credit" ? <TrendingUp className="h-3.5 w-3.5 text-emerald-500" /> : <TrendingDown className="h-3.5 w-3.5 text-rose-500" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{tx.description}</p>
                  <p className="text-xs text-muted-foreground">{tx.date} · {tx.category}</p>
                </div>
              </div>
              <span className={`text-sm font-bold tabular-nums ${tx.type === "credit" ? "text-emerald-500" : "text-rose-500"}`}>
                {tx.type === "credit" ? "+" : "−"}₹{tx.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
