import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { MessageSquare, Github, Twitter, Linkedin, Menu } from "lucide-react";
import A11yToolbar from "./A11yToolbar";

const nav = [
  { to: "/", label: "Home", end: true },
  { to: "/solutions", label: "Solutions" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

const MarketingLayout = () => {
  const [open, setOpen] = useState(false);

  // Embed official UX4G accessibility widget once
  useEffect(() => {
    if (document.getElementById("ux4g-widget-script")) return;
    const s = document.createElement("script");
    s.id = "ux4g-widget-script";
    s.src = "https://ux4g.gov.in/assets/widget/ux4g-widget.js";
    s.async = true;
    s.onerror = () => s.remove();
    document.body.appendChild(s);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header className="sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center shadow-card group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-foreground text-lg">Samparq</div>
              <div className="text-[10px] text-muted-foreground -mt-0.5 tracking-wide uppercase hidden sm:block">Unified Communications</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden sm:inline-flex">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/onboarding" className="hidden sm:inline-flex">
              <Button size="sm" className="bg-gradient-to-r from-primary to-info">Start free</Button>
            </Link>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 mt-6">
                  {nav.map((n) => (
                    <NavLink
                      key={n.to}
                      to={n.to}
                      end={n.end}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `px-3 py-3 rounded-md text-base font-medium transition-colors ${
                          isActive ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted"
                        }`
                      }
                    >
                      {n.label}
                    </NavLink>
                  ))}
                </nav>
                <div className="flex flex-col gap-2 mt-6 pt-6 border-t border-border">
                  <Link to="/login" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full">Sign in</Button>
                  </Link>
                  <Link to="/onboarding" onClick={() => setOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-primary to-info">Start free</Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="flex-1">
        <Outlet />
      </main>

      <A11yToolbar />

      <footer className="border-t border-border bg-muted/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-info flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">Samparq</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              One platform for every conversation — outbound campaigns, inbound support, IVRS, all channels.
            </p>
            <div className="flex gap-3 mt-4">
              <a className="text-muted-foreground hover:text-foreground" href="#"><Twitter className="w-4 h-4" /></a>
              <a className="text-muted-foreground hover:text-foreground" href="#"><Linkedin className="w-4 h-4" /></a>
              <a className="text-muted-foreground hover:text-foreground" href="#"><Github className="w-4 h-4" /></a>
            </div>
          </div>
          <FooterCol title="Product" links={[["Solutions","/solutions"],["Pricing","/pricing"]]} />
          <FooterCol title="Company" links={[["Contact","/contact"],["About","/contact"],["Careers","/contact"]]} />
          <FooterCol title="Legal" links={[["Privacy","#"],["Terms","#"],["Security","#"]]} />
        </div>
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-xs text-muted-foreground flex justify-between">
            <span>© {new Date().getFullYear()} Samparq. All rights reserved.</span>
            <span>Made for modern communication teams.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FooterCol = ({ title, links }: { title: string; links: [string, string][] }) => (
  <div>
    <div className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">{title}</div>
    <ul className="space-y-2">
      {links.map(([label, to]) => (
        <li key={label}>
          <Link to={to} className="text-sm text-muted-foreground hover:text-foreground">{label}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default MarketingLayout;
