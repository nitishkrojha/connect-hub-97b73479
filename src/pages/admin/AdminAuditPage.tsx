import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollText, Building2, Settings2, Send, FileText, Upload, UserPlus, LogIn } from "lucide-react";

const logs = [
  { id: 1, user: "Admin User", action: "Created project", details: 'Created "India Handmade" project', timestamp: "Jun 9, 2025 14:32", type: "project" },
  { id: 2, user: "Ravi Kumar", action: "Campaign sent", details: "Welcome Onboarding — 2,400 recipients via Email", timestamp: "Jun 9, 2025 13:15", type: "campaign" },
  { id: 3, user: "Admin User", action: "Config updated", details: "SMS Gateway: Updated API endpoint", timestamp: "Jun 9, 2025 12:50", type: "config" },
  { id: 4, user: "Priya S.", action: "CSV uploaded", details: "promo_list.csv — 5,200 records", timestamp: "Jun 9, 2025 11:30", type: "upload" },
  { id: 5, user: "Admin User", action: "Template approved", details: 'Approved "Invoice Template" for Email', timestamp: "Jun 8, 2025 17:20", type: "template" },
  { id: 6, user: "Dr. Mehta", action: "Manual send", details: "Sent SMS to +91 98765 43210", timestamp: "Jun 8, 2025 16:45", type: "send" },
  { id: 7, user: "Admin User", action: "User created", details: 'Created user "Vikram J." for India Handmade', timestamp: "Jun 8, 2025 15:10", type: "user" },
  { id: 8, user: "Anita R.", action: "Login", details: "Logged in from 192.168.1.105", timestamp: "Jun 8, 2025 14:00", type: "login" },
  { id: 9, user: "Admin User", action: "Quota updated", details: 'Manas: Monthly limit changed 15,000 → 20,000', timestamp: "Jun 7, 2025 10:30", type: "config" },
  { id: 10, user: "Admin User", action: "Template rejected", details: 'Rejected "Promo Card" for RCS — missing compliance info', timestamp: "Jun 7, 2025 09:15", type: "template" },
];

const typeConfig: Record<string, { icon: typeof ScrollText; badgeClass: string }> = {
  project: { icon: Building2, badgeClass: "bg-primary/10 text-primary" },
  campaign: { icon: Send, badgeClass: "bg-success/10 text-success" },
  config: { icon: Settings2, badgeClass: "bg-info/10 text-info" },
  upload: { icon: Upload, badgeClass: "bg-channel-whatsapp/10 text-channel-whatsapp" },
  template: { icon: FileText, badgeClass: "bg-warning/10 text-warning" },
  send: { icon: Send, badgeClass: "bg-channel-sms/10 text-channel-sms" },
  user: { icon: UserPlus, badgeClass: "bg-channel-rcs/10 text-channel-rcs" },
  login: { icon: LogIn, badgeClass: "bg-muted text-muted-foreground" },
};

const AdminAuditPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Audit Logs</h1>
      <p className="text-muted-foreground mt-1">System activity and change history</p>
    </div>

    <Card className="shadow-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              {["", "User", "Action", "Details", "Timestamp"].map((h) => (
                <th key={h} className="text-left font-medium text-muted-foreground p-4 text-xs">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {logs.map((l) => {
                const cfg = typeConfig[l.type];
                const Icon = cfg.icon;
                return (
                  <tr key={l.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                    <td className="p-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cfg.badgeClass}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </td>
                    <td className="p-4 font-medium text-foreground whitespace-nowrap">{l.user}</td>
                    <td className="p-4 text-foreground">{l.action}</td>
                    <td className="p-4 text-muted-foreground max-w-xs truncate">{l.details}</td>
                    <td className="p-4 text-muted-foreground text-xs whitespace-nowrap">{l.timestamp}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AdminAuditPage;
