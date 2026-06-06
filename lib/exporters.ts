import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import type { ProfileData } from "@/lib/types";

function safeFileName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/(^-|-$)/g, "");
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  anchor.click();

  URL.revokeObjectURL(url);
}

function escapeHtml(value: string) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function resolveAssetUrl(src?: string) {
  if (!src) return "";

  if (src.startsWith("data:")) return src;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;

  return new URL(src, window.location.origin).toString();
}

async function imageToDataUrl(src?: string) {
  if (!src) return "";

  const resolvedSrc = resolveAssetUrl(src);

  if (resolvedSrc.startsWith("data:")) return resolvedSrc;

  try {
    const response = await fetch(resolvedSrc, { cache: "no-store" });
    const blob = await response.blob();

    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => resolve(String(reader.result || ""));
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return "";
  }
}

function renderPhoto(profile: ProfileData, imageDataUrl: string) {
  if (imageDataUrl) {
    return `<img class="resume-photo" src="${imageDataUrl}" alt="${escapeHtml(profile.name)}" />`;
  }

  return `<div class="resume-photo resume-photo-fallback">${escapeHtml(profile.name.charAt(0))}</div>`;
}

function renderList(items: string[]) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderSkillCompact(profile: ProfileData) {
  return profile.skills
    .map(
      (cluster) => `
        <div class="compact-block">
          <h3>${escapeHtml(cluster.title)}</h3>
          <p>${escapeHtml(cluster.items.join(" · "))}</p>
        </div>
      `
    )
    .join("");
}

function renderWorkflow(profile: ProfileData) {
  return profile.researchWorkflow
    .map(
      (cluster) => `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-head">
              <strong>${escapeHtml(cluster.title)}</strong>
              <span>Alur kerja</span>
            </div>
            <p>${escapeHtml(cluster.items.join(" · "))}</p>
          </div>
        </div>
      `
    )
    .join("");
}

function createResumeHtml(profile: ProfileData, imageDataUrl: string) {
  return `
    <main class="resume-page">
      <header class="resume-header">
        <div class="header-left">
          ${renderPhoto(profile, imageDataUrl)}
        </div>

        <div class="header-main">
          <div class="mini-label">Curriculum Vitae</div>
          <h1>${escapeHtml(profile.name)}</h1>
          <div class="headline">${escapeHtml(profile.headline)}</div>
        </div>

        <div class="header-mark">
          <span>A4</span>
          <small>Resume</small>
        </div>
      </header>

      <section class="contact-strip">
        <span>${escapeHtml(profile.phone)}</span>
        <span>${escapeHtml(profile.email)}</span>
        <span>Indonesia</span>
      </section>

      <section class="resume-grid">
        <aside class="left-column">
          <section class="section-block profile-block">
            <h2>Profil</h2>
            <p>${escapeHtml(profile.summary)}</p>
          </section>

          <section class="section-block">
            <h2>Kontak</h2>
            <ul class="plain-list">
              <li><b>Telepon</b><br />${escapeHtml(profile.phone)}</li>
              <li><b>Email</b><br />${escapeHtml(profile.email)}</li>
              <li><b>Portofolio</b><br />3D Interactive Resume</li>
            </ul>
          </section>

          <section class="section-block">
            <h2>Keahlian</h2>
            ${renderSkillCompact(profile)}
          </section>
        </aside>

        <section class="right-column">
          <section class="section-block">
            <h2>Pengalaman Lapangan</h2>

            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-head">
                  <strong>Operasional Restoran / Rumah Makan</strong>
                  <span>Lapangan</span>
                </div>
                <ul>${renderList(profile.fieldExperience)}</ul>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-head">
                  <strong>Eksekusi Teknis Lapangan</strong>
                  <span>Teknis</span>
                </div>
                <p>
                  Terbiasa membaca kebutuhan lapangan, menyiapkan solusi teknis,
                  menguji perangkat, menyesuaikan alur kerja, dan mengeksekusi
                  pekerjaan digital-fisik secara rapi.
                </p>
              </div>
            </div>
          </section>

          <section class="section-block">
            <h2>Ekosistem Riset & Alur Kerja</h2>
            ${renderWorkflow(profile)}
          </section>

          <section class="section-block">
            <h2>Fokus Profesional</h2>
            <div class="focus-grid">
              <span>Hardware IoT</span>
              <span>Home Automation</span>
              <span>3D Visual</span>
              <span>Full-Stack Web</span>
              <span>PCB Workflow</span>
              <span>AI Assisted Research</span>
            </div>
          </section>
        </section>
      </section>

      <footer class="resume-footer">
        <span>CV / Resume Ari Anggara</span>
        <span>Hardware & IoT · 3D Visual · Full-Stack Web</span>
      </footer>
    </main>
  `;
}

