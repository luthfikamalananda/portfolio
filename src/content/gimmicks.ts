// Copy for the Hero "gimmicks" — the interactive object on the right side of the desk layout.
// Placeholder-ish where it mentions plans/dates — TODO: adjust to taste.
import type { Locale } from "./types";
import type { GimmickKind } from "@/lib/site";

export interface GimmickCopy {
  hints: Record<GimmickKind, string>;
  deck: { building: string; openTo: string; stream: string; streamBody: string; story: string; swipe: string };
  chat: {
    visitor: string;
    intro: string[];
    replies: { id: string; ask: string; answer: string }[];
    typing: string;
  };
  vinyl: { album: string; side: string; play: string; pause: string };
  kanban: { columns: [string, string, string]; cards: { id: string; text: string; column: 0 | 1 | 2 }[] };
  ticket: {
    title: string;
    passenger: string;
    from: string;
    fromCity: string;
    to: string;
    toCity: string;
    flight: string;
    boarding: string;
    boardingValue: string;
    seat: string;
    seatValue: string;
    gate: string;
    gateValue: string;
    stubAfter: string;
    stubCta: string;
  };
  scratch: { cover: string; title: string; body: string };
  terminal: { welcome: string; notFound: string; commands: Record<string, string> };
}

const en: GimmickCopy = {
  hints: {
    desk: "psst — everything on this desk can be dragged",
    badge: "grab the badge — it swings. Click to flip it.",
    magazine: "hover the cover",
    deck: "swipe the top card away — 7 cards, the last one leads somewhere",
    player: "pull off the special move: S → D → P (or ↓ → P)",
    chat: "pick a reply to keep chatting",
    vinyl: "press play — or drag the record to scratch",
    kanban: "drag the cards between columns",
    ticket: "tear off the stub",
    scratch: "scratch the silver to reveal",
    terminal: "type a command — try “help”",
  },
  deck: {
    building: "Currently building",
    openTo: "Open to",
    stream: "On YouTube",
    streamBody: "I stream story-game playthroughs.",
    story: "On the shelf",
    swipe: "swipe",
  },
  chat: {
    visitor: "hey 👋 who's this?",
    intro: ["Luthfi — most people call me Lompii.", "Frontend-focused software engineer in Semarang. I build web apps that load fast and read clearly."],
    replies: [
      { id: "build", ask: "What are you building?", answer: "Tessera at PT Mitra Kasih Perkasa: travel booking for corporates and for GoPay users via Tessera Lifestyle." },
      { id: "hire", ask: "Can I hire you?", answer: "Yes! I'm open to any offer: full-time, freelance or remote. The contact section is right at the bottom ↓" },
      { id: "stack", ask: "Favorite stack?", answer: "React + JavaScript. One skill set that ships everywhere: web, desktop and mobile." },
      { id: "game", ask: "1v1 me?", answer: "Bet. Tekken 8, anytime. Or catch my story-game streams on YouTube 🎮" },
    ],
    typing: "typing",
  },
  vinyl: { album: "Ships Fast", side: "Side A", play: "Play", pause: "Pause" },
  kanban: {
    columns: ["To do", "Doing", "Done"],
    cards: [
      { id: "reply", text: "Reply to your message", column: 0 },
      { id: "rust", text: "Learn mobile & MPOS", column: 0 },
      { id: "kasira", text: "Tessera @ MKP", column: 1 },
      { id: "portfolio", text: "This portfolio", column: 1 },
      { id: "degree", text: "B.Sc. Informatics", column: 2 },
      { id: "lumen", text: "Lumen UI v1", column: 2 },
    ],
  },
  ticket: {
    title: "Boarding pass",
    passenger: "Passenger",
    from: "From",
    fromCity: "Semarang",
    to: "To",
    toCity: "Your team",
    flight: "Flight",
    boarding: "Boarding",
    boardingValue: "Anytime",
    seat: "Seat",
    seatValue: "Full-time",
    gate: "Gate",
    gateValue: "Contact ↓",
    stubAfter: "See you on board",
    stubCta: "Say hello",
  },
  scratch: { cover: "Scratch me", title: "Open to opportunities", body: "Interesting frontend roles, remote-friendly." },
  terminal: {
    welcome: "Welcome to lompii.sh — type “help” to see what's here.",
    notFound: "command not found:",
    commands: {
      help: "available: whoami · now · stack · projects · contact · coffee · clear",
      whoami: "Luthfi Ananda (Lompii) — software engineer (frontend), Semarang.",
      now: "building: Tessera @ MKP\nlearning: mobile, backend & DevOps\nopen to: interesting opportunities",
      stack: "TypeScript · React · Next.js · Tailwind · Motion",
      projects: "kopiloka  lumen-ui  rapor  ketik  patungan  cuaca-cli\n→ scroll to Projects for details",
      contact: "the contact section is at the bottom of this page ↓",
      coffee: "brewing… ☕ V60, 15g / 250ml, 3:00. done.",
      "sudo hire lompii": "permission granted ✓ — see Contact below",
    },
  },
};

