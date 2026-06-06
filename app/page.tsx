import { ExportPanel } from "@/components/export/ExportPanel";
import { TopNav } from "@/components/layout/TopNav";
import { ProfileHero } from "@/components/portfolio/ProfileHero";
import { SkillClusterCards } from "@/components/portfolio/SkillClusterCards";
import { WorkflowSection } from "@/components/portfolio/WorkflowSection";

export default function HomePage() {
  return (
    <>
      <TopNav />
      <ProfileHero />
      <SkillClusterCards />
      <WorkflowSection />
      <ExportPanel />

      <footer className="mx-auto w-full max-w-7xl px-4 pb-10 pt-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-slate-500 sm:px-6 lg:px-8">
        AriOS Portfolio Engine · Next.js · React Three Fiber · Drei · Framer Motion
      </footer>
    </>
  );
}
