import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import ProjectLayout from "./layouts/ProjectLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProjectsPage from "./pages/admin/ProjectsPage";
import ProjectDashboard from "./pages/project/ProjectDashboard";
import CampaignsPage from "./pages/project/CampaignsPage";
import PlaceholderPage from "./components/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role: "admin" | "project" }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (user?.role !== role) return <Navigate to={`/${user?.role}`} replace />;
  return <>{children}</>;
};

const RootRedirect = () => {
  const { user, isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to={`/${user?.role}`} replace />;
  return <LoginPage />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootRedirect />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="channels" element={<PlaceholderPage title="Channel Configuration" description="Configure SMS, WhatsApp, Email & RCS providers" />} />
              <Route path="templates" element={<PlaceholderPage title="Template Management" description="Manage and approve message templates" />} />
              <Route path="reports" element={<PlaceholderPage title="Reports & Analytics" description="View overall communication analytics" />} />
              <Route path="quota" element={<PlaceholderPage title="Quota Management" description="Set and manage project quotas" />} />
              <Route path="audit" element={<PlaceholderPage title="Audit Logs" description="View system activity and change logs" />} />
              <Route path="users" element={<PlaceholderPage title="User Management" description="Manage admin and project users" />} />
            </Route>

            {/* Project Routes */}
            <Route path="/project" element={<ProtectedRoute role="project"><ProjectLayout /></ProtectedRoute>}>
              <Route index element={<ProjectDashboard />} />
              <Route path="campaigns" element={<CampaignsPage />} />
              <Route path="send" element={<PlaceholderPage title="Send Message" description="Send messages via SMS, WhatsApp, Email or RCS" />} />
              <Route path="templates" element={<PlaceholderPage title="Templates" description="Manage your project message templates" />} />
              <Route path="upload" element={<PlaceholderPage title="Upload Recipients" description="Upload CSV files with recipient data" />} />
              <Route path="reports" element={<PlaceholderPage title="Reports" description="View your project communication reports" />} />
              <Route path="config" element={<PlaceholderPage title="Configuration" description="Configure project-level communication settings" />} />
              <Route path="quota" element={<PlaceholderPage title="Quota Usage" description="Monitor your quota consumption" />} />
              <Route path="history" element={<PlaceholderPage title="Campaign History" description="View past campaign activity" />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
