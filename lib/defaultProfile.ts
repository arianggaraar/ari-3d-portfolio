import type { ProfileData } from "@/lib/types";

export const DEFAULT_MODEL_URL = "/models/model-web.glb";

export const defaultProfile: ProfileData = {
  name: "Ari Anggara",
  phone: "087847386701",
  email: "arianggaraar@gmail.com",
  headline: "Hardware & IoT Engineer • 3D Visual Designer • Full-Stack Web Developer",
  summary:
    "Profil multidisiplin yang menggabungkan rekayasa hardware, otomasi IoT, visualisasi 3D, dan pengembangan web full-stack untuk membangun sistem digital-fisik yang fungsional, estetis, dan siap diimplementasikan di lapangan.",
  profileImage: "/images/me.png",
  modelUrl: DEFAULT_MODEL_URL,
  modelFileName: "model-web.glb",
  skills: [
    {
      id: "hardware-iot",
      title: "Hardware & IoT Engineering",
      items: ["EasyEDA", "Proteus", "Tinkercad", "Eagle", "Wokwi", "WLED", "Home Automation"]
    },
    {
      id: "visual-3d",
      title: "3D Modeling & Visual Design",
      items: ["SketchUp", "Figma", "Canva", "PicsArt", "Grafis", "Fotografi"]
    },
    {
      id: "fullstack",
      title: "Full-Stack Web Development",
      items: ["Frontend", "Backend", "React", "Next.js", "API Integration", "Responsive UI"]
    }
  ],
  researchWorkflow: [
    {
      id: "ai-research",
      title: "Integrasi AI",
      items: ["ChatGPT", "Gemini", "Claude", "DeepSeek"]
    },
    {
      id: "assets-repo",
      title: "Repositori & Aset",
      items: ["GitHub", "Sketchfab", "3D Warehouse", "Pinterest", "GrabCad"]
    },
    {
      id: "pcb-manufacturing",
      title: "Manufaktur PCB & Datasheet",
      items: ["JLCPCB", "PCBWay", "PCBasic", "Alldatasheet"]
    }
  ],
  fieldExperience: [
    "Helper / Waiter — Rumah Makan Ayam Loncat, Cikarang — 2022, selama 6 bulan. Bertugas membantu operasional rumah makan, melayani pelanggan, membantu penyajian pesanan, menjaga kebersihan area kerja, serta mendukung koordinasi antara area pelayanan dan dapur.",
    "Pekerja Lapangan / Kuli Proyek — Pengalaman ±5 tahun. Terlibat dalam pekerjaan teknis lapangan, pengangkutan material, persiapan area kerja, pekerjaan konstruksi dasar, bongkar-pasang kebutuhan proyek, serta mendukung penyelesaian pekerjaan sesuai arahan mandor atau tim teknis.",
    "Terbiasa bekerja dalam ritme lapangan yang membutuhkan kedisiplinan, tenaga fisik, ketelitian, kerja sama tim, dan kesiapan mengikuti instruksi kerja.",
    "Memiliki pengalaman langsung dalam lingkungan kerja operasional restoran dan pekerjaan proyek/lapangan."
  ]
};
