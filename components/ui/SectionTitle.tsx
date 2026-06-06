import type { ReactNode } from "react";

export function SectionTitle({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-300">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl">{title}</h2>
      {children ? <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">{children}</p> : null}
    </div>
  );
}
