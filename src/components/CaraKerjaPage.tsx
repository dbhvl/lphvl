'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sun, Moon, Menu, X, ArrowRight, Check } from 'lucide-react';

/* /cara-kerja — arsitektur meniru components/HargaPage.tsx. Copy tiga langkah
   disalin persis dari section #cara-kerja di LandingPage.tsx. */
const WHATSAPP_URL =
  'https://wa.me/6287783974066?text=Halo%20Hai%20Velyu%2C%20saya%20punya%20pertanyaan%20tentang%20platform';
const THEME_KEY = 'hvl-theme';
const SERIF = { fontFamily: 'var(--font-playfair), Georgia, serif' };

function HexMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`inline-block ${className}`}>
      <path d="M12 2.5 20.2 7.25v9.5L12 21.5 3.8 16.75v-9.5L12 2.5Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const L = {
  page: 'bg-white text-[#1B2A4A]', soft: 'bg-[#F6F8FB]',
  card: 'bg-white border-[#E2E8F0]', line: 'border-[#E2E8F0]',
  muted: 'text-[#5B6B84]', nav: 'bg-white/90 backdrop-blur-md border-[#E2E8F0]',
  btnPrimary: 'bg-[#1B2A4A] text-white hover:bg-[#24365C]',
};
const D = {
  page: 'bg-[#101B30] text-[#E8EEF6]', soft: 'bg-[#142238]',
  card: 'bg-[#182641] border-[#27395C]', line: 'border-[#27395C]',
  muted: 'text-[#9DB0CC]', nav: 'bg-[#101B30]/90 backdrop-blur-md border-[#27395C]',
  btnPrimary: 'bg-white text-[#1B2A4A] hover:bg-[#E8EEF6]',
};

/* Copy tiga langkah — persis dari section #cara-kerja di LandingPage.tsx. */
const STEPS = [
  { n: '01', t: 'Daftar gratis', d: 'Buat akun, lengkapi profil studio Anda. Gratis — tanpa kartu kredit.', ind: '' },
  { n: '02', t: 'Upload & susun', d: 'Masukkan foto terbaik ke 3 section kurasi. Kapasitas tiap section terjaga — album tetap kurasi, bukan gudang.', ind: 'md:pl-8' },
  { n: '03', t: 'Publish & bagikan', d: '1\u00A0Token mempublish album. Bagikan link — atau cetak QR souvenir untuk kado klien.', ind: 'md:pl-16' },
];

/* Struktur section album — salinan ALBUM_SECTIONS di LandingPage.tsx (15+20+15 = 50). */
const STRUKTUR = [
  { title: 'Section 1 · Akad', count: '15 foto' },
  { title: 'Section 2 · Resepsi', count: '20 foto' },
  { title: 'Section 3 · Portret', count: '15 foto' },
];

/* Masa berlaku album — versi ringkas; fakta sama dengan LIFECYCLE di HargaPage.tsx. */
const LIFECYCLE_SINGKAT = [
  'Hari 0–7 — full version tanpa watermark',
  'Hari ke-7 — watermark muncul',
  'Hari ke-30 — album diarsipkan',
  'Hari ke-60 — album dihapus permanen',
];

