import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Search, FileText } from "lucide-react";

const templates = [
  { id: 1, name: "OTP Verification", channel: "SMS", status: "Approved", body: "Your OTP is {{otp}}. Valid for 5 minutes." },
  { id: 2, name: "Welcome Message", channel: "WhatsApp", status: "Approved", body: "Hello {{name}}! Welcome to My Bharat." },
  { id: 3, name: "Welcome Email", channel: "Email", status: "Approved", body: "Dear {{name}},\n\nWelcome to My Bharat!" },
  { id: 4, name: "Invoice Draft", channel: "Email", status: "Pending", body: "Dear {{name}},\n\nInvoice #{{invoice_id}} for {{amount}}" },
];

const statusStyle: Record<string, string> = {
  Approved: "bg-success/10 text-success",
  Pending: "bg-warning/10 text-warning",
  Rejected: "bg-destructive/10 text-destructive",
};

const ProjectTemplatesPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

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
              <div><Label className="text-foreground">Name</Label><Input placeholder="Template name" className="mt-1.5" /></div>
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
                <Label className="text-foreground">Body</Label>
                <textarea className="mt-1.5 flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Use {{variable}} for placeholders" />
              </div>
              <Button className="w-full" onClick={() => { toast.success("Template submitted for approval"); setDialogOpen(false); }}>Submit for Approval</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search templates..." className="pl-9" />
      </div>

      <div className="grid gap-4">
        {templates.map((t) => (
          <Card key={t.id} className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="pt-5 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground">{t.name}</h3>
                      <Badge variant="secondary" className="text-xs">{t.channel}</Badge>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[t.status]}`}>{t.status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{t.body}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectTemplatesPage;
