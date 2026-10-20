# Keputusan — Struktur & Copywriting Homepage Hai Velyu

_Dokumen keputusan hasil diskusi Sam ↔ Cline ↔ masukan ChatGPT, 19 Okt 2026. Berlaku untuk pekerjaan di repo ini (`desainLPhvl` / dbhvl/lphvl). Kerjakan di preview ini dulu, bukan produksi `haivelyu-platform`._

## 1. Konteks & posisi awal
- Home **v3** (commit `93762f4`, "adopsi feedback eksternal") sudah punya **bagian DEMO unlock interaktif** (`#demo`, state: terkunci → terbuka → sukses) — ini **signature move anti-generic** yang sudah tepat, dan justru TIDAK dimiliki usulan ChatGPT. Struktur v3: Hero · "Kenangan berharga…" · Cara-lama-vs-Hai-Velyu (tabel) · 3 langkah · **Demo** · Harga 3 tier+margin · Galeri-narrative · FAQ(8) · Strip yearbook · CTA · Footer (±12 blok).
- Masalah yang tersisa bukan "generik" lagi, melainkan **kepanjangan** untuk sebuah "pintu masuk".
- Repo **masih satu route (`/`)** — nav & tombol (mis. "Lihat Detail Harga →") menunjuk ke **anchor** (`#harga`, `#faq`, `#cara-kerja`).

## 2. Riset copywriting kompetitor (verbatim)
| Platform | Headline utama | Gaya |
|---|---|---|
| Pixieset | "Designed for photographers. Built to help you grow." | positif, parallel, tanpa negasi |
| Pic-Time | "Your Vision, Delivered." | positif, editorial, singkat |
| ShootProof | "Give Your Clients a Moving Experience." | signature device "You ___ . We ___." diulang tiap section + angka nyata (4.16 M foto, $191 M) |

**Temuan kunci:** tidak satu pun memakai pola **"X, bukan Y"**. Alasan sebenarnya (bukan "tak ada kompetitor pakai"): pola itu **defensif** (membantah "folder/file" alih-alih menyatakan nilai) dan **sudah terlalu sering dipakai** → mudah terasa template.

**Mengapa TIDAK pakai pola "Anda ___. Kami ___." ( ShootProof) sebagai suara utama:** di **bahasa Indonesia** pola itu justru menjadi **klise slogan agensi** ("Anda mengabadikan momen, kami merawat kenangannya") — menukar satu template dengan template lain, dan identitasnya berasal dari kompetitor, bukan mekanisme khas Hai Velyu.

## 3. Keputusan editorial (yang diadopsi)
1. **Motif = "bernilai"** (echo brand **High Value → Hai Velyu**; sebelumnya "hadiah" — diganti atas permintaan Sam, 19 Okt 2026). Benang tipis; **jangan diulang di tiap section**. Setelah headline, subheadline langsung konkret.
2. **Alur verbal = "Susun. Publish. Serahkan."** → dipakai **SEKALI** sebagai headline Cara Kerja. "Serahkan" penting: menandai album = produk jadi untuk klien, bukan software. **Jangan** diulang sebagai motif berulang.
3. **Hindari negasi "X, bukan Y".** Kata **"folder"** boleh dipakai **1×** sebagai pembagian fungsi (bukan slogan): *"Folder tetap menyimpan file resolusi penuh. Hai Velyu menjadi album yang diterima klien."*
4. **Hapus klaim abstrak:** "membuat klien terkesan", "menaikkan nilai jual", "meningkatkan profesionalisme".
5. **Hero DIUBAH** (permintaan Sam, 19 Okt 2026):
   > **Buat album foto menjadi lebih bernilai.**
   > *Alasan Sam: "…terasa sebagai hadiah" terasa seperti terjemahan Inggris & aneh bagi pembaca Indonesia; "bernilai" selaras brand **Hai Velyu Studio = "High Value"** → Hai Velyu.*
   > Susun foto wedding dalam album ber-cover, lalu kirim satu link yang siap dibuka klien dari HP.
   > **Buat Album** · **Lihat Demo**