export function CaraKerjaPage() {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const T = dark ? D : L;
  const textStrong = dark ? 'text-[#E8EEF6]' : 'text-[#1B2A4A]';
  const accentHover = dark ? 'hover:text-[#2BB3D8]' : 'hover:text-[#0E7490]';

  useEffect(() => {
    try {
      const s = localStorage.getItem(THEME_KEY);
      setDark(s ? s === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);
    } catch {
      /* mode privat — tetap terang */
    }
  }, []);
  const toggleTheme = () => {
    const n = !dark;
    setDark(n);
    try { localStorage.setItem(THEME_KEY, n ? 'dark' : 'light'); } catch { /* abaikan */ }
  };

  return (
    <div className={`min-h-screen ${T.page}`} style={{ fontFamily: 'var(--font-jakarta), system-ui, sans-serif' }}>
      {/* HEADER (mengikuti HargaPage) */}
      <header className={`sticky top-0 z-40 border-b ${T.nav}`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="/" className="flex items-center gap-2.5">
            <Image src="/images/logo.webp" alt="Logo Hai Velyu Studio" width={32} height={32} className="h-8 w-8" />
            <span className="text-[15px] font-bold tracking-tight">Hai Velyu Studio</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm md:flex">
            <a href="/cara-kerja" className={`font-semibold ${textStrong}`}>Cara Kerja</a>
            <a href="/price" className={`${T.muted} ${accentHover}`}>Harga</a>
            <a href="/#tentang" className={`${T.muted} ${accentHover}`}>Tentang</a>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} aria-label="Ganti tema terang/gelap" className={`rounded-lg border ${T.line} p-2 ${T.muted} ${accentHover}`}>
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="#daftar" className={`hidden rounded-lg px-4 py-2 text-sm font-semibold md:inline-block ${T.btnPrimary}`}>Buat Album</a>
            <button onClick={() => setMenu(!menu)} aria-label="Buka menu" className={`rounded-lg border ${T.line} p-2 md:hidden`}>
              {menu ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
        {menu && (
          <div className={`border-t ${T.line} px-5 py-4 md:hidden`}>
            <div className="flex flex-col gap-3 text-sm">
              <a href="/cara-kerja" onClick={() => setMenu(false)} className={`py-0.5 font-semibold ${textStrong}`}>Cara Kerja</a>
              <a href="/price" onClick={() => setMenu(false)} className={`py-0.5 ${T.muted} ${accentHover}`}>Harga</a>
              <a href="/#tentang" onClick={() => setMenu(false)} className={`py-0.5 ${T.muted} ${accentHover}`}>Tentang</a>
              <a href="#daftar" onClick={() => setMenu(false)} className={`rounded-lg px-4 py-2.5 text-center text-sm font-semibold ${T.btnPrimary}`}>Buat Album</a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="px-5 pt-14 pb-10 md:pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2BB3D8]">Cara Kerja</p>
          <h1 className="mt-3 max-w-2xl text-3xl leading-tight md:text-5xl" style={SERIF}>Buat. Publish. Serahkan.</h1>
          <p className={`mt-4 max-w-xl text-sm leading-relaxed md:text-base ${T.muted}`}>
            Buat album, publish dengan satu Token, lalu serahkan kepada klien.
          </p>
        </div>
      </section>

      {/* TIGA LANGKAH — copy asli dari home (#cara-kerja) */}
      <section className="px-5 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-xl text-2xl md:text-4xl" style={SERIF}>Tiga langkah, album tayang.</h2>
          <p className={`mt-3 max-w-lg text-sm leading-relaxed ${T.muted}`}>
            Tanpa kurva belajar. Semua bisa diselesaikan dari HP — album pertama tayang dalam hitungan menit.
          </p>
          <div className="mt-10 max-w-2xl">
            {STEPS.map((s) => (
              <div key={s.n} className={`border-t pt-5 pb-8 last:pb-0 ${s.ind} ${dark ? 'border-[#27395C]' : 'border-[#E2E8F0]'}`}>
                <p className={`text-4xl ${textStrong}`} style={SERIF}>{s.n}</p>
                <h3 className="mt-3 text-base font-bold md:text-lg">{s.t}</h3>
                <p className={`mt-2 max-w-md text-sm leading-relaxed md:text-base ${T.muted}`}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRUKTUR ALBUM */}
      <section className={`${T.soft} px-5 py-14 md:py-16`}>
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h2 className="max-w-xl text-2xl md:text-4xl" style={SERIF}>Bagaimana album disusun.</h2>
            <p className={`mt-3 max-w-lg text-sm leading-relaxed md:text-base ${T.muted}`}>
              Setiap album dibuka dengan cover personal — nama couple dan tanggal — lalu tiga section terkurasi.
            </p>
            <div className={`mt-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border px-4 py-2.5 text-sm ${T.card}`}>
              <span className={`font-semibold ${textStrong}`}>50 foto</span>
              <span className={T.muted}>·</span><span className={T.muted}>3 section</span>
              <span className={T.muted}>·</span><span className={T.muted}>1 link untuk klien</span>
            </div>
            <a href="/#demo" className={`mt-6 inline-flex items-center gap-1.5 border-b pb-0.5 text-sm font-semibold transition-colors ${dark ? 'border-[#27395C]' : 'border-[#1B2A4A]/30'} hover:border-[#2BB3D8]`}>
              Lihat demo interaktif <ArrowRight size={14} />
            </a>
          </div>
          <div className={`rounded-xl border p-6 ${T.card}`}>
            <p className={`text-xs font-semibold uppercase tracking-widest ${T.muted}`}>Susunan section</p>
            <ul className="mt-4">
              {STRUKTUR.map((s) => (
                <li key={s.title} className={`flex items-center justify-between border-b py-3 last:border-b-0 ${T.line}`}>
                  <span className={`text-sm font-semibold ${textStrong}`}>{s.title}</span>
                  <span className={`text-sm ${T.muted}`}>{s.count}</span>
                </li>
              ))}
            </ul>
            <p className={`mt-4 flex items-center gap-2 text-xs ${T.muted}`}>
              <HexMark className="h-3 w-3" /> Total 50 foto dalam satu link
            </p>
          </div>
        </div>
      </section>

      {/* TOKEN & AKTIVASI */}
      <section className="px-5 py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-xl text-2xl md:text-4xl" style={SERIF}>Token &amp; aktivasi.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className={`rounded-xl border p-6 ${T.card}`}>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2BB3D8]">Token — menerbitkan</p>
              <p className={`mt-3 text-lg font-semibold ${textStrong}`}>1 Token = 1 album tayang</p>
              <p className={`mt-2 text-sm leading-relaxed ${T.muted}`}>Token terpakai sekali saat Anda menekan publish.</p>
            </div>
            <div className={`rounded-xl border p-6 ${T.card}`}>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2BB3D8]">Aktivasi — membuka</p>
              <p className={`mt-3 text-lg font-semibold ${textStrong}`}>Klien membuka section pilihannya</p>
              <p className={`mt-2 text-sm leading-relaxed ${T.muted}`}>Highlight, Complete (rekomendasi), atau Full Access. Aktivasi bisa dibayar Anda sebagai bagian dari paket, atau dibayar langsung oleh klien dari halaman album.</p>
            </div>
          </div>
          <div className={`mt-8 grid gap-8 border-t pt-8 md:grid-cols-[1.1fr,0.9fr] ${T.line}`}>
            <div>
              <p className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${textStrong}`}>
                <HexMark className="h-3 w-3" /> Margin untuk Anda
              </p>
              <p className={`mt-3 text-sm leading-relaxed md:text-base ${textStrong}`}>
                Tetapkan harga jual Anda sendiri di atas harga dasar — selisihnya sepenuhnya milik Anda.
              </p>
            </div>
            <div className="flex items-center md:justify-end">
              <a href="/price" className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${accentHover}`}>
                Lihat harga <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MASA BERLAKU — ringkas */}
      <section className={`${T.soft} px-5 py-14 md:py-16`}>
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-xl text-2xl md:text-4xl" style={SERIF}>Masa berlaku album.</h2>
          <p className={`mt-3 max-w-xl text-sm leading-relaxed md:text-base ${T.muted}`}>
            Setelah publish, album mengikuti garis waktu berikut. Aktivasi kapan saja membuka section tanpa watermark sekaligus menahan album dari penghapusan.
          </p>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {LIFECYCLE_SINGKAT.map((s) => (
              <li key={s} className={`flex items-center gap-2.5 rounded-lg border px-4 py-3 text-sm ${T.card}`}>
                <Check size={16} className="shrink-0 text-[#2BB3D8]" />
                <span className={textStrong}>{s}</span>
              </li>
            ))}
          </ul>
          <p className={`mt-6 text-sm leading-relaxed ${T.muted}`}>
            Selama belum aktivasi, klien menerima email pengingat otomatis di hari ke-7, 30, dan 60.
          </p>
        </div>
      </section>

      {/* CTA AKHIR */}
      <section className="bg-[#0D1B36] px-5 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl">Buat album pertama untuk klien Anda.</h2>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#daftar" className="rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-[#1B2A4A] transition-colors hover:bg-[#E8EEF6]">Buat Album</a>
            <a href="/price" className="rounded-lg border border-[#27395C] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-[#2BB3D8] hover:text-[#2BB3D8]">Lihat Harga</a>
          </div>
        </div>
      </section>

      {/* FOOTER (mengikuti HargaPage) */}
      <footer id="tentang" className="border-t border-[#27395C] bg-[#0D1B36] text-white">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5">
                <Image src="/images/logo.webp" alt="Logo Hai Velyu Studio" width={32} height={32} className="h-8 w-8" />
                <span className="text-sm font-bold">Hai Velyu Studio</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-white/60">Album digital — wedding &amp; yearbook — untuk fotografer Indonesia.</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Produk</p>
              <ul className="mt-3 space-y-2 text-sm text-white/75">
                <li><a href="/#galeri" className="hover:text-[#2BB3D8]">Album Wedding</a></li>
                <li><a href="/#yearbook" className="hover:text-[#2BB3D8]">Yearbook <span className="ml-1 text-[10px] uppercase text-white/55">Segera</span></a></li>
                <li><a href="#" className="hover:text-[#2BB3D8]">Link Bio</a></li>
                <li><a href="/price" className="hover:text-[#2BB3D8]">Harga</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Program</p>
              <ul className="mt-3 space-y-2 text-sm text-white/75">
                <li><a href="#" className="hover:text-[#2BB3D8]">Referral</a></li>
                <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#2BB3D8]">Partnership</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Perusahaan</p>
              <ul className="mt-3 space-y-2 text-sm text-white/75">
                <li><a href="/faq" className="hover:text-[#2BB3D8]">FAQ</a></li>
                <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#2BB3D8]">Kontak via WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/60">
            &copy; {new Date().getFullYear()} Hai Velyu Studio &middot; haivelyu.com
          </div>
        </div>
      </footer>
    </div>
  );
}
