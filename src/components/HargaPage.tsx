'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sun, Moon, Menu, X, Check } from 'lucide-react';

/* /price — ringkas, garis besar. Detail lengkap ada di dashboard.
   Angka Token bersumber dari packages/database/seed_token_system.sql:
   Starter 10/Rp30.000 · Professional 30/Rp60.000 · Studio 100/Rp150.000.
   1 Token = 1 album publish. */
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

/* Paket Token — angka dari seed_token_system.sql. */
const TOKEN_PACKAGES = [
  { name: 'Starter', tokens: '10 token', price: 'Rp30.000', rate: 'Rp3.000 / album' },
  { name: 'Professional', tokens: '30 token', price: 'Rp60.000', rate: 'Rp2.000 / album' },
  { name: 'Studio', tokens: '100 token', price: 'Rp150.000', rate: 'Rp1.500 / album' },
];

/* Tier aktivasi — memakai nama acara, bukan nomor section. */
const TIERS = [
  { name: 'Highlight', price: 'Rp15.000', scope: 'Akad', photos: '15 foto', video: false, recommended: false },
  { name: 'Complete', price: 'Rp35.000', scope: 'Akad + Resepsi', photos: '30 foto', video: true, recommended: false },
  { name: 'Full Access', price: 'Rp45.000', scope: 'Akad + Resepsi + Portret', photos: '50 foto', video: true, recommended: true },
];

export function HargaPage() {
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
      {/* HEADER (mengikuti home) */}
      <header className={`sticky top-0 z-40 border-b ${T.nav}`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="/" className="flex items-center gap-2.5">
            <Image src="/images/logo.webp" alt="Logo Hai Velyu Studio" width={32} height={32} className="h-8 w-8" />
            <span className="text-[15px] font-bold tracking-tight">Hai Velyu Studio</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm md:flex">
            <a href="/cara-kerja" className={`${T.muted} ${accentHover}`}>Cara Kerja</a>
            <a href="/price" className={`font-semibold ${textStrong}`}>Harga</a>
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
              <a href="/cara-kerja" onClick={() => setMenu(false)} className={`py-0.5 ${T.muted} ${accentHover}`}>Cara Kerja</a>
              <a href="/price" onClick={() => setMenu(false)} className={`py-0.5 font-semibold ${textStrong}`}>Harga</a>
              <a href="/#tentang" onClick={() => setMenu(false)} className={`py-0.5 ${T.muted} ${accentHover}`}>Tentang</a>
              <a href="#daftar" onClick={() => setMenu(false)} className={`rounded-lg px-4 py-2.5 text-center text-sm font-semibold ${T.btnPrimary}`}>Buat Album</a>
            </div>
          </div>
        )}
      </header>

      {/* 1. HERO */}
      <section className="px-5 pt-14 pb-10 md:pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2BB3D8]">Harga</p>
          <h1 className="mt-3 max-w-2xl text-3xl leading-tight md:text-5xl" style={SERIF}>Harga album digital untuk fotografer.</h1>
          <p className={`mt-4 max-w-xl text-sm leading-relaxed md:text-base ${T.muted}`}>
            Satu album, satu Token. Tanpa biaya bulanan.
          </p>
          <a href="#daftar" className={`mt-7 inline-block rounded-lg px-7 py-3 text-sm font-semibold transition-colors ${T.btnPrimary}`}>
            Buat Album
          </a>
        </div>
      </section>

      {/* 2. MODAL (TOKEN) */}
      <section className={`${T.soft} px-5 py-14 md:py-16`}>
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2BB3D8]">Modal</p>
          <div className="mt-3 flex flex-wrap items-end gap-x-3 gap-y-1">
            <p className="text-4xl font-bold tracking-tight md:text-5xl">mulai Rp1.500</p>
            <p className={`pb-1 text-sm font-semibold ${T.muted}`}>/ album</p>
          </div>
          <p className={`mt-2 text-sm font-semibold ${textStrong}`}>1 Token = 1 album</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {TOKEN_PACKAGES.map((pkg) => (
              <div key={pkg.name} className={`rounded-xl border p-5 ${T.card}`}>
                <p className="text-sm font-bold">{pkg.name}</p>
                <p className="mt-4 text-2xl font-bold tracking-tight">{pkg.price}</p>
                <p className={`mt-1 text-xs ${T.muted}`}>{pkg.tokens} · {pkg.rate}</p>
              </div>
            ))}
          </div>
          <p className={`mt-4 text-xs ${T.muted}`}>Token digunakan untuk menerbitkan album.</p>
          <p className={`mt-1 text-xs ${T.muted}`}>Rp1.500/album adalah rate paket Studio — makin besar paket, makin murah harga token.</p>
        </div>
      </section>

      {/* 3. AKTIVASI KLIEN */}
      <section className="px-5 py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2BB3D8]">Aktivasi klien</p>
          <h2 className="mt-3 max-w-2xl text-2xl leading-tight md:text-3xl" style={SERIF}>
            Aktivasi = foto bersih (tanpa watermark) untuk klien Anda.
          </h2>

          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {TIERS.map((tr) => (
              <div key={tr.name} className={`relative ${tr.recommended ? `rounded-xl border p-4 -m-4 shadow-[0_16px_40px_-24px_rgba(13,27,54,0.4)] ${dark ? 'border-[#27395C] bg-[#182641]' : 'border-[#E2E8F0] bg-white'}` : ''}`}>
                {tr.recommended && (
                  <p className={`absolute -top-2.5 left-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${dark ? 'bg-[#2BB3D8] text-[#0D1B36]' : 'bg-[#1B2A4A] text-white'}`}>Rekomendasi</p>
                )}
                <div className={`border-t pt-5 ${dark ? 'border-[#27395C]' : 'border-[#E2E8F0]'}`}>
                  <h3 className="text-base font-bold">{tr.name}</h3>
                  <p className={`mt-1 text-xs ${T.muted}`}>{tr.scope}</p>
                  <p className="mt-4 text-3xl font-bold tracking-tight">{tr.price}</p>
                  <ul className="mt-4 space-y-2.5 text-sm">
                    <li className="flex gap-2.5">
                      <Check size={16} className={`mt-0.5 shrink-0 ${textStrong}`} />
                      <span className={T.muted}>{tr.photos}</span>
                    </li>
                    {tr.video && (
                      <li className="flex gap-2.5">
                        <Check size={16} className={`mt-0.5 shrink-0 ${textStrong}`} />
                        <span className={T.muted}>Video highlight</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <p className={`mt-10 max-w-xl text-sm leading-relaxed md:text-base ${T.muted}`}>
            Biaya aktivasi bisa disertakan dalam paket (klien terima beres) — atau klien bisa membayar aktivasi sendiri.
          </p>
        </div>
      </section>

      {/* 4. MARGIN + CTA */}
      <section className={`${T.soft} px-5 py-14 md:py-16`}>
        <div className="mx-auto max-w-6xl">
          <p className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${textStrong}`}>
            <HexMark className="h-3 w-3" /> Margin
          </p>
          <p className={`mt-3 max-w-2xl text-lg font-semibold md:text-xl ${textStrong}`}>
            Selisih harga jual Anda sepenuhnya milik Anda.
          </p>
          <a href="#daftar" className={`mt-6 inline-block rounded-lg px-7 py-3 text-sm font-semibold transition-colors ${T.btnPrimary}`}>
            Buat Album
          </a>
          <p className={`mt-5 max-w-xl text-sm leading-relaxed ${T.muted}`}>
            Detail lengkap tersedia di dashboard setelah login.
          </p>
        </div>
      </section>

      {/* FOOTER (mengikuti home) */}
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