function createResumeStyle() {
  return `
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: #ffffff;
        color: #111827;
        font-family: Arial, Helvetica, sans-serif;
      }

      .resume-page {
        width: 794px;
        height: 1123px;
        overflow: hidden;
        padding: 46px;
        background:
          linear-gradient(90deg, rgba(17,24,39,0.032) 1px, transparent 1px),
          linear-gradient(rgba(17,24,39,0.032) 1px, transparent 1px),
          #fbfbfa;
        background-size: 34px 34px;
      }

      .resume-header {
        display: grid;
        grid-template-columns: 142px 1fr 92px;
        gap: 28px;
        align-items: center;
        padding-bottom: 28px;
        border-bottom: 2px solid #111827;
      }

      .header-left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      .resume-photo {
        width: 124px;
        height: 124px;
        display: block;
        object-fit: cover;
        border-radius: 0;
        filter: grayscale(100%);
        border: 2px solid #111827;
        background: #e5e7eb;
      }

      .resume-photo-fallback {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #111827;
        color: #ffffff;
        font-size: 54px;
        font-weight: 900;
      }

      .mini-label {
        display: inline-block;
        margin-bottom: 12px;
        padding-left: 14px;
        border-left: 8px solid #d8cc66;
        color: #111827;
        font-size: 10px;
        font-weight: 900;
        letter-spacing: 0.34em;
        text-transform: uppercase;
      }

      h1 {
        margin: 0;
        max-width: 460px;
        color: #111827;
        font-size: 52px;
        line-height: 0.92;
        font-weight: 500;
        letter-spacing: 0.105em;
        text-transform: uppercase;
      }

      .headline {
        margin-top: 16px;
        max-width: 430px;
        color: #111827;
        font-size: 10px;
        line-height: 1.7;
        font-weight: 900;
        letter-spacing: 0.3em;
        text-transform: uppercase;
      }

      .header-mark {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }

      .header-mark span {
        width: 58px;
        height: 58px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: #111827;
        color: #ffffff;
        font-size: 22px;
        font-weight: 800;
      }

      .header-mark small {
        color: #111827;
        font-size: 8px;
        font-weight: 900;
        letter-spacing: 0.32em;
        text-transform: uppercase;
      }

      .contact-strip {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 18px;
        margin: 24px 0 30px;
      }

      .contact-strip span {
        padding-top: 12px;
        border-top: 1px solid #111827;
        color: #374151;
        font-size: 9px;
        line-height: 1.4;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }

      .resume-grid {
        display: grid;
        grid-template-columns: 0.82fr 1.38fr;
        gap: 44px;
      }

      .section-block {
        margin-bottom: 25px;
      }

      .section-block h2 {
        margin: 0 0 16px;
        color: #111827;
        font-size: 14px;
        font-weight: 900;
        letter-spacing: 0.42em;
        text-transform: uppercase;
      }

      .section-block p,
      .section-block li {
        color: #374151;
        font-size: 10.7px;
        line-height: 1.72;
      }

      .profile-block p {
        margin: 0;
        text-align: justify;
      }

      .plain-list {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .plain-list li {
        margin-bottom: 12px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(17,24,39,0.13);
      }

      .plain-list b {
        color: #111827;
        font-size: 9px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
      }

      .compact-block {
        margin-bottom: 16px;
      }

      .compact-block h3 {
        margin: 0 0 6px;
        color: #111827;
        font-size: 10.3px;
        line-height: 1.45;
        font-weight: 900;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      .compact-block p {
        margin: 0;
      }

      .timeline-item {
        position: relative;
        display: grid;
        grid-template-columns: 18px 1fr;
        gap: 12px;
        margin-bottom: 21px;
      }

      .timeline-item::before {
        content: "";
        position: absolute;
        left: 5px;
        top: 16px;
        bottom: -16px;
        width: 1px;
        background: rgba(17,24,39,0.18);
      }

      .timeline-dot {
        width: 11px;
        height: 11px;
        margin-top: 2px;
        border-radius: 999px;
        background: #111827;
      }

      .timeline-content ul {
        margin: 0;
        padding-left: 16px;
      }

      .timeline-content p {
        margin: 0;
      }

      .timeline-head {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 14px;
        align-items: baseline;
        margin-bottom: 9px;
      }

      .timeline-head strong {
        color: #111827;
        font-size: 10.5px;
        line-height: 1.45;
        font-weight: 900;
        letter-spacing: 0.19em;
        text-transform: uppercase;
      }

      .timeline-head span {
        color: #111827;
        font-size: 8.5px;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        white-space: nowrap;
      }

      .focus-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 9px;
      }

      .focus-grid span {
        display: block;
        border: 1px solid rgba(17,24,39,0.2);
        padding: 10px;
        color: #111827;
        background: rgba(255,255,255,0.62);
        font-size: 8.7px;
        font-weight: 900;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .resume-footer {
        margin-top: 18px;
        padding-top: 14px;
        border-top: 1px solid rgba(17,24,39,0.2);
        display: flex;
        justify-content: space-between;
        gap: 18px;
        color: #6b7280;
        font-size: 8px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }
    </style>
  `;
}

