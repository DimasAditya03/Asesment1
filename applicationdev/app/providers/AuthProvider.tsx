"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { login, logout } from "@/lib/auth";
import api from "@/lib/axios";

interface AuthContextType {
  user: any;
  handleLogin: (email: string, password: string) => Promise<boolean>;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);

  /**
   * LOGIN
   */
  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password);
    if (!result) return false;

    setUser(result.user);

    // ✅ simpan token
    if (result.token) {
      localStorage.setItem("token", result.token);
    }

    return true;
  };

  /**
   * LOGOUT
   */
  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("token"); // ✅ clear token
    setUser(null);
  };

  /**
   * LOAD USER ON REFRESH
   */
  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await api.get("/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
    } catch (err) {
      console.log("Failed to get user");
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * ✅ Hook
 * Pastikan useAuth() tidak mengembalikan null
 */
export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return ctx;
};
