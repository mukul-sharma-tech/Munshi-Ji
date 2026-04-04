import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/app-sidebar";
import { RoleProvider } from "@/lib/role-context";
import { RoleSwitcher } from "@/components/role-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinBro Finance Manager",
  description: "Personal finance management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased font-[var(--font-inter)]`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
        <RoleProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-12 shrink-0 items-center justify-between border-b border-border px-3 sm:px-4">
              <SidebarTrigger />
              <div className="flex items-center gap-2">
                <RoleSwitcher />
                <ThemeToggle />
              </div>
            </header>
            <main className="flex-1">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        </RoleProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
