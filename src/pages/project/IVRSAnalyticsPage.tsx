import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Clock,
  CheckCircle2, ArrowDownRight, ArrowUpRight, Download, RefreshCw,
  Timer, PauseCircle, Headphones, MapPin, Calendar, Hourglass,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line, Legend,
} from "recharts";

/* ── Inbound mock data ── */
const inboundDaily = [
  { day: "Mon", calls: 820, answered: 740, missed: 80 },
  { day: "Tue", calls: 950, answered: 870, missed: 80 },
  { day: "Wed", calls: 780, answered: 700, missed: 80 },
  { day: "Thu", calls: 1100, answered: 990, missed: 110 },
  { day: "Fri", calls: 1250, answered: 1140, missed: 110 },
  { day: "Sat", calls: 420, answered: 380, missed: 40 },
  { day: "Sun", calls: 280, answered: 250, missed: 30 },
];
const inboundFunnel = [
  { name: "Total Inbound Calls", value: 5600, fill: "hsl(199, 89%, 48%)" },
  { name: "IVR Answered", value: 5070, fill: "hsl(217, 91%, 50%)" },
  { name: "Menu Selection", value: 4480, fill: "hsl(262, 83%, 58%)" },
  { name: "Option Selected", value: 3210, fill: "hsl(142, 70%, 45%)" },
  { name: "Agent Answered", value: 2080, fill: "hsl(38, 92%, 50%)" },
];
const inboundMenu = [
  { name: "Press 1: Account Info", count: 1420, pct: 44.2 },
  { name: "Press 2: Complaints", count: 760, pct: 23.7 },
  { name: "Press 3: Schemes", count: 510, pct: 15.9 },
  { name: "Press 4: Talk to Agent", count: 320, pct: 10.0 },
  { name: "Press 0: Repeat", count: 200, pct: 6.2 },
];
const inboundDisposition = [
  { name: "Resolved", value: 2080, color: "hsl(142, 70%, 45%)" },
  { name: "Dropped Mid-IVR", value: 1130, color: "hsl(38, 92%, 50%)" },
  { name: "Transferred to Agent", value: 560, color: "hsl(199, 89%, 48%)" },
  { name: "Voicemail", value: 220, color: "hsl(262, 83%, 58%)" },
  { name: "Missed", value: 530, color: "hsl(0, 84%, 60%)" },
];

/* ── Outbound mock data ── */
const outboundDaily = [
  { day: "Mon", calls: 1200, answered: 920, failed: 280 },
  { day: "Tue", calls: 1350, answered: 1010, failed: 340 },
  { day: "Wed", calls: 1100, answered: 850, failed: 250 },
  { day: "Thu", calls: 1500, answered: 1180, failed: 320 },
  { day: "Fri", calls: 1680, answered: 1300, failed: 380 },
  { day: "Sat", calls: 600, answered: 470, failed: 130 },
  { day: "Sun", calls: 380, answered: 290, failed: 90 },
];
const outboundFunnel = [
  { name: "Total Outbound Calls", value: 6880, fill: "hsl(173, 58%, 39%)" },
  { name: "IVR Connected", value: 5180, fill: "hsl(217, 91%, 50%)" },
  { name: "IVR Played", value: 4440, fill: "hsl(262, 83%, 58%)" },
  { name: "Recipient Responded", value: 3130, fill: "hsl(142, 70%, 45%)" },
  { name: "User Answered", value: 2040, fill: "hsl(38, 92%, 50%)" },
];
const outboundDisposition = [
  { name: "Completed", value: 2040, color: "hsl(142, 70%, 45%)" },
  { name: "Dropped Mid-IVR", value: 1000, color: "hsl(38, 92%, 50%)" },
  { name: "No Response", value: 1050, color: "hsl(0, 84%, 60%)" },
  { name: "Busy / Unreachable", value: 2580, color: "hsl(215, 15%, 47%)" },
  { name: "Voicemail", value: 210, color: "hsl(262, 83%, 58%)" },
];
const outboundCampaigns = [
  { name: "Scheme Awareness Drive", calls: 2400, answered: 1820, completed: 980, time: "2 hours ago" },
  { name: "Loan Reminder Q2", calls: 1850, answered: 1420, completed: 760, time: "1 day ago" },
  { name: "Survey: Customer Feedback", calls: 1200, answered: 890, completed: 320, time: "2 days ago" },
  { name: "Event RSVP Confirmation", calls: 1430, answered: 1050, completed: 720, time: "3 days ago" },
];

