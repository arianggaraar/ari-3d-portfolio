"use client";

import { FileBox, ImagePlus, RotateCcw, UploadCloud } from "lucide-react";
import { useEffect, useRef } from "react";
import { useProfile } from "@/components/providers/ProfileProvider";
import { fileToDataUrl } from "@/lib/file";

export function LiveEditorPanel() {
  const {
    profile,
    updateProfile,
    setProfileImage,
    setModelUrl,
    updateSkillText,
    updateFieldExperienceText,
    resetProfile
  } = useProfile();
  const modelObjectUrl = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (modelObjectUrl.current) URL.revokeObjectURL(modelObjectUrl.current);
    };
  }, []);

  async function handleProfileImageUpload(file?: File) {
    if (!file) return;
    if (!/(png|jpeg|jpg)$/i.test(file.type)) {
      window.alert("Gunakan gambar JPG atau PNG.");
      return;
    }
    const dataUrl = await fileToDataUrl(file);
    setProfileImage(dataUrl);
  }

  function handleModelUpload(file?: File) {
    if (!file) return;
    if (!/\.(glb|gltf)$/i.test(file.name)) {
      window.alert("Gunakan file model 3D .glb atau .gltf.");
      return;
    }

    // Dynamic upload GLB/GLTF:
    // 1. File lokal dibuat menjadi blob URL sementara.
    // 2. Blob URL dikirim ke state global.
    // 3. Scene Three.js memuat ulang model melalui useGLTF(url).
    if (modelObjectUrl.current) URL.revokeObjectURL(modelObjectUrl.current);
    const objectUrl = URL.createObjectURL(file);
    modelObjectUrl.current = objectUrl;
    setModelUrl(objectUrl, file.name);
  }

  return (
    <section id="editor" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="hud-card rounded-[2rem] p-5 sm:p-8">
        <div className="flex flex-col gap-3 border-b border-slate-200/70 pb-6 dark:border-slate-800 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-700 dark:text-cyan-300">Live Editor</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">Kustomisasi data, foto, dan model 3D</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Semua field di bawah terhubung ke state global dan memperbarui UI secara real-time, termasuk preview foto dan model 3D di background.
            </p>
          </div>
          <button type="button" onClick={resetProfile} className="button-soft gap-2">
            <RotateCcw size={16} /> Reset Default
          </button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="grid gap-4">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Nama</span>
              <input className="input-field" value={profile.name} onChange={(e) => updateProfile({ name: e.target.value })} />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Telepon</span>
                <input className="input-field" value={profile.phone} onChange={(e) => updateProfile({ phone: e.target.value })} />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Email</span>
                <input className="input-field" type="email" value={profile.email} onChange={(e) => updateProfile({ email: e.target.value })} />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Headline</span>
              <input className="input-field" value={profile.headline} onChange={(e) => updateProfile({ headline: e.target.value })} />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Ringkasan Profil</span>
              <textarea className="input-field min-h-32 resize-y" value={profile.summary} onChange={(e) => updateProfile({ summary: e.target.value })} />
            </label>
          </div>

          <div className="grid gap-4">
            {profile.skills.map((cluster) => (
              <label key={cluster.id} className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">{cluster.title}</span>
                <textarea
                  className="input-field min-h-20 resize-y"
                  value={cluster.items.join(", ")}
                  onChange={(e) => updateSkillText("skills", cluster.id, e.target.value)}
                />
              </label>
            ))}

            {profile.researchWorkflow.map((cluster) => (
              <label key={cluster.id} className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">{cluster.title}</span>
                <textarea
                  className="input-field min-h-20 resize-y"
                  value={cluster.items.join(", ")}
                  onChange={(e) => updateSkillText("researchWorkflow", cluster.id, e.target.value)}
                />
              </label>
            ))}

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Pengalaman Lapangan, satu baris per item</span>
              <textarea
                className="input-field min-h-28 resize-y"
                value={profile.fieldExperience.join("\n")}
                onChange={(e) => updateFieldExperienceText(e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <label className="glass-card flex cursor-pointer flex-col gap-3 rounded-3xl p-5 transition hover:-translate-y-1">
            <span className="flex items-center gap-3 font-black text-slate-950 dark:text-white">
              <ImagePlus size={20} /> Upload Gambar Profil
            </span>
            <span className="text-sm leading-6 text-slate-600 dark:text-slate-300">Mendukung JPG/PNG dengan preview instan.</span>
            <input className="hidden" type="file" accept="image/png,image/jpeg" onChange={(e) => handleProfileImageUpload(e.target.files?.[0])} />
            <span className="button-soft w-fit gap-2"><UploadCloud size={16} /> Pilih Gambar</span>
          </label>

          <label className="glass-card flex cursor-pointer flex-col gap-3 rounded-3xl p-5 transition hover:-translate-y-1">
            <span className="flex items-center gap-3 font-black text-slate-950 dark:text-white">
              <FileBox size={20} /> Upload Model 3D Kustom
            </span>
            <span className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              Mendukung GLB/GLTF. Aktif: {profile.modelFileName || "default mesh"}
            </span>
            <input className="hidden" type="file" accept=".glb,.gltf,model/gltf-binary,model/gltf+json" onChange={(e) => handleModelUpload(e.target.files?.[0])} />
            <span className="button-soft w-fit gap-2"><UploadCloud size={16} /> Pilih Model 3D</span>
          </label>
        </div>
      </div>
    </section>
  );
}
