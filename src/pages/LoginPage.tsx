import { useState } from "react";
import { useAuth, type UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Shield, Building2, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const success = login(email, password, role);
      if (success) {
        toast.success("Login successful!");
        navigate(role === "admin" ? "/admin" : "/project");
      } else {
        toast.error("Invalid credentials. Try the demo credentials shown below.");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 border border-primary-foreground/30 rounded-full" />
          <div className="absolute bottom-32 right-16 w-48 h-48 border border-primary-foreground/30 rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 border border-primary-foreground/30 rounded-full" />
        </div>
        <div className="relative z-10 max-w-lg text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center backdrop-blur-sm">
              <Send className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-primary-foreground tracking-tight">DIC Notifier</h1>
          </div>
          <p className="text-xl text-primary-foreground/90 mb-4 font-medium">
            Unified Communication Platform
          </p>
          <p className="text-primary-foreground/70 leading-relaxed">
            Centralized SMS, WhatsApp, Email & RCS messaging across all your projects. One platform, every channel.
          </p>
          <div className="mt-12 grid grid-cols-4 gap-4">
            {[
              { icon: "💬", label: "SMS" },
              { icon: "📱", label: "WhatsApp" },
              { icon: "📧", label: "Email" },
              { icon: "✨", label: "RCS" },
            ].map((ch) => (
              <div key={ch.label} className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">{ch.icon}</div>
                <div className="text-xs text-primary-foreground/80 font-medium">{ch.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <Send className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">DIC Notifier</h1>
          </div>

          <Card className="shadow-card border-border/50">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-semibold text-foreground">Welcome back</CardTitle>
              <CardDescription className="text-muted-foreground">
                Sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Tabs value={role} onValueChange={(v) => setRole(v as UserRole)} className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="admin" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Admin
                  </TabsTrigger>
                  <TabsTrigger value="project" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Project
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 p-3 rounded-lg bg-muted text-xs text-muted-foreground space-y-1">
                <p className="font-medium text-foreground text-sm mb-2">Demo Credentials</p>
                <p><span className="font-medium">Admin:</span> admin@dicnotifier.io / admin123</p>
                <p><span className="font-medium">Project:</span> project@dicnotifier.io / project123</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
