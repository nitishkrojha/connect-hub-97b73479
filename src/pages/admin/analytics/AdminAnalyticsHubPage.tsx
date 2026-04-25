import { useState } from "react";
import WorkspaceFilter from "@/components/analytics/WorkspaceFilter";
import AnalyticsHubPage from "@/pages/project/analytics/AnalyticsHubPage";

const AdminAnalyticsHubPage = () => {
  const [ws, setWs] = useState("All workspaces");
  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <WorkspaceFilter value={ws} onChange={setWs} />
      </div>
      <AnalyticsHubPage />
    </div>
  );
};
export default AdminAnalyticsHubPage;