const inboundStats = [
  { label: "Inbound Calls", value: "5,600", icon: PhoneIncoming, trend: "+12.1%", sub: "This month" },
  { label: "Answered", value: "5,070", icon: CheckCircle2, trend: "+9.8%", sub: "90.5% answer rate" },
  { label: "Missed", value: "530", icon: PhoneMissed, trend: "-3.2%", sub: "9.5% miss rate" },
  { label: "Avg Hold Time", value: "42s", icon: Clock, trend: "-2s", sub: "Before menu" },
];
const outboundStats = [
  { label: "Outbound Calls", value: "6,880", icon: PhoneOutgoing, trend: "+5.4%", sub: "This month" },
  { label: "Connected", value: "5,180", icon: CheckCircle2, trend: "+4.1%", sub: "75.3% connect rate" },
  { label: "Failed", value: "1,700", icon: PhoneMissed, trend: "-1.8%", sub: "24.7% failure" },
  { label: "Avg Duration", value: "1m 48s", icon: Clock, trend: "+0.3s", sub: "Per connected call" },
];

/* ── Call timing analytics (derived from webhook timestamps) ── */
const inboundTimingStats = [
  { label: "Avg Handling Time", value: "3m 12s", icon: Timer, trend: "-8s", sub: "IVR + queue + agent" },
  { label: "Avg Queue Time", value: "24s", icon: Clock, trend: "-3s", sub: "Wait before agent" },
  { label: "Avg Hold Time", value: "11s", icon: PauseCircle, trend: "+1s", sub: "During the call" },
  { label: "Avg Agent Talk Time", value: "2m 04s", icon: Headphones, trend: "-5s", sub: "On agent leg" },
];
const outboundTimingStats = [
  { label: "Avg Handling Time", value: "2m 28s", icon: Timer, trend: "-4s", sub: "IVR + agent" },
  { label: "Avg Queue Time", value: "9s", icon: Clock, trend: "-1s", sub: "Before recipient picks up" },
  { label: "Avg Hold Time", value: "6s", icon: PauseCircle, trend: "0s", sub: "During the call" },
  { label: "Avg Agent Talk Time", value: "1m 38s", icon: Headphones, trend: "+3s", sub: "On agent leg" },
];

const inboundTimingDaily = [
  { day: "Mon", aht: 198, queue: 28, hold: 12 },
  { day: "Tue", aht: 205, queue: 31, hold: 13 },
  { day: "Wed", aht: 188, queue: 22, hold: 10 },
  { day: "Thu", aht: 212, queue: 34, hold: 14 },
  { day: "Fri", aht: 220, queue: 38, hold: 15 },
  { day: "Sat", aht: 175, queue: 18, hold: 9 },
  { day: "Sun", aht: 168, queue: 15, hold: 8 },
];
const outboundTimingDaily = [
  { day: "Mon", aht: 142, queue: 10, hold: 7 },
  { day: "Tue", aht: 151, queue: 11, hold: 6 },
  { day: "Wed", aht: 138, queue: 8, hold: 6 },
  { day: "Thu", aht: 156, queue: 12, hold: 7 },
  { day: "Fri", aht: 162, queue: 13, hold: 8 },
  { day: "Sat", aht: 128, queue: 7, hold: 5 },
  { day: "Sun", aht: 120, queue: 6, hold: 4 },
];

