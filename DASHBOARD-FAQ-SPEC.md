# Spesifikasi FAQ Dashboard (belum dibangun)

Web publik sengaja hanya menampilkan garis besar. Detail lengkap disajikan di dashboard
setelah fotografer mendaftar/masuk. Dokumen ini adalah spec konten untuk fitur FAQ dashboard.

Sumber data tetap `src/data/faqData.ts` — **tidak ada item yang dihapus**. Setiap item diberi
flag `isPublic`:

- `isPublic: true` → dirender di `/faq` publik (versi ringkas lewat `publicQuestion` / `publicAnswer`).
- tanpa `isPublic` (atau `false`) → hanya untuk dashboard.

Helper:

- `getPublicFaqCategories()` → kategori + item publik.
- `getDashboardFaqCategories()` → kategori + item non-publik (spec dashboard).

## Ditampilkan di `/faq` publik (5 item)

| Kategori | Item | Fokus publik |
|---|---|---|
| Model Bisnis & Harga | `biaya-bulanan` | Tidak ada langganan bulanan |
| Model Bisnis & Harga | `siapa-bayar-aktivasi` | Fotografer biasanya menanggung dalam paket; klien bisa bayar langsung |
| Model Bisnis & Harga | `ambil-untung-aktivasi` | Garis besar margin: selisih milik fotografer |
| Album, Watermark & Retensi | `klien-belum-bayar` | Pratinjau album dan hasil bersih setelah aktivasi |
| Untuk Fotografer | `cara-mulai` | Langkah daftar → profil → Token → terbitkan album |

## Dipindah ke dashboard (15 item)

### Model Bisnis & Harga

- `cara-kerja-token` — paket Token, pemotongan per album, **masa berlaku 12 bulan**, harga dari sistem.

### Album, Watermark & Retensi

- `siklus-hidup-album` — **retensi 7/30/60**, watermark, arsip, penghapusan.
- `durasi-akses-retensi` — masa akses 5 tahun, opsi 10/20 tahun, Arweave.
- `retensi-habis` — perilaku setelah retensi habis dan perpanjangan.
- `section-dan-tier` — detail teknis Section 1/2/3 vs tier Aktivasi.

### Keamanan & Privasi Data

- `keamanan-foto` — PIN album, akses link, kendali unduhan.
- `foto-resolusi-asli` — foto terkompresi vs Google Drive.
- `berhenti-pakai` — status album bila akun berhenti.

### Yearbook / Kenangan Kelulusan

- `yearbook-definisi`
- `yearbook-pemohon`
- `yearbook-custom`
- `yearbook-biaya`
- `yearbook-contoh`

### Untuk Fotografer

- `program-referral` — Poin referral.
- `program-partnership` — program komisi.

## Catatan konten yang harus tetap di dashboard

- Masa berlaku Token (12 bulan).
- Retensi/penghapusan album (7/30/60).
- Payout / pencairan bulanan (di jawaban lengkap `ambil-untung-aktivasi`).
- Kalkulasi margin detail dan mekanisme upgrade.
- Detail teknis, referral, dan yearbook.

Item yang tampil publik sekaligus punya detail dashboard (mis. `ambil-untung-aktivasi`)
memakai `publicAnswer` untuk web dan `answer` lengkap untuk dashboard.
