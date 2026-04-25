import { useState } from "react";
import WorkspaceFilter from "@/components/analytics/WorkspaceFilter";
import InboxAnalyticsPage from "@/pages/project/analytics/InboxAnalyticsPage";

const AdminInboxAnalyticsPage = () => {
  const [ws, setWs] = useState("All workspaces");
  return (
    <div className="space-y-3">
      <div className="flex justify-end"><WorkspaceFilter value={ws} onChange={setWs} /></div>
      <InboxAnalyticsPage />
    </div>
  );
};
export default AdminInboxAnalyticsPage;
