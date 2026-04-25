import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Clock, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total calls (today)", value: "1,284", icon: Phone, color: "text-primary bg-primary/10" },
  { label: "Inbound", value: "742", icon: PhoneIncoming, color: "text-success bg-success/10" },
  { label: "Outbound", value: "498", icon: PhoneOutgoing, color: "text-info bg-info/10" },
  { label: "Missed", value: "44", icon: PhoneMissed, color: "text-destructive bg-destructive/10" },
  { label: "Avg duration", value: "2m 38s", icon: Clock, color: "text-warning bg-warning/10" },
  { label: "Answer rate", value: "94.2%", icon: TrendingUp, color: "text-success bg-success/10" },
];

const VoiceDashboardPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Voice Dashboard</h1>
      <p className="text-muted-foreground mt-1">Real-time call analytics across every voice channel — free for all plans.</p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((s) => (
        <Card key={s.label} className="shadow-card">
          <CardContent className="pt-4 pb-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${s.color}`}>
              <s.icon className="w-4 h-4" />
            </div>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-lg font-bold text-foreground mt-0.5">{s.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Hourly call volume</CardTitle></CardHeader>
        <CardContent>
          <div className="h-48 flex items-end gap-1.5">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="flex-1 bg-primary/70 rounded-t hover:bg-primary transition-colors" style={{ height: `${20 + Math.sin(i / 3) * 30 + Math.random() * 40}%` }} />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-2"><span>00:00</span><span>12:00</span><span>23:00</span></div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Top agents</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2.5">
            {[
              { name: "Anita Sharma", calls: 142, rate: "98%" },
              { name: "Rahul Verma", calls: 128, rate: "96%" },
              { name: "Priya Iyer", calls: 119, rate: "94%" },
              { name: "Karan Mehta", calls: 102, rate: "91%" },
            ].map((a) => (
              <div key={a.name} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40">
                <div>
                  <p className="text-sm font-medium text-foreground">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.calls} calls handled</p>
                </div>
                <span className="text-sm font-semibold text-success">{a.rate}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default VoiceDashboardPage;
