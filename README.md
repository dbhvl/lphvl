# Desain LP Hai Velyu — Template Statis

Template desain **landing page marketing Hai Velyu Studio** — ekstrak halaman web-nya saja (tanpa aplikasi dashboard, tanpa auth, tanpa API).

Sumber: `haivelyu-platform/apps/dashboard` → komponen `LandingPage.tsx` (halaman `localhost:3000` untuk pengunjung belum login). Semua dependensi Clerk & routing aplikasi diganti placeholder (`href="#"`, tombol tanpa aksi) sehingga template ini mandiri.

## Isi

- `src/components/LandingPage.tsx` — seluruh halaman (navbar, hero, galeri, cara kerja, fitur, harga, FAQ, CTA, footer, toggle tema gelap/terang)
- `src/app/` — layout (font Playfair Display + Plus Jakarta Sans via `next/font`) & metadata OG
- `src/data/faqData.ts` — data FAQ homepage
- `public/images/` — aset foto (Pexels — lisensi gratis) + logo + OG banner

## Deploy — GitHub Pages (otomatis via Actions)

Workflow `.github/workflows/deploy-pages.yml` sudah terpasang: setiap push ke `main` akan build + deploy ke GitHub Pages **otomatis**. Hasilnya: **`https://dbhvl.github.io/lphvl/`**

Satu kali pengaturan manual di GitHub (sudah tidak bisa diotomasi lewat git):

1. **Syarat repo:** GitHub Pages untuk repo **private** butuh GitHub Pro. Kalau akun free → jadikan repo ini **public** dulu (Settings → Danger Zone → Change visibility), atau upgrade Pro.
2. Buka **Settings → Pages → Build and deployment → Source** pilih **GitHub Actions**.
3. Selesai — jalankan lewat tab **Actions** (atau push apa pun ke `main`).

Catatan teknis:
- Workflow membangun dengan `NEXT_PUBLIC_BASE_PATH` otomatis (project page disajikan di subpath `/lphvl/`) — jadi kalau repo di-rename, URL tetap benar tanpa ubah kode.
- Kalau nanti pakai **custom domain** (mis. di Cloudflare Pages), build lokal `pnpm build` tetap jalan tanpa basePath — tidak ada yang perlu diubah.

## Menjalankan (lokal)

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