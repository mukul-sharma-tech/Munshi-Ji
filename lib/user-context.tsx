"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type User = {
  name: string;
  email: string;
  isLoggedIn: boolean;
};

const UserContext = createContext<{
  user: User;
  setUser: (u: User) => void;
  logout: () => void;
}>({
  user: { name: "", email: "", isLoggedIn: false },
  setUser: () => {},
  logout: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User>({ name: "", email: "", isLoggedIn: false });

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("MunshiJi_user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name && parsed.email) {
          setUserState({ ...parsed, isLoggedIn: true });
        }
      } catch (e) {
        console.error("Failed to load user session", e);
      }
    }
  }, []);

  function setUser(u: User) {
    setUserState(u);
    localStorage.setItem("MunshiJi_user", JSON.stringify(u));
  }

  function logout() {
    setUserState({ name: "", email: "", isLoggedIn: false });
    localStorage.removeItem("MunshiJi_user");
    window.location.href = "/";
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
