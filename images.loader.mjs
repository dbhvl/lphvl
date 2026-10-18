// Custom loader untuk next/image pada ekspor statis (output: 'export').
// Masalah: next/image TIDAK otomatis menyisipkan basePath ke src gambar dari
// folder public. Saat site disajikan di subpath GitHub Pages (/lphvl), src
// "/images/x.jpg" akan diminta dari root domain → 404. Loader ini menambahkan
// basePath (dari env NEXT_PUBLIC_BASE_PATH) agar gambar ikut diprefix.
// LOKAL/dev: basePath kosong → src tidak berubah. Custom domain: juga kosong.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function imageLoader({ src, width, quality }) {
  // Gambar di public/ disajikan apa adanya (tanpa optimasi runtime di ekspor
  // statis) — cukup tambahkan basePath, abaikan width/quality.
  // Hindari double-slash bila src sudah diawali basePath.
  if (src.startsWith(basePath) && basePath !== '') return src;
  return `${basePath}${src}`;
}