"use client";

import { useEffect, useState } from "react";
import { Home, BarChart2, Heart, TrendingDown, Sparkles, AlertTriangle } from "lucide-react";
import { InsightsCharts } from "@/components/insights-charts";

const insights = [
  {
    icon: Home, accent: "rose",
    title: "Highest Spending", badge: "Housing",
    value: "₹26,324.26", note: "Focus on reducing this to save more.",
    extra: "68% of total expenses", extraIcon: AlertTriangle,
    barColor: "bg-rose-500", barWidth: "68%",
  },
  {
    icon: BarChart2, accent: "amber",
    title: "Monthly Comparison", badge: "↓ Falling",
    value: "98.3%", note: "vs. ₹9,152.71 last month.",
    extra: "Expenses dropped significantly", extraIcon: TrendingDown,
    barColor: "bg-amber-500", barWidth: "18%",
  },
  {
    icon: Heart, accent: "emerald",
    title: "Savings Health", badge: "HEALTHY",
    value: "45.3%", note: "Great job! Keep it up.",
    extra: "Above 40% target", extraIcon: Sparkles,
    barColor: "bg-emerald-500", barWidth: "45%",
  },
];

const accentMap: Record<string, { border: string; iconBg: string; iconColor: string; badgeClass: string; valueColor: string; extraColor: string }> = {
  rose:    { border: "border-rose-500/20",    iconBg: "bg-rose-500/10",    iconColor: "text-rose-500",    badgeClass: "bg-rose-500/10 text-rose-500 border-rose-500/20",       valueColor: "text-rose-500",    extraColor: "text-rose-500"    },
  amber:   { border: "border-amber-500/20",   iconBg: "bg-amber-500/10",   iconColor: "text-amber-500",   badgeClass: "bg-amber-500/10 text-amber-500 border-amber-500/20",     valueColor: "text-amber-500",   extraColor: "text-amber-500"   },
  emerald: { border: "border-emerald-500/20", iconBg: "bg-emerald-500/10", iconColor: "text-emerald-500", badgeClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20", valueColor: "text-emerald-500", extraColor: "text-emerald-500" },
};

const monthlyData = [
  { month: "Nov 2025", Income: 11200, Expenses: 8900,  Net: 2300 },
  { month: "Dec 2025", Income: 13500, Expenses: 11200, Net: 2300 },
  { month: "Jan 2026", Income: 10800, Expenses: 7600,  Net: 3200 },
  { month: "Feb 2026", Income: 12400, Expenses: 9100,  Net: 3300 },
  { month: "Mar 2026", Income: 14200, Expenses: 10300, Net: 3900 },
  { month: "Apr 2026", Income: 13220, Expenses: 7236,  Net: 5984 },
];

const categoryData = [
  { name: "Housing",       value: 26324 },
  { name: "Food",          value: 4820  },
  { name: "Shopping",      value: 3200  },
  { name: "Health",        value: 1200  },
  { name: "Transport",     value: 1840  },
  { name: "Entertainment", value: 980   },
];

export default function InsightsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Insights</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Understand your financial patterns and trends at a glance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {insights.map((ins, i) => {
          const a = accentMap[ins.accent];
          return (
            <div
              key={ins.title}
              className={`rounded-xl border ${a.border} bg-card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${a.iconBg}`}>
                    <ins.icon className={`h-4 w-4 ${a.iconColor}`} />
                  </div>
                  <span className="text-base font-semibold">{ins.title}</span>
                </div>
                <span className={`text-sm font-medium px-2 py-0.5 rounded-full border ${a.badgeClass}`}>{ins.badge}</span>
              </div>

              <div className={`text-2xl font-bold ${a.valueColor} mb-1`}>{ins.value}</div>
              <p className="text-sm text-muted-foreground mb-4">{ins.note}</p>

              <div className="space-y-1">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <ins.extraIcon className={`h-3.5 w-3.5 ${a.extraColor}`} />
                  <span>{ins.extra}</span>
                </div>
                <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full ${ins.barColor} rounded-full transition-all duration-700`}
                    style={{ width: mounted ? ins.barWidth : "0%", transitionDelay: `${i * 100 + 300}ms` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <InsightsCharts monthlyData={monthlyData} categoryData={categoryData} />
    </div>
  );
}
