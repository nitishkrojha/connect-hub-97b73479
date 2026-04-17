import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Inbox as InboxIcon, UserX, CheckCircle2, Timer, Clock, AlertTriangle, Ticket, Users } from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend,
} from "recharts";
import { conversations, channels, channelName } from "@/data/inboxMockData";
import { cn } from "@/lib/utils";

const kpis = [
  { label: "Open", value: 24, icon: InboxIcon, color: "text-emerald-600" },
  { label: "Unassigned", value: 7, icon: UserX, color: "text-amber-600" },
  { label: "Closed Today", value: 41, icon: CheckCircle2, color: "text-blue-600" },
  { label: "Avg First Response", value: "2m 14s", icon: Timer, color: "text-purple-600" },
  { label: "Avg Resolution", value: "38m", icon: Clock, color: "text-indigo-600" },
  { label: "SLA Breach", value: "3.2%", icon: AlertTriangle, color: "text-red-600" },
  { label: "Tickets Created", value: 12, icon: Ticket, color: "text-orange-600" },
  { label: "Active Agents", value: 6, icon: Users, color: "text-teal-600" },
];

const hourly = Array.from({ length: 24 }, (_, h) => ({
  hour: `${h}:00`,
  msgs: Math.round(20 + Math.sin((h - 9) / 3) * 18 + Math.random() * 10 + (h >= 9 && h <= 19 ? 25 : 0)),
}));

const channelMix = [
  { name: "WhatsApp", value: 142, color: "hsl(142 71% 45%)" },
  { name: "Email", value: 38, color: "hsl(217 91% 60%)" },
  { name: "Chatbot", value: 86, color: "hsl(280 75% 60%)" },
  { name: "Facebook", value: 27, color: "hsl(220 91% 50%)" },
  { name: "Telegram", value: 19, color: "hsl(200 91% 55%)" },
];

const InboxDashboardPage = () => {
  const recent = conversations.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Inbox Dashboard</h1>
        <p className="text-sm text-muted-foreground">Real-time inbound conversation metrics</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map(k => {
          const Icon = k.icon;
          return (
            <Card key={k.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                  <Icon className={cn("w-4 h-4", k.color)} />
                </div>
                <p className="text-2xl font-bold mt-1">{k.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Today's hourly volume</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={hourly}>
                <defs>
                  <linearGradient id="vol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="msgs" stroke="hsl(var(--primary))" fill="url(#vol)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Channel mix</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={channelMix} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={2}>
                  {channelMix.map((c, i) => <Cell key={i} fill={c.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Recent conversations</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b border-border">
                  <th className="py-2 font-medium">Contact</th>
                  <th className="py-2 font-medium">Channel</th>
                  <th className="py-2 font-medium">Status</th>
                  <th className="py-2 font-medium">Assignee</th>
                  <th className="py-2 font-medium">Updated</th>
                </tr>
              </thead>
              <tbody>
                {recent.map(c => (
                  <tr key={c.id} className="border-b border-border/50">
                    <td className="py-2.5 font-medium">{c.contact}</td>
                    <td className="py-2.5">{channelName(c.channel)}</td>
                    <td className="py-2.5">
                      <Badge variant="outline" className="capitalize text-xs">{c.status}</Badge>
                    </td>
                    <td className="py-2.5 text-muted-foreground">{c.assignee ?? "—"}</td>
                    <td className="py-2.5 text-muted-foreground">{c.updatedAt}</td>
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

export default InboxDashboardPage;
