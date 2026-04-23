const logos = [
  "Acme Corp", "Northwind", "Globex", "Initech", "Umbrella", "Wayne Co.",
  "Stark Ind.", "Hooli", "Pied Piper", "Soylent", "Vandelay", "Massive Dyn.",
];

const LogoMarquee = () => (
  <div className="overflow-hidden relative" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
    <div className="flex gap-12 animate-marquee whitespace-nowrap py-4">
      {[...logos, ...logos].map((l, i) => (
        <span key={i} className="text-xl font-bold text-muted-foreground/70 tracking-tight">
          {l}
        </span>
      ))}
    </div>
  </div>
);

export default LogoMarquee;
