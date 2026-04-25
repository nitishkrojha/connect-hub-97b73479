import { useState } from "react";
import WorkspaceFilter from "@/components/analytics/WorkspaceFilter";
import ProjectDashboard from "@/pages/project/ProjectDashboard";

const AdminDashboard = () => {
  const [ws, setWs] = useState("All workspaces");
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Operational summary across every workspace.</p>
        </div>
        <WorkspaceFilter value={ws} onChange={setWs} />
      </div>
      <ProjectDashboard />
    </div>
  );
};

export default AdminDashboard;
