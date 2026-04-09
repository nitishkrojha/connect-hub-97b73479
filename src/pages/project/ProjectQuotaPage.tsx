import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gauge } from "lucide-react";

const quotaData = {
  monthly: 25000,
  daily: 2000,
  usedMonth: 17300,
  usedToday: 1420,
  channels: [
    { name: "SMS", limit: 10000, used: 5200, color: "hsl(262, 83%, 58%)" },
    { name: "WhatsApp", limit: 8000, used: 4800, color: "hsl(142, 70%, 45%)" },
    { name: "Email", limit: 15000, used: 8200, color: "hsl(217, 91%, 50%)" },
    { name: "RCS", limit: 5000, used: 1100, color: "hsl(38, 92%, 50%)" },
  ],
};

const ProjectQuotaPage = () => {
  const monthPct = (quotaData.usedMonth / quotaData.monthly) * 100;
  const dayPct = (quotaData.usedToday / quotaData.daily) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Quota Usage</h1>
        <p className="text-muted-foreground mt-1">Monitor your assigned communication quota</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="shadow-card">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Gauge className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Quota</p>
                <p className="text-lg font-bold text-foreground">{quotaData.usedMonth.toLocaleString()} / {quotaData.monthly.toLocaleString()}</p>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div className={`rounded-full h-3 ${monthPct > 90 ? "bg-destructive" : monthPct > 70 ? "bg-warning" : "bg-primary"}`} style={{ width: `${monthPct}%` }} />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-muted-foreground">{monthPct.toFixed(1)}% consumed</span>
              <span className="text-xs text-muted-foreground">{(quotaData.monthly - quotaData.usedMonth).toLocaleString()} remaining</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <Gauge className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Daily Quota</p>
                <p className="text-lg font-bold text-foreground">{quotaData.usedToday.toLocaleString()} / {quotaData.daily.toLocaleString()}</p>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div className={`rounded-full h-3 ${dayPct > 90 ? "bg-destructive" : dayPct > 70 ? "bg-warning" : "bg-info"}`} style={{ width: `${dayPct}%` }} />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-muted-foreground">{dayPct.toFixed(1)}% consumed</span>
              <span className="text-xs text-muted-foreground">{(quotaData.daily - quotaData.usedToday).toLocaleString()} remaining</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Channel-wise Quota</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-5">
            {quotaData.channels.map((ch) => {
              const pct = (ch.used / ch.limit) * 100;
              return (
                <div key={ch.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ch.color }} />
                      <span className="text-sm font-medium text-foreground">{ch.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {ch.used.toLocaleString()} / {ch.limit.toLocaleString()}
                      <Badge variant="secondary" className="ml-2 text-xs">{pct.toFixed(0)}%</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="rounded-full h-2.5 transition-all" style={{ width: `${pct}%`, backgroundColor: ch.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectQuotaPage;
