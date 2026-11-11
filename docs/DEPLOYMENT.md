# Panduan Deployment

Panduan ini ditulis untuk pemula. Bagian 1 menjelaskan konsepnya, bagian 2 menjelaskan setup Cloudflare yang dipakai sekarang, bagian 3 alternatif VPS.

---

## 1. Konsep dasar

### Apa yang sebenarnya kita deploy?

Saat menjalankan `pnpm dev`, Next.js menjalankan **server pengembangan** di laptop Anda. Server ini terus memantau file dan me-reload otomatis. Server ini **bukan** yang dipakai di internet.

Untuk produksi, kita menjalankan:

```bash
pnpm build
```

Karena `next.config.ts` memakai `output: "export"`, perintah ini menghasilkan folder **`out/`** yang hanya berisi file statis: HTML, CSS, JS, gambar, dan PDF. Tidak ada server Node.js yang perlu berjalan. Isi folder `out/` itulah "website" Anda.

> **Deploy = menaruh isi folder `out/` di komputer yang selalu online dan bisa diakses lewat internet.**

Lihat juga `docs/adr/0001-nextjs-static-export.md` untuk alasan memilih static export.

### Istilah yang akan sering muncul

| Istilah | Artinya |
|---|---|
| **Build** | Proses mengubah kode sumber (`src/`) menjadi file statis siap pakai (`out/`). |
| **Hosting** | Layanan atau komputer yang menyimpan dan menyajikan file website Anda. |
| **Domain** | Alamat website, misalnya `luthfiananda.dev`. Dibeli terpisah di registrar (Niagahoster, Namecheap, Cloudflare, dan sebagainya). |
| **DNS** | "Buku telepon" internet yang mengarahkan domain ke alamat server (IP). Diatur di panel registrar. |
| **HTTPS / SSL** | Enkripsi (gembok 🔒 di browser). Cloudflare memberikannya gratis. Di VPS kita pakai Let's Encrypt (juga gratis). |
| **CI/CD** | Otomatisasi: setiap kali Anda `git push`, layanan menjalankan build dan deploy sendiri. |
| **basePath** | Sub-folder tempat website berada. Contoh: `username.github.io/portfolio`, dengan `basePath` = `/portfolio`. |

### Coba hasil build di laptop dulu

Sebelum deploy, selalu cek hasil build secara lokal:

```bash
pnpm build
cd out && python3 -m http.server 4173
# buka http://localhost:4173
```

Kalau tampilannya benar di sini, hasilnya akan sama di host mana pun.

### Environment variable yang dipakai

| Variabel | Kegunaan | Contoh |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Alamat lengkap website, untuk metadata SEO dan preview link | `https://luthfiananda.dev` |
| `NEXT_PUBLIC_BASE_PATH` | Hanya jika situs berada di sub-folder (tidak dipakai sekarang) | `/portfolio` |

---

## 2. Cloudflare (yang dipakai sekarang)

Situs live di **https://lompii.my.id** (dan `portfolio.lompii.my.id`). Domain dibeli di IDwebhost, nameserver-nya diarahkan ke Cloudflare.

Project-nya bertipe **Workers** (static assets), terhubung ke repo GitHub. Konfigurasinya ada di `wrangler.jsonc`: Cloudflare hanya menyajikan folder `out/`.

| Setting (Workers & Pages → project → Settings → Build) | Isi |
|---|---|
| Build command | `pnpm build` |
| Deploy command | `npx wrangler deploy` |
| Variabel build | `NEXT_PUBLIC_SITE_URL`, `NODE_VERSION=22` |

**CI/CD:** setiap `git push` ke `main` otomatis di-build dan di-deploy (±1–2 menit). Branch lain mendapat preview URL. Log build ada di tab **Deployments**.

**Jangan** pakai preset Next.js / `opennextjs-cloudflare`, karena itu untuk Next mode server, sedangkan situs ini static export.

---

## 3. VPS (alternatif) (kontrol penuh)

VPS adalah komputer Linux sewaan (misalnya di DigitalOcean, Vultr, Biznet Gio, atau IDCloudHost). Kita memasang **Nginx** sebagai web server yang menyajikan folder `out/`.

### Persiapan sekali saja (di server, via SSH)

```bash
ssh root@IP_SERVER_ANDA

# Pasang Nginx & Certbot (Ubuntu/Debian)
apt update && apt install -y nginx certbot python3-certbot-nginx

# Folder tempat website
mkdir -p /var/www/portfolio
```

Salin konfigurasi dari repo ini (`deploy/nginx.conf`) ke server:

```bash
# dari laptop
scp deploy/nginx.conf root@IP_SERVER_ANDA:/etc/nginx/sites-available/portfolio

# di server
ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
nano /etc/nginx/sites-available/portfolio   # ganti example.com dengan domain Anda
nginx -t && systemctl reload nginx
```

Arahkan DNS domain Anda (record **A**) ke IP server. Setelah itu aktifkan HTTPS:

```bash
certbot --nginx -d domainanda.com -d www.domainanda.com
```

### Setiap kali update website (dari laptop)

```bash
NEXT_PUBLIC_SITE_URL=https://domainanda.com pnpm build
rsync -avz --delete out/ root@IP_SERVER_ANDA:/var/www/portfolio/
```

`rsync --delete` menyalin hanya file yang berubah dan menghapus file lama yang sudah tidak ada.

> Nanti, langkah ini juga bisa diotomatisasi dengan GitHub Actions (push → build → rsync ke VPS). Kita bahas setelah Anda punya servernya.

---

## 4. Troubleshooting singkat

| Gejala | Kemungkinan penyebab |
|---|---|
| Build gagal dengan `opennextjs-cloudflare` | Build/deploy command salah, lihat bagian 2. |
| `/id` menampilkan 404 di VPS | Konfigurasi `try_files` Nginx tidak dipakai. Cek dengan `nginx -t`. |
| Background hero kosong hanya di `pnpm dev` | Komponen WebGL yang melepas konteksnya saat cleanup akan rusak oleh StrictMode (efek dijalankan dua kali). Komponen di `src/components/reactbits/` sudah di-patch (cari "Local patch"); terapkan patch yang sama bila menambah komponen WebGL baru dari React Bits. |
| Perubahan tidak muncul setelah deploy | Cache browser. Coba hard refresh (⌘⇧R / Ctrl+Shift+R). |
