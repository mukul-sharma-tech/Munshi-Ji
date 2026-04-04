"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { RoleSwitcher } from "@/components/role-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  if (isLanding) return <>{children}</>;

  const crumb = pathname.split("/").filter(Boolean);
  const label = crumb[0] ? crumb[0].charAt(0).toUpperCase() + crumb[0].slice(1) : "Dashboard";

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-11 shrink-0 items-center justify-between border-b border-border bg-background px-4 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="h-7 w-7 text-slate-500 hover:text-foreground hover:bg-accent transition-colors" />
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>MunshiJi</span>
              <span>/</span>
              <span className="text-foreground font-medium">{label}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <RoleSwitcher />
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 bg-background">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
