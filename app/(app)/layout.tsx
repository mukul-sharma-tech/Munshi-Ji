import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { RoleSwitcher } from "@/components/role-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-13 shrink-0 items-center justify-between border-b border-border/60 px-3 sm:px-5 bg-background/80 backdrop-blur-md sticky top-0 z-10">
          <SidebarTrigger className="hover:bg-accent/60 transition-colors" />
          <div className="flex items-center gap-2">
            <RoleSwitcher />
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 animate-slide-up">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
