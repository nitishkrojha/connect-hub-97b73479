import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Download, Search, Megaphone, Eye, MousePointerClick } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from "recharts";

const monthlyVolume = [
  { month: "Jan", sms: 42000, whatsapp: 31000, email: 85000, rcs: 9000 },
  { month: "Feb", sms: 51000, whatsapp: 38000, email: 92000, rcs: 12000 },
  { month: "Mar", sms: 48000, whatsapp: 42000, email: 101000, rcs: 15000 },
  { month: "Apr", sms: 62000, whatsapp: 51000, email: 118000, rcs: 18000 },
  { month: "May", sms: 71000, whatsapp: 59000, email: 125000, rcs: 21000 },
  { month: "Jun", sms: 68000, whatsapp: 64000, email: 132000, rcs: 24000 },
];

const deliveryStatus = [
  { name: "Delivered", value: 128500, color: "hsl(142, 70%, 45%)" },
  { name: "Failed", value: 4200, color: "hsl(0, 84%, 60%)" },
  { name: "Pending", value: 2100, color: "hsl(38, 92%, 50%)" },
  { name: "Bounced", value: 3100, color: "hsl(262, 83%, 58%)" },
];

const projectUsage = [
  { project: "My Bharat", sms: 12400, whatsapp: 8900, email: 22100, rcs: 3200, total: 46600, success: 97.2 },
  { project: "Kisan Sarathi", sms: 14200, whatsapp: 0, email: 28500, rcs: 0, total: 42700, success: 95.8 },
  { project: "Manas", sms: 8100, whatsapp: 6500, email: 18200, rcs: 4800, total: 37600, success: 98.1 },
  { project: "E Saras", sms: 0, whatsapp: 9200, email: 16800, rcs: 0, total: 26000, success: 96.5 },
  { project: "India Handmade", sms: 5800, whatsapp: 0, email: 0, rcs: 4100, total: 9900, success: 94.3 },
];

const templateUsage = [
  { name: "OTP Verification", channel: "SMS", count: 45200, success: 98.4 },
  { name: "Welcome Email", channel: "Email", count: 32100, success: 99.1 },
  { name: "Order Confirmation", channel: "WhatsApp", count: 28900, success: 97.8 },
  { name: "Appointment Reminder", channel: "SMS", count: 19400, success: 96.2 },
  { name: "Invoice", channel: "Email", count: 15800, success: 98.9 },
];

const dailyTrend = [
  { date: "Jun 1", sent: 4200, delivered: 4080 },
  { date: "Jun 2", sent: 4800, delivered: 4650 },
  { date: "Jun 3", sent: 3900, delivered: 3780 },
  { date: "Jun 4", sent: 5200, delivered: 5070 },
  { date: "Jun 5", sent: 5800, delivered: 5640 },
  { date: "Jun 6", sent: 4100, delivered: 3980 },
  { date: "Jun 7", sent: 3200, delivered: 3120 },
];

const campaignReports = [
  { id: 1, name: "Welcome Onboarding June", project: "My Bharat", channel: "Email", status: "Completed", sent: 2400, delivered: 2352, failed: 48, opened: 1820, clicked: 640, rate: 98.0, date: "Jun 8, 2025" },
  { id: 2, name: "OTP Verification Batch", project: "Kisan Sarathi", channel: "SMS", status: "Completed", sent: 8900, delivered: 8722, failed: 178, opened: 0, clicked: 0, rate: 98.0, date: "Jun 8, 2025" },
  { id: 3, name: "Order Confirmation Q2", project: "Manas", channel: "WhatsApp", status: "Completed", sent: 3400, delivered: 3318, failed: 82, opened: 3100, clicked: 1250, rate: 97.6, date: "Jun 7, 2025" },
  { id: 4, name: "Monthly Newsletter June", project: "E Saras", channel: "Email", status: "Completed", sent: 5200, delivered: 4940, failed: 260, opened: 3200, clicked: 980, rate: 95.0, date: "Jun 6, 2025" },
  { id: 5, name: "Summer Promo RCS", project: "India Handmade", channel: "RCS", status: "Partially Failed", sent: 5000, delivered: 3800, failed: 1200, opened: 2800, clicked: 1100, rate: 76.0, date: "Jun 5, 2025" },
  { id: 6, name: "Appointment Reminders", project: "Manas", channel: "SMS", status: "Completed", sent: 1200, delivered: 1176, failed: 24, opened: 0, clicked: 0, rate: 98.0, date: "Jun 4, 2025" },
  { id: 7, name: "Account Alerts Batch", project: "Kisan Sarathi", channel: "SMS", status: "Failed", sent: 800, delivered: 0, failed: 800, opened: 0, clicked: 0, rate: 0, date: "Jun 3, 2025" },
  { id: 8, name: "Password Reset Batch", project: "My Bharat", channel: "Email", status: "Completed", sent: 340, delivered: 338, failed: 2, opened: 310, clicked: 290, rate: 99.4, date: "Jun 2, 2025" },
];

