import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Search, Megaphone, Eye, MousePointerClick, Send as SendIcon, Inbox as InboxIcon } from "lucide-react";
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";
import { agents } from "@/data/inboxMockData";
import { cn } from "@/lib/utils";

const weeklyData = [
  { day: "Mon", sms: 320, whatsapp: 480, email: 820, rcs: 110 },
  { day: "Tue", sms: 410, whatsapp: 530, email: 950, rcs: 140 },
  { day: "Wed", sms: 280, whatsapp: 460, email: 780, rcs: 95 },
  { day: "Thu", sms: 520, whatsapp: 610, email: 1100, rcs: 180 },
  { day: "Fri", sms: 580, whatsapp: 690, email: 1250, rcs: 200 },
  { day: "Sat", sms: 190, whatsapp: 220, email: 380, rcs: 60 },
  { day: "Sun", sms: 110, whatsapp: 150, email: 240, rcs: 35 },
];

const channelPie = [
  { name: "SMS", value: 3200, color: "hsl(262, 83%, 58%)" },
  { name: "WhatsApp", value: 4800, color: "hsl(142, 70%, 45%)" },
  { name: "Email", value: 8200, color: "hsl(217, 91%, 50%)" },
  { name: "RCS", value: 1100, color: "hsl(38, 92%, 50%)" },
];

const campaignReports = [
  { id: 1, name: "Welcome Onboarding", channel: "Email", status: "Completed", sent: 2400, delivered: 2352, failed: 48, opened: 1820, clicked: 640, rate: 98.0, date: "Jun 8, 2025" },
  { id: 2, name: "OTP Verification Batch", channel: "SMS", status: "Completed", sent: 1200, delivered: 1176, failed: 24, opened: 0, clicked: 0, rate: 98.0, date: "Jun 7, 2025" },
  { id: 3, name: "Order Confirmation", channel: "WhatsApp", status: "Completed", sent: 3400, delivered: 3318, failed: 82, opened: 3100, clicked: 1250, rate: 97.6, date: "Jun 6, 2025" },
  { id: 4, name: "Monthly Newsletter", channel: "Email", status: "Completed", sent: 5200, delivered: 4940, failed: 260, opened: 3200, clicked: 980, rate: 95.0, date: "Jun 5, 2025" },
  { id: 5, name: "Promo Campaign Q2", channel: "RCS", status: "Partially Failed", sent: 5000, delivered: 3800, failed: 1200, opened: 2800, clicked: 1100, rate: 76.0, date: "Jun 4, 2025" },
  { id: 6, name: "Password Reset Batch", channel: "Email", status: "Completed", sent: 340, delivered: 338, failed: 2, opened: 310, clicked: 290, rate: 99.4, date: "Jun 3, 2025" },
];

// Direct (non-campaign) messages
const directMessages = [
  { id: 1, recipient: "+91 98765 43210", channel: "SMS", template: "OTP Verification", status: "Delivered", senderId: "DICNTFY", sentAt: "Jun 9, 2025 14:32", deliveredAt: "Jun 9, 2025 14:32" },
  { id: 2, recipient: "+91 98765 43211", channel: "SMS", template: "OTP Verification", status: "Delivered", senderId: "MYBHRT", sentAt: "Jun 9, 2025 14:30", deliveredAt: "Jun 9, 2025 14:30" },
  { id: 3, recipient: "+91 98765 43212", channel: "WhatsApp", template: "Welcome Message", status: "Delivered", senderId: "My Bharat", sentAt: "Jun 9, 2025 13:15", deliveredAt: "Jun 9, 2025 13:15" },
  { id: 4, recipient: "ravi@mybharat.gov.in", channel: "Email", template: "Welcome Email", status: "Delivered", senderId: "noreply@mybharat.gov.in", sentAt: "Jun 9, 2025 12:00", deliveredAt: "Jun 9, 2025 12:01" },
  { id: 5, recipient: "+91 98765 43213", channel: "SMS", template: "Custom", status: "Failed", senderId: "DICNTFY", sentAt: "Jun 9, 2025 11:45", deliveredAt: "—" },
  { id: 6, recipient: "+91 98765 43214", channel: "WhatsApp", template: "Appointment Reminder", status: "Delivered", senderId: "My Bharat", sentAt: "Jun 8, 2025 16:20", deliveredAt: "Jun 8, 2025 16:20" },
  { id: 7, recipient: "+91 98765 43215", channel: "SMS", template: "Custom", status: "Delivered", senderId: "MYBHRT", sentAt: "Jun 8, 2025 15:00", deliveredAt: "Jun 8, 2025 15:00" },
  { id: 8, recipient: "priya@test.com", channel: "Email", template: "Invoice", status: "Delivered", senderId: "noreply@mybharat.gov.in", sentAt: "Jun 8, 2025 10:30", deliveredAt: "Jun 8, 2025 10:31" },
];

