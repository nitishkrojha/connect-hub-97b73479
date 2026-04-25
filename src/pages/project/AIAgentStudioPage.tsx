import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, MessageSquare, Phone, Mail, Globe } from "lucide-react";

const channels = [
  { icon: MessageSquare, name: "WhatsApp Agent", desc: "AI handles WhatsApp conversations 24/7", deployed: 2 },
  { icon: Phone, name: "Voice Agent", desc: "AI answers calls and routes intelligently", deployed: 1 },
  { icon: Globe, name: "Web Chat Agent", desc: "AI assistant on your website", deployed: 3 },
  { icon: Mail, name: "Email Agent", desc: "AI drafts and triages email replies", deployed: 1 },
];

const AIAgentStudioPage = () => (
  <div className="space-y-6">
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          AI Studio <Sparkles className="w-5 h-5 text-primary" />
        </h1>
        <p className="text-muted-foreground mt-1">Deploy intelligent AI agents across every channel.</p>
      </div>
      <Button className="bg-gradient-to-r from-primary to-info"><Plus className="w-4 h-4" /> New agent</Button>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {channels.map((c) => (
        <Card key={c.name} className="shadow-card hover:shadow-card-hover transition-shadow cursor-pointer">
          <CardContent className="pt-5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/15 to-info/15 flex items-center justify-center mb-3">
              <c.icon className="w-5 h-5 text-primary" />
            </div>
            <p className="font-semibold text-foreground">{c.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
            <p className="text-xs text-primary mt-3 font-medium">{c.deployed} deployed</p>
          </CardContent>
        </Card>
      ))}
    </div>

    <Card className="shadow-card">
      <CardHeader><CardTitle className="text-base">Active agents</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-2">
          {[
            { name: "Sales Qualifier", channel: "WhatsApp", convos: 1240, csat: "4.6" },
            { name: "Support Triage", channel: "Web Chat", convos: 890, csat: "4.4" },
            { name: "Order Status Bot", channel: "Voice", convos: 2100, csat: "4.7" },
          ].map((a) => (
            <div key={a.name} className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div>
                <p className="text-sm font-semibold text-foreground">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.channel} · {a.convos.toLocaleString()} conversations</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-success">{a.csat} ★</p>
                <p className="text-[10px] text-muted-foreground">CSAT</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AIAgentStudioPage;
