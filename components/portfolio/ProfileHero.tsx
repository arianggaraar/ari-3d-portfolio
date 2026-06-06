"use client";

import { motion } from "framer-motion";
import {
  ArrowDownRight,
  CircuitBoard,
  Mail,
  Phone,
  Sparkles
} from "lucide-react";
import { ModelStage } from "@/components/canvas/ModelStage";
import { useProfile } from "@/components/providers/ProfileProvider";

const quickSignals = [
  { label: "Core Stack", value: "IoT + 3D + Web" },
  { label: "Mode", value: "Live Editable" },
  { label: "Output", value: "PDF / DOC / XLS" }
];

export function ProfileHero() {
  const { profile } = useProfile();

  return (
    <section
      id="home"
      className="relative mx-auto w-full max-w-7xl px-4 pb-5 pt-[5.7rem] sm:px-6 lg:h-screen lg:overflow-hidden lg:px-8"
    >
      <div className="grid gap-4 lg:h-[calc(100vh-7rem)] xl:grid-cols-[minmax(0,0.47fr)_minmax(0,0.53fr)]">
        {/* LEFT AREA */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid min-w-0 gap-3 lg:h-full lg:min-h-0 lg:grid-rows-[46px_minmax(0,1fr)]"
        >
          {/* JUDUL HALAMAN */}
          <div className="flex min-h-[46px] items-center justify-center rounded-[1.45rem] border border-white/55 bg-white/70 px-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-cyan-300/10 dark:bg-slate-950/55">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-200 sm:text-[11px]">
              <Sparkles size={14} />
              3D Interactive Portfolio System
            </div>
          </div>

          {/* PROFIL */}
          <div className="hud-card flex min-h-0 items-start overflow-hidden rounded-[2rem] p-5 sm:p-6 xl:p-7">
            <div className="relative z-10 w-full">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[1.45rem] border border-cyan-300/25 bg-slate-950 shadow-[0_20px_50px_rgba(8,145,178,0.16)] xl:h-24 xl:w-24">
                  {profile.profileImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profile.profileImage}
                      alt={profile.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.45),transparent_38%),linear-gradient(135deg,#0f172a,#020617)] text-3xl font-black text-cyan-100 xl:text-4xl">
                      {profile.name.charAt(0)}
                    </div>
                  )}

                  <span className="absolute bottom-2 right-2 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.95)]" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-200 xl:text-[11px]">
                    <CircuitBoard size={14} />
                    Hardware & IoT
                    <span className="text-slate-400">/</span>
                    3D Visual
                    <span className="text-slate-400">/</span>
                    Full-Stack
                  </p>

                  <h1 className="mt-3 max-w-full break-words text-[clamp(2.35rem,4.1vw,4.85rem)] font-black leading-[0.96] tracking-[-0.055em] text-gradient-cyber">
                    {profile.name}
                  </h1>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-700 dark:text-slate-300 sm:text-base xl:text-[1.02rem] xl:leading-8">
                {profile.summary}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 2xl:grid-cols-3">
                {quickSignals.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-slate-900/10 bg-white/50 p-3 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/45"
                  >
                    <p className="text-lg font-black tracking-[-0.03em] text-slate-950 dark:text-white xl:text-xl">
                      {item.value}
                    </p>
                    <p className="mt-1 text-[9px] font-black uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400 xl:text-[10px]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={`tel:${profile.phone}`} className="button-primary gap-2">
                  <Phone size={16} />
                  {profile.phone}
                </a>

                <a href={`mailto:${profile.email}`} className="button-soft gap-2">
                  <Mail size={16} />
                  {profile.email}
                </a>

                <a href="#capabilities" className="button-ghost gap-2">
                  <ArrowDownRight size={16} />
                  Explore Stack
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT AREA */}
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
          className="cyber-stage-shell rounded-[2rem] p-4 lg:h-full lg:min-h-0 lg:overflow-hidden"
        >
          <div className="grid h-full min-h-0 gap-4 lg:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)]">
            {/* 3D MODEL */}
            <div className="min-h-[390px] overflow-hidden rounded-[1.7rem] border border-white/35 bg-slate-950 shadow-[0_24px_70px_rgba(2,6,23,0.36)] lg:h-full lg:min-h-0">
              <ModelStage />
            </div>

            {/* MOOD 1 + MOOD 2 */}
            <div className="grid min-h-0 gap-4 lg:h-full lg:grid-rows-2">
              <div className="group relative min-h-[190px] overflow-hidden rounded-[1.7rem] border border-white/35 bg-slate-950 shadow-[0_24px_60px_rgba(2,6,23,0.28)] lg:min-h-0">
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: "url('/images/bg-robot-arms.jpg')"
                  }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,0.78),rgba(2,6,23,0.05)_58%,rgba(2,6,23,0.14))]" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.26em] text-cyan-200">
                    Mood 01
                  </p>
                  <h3 className="mt-2 text-lg font-black tracking-[-0.03em] text-white">
                    Robotic Fabrication
                  </h3>
                </div>
              </div>

              <div className="group relative min-h-[190px] overflow-hidden rounded-[1.7rem] border border-white/35 bg-slate-950 shadow-[0_24px_60px_rgba(2,6,23,0.28)] lg:min-h-0">
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: "url('/images/bg-data-wave.png')"
                  }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,0.76),rgba(2,6,23,0.05)_58%,rgba(2,6,23,0.14))]" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.26em] text-cyan-200">
                    Mood 02
                  </p>
                  <h3 className="mt-2 text-lg font-black tracking-[-0.03em] text-white">
                    Connected Data Layer
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}