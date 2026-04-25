import AnalyticsShell from "@/components/analytics/AnalyticsShell";
import KpiCard from "@/components/analytics/KpiCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Inbox, Clock, CheckCircle2, MessageSquare } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const trend = Array.from({ length: 14 }).map((_, i) => ({
  day: `D${i + 1}`,
  conversations: 120 + Math.round(Math.sin(i / 2) * 30 + Math.random() * 40),
  resolved: 90 + Math.round(Math.sin(i / 2) * 25 + Math.random() * 30),
}));

const byChannel = [
  { channel: "WhatsApp", received: 980, resolved: 742 },
  { channel: "Email", received: 320, resolved: 221 },
  { channel: "Web Chat", received: 540, resolved: 438 },
  { channel: "Instagram", received: 95, resolved: 72 },
  { channel: "Facebook", received: 180, resolved: 141 },
  { channel: "Telegram", received: 140, resolved: 110 },
];

const agents = [
  { name: "Anita Sharma", handled: 142, avgResp: "1m 12s", csat: 94 },
  { name: "Rahul Verma", handled: 128, avgResp: "1m 38s", csat: 91 },
  { name: "Priya Iyer", handled: 119, avgResp: "1m 52s", csat: 89 },
  { name: "Karan Mehta", handled: 102, avgResp: "2m 04s", csat: 87 },
];

const InboxAnalyticsPage = () => (
  <AnalyticsShell title="Inbox Analytics" subtitle="Conversation volume, response time and agent performance.">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard label="Conversations" value="2,855" icon={Inbox} trend="+8.1%" />
      <KpiCard label="Avg first response" value="1m 28s" icon={Clock} trend="-12s" trendDir="down" />
      <KpiCard label="Resolved" value="2,224" icon={CheckCircle2} trend="+6.4%" />
      <KpiCard label="CSAT" value="91%" icon={MessageSquare} trend="+1.2%" />
    </div>

    <Card className="shadow-card">
      <CardHeader><CardTitle className="text-sm font-semibold">Conversation trend</CardTitle></CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend}>
              <defs>
                <linearGradient id="ibConv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--info))" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(var(--info))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} />
              <Legend />
              <Area type="monotone" dataKey="conversations" stroke="hsl(var(--info))" fill="url(#ibConv)" strokeWidth={2} />
              <Area type="monotone" dataKey="resolved" stroke="hsl(var(--success))" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-sm font-semibold">By channel</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byChannel}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="channel" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} />
                <Bar dataKey="received" fill="hsl(var(--info))" radius={[4,4,0,0]} />
                <Bar dataKey="resolved" fill="hsl(var(--success))" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-sm font-semibold">Top agents</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {agents.map((a) => (
            <div key={a.name} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                {a.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.handled} handled · {a.avgResp} avg response</p>
              </div>
              <Badge variant="secondary" className="text-xs">{a.csat}% CSAT</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>

    <Card className="shadow-card">
      <CardHeader><CardTitle className="text-sm font-semibold">Channel report</CardTitle></CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Channel", "Received", "Resolved", "Resolution %"].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground p-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {byChannel.map((r) => (
                <tr key={r.channel} className="border-b border-border/40 last:border-0 hover:bg-muted/30">
                  <td className="p-3 font-medium text-foreground">{r.channel}</td>
                  <td className="p-3 text-foreground">{r.received.toLocaleString()}</td>
                  <td className="p-3 text-foreground">{r.resolved.toLocaleString()}</td>
                  <td className="p-3"><Badge variant="secondary" className="text-xs">{Math.round((r.resolved / r.received) * 100)}%</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </AnalyticsShell>
);

export default InboxAnalyticsPage;
