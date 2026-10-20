export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  /** true = tampil di /faq publik. Tanpa flag ini = spesifikasi FAQ dashboard. */
  isPublic?: boolean;
  /** Versi ringkas untuk /faq publik (fallback: shortAnswer / answer). */
  publicQuestion?: string;
  publicAnswer?: string;
  shortQuestion?: string;
  shortAnswer?: string;
  priceQuestion?: string;
  priceAnswer?: string;
  isHomepage?: boolean;
  link?: {
    text: string;
    href: string;
    external?: boolean;
  };
}

export interface FaqCategory {
  id: string;
  title: string;
  description: string;
  /** Judul aman untuk /faq publik (fallback: title). */
  publicTitle?: string;
  /** Deskripsi aman untuk /faq publik (fallback: description). */
  publicDescription?: string;
  items: FaqItem[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'bisnis',
    title: 'Model Bisnis & Harga',
    description: 'Transparan tanpa langganan. Pahami alur token, aktivasi klien, dan potensi komisi Anda.',
    publicDescription: 'Token, aktivasi, dan margin Anda.',
    items: [
      {
        id: 'biaya-bulanan',
        question: 'Apakah ada biaya bulanan atau biaya tersembunyi?',
        isPublic: true,
        publicQuestion: 'Apakah ada biaya langganan bulanan?',
        publicAnswer: 'Tidak ada. Biaya fotografer hanya Token saat menerbitkan album — tanpa langganan bulanan.',
        shortQuestion: 'Apakah ada biaya bulanan?',
        priceQuestion: 'Apakah ada biaya bulanan?',
        answer:
          'Tidak ada. Satu-satunya biaya fotografer adalah Token untuk publish album (sekali potong per album, bukan langganan). Token berlaku 12 bulan sejak pembelian. Tidak ada biaya setup, tidak ada biaya penyimpanan tambahan.',
        shortAnswer:
          'Tidak ada. Satu-satunya biaya untuk fotografer adalah Token saat album mau dipublish. Aktivasi biasanya sudah termasuk dalam paket Anda; klien juga bisa membayar langsung dari halaman album.',
        priceAnswer:
          'Tidak ada. Satu-satunya biaya untuk fotografer adalah Token saat album mau dipublish. Aktivasi biasanya sudah termasuk dalam paket Anda; klien juga bisa membayar langsung dari halaman album.',
        isHomepage: true,
      },
      {
        id: 'cara-kerja-token',
        question: 'Bagaimana cara kerja Token?',
        priceQuestion: 'Berapa lama Token berlaku?',
        answer:
          'Anda beli paket Token (Starter/Professional/Studio — makin besar paket, makin murah per Token). Setiap kali publish 1 album, 1 Token terpotong dari saldo Anda. Token berlaku 12 bulan sejak pembelian. Harga bisa berubah sewaktu-waktu diatur dari sistem, jadi cek halaman Harga untuk angka terbaru.',
        priceAnswer:
          'Token berlaku 12 bulan sejak pembelian. Beli paket lebih besar kalau memang rutin publish — harganya per token lebih murah.',
        link: {
          text: 'Cek halaman Harga',
          href: '/price',
        },
      },
      {
        id: 'siapa-bayar-aktivasi',
        question: 'Siapa yang bayar Aktivasi — saya atau klien?',
        isPublic: true,
        publicQuestion: 'Siapa yang membayar aktivasi?',
        publicAnswer:
          'Biasanya sudah Anda sertakan dalam paket foto, jadi klien terima beres. Klien juga bisa membayar langsung dari halaman album.',
        answer:
          'Bebas, dua-duanya bisa. Klien bisa bayar langsung dari halaman albumnya sendiri, atau Anda yang bayarkan atas nama klien (misalnya sudah termasuk paket foto Anda). Kalau klien yang bayar, Anda tetap dapat 1 Poin yang bisa ditukar jadi Token tambahan.',
      },
      {
        id: 'ambil-untung-aktivasi',
        question: 'Bisa ambil untung dari Aktivasi?',
        isPublic: true,
        publicQuestion: 'Bagaimana margin untuk saya?',
        publicAnswer:
          'Harga aktivasi adalah harga dasar. Anda bebas menetapkan harga jual sendiri — selisihnya sepenuhnya milik Anda.',
        shortQuestion: 'Bisa ambil untung dari aktivasi?',
        priceQuestion: 'Bisa ambil untung dari aktivasi?',
        answer:
          'Bisa. Harga Aktivasi yang tertera (Rp15.000/35.000/45.000) adalah harga dasar. Anda bebas menetapkan harga jual sendiri ke klien di atas harga dasar — selisihnya sepenuhnya jadi milik Anda, direkap otomatis dan dicairkan ke rekening Anda setiap bulan.',
        shortAnswer:
          'Bisa. Klien membayar langsung dari halaman album. Lebih baik lagi: Anda bebas menetapkan harga jual sendiri di atas harga dasar — selisihnya sepenuhnya menjadi milik Anda.',
        priceAnswer:
          'Bisa. Harga aktivasi di halaman ini adalah harga dasar. Tetapkan harga jual Anda sendiri di atas harga dasar — selisihnya sepenuhnya milik Anda, dan klien membayar langsung dari halaman album.',
        isHomepage: true,
      },
    ],
  },
  {
    id: 'album-retensi',
    title: 'Album, Watermark & Retensi',
    description: 'Mekanisme preview gratis 7 hari, tier unlock section, dan durasi akses jangka panjang.',
    publicTitle: 'Album & Watermark',
    publicDescription: 'Pratinjau album dan watermark.',
    items: [
      {
        id: 'klien-belum-bayar',
        question: 'Apa yang terjadi kalau klien belum bayar Aktivasi?',
        isPublic: true,
        publicQuestion: 'Apakah klien bisa melihat album sebelum bayar?',
        publicAnswer:
          'Bisa. Klien melihat pratinjau album lebih dulu. Setelah aktivasi, foto tampil bersih tanpa watermark.',
        shortQuestion: 'Apakah klien bisa melihat album sebelum aktivasi?',
        priceQuestion: 'Apakah klien bisa melihat album sebelum aktivasi?',
        answer:
          'Album tetap bisa dilihat. Hari 0–7 album tayang full version tanpa watermark (masa preview). Di hari ke-7, jika belum aktivasi, watermark muncul menutup foto — album tetap bisa dibuka. Hari ke-30 album diarsipkan; hari ke-60 dihapus permanen, dan hanya data klien (nama, WA, email) yang tetap tersimpan.',
        shortAnswer:
          'Bisa. Semua foto tetap terlihat ber-watermark, dan 7 hari pertama tampil bersih sebagai masa preview. Aktivasi membuka versi bersih sesuai tier yang dipilih.',
        priceAnswer:
          'Bisa. Semua foto tetap terlihat ber-watermark, dan 7 hari pertama tampil bersih sebagai masa preview. Aktivasi membuka versi bersih sesuai tier yang dipilih.',
        isHomepage: true,
      },
      {
        id: 'siklus-hidup-album',
        question: 'Bagaimana masa berlaku album setelah publish — kapan watermark, arsip, dan penghapusan terjadi?',
        answer:
          'Hari 0–7: album tayang full version tanpa watermark. Hari ke-7: watermark muncul menutup foto; album tetap bisa dibuka. Hari ke-30: album diarsipkan. Hari ke-60: album dihapus permanen — hanya data klien (nama, WA, email) yang tetap disimpan. Selama belum aktivasi, klien menerima email pengingat otomatis di hari ke-7, 30, dan 60.',
      },
      {
        id: 'durasi-akses-retensi',
        question: 'Berapa lama album tetap bisa diakses setelah Aktivasi?',
        shortQuestion: 'Berapa lama album bisa diakses klien?',
        answer:
          'Setiap Aktivasi otomatis mendapat masa akses 5 tahun bebas watermark, tanpa biaya tambahan apapun. Kalau ingin lebih lama, bisa upgrade ke 10 atau 20 tahun dengan biaya kecil (mulai Rp10.000), kapan saja — bahkan setelah 5 tahun lewat. Untuk yang menginginkan jaminan permanen, tersedia juga opsi penyimpanan blockchain (Arweave), harga mengikuti kurs saat itu.',
        shortAnswer:
          'Selama album aktif, klien bisa mengaksesnya kapan saja dari HP. Detail durasi aktivasi ditampilkan jelas di dashboard sebelum Anda publish — tanpa biaya bulanan, tanpa biaya tersembunyi.',
        isHomepage: true,
      },
      {
        id: 'retensi-habis',
        question: 'Kalau masa retensi habis dan tidak diperpanjang, album dihapus?',
        answer:
          'Tidak. Foto tetap tersimpan — hanya watermark yang muncul kembali. Bisa dihilangkan lagi kapan saja dengan membayar perpanjangan, tidak ada batas waktu "kesempatan terakhir".',
      },
      {
        id: 'section-dan-tier',
        question: 'Apa itu Section 1/2/3 dan bedanya sama Tier?',
        answer:
          'Setiap album dibagi 3 Section berjenjang — Section 1 berisi momen paling penting, sampai Section 3 yang paling lengkap. Tier Aktivasi (Highlight/Complete/Full Access) menentukan Section mana yang bebas watermark. Klien selalu bisa lihat semua Section dari awal (dengan watermark) — jadi mereka tahu persis apa yang mereka dapatkan sebelum memutuskan bayar.',
      },
    ],
  },
  {
    id: 'keamanan-privasi',
    title: 'Keamanan & Privasi Data',
    description: 'Perlindungan akses album dengan PIN dan kedaulatan foto resolusi tinggi fotografer.',
    items: [
      {
        id: 'keamanan-foto',
        question: 'Foto klien aman, tidak bisa diakses orang lain?',
        shortQuestion: 'Apakah foto klien aman?',
        answer:
          'Aman. Setiap album bisa dilindungi PIN 6 digit, dan hanya pemegang link + PIN yang bisa membuka. Klien tidak bisa mengunduh foto resolusi tinggi lewat Hai Velyu Studio — itu sengaja tetap lewat Google Drive Anda, jadi kendali penuh tetap di tangan Anda sebagai fotografer.',
        shortAnswer:
          'Aman. Album bisa dilindungi PIN, dan hanya Anda bersama klien yang memegang tautannya. Klien tidak bisa mengunduh tanpa izin Anda.',
        isHomepage: true,
      },
      {
        id: 'foto-resolusi-asli',
        question: 'Apakah Hai Velyu Studio menyimpan foto resolusi asli?',
        shortQuestion: 'Klien butuh foto resolusi penuh?',
        answer:
          'Tidak. Foto yang disimpan sudah dikompresi untuk tampilan galeri (ringan dibuka di HP). Resolusi asli tetap di Google Drive Anda — kami hanya menambahkan tombol pintas ke sana, tidak menggantikannya.',
        shortAnswer:
          'Foto di album sudah dioptimalkan HVL agar ringan dibuka di HP mana pun — dan tombol pintas ke Google Drive Anda membuat foto hi-res tetap bisa klien akses.',
        isHomepage: true,
      },
      {
        id: 'berhenti-pakai',
        question: 'Bagaimana kalau saya berhenti pakai Hai Velyu Studio — album klien saya hilang?',
        answer:
          'Selama akun Anda aktif, album yang sudah diaktivasi tetap tersimpan sesuai masa retensinya (lihat di atas). Untuk jaminan yang benar-benar tidak bergantung kelangsungan platform manapun, opsi Arweave (di atas) dirancang khusus untuk kekhawatiran ini.',
      },
    ],
  },
  {
    id: 'yearbook',
    title: 'Yearbook / Kenangan Kelulusan',
    description: 'Layanan album digital kolektif sekolah untuk angkatan siswa dan fotografer kelulusan.',
    items: [
      {
        id: 'yearbook-definisi',
        question: 'Yearbook itu apa persisnya?',
        answer:
          'Album digital untuk 1 angkatan kelulusan sekolah — bukan cuma 1 pasangan seperti album wedding, tapi ratusan siswa sekaligus dalam 1 album, lengkap dengan foto per kelas dan profil tiap siswa.',
      },
      {
        id: 'yearbook-pemohon',
        question: 'Siapa yang bisa mengajukan Yearbook — sekolah atau fotografer?',
        answer:
          'Siapa saja. Bisa fotografer/videografer yang sudah biasa menangani acara kelulusan sekolah (sebagai layanan tambahan ke sekolah), bisa juga langsung dari pihak sekolah — guru, panitia, atau siswa sendiri.',
      },
      {
        id: 'yearbook-custom',
        question: 'Kenapa Yearbook prosesnya custom, tidak bisa langsung daftar seperti Wedding?',
        shortQuestion: 'Hanya untuk pernikahan?',
        answer:
          'Karena tiap sekolah kebutuhannya beda — jumlah siswa, cara pembayaran (kolektif/patungan atau individual), sampai desain merchandise souvenirnya. Kami sesuaikan dulu lewat konsultasi singkat sebelum album dibuatkan.',
        shortAnswer:
          'Fokus utama kami wedding. Yearbook sekolah juga tersedia lewat proses khusus — hubungi kami via WhatsApp.',
        isHomepage: true,
      },
      {
        id: 'yearbook-biaya',
        question: 'Berapa biayanya?',
        answer:
          'Tergantung jumlah siswa dan paket yang dipilih. Hubungi kami via WhatsApp untuk penawaran sesuai kebutuhan angkatan Anda.',
        link: {
          text: 'Hubungi via WhatsApp',
          href: 'https://wa.me/6287783974066?text=Halo%20Hai%20Velyu%2C%20saya%20tertarik%20dengan%20paket%20Yearbook%20sekolah',
          external: true,
        },
      },
      {
        id: 'yearbook-contoh',
        question: 'Ada contohnya?',
        answer:
          'Ada — lihat contoh project yang pernah kami kerjakan di link demo yearbook, atau hubungi kami langsung untuk penjelasan lebih detail.',
        link: {
          text: 'Lihat Demo Yearbook',
          href: '/demo-yearbook',
        },
      },
    ],
  },
  {
    id: 'fotografer',
    title: 'Untuk Fotografer',
    description: 'Langkah bergabung, mekanisme bonus referral, dan peluang kolaborasi partnership.',
    publicDescription: 'Langkah bergabung dan menerbitkan album.',
    items: [
      {
        id: 'cara-mulai',
        question: 'Bagaimana cara mulai?',
        isPublic: true,
        publicQuestion: 'Bagaimana cara mulai menerbitkan album?',
        publicAnswer: 'Daftar, lengkapi profil, pilih paket Token, lalu terbitkan album pertama Anda.',
        answer:
          'Daftar gratis, lengkapi profil, beli paket Token sesuai kebutuhan, langsung bisa publish album pertama.',
      },
      {
        id: 'program-referral',
        question: 'Apa itu Program Referral?',
        answer:
          'Ajak fotografer lain bergabung pakai kode referral unik Anda — dapat bonus Poin yang bisa ditukar jadi Token tambahan, dipantau langsung dari dashboard.',
      },
      {
        id: 'program-partnership',
        question: 'Apa itu Program Partnership?',
        answer:
          'Segera hadir — promosikan Hai Velyu Studio ke jaringan Anda, dapat komisi per proyek yang selesai terbayar. Daftar minat untuk diberi tahu duluan saat program ini dibuka.',
        link: {
          text: 'Daftar Minat via WhatsApp',
          href: 'https://wa.me/6287783974066?text=Halo%20Hai%20Velyu%2C%20saya%20berminat%20dengan%20Program%20Partnership',
          external: true,
        },
      },
    ],
  },
];

