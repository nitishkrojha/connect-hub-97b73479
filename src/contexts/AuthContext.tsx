import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { Plan } from "@/config/planEntitlements";

export type UserRole = "admin" | "project";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  projectId?: string;
  projectName?: string;
  enabledChannels?: string[];
  // New
  plan?: Plan;
  businessName?: string;
  businessType?: string;
  emailVerified?: boolean;
}

export interface SignupPayload {
  plan: Plan;
  businessName: string;
  businessType?: string;
  website?: string;
  country?: string;
  ownerName: string;
  email: string;
  mobile: string;
  designation?: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  signup: (payload: SignupPayload) => { ok: true } | { ok: false; error: string };
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "samparq_signups";

interface StoredSignup extends User {
  password: string;
}

const loadSignups = (): Record<string, StoredSignup> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

const saveSignups = (data: Record<string, StoredSignup>) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

const DEMO_USERS: Record<string, StoredSignup> = {
  "admin@dicnotifier.io": {
    id: "admin-1",
    name: "Admin User",
    email: "admin@dicnotifier.io",
    role: "admin",
    password: "admin123",
    enabledChannels: ["SMS", "WhatsApp", "Email", "RCS"],
    emailVerified: true,
  },
  "project@dicnotifier.io": {
    id: "proj-1",
    name: "My Bharat",
    email: "project@dicnotifier.io",
    role: "project",
    projectId: "proj-mybharat",
    projectName: "My Bharat",
    password: "project123",
    enabledChannels: ["SMS", "WhatsApp", "Email", "RCS"],
    plan: "growth",
    businessName: "My Bharat",
    emailVerified: true,
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, password: string, role: UserRole): boolean => {
    const stored = { ...loadSignups(), ...DEMO_USERS };
    const found = stored[email.toLowerCase()] || stored[email];
    if (found && found.password === password && found.role === role) {
      const { password: _, ...userData } = found;
      setUser(userData);
      return true;
    }
    return false;
  }, []);

  const signup = useCallback(
    (payload: SignupPayload) => {
      const signups = loadSignups();
      const key = payload.email.toLowerCase();
      if (signups[key] || DEMO_USERS[key]) {
        return { ok: false as const, error: "An account with this email already exists." };
      }
      const id = `ws-${Date.now()}`;
      const newUser: StoredSignup = {
        id,
        name: payload.ownerName,
        email: key,
        role: "project",
        projectId: id,
        projectName: payload.businessName,
        businessName: payload.businessName,
        businessType: payload.businessType,
        plan: payload.plan,
        enabledChannels: payload.plan === "starter"
          ? ["SMS", "Email", "RCS"]
          : ["SMS", "WhatsApp", "Email", "RCS"],
        password: payload.password,
        emailVerified: false,
      };
      signups[key] = newUser;
      saveSignups(signups);
      return { ok: true as const };
    },
    []
  );

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

/** Dev helper to mark a signup as confirmed (Phase 1 only). */
export const markEmailConfirmed = (email: string) => {
  const signups = loadSignups();
  const key = email.toLowerCase();
  if (signups[key]) {
    signups[key].emailVerified = true;
    saveSignups(signups);
  }
};
