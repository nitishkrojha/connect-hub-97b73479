import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const kpis = [
  { label: "Total calls today", value: "1,284", icon: Phone, tone: "text-primary bg-primary/10" },
  { label: "Inbound", value: "742", icon: PhoneIncoming, tone: "text-success bg-success/10" },
  { label: "Outbound", value: "498", icon: PhoneOutgoing, tone: "text-info bg-info/10" },
  { label: "Missed", value: "44", icon: PhoneMissed, tone: "text-destructive bg-destructive/10" },
  { label: "Avg duration", value: "2m 38s", icon: Clock, tone: "text-warning bg-warning/10" },
  { label: "Answer rate", value: "94.2%", icon: TrendingUp, tone: "text-success bg-success/10" },
];

const recentCalls = [
  { no: "+91 98•••432", dir: "Inbound", agent: "Anita Sharma", dur: "3m 12s", status: "Completed", time: "2m ago" },
  { no: "+91 90•••118", dir: "Outbound", agent: "Rahul Verma", dur: "1m 48s", status: "Completed", time: "8m ago" },
  { no: "+91 99•••772", dir: "Inbound", agent: "—", dur: "—", status: "Missed", time: "14m ago" },
  { no: "+91 88•••005", dir: "Outbound", agent: "Priya Iyer", dur: "4m 06s", status: "Completed", time: "21m ago" },
  { no: "+91 70•••559", dir: "Inbound", agent: "Karan Mehta", dur: "2m 22s", status: "Completed", time: "32m ago" },
];

const statusTone: Record<string, string> = {
  Completed: "bg-success/10 text-success border-success/20",
  Missed: "bg-destructive/10 text-destructive border-destructive/20",
};

const VoiceDashboardPage = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Voice Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time view across every voice channel — included on all plans.</p>
      </div>
      <Link to="/project/voice/logs">
        <Button variant="outline" size="sm">View call logs <ArrowRight className="w-4 h-4 ml-1" /></Button>
      </Link>
    </div>

    {/* KPI strip */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {kpis.map((s) => (
        <Card key={s.label} className="shadow-card">
          <CardContent className="pt-4 pb-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${s.tone}`}>
              <s.icon className="w-4 h-4" />
            </div>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-lg font-semibold text-foreground mt-0.5">{s.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Hourly chart + Recent calls — standardized 2-up layout */}
    <div className="grid lg:grid-cols-3 gap-4">
      <Card className="shadow-card lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Hourly call volume</CardTitle>
          <p className="text-xs text-muted-foreground">Last 24 hours</p>
        </CardHeader>
        <CardContent>
          <div className="h-44 flex items-end gap-1.5">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-primary/70 rounded-t hover:bg-primary transition-colors"
                style={{ height: `${20 + Math.sin(i / 3) * 30 + Math.random() * 40}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:00</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Top agents</CardTitle>
          <p className="text-xs text-muted-foreground">By calls handled</p>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { name: "Anita Sharma", calls: 142, rate: "98%" },
            { name: "Rahul Verma", calls: 128, rate: "96%" },
            { name: "Priya Iyer", calls: 119, rate: "94%" },
            { name: "Karan Mehta", calls: 102, rate: "91%" },
          ].map((a) => (
            <div key={a.name} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/40">
              <div>
                <p className="text-sm font-medium text-foreground">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.calls} calls</p>
              </div>
              <span className="text-sm font-semibold text-success">{a.rate}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>

    {/* Recent activity — single source of truth */}
    <Card className="shadow-card">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm font-semibold">Recent calls</CardTitle>
          <p className="text-xs text-muted-foreground">Latest activity across inbound and outbound</p>
        </div>
        <Link to="/project/voice/logs" className="text-xs font-medium text-primary hover:underline">
          See all
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Number", "Direction", "Agent", "Duration", "Status", "Time"].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground p-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentCalls.map((c, i) => (
                <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-muted/30">
                  <td className="p-3 font-medium text-foreground">{c.no}</td>
                  <td className="p-3 text-muted-foreground">{c.dir}</td>
                  <td className="p-3 text-muted-foreground">{c.agent}</td>
                  <td className="p-3 text-muted-foreground">{c.dur}</td>
                  <td className="p-3">
                    <Badge variant="outline" className={statusTone[c.status]}>{c.status}</Badge>
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">{c.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default VoiceDashboardPage;
