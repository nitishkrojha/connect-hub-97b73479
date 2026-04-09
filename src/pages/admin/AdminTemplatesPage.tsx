import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Search, FileText, CheckCircle2, Clock, XCircle } from "lucide-react";

const templates = [
  { id: 1, name: "OTP Verification", channel: "SMS", status: "Approved", variables: ["otp"], updatedAt: "Jun 5, 2025" },
  { id: 2, name: "Welcome Message", channel: "WhatsApp", status: "Approved", variables: ["name", "project_name"], updatedAt: "Jun 3, 2025" },
  { id: 3, name: "Welcome Email", channel: "Email", status: "Approved", variables: ["name", "project_name"], updatedAt: "Jun 1, 2025" },
  { id: 4, name: "Invoice Template", channel: "Email", status: "Pending", variables: ["name", "invoice_id", "amount"], updatedAt: "Jun 8, 2025" },
  { id: 5, name: "Promo Card", channel: "RCS", status: "Rejected", variables: ["name", "offer_details"], updatedAt: "Jun 7, 2025" },
  { id: 6, name: "Appointment Reminder", channel: "SMS", status: "Approved", variables: ["name", "date", "time"], updatedAt: "May 28, 2025" },
];

const statusStyle: Record<string, string> = {
  Approved: "bg-success/10 text-success",
  Pending: "bg-warning/10 text-warning",
  Rejected: "bg-destructive/10 text-destructive",
};

const channelBadge: Record<string, string> = {
  SMS: "bg-channel-sms/10 text-channel-sms",
  WhatsApp: "bg-channel-whatsapp/10 text-channel-whatsapp",
  Email: "bg-channel-email/10 text-channel-email",
  RCS: "bg-channel-rcs/10 text-channel-rcs",
};

const AdminTemplatesPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Template Management</h1>
          <p className="text-muted-foreground mt-1">Create, manage and approve message templates</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Create Template</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>New Template</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div><Label className="text-foreground">Template Name</Label><Input placeholder="e.g. Order Confirmation" className="mt-1.5" /></div>
              <div>
                <Label className="text-foreground">Channel</Label>
                <Select>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select channel" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="rcs">RCS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground">Message Body</Label>
                <textarea className="mt-1.5 flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Use {{variable}} for dynamic content" />
              </div>
              <div>
                <Label className="text-foreground">Assign to Projects</Label>
                <div className="mt-2 space-y-2">
                  {["My Bharat", "Kisan Sarathi", "Manas", "E Saras", "India Handmade"].map((p) => (
                    <div key={p} className="flex items-center gap-2">
                      <Checkbox id={p} /><Label htmlFor={p} className="text-sm text-foreground font-normal">{p}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <Button className="w-full" onClick={() => { toast.success("Template created"); setDialogOpen(false); }}>Create Template</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search templates..." className="pl-9" />
        </div>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                {["Template", "Channel", "Variables", "Status", "Updated", "Actions"].map((h) => (
                  <th key={h} className="text-left font-medium text-muted-foreground p-4 text-xs">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {templates.map((t) => (
                  <tr key={t.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{t.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${channelBadge[t.channel]}`}>{t.channel}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {t.variables.map((v) => <Badge key={v} variant="secondary" className="text-xs font-mono">{`{{${v}}}`}</Badge>)}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[t.status]}`}>
                        {t.status === "Approved" && <CheckCircle2 className="w-3 h-3" />}
                        {t.status === "Pending" && <Clock className="w-3 h-3" />}
                        {t.status === "Rejected" && <XCircle className="w-3 h-3" />}
                        {t.status}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground text-xs">{t.updatedAt}</td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        {t.status === "Pending" && (
                          <>
                            <Button size="sm" variant="ghost" className="text-success h-7 text-xs" onClick={() => toast.success(`${t.name} approved`)}>Approve</Button>
                            <Button size="sm" variant="ghost" className="text-destructive h-7 text-xs" onClick={() => toast.info(`${t.name} rejected`)}>Reject</Button>
                          </>
                        )}
                        <Button size="sm" variant="ghost" className="h-7 text-xs">Edit</Button>
                      </div>
                    </td>
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

export default AdminTemplatesPage;
