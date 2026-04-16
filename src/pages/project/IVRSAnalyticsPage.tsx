import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Clock, TrendingUp,
  BarChart3, Users, CheckCircle2, XCircle, ArrowDownRight, ArrowUpRight,
  Filter, Download, RefreshCw,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, FunnelChart, Funnel, LabelList,
} from "recharts";

const funnelData = [
  { name: "Total Calls", value: 12480, fill: "hsl(199, 89%, 48%)" },
  { name: "Connected", value: 10250, fill: "hsl(217, 91%, 50%)" },
  { name: "IVR Menu Reached", value: 8920, fill: "hsl(262, 83%, 58%)" },
  { name: "Option Selected", value: 6340, fill: "hsl(142, 70%, 45%)" },
  { name: "Completed Action", value: 4120, fill: "hsl(38, 92%, 50%)" },
];

const dailyVolume = [
  { day: "Mon", inbound: 820, outbound: 1200 },
  { day: "Tue", inbound: 950, outbound: 1350 },
  { day: "Wed", inbound: 780, outbound: 1100 },
  { day: "Thu", inbound: 1100, outbound: 1500 },
  { day: "Fri", inbound: 1250, outbound: 1680 },
  { day: "Sat", inbound: 420, outbound: 600 },
  { day: "Sun", inbound: 280, outbound: 380 },
];

const menuOptions = [
  { name: "Press 1: Account Info", count: 2840, pct: 44.8 },
  { name: "Press 2: Complaints", count: 1520, pct: 24.0 },
  { name: "Press 3: Schemes", count: 980, pct: 15.5 },
  { name: "Press 4: Talk to Agent", count: 620, pct: 9.8 },
  { name: "Press 0: Repeat", count: 380, pct: 5.9 },
];

const callDisposition = [
  { name: "Completed", value: 4120, color: "hsl(142, 70%, 45%)" },
  { name: "Dropped Mid-IVR", value: 2130, color: "hsl(38, 92%, 50%)" },
  { name: "No Response", value: 1580, color: "hsl(0, 84%, 60%)" },
  { name: "Busy/Unreachable", value: 2230, color: "hsl(215, 15%, 47%)" },
  { name: "Voicemail", value: 420, color: "hsl(262, 83%, 58%)" },
];

const hourlyDistribution = [
  { hour: "6AM", calls: 120 }, { hour: "8AM", calls: 580 }, { hour: "10AM", calls: 1200 },
  { hour: "12PM", calls: 980 }, { hour: "2PM", calls: 1350 }, { hour: "4PM", calls: 1100 },
  { hour: "6PM", calls: 820 }, { hour: "8PM", calls: 450 }, { hour: "10PM", calls: 180 },
];

const recentCalls = [
  { id: "IVRS-001", number: "+919876543210", type: "Outbound", duration: "2:34", menu: "Press 1", status: "Completed", time: "10 min ago" },
  { id: "IVRS-002", number: "+919876543211", type: "Inbound", duration: "1:12", menu: "Press 2", status: "Completed", time: "15 min ago" },
  { id: "IVRS-003", number: "+919876543212", type: "Outbound", duration: "0:08", menu: "—", status: "No Response", time: "22 min ago" },
  { id: "IVRS-004", number: "+919876543213", type: "Outbound", duration: "1:45", menu: "Press 4", status: "Transferred", time: "30 min ago" },
  { id: "IVRS-005", number: "+919876543214", type: "Inbound", duration: "0:42", menu: "Press 1", status: "Dropped", time: "35 min ago" },
  { id: "IVRS-006", number: "+919876543215", type: "Outbound", duration: "3:10", menu: "Press 3", status: "Completed", time: "42 min ago" },
];

const webhookLogs = [
  { id: "WH-001", event: "call.initiated", status: "200 OK", time: "2 min ago", payload: "outbound call to +91..." },
  { id: "WH-002", event: "call.answered", status: "200 OK", time: "2 min ago", payload: "call connected, duration start" },
  { id: "WH-003", event: "ivr.input", status: "200 OK", time: "1 min ago", payload: "key press: 1" },
  { id: "WH-004", event: "call.completed", status: "200 OK", time: "1 min ago", payload: "call ended, duration: 134s" },
  { id: "WH-005", event: "call.failed", status: "200 OK", time: "5 min ago", payload: "busy, no answer after 30s" },
];

