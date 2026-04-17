import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Copy, Check } from "lucide-react";
import { channels as seedChannels, type ChannelMeta } from "@/data/inboxMockData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const InboxConnectionsPage = () => {
  const [chs, setChs] = useState<ChannelMeta[]>(seedChannels);
  const [openKey, setOpenKey] = useState<string | null>(null);

  const toggleConnect = (key: string, connect: boolean) => {
    setChs(prev => prev.map(c => c.key === key ? {
      ...c,
      connected: connect,
      lastSync: connect ? "just now" : undefined,
      messagesToday: connect ? 0 : undefined,
      webhookUrl: connect ? `https://api.dic.notify/webhooks/${c.key}/${Math.random().toString(36).slice(2, 8)}` : undefined,
    } : c));
    toast.success(connect ? "Channel connected" : "Channel disconnected");
    setOpenKey(null);
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Channel Connections</h1>
        <p className="text-sm text-muted-foreground">Connect inbound messaging channels to your inbox</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chs.map(ch => {
          const Icon = ch.icon;
          return (
            <Card key={ch.key}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-lg bg-muted flex items-center justify-center", ch.color)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-base">{ch.name}</CardTitle>
                </div>
                <Badge variant={ch.connected ? "default" : "outline"} className={ch.connected ? "bg-emerald-500/15 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/15" : ""}>
                  {ch.connected ? "Connected" : "Not connected"}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {ch.connected ? (
                  <>
                    <div className="text-xs space-y-1 text-muted-foreground">
                      <div className="flex justify-between"><span>Last sync</span><span className="text-foreground">{ch.lastSync}</span></div>
                      <div className="flex justify-between"><span>Today</span><span className="text-foreground">{ch.messagesToday} msgs</span></div>
                    </div>
                    {ch.webhookUrl && (
                      <div className="bg-muted rounded-md p-2 flex items-center gap-2">
                        <code className="text-[10px] truncate flex-1">{ch.webhookUrl}</code>
                        <Button size="sm" variant="ghost" onClick={() => copy(ch.webhookUrl!)} className="h-6 w-6 p-0">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                    <Button size="sm" variant="outline" className="w-full" onClick={() => toggleConnect(ch.key, false)}>
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Dialog open={openKey === ch.key} onOpenChange={o => setOpenKey(o ? ch.key : null)}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="w-full">
                        <Check className="w-3.5 h-3.5" /> Connect
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader><DialogTitle>Connect {ch.name}</DialogTitle></DialogHeader>
                      <div className="space-y-3">
                        {ch.key === "email" && (
                          <>
                            <div><label className="text-xs">IMAP Server</label><Input placeholder="imap.example.com" /></div>
                            <div><label className="text-xs">SMTP Server</label><Input placeholder="smtp.example.com" /></div>
                            <div><label className="text-xs">Email</label><Input type="email" placeholder="support@yourbiz.com" /></div>
                            <div><label className="text-xs">Password / App key</label><Input type="password" /></div>
                          </>
                        )}
                        {ch.key === "whatsapp" && (
                          <>
                            <div><label className="text-xs">Business Number</label><Input placeholder="+91 XXXXX XXXXX" /></div>
                            <div><label className="text-xs">WhatsApp Business API key</label><Input type="password" /></div>
                          </>
                        )}
                        {ch.key === "facebook" && (
                          <>
                            <div><label className="text-xs">Page ID</label><Input placeholder="1029384756" /></div>
                            <div><label className="text-xs">Page Access Token</label><Input type="password" /></div>
                          </>
                        )}
                        {ch.key === "instagram" && (
                          <>
                            <div><label className="text-xs">Instagram Business Account</label><Input placeholder="@handle" /></div>
                            <div><label className="text-xs">Access Token</label><Input type="password" /></div>
                          </>
                        )}
                        {ch.key === "twitter" && (
                          <>
                            <div><label className="text-xs">Handle</label><Input placeholder="@yourbrand" /></div>
                            <div><label className="text-xs">Bearer Token</label><Input type="password" /></div>
                          </>
                        )}
                        {ch.key === "telegram" && (
                          <div><label className="text-xs">Bot Token</label><Input type="password" placeholder="123456:ABC-DEF…" /></div>
                        )}
                        {ch.key === "chatbot" && (
                          <>
                            <div><label className="text-xs">Widget name</label><Input placeholder="Website chat" /></div>
                            <div><label className="text-xs">Allowed domain</label><Input placeholder="yourbiz.com" /></div>
                          </>
                        )}
                        {ch.key === "webhook" && (
                          <>
                            <div><label className="text-xs">Source name</label><Input placeholder="My CRM" /></div>
                            <div><label className="text-xs">Signing secret</label><Input type="password" /></div>
                          </>
                        )}
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setOpenKey(null)}>Cancel</Button>
                        <Button onClick={() => toggleConnect(ch.key, true)}>Connect</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>
          );
        })}

        <Card className="border-dashed flex items-center justify-center min-h-[180px]">
          <button className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors p-6" onClick={() => toast.info("Custom channel form coming soon")}>
            <div className="w-10 h-10 rounded-lg border border-dashed border-border flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Add custom channel</span>
          </button>
        </Card>
      </div>
    </div>
  );
};

export default InboxConnectionsPage;
