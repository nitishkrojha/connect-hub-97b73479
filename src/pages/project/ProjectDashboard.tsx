import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Megaphone, MessageSquare, CheckCircle2, XCircle, TrendingUp,
  Smartphone, Mail, Sparkles, Clock, CalendarDays, FileText, Phone,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const weeklyData = [
  { day: "Mon", sent: 1240, delivered: 1198 },
  { day: "Tue", sent: 1580, delivered: 1531 },
  { day: "Wed", sent: 1320, delivered: 1272 },
  { day: "Thu", sent: 1890, delivered: 1845 },
  { day: "Fri", sent: 2100, delivered: 2040 },
  { day: "Sat", sent: 780, delivered: 762 },
  { day: "Sun", sent: 450, delivered: 441 },
];

const channelUsage = [
  { name: "SMS", sent: 3200, color: "hsl(262, 83%, 58%)" },
  { name: "WhatsApp", sent: 4800, color: "hsl(142, 70%, 45%)" },
  { name: "Email", sent: 8200, color: "hsl(217, 91%, 50%)" },
  { name: "RCS", sent: 1100, color: "hsl(38, 92%, 50%)" },
  { name: "IVRS", sent: 2400, color: "hsl(173, 58%, 39%)" },
];

const recentCampaigns = [
  { name: "Welcome Onboarding", channel: "Email", status: "Completed", sent: 2400, date: "2 hours ago" },
  { name: "OTP Verification", channel: "SMS", status: "In Progress", sent: 890, date: "30 min ago" },
  { name: "Order Confirmation", channel: "WhatsApp", status: "Completed", sent: 1200, date: "5 hours ago" },
  { name: "Promo Blast June", channel: "RCS", status: "Scheduled", sent: 0, date: "Tomorrow 9AM" },
  { name: "Password Reset", channel: "Email", status: "Completed", sent: 340, date: "1 day ago" },
];

const templateUsage = [
  { name: "OTP Verification", id: "TPL-SMS-00001", channel: "SMS", sent: 8420, rate: 98.0 },
  { name: "Welcome Message", id: "TPL-WA-00002", channel: "WhatsApp", sent: 5640, rate: 98.0 },
  { name: "Welcome Email", id: "TPL-EML-00003", channel: "Email", sent: 4200, rate: 97.0 },
  { name: "Appointment Reminder", id: "TPL-SMS-00006", channel: "SMS", sent: 2180, rate: 98.0 },
];

const statusColors: Record<string, string> = {
  Completed: "bg-success/10 text-success",
  "In Progress": "bg-info/10 text-info",
  Scheduled: "bg-warning/10 text-warning",
  Failed: "bg-destructive/10 text-destructive",
};

const stats = [
  { label: "Total Campaigns", value: "47", icon: Megaphone, trend: "+5 this week" },
  { label: "Messages Today", value: "3,240", icon: MessageSquare, trend: "+18.2%" },
  { label: "Delivery Rate", value: "97.1%", icon: CheckCircle2, trend: "+0.3%" },
  { label: "Failed Today", value: "94", icon: XCircle, trend: "-12 vs yesterday" },
];

const ProjectDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Project Dashboard</h1>
        <p className="text-muted-foreground mt-1">Project Alpha — Communication overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-card hover:shadow-card-hover transition-shadow animate-fade-in">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs">
                <TrendingUp className="w-3 h-3 text-success" />
                <span className="text-success font-medium">{s.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quota bar */}
      <Card className="shadow-card">
        <CardContent className="pt-5 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Monthly Quota Usage</span>
            <span className="text-sm text-muted-foreground">17,300 / 25,000</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div className="bg-primary rounded-full h-3 transition-all" style={{ width: "69.2%" }} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">69.2% consumed — 7,700 remaining</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Weekly Sending Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="sentGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(217, 91%, 50%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(217, 91%, 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} />
                  <Area type="monotone" dataKey="sent" stroke="hsl(217, 91%, 50%)" fill="url(#sentGrad)" strokeWidth={2} />
                  <Area type="monotone" dataKey="delivered" stroke="hsl(142, 70%, 45%)" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Channel Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {channelUsage.map((ch) => (
                <div key={ch.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{ch.name}</span>
                    <span className="text-xs text-muted-foreground">{ch.sent.toLocaleString()}</span>
                  </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="rounded-full h-2 transition-all" style={{ width: `${(ch.sent / 8200) * 100}%`, backgroundColor: ch.color }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Campaigns */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Recent Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4">Campaign</th>
                  <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4">Channel</th>
                  <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4">Status</th>
                  <th className="text-right text-xs font-medium text-muted-foreground pb-3 pr-4">Sent</th>
                  <th className="text-right text-xs font-medium text-muted-foreground pb-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentCampaigns.map((c) => (
                  <tr key={c.name} className="border-b border-border/50 last:border-0">
                    <td className="py-3 pr-4 text-sm font-medium text-foreground">{c.name}</td>
                    <td className="py-3 pr-4 text-sm text-muted-foreground">{c.channel}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[c.status]}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-sm text-foreground text-right">{c.sent.toLocaleString()}</td>
                    <td className="py-3 text-xs text-muted-foreground text-right">{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Template Usage */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Template Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4">Template</th>
                  <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4">Template ID</th>
                  <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4">Channel</th>
                  <th className="text-right text-xs font-medium text-muted-foreground pb-3 pr-4">Sent</th>
                  <th className="text-right text-xs font-medium text-muted-foreground pb-3">Success Rate</th>
                </tr>
              </thead>
              <tbody>
                {templateUsage.map((t) => (
                  <tr key={t.id} className="border-b border-border/50 last:border-0">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{t.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">{t.id}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge variant="secondary" className="text-xs">{t.channel}</Badge>
                    </td>
                    <td className="py-3 pr-4 text-sm text-foreground text-right">{t.sent.toLocaleString()}</td>
                    <td className="py-3 text-right">
                      <Badge variant="secondary" className="text-xs">{t.rate}%</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDashboard;