const csvUploads = [
  { file: "users_batch_1.csv", date: "Jun 8", total: 2400, valid: 2310, invalid: 62, duplicates: 28 },
  { file: "promo_list.csv", date: "Jun 5", total: 5200, valid: 4980, invalid: 140, duplicates: 80 },
  { file: "otp_numbers.csv", date: "Jun 3", total: 890, valid: 878, invalid: 8, duplicates: 4 },
];

const templateReports = [
  { id: "TPL-SMS-00001", name: "OTP Verification", channel: "SMS", totalSent: 8420, delivered: 8252, failed: 168, rate: 98.0, lastUsed: "Jun 9, 2025" },
  { id: "TPL-WA-00002", name: "Welcome Message", channel: "WhatsApp", totalSent: 5640, delivered: 5527, failed: 113, rate: 98.0, lastUsed: "Jun 8, 2025" },
  { id: "TPL-EML-00003", name: "Welcome Email", channel: "Email", totalSent: 4200, delivered: 4074, failed: 126, rate: 97.0, lastUsed: "Jun 7, 2025" },
  { id: "TPL-SMS-00006", name: "Appointment Reminder", channel: "SMS", totalSent: 2180, delivered: 2136, failed: 44, rate: 98.0, lastUsed: "Jun 6, 2025" },
];

const statusStyle: Record<string, string> = {
  Completed: "bg-success/10 text-success",
  "Partially Failed": "bg-warning/10 text-warning",
  Failed: "bg-destructive/10 text-destructive",
  Delivered: "bg-success/10 text-success",
  Pending: "bg-warning/10 text-warning",
};

// Inbox / message-in mock data
const inboxDays = (n: number) => Array.from({ length: n }, (_, i) => ({
  day: `D${i + 1}`,
  WhatsApp: Math.round(80 + Math.random() * 60),
  Email: Math.round(20 + Math.random() * 30),
  Chatbot: Math.round(40 + Math.random() * 40),
  Facebook: Math.round(10 + Math.random() * 25),
}));
const inboxResponseTime = (n: number) => Array.from({ length: n }, (_, i) => ({
  day: `D${i + 1}`,
  first: +(1 + Math.random() * 3).toFixed(1),
  resolution: +(15 + Math.random() * 30).toFixed(1),
}));
const inboxAgentData = agents.map(a => ({
  agent: a,
  handled: Math.round(40 + Math.random() * 80),
  avgResp: +(1 + Math.random() * 4).toFixed(1),
  csat: Math.round(80 + Math.random() * 18),
}));
const inboxChannelPerf = [
  { channel: "WhatsApp", volume: 980, ticketRate: 12, csat: 92 },
  { channel: "Email", volume: 320, ticketRate: 28, csat: 85 },
  { channel: "Chatbot", volume: 540, ticketRate: 8, csat: 78 },
  { channel: "Facebook", volume: 180, ticketRate: 15, csat: 88 },
  { channel: "Telegram", volume: 140, ticketRate: 10, csat: 90 },
];

