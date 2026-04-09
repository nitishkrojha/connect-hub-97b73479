import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2, MessageSquare, CheckCircle2, XCircle, TrendingUp,
  Send, Mail, Smartphone, Sparkles,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const monthlyData = [
  { name: "Jan", sms: 4200, whatsapp: 3100, email: 8500, rcs: 900 },
  { name: "Feb", sms: 5100, whatsapp: 3800, email: 9200, rcs: 1200 },
  { name: "Mar", sms: 4800, whatsapp: 4200, email: 10100, rcs: 1500 },
  { name: "Apr", sms: 6200, whatsapp: 5100, email: 11800, rcs: 1800 },
  { name: "May", sms: 7100, whatsapp: 5900, email: 12500, rcs: 2100 },
  { name: "Jun", sms: 6800, whatsapp: 6400, email: 13200, rcs: 2400 },
];

const channelPie = [
  { name: "SMS", value: 34200, color: "hsl(262, 83%, 58%)" },
  { name: "WhatsApp", value: 28500, color: "hsl(142, 70%, 45%)" },
  { name: "Email", value: 65300, color: "hsl(217, 91%, 50%)" },
  { name: "RCS", value: 9900, color: "hsl(38, 92%, 50%)" },
];

const topProjects = [
  { name: "My Bharat", sent: 28400, success: 97.2 },
  { name: "Kisan Sarathi", sent: 24100, success: 95.8 },
  { name: "Manas", sent: 19800, success: 98.1 },
  { name: "E Saras", sent: 16200, success: 96.5 },
  { name: "India Handmade", sent: 12500, success: 94.3 },
];

const deliveryTrend = [
  { day: "Mon", rate: 96.2 }, { day: "Tue", rate: 97.1 }, { day: "Wed", rate: 95.8 },
  { day: "Thu", rate: 97.5 }, { day: "Fri", rate: 96.9 }, { day: "Sat", rate: 98.1 },
  { day: "Sun", rate: 97.8 },
];

const stats = [
  { label: "Total Projects", value: "24", sub: "18 active", icon: Building2, trend: "+3 this month" },
  { label: "Messages Sent", value: "137.9K", sub: "This month", icon: MessageSquare, trend: "+12.4%" },
  { label: "Delivery Rate", value: "96.8%", sub: "Avg. across channels", icon: CheckCircle2, trend: "+0.5%" },
  { label: "Failed", value: "4,412", sub: "3.2% failure rate", icon: XCircle, trend: "-0.8%" },
];

const channelCards = [
  { label: "SMS", count: "34.2K", icon: Smartphone, colorClass: "bg-channel-sms" },
  { label: "WhatsApp", count: "28.5K", icon: MessageSquare, colorClass: "bg-channel-whatsapp" },
  { label: "Email", count: "65.3K", icon: Mail, colorClass: "bg-channel-email" },
  { label: "RCS", count: "9.9K", icon: Sparkles, colorClass: "bg-channel-rcs" },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of all communication activity</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-card hover:shadow-card-hover transition-shadow animate-fade-in">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
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

      {/* Channel Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {channelCards.map((ch) => (
          <Card key={ch.label} className="shadow-card animate-fade-in">
            <CardContent className="pt-4 pb-3 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${ch.colorClass} flex items-center justify-center`}>
                <ch.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{ch.label}</p>
                <p className="text-lg font-bold text-foreground">{ch.count}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Monthly Channel Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} />
                  <Bar dataKey="sms" name="SMS" fill="hsl(262, 83%, 58%)" radius={[3,3,0,0]} />
                  <Bar dataKey="whatsapp" name="WhatsApp" fill="hsl(142, 70%, 45%)" radius={[3,3,0,0]} />
                  <Bar dataKey="email" name="Email" fill="hsl(217, 91%, 50%)" radius={[3,3,0,0]} />
                  <Bar dataKey="rcs" name="RCS" fill="hsl(38, 92%, 50%)" radius={[3,3,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Channel Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={channelPie} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" strokeWidth={2} stroke="hsl(var(--card))">
                    {channelPie.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {channelPie.map((ch) => (
                <div key={ch.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ch.color }} />
                  <span className="text-muted-foreground">{ch.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Top Projects by Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProjects.map((p, i) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{p.name}</span>
                      <span className="text-xs text-muted-foreground">{p.sent.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className="bg-primary rounded-full h-1.5" style={{ width: `${(p.sent / topProjects[0].sent) * 100}%` }} />
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">{p.success}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Delivery Rate Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={deliveryTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis domain={[94, 100]} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} />
                  <Line type="monotone" dataKey="rate" stroke="hsl(142, 70%, 45%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(142, 70%, 45%)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
