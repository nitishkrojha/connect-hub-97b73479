import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Save } from "lucide-react";

const ProjectConfigPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Configuration</h1>
      <p className="text-muted-foreground mt-1">Project-level communication settings</p>
    </div>

    <Tabs defaultValue="general">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="sms">SMS</TabsTrigger>
        <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
        <TabsTrigger value="email">Email</TabsTrigger>
        <TabsTrigger value="rcs">RCS</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card className="shadow-card mt-4">
          <CardHeader><CardTitle className="text-base">Project Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label className="text-foreground text-sm">Project Name</Label><Input defaultValue="My Bharat" className="mt-1.5" /></div>
              <div><Label className="text-foreground text-sm">Project Code</Label><Input defaultValue="MYBRT" disabled className="mt-1.5" /></div>
              <div><Label className="text-foreground text-sm">Contact Person</Label><Input defaultValue="Ravi Kumar" className="mt-1.5" /></div>
              <div><Label className="text-foreground text-sm">Contact Email</Label><Input defaultValue="ravi@alpha.com" className="mt-1.5" /></div>
              <div><Label className="text-foreground text-sm">Contact Mobile</Label><Input defaultValue="+91 98765 43210" className="mt-1.5" /></div>
              <div><Label className="text-foreground text-sm">Department</Label><Input defaultValue="Marketing" className="mt-1.5" /></div>
            </div>
            <Button onClick={() => toast.success("Project details updated")}><Save className="w-4 h-4 mr-2" />Save</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="sms">
        <Card className="shadow-card mt-4">
          <CardHeader><CardTitle className="text-base">SMS Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label className="text-foreground text-sm">Sender ID</Label><Input defaultValue="ALPHAPRJ" className="mt-1.5" /></div>
              <div><Label className="text-foreground text-sm">DLT Template Header</Label><Input defaultValue="1101456780000067890" className="mt-1.5" /></div>
            </div>
            <div className="flex items-center gap-3">
              <Switch defaultChecked /><Label className="text-foreground text-sm">Enable Unicode</Label>
            </div>
            <Button onClick={() => toast.success("SMS settings updated")}><Save className="w-4 h-4 mr-2" />Save</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="whatsapp">
        <Card className="shadow-card mt-4">
          <CardHeader><CardTitle className="text-base">WhatsApp Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label className="text-foreground text-sm">Business Display Name</Label><Input defaultValue="Project Alpha" className="mt-1.5" /></div>
              <div><Label className="text-foreground text-sm">Template Namespace</Label><Input defaultValue="alpha_templates" className="mt-1.5" /></div>
            </div>
            <div className="flex items-center gap-3">
              <Switch defaultChecked /><Label className="text-foreground text-sm">Enable Media Messages</Label>
            </div>
            <Button onClick={() => toast.success("WhatsApp settings updated")}><Save className="w-4 h-4 mr-2" />Save</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="email">
        <Card className="shadow-card mt-4">
          <CardHeader><CardTitle className="text-base">Email Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label className="text-foreground text-sm">Sender Name</Label><Input defaultValue="Project Alpha Team" className="mt-1.5" /></div>
              <div><Label className="text-foreground text-sm">Reply-To Email</Label><Input defaultValue="support@alpha.com" className="mt-1.5" /></div>
              <div><Label className="text-foreground text-sm">From Address</Label><Input defaultValue="noreply@alpha.com" className="mt-1.5" /></div>
            </div>
            <div className="flex items-center gap-3">
              <Switch defaultChecked /><Label className="text-foreground text-sm">Enable HTML Emails</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch defaultChecked /><Label className="text-foreground text-sm">Allow Attachments</Label>
            </div>
            <Button onClick={() => toast.success("Email settings updated")}><Save className="w-4 h-4 mr-2" />Save</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="rcs">
        <Card className="shadow-card mt-4">
          <CardHeader><CardTitle className="text-base">RCS Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label className="text-foreground text-sm">Agent Display Name</Label><Input defaultValue="Alpha Bot" className="mt-1.5" /></div>
              <div><Label className="text-foreground text-sm">Profile Color</Label><Input defaultValue="#2563EB" type="color" className="mt-1.5 w-20 h-9" /></div>
            </div>
            <div className="flex items-center gap-3">
              <Switch defaultChecked /><Label className="text-foreground text-sm">Enable Rich Cards</Label>
            </div>
            <Button onClick={() => toast.success("RCS settings updated")}><Save className="w-4 h-4 mr-2" />Save</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
);

export default ProjectConfigPage;
