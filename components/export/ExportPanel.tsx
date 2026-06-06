"use client";

import { motion } from "framer-motion";
import { Download, FileSpreadsheet, FileText, ScanSearch } from "lucide-react";
import { useState } from "react";
import { useProfile } from "@/components/providers/ProfileProvider";
import {
  exportProfileExcel,
  exportProfilePdf,
  exportProfileWord
} from "@/lib/exporters";

export function ExportPanel() {
  const { profile } = useProfile();
  const [busy, setBusy] = useState<"pdf" | "word" | "excel" | null>(null);

  const runExport = async (type: "pdf" | "word" | "excel") => {
    try {
      setBusy(type);

      if (type === "pdf") {
        await exportProfilePdf(profile);
      }

      if (type === "word") {
        await exportProfileWord(profile);
      }

      if (type === "excel") {
        exportProfileExcel(profile);
      }
    } finally {
      setBusy(null);
    }
  };

  return (
    <section id="export" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="glass-card overflow-hidden rounded-[2rem] p-5 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-200">
              <ScanSearch size={14} />
              Preview CV/Resume
            </div>

            <h2 className="mt-5 max-w-2xl text-4xl font-black tracking-[-0.055em] text-slate-950 dark:text-white sm:text-5xl">
              Lihat alur CV/Resume profesional sebelum digunakan.
            </h2>

            <div className="mt-6 grid gap-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <p>
                Alurnya dimulai dari data profil utama, foto, kontak, ringkasan kemampuan,
                pengalaman lapangan, lalu ekosistem riset dan workflow kerja.
              </p>
              <p>
                PDF dipakai untuk tampilan final siap cetak, Word dipakai untuk versi yang bisa
                diedit ulang di Office, dan Excel dipakai sebagai data mentah yang rapi.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => runExport("pdf")}
              disabled={busy !== null}
              className="group rounded-[1.75rem] border border-cyan-400/20 bg-slate-950 p-5 text-left text-white shadow-[0_24px_60px_rgba(2,6,23,0.28)] transition hover:-translate-y-1 hover:border-cyan-300 disabled:cursor-wait disabled:opacity-70"
            >
              <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950">
                <Download size={20} />
              </div>
              <p className="text-lg font-black">Preview PDF</p>
              <p className="mt-2 text-xs leading-6 text-slate-300">
                Layout A4 final dengan foto di samping kiri nama.
              </p>
              <p className="mt-5 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">
                {busy === "pdf" ? "Menyiapkan..." : "Download PDF"}
              </p>
            </button>

            <button
              type="button"
              onClick={() => runExport("word")}
              disabled={busy !== null}
              className="group rounded-[1.75rem] border border-slate-900/10 bg-white/70 p-5 text-left shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-300 disabled:cursor-wait disabled:opacity-70 dark:border-white/10 dark:bg-slate-950/55"
            >
              <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/12 text-cyan-700 dark:text-cyan-200">
                <FileText size={20} />
              </div>
              <p className="text-lg font-black text-slate-950 dark:text-white">Preview Word</p>
              <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-300">
                Versi Office untuk disesuaikan lagi jika dibutuhkan.
              </p>
              <p className="mt-5 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-200">
                {busy === "word" ? "Menyiapkan..." : "Download DOC"}
              </p>
            </button>

            <button
              type="button"
              onClick={() => runExport("excel")}
              disabled={busy !== null}
              className="group rounded-[1.75rem] border border-slate-900/10 bg-white/70 p-5 text-left shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-300 disabled:cursor-wait disabled:opacity-70 dark:border-white/10 dark:bg-slate-950/55"
            >
              <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/12 text-cyan-700 dark:text-cyan-200">
                <FileSpreadsheet size={20} />
              </div>
              <p className="text-lg font-black text-slate-950 dark:text-white">Data Excel</p>
              <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-300">
                Data profil, keahlian, workflow, dan pengalaman.
              </p>
              <p className="mt-5 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-200">
                {busy === "excel" ? "Menyiapkan..." : "Download XLS"}
              </p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
