import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Save, AlertTriangle } from "lucide-react";

const projects = [
  { id: "alpha", name: "Project Alpha", monthly: 25000, daily: 2000, sms: 10000, whatsapp: 8000, email: 15000, rcs: 5000, used: 17300, alert: 80 },
  { id: "finsv", name: "FinServe", monthly: 30000, daily: 3000, sms: 15000, whatsapp: 0, email: 25000, rcs: 0, used: 24100, alert: 75 },
  { id: "hlnk", name: "HealthLink", monthly: 20000, daily: 1500, sms: 8000, whatsapp: 6000, email: 15000, rcs: 5000, used: 19800, alert: 90 },
  { id: "educ", name: "EduConnect", monthly: 15000, daily: 1200, sms: 0, whatsapp: 8000, email: 12000, rcs: 0, used: 16200, alert: 80 },
  { id: "rtlp", name: "RetailPro", monthly: 10000, daily: 800, sms: 5000, whatsapp: 0, email: 0, rcs: 5000, used: 3500, alert: 85 },
];

const AdminQuotaPage = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0].id);
  const [blockOnExhaust, setBlockOnExhaust] = useState(true);

  const project = projects.find((p) => p.id === selectedProject)!;
  const usagePercent = (project.used / project.monthly) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Quota Management</h1>
        <p className="text-muted-foreground mt-1">Set and manage project-wise communication quotas</p>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Allocated", value: "100,000" },
          { label: "Total Consumed", value: "80,900" },
          { label: "Over-Utilized Projects", value: "1" },
        ].map((s) => (
          <Card key={s.label} className="shadow-card">
            <CardContent className="pt-4 pb-3">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-xl font-bold text-foreground mt-1">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* All projects usage */}
      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Project Quota Usage</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                {["Project", "Monthly Limit", "Used", "Remaining", "Usage", "Status"].map((h) => (
                  <th key={h} className="text-left font-medium text-muted-foreground p-4 text-xs">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {projects.map((p) => {
                  const pct = (p.used / p.monthly) * 100;
                  return (
                    <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                      <td className="p-4 font-medium text-foreground">{p.name}</td>
                      <td className="p-4 text-foreground">{p.monthly.toLocaleString()}</td>
                      <td className="p-4 text-foreground">{p.used.toLocaleString()}</td>
                      <td className="p-4 text-muted-foreground">{Math.max(0, p.monthly - p.used).toLocaleString()}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div className={`rounded-full h-2 ${pct > 100 ? "bg-destructive" : pct > 80 ? "bg-warning" : "bg-primary"}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{pct.toFixed(0)}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {pct > 100 ? (
                          <Badge variant="destructive" className="text-xs">Over Limit</Badge>
                        ) : pct > 80 ? (
                          <Badge className="bg-warning/10 text-warning text-xs">Warning</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">Normal</Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Quota */}
      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Edit Project Quota</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div>
            <Label className="text-foreground mb-1.5 block">Select Project</Label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="max-w-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                {projects.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div><Label className="text-foreground text-sm">Monthly Limit</Label><Input type="number" defaultValue={project.monthly} className="mt-1.5" /></div>
            <div><Label className="text-foreground text-sm">Daily Limit</Label><Input type="number" defaultValue={project.daily} className="mt-1.5" /></div>
            <div><Label className="text-foreground text-sm">Alert Threshold (%)</Label><Input type="number" defaultValue={project.alert} className="mt-1.5" /></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div><Label className="text-foreground text-sm">SMS Limit</Label><Input type="number" defaultValue={project.sms} className="mt-1.5" /></div>
            <div><Label className="text-foreground text-sm">WhatsApp Limit</Label><Input type="number" defaultValue={project.whatsapp} className="mt-1.5" /></div>
            <div><Label className="text-foreground text-sm">Email Limit</Label><Input type="number" defaultValue={project.email} className="mt-1.5" /></div>
            <div><Label className="text-foreground text-sm">RCS Limit</Label><Input type="number" defaultValue={project.rcs} className="mt-1.5" /></div>
          </div>

          <div className="flex items-center gap-3">
            <Switch checked={blockOnExhaust} onCheckedChange={setBlockOnExhaust} />
            <Label className="text-foreground text-sm">Block sending when quota exhausted</Label>
          </div>

          <Button onClick={() => toast.success("Quota updated successfully")}><Save className="w-4 h-4 mr-2" />Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminQuotaPage;
