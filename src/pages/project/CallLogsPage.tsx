import { Card, CardContent } from "@/components/ui/card";
import { PhoneIncoming, PhoneOutgoing, PhoneMissed, Play } from "lucide-react";

const logs = [
  { id: 1, type: "in", from: "+91 98765 12345", agent: "Anita S.", duration: "3m 42s", status: "Answered", time: "10:42 AM" },
  { id: 2, type: "out", from: "Rahul V.", to: "+91 99876 11122", duration: "1m 12s", status: "Answered", time: "10:36 AM" },
  { id: 3, type: "miss", from: "+91 90123 45678", agent: "—", duration: "0s", status: "Missed", time: "10:21 AM" },
  { id: 4, type: "in", from: "+91 88123 99887", agent: "Priya I.", duration: "5m 03s", status: "Answered", time: "09:58 AM" },
  { id: 5, type: "out", from: "Karan M.", to: "+91 77665 44332", duration: "0s", status: "No answer", time: "09:44 AM" },
];

const ICON: any = { in: PhoneIncoming, out: PhoneOutgoing, miss: PhoneMissed };
const COLOR: any = { in: "text-success bg-success/10", out: "text-info bg-info/10", miss: "text-destructive bg-destructive/10" };

const CallLogsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Call Logs</h1>
      <p className="text-muted-foreground mt-1">Every call placed or received — with recordings.</p>
    </div>

    <Card className="shadow-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              {["Type", "From / To", "Agent", "Duration", "Status", "Time", ""].map((h) => (
                <th key={h} className="text-left font-medium text-muted-foreground p-4 text-xs">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {logs.map((l) => {
                const Icon = ICON[l.type];
                return (
                  <tr key={l.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                    <td className="p-4"><div className={`w-7 h-7 rounded-lg flex items-center justify-center ${COLOR[l.type]}`}><Icon className="w-3.5 h-3.5" /></div></td>
                    <td className="p-4 text-foreground">{l.from}{(l as any).to ? ` → ${(l as any).to}` : ""}</td>
                    <td className="p-4 text-muted-foreground">{l.agent || "—"}</td>
                    <td className="p-4 text-muted-foreground">{l.duration}</td>
                    <td className="p-4 text-foreground text-xs">{l.status}</td>
                    <td className="p-4 text-muted-foreground text-xs whitespace-nowrap">{l.time}</td>
                    <td className="p-4"><button className="p-1.5 rounded hover:bg-muted"><Play className="w-3.5 h-3.5 text-primary" /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default CallLogsPage;
