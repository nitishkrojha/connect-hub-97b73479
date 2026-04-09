import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";

const weeklyData = [
  { day: "Mon", sms: 320, whatsapp: 480, email: 820, rcs: 110 },
  { day: "Tue", sms: 410, whatsapp: 530, email: 950, rcs: 140 },
  { day: "Wed", sms: 280, whatsapp: 460, email: 780, rcs: 95 },
  { day: "Thu", sms: 520, whatsapp: 610, email: 1100, rcs: 180 },
  { day: "Fri", sms: 580, whatsapp: 690, email: 1250, rcs: 200 },
  { day: "Sat", sms: 190, whatsapp: 220, email: 380, rcs: 60 },
  { day: "Sun", sms: 110, whatsapp: 150, email: 240, rcs: 35 },
];

const campaignPerformance = [
  { name: "Welcome Onboarding", sent: 2400, delivered: 2352, failed: 48, rate: 98 },
  { name: "OTP Verification", sent: 890, delivered: 872, failed: 18, rate: 98 },
  { name: "Order Confirmation", sent: 1200, delivered: 1158, failed: 42, rate: 96.5 },
  { name: "Password Reset", sent: 340, delivered: 338, failed: 2, rate: 99.4 },
  { name: "Monthly Newsletter", sent: 5200, delivered: 4940, failed: 260, rate: 95 },
];

const channelPie = [
  { name: "SMS", value: 3200, color: "hsl(262, 83%, 58%)" },
  { name: "WhatsApp", value: 4800, color: "hsl(142, 70%, 45%)" },
  { name: "Email", value: 8200, color: "hsl(217, 91%, 50%)" },
  { name: "RCS", value: 1100, color: "hsl(38, 92%, 50%)" },
];

const csvUploads = [
  { file: "users_batch_1.csv", date: "Jun 8", total: 2400, valid: 2310, invalid: 62, duplicates: 28 },
  { file: "promo_list.csv", date: "Jun 5", total: 5200, valid: 4980, invalid: 140, duplicates: 80 },
  { file: "otp_numbers.csv", date: "Jun 3", total: 890, valid: 878, invalid: 8, duplicates: 4 },
];

const ProjectReportsPage = () => {
  const [period, setPeriod] = useState("weekly");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">Your project's communication analytics</p>
        </div>
        <div className="flex gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline"><Download className="w-4 h-4 mr-2" />Export</Button>
        </div>
      </div>

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

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Campaign Performance</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                {["Campaign", "Sent", "Delivered", "Failed", "Success Rate"].map((h) => (
                  <th key={h} className="text-left font-medium text-muted-foreground p-4 text-xs">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {campaignPerformance.map((c) => (
                  <tr key={c.name} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                    <td className="p-4 font-medium text-foreground">{c.name}</td>
                    <td className="p-4 text-foreground">{c.sent.toLocaleString()}</td>
                    <td className="p-4 text-success">{c.delivered.toLocaleString()}</td>
                    <td className="p-4 text-destructive">{c.failed}</td>
                    <td className="p-4"><Badge variant="secondary">{c.rate}%</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

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
    </div>
  );
};

export default ProjectReportsPage;
