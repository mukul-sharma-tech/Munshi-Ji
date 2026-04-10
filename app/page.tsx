"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PiggyBank, TrendingUp, BarChart2, Shield, ArrowRight, Sparkles, DollarSign, Zap, ChevronDown, Wallet, LineChart, User, Mail, LogIn } from "lucide-react";
import { useUser } from "@/lib/user-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function useScrollReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => setVisible(true), delay); }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, visible };
}

const features = [
  { icon: TrendingUp, title: "Smart Insights", desc: "AI-powered spending analysis with actionable recommendations.", color: "from-emerald-500/20 to-transparent", glow: "#10b981", iconColor: "#10b981" },
  { icon: BarChart2, title: "Visual Analytics", desc: "Beautiful interactive charts that make your finances effortless.", color: "from-violet-500/20 to-transparent", glow: "#8b5cf6", iconColor: "#8b5cf6" },
  { icon: Shield, title: "Role-Based Access", desc: "Admin and Viewer roles so you control who sees and edits data.", color: "from-blue-500/20 to-transparent", glow: "#3b82f6", iconColor: "#3b82f6" },
  { icon: DollarSign, title: "Transaction Tracking", desc: "Log, filter, sort and export every transaction with CSV support.", color: "from-amber-500/20 to-transparent", glow: "#f59e0b", iconColor: "#f59e0b" },
  { icon: Zap, title: "Real-time Dashboard", desc: "Live balance, income, expenses and savings rate at a glance.", color: "from-rose-500/20 to-transparent", glow: "#f43f5e", iconColor: "#f43f5e" },
  { icon: Sparkles, title: "Dark & Light Mode", desc: "Seamlessly switch themes. Your preference is saved automatically.", color: "from-cyan-500/20 to-transparent", glow: "#06b6d4", iconColor: "#06b6d4" },
];

const stats = [
  { value: "₹55K+", label: "Assets Tracked", icon: Wallet },
  { value: "45.3%", label: "Savings Rate", icon: PiggyBank },
  { value: "20+", label: "Transactions", icon: LineChart },
  { value: "6mo", label: "Financial History", icon: BarChart2 },
];

function RevealCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useScrollReveal(delay);
  return <div ref={ref} className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}>{children}</div>;
}

