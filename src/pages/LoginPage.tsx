import { useState } from "react";
import { useAuth, type UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield, Building2, Send, CheckCircle2, ArrowLeft } from "lucide-react";
import HeroChannelOrbit from "@/marketing/HeroChannelOrbit";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [role, setRole] = useState<UserRole>(params.get("email") ? "project" : "admin");
  const [email, setEmail] = useState(params.get("email") || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const justConfirmed = params.get("confirmed") === "1";

  useEffect(() => {
    if (justConfirmed) toast.success("Email confirmed — please sign in.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      toast.error("Please accept the Terms & Conditions to continue.");
      return;
    }
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

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      toast.error("Please enter your email address.");
      return;
    }
    toast.success("Password reset link sent to " + forgotEmail);
    setShowForgotPassword(false);
    setForgotEmail("");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding (soft light backdrop so colorful icons pop) */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50">
        {/* Ambient blurred color blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 w-[28rem] h-[28rem] rounded-full bg-info/20 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-pink-300/20 blur-3xl" />

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(var(--foreground) / 0.12) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* Back to website */}
        <Link
          to="/"
          className="absolute top-6 left-6 z-20 flex items-center gap-1.5 text-sm text-foreground/70 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to website
        </Link>

        <div className="relative z-10 max-w-lg w-full text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-card-hover">
              <Send className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Samparq</h1>
          </div>
          <p className="text-lg text-foreground/90 mb-2 font-medium">
            One bridge. Every conversation.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-16">
            Unified messaging, social and voice — all in one workspace.
          </p>

          <HeroChannelOrbit />
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background relative">
        {/* Mobile back-to-website */}
        <Link
          to="/"
          className="lg:hidden absolute top-4 left-4 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to website
        </Link>

        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <Send className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Samparq</h1>
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
                  <TabsTrigger value="project" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Workspace
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Admin
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {justConfirmed && (
                <div className="mb-4 flex items-start gap-2 p-3 rounded-lg bg-success/10 text-success text-xs">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Your email is confirmed. Sign in to access your workspace.</span>
                </div>
              )}

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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-foreground">Password</Label>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-xs text-primary hover:text-primary/80 hover:underline transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                    className="mt-0.5"
                  />
                  <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                    I agree to the{" "}
                    <span className="text-primary hover:underline cursor-pointer font-medium">Terms & Conditions</span>{" "}
                    and{" "}
                    <span className="text-primary hover:underline cursor-pointer font-medium">Privacy Policy</span>
                  </label>
                </div>

                <Button type="submit" className="w-full" disabled={loading || !termsAccepted}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 p-3 rounded-lg bg-muted text-xs text-muted-foreground space-y-1">
                <p className="font-medium text-foreground text-sm mb-2">Demo Credentials</p>
                <p><span className="font-medium">Admin:</span> admin@dicnotifier.io / admin123</p>
                <p><span className="font-medium">Workspace:</span> project@dicnotifier.io / project123</p>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-4">
                New here?{" "}
                <Link to="/onboarding" className="text-primary font-medium hover:underline">
                  Create your workspace
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter your registered email address and we'll send you a password reset link.
            </p>
            <div className="space-y-2">
              <Label htmlFor="forgot-email" className="text-foreground">Email Address</Label>
              <Input
                id="forgot-email"
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Send Reset Link</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginPage;
