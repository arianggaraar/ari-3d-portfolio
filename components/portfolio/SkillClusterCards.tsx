"use client";

import { motion } from "framer-motion";
import { Cpu, Layers3, ServerCog } from "lucide-react";
import { useProfile } from "@/components/providers/ProfileProvider";

const icons = [Cpu, Layers3, ServerCog];

export function SkillClusterCards() {
  const { profile } = useProfile();

  return (
    <section id="capabilities" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.38em] text-cyan-700 dark:text-cyan-300">Capabilities Matrix</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-slate-950 dark:text-white sm:text-5xl">Kluster keahlian utama</h2>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {profile.skills.map((cluster, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.article
              key={cluster.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.08 }}
              whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
              className="hud-card group rounded-[2rem] p-5 sm:p-6"
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-cyan-200 shadow-lg shadow-cyan-500/10 dark:bg-cyan-300 dark:text-slate-950">
                    <Icon size={24} />
                  </div>
                  <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-200">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-7 min-h-16 text-2xl font-black tracking-[-0.04em] text-slate-950 dark:text-white">{cluster.title}</h3>

                <div className="mt-6 flex flex-wrap gap-2">
                  {cluster.items.map((item) => (
                    <span key={item} className="rounded-full border border-slate-900/10 bg-white/55 px-3 py-1.5 text-xs font-bold text-slate-700 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/45 dark:text-slate-200">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-7 h-2 overflow-hidden rounded-full bg-slate-900/10 dark:bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${78 + index * 7}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 + index * 0.08 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-300"
                  />
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
