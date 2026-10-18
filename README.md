# Desain LP Hai Velyu — Template Statis

Template desain **landing page marketing Hai Velyu Studio** — ekstrak halaman web-nya saja (tanpa aplikasi dashboard, tanpa auth, tanpa API).

Sumber: `haivelyu-platform/apps/dashboard` → komponen `LandingPage.tsx` (halaman `localhost:3000` untuk pengunjung belum login). Semua dependensi Clerk & routing aplikasi diganti placeholder (`href="#"`, tombol tanpa aksi) sehingga template ini mandiri.

## Isi

- `src/components/LandingPage.tsx` — seluruh halaman (navbar, hero, galeri, cara kerja, fitur, harga, FAQ, CTA, footer, toggle tema gelap/terang)
- `src/app/` — layout (font Playfair Display + Plus Jakarta Sans via `next/font`) & metadata OG
- `src/data/faqData.ts` — data FAQ homepage
- `public/images/` — aset foto (Pexels — lisensi gratis) + logo + OG banner

## Menjalankan

```bash
pnpm install
pnpm dev        # pengembangan → http://localhost:3000
pnpm build      # ekspor statis → folder out/ (siap hosting di mana saja)
```

Hasil `pnpm build` = folder `out/` berisi HTML/CSS/JS/gambar statis — dapat langsung di-host di GitHub Pages, Cloudflare Pages, Netlify, atau folder mana pun.

## Catatan desain

- **Tema**: light-first (navy `#1B2A4A` + putih), toggle gelap/terang lokal di navbar (tanpa library).
- **Font**: Playfair Display (heading serif) + Plus Jakarta Sans (body).
- **Tombol auth** ("Masuk" / "Mulai Gratis") = placeholder — di produksi dihubungkan ke halaman login/register.
- **Link footer** (Yearbook, Link Bio, Referral, FAQ) = placeholder `#`.
- Foto: Pexels (px-/pexels-) — lisensi gratis; atribusi mengikuti `LICENSE-MANIFEST.md` induk.

&copy; Hai Velyu Studio — haivelyu.com