/* ── Geographical (India) call volume ── */
const inboundGeo = [
  { state: "Maharashtra", calls: 920, pct: 16.4 },
  { state: "Tamil Nadu", calls: 760, pct: 13.6 },
  { state: "Karnataka", calls: 690, pct: 12.3 },
  { state: "Delhi NCR", calls: 610, pct: 10.9 },
  { state: "Uttar Pradesh", calls: 540, pct: 9.6 },
  { state: "Gujarat", calls: 480, pct: 8.6 },
  { state: "West Bengal", calls: 410, pct: 7.3 },
  { state: "Telangana", calls: 360, pct: 6.4 },
  { state: "Rajasthan", calls: 290, pct: 5.2 },
  { state: "Kerala", calls: 240, pct: 4.3 },
  { state: "Others", calls: 300, pct: 5.4 },
];
const outboundGeo = [
  { state: "Maharashtra", calls: 1180, pct: 17.2 },
  { state: "Tamil Nadu", calls: 880, pct: 12.8 },
  { state: "Karnataka", calls: 820, pct: 11.9 },
  { state: "Delhi NCR", calls: 740, pct: 10.8 },
  { state: "Uttar Pradesh", calls: 690, pct: 10.0 },
  { state: "Gujarat", calls: 580, pct: 8.4 },
  { state: "West Bengal", calls: 470, pct: 6.8 },
  { state: "Telangana", calls: 420, pct: 6.1 },
  { state: "Rajasthan", calls: 360, pct: 5.2 },
  { state: "Kerala", calls: 290, pct: 4.2 },
  { state: "Others", calls: 450, pct: 6.6 },
];

/* ── Peak hours day-wise (last 30 days, hourly buckets) ── */
const HOURS = ["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22"];
const inboundPeakHours = HOURS.map((h, i) => ({
  hour: `${h}:00`,
  weekday: [12, 8, 5, 18, 95, 180, 240, 220, 260, 210, 140, 60][i],
  weekend: [8, 5, 4, 10, 40, 75, 110, 130, 145, 120, 80, 35][i],
}));
const outboundPeakHours = HOURS.map((h, i) => ({
  hour: `${h}:00`,
  weekday: [0, 0, 0, 0, 60, 220, 320, 280, 340, 290, 160, 40][i],
  weekend: [0, 0, 0, 0, 20, 90, 140, 160, 180, 150, 70, 15][i],
}));

/* ── Call duration buckets ── */
const inboundDurationBuckets = [
  { bucket: "< 2 min", calls: 2380, color: "hsl(142, 70%, 45%)" },
  { bucket: "2 – 5 min", calls: 1820, color: "hsl(199, 89%, 48%)" },
  { bucket: "5 – 10 min", calls: 980, color: "hsl(38, 92%, 50%)" },
  { bucket: "> 10 min", calls: 420, color: "hsl(0, 84%, 60%)" },
];
const outboundDurationBuckets = [
  { bucket: "< 2 min", calls: 3560, color: "hsl(142, 70%, 45%)" },
  { bucket: "2 – 5 min", calls: 2140, color: "hsl(199, 89%, 48%)" },
  { bucket: "5 – 10 min", calls: 880, color: "hsl(38, 92%, 50%)" },
  { bucket: "> 10 min", calls: 300, color: "hsl(0, 84%, 60%)" },
];

