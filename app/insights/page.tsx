"use client";

import { useEffect, useState } from "react";
import { Home, BarChart2, Heart, TrendingDown, Sparkles, AlertTriangle } from "lucide-react";
import { InsightsCharts } from "@/components/insights-charts";

const insights = [
  { icon: Home,      title: "Highest Spending",   badge: "Housing",  badgeCls: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400",    value: "₹26,324.26", valueCls: "text-rose-600 dark:text-rose-400",    note: "Top expense · 68% of total",          extraIcon: AlertTriangle, extraCls: "text-rose-500", bar: "bg-rose-500",    barW: "68%" },
  { icon: BarChart2, title: "Monthly Comparison", badge: "Falling",  badgeCls: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",  value: "−98.3%",     valueCls: "text-amber-600 dark:text-amber-400",  note: "vs ₹9,152.71 last month",             extraIcon: TrendingDown,  extraCls: "text-amber-500", bar: "bg-amber-500",   barW: "18%" },
  { icon: Heart,     title: "Savings Health",     badge: "Healthy",  badgeCls: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400", value: "45.3%", valueCls: "text-emerald-600 dark:text-emerald-400", note: "Above 40% target · on track",       extraIcon: Sparkles,      extraCls: "text-emerald-500", bar: "bg-emerald-500", barW: "45%" },
];

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
    <div className="p-4 sm:p-6 space-y-5">
      <div>
        <h1 className="text-lg font-semibold">Insights</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Financial patterns and trends · April 2026</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {insights.map((ins, i) => (
          <div
            key={ins.title}
            className={`rounded-md border border-border bg-card p-3 sm:p-4 transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <ins.icon size={14} className="text-slate-500" />
                <span className="text-xs font-medium">{ins.title}</span>
              </div>
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${ins.badgeCls}`}>{ins.badge}</span>
            </div>
            <div className={`text-xl font-semibold tabular-nums ${ins.valueCls} mb-0.5`}>{ins.value}</div>
            <p className="text-xs text-muted-foreground mb-2">{ins.note}</p>
            <div className="flex items-center gap-1 mb-1">
              <ins.extraIcon size={11} className={ins.extraCls} />
              <span className="text-[10px] text-muted-foreground">{ins.note}</span>
            </div>
            <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full ${ins.bar} rounded-full transition-all duration-700`}
                style={{ width: mounted ? ins.barW : "0%", transitionDelay: `${i * 80 + 200}ms` }}
              />
            </div>
          </div>
        ))}
      </div>

      <InsightsCharts monthlyData={monthlyData} categoryData={categoryData} />
    </div>
  );
}
