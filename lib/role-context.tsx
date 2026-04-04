"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Role = "Admin" | "Viewer";

const RoleContext = createContext<{
  role: Role;
  setRole: (r: Role) => void;
}>({ role: "Admin", setRole: () => {} });

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("Admin");

  useEffect(() => {
    const stored = localStorage.getItem("MunshiJi_role") as Role | null;
    if (stored === "Admin" || stored === "Viewer") setRoleState(stored);
  }, []);

  function setRole(r: Role) {
    setRoleState(r);
    localStorage.setItem("MunshiJi_role", r);
  }

  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
}

export function useRole() {
  return useContext(RoleContext);
}
