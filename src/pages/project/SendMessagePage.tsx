import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Send, Upload, Database, Smartphone, MessageSquare, Mail, Sparkles,
  FileText, X, Check, AlertCircle, Users, Plus, Trash2,
} from "lucide-react";

const templates: Record<string, { id: string; name: string; body: string; variables: string[] }[]> = {
  sms: [
    { id: "s1", name: "OTP Verification", body: "Your OTP is {{otp}}. Valid for 5 minutes. Do not share.", variables: ["otp"] },
    { id: "s2", name: "Order Update", body: "Hi {{name}}, your order #{{order_id}} has been {{status}}.", variables: ["name", "order_id", "status"] },
  ],
  whatsapp: [
    { id: "w1", name: "Welcome Message", body: "Hello {{name}}! Welcome to {{project_name}}. We're glad to have you.", variables: ["name", "project_name"] },
    { id: "w2", name: "Appointment Reminder", body: "Hi {{name}}, your appointment is on {{date}} at {{time}}.", variables: ["name", "date", "time"] },
  ],
  email: [
    { id: "e1", name: "Welcome Email", body: "Dear {{name}},\n\nWelcome to {{project_name}}!\n\nBest regards,\nTeam", variables: ["name", "project_name"] },
    { id: "e2", name: "Invoice", body: "Dear {{name}},\n\nPlease find your invoice #{{invoice_id}} for {{amount}}.\n\nThank you.", variables: ["name", "invoice_id", "amount"] },
  ],
  rcs: [
    { id: "r1", name: "Promo Card", body: "{{name}}, check out our latest offer: {{offer_details}}", variables: ["name", "offer_details"] },
  ],
};

const channelConfig = [
  { id: "sms", label: "SMS", icon: Smartphone, colorClass: "bg-channel-sms" },
  { id: "whatsapp", label: "WhatsApp", icon: MessageSquare, colorClass: "bg-channel-whatsapp" },
  { id: "email", label: "Email", icon: Mail, colorClass: "bg-channel-email" },
  { id: "rcs", label: "RCS", icon: Sparkles, colorClass: "bg-channel-rcs" },
];

const dbAudiences = [
  { id: "db1", name: "All Active Users", count: 12400 },
  { id: "db2", name: "Premium Members", count: 3200 },
  { id: "db3", name: "New Signups (Last 7 Days)", count: 890 },
  { id: "db4", name: "Inactive Users (30+ Days)", count: 5600 },
];

