'use client';

/* HOME — Zone B marketing, mobile-first (DESIGN-SYSTEM.md + WEBSITE-BLUEPRINT.md).
   Dirender lewat app/page.tsx (gating auth Clerk: tamu = landing, login = dashboard).
   Keputusan Sam 14 Okt 2026: foto px-18699437 (hero) + px-1295983 (CTA akhir).
   Keputusan Sam 19 Okt 2026 (KEPUTUSAN-HOMEPAGE.md): home dipangkas menjadi 6 blok;
   detail tier/FAQ/cara kerja pindah ke /price, /faq, /cara-kerja.
*/

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Menu, X, Sun, Moon, Check, ArrowRight, ArrowUp,
  Lock, Signal, Wifi, BatteryFull,
} from 'lucide-react';
import { THEME_KEY } from '@/lib/theme';

const WHATSAPP_URL =
  'https://wa.me/6287783974066?text=Halo%20Hai%20Velyu%2C%20saya%20punya%20pertanyaan%20tentang%20platform';

const SERIF = { fontFamily: 'var(--font-playfair), Georgia, serif' };
const SANS = { fontFamily: 'var(--font-jakarta), system-ui, sans-serif' };

/* Grading seragam untuk semua foto halaman — foto stock bervariasi tone (terang
   vs gelap), filter ini menyatukannya menjadi satu set editorial. Saat sudah ada
   foto asli dari satu fotografer, hapus konstanta ini dan pemakaiannya. */
const GRADE = 'saturate-[0.88] sepia-[0.08] contrast-[1.02]';

function HexMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`inline-block ${className}`}>
      <path d="M12 2.5 20.2 7.25v9.5L12 21.5 3.8 16.75v-9.5L12 2.5Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[2.5rem] border-[6px] border-[#0A1220] bg-[#0A1220] shadow-[0_2px_6px_rgba(13,27,54,0.18),0_36px_72px_-28px_rgba(13,27,54,0.55)]">
      <div className="relative overflow-hidden rounded-[2.1rem] bg-white">
        {children}
        <div className="pointer-events-none absolute bottom-1.5 left-1/2 z-30 h-1 w-16 -translate-x-1/2 rounded-full bg-white/85" />
      </div>
    </div>
  );
}

