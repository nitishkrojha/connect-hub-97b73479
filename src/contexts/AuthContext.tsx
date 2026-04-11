import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "admin" | "project";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  projectId?: string;
  projectName?: string;
  enabledChannels?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<string, User & { password: string }> = {
  "admin@dicnotifier.io": {
    id: "admin-1",
    name: "Admin User",
    email: "admin@dicnotifier.io",
    role: "admin",
    password: "admin123",
    enabledChannels: ["SMS", "WhatsApp", "Email", "RCS"],
  },
  "project@dicnotifier.io": {
    id: "proj-1",
    name: "My Bharat",
    email: "project@dicnotifier.io",
    role: "project",
    projectId: "proj-mybharat",
    projectName: "My Bharat",
    password: "project123",
    enabledChannels: ["SMS", "WhatsApp"],
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, password: string, role: UserRole): boolean => {
    const demoUser = DEMO_USERS[email];
    if (demoUser && demoUser.password === password && demoUser.role === role) {
      const { password: _, ...userData } = demoUser;
      setUser(userData);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
