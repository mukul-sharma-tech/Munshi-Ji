'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";

interface MonthlyEntry {
  month: string;
  Income: number;
  Expenses: number;
  Net: number;
}

interface CategoryEntry {
  name: string;
  value: number;
}

interface InsightsChartsProps {
  monthlyData: MonthlyEntry[];
  categoryData: CategoryEntry[];
}

export function InsightsCharts({ monthlyData, categoryData }: InsightsChartsProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card className="border-none shadow-sm dark:bg-zinc-900">
        <CardHeader>
          <CardTitle>Monthly Income vs Expenses</CardTitle>
          <CardDescription>6-month comparison of cash flow</CardDescription>
        </CardHeader>
        <CardContent className="h-[320px] pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-zinc-100 dark:text-zinc-800" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(value) => [`₹${Number(value).toLocaleString()}`, undefined]}
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              />
              <Legend />
              <Bar dataKey="Income"   fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm dark:bg-zinc-900">
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
          <CardDescription>All-time expense breakdown</CardDescription>
        </CardHeader>
        <CardContent className="h-[320px] pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} layout="vertical" barSize={16}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="currentColor" className="text-zinc-100 dark:text-zinc-800" />
              <XAxis type="number" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={90} />
              <Tooltip
                formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Total"]}
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              />
              <Bar dataKey="value" fill="#4f46e5" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

