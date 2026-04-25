import { Link, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Mail, ArrowRight, Send } from "lucide-react";
import { markEmailConfirmed } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

const OnboardingSuccessPage = () => {
  const [params] = useSearchParams();
  const email = params.get("email") || "";
  const plan = params.get("plan") || "growth";

  const confirm = () => {
    markEmailConfirmed(email);
    toast.success("Email confirmed! You can now sign in.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      <header className="border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center">
              <Send className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">Samparq</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <Card className="max-w-lg w-full p-10 text-center shadow-card">
          <div className="w-16 h-16 mx-auto rounded-full bg-success/15 flex items-center justify-center mb-5 animate-scale-in">
            <Check className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">You're in.</h1>
          <p className="text-muted-foreground mt-2">
            Your workspace has been created on the <strong className="text-foreground capitalize">{plan}</strong> plan.
          </p>

          <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4 text-left">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-foreground">Confirm your email</p>
                <p className="text-muted-foreground mt-0.5">
                  We've sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Button asChild className="w-full">
              <Link to={`/login?email=${encodeURIComponent(email)}&confirmed=1`}>
                Continue to sign in <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={confirm} className="w-full text-xs">
              Dev: mark email as confirmed
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            Didn't get the email? Check spam, or <a className="text-primary underline cursor-pointer">resend</a>.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingSuccessPage;
