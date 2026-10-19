// Custom loader untuk next/image pada ekspor statis (output: 'export').
// Masalah: next/image TIDAK otomatis menyisipkan basePath ke src gambar dari
// folder public. Saat site disajikan di subpath GitHub Pages (/lphvl), src
// "/images/x.jpg" akan diminta dari root domain → 404. Loader ini menambahkan
// basePath (dari env NEXT_PUBLIC_BASE_PATH) agar gambar ikut diprefix.
// LOKAL/dev: basePath kosong → src tidak berubah. Custom domain: juga kosong.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Loader wajib mengembalikan URL yang BERUBAH mengikuti `width`. Jika semua
// pemanggilan menghasilkan string identik (width diabaikan), Next memperingatkan
// "loader does not implement width". Di host statis (GitHub Pages) query `w`/`q`
// diabaikan dan file disajikan apa adanya — jadi srcset bervariasi secara sintaks
// tanpa mengubah isi yang disajikan, namun tetap lolos cek Next dan basePath utuh.
export default function imageLoader({ src, width, quality }) {
  // Hindari double-slash / prefix ganda bila src sudah diawali basePath.
  let url = src;
  if (basePath !== '' && !src.startsWith(basePath)) {
    url = `${basePath}${src}`;
  }
  const sep = url.includes('?') ? '&' : '?';
  const params = [`w=${width}`];
  if (quality != null) params.push(`q=${quality}`);
  return `${url}${sep}${params.join('&')}`;
}