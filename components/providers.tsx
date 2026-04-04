"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { RoleProvider } from "@/lib/role-context";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <RoleProvider>
        {children}
      </RoleProvider>
    </TooltipProvider>
  );
}
