import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, Upload, Play, Calendar } from "lucide-react";

const VoiceBroadcastPage = () => (
  <div className="space-y-6">
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Voice Broadcast</h1>
        <p className="text-muted-foreground mt-1">Send pre-recorded voice messages to thousands of contacts at once.</p>
      </div>
      <Button><Megaphone className="w-4 h-4" /> New broadcast</Button>
    </div>

    <div className="grid sm:grid-cols-3 gap-4">
      {[
        { label: "Broadcasts (this month)", value: "12" },
        { label: "Calls placed", value: "48,200" },
        { label: "Connected rate", value: "87.4%" },
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
      <CardHeader><CardTitle className="text-base">Recent broadcasts</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-2">
          {[
            { name: "Diwali greetings", contacts: 12000, status: "Completed", date: "Oct 22" },
            { name: "Premium reminder", contacts: 4500, status: "Scheduled", date: "Oct 28" },
            { name: "Order update batch", contacts: 1800, status: "In progress", date: "Today" },
          ].map((b) => (
            <div key={b.name} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Play className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{b.name}</p>
                  <p className="text-xs text-muted-foreground">{b.contacts.toLocaleString()} contacts</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> {b.date}</span>
                <span className="px-2 py-0.5 rounded-full bg-muted text-foreground font-medium">{b.status}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default VoiceBroadcastPage;