/* Web publik = garis besar. Hanya item ber-flag isPublic yang dirender di /faq.
   Item lain tetap tersimpan utuh sebagai spesifikasi FAQ dashboard. */
export function getPublicFaqCategories(): FaqCategory[] {
  return FAQ_CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) => item.isPublic === true),
  })).filter((cat) => cat.items.length > 0);
}

/* Spesifikasi konten untuk fitur FAQ di dashboard (belum dibangun).
   Jangan dihapus dari data — hanya tidak dirender di web publik. */
export function getDashboardFaqCategories(): FaqCategory[] {
  return FAQ_CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) => item.isPublic !== true),
  })).filter((cat) => cat.items.length > 0);
}

// Helper untuk menghitung total pertanyaan FAQ di seluruh kategori secara dinamis
export function getTotalFaqCount(): number {
  return FAQ_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0);
}

// Helper untuk mengambil FAQ homepage secara konsisten
export function getHomepageFaqs(): [string, string][] {
  const list: [string, string][] = [];
  for (const cat of FAQ_CATEGORIES) {
    for (const item of cat.items) {
      if (item.isHomepage) {
        list.push([item.shortQuestion || item.question, item.shortAnswer || item.answer]);
      }
    }
  }
  return list;
}

// Helper untuk mengambil FAQ halaman /price secara konsisten dari sumber data tunggal
export function getPriceFaqs(): [string, string][] {
  const priceItemIds = ['biaya-bulanan', 'cara-kerja-token', 'klien-belum-bayar', 'ambil-untung-aktivasi'];
  const list: [string, string][] = [];

  const itemMap = new Map<string, FaqItem>();
  for (const cat of FAQ_CATEGORIES) {
    for (const item of cat.items) {
      itemMap.set(item.id, item);
    }
  }

  for (const id of priceItemIds) {
    const item = itemMap.get(id);
    if (item) {
      list.push([
        item.priceQuestion || item.shortQuestion || item.question,
        item.priceAnswer || item.shortAnswer || item.answer,
      ]);
    }
  }

  return list;
}