function createHiddenExportNode(html: string) {
  const wrapper = document.createElement("div");

  wrapper.style.position = "fixed";
  wrapper.style.left = "-10000px";
  wrapper.style.top = "0";
  wrapper.style.width = "794px";
  wrapper.innerHTML = `${createResumeStyle()}${html}`;

  document.body.appendChild(wrapper);

  return wrapper;
}

export async function exportProfilePdf(profile: ProfileData) {
  const imageDataUrl = await imageToDataUrl(profile.profileImage);
  const resumeHtml = createResumeHtml(profile, imageDataUrl);
  const wrapper = createHiddenExportNode(resumeHtml);
  const target = wrapper.querySelector(".resume-page") as HTMLElement;

  const canvas = await html2canvas(target, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    width: 794,
    height: 1123,
    windowWidth: 794,
    windowHeight: 1123
  });

  const image = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4"
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  pdf.addImage(image, "PNG", 0, 0, pageWidth, pageHeight);
  pdf.save(`${safeFileName(profile.name)}-preview-cv-resume.pdf`);

  wrapper.remove();
}

export async function exportProfileWord(profile: ProfileData) {
  const imageDataUrl = await imageToDataUrl(profile.profileImage);

  const documentHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        ${createResumeStyle()}
      </head>
      <body>
        ${createResumeHtml(profile, imageDataUrl)}
      </body>
    </html>
  `;

  const blob = new Blob(["\ufeff", documentHtml], {
    type: "application/msword;charset=utf-8"
  });

  downloadBlob(blob, `${safeFileName(profile.name)}-preview-cv-resume.doc`);
}

export function exportProfileExcel(profile: ProfileData) {
  const rows = [
    ["Bagian", "Judul", "Isi"],
    ["Kontak", "Nama", profile.name],
    ["Kontak", "Telepon", profile.phone],
    ["Kontak", "Email", profile.email],
    ["Profil", "Headline", profile.headline],
    ["Profil", "Ringkasan", profile.summary],
    ...profile.skills.flatMap((cluster) =>
      cluster.items.map((item) => ["Keahlian", cluster.title, item])
    ),
    ...profile.researchWorkflow.flatMap((cluster) =>
      cluster.items.map((item) => ["Ekosistem Riset", cluster.title, item])
    ),
    ...profile.fieldExperience.map((item) => [
      "Pengalaman Lapangan",
      "Operasional / Teknis",
      item
    ])
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();

  worksheet["!cols"] = [{ wch: 24 }, { wch: 34 }, { wch: 76 }];

  XLSX.utils.book_append_sheet(workbook, worksheet, "Preview CV Resume");
  XLSX.writeFile(workbook, `${safeFileName(profile.name)}-preview-cv-resume.xls`);
}
