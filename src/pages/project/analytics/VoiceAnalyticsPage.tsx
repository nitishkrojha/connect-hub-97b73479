import AnalyticsShell from "@/components/analytics/AnalyticsShell";
import KpiCard from "@/components/analytics/KpiCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const trend = Array.from({ length: 14 }).map((_, i) => ({
  day: `D${i + 1}`,
  inbound: 60 + Math.round(Math.sin(i / 2) * 20 + Math.random() * 30),
  outbound: 45 + Math.round(Math.cos(i / 2) * 15 + Math.random() * 25),
}));

const ivrsMenu = [
  { option: "1 — Order status", picks: 540 },
  { option: "2 — Sales", picks: 320 },
  { option: "3 — Support", picks: 280 },
  { option: "0 — Talk to agent", picks: 144 },
];

const recent = [
  { no: "+91 98•••432", dir: "Inbound", agent: "Anita Sharma", dur: "3m 12s", status: "Completed" },
  { no: "+91 90•••118", dir: "Outbound", agent: "Rahul Verma", dur: "1m 48s", status: "Completed" },
  { no: "+91 99•••772", dir: "Inbound", agent: "—", dur: "—", status: "Missed" },
  { no: "+91 88•••005", dir: "Outbound", agent: "Priya Iyer", dur: "4m 06s", status: "Completed" },
  { no: "+91 70•••559", dir: "Inbound", agent: "Karan Mehta", dur: "2m 22s", status: "Completed" },
];

const statusTone: Record<string, string> = {
  Completed: "bg-success/10 text-success",
  Missed: "bg-destructive/10 text-destructive",
};

const VoiceAnalyticsPage = () => (
  <AnalyticsShell title="Voice Analytics" subtitle="Call volume, IVRS funnels and agent productivity.">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard label="Total calls" value="1,284" icon={Phone} trend="+5.2%" />
      <KpiCard label="Inbound" value="742" icon={PhoneIncoming} trend="+3.8%" />
      <KpiCard label="Outbound" value="498" icon={PhoneOutgoing} trend="+8.1%" />
      <KpiCard label="Missed" value="44" icon={PhoneMissed} trend="-12 vs yesterday" trendDir="down" />
    </div>

    <Card className="shadow-card">
      <CardHeader><CardTitle className="text-sm font-semibold">Call volume</CardTitle></CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend}>
              <defs>
                <linearGradient id="vIn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="vOut" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--info))" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(var(--info))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} />
              <Legend />
              <Area type="monotone" dataKey="inbound" stroke="hsl(var(--success))" fill="url(#vIn)" strokeWidth={2} />
              <Area type="monotone" dataKey="outbound" stroke="hsl(var(--info))" fill="url(#vOut)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-sm font-semibold">IVRS menu funnel</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ivrsMenu} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis type="category" dataKey="option" width={140} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} />
                <Bar dataKey="picks" fill="hsl(var(--primary))" radius={[0,4,4,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-sm font-semibold">Top agents</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: "Anita Sharma", calls: 142, rate: "98%" },
            { name: "Rahul Verma", calls: 128, rate: "96%" },
            { name: "Priya Iyer", calls: 119, rate: "94%" },
            { name: "Karan Mehta", calls: 102, rate: "91%" },
          ].map((a) => (
            <div key={a.name} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.calls} calls</p>
              </div>
              <Badge variant="secondary" className="text-xs">{a.rate}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>

    <Card className="shadow-card">
      <CardHeader><CardTitle className="text-sm font-semibold">Recent calls</CardTitle></CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Number", "Direction", "Agent", "Duration", "Status"].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground p-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map((c, i) => (
                <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-muted/30">
                  <td className="p-3 font-medium text-foreground">{c.no}</td>
                  <td className="p-3 text-muted-foreground">{c.dir}</td>
                  <td className="p-3 text-muted-foreground">{c.agent}</td>
                  <td className="p-3 text-muted-foreground">{c.dur}</td>
                  <td className="p-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusTone[c.status]}`}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </AnalyticsShell>
);

export default VoiceAnalyticsPage;
