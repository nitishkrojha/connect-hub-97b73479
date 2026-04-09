import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Search, MoreHorizontal, Shield, Building2, Pencil, Trash2 } from "lucide-react";

const users = [
  { id: 1, name: "Admin User", email: "admin@dicnotifier.io", role: "Admin", status: "Active", lastLogin: "2 hours ago" },
  { id: 2, name: "Ravi Kumar", email: "ravi@mybharat.gov.in", role: "Project", project: "My Bharat", status: "Active", lastLogin: "1 day ago" },
  { id: 3, name: "Priya S.", email: "priya@kisansarathi.gov.in", role: "Project", project: "Kisan Sarathi", status: "Active", lastLogin: "3 hours ago" },
  { id: 4, name: "Dr. Mehta", email: "mehta@manas.gov.in", role: "Project", project: "Manas", status: "Active", lastLogin: "5 hours ago" },
  { id: 5, name: "Anita R.", email: "anita@esaras.gov.in", role: "Project", project: "E Saras", status: "Active", lastLogin: "2 days ago" },
  { id: 6, name: "Vikram J.", email: "vikram@indiahandmade.gov.in", role: "Project", project: "India Handmade", status: "Inactive", lastLogin: "30 days ago" },
];

const AdminUsersPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage admin and project users</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Add User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create New User</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div><Label className="text-foreground">Full Name</Label><Input placeholder="Enter full name" className="mt-1.5" /></div>
              <div><Label className="text-foreground">Email</Label><Input placeholder="user@example.com" className="mt-1.5" /></div>
              <div><Label className="text-foreground">Password</Label><Input type="password" placeholder="Set password" className="mt-1.5" /></div>
              <div>
                <Label className="text-foreground">Role</Label>
                <Select defaultValue="project">
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="project">Project User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground">Assign Project</Label>
                <Select>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select project..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mybrt">My Bharat</SelectItem>
                    <SelectItem value="ksrth">Kisan Sarathi</SelectItem>
                    <SelectItem value="manas">Manas</SelectItem>
                    <SelectItem value="esars">E Saras</SelectItem>
                    <SelectItem value="ihdmd">India Handmade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={() => { toast.success("User created successfully"); setDialogOpen(false); }}>Create User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-9" />
        </div>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                {["User", "Role", "Project", "Status", "Last Login", "Actions"].map((h) => (
                  <th key={h} className="text-left font-medium text-muted-foreground p-4 text-xs">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-foreground">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={u.role === "Admin" ? "default" : "secondary"} className="text-xs">
                        {u.role === "Admin" ? <Shield className="w-3 h-3 mr-1" /> : <Building2 className="w-3 h-3 mr-1" />}
                        {u.role}
                      </Badge>
                    </td>
                    <td className="p-4 text-muted-foreground">{u.project ?? "—"}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${u.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground text-xs">{u.lastLogin}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
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

export default AdminUsersPage;
