"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  PiggyBank, TrendingUp, BarChart2, Shield, ArrowRight,
  Sparkles, DollarSign, Zap, ChevronDown, Wallet, LineChart,
} from "lucide-react";

const features = [
  { icon: TrendingUp,  title: "Smart Insights",       desc: "AI-powered spending analysis with actionable recommendations.",          color: "from-emerald-500/20 to-transparent", glow: "#10b981", iconColor: "#10b981" },
  { icon: BarChart2,   title: "Visual Analytics",      desc: "Beautiful interactive charts that make your finances effortless.",        color: "from-violet-500/20 to-transparent",  glow: "#8b5cf6", iconColor: "#8b5cf6" },
  { icon: Shield,      title: "Role-Based Access",     desc: "Admin and Viewer roles so you control who sees and edits your data.",     color: "from-blue-500/20 to-transparent",    glow: "#3b82f6", iconColor: "#3b82f6" },
  { icon: DollarSign,  title: "Transaction Tracking",  desc: "Log, filter, sort and export every transaction with CSV support.",        color: "from-amber-500/20 to-transparent",   glow: "#f59e0b", iconColor: "#f59e0b" },
  { icon: Zap,         title: "Real-time Dashboard",   desc: "Live balance, income, expenses and savings rate at a glance.",            color: "from-rose-500/20 to-transparent",    glow: "#f43f5e", iconColor: "#f43f5e" },
  { icon: Sparkles,    title: "Dark & Light Mode",     desc: "Seamlessly switch themes. Your preference is saved automatically.",       color: "from-cyan-500/20 to-transparent",    glow: "#06b6d4", iconColor: "#06b6d4" },
];

const stats = [
  { value: "$55K+", label: "Assets Tracked",   icon: Wallet    },
  { value: "45.3%", label: "Savings Rate",      icon: PiggyBank },
  { value: "20+",   label: "Transactions",      icon: LineChart },
  { value: "6mo",   label: "Financial History", icon: BarChart2 },
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export default function LandingPage() {
  const featRef = useInView();
  const statsRef = useInView();
  const ctaRef = useInView();

  return (
    <div className="min-h-screen bg-[#04040f] text-white overflow-x-hidden font-[var(--font-inter)]">

      {/* ── Ambient blobs ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-violet-600/10 blur-[140px]" style={{ animation: "pulse 6s ease-in-out infinite" }} />
        <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] rounded-full bg-emerald-500/8 blur-[120px]" style={{ animation: "pulse 8s ease-in-out infinite 2s" }} />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/8 blur-[100px]" style={{ animation: "pulse 7s ease-in-out infinite 1s" }} />
      </div>

      {/* ── Nav ── */}
      <nav className="relative z-20 flex items-center justify-between px-6 sm:px-14 py-5 border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 shadow-lg shadow-emerald-500/10">
            <PiggyBank className="h-5 w-5 text-emerald-400" strokeWidth={1.5} />
          </div>
          <span className="font-bold text-sm tracking-wide">FinBro</span>
          <span className="hidden sm:inline text-xs text-white/30 border border-white/10 rounded-full px-2 py-0.5">Finance Manager</span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="text-xs text-white/50 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-1.5 rounded-lg shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-16 sm:pt-36 sm:pb-24">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/8 text-emerald-400 text-xs font-medium mb-8">
          <Sparkles className="h-3 w-3" />
          Smart Personal Finance
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl">
          Take control of your
          <br />
          <span className="relative inline-block mt-1">
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              financial future
            </span>
            <span className="absolute -inset-2 bg-gradient-to-r from-emerald-400/15 via-cyan-300/15 to-violet-400/15 blur-2xl rounded-full -z-10" />
          </span>
        </h1>

        <p className="mt-6 text-sm sm:text-base text-white/40 max-w-lg leading-relaxed">
          FinBro gives you a beautiful real-time view of your money — track transactions, visualize spending patterns, and grow your savings effortlessly.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-10">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-7 py-3 rounded-xl shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:scale-105"
          >
            View Your Savings
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white border border-white/10 hover:border-white/25 bg-white/3 hover:bg-white/8 px-7 py-3 rounded-xl backdrop-blur-sm transition-all hover:scale-105"
          >
            Explore Dashboard
          </Link>
        </div>

        <div className="mt-16 flex flex-col items-center gap-1 text-white/20 animate-bounce">
          <span className="text-xs">Scroll to explore</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </section>

      {/* ── Stats ── */}
      <div
        ref={statsRef.ref}
        className={`relative z-10 mx-4 sm:mx-14 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 transition-all duration-700 ${statsRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="flex flex-col items-center gap-2 transition-all duration-500"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="p-2 rounded-lg bg-white/5 border border-white/8">
              <s.icon className="h-4 w-4 text-emerald-400" />
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">{s.value}</span>
            <span className="text-xs text-white/35 text-center">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Features ── */}
      <section ref={featRef.ref} className="relative z-10 px-4 sm:px-14 py-24">
        <div className={`text-center mb-12 transition-all duration-700 ${featRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold">Everything you need</h2>
          <p className="mt-3 text-white/35 text-sm max-w-sm mx-auto">A complete toolkit for personal finance, beautifully designed.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`group relative rounded-2xl border border-white/6 bg-gradient-to-br ${f.color} p-6 cursor-default transition-all duration-500 hover:border-white/15 hover:scale-[1.02] ${featRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{
                transitionDelay: `${i * 80}ms`,
                boxShadow: `0 0 0 0 ${f.glow}00`,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px -8px ${f.glow}40`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
            >
              <div className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-white/15 group-hover:bg-white/40 transition-colors" />
              <div className="inline-flex p-2.5 rounded-xl bg-white/5 border border-white/8 mb-4 group-hover:border-white/20 transition-colors">
                <f.icon className="h-5 w-5" style={{ color: f.iconColor }} />
              </div>
              <h3 className="font-semibold text-sm mb-1.5 text-white/90">{f.title}</h3>
              <p className="text-xs text-white/35 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        ref={ctaRef.ref}
        className={`relative z-10 px-4 sm:px-14 pb-24 transition-all duration-700 ${ctaRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="relative rounded-3xl border border-emerald-500/20 overflow-hidden p-10 sm:p-16 text-center"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.12) 0%, rgba(4,4,15,0.8) 70%)" }}
        >
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 border border-emerald-500/10 rounded-3xl pointer-events-none" />

          <div className="relative">
            <div className="inline-flex p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 mb-6 shadow-xl shadow-emerald-500/10">
              <PiggyBank className="h-8 w-8 text-emerald-400" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to grow your savings?</h2>
            <p className="text-white/35 text-sm max-w-md mx-auto mb-8">
              Jump into your personal finance dashboard and start tracking what matters most.
            </p>
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-10 py-3.5 rounded-xl shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:scale-105"
            >
              Go to Your Savings
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/5 px-6 sm:px-14 py-6 flex items-center justify-between text-white/20 text-xs">
        <div className="flex items-center gap-2">
          <PiggyBank className="h-4 w-4" strokeWidth={1.5} />
          <span>FinBro Finance Manager</span>
        </div>
        <span>© 2026 FinBro. All rights reserved.</span>
      </footer>
    </div>
  );
}
