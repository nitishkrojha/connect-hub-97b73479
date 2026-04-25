import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth, SignupPayload } from "@/contexts/AuthContext";
import { Plan, PLAN_LABELS, PLAN_TAGLINES } from "@/config/planEntitlements";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Send, Check, ArrowRight, ArrowLeft, Zap, Rocket, Sparkles, Building2,
  User, Mail, Phone, KeyRound, CreditCard, Lock, ShieldCheck,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const PLAN_ORDER: Plan[] = ["starter", "growth", "enterprise"];
const PLAN_ICONS = { starter: Zap, growth: Rocket, enterprise: Sparkles } as const;

interface PlanPricing {
  monthly: number; // INR
  unit: string;
  trial: string;
  cardRequired: boolean;
}
const PLAN_PRICING: Record<Plan, PlanPricing> = {
  starter:    { monthly: 0,     unit: "Free forever", trial: "Includes 1,000 free messages",          cardRequired: false },
  growth:     { monthly: 4999,  unit: "/month",       trial: "14-day free trial · billed after trial", cardRequired: true  },
  enterprise: { monthly: 19999, unit: "/month",       trial: "Custom contracts available · billed after trial", cardRequired: true },
};

const PLAN_FEATURES: Record<Plan, string[]> = {
  starter: [
    "SMS, Email & RCS sending",
    "Email, Web Chat & Webhook inbox",
    "Voice Dashboard (free)",
    "Click-to-Call & Voice Broadcast (metered)",
    "DIC Notifier — trial only",
    "1 workspace, up to 3 users",
  ],
  growth: [
    "All channels: SMS, WhatsApp, Email, RCS",
    "Full unified inbox (WhatsApp, Email, Instagram, Facebook, Telegram, Web Chat)",
    "IVR Studio + Click-to-Call + Voice Broadcast (included)",
    "Inbound call handling",
    "Contact Sync API",
    "DIC Notifier — full self-configuration",
    "Up to 25 users · audit logs",
  ],
  enterprise: [
    "Everything in Growth",
    "AI Agents for Voice, WhatsApp, Web Chat, Email",
    "Advanced analytics & SLAs",
    "SSO, dedicated support",
    "Custom data residency",
    "Unlimited users",
  ],
};

const OnboardingPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { signup } = useAuth();

  const initialPlan = (params.get("plan") as Plan) || "growth";
  const [plan, setPlan] = useState<Plan>(PLAN_ORDER.includes(initialPlan) ? initialPlan : "growth");

  // Dynamic step list — payment step inserted only for paid plans
  const steps = (() => {
    const base: string[] = ["Choose Plan", "Business", "Owner"];
    if (PLAN_PRICING[plan].cardRequired) base.push("Payment");
    base.push("Review");
    return base;
  })();
  const PAYMENT_INDEX = PLAN_PRICING[plan].cardRequired ? 3 : -1;
  const REVIEW_INDEX = steps.length - 1;

  const [step, setStep] = useState(0);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  const [form, setForm] = useState({
    businessName: "",
    businessType: "",
    website: "",
    country: "India",
    ownerName: "",
    email: "",
    mobile: "",
    designation: "",
    password: "",
    confirmPassword: "",
    agreed: false,
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  useEffect(() => {
    const p = params.get("plan") as Plan;
    if (p && PLAN_ORDER.includes(p)) setPlan(p);
  }, [params]);

  // If user moves from paid plan to starter mid-flow, clamp step
  useEffect(() => {
    if (step > steps.length - 1) setStep(steps.length - 1);
  }, [steps.length, step]);

  const update = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const validateStep = (): string | null => {
    const label = steps[step];
    if (label === "Business") {
      if (!form.businessName.trim()) return "Business name is required";
      if (!form.country.trim()) return "Country is required";
    }
    if (label === "Owner") {
      if (!form.ownerName.trim()) return "Your full name is required";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Valid work email is required";
      if (!form.mobile.trim()) return "Mobile number is required";
      if (form.password.length < 8) return "Password must be at least 8 characters";
      if (form.password !== form.confirmPassword) return "Passwords do not match";
      if (!form.agreed) return "Please accept the Terms & Privacy Policy";
    }
    if (label === "Payment") {
      if (!form.cardName.trim()) return "Cardholder name is required";
      if (form.cardNumber.replace(/\s/g, "").length < 13) return "Enter a valid card number";
      if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) return "Expiry must be MM/YY";
      if (!/^\d{3,4}$/.test(form.cardCvc)) return "Enter a valid CVC";
    }
    return null;
  };

  const next = () => {
    const err = validateStep();
    if (err) { toast.error(err); return; }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = () => {
    const payload: SignupPayload = {
      plan,
      businessName: form.businessName,
      businessType: form.businessType,
      website: form.website,
      country: form.country,
      ownerName: form.ownerName,
      email: form.email,
      mobile: form.mobile,
      designation: form.designation,
      password: form.password,
    };
    const result = signup(payload);
    if (result.ok === false) { toast.error(result.error); return; }
    navigate(`/onboarding/success?email=${encodeURIComponent(form.email)}&plan=${plan}`);
  };

  const pricing = PLAN_PRICING[plan];
  const currentLabel = steps[step];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center">
              <Send className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">Samparq</span>
          </Link>
          <Link to="/login" className="text-base text-muted-foreground hover:text-foreground">
            Already have an account? <span className="text-primary font-medium">Sign in</span>
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-10">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all",
                i < step ? "bg-primary border-primary text-primary-foreground" :
                i === step ? "border-primary text-primary bg-background" :
                "border-border text-muted-foreground bg-background"
              )}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <div className="ml-3 hidden sm:block">
                <p className={cn("text-sm font-medium", i === step ? "text-foreground" : "text-muted-foreground")}>{label}</p>
              </div>
              {i < steps.length - 1 && (
                <div className={cn("flex-1 h-0.5 mx-3", i < step ? "bg-primary" : "bg-border")} />
              )}
            </div>
          ))}
        </div>

        <Card className="p-8 shadow-card backdrop-blur-sm bg-card/95">
          {/* Step — Choose Plan */}
          {currentLabel === "Choose Plan" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Choose your plan</h1>
                <p className="text-muted-foreground text-base mt-1">You can change or upgrade anytime.</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                {PLAN_ORDER.map((p) => {
                  const Icon = PLAN_ICONS[p];
                  const selected = plan === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPlan(p)}
                      aria-pressed={selected}
                      className={cn(
                        "text-left p-4 rounded-xl border-2 transition-all",
                        selected ? "border-primary bg-primary/5 shadow-card" : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={cn("w-5 h-5", selected ? "text-primary" : "text-muted-foreground")} />
                        {selected && <Check className="w-4 h-4 text-primary" />}
                      </div>
                      <p className="font-semibold text-foreground text-base">{PLAN_LABELS[p]}</p>
                      <p className="text-sm text-muted-foreground mt-1">{PLAN_TAGLINES[p]}</p>
                    </button>
                  );
                })}
              </div>

              {/* Pricing strip for the SELECTED plan */}
              <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-info/5 p-5">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
                      {PLAN_LABELS[plan]} plan
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      {pricing.monthly === 0 ? (
                        <span className="text-3xl font-bold text-foreground">Free</span>
                      ) : (
                        <>
                          <span className="text-3xl font-bold text-foreground">
                            ₹{pricing.monthly.toLocaleString("en-IN")}
                          </span>
                          <span className="text-base text-muted-foreground">{pricing.unit}</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{pricing.trial}</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFeaturesOpen(true)}
                    aria-label={`See features of ${PLAN_LABELS[plan]} plan`}
                  >
                    See full features
                  </Button>
                </div>
              </div>

              <div className="text-sm text-muted-foreground bg-muted/40 rounded-lg p-3">
                {pricing.cardRequired
                  ? "We'll ask for card details after the owner step. You won't be charged during the 14-day trial."
                  : "14-day free trial · No credit card required · Cancel anytime"}
              </div>
            </div>
          )}

          {/* Step — Business */}
          {currentLabel === "Business" && (
            <div className="space-y-5">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Tell us about your business</h1>
                <p className="text-muted-foreground text-base mt-1">This becomes your workspace.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Business name" required icon={Building2}>
                  <Input value={form.businessName} onChange={(e) => update("businessName", e.target.value)} placeholder="Acme Pvt. Ltd." />
                </Field>
                <Field label="Business type">
                  <Select value={form.businessType} onValueChange={(v) => update("businessType", v)}>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      {["E-commerce", "BFSI", "Healthcare", "Education", "Logistics", "Travel", "Real Estate", "D2C", "SaaS", "Other"].map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Website">
                  <Input value={form.website} onChange={(e) => update("website", e.target.value)} placeholder="https://example.com" />
                </Field>
                <Field label="Country" required>
                  <Input value={form.country} onChange={(e) => update("country", e.target.value)} />
                </Field>
              </div>
            </div>
          )}

          {/* Step — Owner */}
          {currentLabel === "Owner" && (
            <div className="space-y-5">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Workspace owner details</h1>
                <p className="text-muted-foreground text-base mt-1">This will be your login. We'll send a confirmation email.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name" required icon={User}>
                  <Input value={form.ownerName} onChange={(e) => update("ownerName", e.target.value)} />
                </Field>
                <Field label="Designation">
                  <Input value={form.designation} onChange={(e) => update("designation", e.target.value)} placeholder="e.g. Director" />
                </Field>
                <Field label="Work email" required icon={Mail}>
                  <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@company.com" />
                </Field>
                <Field label="Mobile" required icon={Phone}>
                  <Input value={form.mobile} onChange={(e) => update("mobile", e.target.value)} placeholder="+91 98765 43210" />
                </Field>
                <Field label="Password" required icon={KeyRound}>
                  <Input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} />
                </Field>
                <Field label="Confirm password" required>
                  <Input type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} />
                </Field>
              </div>
              <label className="flex items-start gap-2 text-base text-muted-foreground cursor-pointer">
                <Checkbox checked={form.agreed} onCheckedChange={(v) => update("agreed", v === true)} />
                <span>I agree to the <a className="text-primary underline">Terms of Service</a> and <a className="text-primary underline">Privacy Policy</a>.</span>
              </label>
            </div>
          )}

          {/* Step — Payment (only for paid plans) */}
          {currentLabel === "Payment" && (
            <div className="space-y-5">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Add a payment method</h1>
                <p className="text-muted-foreground text-base mt-1">
                  You won't be charged during your 14-day free trial. Cancel anytime before it ends.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-muted/30 px-4 py-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{PLAN_LABELS[plan]} plan</span>
                <span className="font-semibold text-foreground">
                  ₹{pricing.monthly.toLocaleString("en-IN")} {pricing.unit} · after trial
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Cardholder name" required icon={User}>
                  <Input value={form.cardName} onChange={(e) => update("cardName", e.target.value)} placeholder="Name on card" />
                </Field>
                <Field label="Card number" required icon={CreditCard}>
                  <Input
                    inputMode="numeric"
                    value={form.cardNumber}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 19);
                      update("cardNumber", v.replace(/(.{4})/g, "$1 ").trim());
                    }}
                    placeholder="1234 5678 9012 3456"
                  />
                </Field>
                <Field label="Expiry (MM/YY)" required>
                  <Input
                    inputMode="numeric"
                    value={form.cardExpiry}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                      if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
                      update("cardExpiry", v);
                    }}
                    placeholder="MM/YY"
                  />
                </Field>
                <Field label="CVC" required icon={Lock}>
                  <Input
                    inputMode="numeric"
                    type="password"
                    value={form.cardCvc}
                    onChange={(e) => update("cardCvc", e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="•••"
                  />
                </Field>
              </div>

              <div className="flex items-start gap-2 text-sm text-muted-foreground bg-success/10 text-success-foreground rounded-lg p-3 border border-success/20">
                <ShieldCheck className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  Secure & PCI-DSS compliant. Your card is tokenized — we never store full card numbers.
                </span>
              </div>
            </div>
          )}

          {/* Step — Review */}
          {currentLabel === "Review" && (
            <div className="space-y-5">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Review & confirm</h1>
                <p className="text-muted-foreground text-base mt-1">Make sure everything looks right.</p>
              </div>
              <div className="rounded-lg border border-border divide-y">
                <Row label="Plan" value={`${PLAN_LABELS[plan]} · ${pricing.monthly === 0 ? "Free" : `₹${pricing.monthly.toLocaleString("en-IN")}${pricing.unit}`}`} />
                <Row label="Business" value={form.businessName} />
                <Row label="Type" value={form.businessType || "—"} />
                <Row label="Country" value={form.country} />
                <Row label="Owner" value={`${form.ownerName} · ${form.designation || "—"}`} />
                <Row label="Email" value={form.email} />
                <Row label="Mobile" value={form.mobile} />
                {pricing.cardRequired && (
                  <Row label="Card" value={`•••• ${form.cardNumber.replace(/\s/g, "").slice(-4) || "----"}`} />
                )}
              </div>
              <div className="text-sm text-info bg-info/10 rounded-lg p-3">
                A confirmation email will be sent to <strong>{form.email}</strong>. Click the link to activate your workspace.
              </div>
            </div>
          )}

          {/* Nav */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button variant="outline" onClick={back} disabled={step === 0}>
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            {step < REVIEW_INDEX ? (
              <Button onClick={next}>Continue <ArrowRight className="w-4 h-4" /></Button>
            ) : (
              <Button onClick={submit} className="bg-gradient-to-r from-primary to-info">
                Create my workspace <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Features dialog */}
      <Dialog open={featuresOpen} onOpenChange={setFeaturesOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              {(() => { const Icon = PLAN_ICONS[plan]; return <Icon className="w-5 h-5 text-primary" />; })()}
              {PLAN_LABELS[plan]} plan — what's included
            </DialogTitle>
            <DialogDescription className="text-base">
              {PLAN_TAGLINES[plan]}
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg bg-muted/40 px-4 py-3 flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Price</span>
            <span className="text-lg font-bold text-foreground">
              {pricing.monthly === 0 ? "Free" : `₹${pricing.monthly.toLocaleString("en-IN")}`}
              {pricing.monthly > 0 && <span className="text-sm font-normal text-muted-foreground ml-1">{pricing.unit}</span>}
            </span>
          </div>

          <ul className="space-y-2.5 mt-2">
            {PLAN_FEATURES[plan].map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-base">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-1" />
                <span className="text-foreground">{f}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-2">{pricing.trial}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Field = ({ label, required, icon: Icon, children }: { label: string; required?: boolean; icon?: typeof Building2; children: React.ReactNode }) => (
  <div>
    <Label className="text-foreground mb-1.5 flex items-center gap-1.5 text-sm">
      {Icon && <Icon className="w-3.5 h-3.5 text-muted-foreground" />}
      {label} {required && <span className="text-destructive">*</span>}
    </Label>
    {children}
  </div>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center px-4 py-2.5 text-base">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium text-foreground text-right">{value}</span>
  </div>
);

export default OnboardingPage;
