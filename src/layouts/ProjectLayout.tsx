import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, Megaphone, Send, FileText, Upload,
  BarChart3, Settings2, Gauge, History, LogOut, Menu, ChevronLeft, Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const projectNav = [
  { to: "/project", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/project/campaigns", icon: Megaphone, label: "Campaigns" },
  { to: "/project/send", icon: Send, label: "Send Message" },
  { to: "/project/templates", icon: FileText, label: "Templates" },
  { to: "/project/upload", icon: Upload, label: "Upload Recipients" },
  { to: "/project/reports", icon: BarChart3, label: "Reports" },
  { to: "/project/config", icon: Settings2, label: "Configuration" },
  { to: "/project/quota", icon: Gauge, label: "Quota" },
  { to: "/project/history", icon: History, label: "History" },
  { to: "/project/docs", icon: Code2, label: "Developer Docs" },
];

const ProjectLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center gap-3 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
          <Send className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && <span className="text-lg font-bold text-sidebar-foreground tracking-tight">DIC Notifier</span>}
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {projectNav.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              )
            }
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <div className={cn("flex items-center gap-3 px-3 py-2 mb-2", collapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-channel-whatsapp flex items-center justify-center text-xs font-bold text-primary-foreground flex-shrink-0">
            {user?.projectName?.charAt(0) ?? "P"}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.projectName}</p>
              <p className="text-xs text-sidebar-muted truncate">{user?.email}</p>
            </div>
          )}
        </div>
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
