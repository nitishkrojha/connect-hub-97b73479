import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const campaigns = [
  { id: 1, name: "Welcome Onboarding", channel: "Email", status: "Completed", recipients: 2400, delivered: 2352, date: "Jun 8, 2025" },
  { id: 2, name: "OTP Verification Batch", channel: "SMS", status: "In Progress", recipients: 1200, delivered: 890, date: "Jun 9, 2025" },
  { id: 3, name: "Order Updates", channel: "WhatsApp", status: "Completed", recipients: 3400, delivered: 3318, date: "Jun 7, 2025" },
  { id: 4, name: "Summer Promo", channel: "RCS", status: "Scheduled", recipients: 5000, delivered: 0, date: "Jun 15, 2025" },
  { id: 5, name: "Account Alerts", channel: "SMS", status: "Failed", recipients: 800, delivered: 0, date: "Jun 6, 2025" },
  { id: 6, name: "Newsletter June", channel: "Email", status: "Draft", recipients: 0, delivered: 0, date: "—" },
];

const statusStyle: Record<string, string> = {
  Completed: "bg-success/10 text-success",
  "In Progress": "bg-info/10 text-info",
  Scheduled: "bg-warning/10 text-warning",
  Failed: "bg-destructive/10 text-destructive",
  Draft: "bg-muted text-muted-foreground",
};

const CampaignsPage = () => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
        <p className="text-muted-foreground mt-1">Create and manage communication campaigns</p>
      </div>
      <Button><Plus className="w-4 h-4 mr-2" /> New Campaign</Button>
    </div>

    <div className="relative max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input placeholder="Search campaigns..." className="pl-9" />
    </div>

    <Card className="shadow-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Campaign", "Channel", "Status", "Recipients", "Delivered", "Date"].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground p-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                  <td className="p-4 text-sm font-medium text-foreground">{c.name}</td>
                  <td className="p-4 text-sm text-muted-foreground">{c.channel}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[c.status]}`}>{c.status}</span>
                  </td>
                  <td className="p-4 text-sm text-foreground">{c.recipients.toLocaleString()}</td>
                  <td className="p-4 text-sm text-foreground">{c.delivered.toLocaleString()}</td>
                  <td className="p-4 text-sm text-muted-foreground">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default CampaignsPage;
