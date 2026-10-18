import type { NextConfig } from 'next';

// GitHub Pages project page disajikan di subpath /<nama-repo>/ (mis. /lphvl).
// Workflow Actions (configure-pages) mengisi NEXT_PUBLIC_BASE_PATH otomatis;
// lokal/dev dibiarkan kosong. Kalau nanti pakai custom domain di root, env ini
// jadi kosong dan basePath nonaktif dengan sendirinya.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  // Ekspor statis penuh — hasil build = folder `out/` siap hosting di mana saja
  // (GitHub Pages, Cloudflare Pages, Netlify, dsb). Tanpa server Node.
  output: 'export',
  basePath: basePath || undefined,
  // Pin root Turbopack ke folder proyek — mencegah deteksi keliru ke lockfile
  // lain di direktori induk (peringatan "multiple lockfiles" saat build lokal).
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // next/image tanpa optimizer server (tidak ada runtime di ekspor statis)
    unoptimized: true,
  },
};

export default nextConfig;