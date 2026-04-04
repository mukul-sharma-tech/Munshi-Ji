"use client";

import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart";

const chartData = [
  { category: "housing",       amount: 26324, fill: "var(--color-housing)"       },
  { category: "food",          amount: 4820,  fill: "var(--color-food)"          },
  { category: "transport",     amount: 1840,  fill: "var(--color-transport)"     },
  { category: "entertainment", amount: 980,   fill: "var(--color-entertainment)" },
  { category: "health",        amount: 1200,  fill: "var(--color-health)"        },
  { category: "shopping",      amount: 3200,  fill: "var(--color-shopping)"      },
];

const chartConfig = {
  amount:        { label: "Amount"        },
  housing:       { label: "Housing",       color: "#4f46e5" },
  food:          { label: "Food",          color: "#10b981" },
  transport:     { label: "Transport",     color: "#f43f5e" },
  entertainment: { label: "Entertainment", color: "#f59e0b" },
  health:        { label: "Health",        color: "#06b6d4" },
  shopping:      { label: "Shopping",      color: "#8b5cf6" },
} satisfies ChartConfig;

export function SpendingBreakdownChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Spending Breakdown</CardTitle>
        <CardDescription>Major expenditure categories for the current period</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <Pie data={chartData} dataKey="amount" nameKey="category" />
            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/3 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
