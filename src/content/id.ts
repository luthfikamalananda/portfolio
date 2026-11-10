// Salinan Bahasa Indonesia. Nilai Beyond Code yang bertanda TODO masih placeholder.
import type { SiteContent } from "./types";
import { owner, projectBase, skills } from "./shared";

const projectText: Record<string, { tagline: string; role: string }> = {
  tessera: {
    tagline:
      "Platform pemesanan tiket travel berbasis micro-frontend — bus, pesawat, hotel, KAI & kereta Eropa, kapal ferry, PELNI, dan wisata — untuk korporat (B2B) dan konsumen lewat Tessera Lifestyle yang sudah live di GoPay. Saya memimpin migrasi ke Next.js Multi-Zones dan membangun white-label branding per korporat dengan CSS design token, dark mode, serta custom hook i18n.",
    role: "Frontend engineer · ~970 commit, kontributor #2",
  },
  retroppies: {
    tagline:
      "Sistem photobooth franchise multi-tenant: kiosk Electron (bayar QRIS, foto + video, filter WebGL, cetak A6 borderless, MP4 ramah iOS via ffmpeg, auto-update dengan rollback), dashboard tenant dengan analitik, dan PWA tanpa login untuk tamu mengambil foto lewat QR code.",
    role: "Freelance · satu-satunya frontend engineer",
  },
  "membership-parkir": {
    tagline:
      "Web app mobile-first untuk penjualan dan perpanjangan membership parkir, sudah live di Kawasan Industri Maspion, Gresik — pembayaran QRIS, Virtual Account, dan kartu kredit, kuota tenant berbasis role, serta request yang di-sign. Salah satu produk yang menaikkan pendapatan service fee BU Parkir.",
    role: "Penulis utama · ~97% commit",
  },
  "udbm-widgets": {
    tagline:
      "Library berisi 50+ widget React yang di-install tim lain ke dashboard UDBM. Saya membangun widget Parkir: laporan transaksi dan shift, kartu member, approval, dan analitik.",
    role: "Frontend · widget Parkir",
  },
  "reforma-trash": {
    tagline:
      "Marketplace web untuk jual beli sampah daur ulang. Memenangkan Best Capstone Project di MSIB Batch 3 Dicoding, lalu menjadi skripsi saya yang terbit di jurnal.",
    role: "Ketua tim · 4 orang",
  },
};

