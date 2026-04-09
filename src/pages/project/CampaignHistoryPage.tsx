import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, CheckCircle2, XCircle, Clock, FileText } from "lucide-react";

const history = [
  { id: 1, name: "Welcome Onboarding", channel: "Email", status: "Completed", sent: 2400, delivered: 2352, failed: 48, date: "Jun 8, 2025 13:15" },
  { id: 2, name: "OTP Verification Batch", channel: "SMS", status: "Completed", sent: 1200, delivered: 1176, failed: 24, date: "Jun 7, 2025 10:30" },
  { id: 3, name: "Order Updates", channel: "WhatsApp", status: "Completed", sent: 3400, delivered: 3318, failed: 82, date: "Jun 6, 2025 14:20" },
  { id: 4, name: "Account Alerts", channel: "SMS", status: "Failed", sent: 800, delivered: 0, failed: 800, date: "Jun 5, 2025 09:00" },
  { id: 5, name: "Password Reset Batch", channel: "Email", status: "Completed", sent: 340, delivered: 338, failed: 2, date: "Jun 4, 2025 16:45" },
  { id: 6, name: "Promo Campaign Q2", channel: "RCS", status: "Partially Failed", sent: 5000, delivered: 3800, failed: 1200, date: "Jun 3, 2025 11:00" },
  { id: 7, name: "Survey Invitation", channel: "Email", status: "Completed", sent: 1800, delivered: 1764, failed: 36, date: "Jun 2, 2025 08:30" },
  { id: 8, name: "Delivery Notification", channel: "WhatsApp", status: "Completed", sent: 920, delivered: 908, failed: 12, date: "Jun 1, 2025 15:10" },
];

const statusStyle: Record<string, string> = {
  Completed: "bg-success/10 text-success",
  Failed: "bg-destructive/10 text-destructive",
  "Partially Failed": "bg-warning/10 text-warning",
  "In Progress": "bg-info/10 text-info",
};

const CampaignHistoryPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Campaign History</h1>
      <p className="text-muted-foreground mt-1">View past campaign activity and performance</p>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "Total Campaigns", value: "47" },
        { label: "Total Sent", value: "17,300" },
        { label: "Avg. Success Rate", value: "96.8%" },
        { label: "Total Failed", value: "548" },
      ].map((s) => (
        <Card key={s.label} className="shadow-card">
          <CardContent className="pt-4 pb-3">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xl font-bold text-foreground mt-1">{s.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>

    <Card className="shadow-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              {["Campaign", "Channel", "Status", "Sent", "Delivered", "Failed", "Date"].map((h) => (
                <th key={h} className="text-left font-medium text-muted-foreground p-4 text-xs">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {history.map((c) => (
                <tr key={c.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 cursor-pointer">
                  <td className="p-4 font-medium text-foreground">{c.name}</td>
                  <td className="p-4 text-muted-foreground">{c.channel}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[c.status]}`}>{c.status}</span>
                  </td>
                  <td className="p-4 text-foreground">{c.sent.toLocaleString()}</td>
                  <td className="p-4 text-success">{c.delivered.toLocaleString()}</td>
                  <td className="p-4 text-destructive">{c.failed}</td>
                  <td className="p-4 text-muted-foreground text-xs whitespace-nowrap">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default CampaignHistoryPage;
