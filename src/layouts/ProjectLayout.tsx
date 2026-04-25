import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usePlan } from "@/hooks/usePlan";
import {
  LayoutDashboard, Megaphone, Send, FileText, Upload, BarChart3, Settings2, Gauge,
  History, LogOut, Menu, ChevronLeft, ChevronDown, Code2, Search, Inbox, Phone,
  PhoneCall, GitBranch, Webhook, Sparkles, Building2, ShieldCheck, MessageSquare,
  ListMusic, Lock, Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { PlanBadge } from "@/components/PlanBadge";
import { FeatureKey, planMeets, PLAN_LABELS } from "@/config/planEntitlements";

interface NavItem {
  to: string;
  icon: any;
  label: string;
  end?: boolean;
  feature?: FeatureKey;
}

interface NavGroup {
  id: string;
  label: string;
  icon: any;
  items: NavItem[];
}

const GROUPS: NavGroup[] = [
  {
    id: "campaigns",
    label: "Campaigns",
    icon: Megaphone,
    items: [
      { to: "/project/send", icon: Send, label: "Broadcast" },
      { to: "/project/campaigns", icon: Megaphone, label: "Campaigns" },
      { to: "/project/history", icon: History, label: "Campaign History" },
      { to: "/project/templates", icon: FileText, label: "Templates" },
      { to: "/project/upload", icon: Upload, label: "Contacts" },
      { to: "/project/campaigns/contacts-api", icon: Webhook, label: "Contact Sync API", feature: "send.contactSyncApi" },
    ],
  },
  {
    id: "inbox",
    label: "Inbox",
    icon: Inbox,
    items: [
      { to: "/project/inbox", icon: MessageSquare, label: "All Conversations" },
    ],
  },
  {
    id: "voice",
    label: "Voice",
    icon: Phone,
    items: [
      { to: "/project/voice/dashboard", icon: BarChart3, label: "Voice Dashboard" },
      { to: "/project/voice/click-to-call", icon: PhoneCall, label: "Click-to-Call" },
      { to: "/project/voice/broadcast", icon: ListMusic, label: "Voice Broadcast" },
      { to: "/project/voice/ivr", icon: GitBranch, label: "IVR Studio", feature: "voice.ivrStudio" },
      { to: "/project/voice/logs", icon: History, label: "Call Logs" },
    ],
  },
  {
    id: "ai",
    label: "AI Studio",
    icon: Sparkles,
    items: [
      { to: "/project/ai/agents", icon: Sparkles, label: "Agents", feature: "ai.agent" },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    items: [
      { to: "/project/reports", icon: BarChart3, label: "Analytics" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings2,
    items: [
      { to: "/project/config", icon: Building2, label: "Workspace" },
      { to: "/project/quota", icon: Gauge, label: "Usage" },
      { to: "/project/number-history", icon: Search, label: "Number Lookup" },
      { to: "/project/docs", icon: Code2, label: "Developers" },
    ],
  },
];

const TOP_ITEM: NavItem = { to: "/project", icon: LayoutDashboard, label: "Dashboard", end: true };

const ProjectLayout = () => {
  const { user, logout } = useAuth();
  const { plan, planLabel, can } = usePlan();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Auto-open the group containing the active route
  const initialOpen = useMemo(() => {
    const groupForRoute = GROUPS.find((g) => g.items.some((i) => location.pathname.startsWith(i.to)));
    return groupForRoute ? { [groupForRoute.id]: true } : { campaigns: true, inbox: true };
  }, [location.pathname]);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(initialOpen);
  useEffect(() => {
    setOpenGroups((prev) => ({ ...prev, ...initialOpen }));
  }, [initialOpen]);

  const handleLogout = () => { logout(); navigate("/"); };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center gap-3 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
          <Send className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && <span className="text-lg font-bold text-sidebar-foreground tracking-tight">Samparq</span>}
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {/* Top: Dashboard */}
        <NavLink
          to={TOP_ITEM.to}
          end={TOP_ITEM.end}
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
              isActive ? "bg-sidebar-accent text-sidebar-primary" :
              "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            )
          }
        >
          <TOP_ITEM.icon className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>{TOP_ITEM.label}</span>}
        </NavLink>

        {GROUPS.map((g) => {
          const isOpen = collapsed ? true : openGroups[g.id];
          return (
            <div key={g.id} className="pt-1">
              {!collapsed && (
                <button
                  onClick={() => setOpenGroups((p) => ({ ...p, [g.id]: !p[g.id] }))}
                  className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-sidebar-muted hover:text-sidebar-foreground"
                >
                  <span className="flex items-center gap-1.5">
                    <g.icon className="w-3 h-3" /> {g.label}
                  </span>
                  <ChevronDown className={cn("w-3 h-3 transition-transform", !isOpen && "-rotate-90")} />
                </button>
              )}
              {isOpen && (
                <div className="space-y-0.5">
                  {g.items.map((item) => {
                    const locked = item.feature ? !can(item.feature) : false;
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all relative",
                            isActive ? "bg-sidebar-accent text-sidebar-primary" :
                            "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                          )
                        }
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1">{item.label}</span>
                            {locked && <Lock className="w-3 h-3 text-sidebar-muted" />}
                          </>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Plan footer */}
      {!collapsed && (
        <div className="px-3 pt-3 pb-2 border-t border-sidebar-border">
          <div className="rounded-lg bg-sidebar-accent/40 p-3">
            <div className="flex items-center justify-between mb-2">
              <PlanBadge plan={plan} />
              {plan !== "enterprise" && (
                <button
                  onClick={() => { navigate("/project/billing/upgrade"); setMobileOpen(false); }}
                  className="text-[10px] font-semibold text-sidebar-primary hover:underline flex items-center gap-0.5"
                >
                  <Rocket className="w-3 h-3" /> Upgrade
                </button>
              )}
            </div>
            <p className="text-[10px] text-sidebar-muted">
              {plan === "enterprise" ? "All features unlocked." : `Get more on ${plan === "starter" ? "Growth" : "Enterprise"}.`}
            </p>
          </div>
        </div>
      )}

      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => { navigate("/project/profile"); setMobileOpen(false); }}
          className={cn("flex items-center gap-3 px-3 py-2 mb-2 w-full rounded-lg hover:bg-sidebar-accent/50 transition-colors", collapsed && "justify-center")}
        >
          <div className="w-8 h-8 rounded-full bg-channel-whatsapp flex items-center justify-center text-xs font-bold text-primary-foreground flex-shrink-0">
            {user?.businessName?.charAt(0) ?? user?.projectName?.charAt(0) ?? "W"}
          </div>
          {!collapsed && (
            <div className="min-w-0 text-left">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.businessName ?? user?.projectName}</p>
              <p className="text-xs text-sidebar-muted truncate">{user?.email}</p>
            </div>
          )}
        </button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className={cn("w-full text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50", collapsed && "px-0")}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span className="ml-2">Sign Out</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {mobileOpen && (
        <div className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 gradient-sidebar transition-all duration-300",
          collapsed ? "w-[68px]" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border items-center justify-center shadow-sm hover:bg-muted transition-colors"
        >
          <ChevronLeft className={cn("w-3 h-3 text-muted-foreground transition-transform", collapsed && "rotate-180")} />
        </button>
      </aside>

      <main className={cn("flex-1 transition-all duration-300", collapsed ? "lg:ml-[68px]" : "lg:ml-64")}>
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-sm border-b border-border px-4 sm:px-6 h-14 flex items-center gap-4">
          <button className="lg:hidden p-2 -ml-2" onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="flex-1" />
        </header>
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ProjectLayout;
