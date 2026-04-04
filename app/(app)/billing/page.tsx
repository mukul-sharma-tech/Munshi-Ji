import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Download, CheckCircle2, Zap, Shield, Star } from "lucide-react";

const invoices = [
  { id: "INV-2026-006", date: "Jun 1, 2026", amount: "₹12.00", status: "Paid" },
  { id: "INV-2026-005", date: "May 1, 2026", amount: "₹12.00", status: "Paid" },
  { id: "INV-2026-004", date: "Apr 1, 2026", amount: "₹12.00", status: "Paid" },
  { id: "INV-2026-003", date: "Mar 1, 2026", amount: "₹12.00", status: "Paid" },
  { id: "INV-2026-002", date: "Feb 1, 2026", amount: "₹12.00", status: "Paid" },
  { id: "INV-2026-001", date: "Jan 1, 2026", amount: "₹9.00",  status: "Paid" },
];

const plans = [
  {
    name: "Free", price: "₹0", desc: "For personal use",
    features: ["Up to 50 transactions/mo", "Basic insights", "CSV export"],
    current: false, icon: Shield,
  },
  {
    name: "Pro", price: "₹12", desc: "Per month",
    features: ["Unlimited transactions", "Advanced insights", "Priority support", "Custom categories"],
    current: true, icon: Zap,
  },
  {
    name: "Business", price: "₹29", desc: "Per month",
    features: ["Everything in Pro", "Multi-user access", "API access", "Dedicated support"],
    current: false, icon: Star,
  },
];

export default function BillingPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your subscription and payment details.</p>
      </div>

      {/* 2×2 grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Current plan */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Current Plan</CardTitle>
            <CardDescription>You are on the Pro plan, billed monthly.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Pro Plan</p>
                  <p className="text-xs text-muted-foreground">Renews Jul 1, 2026 · ₹12.00/mo</p>
                </div>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-600 border-0">Active</Badge>
            </div>
            <Separator />
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Cancel Plan</Button>
              <Button size="sm">Upgrade to Business</Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment method */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payment Method</CardTitle>
            <CardDescription>Your default payment method.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Visa ending in 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 08 / 2026</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Update</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Mastercard ending in 8888</p>
                  <p className="text-xs text-muted-foreground">Expires 03 / 2025</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Remove</Button>
            </div>
            <Button variant="outline" size="sm" className="w-full">+ Add Payment Method</Button>
          </CardContent>
        </Card>

        {/* Plans */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Available Plans</CardTitle>
            <CardDescription>Choose the plan that fits your needs.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <Card key={plan.name} className={plan.current ? "border-primary" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <plan.icon className="h-4 w-4 text-muted-foreground" />
                      {plan.current && <Badge variant="outline" className="text-xs">Current</Badge>}
                    </div>
                    <CardTitle className="text-base mt-2">{plan.name}</CardTitle>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold">{plan.price}</span>
                      <span className="text-xs text-muted-foreground">{plan.desc}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-1.5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />{f}
                        </li>
                      ))}
                    </ul>
                    <Button size="sm" variant={plan.current ? "outline" : "default"} className="w-full" disabled={plan.current}>
                      {plan.current ? "Current Plan" : `Switch to ${plan.name}`}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Invoice history */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Invoice History</CardTitle>
            <CardDescription>Download past invoices for your records.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {invoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between px-6 py-3">
                  <div>
                    <p className="text-sm font-medium">{inv.id}</p>
                    <p className="text-xs text-muted-foreground">{inv.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">{inv.amount}</span>
                    <Badge variant="secondary" className="text-xs text-emerald-600">{inv.status}</Badge>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
