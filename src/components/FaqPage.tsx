'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sun, Moon, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { getPublicFaqCategories } from '@/data/faqData';

/* /faq — hanya pertanyaan esensial untuk calon pengguna (garis besar).
   Data lengkap tetap di data/faqData.ts dan dipakai sebagai spesifikasi
   FAQ dashboard lewat getDashboardFaqCategories(). */
const PUBLIC_FAQ_CATEGORIES = getPublicFaqCategories();
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

export function FaqPage() {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const T = dark ? D : L;
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
      <style>{`
        details[open] > p {
          animation: faqSlideIn 0.22s ease-out both;
        }
        @keyframes faqSlideIn {
          from { opacity: 0; transform: translateY(-5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* HEADER (mengikuti HargaPage) */}
      <header className={`sticky top-0 z-40 border-b ${T.nav}`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="/" className="flex items-center gap-2.5">
            <Image src="/images/logo.webp" alt="Logo Hai Velyu Studio" width={32} height={32} className="h-8 w-8" />
            <span className="text-[15px] font-bold tracking-tight">Hai Velyu Studio</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm md:flex">
            <a href="/cara-kerja" className={`${T.muted} ${accentHover}`}>Cara Kerja</a>
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
              <a href="/cara-kerja" onClick={() => setMenu(false)} className={`py-0.5 ${T.muted} ${accentHover}`}>Cara Kerja</a>
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
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2BB3D8]">FAQ</p>
          <h1 className="mt-3 max-w-2xl text-3xl leading-tight md:text-5xl" style={SERIF}>Pertanyaan yang sering muncul.</h1>
          <p className={`mt-4 max-w-xl text-sm leading-relaxed md:text-base ${T.muted}`}>
            Jawaban singkat seputar Token, aktivasi, dan cara mulai.
          </p>
        </div>
      </section>

      {/* DAFTAR FAQ ESENSIAL */}
      {PUBLIC_FAQ_CATEGORIES.map((cat) => (
        <section key={cat.id} className="px-5 py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-3xl" style={SERIF}>{cat.publicTitle || cat.title}</h2>
            <p className={`mt-2 text-sm leading-relaxed ${T.muted}`}>{cat.publicDescription || cat.description}</p>
            <div className={`mt-6 divide-y ${dark ? 'divide-[#27395C]' : 'divide-[#E2E8F0]'}`}>
              {cat.items.map((item) => (
                <details key={item.id} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
                    {item.publicQuestion || item.question}
                    <ChevronDown size={16} className={`shrink-0 transition-transform group-open:rotate-180 ${T.muted}`} />
                  </summary>
                  <p className={`mt-3 max-w-2xl text-sm leading-relaxed ${T.muted}`}>{item.publicAnswer || item.shortAnswer || item.answer}</p>
                  {item.link && (
                    <a
                      href={item.link.href}
                      {...(item.link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2BB3D8] hover:underline"
                    >
                      {item.link.text} <ArrowRight size={14} />
                    </a>
                  )}
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* PENUTUP */}
      <section className={`border-t px-5 py-14 ${T.line}`}>
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl" style={SERIF}>Belum menemukan jawabannya?</h2>
          <p className={`mt-3 max-w-lg text-sm leading-relaxed ${T.muted}`}>
            Tim Hai Velyu menjawab langsung via WhatsApp, biasanya dalam hitungan jam kerja.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`rounded-lg px-6 py-3 text-sm font-semibold ${T.btnPrimary}`}>
              Tanya via WhatsApp
            </a>
            <a href="/price" className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${accentHover}`}>
              Lihat harga <ArrowRight size={14} />
            </a>
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
