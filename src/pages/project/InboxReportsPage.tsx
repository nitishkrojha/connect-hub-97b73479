import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import { agents } from "@/data/inboxMockData";

const days = (n: number) => Array.from({ length: n }, (_, i) => ({
  day: `D${i + 1}`,
  WhatsApp: Math.round(80 + Math.random() * 60),
  Email: Math.round(20 + Math.random() * 30),
  Chatbot: Math.round(40 + Math.random() * 40),
  Facebook: Math.round(10 + Math.random() * 25),
}));

const responseTime = (n: number) => Array.from({ length: n }, (_, i) => ({
  day: `D${i + 1}`,
  first: +(1 + Math.random() * 3).toFixed(1),
  resolution: +(15 + Math.random() * 30).toFixed(1),
}));

const agentData = agents.map(a => ({
  agent: a,
  handled: Math.round(40 + Math.random() * 80),
  avgResp: +(1 + Math.random() * 4).toFixed(1),
  csat: Math.round(80 + Math.random() * 18),
}));

const channelPerf = [
  { channel: "WhatsApp", volume: 980, ticketRate: 12, csat: 92 },
  { channel: "Email", volume: 320, ticketRate: 28, csat: 85 },
  { channel: "Chatbot", volume: 540, ticketRate: 8, csat: 78 },
  { channel: "Facebook", volume: 180, ticketRate: 15, csat: 88 },
  { channel: "Telegram", volume: 140, ticketRate: 10, csat: 90 },
];

const InboxReportsPage = () => {
  const [range, setRange] = useState("30");
  const n = parseInt(range);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Inbox Reports</h1>
          <p className="text-sm text-muted-foreground">Performance insights across channels and agents</p>
        </div>
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="volume">
        <TabsList>
          <TabsTrigger value="volume">Volume</TabsTrigger>
          <TabsTrigger value="response">Response Time</TabsTrigger>
          <TabsTrigger value="agents">Agent Performance</TabsTrigger>
          <TabsTrigger value="channels">Channel Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="volume" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Inbound volume by channel</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={340}>
                <LineChart data={days(n)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="WhatsApp" stroke="hsl(142 71% 45%)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Email" stroke="hsl(217 91% 60%)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Chatbot" stroke="hsl(280 75% 60%)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Facebook" stroke="hsl(220 91% 50%)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="response" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">First response & resolution time (minutes)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={340}>
                <LineChart data={responseTime(n)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="first" name="Avg first response" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="resolution" name="Avg resolution" stroke="hsl(280 75% 60%)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="mt-4 space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Conversations handled per agent</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={agentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="agent" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="handled" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Agent leaderboard</CardTitle></CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-muted-foreground border-b border-border">
                    <th className="py-2 font-medium">Agent</th>
                    <th className="py-2 font-medium text-right">Handled</th>
                    <th className="py-2 font-medium text-right">Avg response (m)</th>
                    <th className="py-2 font-medium text-right">CSAT %</th>
                  </tr>
                </thead>
                <tbody>
                  {agentData.map(a => (
                    <tr key={a.agent} className="border-b border-border/50">
                      <td className="py-2.5 font-medium">{a.agent}</td>
                      <td className="py-2.5 text-right">{a.handled}</td>
                      <td className="py-2.5 text-right">{a.avgResp}</td>
                      <td className="py-2.5 text-right">{a.csat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="mt-4 space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Volume by channel</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={channelPerf}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="channel" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="volume" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Channel performance</CardTitle></CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-muted-foreground border-b border-border">
                    <th className="py-2 font-medium">Channel</th>
                    <th className="py-2 font-medium text-right">Volume</th>
                    <th className="py-2 font-medium text-right">Ticket conv. %</th>
                    <th className="py-2 font-medium text-right">CSAT %</th>
                  </tr>
                </thead>
                <tbody>
                  {channelPerf.map(c => (
                    <tr key={c.channel} className="border-b border-border/50">
                      <td className="py-2.5 font-medium">{c.channel}</td>
                      <td className="py-2.5 text-right">{c.volume}</td>
                      <td className="py-2.5 text-right">{c.ticketRate}%</td>
                      <td className="py-2.5 text-right">{c.csat}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InboxReportsPage;
