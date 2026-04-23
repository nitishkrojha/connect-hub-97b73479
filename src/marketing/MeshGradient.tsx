const MeshGradient = () => (
  <>
    <div className="absolute inset-0 -z-10 mesh-bg" />
    <div className="absolute inset-0 -z-10 grid-overlay opacity-50" />
    <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-primary/15 blur-3xl -z-10 animate-float-slow" />
    <div className="absolute top-40 -right-32 w-[420px] h-[420px] rounded-full bg-info/15 blur-3xl -z-10 animate-float" />
    <div className="absolute bottom-0 left-1/3 w-[360px] h-[360px] rounded-full bg-success/15 blur-3xl -z-10 animate-float-slow" />
  </>
);

export default MeshGradient;