6. **Section pembayaran = "dua pilihan Aktivasi"** (lebih akurat PRD, memperbaiki copy lama yang condong "klien membayar"):
   > **Satu album, dua pilihan Aktivasi.** Sertakan Aktivasi dalam paket Anda, atau biarkan klien membayar langsung. → **Lihat harga →**

## 4. Struktur final — 6 blok
1. **Hero** — "Buat album foto menjadi lebih bernilai." + subhead konkret.
2. **Tampilan produk** — "Dibuka dengan nama mereka." · bukti: `50 foto · 3 section · 1 link`.
3. **Cara kerja** — "Susun. Publish. Serahkan." · tautan "Pelajari cara kerjanya →".
4. **Demo** — "Buka seperti klien Anda." · **DEMO unlock interaktif tetap jadi pusat**.
5. **Pembayaran** — "Satu album, dua pilihan Aktivasi." · "Lihat harga →".
6. **CTA akhir** — "Siapkan album pertama untuk klien Anda." · **"Buat Album"**.

**Dibuang/dipindah dari home:** tabel "Cara lama vs Hai Velyu" → satu kalimat "folder" di Cara Kerja; kartu 3 tier + margin → ringkas / ringkas ke `/price`; FAQ(8) → `/faq`; section galeri-narrative → buang (restatement); yearbook → strip ringkas atau `/yearbook`.

## 5. Guardrail
- **(a)** Triad "Susun. Publish. Serahkan." hanya sekali; jangan jadi motif ke mana-mana.
- **(b)** **Social proof masih kosong** (poin Grok belum terjawab). Sementara: **demo interaktif + spesifikasi konkret** memikul kepercayaan. Siapkan **slot bukti nyata** (angka/testimoni asli) begitu ada — **jangan dikarang**.
- **(c)** **Label CTA diseragamkan = "Buat Album"** di semua CTA (hero & akhir) — dipilih Sam; jangan pakai "Mulai Gratis".

## 6. Prasyarat & urutan kerja (PENTING)
Memangkas home secara berarti **butuh halaman tujuan dulu**, kalau tidak informasinya hilang & anchor rusak.
1. Bangun **`/price`** dan **`/faq`** (dan **`/cara-kerja`** bila tautan "Pelajari cara kerjanya →" dipakai).
2. **Baru** home dipangkas ke 6 blok; semua tautan dialihkan dari anchor ke route nyata.
3. Kerjakan di **preview `desainLPhvl`** dulu; tidak menyentuh produksi `haivelyu-platform`.

## 7. Keputusan (SUDAH DIKUNCI)
- **Label CTA utama = "Buat Album"** ✅ (dipilih Sam, 19 Okt 2026). Berlaku untuk semua CTA (hero & CTA akhir). Hindari "Mulai Gratis".

→ Semua keputusan copy & struktur sudah bulat. Prasyarat pelaksanaan tetap: bangun `/price` + `/faq` (+ `/cara-kerja` bila tautan dipakai) dulu, lalu pangkas home ke 6 blok.

## 8. Fakta produk — masa berlaku album (rujukan copy /price & home)
> Dikoreksi Sam, 19 Okt 2026. **Ini fakta, bukan opini** — semua copy watermark/retensi harus mengikuti ini.

Siklus hidup album setelah publish (kronologis):
- **Hari 0–7 — Full version.** Album tayang bersih, **belum ada watermark** (masa preview).
- **Hari 7 — Watermark muncul.** Jika belum aktivasi, watermark menutup foto; album tetap bisa dibuka.
- **Hari 30 — Diarsipkan.** Jika belum aktivasi, album masuk arsip.
- **Hari 60 — Dihapus permanen.** Jika belum aktivasi, album dihapus. **Hanya data klien (nama, WA, email) yang disimpan.**

Pengingat: **notifikasi email otomatis di hari ke-7, 30, dan 60** ( hanya jika belum aktivasi ) untuk mengingat klien mengaktivasi.

⚠️ **Kesalahan copy lama yang harus dihindari:** "sebelum diaktifkan, semua foto ber-watermark" — **salah**; 7 hari pertama justru full version bersih. Watermark baru muncul setelah hari ke-7.
