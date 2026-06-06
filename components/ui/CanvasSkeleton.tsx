export function CanvasSkeleton() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="absolute right-[8%] top-[12%] h-72 w-72 animate-pulse rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute left-[8%] top-[55%] h-64 w-64 animate-pulse rounded-full bg-blue-500/15 blur-3xl" />
      <div className="absolute inset-0 bg-noise-grid bg-[length:28px_28px] opacity-40" />
    </div>
  );
}
