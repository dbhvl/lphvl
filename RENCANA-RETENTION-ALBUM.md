# Prompt untuk OpenCode (DeepSeek)

Salin seluruh isi blok teks di bawah ini dan tempel ke OpenCode untuk mengimplementasikan sistem retensi album.

---

## PROMPT

```
Kamu akan mengimplementasikan Sistem Retensi Album Wedding (4 Periode) di proyek `haivelyu-platform`. 

## KONTEKS PROYEK

Platform untuk fotografer wedding. Album wedding mengikuti siklus hidup 4 periode. Jika klien tidak aktivasi (bayar), album kehilangan akses bertahap, dan pada akhirnya foto dihapus — namun kontak klien (email + WA) TETAP disimpan untuk follow-up fotografer.

### 4 PERIODE RETENSI:
| Periode | Hari | Tampilan Klien | Status |
|---------|------|----------------|--------|
| 1 | 1–7 | Galeri full, tanpa watermark | SUDAH ADA |
| 2 | 8–30 | Galeri dengan watermark | SUDAH ADA |
| 3 | 31–60 | Status "diarsipkan" + tombol WA fotografer | BELUM ADA (implementasi ini) |
| 4 | 61+ | 404 + hapus foto via cron | BELUM ADA (implementasi ini) |

### STRUKTUR PROYEK:
- Root: `C:\Users\lohji\.gemini\antigravity\scratch\haivelyu-platform`
- API: `apps/api/` (Cloudflare Workers + Hono + D1)
- Public: `apps/public/` (Astro + Svelte)
- Database: `packages/database/` (Drizzle ORM + SQLite/D1)
- Migrasi: `packages/database/drizzle/`

### FILE YANG SUDAH ADA (JANGAN UBAH LOGIKA YANG SUDAH ADA):
1. `apps/api/src/routes/albums.ts` — API album dengan lazy check watermark Periode 2
2. `apps/api/src/index.ts` — Entry point dengan cron handler `cleanupOrphanFiles`
3. `apps/public/src/components/AlbumViewer.svelte` — Frontend galeri publik
4. `packages/database/src/schema.ts` — Schema Drizzle ORM
5. `apps/api/src/routes/settings.ts` — Routes dengan `studio_profile` (whatsapp, name)

### FIELD DI TABEL `albums`:
- `status`, `activationStatus`, `activatedAt`, `publishedAt`, `deletedAt`, `clientWhatsapp`
- TIDAK ADA `clientEmail` — perlu ditambahkan

### CRON YANG SUDAH ADA:
- `wrangler.jsonc`: `"crons": ["0 22 * * *"]`
- `index.ts`: Sudah ada `scheduled` handler yang memanggil `cleanupOrphanFiles`


---

## 1. Ringkasan Bisnis

Album wedding mengikuti siklus hidup 4 periode. Jika klien tidak melakukan aktivasi (pembayaran), album secara bertahap kehilangan akses publik, dan pada akhirnya foto dihapus — namun **kontak klien tetap disimpan** untuk follow-up fotografer.

| Periode | Hari | Tampilan Klien | Mekanisme | Status |
|---------|------|----------------|-----------|--------|
| 1 | 1–7 | Galeri full, 3 section, tanpa watermark | Lazy check | ✅ Sudah ada |
| 2 | 8–30 | Galeri dengan watermark | Lazy check | ✅ Sudah ada |
| 3 | 31–60 | Status "diarsipkan" + tombol WA fotografer | Lazy check | ❌ **Belum ada** |
| 4 | 61+ | 404 (album tidak ditemukan) | Lazy check + Cron job hapus foto | ❌ **Belum ada** |

---

## 2. Temuan Codebase

### 2.1 Yang Sudah Ada

**API Publik** (`apps/api/src/routes/albums.ts` — `GET /api/public/albums/:slug`):
- Lazy check watermark sudah berfungsi untuk Periode 2 (H8+)
- Return `showWatermark`, `retentionYears`, `retentionExpiresAt`

**Cron Job Existing** (`apps/api/src/index.ts`):
- Sudah ada handler `scheduled` untuk `cleanupOrphanFiles`
- Jadwal: `"0 22 * * *"` di `wrangler.jsonc`
- Pola: `ctx.waitUntil(async () => { ... })`

**Frontend Galeri Publik** (`apps/public/src/components/AlbumViewer.svelte`):
- States: `loading`, `error`, `requirePassword`, `album`
- Watermark dirender inline: foto di-blur + badge "Haivelyu"
- `activationStatus === 'active'` sebagai kondisi utama

**Studio Profile** (`apps/api/src/routes/settings.ts`):
- `studio_profile` di tabel `settings` berisi `whatsapp` dan `name`

**Tabel `albums`**: `status`, `activationStatus`, `activatedAt`, `publishedAt`, `deletedAt`, `clientWhatsapp`. **TIDAK ADA** `clientEmail`.

### 2.2 Yang BELUM Ada

1. **Periode 3**: Tidak ada lazy check archived; tidak ada tampilan "diarsipkan" + tombol WA
2. **Periode 4**: Tidak ada penghapusan foto; tidak ada 404 untuk album expired
3. **`clientEmail` di `albums`**: Hanya di `albumActivations`
4. **Cron retention**: Tidak ada fungsi batch-hapus foto

4. **Cron retention**: Tidak ada fungsi batch-hapus foto

---

## 3. Rencana Implementasi

### Fase 1: Schema Database

**1a. Migration** — `packages/database/drizzle/0021_album_client_email.sql` (baru):

```sql
ALTER TABLE `albums` ADD COLUMN `client_email` text;
```

**1b. Schema TypeScript** — `packages/database/src/schema.ts`:

Tambahkan `clientEmail: text('client_email'),` di tabel `albums` (setelah `clientWhatsapp`).

**Risiko:** Rendah. Kolom nullable, tidak mempengaruhi data existing.

---

### Fase 2: API — Lazy Check Periode 3 & 4

**File:** `apps/api/src/routes/albums.ts` — di `GET /api/public/albums/:slug`

Tambahkan logika **setelah** validasi privacy dan **sebelum** query photos:

```typescript
// === PERIODE 3 & 4: Retention Timeline ===
const daysSince = album.publishedAt
  ? Math.floor((now.getTime() - new Date(album.publishedAt).getTime()) / (1000 * 60 * 60 * 24))
  : 0;
