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
import AdminChannelsPage from "./pages/admin/AdminChannelsPage";
import AdminTemplatesPage from "./pages/admin/AdminTemplatesPage";
import AdminReportsPage from "./pages/admin/AdminReportsPage";
import AdminQuotaPage from "./pages/admin/AdminQuotaPage";
import AdminAuditPage from "./pages/admin/AdminAuditPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import ProjectDashboard from "./pages/project/ProjectDashboard";
import CampaignsPage from "./pages/project/CampaignsPage";
import SendMessagePage from "./pages/project/SendMessagePage";
import ProjectTemplatesPage from "./pages/project/ProjectTemplatesPage";
import UploadRecipientsPage from "./pages/project/UploadRecipientsPage";
import ProjectReportsPage from "./pages/project/ProjectReportsPage";
import ProjectConfigPage from "./pages/project/ProjectConfigPage";
import ProjectQuotaPage from "./pages/project/ProjectQuotaPage";
import CampaignHistoryPage from "./pages/project/CampaignHistoryPage";
import DeveloperDocsPage from "./pages/project/DeveloperDocsPage";
import ProfilePage from "./pages/ProfilePage";
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

            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="channels" element={<AdminChannelsPage />} />
              <Route path="templates" element={<AdminTemplatesPage />} />
              <Route path="reports" element={<AdminReportsPage />} />
              <Route path="quota" element={<AdminQuotaPage />} />
              <Route path="audit" element={<AdminAuditPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            <Route path="/project" element={<ProtectedRoute role="project"><ProjectLayout /></ProtectedRoute>}>
              <Route index element={<ProjectDashboard />} />
              <Route path="campaigns" element={<CampaignsPage />} />
              <Route path="send" element={<SendMessagePage />} />
              <Route path="templates" element={<ProjectTemplatesPage />} />
              <Route path="upload" element={<UploadRecipientsPage />} />
              <Route path="reports" element={<ProjectReportsPage />} />
              <Route path="config" element={<ProjectConfigPage />} />
              <Route path="quota" element={<ProjectQuotaPage />} />
              <Route path="history" element={<CampaignHistoryPage />} />
              <Route path="docs" element={<DeveloperDocsPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
