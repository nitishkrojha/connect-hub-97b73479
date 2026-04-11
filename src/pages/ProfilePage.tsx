import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { User, Mail, Phone, Building2, Shield, Save, KeyRound, Eye, EyeOff } from "lucide-react";

const ProfilePage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [phone, setPhone] = useState(isAdmin ? "+91 99999 00000" : "+91 98765 43210");
  const [department, setDepartment] = useState(isAdmin ? "Platform Administration" : "Youth Affairs");
  const [designation, setDesignation] = useState(isAdmin ? "System Administrator" : "Project Head");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    toast.success("Password changed successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account information and security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="shadow-card">
            <CardContent className="pt-6 text-center">
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                {name.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{name}</h3>
              <p className="text-sm text-muted-foreground">{email}</p>
              <div className="mt-3 flex justify-center">
                <Badge variant={isAdmin ? "default" : "secondary"} className="flex items-center gap-1">
                  {isAdmin ? <Shield className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                  {isAdmin ? "Administrator" : "Project User"}
                </Badge>
              </div>
              {!isAdmin && user?.projectName && (
                <p className="text-xs text-muted-foreground mt-2">Project: <strong className="text-foreground">{user.projectName}</strong></p>
              )}
              <Separator className="my-4" />
              <div className="text-left space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" /> {phone}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="w-4 h-4" /> {department}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" /> {designation}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Profile & Change Password */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                Edit Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-foreground text-sm">Full Name</Label>
                  <Input value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground text-sm">Email</Label>
                  <Input value={email} disabled className="bg-muted/50" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground text-sm">Phone Number</Label>
                  <Input value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground text-sm">Department</Label>
                  <Input value={department} onChange={e => setDepartment(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground text-sm">Designation</Label>
                  <Input value={designation} onChange={e => setDesignation(e.target.value)} />
                </div>
                {!isAdmin && (
                  <div className="space-y-1.5">
                    <Label className="text-foreground text-sm">Project</Label>
                    <Input value={user?.projectName || ""} disabled className="bg-muted/50" />
                  </div>
                )}
              </div>
              <Button onClick={handleSaveProfile}>
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-muted-foreground" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-foreground text-sm">Current Password</Label>
                  <div className="relative">
                    <Input
                      type={showCurrent ? "text" : "password"}
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                    />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowCurrent(!showCurrent)}>
                      {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-foreground text-sm">New Password</Label>
                    <div className="relative">
                      <Input
                        type={showNew ? "text" : "password"}
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowNew(!showNew)}>
                        {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-foreground text-sm">Confirm New Password</Label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                <Button type="submit">
                  <KeyRound className="w-4 h-4 mr-2" /> Update Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
