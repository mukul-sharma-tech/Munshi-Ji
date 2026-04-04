"use client";

import { ShieldCheck, Eye } from "lucide-react";
import { useRole, type Role } from "@/lib/role-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const roles: Role[] = ["Admin", "Viewer"];

export function RoleSwitcher() {
  const { role, setRole } = useRole();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs">
          {role === "Admin"
            ? <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            : <Eye className="h-3.5 w-3.5 text-amber-500" />}
          {role}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {roles.map((r) => (
          <DropdownMenuItem key={r} onClick={() => setRole(r)} className="gap-2">
            {r === "Admin"
              ? <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              : <Eye className="h-3.5 w-3.5 text-amber-500" />}
            {r}
            {role === r && <span className="ml-auto text-xs text-muted-foreground">active</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
