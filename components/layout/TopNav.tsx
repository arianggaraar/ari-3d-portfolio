"use client";

import { Boxes, Cpu, Download, PenLine, Radar } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navItems = [
  { href: "#capabilities", label: "Capabilities", icon: Cpu },
  { href: "#workflow", label: "Workflow", icon: Radar },
  { href: "#export", label: "Export", icon: Download }
];

export function TopNav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-50 px-3 py-3 sm:px-6"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border border-white/45 bg-white/62 px-3 py-2 shadow-2xl shadow-slate-950/5 backdrop-blur-2xl dark:border-cyan-300/10 dark:bg-slate-950/58 dark:shadow-black/30">
        <a
          href="#home"
          className="flex items-center gap-2 rounded-full bg-slate-950 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-white shadow-lg shadow-cyan-500/10 dark:bg-cyan-300 dark:text-slate-950"
        >
          <Boxes size={16} /> AriOS 3D
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-950 hover:text-white dark:text-slate-300 dark:hover:bg-cyan-300 dark:hover:text-slate-950"
              >
                <Icon size={14} /> {item.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#export"
            className="hidden rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-700 transition hover:bg-cyan-400/20 dark:text-cyan-200 sm:inline-flex"
          >
            Export CV
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
