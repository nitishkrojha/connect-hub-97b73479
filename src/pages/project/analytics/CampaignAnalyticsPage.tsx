import AnalyticsShell from "@/components/analytics/AnalyticsShell";
import KpiCard from "@/components/analytics/KpiCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Send, CheckCircle2, MousePointerClick, Eye } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const weekly = [
  { day: "Mon", sent: 1240, delivered: 1198 },
  { day: "Tue", sent: 1580, delivered: 1531 },
  { day: "Wed", sent: 1320, delivered: 1272 },
  { day: "Thu", sent: 1890, delivered: 1845 },
  { day: "Fri", sent: 2100, delivered: 2040 },
  { day: "Sat", sent: 780, delivered: 762 },
  { day: "Sun", sent: 450, delivered: 441 },
];

const byChannel = [
  { channel: "WhatsApp", sent: 4800, delivered: 4720 },
  { channel: "SMS", sent: 3200, delivered: 3140 },
  { channel: "Email", sent: 8200, delivered: 8000 },
  { channel: "RCS", sent: 1100, delivered: 1060 },
];

const reports = [
  { name: "Welcome Onboarding", channel: "Email", status: "Completed", sent: 2400, delivered: 2352, opened: 1820, clicked: 640, rate: 98.0 },
  { name: "OTP Verification Batch", channel: "SMS", status: "Completed", sent: 1200, delivered: 1176, opened: 0, clicked: 0, rate: 98.0 },
  { name: "Order Confirmation", channel: "WhatsApp", status: "Completed", sent: 3400, delivered: 3318, opened: 3100, clicked: 1250, rate: 97.6 },
  { name: "Monthly Newsletter", channel: "Email", status: "Completed", sent: 5200, delivered: 4940, opened: 3200, clicked: 980, rate: 95.0 },
  { name: "Promo Campaign Q2", channel: "RCS", status: "Partially Failed", sent: 5000, delivered: 3800, opened: 2800, clicked: 1100, rate: 76.0 },
];

const statusStyle: Record<string, string> = {
  Completed: "bg-success/10 text-success",
  "Partially Failed": "bg-warning/10 text-warning",
  Failed: "bg-destructive/10 text-destructive",
};

const CampaignAnalyticsPage = () => (
  <AnalyticsShell title="Campaign Analytics" subtitle="Outbound performance across SMS, WhatsApp, Email and RCS.">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard label="Total sent" value="17,300" icon={Send} trend="+12.4%" />
      <KpiCard label="Delivered" value="16,802" icon={CheckCircle2} trend="+0.3% rate" />
      <KpiCard label="Opens" value="11,058" icon={Eye} trend="+6.1%" />
      <KpiCard label="Clicks" value="3,118" icon={MousePointerClick} trend="+4.8%" />
    </div>

    <Card className="shadow-card">
      <CardHeader><CardTitle className="text-sm font-semibold">Sending activity</CardTitle></CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weekly}>
              <defs>
                <linearGradient id="cgSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} />
              <Legend />
              <Area type="monotone" dataKey="sent" stroke="hsl(var(--primary))" fill="url(#cgSent)" strokeWidth={2} />
              <Area type="monotone" dataKey="delivered" stroke="hsl(var(--success))" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-sm font-semibold">Volume by channel</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byChannel}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="channel" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} />
                <Bar dataKey="sent" fill="hsl(var(--primary))" radius={[4,4,0,0]} />
                <Bar dataKey="delivered" fill="hsl(var(--success))" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-sm font-semibold">Top campaigns</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {reports.slice(0, 5).map((r) => (
            <div key={r.name} className="flex items-center gap-3">
              <Megaphone className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.channel} · {r.delivered.toLocaleString()} delivered</p>
              </div>
              <Badge variant="secondary" className="text-xs">{r.rate}%</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>

    <Card className="shadow-card">
      <CardHeader><CardTitle className="text-sm font-semibold">Campaign report</CardTitle></CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Campaign", "Channel", "Status", "Sent", "Delivered", "Opens", "Clicks", "Rate"].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground p-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.name} className="border-b border-border/40 last:border-0 hover:bg-muted/30">
                  <td className="p-3 font-medium text-foreground">{r.name}</td>
                  <td className="p-3 text-muted-foreground">{r.channel}</td>
                  <td className="p-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[r.status]}`}>{r.status}</span>
                  </td>
                  <td className="p-3 text-foreground">{r.sent.toLocaleString()}</td>
                  <td className="p-3 text-foreground">{r.delivered.toLocaleString()}</td>
                  <td className="p-3 text-muted-foreground">{r.opened.toLocaleString()}</td>
                  <td className="p-3 text-muted-foreground">{r.clicked.toLocaleString()}</td>
                  <td className="p-3"><Badge variant="secondary" className="text-xs">{r.rate}%</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </AnalyticsShell>
);

export default CampaignAnalyticsPage;
