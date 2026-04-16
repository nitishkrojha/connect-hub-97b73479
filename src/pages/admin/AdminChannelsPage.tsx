import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Save, Smartphone, MessageSquare, Mail, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import ChannelProviderManager, { type ChannelProvider, type ProviderField } from "@/components/ChannelProviderManager";

const smsFields: ProviderField[] = [
  { key: "apiEndpoint", label: "API Endpoint", placeholder: "https://api.provider.com/sms" },
  { key: "accountSid", label: "Account SID", type: "password" },
  { key: "authToken", label: "Auth Token", type: "password" },
  { key: "senderId", label: "Default Sender ID", placeholder: "DICNTFY" },
  { key: "dltEntityId", label: "DLT Entity ID", placeholder: "1101456780000012345" },
];

const waFields: ProviderField[] = [
  { key: "apiVersion", label: "API Version", placeholder: "v18.0" },
  { key: "phoneNumberId", label: "Phone Number ID", placeholder: "102938475610293" },
  { key: "businessAccountId", label: "Business Account ID", type: "password" },
  { key: "accessToken", label: "Access Token", type: "password" },
  { key: "webhookVerifyToken", label: "Webhook Verify Token", type: "password" },
];

const emailFields: ProviderField[] = [
  { key: "smtpHost", label: "SMTP Host", placeholder: "email-smtp.ap-south-1.amazonaws.com" },
  { key: "smtpPort", label: "SMTP Port", placeholder: "587" },
  { key: "username", label: "Username", type: "password" },
  { key: "password", label: "Password", type: "password" },
  { key: "fromAddress", label: "Default From Address", placeholder: "noreply@dicnotifier.io" },
];

const rcsFields: ProviderField[] = [
  { key: "agentId", label: "Agent ID", placeholder: "dicnotifier-agent-prod" },
  { key: "apiKey", label: "API Key", type: "password" },
  { key: "brandName", label: "Brand Name", placeholder: "DIC Notifier" },
];


const defaultAdminSms: ChannelProvider[] = [
  { id: "adm-sms-1", name: "Twilio Primary", provider: "Twilio", status: "active", isDefault: true, priority: 1, autoFallback: true, credentials: { apiEndpoint: "https://api.twilio.com/2010-04-01", accountSid: "AC••••e4f2", authToken: "••••••", senderId: "DICNTFY", dltEntityId: "1101456780000012345" } },
  { id: "adm-sms-2", name: "NIC Bulk SMS", provider: "NIC", status: "active", isDefault: false, priority: 2, autoFallback: true, credentials: { apiEndpoint: "https://smsgw.nic.in/api/send", accountSid: "NIC••••", authToken: "••••••", senderId: "DICNTFY", dltEntityId: "1101456780000012345" } },
];
const defaultAdminWa: ChannelProvider[] = [
  { id: "adm-wa-1", name: "Meta Cloud API", provider: "Meta", status: "active", isDefault: true, priority: 1, autoFallback: true, credentials: { apiVersion: "v18.0", phoneNumberId: "102938475610293", businessAccountId: "BA••••1234", accessToken: "••••••", webhookVerifyToken: "••••••" } },
];
const defaultAdminEmail: ChannelProvider[] = [
  { id: "adm-email-1", name: "Amazon SES", provider: "AWS SES", status: "active", isDefault: true, priority: 1, autoFallback: true, credentials: { smtpHost: "email-smtp.ap-south-1.amazonaws.com", smtpPort: "587", username: "AKIA••••Q3F", password: "••••••", fromAddress: "noreply@dicnotifier.io" } },
];
const defaultAdminRcs: ChannelProvider[] = [
  { id: "adm-rcs-1", name: "Google RBM", provider: "Google RBM", status: "degraded", isDefault: true, priority: 1, autoFallback: true, credentials: { agentId: "dicnotifier-agent-prod", apiKey: "••••••", brandName: "DIC Notifier" } },
];

