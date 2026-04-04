import { Home, BarChart2, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InsightsCharts } from "@/components/insights-charts";

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

const monthlyData = [
  { month: "Nov 2025", Income: 11200, Expenses: 8900,  Net: 2300  },
  { month: "Dec 2025", Income: 13500, Expenses: 11200, Net: 2300  },
  { month: "Jan 2026", Income: 10800, Expenses: 7600,  Net: 3200  },
  { month: "Feb 2026", Income: 12400, Expenses: 9100,  Net: 3300  },
  { month: "Mar 2026", Income: 14200, Expenses: 10300, Net: 3900  },
  { month: "Apr 2026", Income: 13220, Expenses: 7236,  Net: 5984  },
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
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Insights</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Understand your financial patterns and trends at a glance.
        </p>
      </div>

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

      <InsightsCharts monthlyData={monthlyData} categoryData={categoryData} />
    </div>
  );
}
