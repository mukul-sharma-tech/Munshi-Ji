"use client";

import {
  LayoutDashboard, ArrowLeftRight, Lightbulb,
  HelpCircle, PiggyBank, UserCircle, User, CreditCard, LogOut,
  Mic,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { title: "Dashboard",    icon: LayoutDashboard, href: "/dashboard"    },
  { title: "Transactions", icon: ArrowLeftRight,  href: "/transactions" },
  { title: "Insights",     icon: Lightbulb,       href: "/insights"     },
  { title: "CA Munshi",    icon: Mic,             href: "/ca-munshi"    },
];

const footerItems = [
  { title: "Help Center", icon: HelpCircle, href: "/help" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = usePathname();

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
                <p className="text-xs font-semibold text-foreground leading-none">FinBro</p>
                <p className="text-[10px] text-muted-foreground leading-none mt-0.5">Finance Manager</p>
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
                      className={`h-8 text-xs rounded-md ${active ? "bg-accent text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
                    >
                      <Link href={item.href}>
                        <item.icon size={16} className={active ? "text-primary" : "text-slate-500"} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="py-1 border-t border-border">
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className="h-8 text-xs text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
              >
                <Link href={item.href}>
                  <item.icon size={16} className="text-slate-500" />
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
                  className="h-8 text-xs text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                >
                  <UserCircle size={16} className="text-slate-500" />
                  <span>Profile</span>
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
                <DropdownMenuItem className="text-xs h-8 text-destructive focus:text-destructive">
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