export default function LandingPage() {
  const { user, setUser } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const statsReveal = useScrollReveal();
  const featTitle = useScrollReveal();
  const ctaReveal = useScrollReveal();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setUser({ name, email, isLoggedIn: true });
    setShowLogin(false);
  };

  // If user is NOT logged in AND clicked Sign In, show the full-screen premium onboarding
  if (!user.isLoggedIn && showLogin) {
    return (
      <div className="min-h-screen bg-[#04040f] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/10 blur-[140px] animate-pulse" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
        </div>

        <div className="relative z-10 w-full max-w-md animate-[fadeInUp_0.7s_ease_forwards]">
          <div className="flex flex-col items-center mb-10">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute -top-12 left-0 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ArrowRight className="h-3 w-3 rotate-180" /> Back to explore
            </button>
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 mb-4 shadow-xl shadow-emerald-500/10">
              <PiggyBank className="h-10 w-10 text-emerald-400" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Welcome to MunshiJi</h1>
            <p className="text-sm text-white/40 text-center">Your personal AI-powered financial consultant.<br />Identify yourself to begin the experience.</p>
          </div>

          <div className="rounded-3xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
            <form onSubmit={handleJoin} className="space-y-5 relative">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Your Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-emerald-400 transition-colors" />
                  <Input
                    placeholder="e.g. Mukul Sharma"
                    className="bg-black/40 border-white/10 h-12 pl-10 focus:border-emerald-500/50 transition-all rounded-xl"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-emerald-400 transition-colors" />
                  <Input
                    type="email"
                    placeholder="mukul@example.com"
                    className="bg-black/40 border-white/10 h-12 pl-10 focus:border-emerald-500/50 transition-all rounded-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
              >
                Enter Dashboard <LogIn size={16} />
              </Button>
            </form>
          </div>
        </div>

        <footer className="absolute bottom-8 text-[10px] text-white/10 font-medium tracking-widest uppercase">
          © 2026 MunshiJi Finance System
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#04040f] text-white overflow-x-hidden" style={{ fontFamily: "var(--font-inter, sans-serif)" }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-violet-600/10 blur-[140px]" style={{ animation: "pulse 6s ease-in-out infinite" }} />
        <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] rounded-full bg-emerald-500/8 blur-[120px]" style={{ animation: "pulse 8s ease-in-out infinite 2s" }} />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/8 blur-[100px]" style={{ animation: "pulse 7s ease-in-out infinite 1s" }} />
      </div>

      <nav className="relative z-20 flex items-center justify-between px-6 sm:px-14 py-5 border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25"><PiggyBank className="h-5 w-5 text-emerald-400" strokeWidth={1.5} /></div>
          <span className="font-bold text-sm">MunshiJi</span>
          <span className="hidden sm:inline text-xs text-white/30 border border-white/10 rounded-full px-2 py-0.5">Finance Manager</span>
        </div>
        <div className="flex items-center gap-4">
          {(!mounted || !user.isLoggedIn) ? (
            <>
              <button onClick={() => setShowLogin(true)} className="text-xs text-white/50 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">Sign In</button>
              <button onClick={() => setShowLogin(true)} className="text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-1.5 rounded-lg shadow-lg shadow-emerald-500/25 transition-all hover:scale-105">Get Started</button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/5">
                <div className="h-4 w-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <User size={10} className="text-emerald-400" />
                </div>
                <span className="text-xs font-bold text-white/60">{user.name}</span>
              </div>
              <Link href="/dashboard" className="text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 px-4 py-1.5 rounded-lg transition-all">Go to Dashboard</Link>
            </div>
          )}
        </div>
      </nav>

      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-16 sm:pt-36 sm:pb-24">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/8 text-emerald-400 text-xs font-medium mb-8 animate-[fadeInDown_0.6s_ease_forwards]">
          <Sparkles className="h-3 w-3" /> Smart Personal Finance
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl animate-[fadeInUp_0.7s_ease_0.1s_forwards] opacity-0">
          Take control of your<br />
          <span className="relative inline-block mt-1">
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">financial future</span>
            <span className="absolute -inset-2 bg-gradient-to-r from-emerald-400/15 via-cyan-300/15 to-violet-400/15 blur-2xl rounded-full -z-10" />
          </span>
        </h1>
        <p className="mt-6 text-sm sm:text-base text-white/40 max-w-lg leading-relaxed animate-[fadeInUp_0.7s_ease_0.25s_forwards] opacity-0">
          MunshiJi {(mounted && user.isLoggedIn) ? `welcomes you, ${user.name}.` : "gives you a beautiful real-time view of your money — track transactions, visualize spending, and grow your savings."}
        </p>

        <div className="mt-10 animate-[fadeInUp_0.7s_ease_0.4s_forwards] opacity-0 w-full max-w-md">
          {(mounted && user.isLoggedIn) ? (
            <div className="flex items-center justify-center gap-3">
              <Link href="/dashboard" className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-7 py-3 rounded-xl shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:scale-105">
                View Your Savings <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/dashboard" className="text-sm text-white/60 hover:text-white border border-white/10 hover:border-white/25 bg-white/3 hover:bg-white/8 px-7 py-3 rounded-xl transition-all hover:scale-105">
                Explore Dashboard
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button onClick={() => setShowLogin(true)} className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-10 py-6 rounded-xl shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:scale-105">
                Sign In Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          )}
        </div>
        <div className="mt-16 flex flex-col items-center gap-1 text-white/20 animate-bounce">
          <span className="text-xs">Scroll to explore</span><ChevronDown className="h-4 w-4" />
        </div>
      </section>

      <div ref={statsReveal.ref} className={`relative z-10 mx-4 sm:mx-14 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 transition-all duration-700 ${statsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        {stats.map((s, i) => (
          <div key={s.label} className={`flex flex-col items-center gap-2 transition-all duration-500 ${statsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${i * 120}ms` }}>
            <div className="p-2 rounded-lg bg-white/5 border border-white/8 hover:border-emerald-500/30 transition-colors"><s.icon className="h-4 w-4 text-emerald-400" /></div>
            <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">{s.value}</span>
            <span className="text-xs text-white/35 text-center">{s.label}</span>
          </div>
        ))}
      </div>

      <section className="relative z-10 px-4 sm:px-14 py-24">
        <div ref={featTitle.ref} className={`text-center mb-12 transition-all duration-700 ${featTitle.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold">Everything you need</h2>
          <p className="mt-3 text-white/35 text-sm max-w-sm mx-auto">A complete toolkit for personal finance, beautifully designed.</p>
        </div>
        {/* Desktop grid / Mobile marquee */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <RevealCard key={f.title} delay={i * 100}>
              <div className={`group relative h-full rounded-2xl border border-white/6 bg-gradient-to-br ${f.color} p-6 cursor-default transition-all duration-300 hover:border-white/15 hover:scale-[1.02]`}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px -8px ${f.glow}40`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
                <div className="inline-flex p-2.5 rounded-xl bg-white/5 border border-white/8 mb-4 group-hover:border-white/20 group-hover:scale-110 transition-all duration-300">
                  <f.icon className="h-5 w-5" style={{ color: f.iconColor }} />
                </div>
                <h3 className="font-semibold text-sm mb-1.5 text-white/90">{f.title}</h3>
                <p className="text-xs text-white/35 leading-relaxed">{f.desc}</p>
              </div>
            </RevealCard>
          ))}
        </div>

        {/* Mobile: two-row marquee */}
        <div className="sm:hidden space-y-3 overflow-hidden">
          {/* Row 1 — scrolls left */}
          <div className="flex gap-3 w-max animate-marquee">
            {[...features, ...features].map((f, i) => (
              <div key={i} className={`w-52 shrink-0 rounded-2xl border border-white/6 bg-gradient-to-br ${f.color} p-4`}>
                <div className="inline-flex p-2 rounded-xl bg-white/5 border border-white/8 mb-3">
                  <f.icon className="h-4 w-4" style={{ color: f.iconColor }} />
                </div>
                <h3 className="font-semibold text-xs mb-1 text-white/90">{f.title}</h3>
                <p className="text-[10px] text-white/35 leading-relaxed line-clamp-2">{f.desc}</p>
              </div>
            ))}
          </div>
          {/* Row 2 — scrolls right */}
          <div className="flex gap-3 w-max animate-marquee-reverse">
            {[...features.slice().reverse(), ...features.slice().reverse()].map((f, i) => (
              <div key={i} className={`w-52 shrink-0 rounded-2xl border border-white/6 bg-gradient-to-br ${f.color} p-4`}>
                <div className="inline-flex p-2 rounded-xl bg-white/5 border border-white/8 mb-3">
                  <f.icon className="h-4 w-4" style={{ color: f.iconColor }} />
                </div>
                <h3 className="font-semibold text-xs mb-1 text-white/90">{f.title}</h3>
                <p className="text-[10px] text-white/35 leading-relaxed line-clamp-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 sm:px-14 pb-24">
        <RevealCard>
          <div ref={ctaReveal.ref} className={`relative rounded-3xl border border-emerald-500/20 overflow-hidden p-10 sm:p-16 text-center transition-all duration-700 ${ctaReveal.visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.12) 0%, rgba(4,4,15,0.8) 70%)" }}>
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="relative">
              <div className="inline-flex p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 mb-6"><PiggyBank className="h-8 w-8 text-emerald-400" strokeWidth={1.5} /></div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to grow your savings?</h2>
              <p className="text-white/35 text-sm max-w-md mx-auto mb-8">Jump into your personal finance dashboard and start tracking what matters most.</p>
              <Link href="/dashboard" className="group inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-10 py-3.5 rounded-xl shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:scale-105">
                Go to Your Savings <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </RevealCard>
      </section>

      <footer className="relative z-10 border-t border-white/5 px-6 sm:px-14 py-6 flex items-center justify-between text-white/20 text-xs">
        <div className="flex items-center gap-2"><PiggyBank className="h-4 w-4" strokeWidth={1.5} /><span>MunshiJi Finance Manager</span></div>
        <span>© 2026 MunshiJi. All rights reserved.</span>
      </footer>
    </div>
  );
}
