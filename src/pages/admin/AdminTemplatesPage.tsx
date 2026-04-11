import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Search, FileText, CheckCircle2, Clock, XCircle, Edit2, Copy } from "lucide-react";

interface Template {
  id: number;
  name: string;
  channel: string;
  status: string;
  variables: string[];
  updatedAt: string;
  templateId?: string;
}

const initialTemplates: Template[] = [
  { id: 1, name: "OTP Verification", channel: "SMS", status: "Approved", variables: ["otp"], updatedAt: "Jun 5, 2025", templateId: "TPL-SMS-00001" },
  { id: 2, name: "Welcome Message", channel: "WhatsApp", status: "Approved", variables: ["name", "project_name"], updatedAt: "Jun 3, 2025", templateId: "TPL-WA-00002" },
  { id: 3, name: "Welcome Email", channel: "Email", status: "Approved", variables: ["name", "project_name"], updatedAt: "Jun 1, 2025", templateId: "TPL-EML-00003" },
  { id: 4, name: "Invoice Template", channel: "Email", status: "Pending", variables: ["name", "invoice_id", "amount"], updatedAt: "Jun 8, 2025" },
  { id: 5, name: "Promo Card", channel: "RCS", status: "Rejected", variables: ["name", "offer_details"], updatedAt: "Jun 7, 2025" },
  { id: 6, name: "Appointment Reminder", channel: "SMS", status: "Approved", variables: ["name", "date", "time"], updatedAt: "May 28, 2025", templateId: "TPL-SMS-00006" },
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
  const [editDialog, setEditDialog] = useState(false);
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [editName, setEditName] = useState("");
  const [editChannel, setEditChannel] = useState("");
  const [editBody, setEditBody] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const generateTemplateId = (channel: string, id: number) => {
    const prefix = channel === "WhatsApp" ? "WA" : channel === "Email" ? "EML" : channel;
    return `TPL-${prefix}-${String(id).padStart(5, "0")}`;
  };

  const handleApprove = (id: number) => {
    setTemplates(templates.map(t => t.id === id
      ? { ...t, status: "Approved", templateId: generateTemplateId(t.channel, t.id) }
      : t
    ));
    toast.success("Template approved & Template ID generated");
  };

  const handleReject = (id: number) => {
    setTemplates(templates.map(t => t.id === id ? { ...t, status: "Rejected" } : t));
    toast.info("Template rejected");
  };

  const openEdit = (t: Template) => {
    setEditingTemplate(t);
    setEditName(t.name);
    setEditChannel(t.channel);
    setEditBody(t.variables.map(v => `{{${v}}}`).join(", "));
    setEditDialog(true);
  };

  const handleEdit = () => {
    if (!editingTemplate) return;
    const vars = editBody.match(/\{\{(\w+)\}\}/g)?.map(v => v.replace(/[{}]/g, "")) || [];
    setTemplates(templates.map(t => t.id === editingTemplate.id
      ? { ...t, name: editName, channel: editChannel, variables: vars, updatedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }
      : t
    ));
    setEditDialog(false);
    toast.success("Template updated");
  };

  const filtered = templates.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.templateId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <Select><SelectTrigger className="mt-1.5"><SelectValue placeholder="Select channel" /></SelectTrigger>
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
          <Input placeholder="Search templates or Template ID..." className="pl-9" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                {["Template", "Template ID", "Channel", "Variables", "Status", "Updated", "Actions"].map((h) => (
                  <th key={h} className="text-left font-medium text-muted-foreground p-4 text-xs">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{t.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {t.templateId ? (
                        <div className="flex items-center gap-1">
                          <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">{t.templateId}</span>
                          <button onClick={() => { navigator.clipboard.writeText(t.templateId!); toast.success("Copied"); }} className="text-muted-foreground hover:text-foreground">
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
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
                            <Button size="sm" variant="ghost" className="text-success h-7 text-xs" onClick={() => handleApprove(t.id)}>Approve</Button>
                            <Button size="sm" variant="ghost" className="text-destructive h-7 text-xs" onClick={() => handleReject(t.id)}>Reject</Button>
                          </>
                        )}
                        <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => openEdit(t)}>
                          <Edit2 className="w-3 h-3 mr-1" />Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Edit Template</DialogTitle></DialogHeader>
          {editingTemplate && (
            <div className="space-y-4 pt-2">
              {editingTemplate.templateId && (
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                  <span className="text-xs text-muted-foreground">Template ID:</span>
                  <span className="text-xs font-mono text-primary">{editingTemplate.templateId}</span>
                </div>
              )}
              <div><Label className="text-foreground">Name</Label><Input className="mt-1.5" value={editName} onChange={e => setEditName(e.target.value)} /></div>
              <div>
                <Label className="text-foreground">Channel</Label>
                <Select value={editChannel} onValueChange={setEditChannel}><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SMS">SMS</SelectItem>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="RCS">RCS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground">Message Body</Label>
                <textarea className="mt-1.5 flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={editBody} onChange={e => setEditBody(e.target.value)} />
              </div>
              <Button className="w-full" onClick={handleEdit}>Save Changes</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTemplatesPage;