const AdminChannelsPage = () => {
  const [activeTab, setActiveTab] = useState("sms");
  const [smsProviders, setSmsProviders] = useState<ChannelProvider[]>(defaultAdminSms);
  const [waProviders, setWaProviders] = useState<ChannelProvider[]>(defaultAdminWa);
  const [emailProviders, setEmailProviders] = useState<ChannelProvider[]>(defaultAdminEmail);
  const [rcsProviders, setRcsProviders] = useState<ChannelProvider[]>(defaultAdminRcs);
  

  const getChannelStatus = (providers: ChannelProvider[]) => {
    if (providers.length === 0) return "inactive";
    if (providers.some(p => p.status === "degraded")) return "degraded";
    if (providers.every(p => p.status === "active")) return "healthy";
    return "partial";
  };

  const healthCards = [
    { name: "SMS Gateway", icon: Smartphone, status: getChannelStatus(smsProviders), count: smsProviders.filter(p => p.status === "active").length, colorClass: "bg-channel-sms" },
    { name: "WhatsApp API", icon: MessageSquare, status: getChannelStatus(waProviders), count: waProviders.filter(p => p.status === "active").length, colorClass: "bg-channel-whatsapp" },
    { name: "Email SMTP", icon: Mail, status: getChannelStatus(emailProviders), count: emailProviders.filter(p => p.status === "active").length, colorClass: "bg-channel-email" },
    { name: "RCS Provider", icon: Sparkles, status: getChannelStatus(rcsProviders), count: rcsProviders.filter(p => p.status === "active").length, colorClass: "bg-channel-rcs" },
    
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Channel Configuration</h1>
        <p className="text-muted-foreground mt-1">Master provider settings for all communication channels · Up to 3 providers per channel with auto-fallback</p>
      </div>

      {/* Provider Health */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {healthCards.map((p) => (
          <Card key={p.name} className="shadow-card">
            <CardContent className="pt-4 pb-3 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${p.colorClass} flex items-center justify-center`}>
                <p.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{p.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {p.status === "healthy" ? (
                    <><CheckCircle2 className="w-3 h-3 text-success" /><span className="text-xs text-success">Healthy</span></>
                  ) : p.status === "degraded" ? (
                    <><XCircle className="w-3 h-3 text-warning" /><span className="text-xs text-warning">Degraded</span></>
                  ) : (
                    <><XCircle className="w-3 h-3 text-muted-foreground" /><span className="text-xs text-muted-foreground">Inactive</span></>
                  )}
                  <Badge variant="outline" className="text-[10px] ml-1">{p.count} active</Badge>
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
            <CardHeader><CardTitle className="text-base">SMS Gateway Providers</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <ChannelProviderManager channel="sms" channelLabel="SMS" providers={smsProviders} onProvidersChange={setSmsProviders} fields={smsFields} />
              <div className="border-t border-border pt-4 space-y-3">
                <p className="text-xs font-medium text-foreground">Global SMS Settings</p>
                <div className="flex items-center gap-3">
                  <Switch defaultChecked /><Label className="text-foreground text-sm">Enable DLT Template Validation</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch defaultChecked /><Label className="text-foreground text-sm">Unicode Support</Label>
                </div>
              </div>
              <Button onClick={() => toast.success("SMS configuration saved")}><Save className="w-4 h-4 mr-2" />Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whatsapp">
          <Card className="shadow-card mt-4">
            <CardHeader><CardTitle className="text-base">WhatsApp Business API Providers</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <ChannelProviderManager channel="whatsapp" channelLabel="WhatsApp" providers={waProviders} onProvidersChange={setWaProviders} fields={waFields} />
              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <Switch defaultChecked /><Label className="text-foreground text-sm">Enable Media Messages</Label>
                </div>
              </div>
              <Button onClick={() => toast.success("WhatsApp configuration saved")}><Save className="w-4 h-4 mr-2" />Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card className="shadow-card mt-4">
            <CardHeader><CardTitle className="text-base">Email SMTP / API Providers</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <ChannelProviderManager channel="email" channelLabel="Email" providers={emailProviders} onProvidersChange={setEmailProviders} fields={emailFields} />
              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Switch defaultChecked /><Label className="text-foreground text-sm">Enable TLS Encryption</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch defaultChecked /><Label className="text-foreground text-sm">HTML Email Support</Label>
                </div>
              </div>
              <Button onClick={() => toast.success("Email configuration saved")}><Save className="w-4 h-4 mr-2" />Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rcs">
          <Card className="shadow-card mt-4">
            <CardHeader><CardTitle className="text-base">RCS Providers</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <ChannelProviderManager channel="rcs" channelLabel="RCS" providers={rcsProviders} onProvidersChange={setRcsProviders} fields={rcsFields} />
              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Switch defaultChecked /><Label className="text-foreground text-sm">Enable Rich Media</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch /><Label className="text-foreground text-sm">Enable Interactive Buttons</Label>
                </div>
              </div>
              <Button onClick={() => toast.success("RCS configuration saved")}><Save className="w-4 h-4 mr-2" />Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ivrs">
          <Card className="shadow-card mt-4">
            <CardHeader><CardTitle className="text-base">IVRS Providers & Webhook Config</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <ChannelProviderManager channel="ivrs" channelLabel="IVRS" providers={ivrsProviders} onProvidersChange={setIvrsProviders} fields={ivrsFields} />
              <div className="border-t border-border pt-4 space-y-3">
                <p className="text-xs font-medium text-foreground">IVRS Settings</p>
                <div className="flex items-center gap-3">
                  <Switch defaultChecked /><Label className="text-foreground text-sm">Enable Webhook Logging</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch defaultChecked /><Label className="text-foreground text-sm">Auto-retry Failed Calls</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch /><Label className="text-foreground text-sm">Enable Call Recording</Label>
                </div>
              </div>
              <Button onClick={() => toast.success("IVRS configuration saved")}><Save className="w-4 h-4 mr-2" />Save</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminChannelsPage;
