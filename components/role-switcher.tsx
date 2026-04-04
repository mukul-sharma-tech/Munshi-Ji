"use client";

import { ShieldCheck, Eye, ChevronDown } from "lucide-react";
import { useRole, type Role } from "@/lib/role-context";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const roles: Role[] = ["Admin", "Viewer"];

export function RoleSwitcher() {
  const { role, setRole } = useRole();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-background text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shadow-none outline-none">
          {role === "Admin"
            ? <ShieldCheck size={14} className="text-emerald-600/80" />
            : <Eye size={14} className="text-amber-500/80" />}
          <span className="font-semibold text-foreground/90 tracking-tight">{role}</span>
          <ChevronDown size={14} className="text-slate-400 ml-1" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36 text-xs">
        {roles.map((r) => (
          <DropdownMenuItem key={r} onClick={() => setRole(r)} className="text-xs h-8 gap-2">
            {r === "Admin"
              ? <ShieldCheck size={13} className="text-emerald-600" />
              : <Eye size={13} className="text-amber-500" />}
            {r}
            {role === r && <span className="ml-auto text-[10px] text-muted-foreground">active</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
