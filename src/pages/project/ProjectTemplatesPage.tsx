import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Search, FileText, Edit2, Copy } from "lucide-react";

interface Template {
  id: number;
  name: string;
  channel: string;
  status: string;
  body: string;
  templateId?: string;
}

const initialTemplates: Template[] = [
  { id: 1, name: "OTP Verification", channel: "SMS", status: "Approved", body: "Your OTP is {{otp}}. Valid for 5 minutes.", templateId: "TPL-SMS-00001" },
  { id: 2, name: "Welcome Message", channel: "WhatsApp", status: "Approved", body: "Hello {{name}}! Welcome to My Bharat.", templateId: "TPL-WA-00002" },
  { id: 3, name: "Welcome Email", channel: "Email", status: "Approved", body: "Dear {{name}},\n\nWelcome to My Bharat!", templateId: "TPL-EML-00003" },
  { id: 4, name: "Invoice Draft", channel: "Email", status: "Pending", body: "Dear {{name}},\n\nInvoice #{{invoice_id}} for {{amount}}" },
];

const statusStyle: Record<string, string> = {
  Approved: "bg-success/10 text-success",
  Pending: "bg-warning/10 text-warning",
  Rejected: "bg-destructive/10 text-destructive",
};

const ProjectTemplatesPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [editName, setEditName] = useState("");
  const [editChannel, setEditChannel] = useState("");
  const [editBody, setEditBody] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [newName, setNewName] = useState("");
  const [newChannel, setNewChannel] = useState("");
  const [newBody, setNewBody] = useState("");

  const handleCreate = () => {
    if (!newName || !newChannel || !newBody) { toast.error("Please fill all fields"); return; }
    const t: Template = { id: Date.now(), name: newName, channel: newChannel, status: "Pending", body: newBody };
    setTemplates([...templates, t]);
    setNewName(""); setNewChannel(""); setNewBody("");
    setDialogOpen(false);
    toast.success("Template submitted for approval");
  };

  const openEdit = (t: Template) => {
    setEditingTemplate(t);
    setEditName(t.name);
    setEditChannel(t.channel);
    setEditBody(t.body);
    setEditDialog(true);
  };

  const handleEdit = () => {
    if (!editingTemplate) return;
    setTemplates(templates.map(t => t.id === editingTemplate.id
      ? { ...t, name: editName, channel: editChannel, body: editBody, status: t.status === "Approved" ? "Pending" : t.status }
      : t
    ));
    setEditDialog(false);
    toast.success("Template updated & resubmitted for approval");
  };

  const filtered = templates.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.channel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Templates</h1>
          <p className="text-muted-foreground mt-1">Manage your project message templates</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" />New Template</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Template</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div><Label className="text-foreground">Name</Label><Input placeholder="Template name" className="mt-1.5" value={newName} onChange={e => setNewName(e.target.value)} /></div>
              <div>
                <Label className="text-foreground">Channel</Label>
                <Select value={newChannel} onValueChange={setNewChannel}><SelectTrigger className="mt-1.5"><SelectValue placeholder="Select channel" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SMS">SMS</SelectItem>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="RCS">RCS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground">Body</Label>
                <textarea className="mt-1.5 flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Use {{variable}} for placeholders" value={newBody} onChange={e => setNewBody(e.target.value)} />
              </div>
              <Button className="w-full" onClick={handleCreate}>Submit for Approval</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search templates..." className="pl-9" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      </div>

      <div className="grid gap-4">
        {filtered.map((t) => (
          <Card key={t.id} className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="pt-5 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <div className="flex items-start gap-2 flex-1">
                  <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground">{t.name}</h3>
                      <Badge variant="secondary" className="text-xs">{t.channel}</Badge>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[t.status]}`}>{t.status}</span>
                    </div>
                    {t.templateId && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">{t.templateId}</span>
                        <button onClick={() => { navigator.clipboard.writeText(t.templateId!); toast.success("Template ID copied"); }} className="text-muted-foreground hover:text-foreground">
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{t.body}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => openEdit(t)}>
                  <Edit2 className="w-3.5 h-3.5 mr-1" />Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent>
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
                <Label className="text-foreground">Body</Label>
                <textarea className="mt-1.5 flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={editBody} onChange={e => setEditBody(e.target.value)} />
              </div>
              <p className="text-xs text-muted-foreground">Note: Editing an approved template will resubmit it for approval.</p>
              <Button className="w-full" onClick={handleEdit}>Save & Resubmit</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectTemplatesPage;
