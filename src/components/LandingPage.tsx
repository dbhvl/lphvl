'use client';

/* HOME — Zone B marketing, mobile-first (DESIGN-SYSTEM.md + WEBSITE-BLUEPRINT.md).
   Dirender lewat app/page.tsx (gating auth Clerk: tamu = landing, login = dashboard).
   Keputusan Sam 14 Okt 2026: foto px-18699437 (hero) + px-1295983 (CTA akhir),
   headline dan copy disederhanakan untuk tampilan yang lebih premium.
*/

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Menu, X, Sun, Moon, Check, ArrowRight, ChevronDown, ArrowUp,
} from 'lucide-react';
import { getHomepageFaqs, getTotalFaqCount } from '@/data/faqData';

const WHATSAPP_URL =
  'https://wa.me/6287783974066?text=Halo%20Hai%20Velyu%2C%20saya%20punya%20pertanyaan%20tentang%20platform';

const SERIF = { fontFamily: 'var(--font-playfair), Georgia, serif' };
const SANS = { fontFamily: 'var(--font-jakarta), system-ui, sans-serif' };

function HexMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`inline-block ${className}`}>
      <path d="M12 2.5 20.2 7.25v9.5L12 21.5 3.8 16.75v-9.5L12 2.5Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function QrMock({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="currentColor" aria-hidden="true" className={className}>
      <path fillRule="evenodd" d="M2 2h9v9H2V2Zm2 2v5h5V4H4Z" />
      <path fillRule="evenodd" d="M17 2h9v9h-9V2Zm2 2v5h5V4h-5Z" />
      <path fillRule="evenodd" d="M2 17h9v9H2v-9Zm2 2v5h5v-5H4Z" />
      <rect x="14" y="3" width="2" height="2" /><rect x="14" y="8" width="2" height="2" />
      <rect x="3" y="14" width="2" height="2" /><rect x="8" y="14" width="2" height="2" />
      <rect x="14" y="14" width="2" height="2" /><rect x="18" y="17" width="2" height="2" />
      <rect x="22" y="14" width="2" height="2" /><rect x="17" y="22" width="2" height="2" />
      <rect x="14" y="19" width="1" height="1" /><rect x="21" y="21" width="2" height="2" />
      <rect x="14" y="24" width="2" height="2" /><rect x="24" y="18" width="2" height="2" />
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

const HERO_SRC = '/images/website/px-18699437-768.webp';
const GALLERY = [
  { src: '/images/website/px-11895938-768.webp', alt: 'Pengantin berhadapan, dahi bertemu — studio putih', span: 'md:col-span-7', m: 'col-span-2 aspect-[16/11] object-[center_20%]' },
  { src: '/images/website/pexels-11600628.jpg', alt: 'Detail dekorasi pernikahan', span: 'md:col-span-5', m: 'col-span-1 aspect-[3/4]' },
  { src: '/images/website/pexels-11895939.jpg', alt: 'Couple berpegangan tangan', span: 'md:col-span-5', m: 'col-span-1 aspect-[3/4] mt-8' },
  { src: '/images/website/pexels-26653479.jpg', alt: 'Momen hangat resepsi', span: 'md:col-span-7', m: 'col-span-2 aspect-[16/10]' },
];

const TIERS = [
  {
    name: 'Highlight', price: 'Rp15.000', desc: 'Buka Section 1',
    items: ['15 foto pilihan terbaik', 'Cover + galeri nyaman di HP'],
  },
  {
    name: 'Complete', price: 'Rp35.000', desc: 'Buka Section 1 + 2',
    items: ['30 foto terkurasi di 2 section', 'Video YouTube highlight'],
  },
  {
    name: 'Full Access', price: 'Rp45.000', desc: 'Semua section terbuka',
    items: ['Semua 50 foto, tanpa terkecuali', 'Termasuk video highlight'],
  },
];

const FAQS = getHomepageFaqs();
const TOTAL_FAQ_COUNT = getTotalFaqCount();

