"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { RoleProvider } from "@/lib/role-context";
import { UserProvider } from "@/lib/user-context";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <UserProvider>
        <RoleProvider>
          {children}
        </RoleProvider>
      </UserProvider>
    </TooltipProvider>
  );
}