const ProjectReportsPage = () => {
  const [period, setPeriod] = useState("weekly");
  const [direction, setDirection] = useState<"out" | "in">("out");
  const [tab, setTab] = useState("overview");
  const [inTab, setInTab] = useState("volume");
  const [inRange, setInRange] = useState("30");
  const [directSearch, setDirectSearch] = useState("");
  const [directChannelFilter, setDirectChannelFilter] = useState("all");

  const filteredDirect = directMessages.filter(m => {
    const matchSearch = m.recipient.toLowerCase().includes(directSearch.toLowerCase()) || m.template.toLowerCase().includes(directSearch.toLowerCase());
    const matchChannel = directChannelFilter === "all" || m.channel === directChannelFilter;
    return matchSearch && matchChannel;
  });

  const n = parseInt(inRange);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">Your project's communication analytics</p>
        </div>
        <div className="flex gap-3">
          {direction === "out" && (
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          )}
          {direction === "in" && (
            <Select value={inRange} onValueChange={setInRange}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          )}
          <Button variant="outline"><Download className="w-4 h-4 mr-2" />Export</Button>
        </div>
      </div>

      {/* Top-level direction switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { key: "out" as const, icon: SendIcon, title: "Message Out Reports", desc: "Outbound delivery, campaigns, templates" },
          { key: "in" as const, icon: InboxIcon, title: "Message In Reports", desc: "Inbound volume, response time, agents" },
        ].map(p => {
          const Icon = p.icon;
          const active = direction === p.key;
          return (
            <button
              key={p.key}
              onClick={() => setDirection(p.key)}
              className={cn(
                "p-4 rounded-xl border-2 text-left transition-all",
                active ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:bg-muted/50"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {direction === "out" && (
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaign-wise</TabsTrigger>
          <TabsTrigger value="direct">Direct Messages</TabsTrigger>
          <TabsTrigger value="templates">Template-wise</TabsTrigger>
          <TabsTrigger value="uploads">CSV Uploads</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-6 mt-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Sent", value: "17,300" },
              { label: "Delivered", value: "16,820" },
              { label: "Failed", value: "480" },
              { label: "Success Rate", value: "97.2%" },
            ].map((s) => (
              <Card key={s.label} className="shadow-card">
                <CardContent className="pt-4 pb-3">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-xl font-bold text-foreground mt-1">{s.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 shadow-card">
              <CardHeader><CardTitle className="text-base">Weekly Channel Activity</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} />
                      <Bar dataKey="sms" name="SMS" fill="hsl(262, 83%, 58%)" radius={[2,2,0,0]} />
                      <Bar dataKey="whatsapp" name="WhatsApp" fill="hsl(142, 70%, 45%)" radius={[2,2,0,0]} />
                      <Bar dataKey="email" name="Email" fill="hsl(217, 91%, 50%)" radius={[2,2,0,0]} />
                      <Bar dataKey="rcs" name="RCS" fill="hsl(38, 92%, 50%)" radius={[2,2,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader><CardTitle className="text-base">Channel Split</CardTitle></CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={channelPie} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" strokeWidth={2} stroke="hsl(var(--card))">
                        {channelPie.map((e) => <Cell key={e.name} fill={e.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {channelPie.map((d) => (
                    <div key={d.name} className="flex items-center gap-2 text-xs">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="text-muted-foreground">{d.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Campaign-wise */}
        <TabsContent value="campaigns" className="space-y-6 mt-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Campaigns", value: "47", icon: Megaphone },
              { label: "Avg. Delivery Rate", value: "96.8%" },
              { label: "Avg. Open Rate", value: "72.1%", icon: Eye },
              { label: "Avg. Click Rate", value: "28.4%", icon: MousePointerClick },
            ].map((s) => (
              <Card key={s.label} className="shadow-card">
                <CardContent className="pt-4 pb-3">
                  <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                  <p className="text-xl font-bold text-foreground mt-1">{s.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Campaign Performance</CardTitle>
                <div className="relative w-56">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-9 h-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border">
                    {["Campaign", "Channel", "Status", "Sent", "Delivered", "Failed", "Opened", "Clicked", "Rate", "Date"].map((h) => (
                      <th key={h} className="text-left font-medium text-muted-foreground p-3 text-xs whitespace-nowrap">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {campaignReports.map((c) => (
                      <tr key={c.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                        <td className="p-3 font-medium text-foreground whitespace-nowrap">{c.name}</td>
                        <td className="p-3"><Badge variant="secondary" className="text-xs">{c.channel}</Badge></td>
                        <td className="p-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[c.status]}`}>{c.status}</span></td>
                        <td className="p-3 text-foreground">{c.sent.toLocaleString()}</td>
                        <td className="p-3 text-success">{c.delivered.toLocaleString()}</td>
                        <td className="p-3 text-destructive">{c.failed.toLocaleString()}</td>
                        <td className="p-3 text-foreground">{c.opened > 0 ? c.opened.toLocaleString() : "—"}</td>
                        <td className="p-3 text-foreground">{c.clicked > 0 ? c.clicked.toLocaleString() : "—"}</td>
                        <td className="p-3"><Badge variant="secondary">{c.rate}%</Badge></td>
                        <td className="p-3 text-muted-foreground text-xs whitespace-nowrap">{c.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Direct Messages */}
        <TabsContent value="direct" className="space-y-6 mt-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Direct Messages", value: String(directMessages.length) },
              { label: "Delivered", value: String(directMessages.filter(m => m.status === "Delivered").length) },
              { label: "Failed", value: String(directMessages.filter(m => m.status === "Failed").length) },
              { label: "Success Rate", value: `${((directMessages.filter(m => m.status === "Delivered").length / directMessages.length) * 100).toFixed(1)}%` },
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
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <SendIcon className="w-4 h-4 text-muted-foreground" />
                  Direct Message Log
                </CardTitle>
                <div className="flex gap-2">
                  <div className="relative w-48">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search..." className="pl-9 h-9" value={directSearch} onChange={e => setDirectSearch(e.target.value)} />
                  </div>
                  <Select value={directChannelFilter} onValueChange={setDirectChannelFilter}>
                    <SelectTrigger className="w-32 h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Channels</SelectItem>
                      <SelectItem value="SMS">SMS</SelectItem>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="RCS">RCS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border">
                    {["Recipient", "Channel", "Sender ID", "Template", "Status", "Sent At", "Delivered At"].map(h => (
                      <th key={h} className="text-left font-medium text-muted-foreground p-3 text-xs whitespace-nowrap">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {filteredDirect.map(m => (
                      <tr key={m.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                        <td className="p-3 font-mono text-xs text-foreground">{m.recipient}</td>
                        <td className="p-3"><Badge variant="secondary" className="text-xs">{m.channel}</Badge></td>
                        <td className="p-3 text-xs text-muted-foreground">{m.senderId}</td>
                        <td className="p-3 text-foreground text-xs">{m.template}</td>
                        <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[m.status]}`}>{m.status}</span></td>
                        <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">{m.sentAt}</td>
                        <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">{m.deliveredAt}</td>
                      </tr>
                    ))}
                    {filteredDirect.length === 0 && (
                      <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No direct messages found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Template-wise */}
        <TabsContent value="templates" className="space-y-6 mt-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Active Templates", value: "4" },
              { label: "Total Sent via Templates", value: "20,440" },
              { label: "Avg. Delivery Rate", value: "97.8%" },
              { label: "Most Used", value: "OTP Verification" },
            ].map((s) => (
              <Card key={s.label} className="shadow-card">
                <CardContent className="pt-4 pb-3">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-lg font-bold text-foreground mt-1">{s.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-base">Template Performance</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border">
                    {["Template ID", "Name", "Channel", "Total Sent", "Delivered", "Failed", "Success Rate", "Last Used"].map((h) => (
                      <th key={h} className="text-left font-medium text-muted-foreground p-3 text-xs whitespace-nowrap">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {templateReports.map((t) => (
                      <tr key={t.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                        <td className="p-3"><span className="font-mono text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">{t.id}</span></td>
                        <td className="p-3 font-medium text-foreground whitespace-nowrap">{t.name}</td>
                        <td className="p-3"><Badge variant="secondary" className="text-xs">{t.channel}</Badge></td>
                        <td className="p-3 text-foreground">{t.totalSent.toLocaleString()}</td>
                        <td className="p-3 text-success">{t.delivered.toLocaleString()}</td>
                        <td className="p-3 text-destructive">{t.failed.toLocaleString()}</td>
                        <td className="p-3"><Badge variant="secondary">{t.rate}%</Badge></td>
                        <td className="p-3 text-muted-foreground text-xs whitespace-nowrap">{t.lastUsed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CSV Uploads */}
        <TabsContent value="uploads" className="space-y-6 mt-4">
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-base">CSV Upload Summary</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border">
                    {["File", "Date", "Total", "Valid", "Invalid", "Duplicates"].map((h) => (
                      <th key={h} className="text-left font-medium text-muted-foreground p-4 text-xs">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {csvUploads.map((c) => (
                      <tr key={c.file} className="border-b border-border/50 last:border-0">
                        <td className="p-4 font-medium text-foreground">{c.file}</td>
                        <td className="p-4 text-muted-foreground">{c.date}</td>
                        <td className="p-4 text-foreground">{c.total.toLocaleString()}</td>
                        <td className="p-4 text-success">{c.valid.toLocaleString()}</td>
                        <td className="p-4 text-destructive">{c.invalid}</td>
                        <td className="p-4 text-warning">{c.duplicates}</td>
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

export default ProjectReportsPage;
