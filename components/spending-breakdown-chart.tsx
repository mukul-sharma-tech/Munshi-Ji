"use client";

import { Pie, PieChart, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart";

const chartData = [
  { category: "housing",       amount: 26324, fill: "#4f46e5" },
  { category: "food",          amount: 4820,  fill: "#10b981" },
  { category: "transport",     amount: 1840,  fill: "#f43f5e" },
  { category: "entertainment", amount: 980,   fill: "#f59e0b" },
  { category: "health",        amount: 1200,  fill: "#06b6d4" },
  { category: "shopping",      amount: 3200,  fill: "#8b5cf6" },
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

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { value: number; name: string; payload: { fill: string } }[] }) {
  if (!active || !payload?.length) return null;
  const { value, name, payload: { fill } } = payload[0];
  const label = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div
      style={{ backgroundColor: fill }}
      className="rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-md"
    >
      ₹{Number(value).toLocaleString()} {label}
    </div>
  );
}

export function SpendingBreakdownChart() {
  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square h-full w-full">
      <PieChart>
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="category"
          innerRadius={50}
          outerRadius={80}
          strokeWidth={2}
          stroke="var(--background)"
        />
        <Tooltip content={<CustomTooltip />} />
        <ChartLegend
          content={<ChartLegendContent nameKey="category" />}
          className="flex-wrap gap-x-4 gap-y-1 justify-center mt-4 text-[11px] font-medium"
        />
      </PieChart>
    </ChartContainer>
  );
}
