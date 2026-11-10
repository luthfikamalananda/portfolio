# Portfolio

Website portfolio single-page: profesional, tapi tetap playful. Dibangun dengan Next.js (static export), TypeScript, Tailwind CSS v4, dan komponen [React Bits](https://reactbits.dev).

## Menjalankan

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # hasil statis di folder out/
pnpm lint
```

Di mode dev ada **Dev Switcher** di pojok kanan bawah untuk membandingkan background hero dan warna aksen. Bisa juga lewat URL: `?hero=silk|dither|threads|faulty-terminal` dan `?accent=lime|violet|coral|cyan`. Setelah memilih, set pilihan Anda di `src/lib/site.ts`.

## Mengganti placeholder

Semua isi ada di **`src/content/`**. Cari `TODO`.

| File | Isi |
|---|---|
| `shared.ts` | Nama, email, sosial media, daftar Skill, data Project, file Resume |
| `en.ts` | Semua teks berbahasa Inggris (default, di `/`) |
| `id.ts` | Semua teks berbahasa Indonesia (di `/id/`) |
| `public/photo/*` | Foto Anda dalam beberapa crop (full, 4:5, 5:4, wajah 1:1). Path-nya diatur di `photos` di `shared.ts` |
| `public/projects/*` | Gambar Project (rasio 16:10) |
| `public/resume/*` | PDF Resume versi EN dan ID |

## Struktur

```
src/
├── app/(en)/            → route "/"   (root layout lang="en")
├── app/(id)/id/         → route "/id" (root layout lang="id")
├── content/             → semua data & teks (lihat GLOSSARY.md untuk istilah)
├── components/
│   ├── sections/        → Hero, About, Skills, Projects, Journey, BeyondCode, Contact, Footer
│   ├── reactbits/       → komponen dari reactbits.dev (vendored, di-skip oleh lint)
│   └── …                → nav, command palette (⌘K), popup Resume, dev switcher
└── lib/site.ts          → pilihan hero & aksen, helper basePath
```

## Dokumen

- [`GLOSSARY.md`](./GLOSSARY.md): istilah domain (Owner, Section, Journey, Milestone, …)
- [`docs/adr/`](./docs/adr/): keputusan arsitektur
- [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md): panduan deploy ke Netlify, GitHub Pages, dan VPS

## Fitur

- Dark (default) / light theme, tersimpan di browser tanpa flash
- Bahasa Inggris & Indonesia per URL
- Command palette **⌘K / Ctrl+K**: navigasi, ganti tema/bahasa, salin email, unduh Resume, dan… coba ketik `party`
- Popup pilihan versi Resume (EN/ID)
- Menghormati `prefers-reduced-motion`