const SendMessagePage = () => {
  const [channel, setChannel] = useState("sms");
  const [sendMode, setSendMode] = useState("single");
  const [numbers, setNumbers] = useState<string[]>([""]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [subject, setSubject] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<{ headers: string[]; rows: string[][]; valid: number; invalid: number; duplicates: number } | null>(null);
  const [selectedAudience, setSelectedAudience] = useState("");
  const [sending, setSending] = useState(false);

  const currentTemplates = templates[channel] || [];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const tmpl = currentTemplates.find((t) => t.id === templateId);
    if (tmpl) setMessageBody(tmpl.body);
  };

  const addNumber = () => setNumbers([...numbers, ""]);
  const removeNumber = (i: number) => setNumbers(numbers.filter((_, idx) => idx !== i));
  const updateNumber = (i: number, val: string) => {
    const updated = [...numbers];
    updated[i] = val;
    setNumbers(updated);
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFile(file);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const lines = text.trim().split("\n");
      const headers = lines[0].split(",").map((h) => h.trim());
      const rows = lines.slice(1, 6).map((l) => l.split(",").map((c) => c.trim()));
      const total = lines.length - 1;
      setCsvPreview({
        headers,
        rows,
        valid: Math.floor(total * 0.92),
        invalid: Math.floor(total * 0.05),
        duplicates: Math.floor(total * 0.03),
      });
    };
    reader.readAsText(file);
  };

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Campaign submitted successfully!", { description: `Messages queued for delivery via ${channel.toUpperCase()}` });
    }, 1500);
  };

  const recipientCount = sendMode === "single"
    ? numbers.filter((n) => n.trim()).length
    : sendMode === "csv"
    ? csvPreview?.valid ?? 0
    : dbAudiences.find((a) => a.id === selectedAudience)?.count ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Send Message</h1>
        <p className="text-muted-foreground mt-1">Compose and send via any channel</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Config */}
        <div className="xl:col-span-2 space-y-6">
          {/* Channel Selection */}
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-base">Select Channel</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {channelConfig.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => { setChannel(ch.id); setSelectedTemplate(""); setMessageBody(""); }}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                      channel === ch.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg ${ch.colorClass} flex items-center justify-center`}>
                      <ch.icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{ch.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recipients */}
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-base">Recipients</CardTitle></CardHeader>
            <CardContent>
              <Tabs value={sendMode} onValueChange={setSendMode}>
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="single" className="flex items-center gap-2"><Send className="w-3.5 h-3.5" />Manual</TabsTrigger>
                  <TabsTrigger value="csv" className="flex items-center gap-2"><Upload className="w-3.5 h-3.5" />CSV Upload</TabsTrigger>
                  <TabsTrigger value="database" className="flex items-center gap-2"><Database className="w-3.5 h-3.5" />Database</TabsTrigger>
                </TabsList>

                <TabsContent value="single" className="space-y-3">
                  {numbers.map((num, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input
                        placeholder={channel === "email" ? "recipient@example.com" : "+91 XXXXX XXXXX"}
                        value={num}
                        onChange={(e) => updateNumber(i, e.target.value)}
                        className="flex-1"
                      />
                      {numbers.length > 1 && (
                        <Button variant="ghost" size="icon" onClick={() => removeNumber(i)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addNumber}><Plus className="w-3.5 h-3.5 mr-1" /> Add Recipient</Button>
                </TabsContent>

                <TabsContent value="csv" className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Drop CSV file or click to browse</p>
                    <input type="file" accept=".csv" onChange={handleCsvUpload} className="hidden" id="csv-upload" />
                    <Button variant="outline" size="sm" onClick={() => document.getElementById("csv-upload")?.click()}>
                      Choose File
                    </Button>
                    {csvFile && <p className="text-xs text-muted-foreground mt-2">{csvFile.name}</p>}
                  </div>
                  {csvPreview && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-success"><Check className="w-3.5 h-3.5" /> {csvPreview.valid} valid</span>
                        <span className="flex items-center gap-1 text-destructive"><X className="w-3.5 h-3.5" /> {csvPreview.invalid} invalid</span>
                        <span className="flex items-center gap-1 text-warning"><AlertCircle className="w-3.5 h-3.5" /> {csvPreview.duplicates} duplicates</span>
                      </div>
                      <div className="overflow-x-auto rounded-lg border border-border">
                        <table className="w-full text-xs">
                          <thead><tr className="bg-muted">{csvPreview.headers.map((h) => <th key={h} className="p-2 text-left font-medium text-muted-foreground">{h}</th>)}</tr></thead>
                          <tbody>{csvPreview.rows.map((row, i) => <tr key={i} className="border-t border-border">{row.map((c, j) => <td key={j} className="p-2 text-foreground">{c}</td>)}</tr>)}</tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="database" className="space-y-3">
                  <Label className="text-foreground">Select Audience Segment</Label>
                  <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                    <SelectTrigger><SelectValue placeholder="Choose audience..." /></SelectTrigger>
                    <SelectContent>
                      {dbAudiences.map((a) => (
                        <SelectItem key={a.id} value={a.id}>
                          <span className="flex items-center gap-2">{a.name} <Badge variant="secondary" className="text-xs">{a.count.toLocaleString()}</Badge></span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedAudience && (
                    <div className="p-3 rounded-lg bg-muted flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">
                        {dbAudiences.find((a) => a.id === selectedAudience)?.count.toLocaleString()} recipients selected
                      </span>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Message Compose */}
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-base">Compose Message</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-foreground mb-1.5 block">Template (Optional)</Label>
                <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                  <SelectTrigger><SelectValue placeholder="Choose a template or write custom..." /></SelectTrigger>
                  <SelectContent>
                    {currentTemplates.map((t) => (
                      <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {channel === "email" && (
                <div>
                  <Label htmlFor="subject" className="text-foreground mb-1.5 block">Subject</Label>
                  <Input id="subject" placeholder="Email subject line" value={subject} onChange={(e) => setSubject(e.target.value)} />
                </div>
              )}
              <div>
                <Label className="text-foreground mb-1.5 block">Message Body</Label>
                <Textarea
                  placeholder="Type your message here... Use {{variable}} for dynamic content"
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  rows={channel === "email" ? 8 : 4}
                />
                <p className="text-xs text-muted-foreground mt-1.5">{messageBody.length} characters</p>
              </div>
              {selectedTemplate && (
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-xs text-muted-foreground">Variables:</span>
                  {currentTemplates.find((t) => t.id === selectedTemplate)?.variables.map((v) => (
                    <Badge key={v} variant="secondary" className="text-xs font-mono">{`{{${v}}}`}</Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: Preview & Send */}
        <div className="space-y-6">
          <Card className="shadow-card sticky top-20">
            <CardHeader><CardTitle className="text-base">Campaign Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Channel</span>
                  <span className="font-medium text-foreground">{channelConfig.find((c) => c.id === channel)?.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Send Mode</span>
                  <span className="font-medium text-foreground capitalize">{sendMode === "csv" ? "CSV Upload" : sendMode === "database" ? "Database" : "Manual"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Recipients</span>
                  <span className="font-medium text-foreground">{recipientCount.toLocaleString()}</span>
                </div>
                {selectedTemplate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Template</span>
                    <span className="font-medium text-foreground truncate ml-2">{currentTemplates.find((t) => t.id === selectedTemplate)?.name}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Message Length</span>
                  <span className="font-medium text-foreground">{messageBody.length} chars</span>
                </div>
              </div>

              <hr className="border-border" />

              {messageBody && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Preview</p>
                  <div className="p-3 rounded-lg bg-muted text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                    {messageBody}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">Save Draft</Button>
                <Button className="flex-1" onClick={handleSend} disabled={sending || !messageBody || recipientCount === 0}>
                  {sending ? "Sending..." : "Send Now"}
                </Button>
              </div>
              <Button variant="outline" className="w-full" disabled={!messageBody || recipientCount === 0}>
                Schedule Send
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SendMessagePage;