/* ── Geographical analysis card (India) ── */
const GeographicalAnalysis = ({
  data, label,
}: {
  data: { state: string; calls: number; pct: number }[];
  label: string;
}) => {
  const max = Math.max(...data.map((d) => d.calls));
  const total = data.reduce((s, d) => s + d.calls, 0);
  const heat = (calls: number) => {
    const intensity = calls / max; // 0..1
    // green → amber → red gradient based on volume
    const hue = 142 - intensity * 142; // 142 (green) → 0 (red)
    return `hsl(${hue}, 75%, ${65 - intensity * 25}%)`;
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          Geographical Analysis — {label} (India)
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          Call volume by state, derived from caller MSISDN circle in webhook payload
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stylised India heat map */}
          <div className="relative bg-muted/20 rounded-lg border border-border p-4 flex items-center justify-center min-h-[320px]">
            <svg viewBox="0 0 400 440" className="w-full h-full max-h-[340px]">
              {/* Outline of India (simplified) */}
              <path
                d="M180 30 L210 25 L245 40 L275 70 L300 110 L320 150 L335 195 L325 235 L300 270 L285 305 L270 340 L245 370 L210 395 L180 410 L155 395 L135 370 L120 340 L110 305 L100 270 L85 235 L75 195 L80 150 L100 110 L130 70 L160 40 Z"
                fill="hsl(var(--muted))"
                stroke="hsl(var(--border))"
                strokeWidth="1.5"
              />
              {/* State bubbles */}
              {[
                { state: "Delhi NCR", x: 175, y: 110 },
                { state: "Uttar Pradesh", x: 215, y: 145 },
                { state: "Rajasthan", x: 135, y: 145 },
                { state: "Gujarat", x: 100, y: 200 },
                { state: "Maharashtra", x: 155, y: 240 },
                { state: "West Bengal", x: 270, y: 180 },
                { state: "Telangana", x: 195, y: 280 },
                { state: "Karnataka", x: 165, y: 310 },
                { state: "Tamil Nadu", x: 200, y: 360 },
                { state: "Kerala", x: 165, y: 380 },
              ].map((s) => {
                const d = data.find((x) => x.state === s.state);
                if (!d) return null;
                const r = 8 + (d.calls / max) * 18;
                return (
                  <g key={s.state}>
                    <circle
                      cx={s.x}
                      cy={s.y}
                      r={r}
                      fill={heat(d.calls)}
                      fillOpacity={0.85}
                      stroke="hsl(var(--background))"
                      strokeWidth="1.5"
                    />
                    <text
                      x={s.x}
                      y={s.y + r + 11}
                      textAnchor="middle"
                      className="fill-foreground"
                      style={{ fontSize: "9px", fontWeight: 600 }}
                    >
                      {d.calls}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[10px] text-muted-foreground bg-background/80 px-2 py-1 rounded border border-border">
              <span>Low</span>
              <div className="w-16 h-2 rounded-full" style={{ background: "linear-gradient(to right, hsl(142,75%,55%), hsl(60,75%,55%), hsl(0,75%,50%))" }} />
              <span>High</span>
            </div>
          </div>

          {/* State leaderboard */}
          <div>
            <div className="text-xs text-muted-foreground mb-2">Total: <span className="font-semibold text-foreground">{total.toLocaleString()}</span> calls across {data.length} regions</div>
            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {data.map((d) => (
                <div key={d.state}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-foreground">{d.state}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{d.calls.toLocaleString()}</span>
                      <Badge variant="secondary" className="text-[10px]">{d.pct}%</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="rounded-full h-2 transition-all" style={{ width: `${(d.calls / max) * 100}%`, backgroundColor: heat(d.calls) }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

/* ── Peak hours day-wise card ── */
const PeakHoursAnalysis = ({
  data, label,
}: {
  data: { hour: string; weekday: number; weekend: number }[];
  label: string;
}) => {
  const peakWeekday = data.reduce((a, b) => (a.weekday > b.weekday ? a : b));
  const peakWeekend = data.reduce((a, b) => (a.weekend > b.weekend ? a : b));
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          Peak Hours Analysis — {label} (Last 30 days)
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          Average calls per hour, split by weekday vs weekend
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border p-3 bg-muted/20">
            <p className="text-[11px] text-muted-foreground">Weekday peak</p>
            <p className="text-lg font-bold text-foreground">{peakWeekday.hour}</p>
            <p className="text-[11px] text-muted-foreground">{peakWeekday.weekday} avg calls/hr</p>
          </div>
          <div className="rounded-lg border border-border p-3 bg-muted/20">
            <p className="text-[11px] text-muted-foreground">Weekend peak</p>
            <p className="text-lg font-bold text-foreground">{peakWeekend.hour}</p>
            <p className="text-[11px] text-muted-foreground">{peakWeekend.weekend} avg calls/hr</p>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`peak-wd-${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217, 91%, 50%)" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="hsl(217, 91%, 50%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id={`peak-we-${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Area type="monotone" dataKey="weekday" name="Weekday avg" stroke="hsl(217, 91%, 50%)" fill={`url(#peak-wd-${label})`} strokeWidth={2} />
              <Area type="monotone" dataKey="weekend" name="Weekend avg" stroke="hsl(38, 92%, 50%)" fill={`url(#peak-we-${label})`} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

/* ── Call duration buckets card ── */
const CallDurationBuckets = ({
  data, label,
}: {
  data: { bucket: string; calls: number; color: string }[];
  label: string;
}) => {
  const total = data.reduce((s, d) => s + d.calls, 0);
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Hourglass className="w-4 h-4 text-primary" />
          Call Duration Distribution — {label}
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          How calls are distributed across handling-time buckets
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {data.map((b) => {
            const pct = ((b.calls / total) * 100).toFixed(1);
            return (
              <div key={b.bucket} className="rounded-lg border border-border p-3 bg-muted/20">
                <div className="flex items-center justify-between mb-1">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.color }} />
                  <Badge variant="secondary" className="text-[10px]">{pct}%</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{b.bucket}</p>
                <p className="text-lg font-bold text-foreground">{b.calls.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis type="category" dataKey="bucket" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} width={80} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} formatter={(v: number) => `${v.toLocaleString()} calls`} />
              <Bar dataKey="calls" radius={[0, 4, 4, 0]}>
                {data.map((entry) => <Cell key={entry.bucket} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
  stats, daily, label,
}: {
  stats: typeof inboundTimingStats;
  daily: { day: string; aht: number; queue: number; hold: number }[];
  label: string;
}) => (
  <Card className="shadow-card">
    <CardHeader>
      <CardTitle className="text-base flex items-center gap-2">
        <Timer className="w-4 h-4 text-primary" />
        Call Timing Analytics — {label}
      </CardTitle>
      <p className="text-xs text-muted-foreground mt-1">
        Derived from <code className="font-mono text-[11px] bg-muted px-1 rounded">ivrs_start_time</code>,{" "}
        <code className="font-mono text-[11px] bg-muted px-1 rounded">queue_time</code>,{" "}
        <code className="font-mono text-[11px] bg-muted px-1 rounded">hold_time</code> and agent timestamps in the webhook payload
      </p>
    </CardHeader>
    <CardContent className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-border p-3 bg-muted/20">
            <div className="flex items-center justify-between mb-1">
              <s.icon className="w-4 h-4 text-primary" />
              <div className="flex items-center gap-0.5 text-[10px]">
                {s.trend.startsWith("+") ? (
                  <ArrowUpRight className="w-3 h-3 text-destructive" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-success" />
                )}
                <span className={`font-medium ${s.trend.startsWith("+") ? "text-destructive" : "text-success"}`}>{s.trend}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-lg font-bold text-foreground">{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={daily}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} unit="s" />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }}
              formatter={(v: number) => `${v}s`}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Line type="monotone" dataKey="aht" name="Avg Handling Time" stroke="hsl(217, 91%, 50%)" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="queue" name="Avg Queue Time" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="hold" name="Avg Hold Time" stroke="hsl(262, 83%, 58%)" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const FunnelView = ({ data }: { data: { name: string; value: number; fill: string }[] }) => (
  <div className="space-y-3">
    {data.map((step, i) => {
      const pct = ((step.value / data[0].value) * 100).toFixed(1);
      const dropOff = i > 0 ? (((data[i - 1].value - step.value) / data[i - 1].value) * 100).toFixed(1) : null;
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
            <div className="rounded-full h-3 transition-all" style={{ width: `${pct}%`, backgroundColor: step.fill }} />
          </div>
        </div>
      );
    })}
  </div>
);

const DispositionPie = ({ data }: { data: { name: string; value: number; color: string }[] }) => (
  <>
    <div className="h-52">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={2} stroke="hsl(var(--card))">
            {data.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div className="grid grid-cols-2 gap-2 mt-2">
      {data.map((d) => (
        <div key={d.name} className="flex items-center gap-2 text-xs">
          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
          <span className="text-muted-foreground truncate">{d.name}</span>
          <span className="text-foreground font-medium ml-auto">{d.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  </>
);

const StatGrid = ({ stats }: { stats: typeof inboundStats }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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
          <p className="text-xs text-muted-foreground">{s.label}</p>
          <p className="text-lg font-bold text-foreground">{s.value}</p>
          <p className="text-[10px] text-muted-foreground">{s.sub}</p>
        </CardContent>
      </Card>
    ))}
  </div>
);

const IVRSAnalyticsPage = () => {
  const [dateRange, setDateRange] = useState("this-month");

  return (
    <div className="space-y-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">IVRS Analytics</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Inbound & Outbound call analytics derived from your IVRS webhook</p>
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
          <Button variant="outline" size="icon"><RefreshCw className="w-4 h-4" /></Button>
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" />Export</Button>
        </div>
      </div>

      <Tabs defaultValue="inbound">
        <TabsList>
          <TabsTrigger value="inbound"><PhoneIncoming className="w-4 h-4 mr-1.5" />Inbound</TabsTrigger>
          <TabsTrigger value="outbound"><PhoneOutgoing className="w-4 h-4 mr-1.5" />Outbound</TabsTrigger>
        </TabsList>

        {/* ── INBOUND ── */}
        <TabsContent value="inbound" className="space-y-6 mt-4">
          <StatGrid stats={inboundStats} />

          <TimingAnalytics stats={inboundTimingStats} daily={inboundTimingDaily} label="Inbound" />


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader><CardTitle className="text-base">Inbound Call Funnel</CardTitle></CardHeader>
              <CardContent><FunnelView data={inboundFunnel} /></CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader><CardTitle className="text-base">Inbound Disposition</CardTitle></CardHeader>
              <CardContent><DispositionPie data={inboundDisposition} /></CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader><CardTitle className="text-base">Daily Inbound Volume</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={inboundDaily}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} />
                      <Bar dataKey="answered" name="Answered" fill="hsl(142, 70%, 45%)" radius={[3, 3, 0, 0]} stackId="a" />
                      <Bar dataKey="missed" name="Missed" fill="hsl(0, 84%, 60%)" radius={[3, 3, 0, 0]} stackId="a" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader><CardTitle className="text-base">IVR Menu Selection (Inbound)</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3.5">
                  {inboundMenu.map((opt) => (
                    <div key={opt.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-foreground">{opt.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-foreground font-semibold">{opt.count.toLocaleString()}</span>
                          <Badge variant="secondary" className="text-xs">{opt.pct}%</Badge>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="rounded-full h-2.5 bg-channel-ivrs" style={{ width: `${opt.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── OUTBOUND ── */}
        <TabsContent value="outbound" className="space-y-6 mt-4">
          <StatGrid stats={outboundStats} />

          <TimingAnalytics stats={outboundTimingStats} daily={outboundTimingDaily} label="Outbound" />


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader><CardTitle className="text-base">Outbound Call Funnel</CardTitle></CardHeader>
              <CardContent><FunnelView data={outboundFunnel} /></CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader><CardTitle className="text-base">Outbound Disposition</CardTitle></CardHeader>
              <CardContent><DispositionPie data={outboundDisposition} /></CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader><CardTitle className="text-base">Daily Outbound Volume</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={outboundDaily}>
                      <defs>
                        <linearGradient id="ivrsOutGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }} />
                      <Area type="monotone" dataKey="answered" name="Answered" stroke="hsl(173, 58%, 39%)" fill="url(#ivrsOutGrad)" strokeWidth={2} />
                      <Area type="monotone" dataKey="failed" name="Failed" stroke="hsl(0, 84%, 60%)" fill="transparent" strokeWidth={2} strokeDasharray="4 4" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader><CardTitle className="text-base">Recent Outbound Campaigns</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {outboundCampaigns.map((c) => (
                    <div key={c.name} className="border-b border-border/50 last:border-0 pb-3 last:pb-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">{c.name}</span>
                        <span className="text-[10px] text-muted-foreground">{c.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-muted-foreground">Calls: <span className="font-medium text-foreground">{c.calls.toLocaleString()}</span></span>
                        <span className="text-muted-foreground">Answered: <span className="font-medium text-foreground">{c.answered.toLocaleString()}</span></span>
                        <span className="text-muted-foreground">Completed: <span className="font-medium text-success">{c.completed.toLocaleString()}</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IVRSAnalyticsPage;
