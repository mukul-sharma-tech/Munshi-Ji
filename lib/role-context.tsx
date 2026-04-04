"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Role = "Admin" | "Viewer";

const RoleContext = createContext<{
  role: Role;
  setRole: (r: Role) => void;
}>({ role: "Admin", setRole: () => {} });

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("Admin");
  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
}

export function useRole() {
  return useContext(RoleContext);
}
