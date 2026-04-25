import { useState } from "react";
import WorkspaceFilter from "@/components/analytics/WorkspaceFilter";
import CampaignAnalyticsPage from "@/pages/project/analytics/CampaignAnalyticsPage";

const AdminCampaignAnalyticsPage = () => {
  const [ws, setWs] = useState("All workspaces");
  return (
    <div className="space-y-3">
      <div className="flex justify-end"><WorkspaceFilter value={ws} onChange={setWs} /></div>
      <CampaignAnalyticsPage />
    </div>
  );
};
export default AdminCampaignAnalyticsPage;
