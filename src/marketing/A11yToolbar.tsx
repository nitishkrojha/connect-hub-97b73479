import { useEffect, useState } from "react";
import { Type, Contrast, Eye, Link2, RotateCcw, Accessibility } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * GIGW / STQC / UX4G-aligned accessibility toolbar.
 * Provides: skip to main, font size (T- / T / T+), high-contrast,
 * grayscale, underline links, reset. Persists choices in localStorage.
 */
const STORAGE_KEY = "samparq-a11y";

type Settings = {
  fontScale: number;          // 0.875 | 1 | 1.125 | 1.25
  contrast: "normal" | "high";
  grayscale: boolean;
  underlineLinks: boolean;
};

const DEFAULTS: Settings = {
  fontScale: 1,
  contrast: "normal",
  grayscale: false,
  underlineLinks: false,
};

const apply = (s: Settings) => {
  const root = document.documentElement;
  root.style.fontSize = `${16 * s.fontScale}px`;
  root.classList.toggle("a11y-high-contrast", s.contrast === "high");
  root.classList.toggle("a11y-grayscale", s.grayscale);
  root.classList.toggle("a11y-underline-links", s.underlineLinks);
};

const A11yToolbar = () => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = { ...DEFAULTS, ...JSON.parse(raw) } as Settings;
        setSettings(parsed);
        apply(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const update = (patch: Partial<Settings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const reset = () => {
    setSettings(DEFAULTS);
    apply(DEFAULTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Accessibility Tools"
        title="Accessibility Tools"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed right-3 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full bg-[#0b5394] text-white shadow-card-hover flex items-center justify-center hover:bg-[#0a4680] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ring-2 ring-white/70"
      >
        <Accessibility className="w-7 h-7" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Accessibility settings"
          className="fixed right-14 top-1/2 -translate-y-1/2 z-50 w-72 rounded-lg border border-border bg-card shadow-card-hover p-4 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="font-semibold text-sm text-foreground">Accessibility</div>
            <button
              onClick={reset}
              className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
              aria-label="Reset accessibility settings"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div>
            <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5" /> Text size
            </div>
            <div className="grid grid-cols-4 gap-1.5" role="group" aria-label="Text size">
              {[
                { v: 0.875, l: "T-" },
                { v: 1, l: "T" },
                { v: 1.125, l: "T+" },
                { v: 1.25, l: "T++" },
              ].map((opt) => (
                <button
                  key={opt.l}
                  onClick={() => update({ fontScale: opt.v })}
                  aria-pressed={settings.fontScale === opt.v}
                  className={`h-9 rounded-md text-sm font-semibold border transition-colors ${
                    settings.fontScale === opt.v
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:bg-muted"
                  }`}
                >
                  {opt.l}
                </button>
              ))}
            </div>
          </div>

          <ToggleRow
            icon={<Contrast className="w-3.5 h-3.5" />}
            label="High contrast"
            pressed={settings.contrast === "high"}
            onClick={() =>
              update({ contrast: settings.contrast === "high" ? "normal" : "high" })
            }
          />
          <ToggleRow
            icon={<Eye className="w-3.5 h-3.5" />}
            label="Grayscale"
            pressed={settings.grayscale}
            onClick={() => update({ grayscale: !settings.grayscale })}
          />
          <ToggleRow
            icon={<Link2 className="w-3.5 h-3.5" />}
            label="Underline links"
            pressed={settings.underlineLinks}
            onClick={() => update({ underlineLinks: !settings.underlineLinks })}
          />

          <p className="text-[10px] text-muted-foreground leading-snug pt-1 border-t border-border">
            Aligned with GIGW 3.0 / STQC and UX4G accessibility guidelines.
          </p>
        </div>
      )}
    </>
  );
};

const ToggleRow = ({
  icon,
  label,
  pressed,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  pressed: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    aria-pressed={pressed}
    className="w-full flex items-center justify-between px-3 py-2 rounded-md border border-border hover:bg-muted transition-colors"
  >
    <span className="flex items-center gap-2 text-sm text-foreground">
      {icon} {label}
    </span>
    <span
      className={`w-9 h-5 rounded-full relative transition-colors ${
        pressed ? "bg-primary" : "bg-muted-foreground/30"
      }`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
          pressed ? "left-[18px]" : "left-0.5"
        }`}
      />
    </span>
  </button>
);

export default A11yToolbar;
