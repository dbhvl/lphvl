import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Ekspor statis penuh — hasil build = folder `out/` siap hosting di mana saja
  // (GitHub Pages, Cloudflare Pages, Netlify, dsb). Tanpa server Node.
  output: 'export',
  images: {
    // next/image tanpa optimizer server (tidak ada runtime di ekspor statis)
    unoptimized: true,
  },
};

export default nextConfig;