/* Status bar + dynamic island — tone mengikuti latar di bawahnya (foto = light, header putih = dark) */
function PhoneChrome({ tone }: { tone: 'light' | 'dark' }) {
  return (
    <>
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 pt-2.5 text-[10px] font-semibold ${
          tone === 'light' ? 'text-white' : 'text-[#1B2A4A]'
        }`}
      >
        <span>09.41</span>
        <span className="flex items-center gap-1">
          <Signal size={11} strokeWidth={2.5} />
          <Wifi size={11} strokeWidth={2.5} />
          <BatteryFull size={14} strokeWidth={1.8} />
        </span>
      </div>
      <div className="pointer-events-none absolute left-1/2 top-2 z-30 h-4 w-16 -translate-x-1/2 rounded-full bg-[#0F1930]" />
    </>
  );
}

/* 15 + 20 + 15 = 50 foto — harus cocok dengan klaim "Semua 50 foto" di /price */
const ALBUM_SECTIONS = [
  { src: '/images/website/pexels-11600628.jpg', title: 'Section 1 · Akad', count: '15 foto', open: true },
  { src: '/images/website/pexels-26653479.jpg', title: 'Section 2 · Resepsi', count: '20 foto', open: false },
  { src: '/images/website/pexels-11895939.jpg', title: 'Section 3 · Portret', count: '15 foto', open: false },
];

/* Layar sampul — yang dilihat klien begitu membuka link album */
function AlbumCoverPhone() {
  return (
    <PhoneFrame>
      <div className="relative aspect-[9/20] w-full bg-[#0D1B36]">
        <Image
          src="/images/website/px-11895938-768.webp"
          alt="Sampul album: pengantin berhadapan"
          fill
          sizes="260px"
          className={`object-cover ${GRADE}`}
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#0D1B36]/50 via-[#0D1B36]/10 to-[#0D1B36]/55" />
        <PhoneChrome tone="light" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="px-4 pb-4 text-center text-white [text-shadow:0_1px_14px_rgba(13,27,54,0.6)]">
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/75">Album Wedding</p>
            <h4 className="mt-1 text-[21px] leading-tight" style={SERIF}>
              Raka &amp; Salsabila
            </h4>
            <p className="mt-0.5 text-[10px] font-medium text-white/80">12 April 2026</p>
          </div>
          <div className="rounded-t-[1.5rem] bg-white px-4 pb-6 pt-2 shadow-[0_-8px_24px_rgba(13,27,54,0.25)]">
            <div className="mx-auto h-1 w-9 rounded-full bg-[#E2E8F0]" />
            <div className="mt-3.5 space-y-2.5">
              {ALBUM_SECTIONS.map((s) => (
                <div key={s.title} className="flex items-center gap-2.5">
                  <Image src={s.src} alt="" width={76} height={76} className={`h-9.5 w-9.5 shrink-0 rounded-lg object-cover ${GRADE}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-semibold text-[#1B2A4A]">{s.title}</p>
                    <p className="text-[10px] text-[#5B6B84]">{s.count}</p>
                  </div>
                  {s.open ? (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2BB3D8]/15">
                      <Check size={11} strokeWidth={3} className="text-[#0E7490]" />
                    </span>
                  ) : (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E2E8F0]">
                      <Lock size={10} className="text-[#5B6B84]" />
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3.5 rounded-xl bg-[#1B2A4A] py-2.5 text-center text-[11px] font-semibold text-white">
              Buka Full Access · Rp45.000
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* Layar galeri — Complete aktif: Section 1-2 bersih, Section 3 masih ber-watermark */
function AlbumGalleryPhone({ unlocked = false }: { unlocked?: boolean }) {
  return (
    <PhoneFrame>
      <div className="relative aspect-[9/20] w-full bg-white">
        <PhoneChrome tone="dark" />
        <div className="px-4 pt-10 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5B6B84]">Raka &amp; Salsabila</p>
          <div className="mx-auto mt-2.5 flex w-fit gap-1 rounded-full bg-[#F6F8FB] p-1">
            {['Highlight', 'Complete', 'Full Access'].map((t, i) => (
              <span
                key={t}
                className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${i === (unlocked ? 2 : 1) ? 'bg-[#1B2A4A] text-white' : 'text-[#5B6B84]'}`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1 px-1">
          <div className="relative aspect-square overflow-hidden">
            <Image src="/images/website/pexels-11895939.jpg" alt="Momen couple berpegangan tangan" width={244} height={244} className={`h-full w-full object-cover ${GRADE}`} />
          </div>
          <div className="flex aspect-square items-center justify-center bg-[#F6F8FB]">
            <p className="text-[10px] font-semibold text-[#5B6B84]">+42 foto</p>
          </div>
          <div className="relative aspect-square overflow-hidden">
            <Image src="/images/website/pexels-11600628.jpg" alt="Detail dekorasi pernikahan" width={244} height={244} className={`h-full w-full object-cover ${GRADE}`} />
          </div>
          <div className="relative aspect-square overflow-hidden">
            <Image src="/images/website/pexels-26653479.jpg" alt="Momen hangat resepsi" width={244} height={244} className={`h-full w-full object-cover ${GRADE}`} />
          </div>
          {['/images/website/px-11895938-768.webp', '/images/website/pexels-10074148.jpg'].map((src) => (
            <div key={src} className="relative aspect-square overflow-hidden">
              <Image src={src} alt="Foto Section 3 yang masih terkunci" width={244} height={244} className={`h-full w-full object-cover ${GRADE}`} />
              <div className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${unlocked ? 'opacity-0' : 'opacity-100'}`}>
                <div className="absolute inset-0 bg-[#0D1B36]/35" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-sm border border-white/60 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.25em] text-white">
                  Preview
                </span>
                <Lock size={10} className="absolute right-1.5 top-1.5 text-white" />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 border-t border-[#E2E8F0] bg-white/95 px-4 pb-5 pt-2.5">
          <div className="rounded-xl bg-[#1B2A4A] py-2.5 text-center text-[11px] font-semibold text-white">
            {unlocked ? 'Full Access terbuka' : 'Buka Full Access · Rp45.000'}
          </div>
          <p className="mt-1.5 text-center text-[9px] text-[#5B6B84]">{unlocked ? 'Semua foto kini bersih tanpa watermark' : 'Watermark hilang otomatis setelah aktivasi'}</p>
        </div>
      </div>
    </PhoneFrame>
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

const HERO_SRC = '/images/website/px-18699437-768.webp';

export function LandingPage() {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const T = dark ? D : L;
  const textStrong = dark ? 'text-[#E8EEF6]' : 'text-[#1B2A4A]';
  /* Aksen teks/interaksi — cyan lolos kontras di tema gelap, tapi di tema
     terang butuh teal lebih gelap (#0E7490, 5.0:1) untuk WCAG AA. */
  const accentLink = dark ? 'text-[#2BB3D8]' : 'text-[#0E7490]';
  const accentHover = dark ? 'hover:text-[#2BB3D8]' : 'hover:text-[#0E7490]';

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      setDark(saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);
    } catch {
      // localStorage bisa gagal (mis. mode privat) — tetap di tema terang
    }
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    try {
      localStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
    } catch {
      // persistensi adalah bonus — toggle tetap berfungsi tanpa itu
    }
  };

  return (
    <div className={`min-h-screen ${T.page}`} style={SANS}>
      {/* NAV */}
      <header className={`sticky top-0 z-40 border-b ${T.nav}`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="/" className="flex items-center gap-2.5">
            <Image src="/images/logo.webp" alt="Logo Hai Velyu Studio" width={32} height={32} className="h-8 w-8" />
            <span className="text-[15px] font-bold tracking-tight">Hai Velyu Studio</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm md:flex">
            <a href="/cara-kerja" className={`${T.muted} ${accentHover}`}>Cara Kerja</a>
            <a href="/price" className={`${T.muted} ${accentHover}`}>Harga</a>
            <a href="#tentang" className={`${T.muted} ${accentHover}`}>Tentang</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Ganti tema terang/gelap"
              className={`rounded-lg border ${T.line} p-2 ${T.muted} ${accentHover}`}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
              <button className={`hidden rounded-lg px-2 py-2 text-sm font-medium md:block ${T.muted} ${accentHover}`}>
                Masuk
              </button>
              <a href="#daftar" className={`hidden rounded-lg px-4 py-2 text-sm font-semibold md:inline-block ${T.btnPrimary}`}>
                Buat Album
              </a>
            <button
              onClick={() => setMenu(!menu)}
              aria-label="Buka menu"
              aria-expanded={menu}
              aria-controls="menu-mobile"
              className={`rounded-lg border ${T.line} p-2 md:hidden`}
            >
              {menu ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
        {menu && (
          <div id="menu-mobile" className={`border-t ${T.line} px-5 py-4 md:hidden`}>
            <div className="flex flex-col gap-3 text-sm">
              <a href="/cara-kerja" onClick={() => setMenu(false)} className={`py-0.5 transition-colors ${T.muted} ${accentHover}`}>Cara Kerja</a>
              <a href="/price" onClick={() => setMenu(false)} className={`py-0.5 transition-colors ${T.muted} ${accentHover}`}>Harga</a>
              <a href="#tentang" onClick={() => setMenu(false)} className={`py-0.5 transition-colors ${T.muted} ${accentHover}`}>Tentang</a>
                <button className={`py-0.5 text-left transition-colors ${T.muted} ${accentHover}`}>Masuk</button>
                <a href="#daftar" className={`rounded-lg px-4 py-2.5 text-center text-sm font-semibold ${T.btnPrimary}`}>Buat Album</a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="relative h-[70vh] min-h-125 md:h-[82vh]">
          <Image
            src={HERO_SRC}
            fill
            sizes="100vw"
            priority
            alt="Pengantin berpelukan, kerudung panjang berkibar tertiup angin"
            className={`absolute inset-0 h-full w-full object-cover object-[68%_center] md:object-center ${GRADE}`}
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0D1B36]/95 via-[#0D1B36]/50 to-[#0D1B36]/20 md:bg-linear-to-r md:from-[#0D1B36]/95 md:via-[#0D1B36]/55 md:to-[#0D1B36]/10" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-b from-transparent to-[#0D1B36]/70" />
          <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-12 md:pb-20">
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
              <span className="inline-block h-px w-8 bg-[#2BB3D8]" />
              Platform album untuk fotografer Indonesia
            </p>
            <h1 className="max-w-xl text-[30px] leading-[1.15] text-white md:max-w-2xl md:text-[48px] md:leading-[1.08]" style={SERIF}>
              Album digital yang terasa sebagai hadiah.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
              Susun foto wedding dalam album ber-cover, lalu kirim satu link yang siap dibuka klien dari HP.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href="#daftar" className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#1B2A4A] transition-colors hover:bg-[#E8EEF6]">
                  Buat Album
                </a>
              <a href="#demo" className="group inline-flex items-center gap-2 py-3 text-sm font-semibold text-white/85 hover:text-white">
                Lihat Demo
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STRIP FAKTA */}
      <section className={`border-b ${T.line}`}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-5 text-xs font-semibold uppercase tracking-[0.12em]">
          <span className={T.muted}><span className={`font-bold ${textStrong}`}>1&nbsp;Token</span> untuk 1 album publish</span>
          <HexMark className={`hidden h-2.5 w-2.5 sm:block ${T.muted}`} />
          <span className={T.muted}>Aktivasi klien mulai <span className={`font-semibold ${textStrong}`}>Rp15.000</span></span>
          <HexMark className={`hidden h-2.5 w-2.5 sm:block ${T.muted}`} />
          <span className={T.muted}>Tanpa biaya bulanan</span>
        </div>
      </section>

      {/* TAMPILAN PRODUK — cover personal + bukti konkret */}
      <section className={`${T.soft} px-5 py-14 md:py-20`}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <h2 className="max-w-xl text-2xl md:text-4xl" style={SERIF}>Dibuka dengan nama mereka.</h2>
            <p className={`mt-3 max-w-lg text-sm leading-relaxed md:text-base ${T.muted}`}>
              Setiap album dibuka dengan cover personal — nama couple, tanggal, dan foto pilihan Anda.
            </p>
            <div className={`mt-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border px-4 py-2.5 text-sm ${T.card}`}>
              <span className={`font-semibold ${textStrong}`}>50 foto</span>
              <span className={T.muted}>·</span><span className={T.muted}>3 section</span>
              <span className={T.muted}>·</span><span className={T.muted}>1 link</span>
            </div>
          </div>
          <div className="mx-auto w-full max-w-65 md:max-w-90">
            <AlbumCoverPhone />
            <p className={`mt-4 text-center text-[11px] uppercase tracking-[0.14em] ${T.muted}`}>Tampilan album di ponsel klien</p>
          </div>
        </div>
      </section>

      {/* CARA KERJA */}
      <section id="cara-kerja" className="px-5 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-xl text-2xl md:text-4xl" style={SERIF}>Susun. Publish. Serahkan.</h2>
          <p className={`mt-3 max-w-lg text-sm leading-relaxed ${T.muted}`}>
            Tanpa kurva belajar. Semua bisa diselesaikan dari HP — album pertama tayang dalam hitungan menit.
          </p>
          <div className="mt-12 max-w-2xl">
            {[
              { n: '01', t: 'Daftar gratis', d: 'Buat akun, lengkapi profil studio Anda. Gratis — tanpa kartu kredit.', ind: '' },
              { n: '02', t: 'Upload & susun', d: 'Masukkan foto terbaik ke 3 section kurasi. Kapasitas tiap section terjaga — album tetap kurasi, bukan gudang.', ind: 'md:pl-8' },
              { n: '03', t: 'Publish & bagikan', d: '1\u00A0Token mempublish album. Bagikan link — atau cetak QR souvenir untuk kado klien.', ind: 'md:pl-16' },
            ].map((s) => (
              <div key={s.n} className={`border-t pt-5 pb-8 last:pb-0 ${s.ind} ${dark ? 'border-[#27395C]' : 'border-[#E2E8F0]'}`}>
                <p className={`text-4xl ${textStrong}`} style={SERIF}>{s.n}</p>
                <h3 className="mt-3 text-base font-bold md:text-lg">{s.t}</h3>
                <p className={`mt-2 max-w-md text-sm leading-relaxed md:text-base ${T.muted}`}>{s.d}</p>
              </div>
            ))}
          </div>
          <p className={`mt-8 max-w-xl text-sm leading-relaxed md:text-base ${T.muted}`}>
            Folder tetap menyimpan file resolusi penuh. Hai Velyu menjadi album yang diterima klien.
          </p>
          <a href="/cara-kerja" className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold ${accentLink} hover:underline`}>
            Pelajari cara kerjanya <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* DEMO UNLOCK — momen khas produk: watermark hilang saat aktivasi */}
      <section id="demo" className="px-5 py-14 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${T.muted}`}>Coba sendiri</p>
            <h2 className="mt-3 text-3xl leading-tight md:text-5xl" style={SERIF}>Buka seperti klien Anda.</h2>
            <p className={`mt-5 max-w-md text-base leading-relaxed md:text-lg ${T.muted}`}>
              Klien melihat semua foto sejak awal. Watermark hilang begitu klien melakukan aktivasi — tekan tombol di bawah untuk mencobanya.
            </p>
            <button
              onClick={() => setUnlocked(!unlocked)}
              className={`mt-8 rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${T.btnPrimary}`}
            >
              {unlocked ? 'Kunci kembali' : 'Aktivasi Full Access'}
            </button>
          </div>
          <div className="mx-auto w-full max-w-85">
            <AlbumGalleryPhone unlocked={unlocked} />
          </div>
        </div>
      </section>

      {/* PEMBAYARAN — ringkas; detail tier & margin di /price */}
      <section className={`${T.soft} px-5 py-14 md:py-20`}>
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-xl text-2xl md:text-4xl" style={SERIF}>Satu album, dua pilihan Aktivasi.</h2>
          <p className={`mt-3 max-w-lg text-sm leading-relaxed md:text-base ${T.muted}`}>
            Sertakan Aktivasi dalam paket Anda, atau biarkan klien membayar langsung.
          </p>
          <div className={`mt-6 inline-flex items-center gap-x-3 rounded-lg border px-4 py-2.5 text-sm ${T.card}`}>
            <span className={`font-semibold ${textStrong}`}>Aktivasi mulai Rp15.000</span>
          </div>
          <div>
            <a href="/price" className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold ${accentLink} hover:underline`}>
              Lihat harga &amp; pilihan akses <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* CTA AKHIR */}
      <section className="relative">
        <div className="relative overflow-hidden min-h-105 md:min-h-130">
          <Image
            src="/images/website/px-1295983-1200.webp"
            fill
            sizes="100vw"
            alt="Couple bergandengan tangan tersenyum di depan gedung klasik berjam besar"
            className={`absolute top-0 left-0 h-full w-[115%] max-w-none object-cover object-[68%_55%] md:object-[0%_55%] ${GRADE}`}
          />
          <div className="absolute inset-0 bg-[#0D1B36]/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-linear-to-b from-[#0D1B36]/10 via-[#0D1B36]/40 to-[#0D1B36]" />
          <div className="relative mx-auto flex max-w-6xl flex-col justify-center px-5 py-14 md:px-10 md:py-16">
            <h2 className="max-w-4xl text-balance text-3xl leading-[1.12] text-white md:text-5xl" style={SERIF}>
              Siapkan album pertama untuk klien Anda.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed md:text-base text-white/75">
              Publish album pertama dengan 1 Token. Klien membuka akses langsung dari halaman album.
            </p>
              <a href="#daftar" className="mt-7 inline-block w-fit rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-[#1B2A4A] transition-colors hover:bg-[#E8EEF6]">
                Buat Album
              </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="tentang" className="border-t border-[#27395C] bg-[#0D1B36] text-white">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5">
                <Image src="/images/logo.webp" alt="Logo Hai Velyu Studio" width={32} height={32} className="h-8 w-8" />
                <span className="text-sm font-bold">Hai Velyu Studio</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-white/60">
                Album digital — wedding &amp; yearbook — untuk fotografer Indonesia.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Produk</p>
              <ul className="mt-3 space-y-2 text-sm text-white/75">
                <li><a href="/#demo" className="hover:text-[#2BB3D8]">Album Wedding</a></li>
                <li><a href="#" className="hover:text-[#2BB3D8]">Yearbook <span className="ml-1 text-[10px] uppercase text-white/55">Segera</span></a></li>
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

      {/* BACK TO TOP */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Kembali ke atas"
        className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border shadow-lg transition-all duration-300 ${
          showTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        } ${
          dark
            ? 'border-[#27395C] bg-[#182641] text-[#9DB0CC] hover:text-[#2BB3D8] hover:border-[#2BB3D8]'
            : 'border-[#E2E8F0] bg-white text-[#5B6B84] hover:text-[#1B2A4A] hover:border-[#1B2A4A]'
        }`}>
        <ArrowUp size={16} strokeWidth={2} />
      </button>

    </div>
  );
}