export function LandingPage() {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const T = dark ? D : L;
  const textStrong = dark ? 'text-[#E8EEF6]' : 'text-[#1B2A4A]';

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`min-h-screen ${T.page}`} style={SANS}>
      <style>{`
        details[open] > p {
          animation: faqSlideIn 0.22s ease-out both;
        }
        @keyframes faqSlideIn {
          from { opacity: 0; transform: translateY(-5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* NAV */}
      <header className={`sticky top-0 z-40 border-b ${T.nav}`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="/" className="flex items-center gap-2.5">
            <Image src="/images/logo.webp" alt="Logo Hai Velyu Studio" width={32} height={32} className="h-8 w-8" />
            <span className="text-[15px] font-bold tracking-tight">Hai Velyu Studio</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm md:flex">
            <a href="#cara-kerja" className={`${T.muted} hover:text-[#2BB3D8]`}>Cara Kerja</a>
            <a href="#harga" className={`${T.muted} hover:text-[#2BB3D8]`}>Harga</a>
            <a href="#tentang" className={`${T.muted} hover:text-[#2BB3D8]`}>Tentang</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark(!dark)}
              aria-label="Ganti tema terang/gelap"
              className={`rounded-lg border ${T.line} p-2 ${T.muted} hover:text-[#2BB3D8]`}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
              <button className={`hidden rounded-lg px-2 py-2 text-sm font-medium md:block ${T.muted} hover:text-[#2BB3D8]`}>
                Masuk
              </button>
              <a href="#cara-kerja" className={`hidden rounded-xl px-4 py-2 text-sm font-semibold md:inline-block ${T.btnPrimary}`}>
                Mulai
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
              <a href="#cara-kerja" onClick={() => setMenu(false)} className={`py-0.5 transition-colors ${T.muted} hover:text-[#2BB3D8]`}>Cara Kerja</a>
              <a href="#harga" onClick={() => setMenu(false)} className={`py-0.5 transition-colors ${T.muted} hover:text-[#2BB3D8]`}>Harga</a>
              <a href="#tentang" onClick={() => setMenu(false)} className={`py-0.5 transition-colors ${T.muted} hover:text-[#2BB3D8]`}>Tentang</a>
                <button className={`py-0.5 text-left transition-colors ${T.muted} hover:text-[#2BB3D8]`}>Masuk</button>
                <a href="#cara-kerja" className={`rounded-xl px-4 py-2.5 text-center text-sm font-semibold ${T.btnPrimary}`}>Mulai</a>
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
            className="absolute inset-0 h-full w-full object-cover object-[68%_center] md:object-center"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0D1B36]/95 via-[#0D1B36]/50 to-[#0D1B36]/20 md:bg-linear-to-r md:from-[#0D1B36]/95 md:via-[#0D1B36]/55 md:to-[#0D1B36]/10" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-b from-transparent to-[#0D1B36]/70" />
          <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-12 md:pb-20">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
              <span className="inline-block h-px w-8 bg-[#2BB3D8]" />
              Platform album untuk fotografer Indonesia
            </p>
            <h1 className="max-w-xl text-[30px] leading-[1.15] text-white md:max-w-2xl md:text-[48px] md:leading-[1.08]" style={SERIF}>
              Album digital yang terasa sebagai hadiah.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
              Untuk fotografer wedding &amp; yearbook — album ber-cover, rapi, dan siap dibuka klien dari HP.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href="#cara-kerja" className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#1B2A4A] transition-colors hover:bg-[#E8EEF6]">
                  Mulai Gratis
                </a>
              <a href="#galeri" className="group inline-flex items-center gap-2 py-3 text-sm font-semibold text-white/85 hover:text-white">
                Lihat demo album
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STRIP FAKTA */}
      <section className={`border-b ${T.line}`}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-5 text-[11px] font-semibold uppercase tracking-[0.18em]">
          <span className={T.muted}>1 Token = 1 album publish</span>
          <HexMark className={`hidden h-2.5 w-2.5 sm:block ${T.muted}`} />
          <span className={T.muted}>Aktivasi klien mulai <span className={`font-semibold ${textStrong}`}>Rp15.000</span></span>
          <HexMark className={`hidden h-2.5 w-2.5 sm:block ${T.muted}`} />
          <span className={T.muted}>Tanpa biaya bulanan</span>
        </div>
      </section>

      {/* MASALAH => SOLUSI */}
      <section className={`${T.soft} px-5 py-14 md:py-20`}>
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-xl text-2xl md:text-4xl" style={SERIF}>
            Foto terbaik Anda layak <span className="whitespace-nowrap">lebih dari folder.</span>
          </h2>
          <p className={`mt-3 max-w-xl text-sm leading-relaxed md:text-base ${T.muted}`}>
            Klien tidak membayar untuk folder. Mereka membayar pengalaman — dan pengalaman itulah yang menaikkan nilai jual Anda.
          </p>
          <div className="mt-10 grid gap-0 md:grid-cols-2">
            <div className={`border-b pb-8 md:border-b-0 md:border-r md:pb-0 md:pr-12 ${T.line}`}>
              <p className={`text-xs font-semibold uppercase tracking-widest ${T.muted}`}>Cara lama</p>
              <h3 className="mt-2 text-lg font-bold">Kumpulan file di folder</h3>
              <ul className={`mt-4 space-y-3 text-sm leading-relaxed ${T.muted}`}>
                <li className="flex gap-2.5"><X size={15} className="mt-1 shrink-0" />Klien mengunduh satu per satu, ribet</li>
                <li className="flex gap-2.5"><X size={15} className="mt-1 shrink-0" />Tidak ada kesan premium saat diterima</li>
                <li className="flex gap-2.5"><X size={15} className="mt-1 shrink-0" />Link lama mudah tercecer dan sulit ditemukan lagi</li>
              </ul>
            </div>
            <div className="pt-8 md:pt-0 md:pl-12">
              <p className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-widest ${textStrong}`}><HexMark className={`h-3 w-3 ${textStrong}`} /> Cara Hai Velyu</p>
              <h3 className="mt-2 text-lg font-bold">Album digital ber-cover, siap dibagikan</h3>
              <ul className={`mt-4 space-y-3 text-sm leading-relaxed ${T.muted}`}>
                <li className="flex gap-2.5"><Check size={15} className={`mt-1 shrink-0 ${textStrong}`} />Cover personal + 3 section kurasi — terasa hadiah, bukan sekadar file</li>
                <li className="flex gap-2.5"><Check size={15} className={`mt-1 shrink-0 ${textStrong}`} />Tombol pintas ke Google Drive Anda — klien tetap bisa mengunduh foto hi-res</li>
                <li className="flex gap-2.5"><Check size={15} className={`mt-1 shrink-0 ${textStrong}`} />QR souvenir untuk kado pernikahan</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CARA KERJA — langkah editorial + jangkar produk */}
      <section id="cara-kerja" className="px-5 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-xl text-2xl md:text-4xl" style={SERIF}>Tiga langkah, album tayang.</h2>
          <p className={`mt-3 max-w-lg text-sm leading-relaxed ${T.muted}`}>
            Tanpa kurva belajar. Semua bisa diselesaikan dari HP — album pertama tayang dalam hitungan menit.
          </p>
          <div className="mt-12 grid gap-14 md:grid-cols-[1fr_280px] md:gap-12">
            <div>
              {[
                { n: '01', t: 'Daftar gratis', d: 'Buat akun, lengkapi profil studio Anda. Gratis — tanpa kartu kredit.', ind: '' },
                { n: '02', t: 'Upload & susun', d: 'Masukkan foto terbaik ke 3 section kurasi. Kapasitas tiap section terjaga — album tetap kurasi, bukan gudang.', ind: 'md:pl-8' },
                { n: '03', t: 'Publish & bagikan', d: '1 Token mempublish album. Bagikan link — atau cetak QR souvenir untuk kado klien.', ind: 'md:pl-16' },
              ].map((s) => (
                <div key={s.n} className={`border-t pt-5 pb-8 last:pb-0 ${s.ind} ${dark ? 'border-[#27395C]' : 'border-[#E2E8F0]'}`}>
                  <p className={`text-4xl ${textStrong}`} style={SERIF}>{s.n}</p>
                  <h3 className="mt-3 text-base font-bold">{s.t}</h3>
                  <p className={`mt-2 max-w-md text-sm leading-relaxed ${T.muted}`}>{s.d}</p>
                </div>
              ))}
            </div>
            <div className="mx-auto w-full max-w-65">
              <div className={`border ${dark ? 'border-[#27395C] bg-[#182641]' : 'border-[#1B2A4A]/15 bg-white'}`}>
                <Image src="/images/website/px-11895938-768.webp" alt="Sampul album: pengantin berhadapan" width={768} height={1024} className="h-64 w-full object-cover object-top" />
                <div className="p-4">
                  <p className="text-lg leading-snug" style={SERIF}>Raka &amp; Salsabila</p>
                  <p className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${T.muted}`}>12 April 2026 · Album Wedding</p>
                  <div className={`mt-3 grid grid-cols-3 divide-x text-center ${dark ? 'divide-[#27395C]' : 'divide-[#E2E8F0]'}`}>
                    {[['Highlight', '15 foto'], ['Complete', '30 foto'], ['Full Access', '50 foto']].map(([s, n]) => (
                      <div key={s} className="px-1 py-1.5">
                        <p className="text-[9px] font-bold uppercase tracking-wide">{s}</p>
                        <p className={`text-[9px] ${T.muted}`}>{n}</p>
                      </div>
                    ))}
                  </div>
                  <div className={`mt-3 flex items-center justify-between border px-3 py-2 ${dark ? 'border-[#27395C]' : 'border-[#E2E8F0]'}`}>
                    <span className={`text-[10px] font-semibold ${T.muted}`}>Pintasan Google Drive</span>
                    <span className={`text-xs ${T.muted}`}>&#x2197;</span>
                  </div>
                  <div className={`mt-2 flex items-center gap-2.5 border px-3 py-2 ${dark ? 'border-[#27395C]' : 'border-[#E2E8F0]'}`}>
                    <QrMock className={`h-7 w-7 shrink-0 ${textStrong}`} />
                    <span className={`text-[10px] leading-snug ${T.muted}`}>QR souvenir — dicetak untuk kado pernikahan</span>
                  </div>
                </div>
              </div>
              <p className={`mt-3 text-center text-[10px] uppercase tracking-[0.18em] ${T.muted}`}>Tampilan album di ponsel klien</p>
            </div>
          </div>
        </div>
      </section>

      {/* TIER AKTIVASI */}
      <section id="harga" className={`${T.soft} px-5 py-14 md:py-20`}>
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl md:text-4xl" style={SERIF}>Klien membayar sesuai momen yang ingin dibuka.</h2>
          <p className={`mx-auto mt-3 max-w-xl text-center text-sm ${T.muted}`}>
            Aktivasi = klien membuka section album tanpa watermark. Harga di bawah adalah harga dasar. Sebelum dibuka, semua foto tetap terlihat ber-watermark.
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {TIERS.map((tr) => {
              const recommended = tr.name === 'Complete';
              return (
                <div key={tr.name} className={`${recommended ? 'ring-2 ring-[#2BB3D8]/10 rounded-xl p-4' : ''}`}>
                  <div className={`border-t pt-5 ${dark ? 'border-[#27395C]' : 'border-[#E2E8F0]'}`}>
                    <p className={`text-xs font-semibold uppercase tracking-widest ${T.muted}`}>Aktivasi</p>
                    <h3 className="mt-2 text-base font-bold">{tr.name}</h3>
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
          <div className={`mx-auto mt-10 max-w-2xl border-t pt-6 ${T.line}`}>
            <p className={`flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${textStrong}`}>
              <HexMark className="h-3 w-3" />
              Margin untuk Anda
            </p>
            <p className={`mt-3 text-sm leading-relaxed ${textStrong}`}>
              Tetapkan harga jual Anda sendiri di atas harga dasar — selisihnya sepenuhnya milik Anda. Anda tidak perlu menagih siapa-siapa: klien membayar langsung dari halaman album.
            </p>
          </div>
        </div>
      </section>

      {/* GALERI PREVIEW + KARTU DEMO */}
      <section id="galeri" className="px-5 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-xl text-2xl md:text-4xl" style={SERIF}>Album yang membuat <span className="whitespace-nowrap">klien terkesan.</span></h2>
          <p className={`mt-3 max-w-lg text-sm leading-relaxed ${T.muted}`}>
            Bukan folder berisi file — tapi galeri ber-cover yang bisa dibuka kapan saja <span className="whitespace-nowrap">dari HP.</span>
          </p>
          <div className="mt-10 grid grid-cols-2 gap-3 md:hidden">
            {GALLERY.map((g) => (
              <Image key={g.src} src={g.src} alt={g.alt} width={1200} height={900} className={`w-full object-cover ${g.m}`} />
            ))}
          </div>

          <div className="hidden md:block">
            <div className="grid grid-cols-12 items-start gap-x-5">
              <Image
                src="/images/website/px-11895938-768.webp"
                alt="Pengantin berhadapan, dahi bertemu — studio putih"
                width={768}
                height={1024}
                className="col-span-5 h-130 w-full object-cover"
              />
              <Image
                src="/images/website/pexels-11895939.jpg"
                alt="Couple berpegangan tangan"
                width={1200}
                height={1600}
                className="col-span-4 mt-16 h-100 w-full object-cover"
              />
              <div className="col-span-3 py-1 pt-6">
                <div>
                  <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${T.muted}`}>Galeri Wedding</p>
                  <h3 className={`mt-3 text-xl leading-snug ${textStrong}`} style={SERIF}>
                    Cover personal,<br />terasa seperti hadiah.
                  </h3>
                  <p className={`mt-4 text-sm leading-relaxed ${T.muted}`}>
                    Setiap album dibuka dengan cover — nama couple, tanggal, dan foto pilihan Anda. Klien menerima link, bukan folder.
                  </p>
                </div>
                <div className={`mt-8 border-t pt-6 ${T.line}`}>
                  <div className="space-y-3">
                    {[['50', 'foto dalam 3 section'], ['1', 'link untuk klien'], ['QR', 'souvenir pernikahan']].map(([n, l]) => (
                      <div key={n} className="flex items-baseline gap-2">
                        <span className={`text-2xl font-bold tracking-tight ${textStrong}`} style={SERIF}>{n}</span>
                        <span className={`text-xs ${T.muted}`}>{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
            <div className="mt-5 grid grid-cols-12 gap-x-5">
              <Image
                src="/images/website/pexels-26653479.jpg"
                alt="Momen hangat resepsi"
                width={1200}
                height={800}
                className="col-span-7 h-70 w-full object-cover object-[center_30%]"
              />
              <Image
                src="/images/website/pexels-10074148.jpg"
                alt="Detail dekorasi pernikahan"
                width={1200}
                height={800}
                className="col-span-5 h-70 w-full object-cover"
              />
            </div>
          </div>

          <div className={`mt-14 border-t pt-12 ${T.line}`}>
            <div className="grid gap-10 md:grid-cols-2 md:gap-14 md:items-start">
              <div>
                <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${T.muted}`}>Pratinjau sampul album</p>
                <h3 className={`mt-3 text-2xl leading-snug ${textStrong}`} style={SERIF}>
                  Seperti ini tampilan album<br />yang diterima klien Anda.
                </h3>
                <p className={`mt-4 text-sm leading-relaxed ${T.muted}`}>
                  Klien membuka link — dan langsung disambut cover dengan nama mereka, bukan daftar file. Album bisa diakses kapan saja dari HP, tanpa perlu mengunduh apapun.
                </p>
                <ul className={`mt-6 space-y-3 text-sm ${T.muted}`}>
                  {[
                    'Cover personal: nama couple, tanggal, foto pilihan Anda',
                    'Tiga tier aktivasi — klien pilih sesuai budget',
                    'Pintasan Google Drive untuk foto resolusi penuh',
                    'QR souvenir — siap dicetak untuk kado pernikahan',
                  ].map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Check size={15} className={`mt-0.5 shrink-0 ${textStrong}`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`border ${dark ? 'border-[#27395C] bg-[#182641]' : 'border-[#1B2A4A]/15 bg-white'}`}>
                <div className="relative">
                  <Image src="/images/website/pexels-11895938.jpg" alt="Sampul album: couple Indonesia berpose elegan" width={1200} height={1600} className="h-72 w-full object-cover object-[center]" />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0D1B36]/85 via-[#0D1B36]/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="text-2xl" style={SERIF}>Raka &amp; Salsabila</p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">12 April 2026 · 50 foto terkurasi</p>
                  </div>
                </div>
                <div className={`grid grid-cols-3 divide-x border-y ${dark ? 'divide-[#27395C] border-[#27395C]' : 'divide-[#E2E8F0] border-[#E2E8F0]'}`}>
                  {[['Highlight', '15 foto'], ['Complete', '30 foto'], ['Full Access', '50 foto']].map(([s, n]) => (
                    <div key={s} className="px-2 py-2.5 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-wide">{s}</p>
                      <p className={`text-[10px] ${T.muted}`}>{n}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-px">
                  {[
                    ['/images/website/pexels-11600628.jpg', 'Detail dekorasi pernikahan'],
                    ['/images/website/pexels-26653479.jpg', 'Momen hangat resepsi'],
                    ['/images/website/pexels-11895939.jpg', 'Couple berpegangan tangan'],
                  ].map(([src, alt]) => (
                    <Image key={src} src={src} alt={alt} width={800} height={1000} className="aspect-4/5 w-full object-cover" />
                  ))}
                </div>
                <div className={`border-t px-4 py-3 text-center ${T.line}`}>
                  <p className={`text-[10px] uppercase tracking-[0.18em] ${T.muted}`}>Album demo wedding · Segera hadir</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`${T.soft} px-5 py-14 md:py-20`}>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-4xl" style={SERIF}>Pertanyaan yang sering muncul.</h2>
          <div className={`mt-8 divide-y ${dark ? 'divide-[#27395C]' : 'divide-[#E2E8F0]'}`}>
            {FAQS.map(([q, a]) => (
              <details key={q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
                  {q}
                  <ChevronDown size={16} className={`shrink-0 transition-transform group-open:rotate-180 ${T.muted}`} />
                </summary>
                <p className={`mt-3 max-w-2xl text-sm leading-relaxed ${T.muted}`}>{a}</p>
              </details>
            ))}
          </div>
          <div className={`mt-8 border-t pt-6 ${dark ? 'border-[#27395C]' : 'border-[#E2E8F0]'}`}>
            <a
              href="#faq"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2BB3D8] hover:underline"
            >
              Lihat {TOTAL_FAQ_COUNT} pertanyaan lengkap di Pusat Bantuan FAQ <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* YEARBOOK PROMO */}
      <section id="yearbook" className="px-5 py-14 md:py-20">
        <div className="mx-auto max-w-6xl md:grid md:grid-cols-[1fr_240px] md:items-center md:gap-12">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-widest ${T.muted}`}>Produk · Segera hadir</p>
            <h2 className="mt-3 max-w-xl text-2xl md:text-4xl" style={SERIF}>Album kenangan kelulusan.</h2>
            <p className={`mt-4 max-w-md text-sm leading-relaxed ${T.muted}`}>
              Yearbook digital untuk fotografer sekolah. Satu album untuk satu angkatan — kenangan kelulusan bisa dibuka langsung dari HP. Nilai tambah baru untuk paket kelulusan Anda.
            </p>
            <a href="#galeri" className={`mt-6 inline-flex items-center gap-1.5 border-b pb-0.5 text-sm font-semibold transition-colors ${dark ? 'border-[#27395C]' : 'border-[#1B2A4A]/30'} hover:border-[#2BB3D8]`}>
              Lihat demo <ArrowRight size={14} />
            </a>
          </div>
          <div className="mt-10 md:mt-0">
            <div className="mx-auto w-full max-w-60 border border-[#C5A059]/25 bg-[#0A0A0A] text-[#E8DEC8]">
              <div className="relative h-24 overflow-hidden">
                <Image
                  src="/images/yearbook/school-cover.jpg"
                  alt="Gedung sekolah — sampul album yearbook demo"
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0A] to-transparent" />
              </div>
              <div className="px-4 pb-4 pt-2 text-center">
                <p className="text-base leading-snug" style={SERIF}>SMKN 1 Bawang</p>
                <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#C5A059]">Angkatan 2026</p>
                <div className="mt-3 grid grid-cols-4 gap-0.75">
                  {['student-01', 'student-02', 'student-03', 'student-04', 'student-05', 'student-06', 'student-07', 'student-08'].map((f) => (
                    <div key={f} className="aspect-square overflow-hidden bg-[#1A1A1A]">
                      <Image src={`/images/yearbook/${f}.jpg`} alt="Foto siswa yearbook demo" width={400} height={400} className="h-full w-full object-cover opacity-85" />
                    </div>
                  ))}
                </div>
                <div className="mt-3 border-t border-[#C5A059]/20 pt-2 text-center">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.15em]">
                    <span className="text-[#C5A059]">1 Angkatan</span> · 2 Kelas · 1 Link
                  </p>
                </div>
              </div>
            </div>
            <p className={`mt-3 text-center text-[10px] uppercase tracking-[0.18em] ${T.muted}`}>Tampilan album yearbook</p>
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
            className="absolute top-0 left-0 h-full w-[115%] max-w-none object-cover object-[68%_55%] md:object-[0%_55%]"
          />
          <div className="absolute inset-0 bg-[#0D1B36]/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-linear-to-b from-[#0D1B36]/10 via-[#0D1B36]/40 to-[#0D1B36]" />
          <div className="relative mx-auto flex max-w-6xl flex-col justify-center px-5 py-14 md:px-10 md:py-16">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
              <HexMark className="h-3 w-3 text-white/80" />
              Hai Velyu Studio
            </p>
            <h2 className="max-w-4xl text-balance text-3xl leading-[1.12] text-white md:text-5xl" style={SERIF}>
              Mulai jual album digital premium.
              <br />
              <em>Bayar sekali,</em> tanpa biaya bulanan.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
              Daftar gratis, publish album pertama dengan 1 Token. Klien bisa membuka akses langsung dari halaman album.
            </p>
              <a href="#cara-kerja" className="mt-7 inline-block w-fit rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-[#1B2A4A] transition-colors hover:bg-[#E8EEF6]">
                Mulai Gratis
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
                <li><a href="#galeri" className="hover:text-[#2BB3D8]">Album Wedding</a></li>
                <li><a href="#yearbook" className="hover:text-[#2BB3D8]">Yearbook <span className="ml-1 text-[10px] uppercase text-white/40">Segera</span></a></li>
                <li><a href="#" className="hover:text-[#2BB3D8]">Link Bio</a></li>
                <li><a href="#harga" className="hover:text-[#2BB3D8]">Harga</a></li>
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
                <li><a href="#faq" className="hover:text-[#2BB3D8]">FAQ</a></li>
                <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#2BB3D8]">Kontak via WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/45">
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