const statusStyle: Record<string, string> = {
  Completed: "bg-success/10 text-success",
  "Partially Failed": "bg-warning/10 text-warning",
  Failed: "bg-destructive/10 text-destructive",
  "In Progress": "bg-info/10 text-info",
};

const AdminReportsPage = () => {
  const [period, setPeriod] = useState("monthly");
  const [tab, setTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Organization-wide communication analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaign-wise</TabsTrigger>
          <TabsTrigger value="projects">By Workspace</TabsTrigger>
          <TabsTrigger value="templates">Template Usage</TabsTrigger>
        </TabsList>

        {/* === Overview Tab === */}
        <TabsContent value="overview" className="space-y-6 mt-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Sent", value: "137,900", change: "+12.4%" },
              { label: "Delivered", value: "128,500", change: "+11.8%" },
              { label: "Failed", value: "4,200", change: "-18.2%" },
              { label: "Success Rate", value: "96.8%", change: "+0.5%" },
            ].map((s) => (
              <Card key={s.label} className="shadow-card">
                <CardContent className="pt-4 pb-3">
                  <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                  <p className="text-xl font-bold text-foreground mt-1">{s.value}</p>
                  <p className="text-xs text-success mt-1">{s.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 shadow-card">
              <CardHeader><CardTitle className="text-base">Channel Volume Over Time</CardTitle></CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyVolume}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
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
              <CardHeader><CardTitle className="text-base">Delivery Status</CardTitle></CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={deliveryStatus} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" strokeWidth={2} stroke="hsl(var(--card))">
                        {deliveryStatus.map((e) => <Cell key={e.name} fill={e.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {deliveryStatus.map((d) => (
                    <div key={d.name} className="flex items-center gap-2 text-xs">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                      <span className="text-muted-foreground">{d.name}: {d.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-base">Daily Sent vs Delivered</CardTitle></CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} />
                    <Line type="monotone" dataKey="sent" stroke="hsl(217, 91%, 50%)" strokeWidth={2} name="Sent" />
                    <Line type="monotone" dataKey="delivered" stroke="hsl(142, 70%, 45%)" strokeWidth={2} strokeDasharray="5 5" name="Delivered" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* === Campaign-wise Tab === */}
        <TabsContent value="campaigns" className="space-y-6 mt-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Campaigns", value: "124", icon: Megaphone },
              { label: "Avg. Delivery Rate", value: "95.2%" },
              { label: "Avg. Open Rate", value: "68.4%", icon: Eye },
              { label: "Avg. Click Rate", value: "22.1%", icon: MousePointerClick },
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
                <div className="relative w-60">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search campaigns..." className="pl-9 h-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border">
                    {["Campaign", "Project", "Channel", "Status", "Sent", "Delivered", "Failed", "Opened", "Clicked", "Rate", "Date"].map((h) => (
                      <th key={h} className="text-left font-medium text-muted-foreground p-3 text-xs whitespace-nowrap">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {campaignReports.map((c) => (
                      <tr key={c.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                        <td className="p-3 font-medium text-foreground whitespace-nowrap">{c.name}</td>
                        <td className="p-3 text-muted-foreground text-xs">{c.project}</td>
                        <td className="p-3"><Badge variant="secondary" className="text-xs">{c.channel}</Badge></td>
                        <td className="p-3">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[c.status]}`}>{c.status}</span>
                        </td>
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

        {/* === By Workspace Tab === */}
        <TabsContent value="projects" className="space-y-6 mt-4">
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-base">By Workspace Usage</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border">
                    {["Project", "SMS", "WhatsApp", "Email", "RCS", "Total", "Success %"].map((h) => (
                      <th key={h} className="text-left font-medium text-muted-foreground p-4 text-xs">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {projectUsage.map((p) => (
                      <tr key={p.project} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                        <td className="p-4 font-medium text-foreground">{p.project}</td>
                        <td className="p-4 text-muted-foreground">{p.sms.toLocaleString()}</td>
                        <td className="p-4 text-muted-foreground">{p.whatsapp.toLocaleString()}</td>
                        <td className="p-4 text-muted-foreground">{p.email.toLocaleString()}</td>
                        <td className="p-4 text-muted-foreground">{p.rcs.toLocaleString()}</td>
                        <td className="p-4 font-medium text-foreground">{p.total.toLocaleString()}</td>
                        <td className="p-4"><Badge variant="secondary">{p.success}%</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* === Template Usage Tab === */}
        <TabsContent value="templates" className="space-y-6 mt-4">
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-base">Template Usage</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border">
                    {["Template", "Channel", "Times Used", "Success Rate"].map((h) => (
                      <th key={h} className="text-left font-medium text-muted-foreground p-4 text-xs">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {templateUsage.map((t) => (
                      <tr key={t.name} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                        <td className="p-4 font-medium text-foreground">{t.name}</td>
                        <td className="p-4 text-muted-foreground">{t.channel}</td>
                        <td className="p-4 text-foreground">{t.count.toLocaleString()}</td>
                        <td className="p-4"><Badge variant="secondary">{t.success}%</Badge></td>
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

export default AdminReportsPage;
