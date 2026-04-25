import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import OnboardingSuccessPage from "./pages/OnboardingSuccessPage";
import MarketingLayout from "./marketing/MarketingLayout";
import HomePage from "./marketing/HomePage";
import SolutionsPage from "./marketing/SolutionsPage";
import PricingPage from "./marketing/PricingPage";
import DocsPage from "./marketing/DocsPage";
import ContactPage from "./marketing/ContactPage";
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
import AnalyticsHubPage from "./pages/project/analytics/AnalyticsHubPage";
import CampaignAnalyticsPage from "./pages/project/analytics/CampaignAnalyticsPage";
import InboxAnalyticsPage from "./pages/project/analytics/InboxAnalyticsPage";
import VoiceAnalyticsPage from "./pages/project/analytics/VoiceAnalyticsPage";
import AdminAnalyticsHubPage from "./pages/admin/analytics/AdminAnalyticsHubPage";
import AdminCampaignAnalyticsPage from "./pages/admin/analytics/AdminCampaignAnalyticsPage";
import AdminInboxAnalyticsPage from "./pages/admin/analytics/AdminInboxAnalyticsPage";
import AdminVoiceAnalyticsPage from "./pages/admin/analytics/AdminVoiceAnalyticsPage";
import ProjectConfigPage from "./pages/project/ProjectConfigPage";
import ProjectQuotaPage from "./pages/project/ProjectQuotaPage";
import CampaignHistoryPage from "./pages/project/CampaignHistoryPage";
import DeveloperDocsPage from "./pages/project/DeveloperDocsPage";
import InboxPage from "./pages/project/InboxPage";
import VoiceDashboardPage from "./pages/project/VoiceDashboardPage";
import ClickToCallPage from "./pages/project/ClickToCallPage";
import VoiceBroadcastPage from "./pages/project/VoiceBroadcastPage";
import IVRStudioPage from "./pages/project/IVRStudioPage";
import CallLogsPage from "./pages/project/CallLogsPage";
import ContactSyncApiPage from "./pages/project/ContactSyncApiPage";
import AIAgentStudioPage from "./pages/project/AIAgentStudioPage";
import UpgradePlanPage from "./pages/project/UpgradePlanPage";
import { PlanGate } from "./components/PlanGate";
import ProfilePage from "./pages/ProfilePage";
import NumberHistoryPage from "./pages/NumberHistoryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role: "admin" | "project" }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== role) return <Navigate to={`/${user?.role}`} replace />;
  return <>{children}</>;
};

const LoginRoute = () => {
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
            <Route element={<MarketingLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
            <Route path="/login" element={<LoginRoute />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/onboarding/success" element={<OnboardingSuccessPage />} />

            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="channels" element={<AdminChannelsPage />} />
              <Route path="templates" element={<AdminTemplatesPage />} />
              <Route path="reports" element={<AdminReportsPage />} />
              <Route path="quota" element={<AdminQuotaPage />} />
              <Route path="audit" element={<AdminAuditPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="number-history" element={<NumberHistoryPage />} />
              <Route path="docs" element={<DeveloperDocsPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            <Route path="/project" element={<ProtectedRoute role="project"><ProjectLayout /></ProtectedRoute>}>
              <Route index element={<ProjectDashboard />} />
              <Route path="campaigns" element={<CampaignsPage />} />
              <Route path="send" element={<SendMessagePage />} />
              <Route path="inbox" element={<InboxPage />} />
              <Route path="templates" element={<ProjectTemplatesPage />} />
              <Route path="upload" element={<UploadRecipientsPage />} />
              <Route path="campaigns/contacts-api" element={<PlanGate feature="send.contactSyncApi"><ContactSyncApiPage /></PlanGate>} />
              <Route path="reports" element={<ProjectReportsPage />} />
              <Route path="config" element={<ProjectConfigPage />} />
              <Route path="quota" element={<ProjectQuotaPage />} />
              <Route path="history" element={<CampaignHistoryPage />} />
              <Route path="number-history" element={<NumberHistoryPage />} />
              <Route path="docs" element={<DeveloperDocsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              {/* Voice */}
              <Route path="voice/dashboard" element={<VoiceDashboardPage />} />
              <Route path="voice/click-to-call" element={<ClickToCallPage />} />
              <Route path="voice/broadcast" element={<VoiceBroadcastPage />} />
              <Route path="voice/ivr" element={<PlanGate feature="voice.ivrStudio"><IVRStudioPage /></PlanGate>} />
              <Route path="voice/logs" element={<CallLogsPage />} />
              {/* AI */}
              <Route path="ai/agents" element={<PlanGate feature="ai.agent"><AIAgentStudioPage /></PlanGate>} />
              {/* Billing */}
              <Route path="billing/upgrade" element={<UpgradePlanPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
