import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Save, Smartphone, MessageSquare, Mail, Sparkles, CheckCircle2, XCircle } from "lucide-react";

const AdminChannelsPage = () => {
  const [activeTab, setActiveTab] = useState("sms");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Channel Configuration</h1>
        <p className="text-muted-foreground mt-1">Master provider settings for all communication channels</p>
      </div>

      {/* Provider Health */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: "SMS Gateway", icon: Smartphone, status: "healthy", colorClass: "bg-channel-sms" },
          { name: "WhatsApp API", icon: MessageSquare, status: "healthy", colorClass: "bg-channel-whatsapp" },
          { name: "Email SMTP", icon: Mail, status: "healthy", colorClass: "bg-channel-email" },
          { name: "RCS Provider", icon: Sparkles, status: "degraded", colorClass: "bg-channel-rcs" },
        ].map((p) => (
          <Card key={p.name} className="shadow-card">
            <CardContent className="pt-4 pb-3 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${p.colorClass} flex items-center justify-center`}>
                <p.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{p.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {p.status === "healthy" ? (
                    <><CheckCircle2 className="w-3 h-3 text-success" /><span className="text-xs text-success">Healthy</span></>
                  ) : (
                    <><XCircle className="w-3 h-3 text-warning" /><span className="text-xs text-warning">Degraded</span></>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="rcs">RCS</TabsTrigger>
        </TabsList>

        <TabsContent value="sms">
          <Card className="shadow-card mt-4">
            <CardHeader><CardTitle className="text-base">SMS Gateway Configuration</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label className="text-foreground text-sm">Provider</Label><Input defaultValue="Twilio" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">API Endpoint</Label><Input defaultValue="https://api.twilio.com/2010-04-01" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">Account SID</Label><Input defaultValue="AC••••••••••••e4f2" type="password" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">Auth Token</Label><Input defaultValue="••••••••••••" type="password" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">Default Sender ID</Label><Input defaultValue="DICNTFY" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">DLT Entity ID</Label><Input defaultValue="1101456780000012345" className="mt-1.5" /></div>
              </div>
              <div className="flex items-center gap-3">
                <Switch defaultChecked /><Label className="text-foreground text-sm">Enable DLT Template Validation</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch defaultChecked /><Label className="text-foreground text-sm">Unicode Support</Label>
              </div>
              <Button onClick={() => toast.success("SMS configuration saved")}><Save className="w-4 h-4 mr-2" />Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whatsapp">
          <Card className="shadow-card mt-4">
            <CardHeader><CardTitle className="text-base">WhatsApp Business API Configuration</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label className="text-foreground text-sm">Provider</Label><Input defaultValue="Meta Cloud API" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">API Version</Label><Input defaultValue="v18.0" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">Phone Number ID</Label><Input defaultValue="102938475610293" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">Business Account ID</Label><Input defaultValue="BA••••••••1234" type="password" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">Access Token</Label><Input defaultValue="••••••••••••" type="password" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">Webhook Verify Token</Label><Input defaultValue="••••••••" type="password" className="mt-1.5" /></div>
              </div>
              <div className="flex items-center gap-3">
                <Switch defaultChecked /><Label className="text-foreground text-sm">Enable Media Messages</Label>
              </div>
              <Button onClick={() => toast.success("WhatsApp configuration saved")}><Save className="w-4 h-4 mr-2" />Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card className="shadow-card mt-4">
            <CardHeader><CardTitle className="text-base">Email SMTP / API Configuration</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label className="text-foreground text-sm">Provider</Label><Input defaultValue="Amazon SES" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">SMTP Host</Label><Input defaultValue="email-smtp.ap-south-1.amazonaws.com" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">SMTP Port</Label><Input defaultValue="587" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">Username</Label><Input defaultValue="AKIA••••••••Q3F" type="password" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">Password</Label><Input defaultValue="••••••••" type="password" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">Default From Address</Label><Input defaultValue="noreply@dicnotifier.io" className="mt-1.5" /></div>
              </div>
              <div className="flex items-center gap-3">
                <Switch defaultChecked /><Label className="text-foreground text-sm">Enable TLS Encryption</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch defaultChecked /><Label className="text-foreground text-sm">HTML Email Support</Label>
              </div>
              <Button onClick={() => toast.success("Email configuration saved")}><Save className="w-4 h-4 mr-2" />Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rcs">
          <Card className="shadow-card mt-4">
            <CardHeader><CardTitle className="text-base">RCS Provider Configuration</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label className="text-foreground text-sm">Provider</Label><Input defaultValue="Google RBM" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">Agent ID</Label><Input defaultValue="dicnotifier-agent-prod" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">API Key</Label><Input defaultValue="••••••••••••" type="password" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">Brand Name</Label><Input defaultValue="DIC Notifier" className="mt-1.5" /></div>
              </div>
              <div className="flex items-center gap-3">
                <Switch defaultChecked /><Label className="text-foreground text-sm">Enable Rich Media</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch /><Label className="text-foreground text-sm">Enable Interactive Buttons</Label>
              </div>
              <Button onClick={() => toast.success("RCS configuration saved")}><Save className="w-4 h-4 mr-2" />Save</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminChannelsPage;
