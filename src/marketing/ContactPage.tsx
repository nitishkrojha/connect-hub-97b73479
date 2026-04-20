import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent", description: "Our team will reach out within 1 business day." });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-wide font-semibold text-primary">Contact</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mt-2">Talk to our team</h1>
        <p className="text-muted-foreground mt-4">Questions about pricing, integrations, or compliance? We'd love to hear from you.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-12">
        <Card className="p-6 lg:col-span-2">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" required placeholder="Priya Sharma" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">Work email</Label>
                <Input id="email" type="email" required placeholder="priya@company.com" className="mt-1.5" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Acme Inc." className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+91 99999 99999" className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label htmlFor="msg">How can we help?</Label>
              <Textarea id="msg" required rows={5} placeholder="Tell us about your use case…" className="mt-1.5" />
            </div>
            <Button type="submit" size="lg" className="bg-gradient-to-r from-primary to-info">Send message</Button>
          </form>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground">Email</div>
                <div className="text-sm text-muted-foreground">hello@samparq.io</div>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="font-semibold text-foreground">Sales</div>
                <div className="text-sm text-muted-foreground">+91 80 4567 8900</div>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-info" />
              </div>
              <div>
                <div className="font-semibold text-foreground">Office</div>
                <div className="text-sm text-muted-foreground">Bengaluru · Mumbai · Delhi</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
