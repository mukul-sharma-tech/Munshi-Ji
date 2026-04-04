import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search, BookOpen, CreditCard, BarChart2, Shield,
  MessageCircle, Mail, FileText, ChevronRight, Zap,
} from "lucide-react";

const categories = [
  { icon: BookOpen, label: "Getting Started", count: 8, color: "bg-blue-500/10 text-blue-500" },
  { icon: CreditCard, label: "Transactions", count: 12, color: "bg-emerald-500/10 text-emerald-500" },
  { icon: BarChart2, label: "Insights & Reports", count: 6, color: "bg-violet-500/10 text-violet-500" },
  { icon: Shield, label: "Security & Privacy", count: 9, color: "bg-rose-500/10 text-rose-500" },
  { icon: Zap, label: "Billing & Plans", count: 7, color: "bg-amber-500/10 text-amber-500" },
  { icon: FileText, label: "Account Settings", count: 5, color: "bg-cyan-500/10 text-cyan-500" },
];

const faqs = [
  {
    q: "How do I add a new transaction?",
    a: "Go to the Transactions page and click 'Add Transaction'. Fill in the date, description, category, type, and amount, then click Add.",
    tag: "Transactions",
  },
  {
    q: "How do I export my transactions to CSV?",
    a: "On the Transactions page, click the 'Export CSV' button in the top-right. This exports all currently filtered transactions.",
    tag: "Transactions",
  },
  {
    q: "What is the difference between Admin and Viewer roles?",
    a: "Admin can add, edit, and manage transactions. Viewer has read-only access and can only view data and export CSV.",
    tag: "Security",
  },
  {
    q: "How do I switch between light and dark mode?",
    a: "Click the sun/moon icon in the top-right header to toggle between light and dark mode. Your preference is saved automatically.",
    tag: "Settings",
  },
  {
    q: "How is my savings rate calculated?",
    a: "Savings rate = (Total Income - Total Expenses) / Total Income × 100. It reflects how much of your income you're saving each month.",
    tag: "Insights",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes. Go to Billing and click 'Cancel Plan'. Your access continues until the end of the current billing period.",
    tag: "Billing",
  },
];

const articles = [
  { title: "Getting started with MunshiJi", views: "2.4k", tag: "Guide" },
  { title: "Understanding your spending insights", views: "1.8k", tag: "Insights" },
  { title: "Setting up categories", views: "1.2k", tag: "Tips" },
  { title: "How to read the balance trend chart", views: "980", tag: "Charts" },
  { title: "Managing multiple accounts", views: "760", tag: "Guide" },
  { title: "Securing your account", views: "640", tag: "Security" },
];

export default function HelpPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 p-6 space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">Help Center</h1>
        <p className="text-sm text-muted-foreground">Find answers, guides, and support for MunshiJi Finance Manager.</p>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search for help..." className="pl-9 bg-background" />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Card key={cat.label} className="cursor-pointer hover:border-primary/40 transition-colors">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className={`p-2 rounded-lg ${cat.color}`}>
                  <cat.icon className="h-4 w-4" />
                </div>
                <p className="text-xs font-medium leading-tight">{cat.label}</p>
                <p className="text-xs text-muted-foreground">{cat.count} articles</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* FAQs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {faqs.map((faq) => (
                <div key={faq.q} className="px-6 py-3 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium">{faq.q}</p>
                    <Badge variant="secondary" className="text-xs shrink-0">{faq.tag}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {/* Popular articles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Popular Articles</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {articles.map((a) => (
                  <div key={a.title} className="flex items-center justify-between px-6 py-2.5 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="text-sm">{a.title}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-muted-foreground">{a.views} views</span>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact support */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Still need help?</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex flex-col h-auto py-4 gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium">Live Chat</span>
                <span className="text-xs text-muted-foreground">Avg. 2 min reply</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto py-4 gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium">Email Support</span>
                <span className="text-xs text-muted-foreground">Reply within 24h</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
