"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Factory, FolderGit2, MapPinned } from "lucide-react";
import { useProfile } from "@/components/providers/ProfileProvider";

const workflowIcons = [BrainCircuit, FolderGit2, Factory];

export function WorkflowSection() {
  const { profile } = useProfile();

  return (
    <section id="workflow" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="hud-card rounded-[2rem] p-6 sm:p-8"
        >
          <div className="relative z-10">
            <p className="text-xs font-black uppercase tracking-[0.36em] text-cyan-700 dark:text-cyan-300">Research Pipeline</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-slate-950 dark:text-white">Alur kerja riset, aset, dan produksi</h2>
            <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Sistem portofolio ini dirancang untuk menampilkan cara kerja nyata: riset AI, pengumpulan aset/model, validasi datasheet, hingga manufaktur PCB dan implementasi lapangan.
            </p>

            <div className="mt-8 rounded-[1.6rem] border border-cyan-400/20 bg-cyan-400/10 p-5">
              <div className="flex items-center gap-3 font-black text-slate-950 dark:text-white">
                <MapPinned className="text-cyan-600 dark:text-cyan-300" size={20} /> Pengalaman Lapangan
              </div>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {profile.fieldExperience.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.9)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4">
          {profile.researchWorkflow.map((cluster, index) => {
            const Icon = workflowIcons[index % workflowIcons.length];
            return (
              <motion.article
                key={cluster.id}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.08 }}
                className="glass-card rounded-[1.75rem] p-5"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-700 dark:text-cyan-200">
                      <Icon size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Node {index + 1}</p>
                      <h3 className="text-xl font-black tracking-[-0.03em] text-slate-950 dark:text-white">{cluster.title}</h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    {cluster.items.map((item) => (
                      <span key={item} className="rounded-full bg-slate-950 px-3 py-1.5 text-xs font-bold text-white dark:bg-white dark:text-slate-950">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