const isActivated = album.activationStatus === 'active';

// Periode 4: H61+ belum aktivasi → 404
if (daysSince > 60 && !isActivated) {
  return c.json({ error: 'Album not found' }, 404);
}

// Periode 3: H31–H60 belum aktivasi → archived + tombol WA
if (daysSince > 30 && !isActivated) {
  const studioSetting = await db.select().from(settings)
    .where(and(eq(settings.userId, album.userId), eq(settings.key, 'studio_profile')))
    .get();
  let studioData: any = {};
  try { studioData = studioSetting?.value ? JSON.parse(studioSetting.value) : {}; } catch {}

  let signedCover = album.coverImage;
  if (signedCover && appSecret) signedCover = await signUrl(signedCover, appSecret, 7200);

  return c.json({
    album: {
      id: album.id, title: album.title,
      groomName: album.groomName, brideName: album.brideName,
      weddingDate: album.weddingDate, quote: album.quote,
      coverFit: album.coverFit, ownerName: studioData.name || null,
      coverImage: signedCover, createdAt: album.createdAt,
      activationStatus: album.activationStatus, publishedAt: album.publishedAt,
      daysSincePublish: daysSince,
      photographerWhatsapp: studioData.whatsapp || null,
      photographerName: studioData.name || null,
    },
    photos: [],
    archived: true,
    archivedInfo: {
      daysSincePublish: daysSince,
      whatsappUrl: studioData.whatsapp
        ? `https://wa.me/${studioData.whatsapp.replace(/\D/g, '').replace(/^0/, '62')}`
        : null,
    },
  });
}
```

**Risiko:** Rendah. Kondisi aditif; periode 1 & 2 tidak terpengaruh.

---

### Fase 3: Cron Job Periode 4

**3a. File baru:** `apps/api/src/cron/retention.ts`

```typescript
import { drizzle } from 'drizzle-orm/d1';
import { eq, and, isNull, lt, isNotNull } from 'drizzle-orm';
import { albums, photos } from '@haivelyu/database';
import { Bindings } from '../types';

