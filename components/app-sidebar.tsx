"use client";

import {
  LayoutDashboard, ArrowLeftRight, Lightbulb,
  HelpCircle, PiggyBank, UserCircle, User, CreditCard, LogOut,
  Mic, Shield, ShieldCheck,
} from "lucide-react";
import { useRole } from "@/lib/role-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/lib/user-context";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
  SidebarGroupContent, SidebarHeader, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Transactions", icon: ArrowLeftRight, href: "/transactions" },
  { title: "Insights", icon: Lightbulb, href: "/insights" },
  { title: "CA Munshi", icon: Mic, href: "/ca-munshi" },
];

const footerItems = [
  { title: "Help Center", icon: HelpCircle, href: "/help" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = usePathname();
  const { role, setRole } = useRole();
  const { user, logout } = useUser();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="px-3 py-3 border-b border-border">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          {collapsed ? (
            <PiggyBank size={16} strokeWidth={1.5} className="mx-auto text-slate-500" />
          ) : (
            <div className="flex items-center gap-2">
              <PiggyBank size={16} strokeWidth={1.5} className="text-primary shrink-0" />
              <div>
                <p className="text-sm font-bold text-foreground leading-none">MunshiJi</p>
                <p className="text-xs text-muted-foreground leading-none mt-1.5 font-medium">{user.name || "Finance Manager"}</p>
              </div>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="py-1">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={active}
                      className={`h-9 text-sm rounded-md ${active ? "bg-accent text-foreground font-bold" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
                    >
                      <Link href={item.href}>
                        <item.icon size={18} className={active ? "text-primary" : "text-slate-500"} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          {!collapsed && (
            <div className="px-3 py-2 mb-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">System Role</p>
              <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                <button 
                  onClick={() => setRole("Admin")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-md text-[10px] font-bold transition-all ${role === "Admin" ? "bg-white dark:bg-slate-800 shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <ShieldCheck size={12} /> Admin
                </button>
                <button 
                  onClick={() => setRole("Viewer")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-md text-[10px] font-bold transition-all ${role === "Viewer" ? "bg-white dark:bg-slate-800 shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Shield size={12} /> Viewer
                </button>
              </div>
            </div>
          )}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="py-1 border-t border-border">
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className="h-9 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
              >
                <Link href={item.href}>
                  <item.icon size={18} className="text-slate-500" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  tooltip="Profile"
                  className="h-9 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                >
                  <UserCircle size={18} className="text-slate-500" />
                  <span className="truncate">{user.name || "Profile"}</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end" className="w-44 text-xs">
                <DropdownMenuItem asChild className="text-xs h-8">
                  <Link href="/profile"><User size={14} className="mr-2 text-slate-500" />Profile Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-xs h-8">
                  <Link href="/billing"><CreditCard size={14} className="mr-2 text-slate-500" />Billing</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-xs h-8 text-rose-600 focus:text-rose-600 cursor-pointer">
                  <LogOut size={14} className="mr-2" />Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
