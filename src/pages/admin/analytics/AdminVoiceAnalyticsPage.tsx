import { useState } from "react";
import WorkspaceFilter from "@/components/analytics/WorkspaceFilter";
import VoiceAnalyticsPage from "@/pages/project/analytics/VoiceAnalyticsPage";

const AdminVoiceAnalyticsPage = () => {
  const [ws, setWs] = useState("All workspaces");
  return (
    <div className="space-y-3">
      <div className="flex justify-end"><WorkspaceFilter value={ws} onChange={setWs} /></div>
      <VoiceAnalyticsPage />
    </div>
  );
};
export default AdminVoiceAnalyticsPage;
