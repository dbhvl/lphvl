'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sun, Moon, Menu, X, Check } from 'lucide-react';

/* Token & chrome digaya mengikuti components/LandingPage.tsx (objek L/D, SERIF,
   header sticky border-b) agar /harga konsisten dengan home. */
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

/* Tier aktivasi — harga dasar. Sumber kebenaran sama dengan TIERS di home. */
const TIERS = [
  { name: 'Highlight', price: 'Rp15.000', desc: 'Buka Section 1', items: ['15 foto pilihan terbaik', 'Cover + galeri nyaman di HP'] },
  { name: 'Complete', price: 'Rp35.000', desc: 'Buka Section 1 + 2', items: ['30 foto terkurasi di 2 section', 'Video YouTube highlight'] },
  { name: 'Full Access', price: 'Rp45.000', desc: 'Semua section terbuka', items: ['Semua 50 foto, tanpa terkecuali', 'Termasuk video highlight'] },
];

/* Masa berlaku album — fakta produk (dikoreksi Sam 19 Okt 2026): watermark TIDAK
   langsung muncul; 7 hari pertama full version, baru watermark di hari ke-7. */
const LIFECYCLE = [
  { when: 'Hari 0–7', title: 'Full version', desc: 'Album tayang bersih tanpa watermark — masa preview bagi klien.' },
  { when: 'Hari 7', title: 'Watermark muncul', desc: 'Jika belum aktivasi, watermark menutup foto. Album tetap bisa dibuka.' },
  { when: 'Hari 30', title: 'Diarsipkan', desc: 'Jika belum aktivasi, album masuk arsip.' },
  { when: 'Hari 60', title: 'Dihapus permanen', desc: 'Jika belum aktivasi, album dihapus. Hanya data klien (nama, WA, email) yang disimpan.' },
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
      {/* HERO */}
      <section className="px-5 pt-14 pb-10 md:pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2BB3D8]">Harga</p>
          <h1 className="mt-3 max-w-2xl text-3xl leading-tight md:text-5xl" style={SERIF}>Tanpa biaya bulanan.</h1>
          <p className={`mt-4 max-w-xl text-sm leading-relaxed md:text-base ${T.muted}`}>
            Fotografer menerbitkan album dengan Token. Aktivasi bisa dibayar Anda sebagai bagian dari paket, atau dibayar langsung oleh klien dari halaman album.
          </p>
          <div className={`mt-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border px-4 py-2.5 text-sm ${T.card}`}>
            <span className={`font-semibold ${textStrong}`}>1&nbsp;Token = 1 album</span>
            <span className={T.muted}>·</span><span className={T.muted}>50 foto</span>
            <span className={T.muted}>·</span><span className={T.muted}>3 section</span>
          </div>
        </div>
      </section>

      {/* CARA KERJA BIAYA */}
      <section className="px-5 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-xl text-2xl md:text-4xl" style={SERIF}>Cara kerja biayanya sederhana.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className={`rounded-xl border p-6 ${T.card}`}>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2BB3D8]">Token — menerbitkan</p>
              <p className={`mt-3 text-lg font-semibold ${textStrong}`}>1 Token = 1 album tayang</p>
              <p className={`mt-2 text-sm leading-relaxed ${T.muted}`}>Token dipakai saat Anda menekan publish — bukan langganan. 7 hari pertama album tayang full version; watermark baru muncul di hari ke-7 bila belum aktivasi.</p>
            </div>
            <div className={`rounded-xl border p-6 ${T.card}`}>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2BB3D8]">Aktivasi — membuka</p>
              <p className={`mt-3 text-lg font-semibold ${textStrong}`}>Klien membuka section terkunci</p>
              <p className={`mt-2 text-sm leading-relaxed ${T.muted}`}>Aktivasi membuka section tanpa watermark kapan saja dalam masa berlaku. Bisa dibayar Anda (disertakan dalam paket) atau dibayar langsung oleh klien.</p>
            </div>
          </div>
        </div>
      </section>
      {/* TIER AKTIVASI */}
      <section className={`${T.soft} px-5 py-14 md:py-20`}>
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-xl text-2xl md:text-4xl" style={SERIF}>Buka sesuai momen.</h2>
          <p className={`mt-3 max-w-xl text-sm leading-relaxed md:text-base ${T.muted}`}>
            Harga di bawah adalah harga dasar per aktivasi.
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {TIERS.map((tr) => {
              const recommended = tr.name === 'Complete';
              return (
                <div key={tr.name} className={`relative ${recommended ? `rounded-xl border p-4 -m-4 shadow-[0_16px_40px_-24px_rgba(13,27,54,0.4)] ${dark ? 'border-[#27395C] bg-[#182641]' : 'border-[#E2E8F0] bg-white'}` : ''}`}>
                  {recommended && (
                    <p className={`absolute -top-2.5 left-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${dark ? 'bg-[#2BB3D8] text-[#0D1B36]' : 'bg-[#1B2A4A] text-white'}`}>Rekomendasi</p>
                  )}
                  <div className={`border-t pt-5 ${dark ? 'border-[#27395C]' : 'border-[#E2E8F0]'}`}>
                    <h3 className="text-base font-bold">{tr.name}</h3>
                    <p className={`mt-1 text-xs ${T.muted}`}>{tr.desc}</p>
                    <p className="mt-4 text-3xl font-bold tracking-tight">{tr.price}</p>
                    <ul className="mt-4 space-y-2.5 text-sm">
                      {tr.items.map((it) => (
                        <li key={it} className="flex gap-2.5">
                          <Check size={16} className={`mt-0.5 shrink-0 ${textStrong}`} />
                          <span className={T.muted}>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MARGIN */}
      <section className="px-5 py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.1fr,0.9fr]">
          <div>
            <p className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${textStrong}`}>
              <HexMark className="h-3 w-3" /> Margin untuk Anda
            </p>
            <p className={`mt-3 text-sm leading-relaxed md:text-base ${textStrong}`}>
              Tetapkan harga jual Anda sendiri di atas harga dasar — selisihnya sepenuhnya milik Anda. Anda tidak perlu menagih siapa-siapa: klien membayar langsung dari halaman album.
            </p>
          </div>
          <div className={`rounded-xl border p-6 ${T.card}`}>
            <p className={`text-xs font-semibold uppercase tracking-widest ${T.muted}`}>Contoh</p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between"><span className={T.muted}>Harga dasar Full Access</span><span className={`font-semibold ${textStrong}`}>Rp45.000</span></div>
              <div className="flex items-center justify-between"><span className={T.muted}>Harga jual Anda</span><span className={`font-semibold ${textStrong}`}>Rp65.000</span></div>
              <div className={`flex items-center justify-between border-t pt-3 ${T.line}`}>
                <span className={`font-semibold ${textStrong}`}>Selisih milik Anda</span>
                <span className="font-bold text-[#2BB3D8]">Rp20.000</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* MASA BERLAKU ALBUM */}
      <section className={`${T.soft} px-5 py-14 md:py-16`}>
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-xl text-2xl md:text-4xl" style={SERIF}>Masa berlaku album.</h2>
          <p className={`mt-3 max-w-xl text-sm leading-relaxed md:text-base ${T.muted}`}>
            Setelah publish, album punya masa berlaku. Aktivasi kapan saja di masa ini membuka section tanpa watermark sekaligus menahan album dari penghapusan.
          </p>
          <ol className="mt-8 max-w-2xl">
            {LIFECYCLE.map((s, i) => (
              <li key={s.when} className="relative flex gap-4 pb-8 last:pb-0">
                {i < LIFECYCLE.length - 1 && <span aria-hidden className={`absolute left-[15px] top-8 h-full w-px ${T.line}`} />}
                <span className={`relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${i === 0 ? 'bg-[#2BB3D8] text-[#0D1B36]' : dark ? 'bg-[#182641] text-[#9DB0CC]' : 'bg-[#1B2A4A] text-white'}`}>{i + 1}</span>
                <div>
                  <p className={`text-sm font-bold ${textStrong}`}>{s.when} — {s.title}</p>
                  <p className={`mt-1 text-sm leading-relaxed ${T.muted}`}>{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className={`mt-6 flex items-start gap-2.5 rounded-lg border p-4 text-sm leading-relaxed ${T.card}`}>
            <Check size={16} className="mt-0.5 shrink-0 text-[#2BB3D8]" />
            <span className={T.muted}>Klien menerima pengingat otomatis via email di hari ke-7, 30, dan 60 (selama belum aktivasi).</span>
          </p>
        </div>
      </section>

      {/* CTA AKHIR */}
      <section className="bg-[#0D1B36] px-5 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl">Siapkan album pertama untuk klien Anda.</h2>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#daftar" className="rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-[#1B2A4A] transition-colors hover:bg-[#E8EEF6]">Buat Album</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-[#27395C] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-[#2BB3D8] hover:text-[#2BB3D8]">Tanya via WhatsApp</a>
          </div>
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