export const id: SiteContent = {
  locale: "id",
  meta: {
    title: "Luthfi Ananda — Software Engineer (Frontend)",
    description:
      "Software engineer di Semarang yang fokus di frontend — membangun produk travel, parkir, dan pembayaran dengan React dan Next.js di PT Mitra Kasih Perkasa.",
  },
  owner: { ...owner, role: "Software Engineer (Frontend)", location: "Semarang, Indonesia" },
  status: {
    available: true,
    availability: "Terbuka untuk peluang menarik",
    learning: "Mobile, backend & DevOps",
  },
  hero: {
    intro:
      "Software engineer di Semarang yang fokus di frontend. Saya membangun platform pemesanan tiket di balik Tessera Lifestyle di GoPay, serta aplikasi parkir dan pembayaran yang dipakai orang setiap hari.",
    now: [
      { label: "Membangun", value: "Tessera di PT Mitra Kasih Perkasa" },
      { label: "Mendalami", value: "Mobile, backend & DevOps" },
      { label: "Terbuka untuk", value: "Peluang menarik, bisa remote" },
    ],
    photoCaption: "ini saya — panggil saja Lompii",
    sentence: {
      lead: "Halo, saya Luthfi",
      afterPhoto: "— software engineer yang tinggal di Semarang",
      afterClock: "dan membangun frontend yang terasa",
      rotating: ["cepat.", "jelas.", "sesuai brand.", "sedikit seru."],
    },
    magazine: {
      issue: "Edisi 01 · Nov 2026 · Semarang",
      price: "Rp 0,— untuk recruiter",
      headline: "Edisi frontend",
      coverLines: [
        { kicker: "Wawancara", title: "Luthfi Ananda soal merilis pemesanan tiket di dalam GoPay" },
        { kicker: "Di dalam", title: "10 micro-frontend, satu sistem design token, warna brand apa pun" },
        { kicker: "Plus", title: "Photobooth yang bisa cetak, transcode, dan update sendiri" },
      ],
      sticker: "terbuka untuk peluang menarik · bisa remote · ",
    },
  },
  about: {
    paragraphs: [
      "Saya Luthfi, biasa dipanggil Lompii — software engineer yang fokus di frontend di PT Mitra Kasih Perkasa (MKP) sejak April 2024. Saya ada di BU Travel Tech untuk Tessera, dan ikut membantu BU Parkir merilis aplikasi yang dipakai pelanggannya.",
      "Di Tessera saya memimpin migrasi ke Next.js Multi-Zones, membangun white-label branding supaya tiap klien korporat melihat warnanya sendiri, dan memulai hook i18n yang sekarang dipakai seluruh platform. Saya suka pekerjaan di titik temu arsitektur dan detail UI kecil.",
      "Saya lulusan Teknik Informatika Universitas Dian Nuswantoro dengan IPK 3,93. Berikutnya saya ingin melangkah lebih jauh dari browser: mobile dan MPOS, backend, serta DevOps.",
    ],
  },
  skillGroups: [
    { title: "Bahasa", skills: skills.languages },
    { title: "Framework & library", skills: skills.frameworks },
    { title: "Tools", skills: skills.tools },
    { title: "Sedang dipelajari", skills: skills.learning },
  ],
  projects: projectBase.map((p) => ({ ...p, ...projectText[p.slug] })),
  journey: [
    {
      kind: "work",
      title: "Software Engineer (Frontend)",
      place: "PT Mitra Kasih Perkasa",
      period: "Apr 2026 — Sekarang",
      summary: "BU Travel Tech — Tessera, platform pemesanan 10 aplikasi untuk korporat B2B dan Tessera Lifestyle di GoPay — sambil tetap membantu BU Parkir.",
      highlights: [
        "Memimpin migrasi ke Next.js Multi-Zones",
        "Membangun white-label branding korporat dengan design token --tsr-*",
        "Dark mode di 10 produk",
      ],
    },
    {
      kind: "work",
      title: "Freelance Frontend Engineer",
      place: "Retroppies",
      period: "Mei 2026 — Sekarang",
      summary: "Satu-satunya frontend engineer untuk sistem photobooth franchise: kiosk Electron, dashboard tenant, dan PWA tamu.",
    },
    {
      kind: "work",
      title: "Junior Software Engineer (Frontend)",
      place: "PT Mitra Kasih Perkasa",
      period: "Apr 2024 — Mar 2026",
      summary: "Membangun Membership Parkir Web dan widget Parkir untuk UDBM, lalu bergabung di Tessera untuk Bus, Pesawat, KAI, dan kereta Eropa.",
      highlights: ["Membership Parkir live di Kawasan Industri Maspion, Gresik", "Memulai custom hook i18n Tessera"],
    },
    {
      kind: "education",
      title: "S1 Teknik Informatika",
      place: "Universitas Dian Nuswantoro",
      period: "2020 — 2024",
      summary: "IPK 3,93 / 4,00 · Skripsi terbit di JTSI (2023): marketplace web untuk sampah daur ulang.",
      latestEducation: true,
    },
    {
      kind: "education",
      title: "MSIB Batch 3 · Front-End Web",
      place: "Dicoding × Kampus Merdeka",
      period: "Agu — Des 2022",
      summary: "Memimpin tim 4 orang membangun Reforma Trash Project yang memenangkan Best Capstone Project.",
    },
  ],
  beyond: {
    playerStats: [
      { label: "Eksekusi", value: 88 },
      { label: "Kecepatan rilis", value: 91 },
      { label: "Asupan kopi", value: 99 },
      { label: "Sabar di ranked", value: 37 },
    ],
    specialMove: "Ship it",
    versus: {
      blurb:
        "Tekken 8 adalah tempat saya menyalurkan jiwa kompetitif. Saya anggota Semarang Gelut Xtreme dan sering jadi panitia turnamen kami — sekaligus pegang mic sebagai caster.",
      roles: ["Anggota", "Crew", "Panitia", "Caster"],
      captions: ["Pegang mic sebagai caster", "Juara 3 — Amateur League, ELS.ID", "Juara 2 — Starcomp"],
    },
    play: {
      blurb:
        "Game dengan cerita yang membekas, dan game yang mekaniknya seru dimainkan — DOOM Eternal termasuk. Playthrough-nya saya stream di YouTube, dan saya juga mengelola TikTok komunitas kami, Semarang Gelut Xtreme.",
      featuredTitle: "masak iya horor kidz? - Silent Hill Townfall",
      about: "Saya main demi cerita dulu — yang ditamatkan jam 2 pagi lalu kepikiran seminggu. Tapi game dengan mekanik serapi DOOM Eternal selalu bikin saya balik lagi.",
      // TODO: ganti dengan deskripsi mungil Anda sendiri
      notes: {
        "god-of-war": "Jadi ayah, mitologi Nordik, dan kapak yang balik sendiri kalau dipanggil.",
        "silent-hill-2": "Kabut, rasa bersalah, dan surat dari orang yang harusnya nggak bisa menulis.",
        "clair-obscur": "Turn-based, tapi tiap parry rasanya kayak game ritme.",
        tlou: "Part I bikin hancur dalam lima belas menit; Part II mendebat saya soal balas dendam, dan menang.",
        rdr2: "Lebih lama mancing daripada ngerjain misi. Nggak nyesel.",
        "plague-tale": "Dua game, satu ikatan kakak-adik — dan tikus yang banyak banget.",
        re4: "Parry gergaji mesin pakai pisau nggak pernah bosan.",
        "the-forest": "Pesawat jatuh, bikin kabin, lalu nyesel masuk gua.",
        "sons-of-the-forest": "Pulau yang sama seramnya, kali ini ada teman yang beneran membantu.",
        "green-hell": "Game survival yang lintah pun jadi masalah.",
        "raft": "Mulai dari empat papan, berakhir dengan markas terapung.",
        "doom-eternal": "Murni mekanik: dash, chainsaw, glory kill, ulangi.",
        "re2": "Langkah kaki Mr. X masih terngiang sampai sekarang.",
        "ghost-of-tsushima": "Ikuti arah angin, bertahan karena duelnya.",
        "detroit": "Tiap pilihan bercabang — dan bikin pengin main ulang.",
        "minecraft": "Tanpa cerita, tanpa batas — tetap sandbox terbaik.",
      },
      // TODO: opini Anda tentang tiap game, dua sampai empat kalimat
      reviews: {
        "god-of-war": "Placeholder — arti perjalanan Kratos dan Atreus buat kamu, dan kamera one-shot-nya.",
        "silent-hill-2": "Placeholder — cara versi remake menjaga rasa takut versi aslinya, dan ending yang kamu dapat.",
        "clair-obscur": "Placeholder — apa yang bikin combat dan ceritanya nyambung buat kamu.",
        tlou: "Placeholder — momen yang membekas setelah credits.",
        rdr2: "Placeholder — kenapa tempo lambatnya justru berhasil, dan aktivitas sampingan yang paling menyita waktu.",
        "plague-tale": "Placeholder — hubungan kakak-adik di intinya, dan cara dunia game-nya bercerita.",
        re4: "Placeholder — loop combat versi remake dan apa yang lebih baik dari versi aslinya.",
        "the-forest": "Placeholder — apa yang bikin loop survival-nya seru buat kamu (main sendiri atau bareng teman?).",
        "sons-of-the-forest": "Placeholder — apa yang bikin loop survival-nya seru buat kamu (main sendiri atau bareng teman?).",
        "green-hell": "Placeholder — apa yang bikin loop survival-nya seru buat kamu (main sendiri atau bareng teman?).",
        "raft": "Placeholder — apa yang bikin loop survival-nya seru buat kamu (main sendiri atau bareng teman?).",
        "doom-eternal": "Placeholder — combat yang kayak catur: kenapa loop resource-nya bikin ini shooter paling seru.",
        "re2": "Placeholder — kenapa ini remake yang paling cocok buat pemula seri RE.",
        "ghost-of-tsushima": "Placeholder — apa yang bikin game ini layak direkomendasikan.",
        "detroit": "Placeholder — pilihan yang paling membekas buat kamu.",
        "minecraft": "Placeholder — kenapa masih masuk daftarmu setelah bertahun-tahun.",
      },
    },
    training: {
      blurb: "Kelamaan duduk di depan laptop dan pegang stik perlu diimbangi — jadi saya angkat beban, dan selalu siap diajak rally.",
      // TODO: sesuaikan detailnya (seberapa sering, di mana, dengan siapa)
      activities: [
        { name: "Gym", detail: "Latihan beban, beberapa kali seminggu" },
        { name: "Badminton", detail: "Main mingguan bareng teman" },
        { name: "Ping pong", detail: "Pertandingan singkat, tapi serius" },
      ],
    },
  },
  ui: {
    nav: {
      about: "Tentang",
      skills: "Skill",
      projects: "Proyek",
      journey: "Perjalanan",
      beyond: "Lainnya",
      contact: "Kontak",
      resume: "Resume",
      menu: "Menu",
      close: "Tutup",
    },
    keys: {
      title: "Pintasan keyboard",
      sections: "Lompat ke section",
      nextPrev: "Section berikutnya / sebelumnya",
      scroll: "Gulir sedikit / satu layar",
      top: "Kembali ke atas",
      resume: "Unduh resume",
      theme: "Terang / gelap",
      language: "English",
      palette: "Command palette",
      help: "Tampilkan / sembunyikan daftar ini",
      hint: "Situs ini bisa dipakai penuh dengan keyboard",
    },
    hero: {
      scroll: "Gulir",
      localTime: "di Semarang",
      ctaWork: "Karya pilihan",
      ctaContact: "Sapa saya",
      hint: "gerakkan kursor di atas nama",
      hintTouch: "usap jari di atas nama",
      edition: "Portfolio, ed. 2026",
      dragHint: "psst — semua yang ada di meja ini bisa digeser",
      receiptTitle: "Sedang dikerjakan",
      receiptFooter: "terima kasih sudah scroll",
      badgeHint: "tarik kartunya — bisa berayun. Klik untuk membalik.",
      badgeAccess: "Akses: semua area",
      badgeSince: "Membangun untuk web sejak 2022",
      badgeBack: "Saat ini",
    },
    about: {
      eyebrow: "Tentang",
      title: "Sedikit tentang saya",
      latestEducation: "Pendidikan terakhir",
      photoCaption: "Ini saya!",
    },
    skills: {
      eyebrow: "Skill",
      title: "Yang biasa saya pakai",
      intro: "Tanpa bar persentase — hanya alat yang saya pakai setiap minggu.",
    },
    projects: {
      eyebrow: "Proyek",
      title: "Karya pilihan",
      intro: "Beberapa hal yang saya rancang, bangun, dan rilis.",
      more: "Karya lainnya",
      live: "Live",
      repo: "Kode",
    },
    journey: {
      eyebrow: "Perjalanan",
      title: "Bagaimana saya sampai di sini",
      kinds: { education: "Pendidikan", work: "Kerja", organization: "Organisasi" },
    },
    beyond: {
      eyebrow: "Di luar kode",
      title: "Lepas kerja, pegang stik",
      intro: "Game cerita, stream larut malam, dan komunitas game fighting yang selalu saya datangi.",
      player: "Player 1",
      main: "Main",
      rank: "Rank",
      special: "Jurus spesial",
      comboHint: "ketik S D P atau ↓ → P — atau tap tombolnya",
      comboHit: "SHIP IT! ✦ kombo masuk",
      flip: "Balik kartu",
      cardBack: "Sisi belakang — segera hadir",
      modes: {
        versus: { label: "Komunitas", sub: "Komunitas fighting game · Tekken 8" },
        play: { label: "Konten & Gaming", sub: "Stream & Katalog Game" },
        training: { label: "Olahraga", sub: "Tetap aktif di luar layar" },
      },
      gameKinds: { favorite: "Favorit pribadi", recommended: "Rekomendasi" },
      gameAll: "Semua",
      wall: { count: "game dimainkan", search: "Cari game…", sortYear: "Terbaru", sortAZ: "A–Z", empty: "Belum ada di rak.", back: "Semua game" },
      community: "Komunitas",
      watch: "Putar video",
      channel: "Channel YouTube",
      tiktok: "TikTok komunitas",
      nowPlaying: "Sedang dimainkan",
      seeMore: "Lihat sisi saya yang lain",
    },
    contact: {
      eyebrow: "Kontak",
      title: "Yuk, bikin sesuatu yang seru.",
      body: "Punya proyek, lowongan, atau sekadar ingin ngobrol soal frontend? Inbox saya selalu terbuka.",
      copy: "Salin email",
      copied: "Tersalin!",
      resume: "Unduh resume",
    },
    resume: {
      title: "Unduh resume",
      body: "Mau versi yang mana?",
      english: "English",
      indonesian: "Bahasa Indonesia",
      current: "bahasa saat ini",
      cancel: "Batal",
    },
    palette: {
      placeholder: "Ketik perintah atau cari…",
      empty: "Tidak ditemukan. Coba “party”.",
      hint: "untuk navigasi",
      groups: { navigate: "Navigasi", actions: "Aksi", links: "Tautan" },
      toggleTheme: "Ganti tema terang / gelap",
      switchLocale: "Switch to English",
      copyEmail: "Salin alamat email",
      downloadResume: "Unduh resume",
      party: "Mode pesta",
      partyOn: "Mode pesta aktif — klik di mana saja 🎉",
      partyOff: "Mode pesta mati",
    },
    theme: { toDark: "Ganti ke tema gelap", toLight: "Ganti ke tema terang" },
    locale: { switchTo: "English" },
    footer: { builtWith: "Dirancang & dibangun oleh", backToTop: "Kembali ke atas", pressK: "untuk perintah" },
  },
};
