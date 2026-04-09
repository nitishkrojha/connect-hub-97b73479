import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "admin" | "project";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  projectId?: string;
  projectName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<string, User & { password: string }> = {
  "admin@commhub.io": {
    id: "admin-1",
    name: "Admin User",
    email: "admin@commhub.io",
    role: "admin",
    password: "admin123",
  },
  "project@commhub.io": {
    id: "proj-1",
    name: "Project Alpha",
    email: "project@commhub.io",
    role: "project",
    projectId: "proj-alpha",
    projectName: "Project Alpha",
    password: "project123",
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