const statusColors: Record<string, string> = {
  Completed: "bg-success/10 text-success",
  Transferred: "bg-info/10 text-info",
  Dropped: "bg-warning/10 text-warning",
  "No Response": "bg-destructive/10 text-destructive",
};

const stats = [
  { label: "Total Calls", value: "12,480", icon: Phone, trend: "+8.2%", sub: "This month" },
  { label: "Inbound", value: "5,600", icon: PhoneIncoming, trend: "+12.1%", sub: "45% of total" },
  { label: "Outbound", value: "6,880", icon: PhoneOutgoing, trend: "+5.4%", sub: "55% of total" },
  { label: "Avg Duration", value: "1m 48s", icon: Clock, trend: "+0.3s", sub: "Per connected call" },
  { label: "Connect Rate", value: "82.1%", icon: CheckCircle2, trend: "+1.2%", sub: "Calls connected" },
  { label: "Drop Rate", value: "17.1%", icon: PhoneMissed, trend: "-0.8%", sub: "Dropped mid-IVR" },
];

const IVRSAnalyticsPage = () => {
  const [dateRange, setDateRange] = useState("this-month");
  const [callType, setCallType] = useState("all");

  return (
    <div className="space-y-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">IVRS Analytics</h1>
          <p className="text-muted-foreground mt-1">Inbound & Outbound call analytics, funnel reports & webhook logs</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
            </SelectContent>
          </Select>
          <Select value={callType} onValueChange={setCallType}>
            <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Calls</SelectItem>
              <SelectItem value="inbound">Inbound</SelectItem>
              <SelectItem value="outbound">Outbound</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon"><RefreshCw className="w-4 h-4" /></Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-card animate-fade-in">
            <CardContent className="pt-4 pb-3">
              <div className="flex items-center justify-between mb-1">
                <s.icon className="w-4 h-4 text-primary" />
                <div className="flex items-center gap-0.5 text-[10px]">
                  {s.trend.startsWith("+") ? <ArrowUpRight className="w-3 h-3 text-success" /> : <ArrowDownRight className="w-3 h-3 text-success" />}
                  <span className="text-success font-medium">{s.trend}</span>
                </div>
              </div>
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="funnel">
        <TabsList className="flex-wrap">
          <TabsTrigger value="funnel">Call Funnel</TabsTrigger>
          <TabsTrigger value="volume">Volume & Trends</TabsTrigger>
          <TabsTrigger value="menu">IVR Menu Analysis</TabsTrigger>
          <TabsTrigger value="logs">Call Logs</TabsTrigger>
          <TabsTrigger value="webhooks">Webhook Logs</TabsTrigger>
        </TabsList>

        {/* Funnel Tab */}
        <TabsContent value="funnel" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader><CardTitle className="text-base">IVRS Call Funnel</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {funnelData.map((step, i) => {
                    const pct = ((step.value / funnelData[0].value) * 100).toFixed(1);
                    const dropOff = i > 0 ? (((funnelData[i - 1].value - step.value) / funnelData[i - 1].value) * 100).toFixed(1) : null;
                    return (
                      <div key={step.name}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="font-medium text-foreground">{step.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-foreground font-semibold">{step.value.toLocaleString()}</span>
                            <Badge variant="secondary" className="text-[10px]">{pct}%</Badge>
                            {dropOff && <span className="text-[10px] text-destructive">-{dropOff}%</span>}
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3">
                          <div
                            className="rounded-full h-3 transition-all"
                            style={{ width: `${pct}%`, backgroundColor: step.fill }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader><CardTitle className="text-base">Call Disposition</CardTitle></CardHeader>
              <CardContent>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={callDisposition} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={2} stroke="hsl(var(--card))">
                        {callDisposition.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {callDisposition.map((d) => (
                    <div key={d.name} className="flex items-center gap-2 text-xs">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                      <span className="text-muted-foreground truncate">{d.name}</span>
                      <span className="text-foreground font-medium ml-auto">{d.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Volume Tab */}
        <TabsContent value="volume" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader><CardTitle className="text-base">Daily Inbound vs Outbound</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyVolume}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} />
                      <Bar dataKey="inbound" name="Inbound" fill="hsl(199, 89%, 48%)" radius={[3, 3, 0, 0]} />
                      <Bar dataKey="outbound" name="Outbound" fill="hsl(var(--channel-ivrs))" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader><CardTitle className="text-base">Hourly Call Distribution</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={hourlyDistribution}>
                      <defs>
                        <linearGradient id="ivrsGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} />
                      <Area type="monotone" dataKey="calls" stroke="hsl(173, 58%, 39%)" fill="url(#ivrsGrad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Menu Analysis Tab */}
        <TabsContent value="menu" className="space-y-6 mt-4">
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-base">IVR Menu Option Distribution</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {menuOptions.map((opt, i) => (
                  <div key={opt.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-foreground">{opt.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-foreground font-semibold">{opt.count.toLocaleString()}</span>
                        <Badge variant="secondary" className="text-xs">{opt.pct}%</Badge>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className="rounded-full h-2.5 transition-all bg-channel-ivrs"
                        style={{ width: `${opt.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="shadow-card">
              <CardContent className="pt-5 pb-4 text-center">
                <p className="text-2xl font-bold text-foreground">2.3</p>
                <p className="text-sm text-muted-foreground">Avg Menu Depth</p>
                <p className="text-xs text-success mt-1">Users navigate 2.3 levels on average</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="pt-5 pb-4 text-center">
                <p className="text-2xl font-bold text-foreground">34s</p>
                <p className="text-sm text-muted-foreground">Avg Time to First Input</p>
                <p className="text-xs text-muted-foreground mt-1">From call connect to key press</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="pt-5 pb-4 text-center">
                <p className="text-2xl font-bold text-foreground">9.8%</p>
                <p className="text-sm text-muted-foreground">Agent Transfer Rate</p>
                <p className="text-xs text-warning mt-1">Press 4 → Live Agent</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Call Logs Tab */}
        <TabsContent value="logs" className="mt-4">
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Recent Call Logs</CardTitle>
                <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" /> Export</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-3">Call ID</th>
                      <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-3">Number</th>
                      <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-3">Type</th>
                      <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-3">Duration</th>
                      <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-3">Menu</th>
                      <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-3">Status</th>
                      <th className="text-right text-xs font-medium text-muted-foreground pb-3">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCalls.map((call) => (
                      <tr key={call.id} className="border-b border-border/50 last:border-0">
                        <td className="py-2.5 pr-3 text-xs font-mono text-primary">{call.id}</td>
                        <td className="py-2.5 pr-3 text-sm text-foreground">{call.number}</td>
                        <td className="py-2.5 pr-3">
                          <Badge variant="outline" className="text-xs">
                            {call.type === "Inbound" ? <PhoneIncoming className="w-3 h-3 mr-1" /> : <PhoneOutgoing className="w-3 h-3 mr-1" />}
                            {call.type}
                          </Badge>
                        </td>
                        <td className="py-2.5 pr-3 text-sm text-foreground">{call.duration}</td>
                        <td className="py-2.5 pr-3 text-sm text-muted-foreground">{call.menu}</td>
                        <td className="py-2.5 pr-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[call.status] || "bg-muted text-muted-foreground"}`}>
                            {call.status}
                          </span>
                        </td>
                        <td className="py-2.5 text-xs text-muted-foreground text-right">{call.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Webhook Logs Tab */}
        <TabsContent value="webhooks" className="mt-4">
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Webhook Event Logs</CardTitle>
                <Badge variant="secondary" className="text-xs">Receiving from IVRS Provider</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-3">Event ID</th>
                      <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-3">Event</th>
                      <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-3">Status</th>
                      <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-3">Payload</th>
                      <th className="text-right text-xs font-medium text-muted-foreground pb-3">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {webhookLogs.map((wh) => (
                      <tr key={wh.id} className="border-b border-border/50 last:border-0">
                        <td className="py-2.5 pr-3 text-xs font-mono text-primary">{wh.id}</td>
                        <td className="py-2.5 pr-3">
                          <Badge variant="outline" className="text-xs font-mono">{wh.event}</Badge>
                        </td>
                        <td className="py-2.5 pr-3">
                          <Badge variant="secondary" className="text-xs bg-success/10 text-success">{wh.status}</Badge>
                        </td>
                        <td className="py-2.5 pr-3 text-xs text-muted-foreground truncate max-w-[200px]">{wh.payload}</td>
                        <td className="py-2.5 text-xs text-muted-foreground text-right">{wh.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IVRSAnalyticsPage;