export async function runRetentionCron(env: Bindings) {
  const db = drizzle(env.DB);
  const now = new Date();
  const result = { checked: 0, photosDeleted: 0, albumsProcessed: 0, errors: [] as string[] };
  const cutoff60 = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  // Cari album H61+ belum aktivasi
  const expiredAlbums = await db.select().from(albums).where(and(
    isNull(albums.deletedAt), isNull(albums.activatedAt),
    isNotNull(albums.publishedAt), eq(albums.status, 'trial'),
    lt(albums.publishedAt, cutoff60)
  )).all();

  result.checked = expiredAlbums.length;

  for (const album of expiredAlbums) {
    try {
      const daysSince = Math.floor(
        (now.getTime() - new Date(album.publishedAt!).getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSince <= 60) continue; // Safety check

      // 1. Hapus foto dari R2
      const albumPhotos = await db.select().from(photos).where(eq(photos.albumId, album.id)).all();
      for (const photo of albumPhotos) {
        for (const rawUrl of [photo.url, photo.thumbnailUrl].filter(Boolean) as string[]) {
          try {
            const r2Key = rawUrl.replace(/^\/api\/files\//, '');
            if (r2Key) await env.R2.delete(r2Key);
          } catch (e) { result.errors.push(`R2 ${rawUrl}: ${e}`); }
        }
      }

      // 2. Hapus baris foto dari DB
      await db.delete(photos).where(eq(photos.albumId, album.id));

      // 3. Update status → archived (clientEmail + clientWhatsapp TETAP)
      await db.update(albums).set({ status: 'archived', updatedAt: now }).where(eq(albums.id, album.id));

      result.albumsProcessed++;
      result.photosDeleted += albumPhotos.length;
    } catch (err) { result.errors.push(`Album ${album.id}: ${err}`); }
  }
  return result;
}
```

**3b. Update** — `apps/api/src/index.ts`:

Tambah `import { runRetentionCron } from './cron/retention';` dan blok cron kedua di `scheduled`:

```typescript
ctx.waitUntil((async () => {
  try {
    const res = await runRetentionCron(env);
    console.log(`[cron] retention: albums=${res.albumsProcessed} photosDeleted=${res.photosDeleted} errors=${res.errors.length}`);
  } catch (err) { console.error('[cron] retention failed:', err); }
})());
```

**Risiko:** Rendah. Paralel dengan cron existing via `ctx.waitUntil` terpisah.

---

### Fase 4: Frontend — Tampilan Periode 3

**File:** `apps/public/src/components/AlbumViewer.svelte`

**4a. State baru** (tambahkan di blok `<script>`):

```typescript
let archived = false;
let archivedInfo: any = null;
```

**4b. Update `fetchAlbum`:** reset `archived` & `archivedInfo` di awal; jika `data.archived` → set `archived = true`, `archivedInfo = data.archivedInfo`, `album = data.album`, `photos = []`.

**4c. Template:** tambahkan blok `{#else if archived && album}` **sebelum** `{:else if album}`:

```svelte
{:else if archived && album}
  <div class="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4 py-20">
    <div class="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm sm:p-10">
      <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-500">
        <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      </div>
      <h2 class="font-display text-3xl text-stone-800">Album Diarsipkan</h2>
      <p class="mt-2 font-body text-sm text-stone-500">Masa akses gratis album ini telah berakhir.</p>
      {#if hasCoupleNames}
        <p class="mt-4 font-display text-xl text-stone-700">{album.groomName} &amp; {album.brideName}</p>
      {/if}
      {#if archivedInfo?.whatsappUrl}
        <a href={archivedInfo.whatsappUrl} target="_blank" rel="noopener noreferrer"
          class="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-600 py-3 font-body text-xs uppercase tracking-[0.25em] text-white transition hover:bg-green-700">
          Hubungi Fotografer
        </a>
      {:else}
        <p class="mt-8 font-body text-xs text-stone-400">Hubungi fotografer Anda untuk informasi lebih lanjut.</p>
      {/if}
    </div>
  </div>
{:else if album}
```

**Risiko:** Rendah. Blok kondisional baru, tidak mengubah existing.
**Risiko:** Rendah. Blok kondisional baru, tidak mengubah existing.

---

## 4. Urutan Implementasi (Safe Order)

| # | File | Perubahan | Risiko |
|---|------|-----------|--------|
| 1 | `packages/database/drizzle/0021_album_client_email.sql` | Migration: tambah `client_email` | Rendah |
| 2 | `packages/database/src/schema.ts` | Tambah `clientEmail` field | Rendah |
| 3 | `apps/api/src/cron/retention.ts` | File baru (belum dipanggil) | Rendah |
| 4 | `apps/api/src/index.ts` | Tambah ke `scheduled` handler | Rendah |
| 5 | `apps/api/src/routes/albums.ts` | Lazy check Periode 3 & 4 | Sedang |
| 6 | `apps/public/src/components/AlbumViewer.svelte` | UI archived + fetch logic | Sedang |
| 7 | Jalankan migration | `wrangler d1 execute` | Sedang |

---

## 5. Edge Cases & Penanganan

| Kasus | Penanganan |
|-------|------------|
| Album diaktivasi setelah cron jalan | Cron filter `activatedAt IS NULL` — jika aktivasi terjadi sebelum cron, tidak diproses |
| `publishedAt` NULL | Cron filter `isNotNull(publishedAt)` — skip |
| Studio profile kosong (WA null) | `whatsappUrl = null` → tampilkan teks "Hubungi fotografer" tanpa tombol |
| R2 delete gagal | Log error, lanjut proses album lain; foto tetap terhapus dari DB |
| Cron jalan 2x | Idempoten: filter `status='trial'` — album yang sudah archived tidak masuk query |
| Klien aktivasi di Periode 3 | `activationStatus='active'` → lazy check berikutnya: tidak archived, tidak 404 |
| `clientEmail` masih NULL | Kolom nullable; pengisian bisa ditambah di form album settings nanti |

---

## 6. Catatan Penting

1. **Jangan ubah logika watermark existing** — `showWatermark`, `timelineWatermark`, `retentionExpired` tetap apa adanya
2. **Cron existing (orphan cleanup) tidak boleh terganggu** — `runRetentionCron` dijalankan paralel via `ctx.waitUntil` terpisah
3. **Backup database sebelum migration** — `wrangler d1 export` untuk production
4. **`archived` flag** — frontend harus cek `data.archived` SEBELUM akses `data.photos`
5. **`clientEmail`** — untuk MVP kolom nullable dulu; pengisian bisa ditambahkan di form album settings sebagai enhancement terpisah

---

## 7. Estimasi Waktu

| Fase | Estimasi |
|------|----------|
| Schema + Migration | 15 menit |
| API (lazy check + cron) | 30 menit |
| Frontend (AlbumViewer) | 30 menit |
| Testing end-to-end | 30 menit |
| **Total** | **~1.5 jam** |
**Risiko:** Rendah. Kondisi aditif; periode 1 & 2 tidak terpengaruh.