const id: GimmickCopy = {
  hints: {
    desk: "psst — semua yang ada di meja ini bisa digeser",
    badge: "tarik kartunya — bisa berayun. Klik untuk membalik.",
    magazine: "arahkan kursor ke sampul",
    deck: "geser kartu teratas — ada 7 kartu, yang terakhir mengarah ke suatu tempat",
    player: "keluarkan jurus spesialnya: S → D → P (atau ↓ → P)",
    chat: "pilih balasan untuk lanjut ngobrol",
    vinyl: "tekan play — atau tarik piringannya untuk scratch",
    kanban: "geser kartu antar kolom",
    ticket: "sobek potongan tiketnya",
    scratch: "gosok lapisan peraknya",
    terminal: "ketik perintah — coba “help”",
  },
  deck: {
    building: "Sedang membangun",
    openTo: "Terbuka untuk",
    stream: "Di YouTube",
    streamBody: "Saya stream playthrough game cerita.",
    story: "Di rak",
    swipe: "geser",
  },
  chat: {
    visitor: "halo 👋 ini siapa?",
    intro: ["Luthfi — biasa dipanggil Lompii.", "Software engineer frontend di Semarang. Saya membangun web app yang cepat dan mudah dibaca."],
    replies: [
      { id: "build", ask: "Lagi bikin apa?", answer: "Tessera di PT Mitra Kasih Perkasa: pemesanan tiket untuk korporat dan pengguna GoPay lewat Tessera Lifestyle." },
      { id: "hire", ask: "Bisa direkrut?", answer: "Bisa! Saya terbuka untuk tawaran apa saja: full-time, freelance, atau remote. Bagian kontak ada di paling bawah ↓" },
      { id: "stack", ask: "Stack favorit?", answer: "React + JavaScript. Satu skill, bisa dipakai di mana saja: web, desktop, sampai mobile." },
      { id: "game", ask: "P mabar?", answer: "Gas! Tekken 8, kapan saja. Atau nonton stream game cerita saya di YouTube 🎮" },
    ],
    typing: "mengetik",
  },
  vinyl: { album: "Ships Fast", side: "Sisi A", play: "Putar", pause: "Jeda" },
  kanban: {
    columns: ["Rencana", "Dikerjakan", "Selesai"],
    cards: [
      { id: "reply", text: "Balas pesan Anda", column: 0 },
      { id: "rust", text: "Belajar mobile & MPOS", column: 0 },
      { id: "kasira", text: "Tessera @ MKP", column: 1 },
      { id: "portfolio", text: "Portfolio ini", column: 1 },
      { id: "degree", text: "S1 Informatika", column: 2 },
      { id: "lumen", text: "Lumen UI v1", column: 2 },
    ],
  },
  ticket: {
    title: "Boarding pass",
    passenger: "Penumpang",
    from: "Dari",
    fromCity: "Semarang",
    to: "Ke",
    toCity: "Tim Anda",
    flight: "Penerbangan",
    boarding: "Boarding",
    boardingValue: "Kapan saja",
    seat: "Kursi",
    seatValue: "Full-time",
    gate: "Gerbang",
    gateValue: "Kontak ↓",
    stubAfter: "Sampai jumpa di kabin",
    stubCta: "Sapa saya",
  },
  scratch: { cover: "Gosok aku", title: "Terbuka untuk peluang", body: "Posisi frontend menarik, bisa remote." },
  terminal: {
    welcome: "Selamat datang di lompii.sh — ketik “help” untuk melihat isinya.",
    notFound: "perintah tidak ditemukan:",
    commands: {
      help: "tersedia: whoami · now · stack · projects · contact · coffee · clear",
      whoami: "Luthfi Ananda (Lompii) — software engineer (frontend), Semarang.",
      now: "membangun: Tessera @ MKP\nbelajar: mobile, backend & DevOps\nterbuka untuk: peluang menarik",
      stack: "TypeScript · React · Next.js · Tailwind · Motion",
      projects: "kopiloka  lumen-ui  rapor  ketik  patungan  cuaca-cli\n→ scroll ke Proyek untuk detailnya",
      contact: "bagian kontak ada di bawah halaman ini ↓",
      coffee: "menyeduh… ☕ V60, 15g / 250ml, 3:00. selesai.",
      "sudo hire lompii": "izin diberikan ✓ — lihat Kontak di bawah",
    },
  },
};

export function getGimmickCopy(locale: Locale): GimmickCopy {
  return locale === "id" ? id : en;
}
