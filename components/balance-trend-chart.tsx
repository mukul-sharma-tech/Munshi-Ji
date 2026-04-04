"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const data = [
  { month: "Jan", balance: 38200 },
  { month: "Feb", balance: 41500 },
  { month: "Mar", balance: 39800 },
  { month: "Apr", balance: 44200 },
  { month: "May", balance: 51600 },
  { month: "Jun", balance: 55083 },
];

const chartConfig = {
  balance: { label: "Balance", color: "#10b981" },
} satisfies ChartConfig;

export function BalanceTrendChart() {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <LineChart data={data} margin={{ left: -10, right: 12, top: 10, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.4} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={12}
          tick={{ fontSize: 11, fontWeight: 500, fill: "var(--color-muted-foreground)" }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={12}
          tick={{ fontSize: 11, fontWeight: 500, fill: "var(--color-muted-foreground)" }}
          tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
        />
        <ChartTooltip
          cursor={{ stroke: "var(--color-border)", strokeWidth: 1.5 }}
          content={
            <ChartTooltipContent
              className="bg-background border-border shadow-md"
              labelFormatter={(v) => v}
              formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Balance"]}
            />
          }
        />
        <Line
          dataKey="balance"
          type="monotone"
          stroke="var(--color-balance)"
          strokeWidth={3}
          dot={{ r: 3, fill: "var(--color-balance)", strokeWidth: 0 }}
          activeDot={{ r: 5, strokeWidth: 0 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
