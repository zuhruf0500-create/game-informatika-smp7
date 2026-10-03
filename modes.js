// Mode latihan 1 pemain, terinspirasi game populer. Nilai TIDAK dikirim ke Google Sheets;
// rekor tertinggi disimpan di perangkat siswa (localStorage).
// Bergantung pada index.html: $, pemain, acak, sfx, musik, tampil, BANK_SOAL.

/* ======================= DATA PER JENJANG ======================= */

// Kelompok istilah: dipakai Jetpack, Fruit Ninja, Pilah, Tetris, Whack-a-Mole, Candy Crush, Tangkap.
const KATEGORI = {
  kelas7: {
    'Perangkat INPUT': ['Keyboard', 'Mouse', 'Scanner', 'Microphone', 'Webcam', 'Joystick', 'Touchpad'],
    'Perangkat OUTPUT': ['Monitor', 'Printer', 'Speaker', 'Proyektor', 'Headphone'],
    'PENYIMPANAN': ['Harddisk', 'SSD', 'Flashdisk', 'DVD', 'Kartu SD'],
    'SOFTWARE': ['Windows', 'Android', 'Ms Word', 'Excel', 'Chrome', 'Linux', 'Antivirus', 'WinRAR'],
  },
  kelas8: {
    'Tag HTML': ['<p>', '<h1>', '<img>', '<a>', '<ul>', '<li>', '<table>', '<br>', '<div>', '<title>', '<body>'],
    'Properti CSS': ['color', 'font-size', 'background-color', 'text-align', 'border', 'margin', 'font-family'],
    'Atribut HTML': ['src', 'href', 'alt', 'width', 'style', 'class', 'id'],
    'BUKAN kode web': ['<photo>', '<gbr>', 'text-size', '<para>', 'font-type', '.docx', '<go>'],
  },
  kelas9: {
    'Aplikasi Presentasi': ['PowerPoint', 'Google Slides', 'Canva', 'Gamma', 'Keynote'],
    'Slide BAIK': ['Poin singkat', 'Huruf 24pt+', 'Kontras jelas', 'Cantumkan sumber', 'Gambar relevan', '2-3 warna', 'Cek fakta AI'],
    'Slide BURUK': ['Paragraf panjang', 'Huruf 8pt', '10 warna', 'Gambar buram', 'Animasi berlebihan', 'Salin AI tanpa cek', 'Kuning di putih'],
  },
};

// Dua kelompok kiri/kanan untuk Temple Run.
const DUA = {
  kelas7: [['HARDWARE', ['Keyboard', 'Mouse', 'Monitor', 'Printer', 'CPU', 'RAM', 'Harddisk', 'Speaker', 'Scanner', 'Webcam', 'Flashdisk', 'Motherboard']],
           ['SOFTWARE', ['Windows', 'Android', 'Ms Word', 'Excel', 'Chrome', 'Linux', 'Antivirus', 'WinRAR', 'Photoshop', 'PowerPoint', 'VLC', 'iOS']]],
  kelas8: [['TAG HTML', ['<p>', '<h1>', '<img>', '<a>', '<ul>', '<li>', '<table>', '<br>', '<div>', '<body>', '<form>', '<title>']],
           ['PROPERTI CSS', ['color', 'font-size', 'background-color', 'text-align', 'border', 'margin', 'padding', 'font-family', 'width', 'height']]],
  kelas9: [['SLIDE BAIK', KATEGORI.kelas9['Slide BAIK'].concat(['Satu ide per slide', 'Latihan dulu'])],
           ['SLIDE BURUK', KATEGORI.kelas9['Slide BURUK'].concat(['Membaca slide terus', 'Data tanpa sumber'])]],
};

// Baik vs berbahaya: Papers, Please & Dino Run.
const AMAN = {
  kelas7: { baikJudul: 'File AMAN', burukJudul: 'File BERBAHAYA',
    baik: ['tugas.docx', 'foto-kelas.jpg', 'lagu.mp3', 'video.mp4', 'nilai.xlsx', 'materi.pdf', 'slide.pptx', 'catatan.txt'],
    buruk: ['hadiah.exe', 'foto.jpg.exe', 'gratis-pulsa.apk', 'crack-game.exe', 'virus.bat', 'klik-ini.scr', 'undian.vbs', 'free-diamond.apk'] },
  kelas8: { baikJudul: 'Kode BENAR', burukJudul: 'Kode ERROR',
    baik: ['<p>Hai</p>', '<b>Tebal</b>', '<h1>Judul</h1>', '<br>', '<li>Item</li>', '<i>Miring</i>', '<hr>', '<img src="a.jpg">'],
    buruk: ['<p>Hai</b>', '<h1>Judul</h2>', '<li>Item</il>', '<photo>', '<p Hai</p>', '<b>Tebal<b>', '<img scr="a.jpg">', '<a hreff="x">'] },
  kelas9: { baikJudul: 'Slide BAIK', burukJudul: 'Slide BURUK', baik: DUA.kelas9[0][1], buruk: DUA.kelas9[1][1] },
};

// Urutan langkah: Stack.
const URUTAN = {
  kelas7: [
    { judul: 'Proses booting', items: ['Tekan tombol power', 'BIOS cek hardware', 'Sistem operasi dimuat', 'Login', 'Desktop siap'] },
    { judul: 'Siklus pengolahan data', items: ['Input', 'Proses', 'Output', 'Penyimpanan'] },
    { judul: 'Satuan data (kecil ke besar)', items: ['bit', 'byte', 'KB', 'MB', 'GB', 'TB'] },
    { judul: 'Mematikan komputer', items: ['Simpan pekerjaan', 'Tutup aplikasi', 'Klik Start', 'Pilih Shut Down'] },
  ],
  kelas8: [
    { judul: 'Struktur dasar HTML', items: ['<!DOCTYPE html>', '<html>', '<head>', '<title>', '</head>', '<body>', '</body>', '</html>'] },
    { judul: 'Membuat web di HP dengan AI', items: ['Tulis prompt ke AI', 'Salin kode', 'Tempel di Acode', 'Simpan index.html', 'Buka di browser'] },
    { judul: 'Daftar berpoin', items: ['<ul>', '<li>Satu</li>', '<li>Dua</li>', '</ul>'] },
    { judul: 'Tabel sederhana', items: ['<table>', '<tr>', '<td>Isi</td>', '</tr>', '</table>'] },
  ],
  kelas9: [
    { judul: 'Membuat presentasi dengan AI', items: ['Tentukan topik', 'Tulis prompt', 'Buat draf AI', 'Cek fakta & sunting', 'Latihan', 'Presentasikan'] },
    { judul: 'Struktur presentasi', items: ['Slide judul', 'Pembuka (hook)', 'Isi', 'Kesimpulan', 'Tanya jawab'] },
    { judul: 'Persiapan tampil', items: ['Cek proyektor', 'Sambung HDMI', 'Buka file', 'Tekan F5', 'Mulai bicara'] },
  ],
};

// Fungsi → barang: Overcooked & Sushi.
const FUNGSI = {
  kelas7: [['Untuk mengetik huruf', 'Keyboard'], ['Menggerakkan pointer', 'Mouse'], ['Menampilkan gambar', 'Monitor'], ['Mencetak dokumen', 'Printer'],
    ['Otak pemroses data', 'CPU'], ['Memori sementara', 'RAM'], ['Penyimpanan permanen', 'Harddisk'], ['Mengeluarkan suara', 'Speaker'],
    ['Memasukkan suara', 'Microphone'], ['Memindai dokumen', 'Scanner'], ['Tampil di layar lebar', 'Proyektor'], ['Menyalurkan listrik', 'PSU'],
    ['Mengolah grafis', 'VGA Card'], ['Merekam video', 'Webcam'], ['Listrik cadangan', 'UPS']],
  kelas8: [['Judul terbesar', '<h1>'], ['Paragraf', '<p>'], ['Menyisipkan gambar', '<img>'], ['Membuat link', '<a>'], ['Daftar berpoin', '<ul>'],
    ['Daftar bernomor', '<ol>'], ['Item daftar', '<li>'], ['Membuat tabel', '<table>'], ['Baris tabel', '<tr>'], ['Sel tabel', '<td>'],
    ['Ganti baris', '<br>'], ['Garis horizontal', '<hr>'], ['Tombol', '<button>'], ['Kotak isian', '<input>'], ['Teks tebal', '<b>']],
  kelas9: [['Efek pindah slide', 'Transisi'], ['Efek gerak objek', 'Animasi'], ['Catatan penyaji', 'Speaker notes'], ['Mulai slideshow', 'F5'],
    ['Tambah slide baru', 'Ctrl + M'], ['Desain seragam semua slide', 'Slide Master'], ['Menyalin format', 'Format Painter'],
    ['Mengatur urutan slide', 'Slide Sorter'], ['Data perbandingan', 'Diagram batang'], ['Data persentase', 'Diagram lingkaran'],
    ['Data tren waktu', 'Diagram garis'], ['AI pembuat slide', 'Gamma'], ['Pindah slide dari jauh', 'Clicker'],
    ['Bagikan tanpa ubah tampilan', 'PDF'], ['Lihat catatan saat tampil', 'Presenter View']],
};

// Tingkatan untuk 2048: gabungkan dua yang sama → naik satu tingkat.
const RANTAI = {
  kelas7: ['bit', 'byte', 'KB', 'MB', 'GB', 'TB', 'PB'],
  kelas8: ['huruf', 'tag', 'elemen', 'halaman', 'website', 'WWW'],
  kelas9: ['kata', 'poin', 'slide', 'bab', 'presentasi', 'juara'],
};

/* ======================= HELPER ======================= */
const pilih1 = a => a[Math.floor(Math.random() * a.length)];
const ambilSoal = () => pilih1(BANK_SOAL[pemain.jj]);
function soalAcak(n = 4) { const [q, ok, ...salah] = ambilSoal(); return { q, ok, pilihan: acak([ok, ...acak(salah).slice(0, n - 1)]) }; }
function pernyataan() { const [q, ok, ...salah] = ambilSoal(); const benar = Math.random() < 0.5; return { q, a: benar ? ok : pilih1(salah), benar }; }
function itemKategori(peluangTarget, target) {
  const data = KATEGORI[pemain.jj], g = Math.random() < peluangTarget ? target : pilih1(Object.keys(data));
  return { label: pilih1(data[g]), g };
}
function tiketPesanan(el, order, sisa, batas) {
  el.innerHTML = '<b>🧾 PESANAN</b>';
  order.forEach(o => { const d = document.createElement('div'); d.className = o.ok ? 'done' : ''; d.textContent = (o.ok ? '☑ ' : '☐ ') + o.d + (o.ok ? ` → ${o.item}` : ''); el.appendChild(d); });
  const bar = document.createElement('div'); bar.className = 'gtbar'; bar.style.width = (sisa / batas * 100) + '%'; el.appendChild(bar);
}

/* ======================= MESIN GAME ======================= */
let game = null, raf = 0;

function mulaiGame(id) {
  stopGame();
  const g = GAMES[id];
  $('scrParty').style.backgroundImage = `url(assets/images/bg_${pemain.jj}.svg)`;
  $('pStage').innerHTML = `<div class="ptop"><span>${g.ikon} ${g.nama}</span><span id="gSkor"></span><span id="gNyawa"></span><span id="gWaktu"></span></div>
    <div class="gtask" id="gTask" style="visibility:hidden"></div><div class="garena" id="gArena"></div><p class="tkhint" id="gHint"></p>`;
  tampil('party');
  game = konteks(id, g);
  g.main(game);
  game.hud();
  game.run();
  musik(`bgm_${pemain.jj}`);
}

function stopGame() {
  if (game) { game.aktif = false; game.stop?.(); }
  cancelAnimationFrame(raf);
  game = null;
}

function keMenu() { stopGame(); renderMenu(); tampil('menu'); musik('bgm_menu'); }
$('pExit').onclick = keMenu;

const kunciRekor = id => `rekor_${id}_${pemain.jj}`;
function bacaRekor(id) { try { return +localStorage.getItem(kunciRekor(id)) || 0; } catch { return 0; } }

function konteks(id, g) {
  const A = $('gArena');
  const c = {
    id, A, skor: 0, nyawa: 3, waktu: g.waktu || 90, aktif: true, keys: new Set(), kebal: 0, pakaiNyawa: true, tahan: false,
    W: () => A.clientWidth,
    H: () => A.clientHeight,
    task(t) { const el = $('gTask'); if (el.textContent !== t) el.textContent = t; el.style.visibility = t ? '' : 'hidden'; },
    hint(t) { $('gHint').textContent = t; },
    hud() {
      $('gSkor').textContent = `Skor ${c.skor}`;
      const n = Math.max(0, c.nyawa);
      $('gNyawa').textContent = c.pakaiNyawa ? '❤️'.repeat(n) + '🖤'.repeat(3 - n) : '';
      $('gWaktu').textContent = `⏱️ ${Math.max(0, Math.ceil(c.waktu))}`;
    },
    tambah(n = 10) { if (!c.aktif) return; c.skor += n; sfx('sfx_benar'); c.hud(); },
    // Kurangi nyawa. Ada jeda kebal singkat agar satu kesalahan tidak terhitung dua kali.
    salah() {
      const now = performance.now();
      if (!c.aktif || now < c.kebal) return false;
      c.kebal = now + 700;
      sfx('sfx_salah');
      A.classList.remove('shake'); void A.offsetWidth; A.classList.add('shake');
      if (c.pakaiNyawa) { c.nyawa--; c.hud(); if (c.nyawa <= 0) c.selesai('💥 NYAWA HABIS!'); }
      return true;
    },
    el(text, cls) { const d = document.createElement('div'); d.className = cls; if (text != null) d.textContent = text; A.appendChild(d); return d; },
    pos(el, x, y) { el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`; },
    box(el, x, y, w, h) { Object.assign(el.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' }); },
    hero(w = 50) { const i = document.createElement('img'); i.src = 'assets/images/hero.svg'; i.className = 'ghero'; i.style.width = w + 'px'; A.appendChild(i); return i; },
    tabrak(a, b, pad = 4) {
      const r = a.getBoundingClientRect(), s = b.getBoundingClientRect();
      return r.left + pad < s.right && r.right - pad > s.left && r.top + pad < s.bottom && r.bottom - pad > s.top;
    },
    xy(e) { const r = A.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; },
    run() {
      let last = performance.now();
      const f = now => {
        if (!c.aktif) return;
        const dt = Math.min(0.05, (now - last) / 1000); last = now;
        const s0 = Math.ceil(c.waktu);
        c.waktu -= dt;
        if (Math.ceil(c.waktu) !== s0) c.hud();
        if (c.waktu <= 0) return c.selesai('⏱️ WAKTU HABIS!');
        c.update?.(dt);
        if (c.aktif) raf = requestAnimationFrame(f);
      };
      raf = requestAnimationFrame(f);
    },
    selesai(judul) {
      if (!c.aktif) return;
      c.aktif = false; cancelAnimationFrame(raf); c.stop?.();
      const rekor = bacaRekor(id), baru = c.skor > rekor;
      if (baru) try { localStorage.setItem(kunciRekor(id), c.skor); } catch {}
      sfx(c.skor > 0 ? 'sfx_menang' : 'sfx_kalah');
      const w = document.createElement('div');
      w.className = 'pwin';
      w.innerHTML = `<h2></h2><p class="score"></p><p></p><button class="btn gold">Main Lagi 🔁</button><button class="btn alt">Pilih Mode Lain</button>`;
      w.querySelector('h2').textContent = judul;
      w.querySelector('.score').textContent = c.skor;
      w.querySelector('p:not(.score)').textContent = baru && c.skor > 0 ? '🎉 REKOR BARU!' : `Rekor kamu: ${Math.max(rekor, c.skor)}`;
      const [lagi, menu] = w.querySelectorAll('button');
      lagi.onclick = () => mulaiGame(id);
      menu.onclick = keMenu;
      $('pStage').appendChild(w);
    },
  };

  // Input sentuh/mouse: onTap (saat ditekan), onDrag, onSwipe / onKlik (saat dilepas), onUp.
  let sx = 0, sy = 0;
  A.onpointerdown = e => { [sx, sy] = c.xy(e); c.tahan = true; c.onTap?.(sx, sy, e); };
  A.onpointermove = e => { if (e.buttons) { const [x, y] = c.xy(e); c.onDrag?.(x, y, x - sx, y - sy); } };
  A.onpointerup = e => {
    c.tahan = false;
    const [x, y] = c.xy(e), dx = x - sx, dy = y - sy;
    if (Math.max(Math.abs(dx), Math.abs(dy)) > 30) c.onSwipe?.(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'kanan' : 'kiri') : (dy > 0 ? 'bawah' : 'atas'));
    else c.onKlik?.(x, y, e);
    c.onUp?.(dx, dy);
  };
  A.onpointerleave = A.onpointercancel = () => { c.tahan = false; };
  return c;
}

document.addEventListener('keydown', e => {
  if (!game?.aktif) return;
  if ([' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) e.preventDefault();
  if (e.repeat) return;
  game.keys.add(e.key);
  game.onKey?.(e.key, true);
});
document.addEventListener('keyup', e => { if (!game) return; game.keys.delete(e.key); game.onKey?.(e.key, false); });

function renderMenu() {
  const box = $('gameList');
  box.innerHTML = '';
  // Mode khusus jenjang tampil paling atas, dan hanya untuk kelas yang sesuai.
  const ids = Object.keys(GAMES).filter(id => !GAMES[id].jenjang || GAMES[id].jenjang === pemain.jj)
    .sort((a, b) => !!GAMES[b].jenjang - !!GAMES[a].jenjang);
  for (const id of ids) {
    const g = GAMES[id], rekor = bacaRekor(id);
    const b = document.createElement('button');
    b.className = 'mode';
    b.innerHTML = '<b></b><span></span><br><span class="tag"></span>';
    b.querySelector('b').textContent = `${g.ikon} ${g.nama}`;
    b.querySelector('span').textContent = g.desc;
    const tag = b.querySelector('.tag');
    tag.textContent = (g.jenjang ? `⭐ Khusus ${MATERI[pemain.jj].judul}` : '') + (rekor ? ` · Rekor ${rekor}` : g.jenjang ? '' : 'Baru');
    if (g.jenjang) tag.classList.add('khusus');
    b.onclick = () => mulaiGame(id);
    box.appendChild(b);
  }
}

/* ======================= GAME ======================= */
const lompatKey = k => k === ' ' || k === 'ArrowUp';

const GAMES = {
  flappy: {
    ikon: '🐦', nama: 'Flappy Byte', desc: 'Tap untuk terbang, lewati celah berisi jawaban benar.',
    main(c) {
      const hero = c.hero(40);
      let y = c.H() / 2, vy = 0, w = null;
      const naik = () => { vy = -330; };
      c.onTap = naik;
      c.onKey = (k, d) => { if (d && lompatKey(k)) naik(); };
      c.hint('Tap layar / Spasi untuk terbang');
      function baru() {
        const H = c.H(), s = soalAcak(2), gy = [H * 0.3, H * 0.72], gh = Math.min(140, H * 0.3);
        const parts = [[0, gy[0] - gh / 2], [gy[0] + gh / 2, gy[1] - gh / 2], [gy[1] + gh / 2, H]]
          .map(([a, b]) => { const p = c.el(null, 'gpillar'); c.box(p, 0, a, 56, b - a); return p; });
        c.task(s.q);
        w = { x: c.W() + 60, gy, gh, s, parts, labels: s.pilihan.map(o => c.el(o, 'gitem')), done: false };
      }
      c.update = dt => {
        const H = c.H(), X = c.W() * 0.22;
        vy += 950 * dt; y += vy * dt;
        if (y < 15) { y = 15; vy = 0; }
        if (y > H - 15) { y = H / 2; vy = -250; c.salah(); }
        hero.style.transform = `translate(${X}px, ${y}px) translate(-50%, -50%) rotate(${Math.max(-25, Math.min(50, vy / 8))}deg)`;
        if (!w) baru();
        w.x -= 150 * dt;
        w.parts.forEach(p => { p.style.left = (w.x - 28) + 'px'; });
        w.labels.forEach((l, i) => c.pos(l, w.x, w.gy[i]));
        if (!w.done && w.x <= X) {
          w.done = true;
          const i = w.gy.findIndex(g => Math.abs(y - g) < w.gh / 2), bi = w.s.pilihan.indexOf(w.s.ok);
          w.labels[bi].classList.add('ok');
          if (i === bi) c.tambah(10);
          else { if (i >= 0) w.labels[i].classList.add('no'); c.salah(); }
        }
        if (w.x < -120) { [...w.parts, ...w.labels].forEach(e => e.remove()); w = null; }
      };
    },
  },

  geometry: {
    ikon: '🔺', nama: 'Geometry Dash', desc: 'Lompati duri. Di gerbang kuning: lompat jika pernyataan BENAR.',
    main(c) {
      const hero = c.hero(36), lantai = c.el(null, 'gground');
      let h = 0, vy = 0, obj = [], jeda = 1.5, keGerbang = 4;
      const lompat = () => { if (h === 0) vy = 640; };
      c.onTap = lompat;
      c.onKey = (k, d) => { if (d && lompatKey(k)) lompat(); };
      c.hint('Tap / Spasi = lompat. Gerbang: pernyataan BENAR = lompat, SALAH = tetap di tanah');
      c.task('Bersiap... lompati duri merah!');
      c.update = dt => {
        const W = c.W(), H = c.H(), G = H - 40, X = W * 0.2;
        c.box(lantai, 0, G, W, 40);
        vy -= 1700 * dt; h += vy * dt;
        if (h <= 0) { h = 0; vy = 0; }
        c.pos(hero, X, G - h - hero.clientHeight / 2);
        jeda -= dt; keGerbang -= dt;
        if (jeda <= 0) {
          if (keGerbang <= 0) {
            const st = pernyataan();
            c.task(`BENAR atau SALAH?  ${st.q} ➜ ${st.a}`);
            obj.push({ jenis: 'gerbang', x: W + 20, el: c.el(null, 'ggate'), st });
            keGerbang = 6 + Math.random() * 2; jeda = 2.2;
          } else {
            obj.push({ jenis: 'duri', x: W + 20, el: c.el(null, 'gspike') });
            jeda = 0.8 + Math.random() * 0.8;
          }
        }
        for (const o of obj) {
          o.x -= 260 * dt;
          if (o.jenis === 'duri') {
            c.pos(o.el, o.x, G - 15);
            if (!o.done && Math.abs(o.x - X) < 20 && h < 26) { o.done = true; c.salah(); }
          } else {
            c.box(o.el, o.x - 7, 0, 14, G);
            if (!o.done && o.x <= X) {
              o.done = true;
              const tepat = (h > 30) === o.st.benar;
              o.el.classList.add(tepat ? 'ok' : 'no');
              if (tepat) c.tambah(20); else c.salah();
              c.task(o.st.benar ? '✅ Pernyataan tadi BENAR' : '❌ Pernyataan tadi SALAH');
            }
          }
        }
        obj = obj.filter(o => o.x > -40 || (o.el.remove(), false));
      };
    },
  },

  subway: {
    ikon: '🚇', nama: 'Lari 3 Jalur', desc: 'Pindah ke jalur berisi jawaban benar (ala Subway Surfers).',
    main(c) {
      const hero = c.hero(50);
      c.A.classList.add('glanes');
      let lane = 1, hx = null, row = null, t = 0;
      const geser = d => { lane = Math.max(0, Math.min(2, lane + d)); };
      c.onSwipe = d => { if (d === 'kiri') geser(-1); if (d === 'kanan') geser(1); };
      c.onKlik = x => { lane = Math.min(2, Math.floor(x / (c.W() / 3))); };
      c.onKey = (k, d) => { if (d && k === 'ArrowLeft') geser(-1); if (d && k === 'ArrowRight') geser(1); };
      c.hint('Tap jalur / geser kiri-kanan / tombol ← →');
      c.update = dt => {
        t += dt;
        const W = c.W(), H = c.H(), lx = i => W * (2 * i + 1) / 6, Y = H - 60;
        hx = hx === null ? lx(lane) : hx + (lx(lane) - hx) * Math.min(1, dt * 14);
        c.pos(hero, hx, Y);
        if (!row) {
          const s = soalAcak(3);
          c.task(s.q);
          row = { y: -40, s, done: false, els: s.pilihan.map(o => { const e = c.el(o, 'gitem'); e.style.width = (W / 3 - 14) + 'px'; e.style.maxWidth = 'none'; return e; }) };
        }
        row.y += (110 + t * 1.5) * dt;
        row.els.forEach((e, i) => c.pos(e, lx(i), row.y));
        if (!row.done && row.y >= Y - 30) {
          row.done = true;
          const bi = row.s.pilihan.indexOf(row.s.ok);
          row.els[bi].classList.add('ok');
          if (lane === bi) c.tambah(10); else { row.els[lane].classList.add('no'); c.salah(); }
        }
        if (row.y > H + 60) { row.els.forEach(e => e.remove()); row = null; }
      };
    },
  },

  temple: {
    ikon: '🏛️', nama: 'Temple Run', desc: 'Lempar benda ke kiri atau kanan sesuai kelompoknya.',
    main(c) {
      const [[kiriJ, kiriL], [kananJ, kananL]] = DUA[pemain.jj];
      const hero = c.hero(50);
      c.el('⬅ ' + kiriJ, 'gside').style.left = '10px';
      c.el(kananJ + ' ➡', 'gside').style.right = '10px';
      let it = null, t = 0;
      const putus = arah => {
        if (!it || it.done) return;
        it.done = true;
        it.vx = arah === 'kiri' ? -900 : 900;
        if ((arah === 'kiri') === it.kiri) c.tambah(10);
        else { it.el.classList.add('no'); c.salah(); c.task(`"${it.el.textContent}" termasuk ${it.kiri ? kiriJ : kananJ}`); }
      };
      c.onSwipe = d => { if (d === 'kiri' || d === 'kanan') putus(d); };
      c.onKlik = x => putus(x < c.W() / 2 ? 'kiri' : 'kanan');
      c.onKey = (k, d) => { if (d && k === 'ArrowLeft') putus('kiri'); if (d && k === 'ArrowRight') putus('kanan'); };
      c.task(`Kiri = ${kiriJ} · Kanan = ${kananJ}`);
      c.hint('Tap sisi kiri/kanan, geser, atau tombol ← →');
      c.update = dt => {
        t += dt;
        const W = c.W(), H = c.H(), Y = H - 80;
        c.pos(hero, W / 2, Y);
        if (!it) {
          const kiri = Math.random() < 0.5;
          it = { kiri, el: c.el(pilih1(kiri ? kiriL : kananL), 'gitem big'), x: W / 2, y: -20, vx: 0, done: false };
        }
        if (it.done) it.x += it.vx * dt; else it.y += (90 + t * 2) * dt;
        c.pos(it.el, it.x, it.y);
        if (!it.done && it.y > Y - 60) {
          it.done = true; c.salah();
          c.task(`Terlambat! "${it.el.textContent}" termasuk ${it.kiri ? kiriJ : kananJ}`);
          it.y = H + 100;
        }
        if (it.x < -200 || it.x > W + 200 || it.y > H + 50) { it.el.remove(); it = null; }
      };
    },
  },

  crossy: {
    ikon: '🐔', nama: 'Crossy Road', desc: 'Lompat ke papan berisi jawaban benar saat lewat di depanmu.',
    main(c) {
      const hero = c.hero(44), air = c.el(null, 'gwater');
      let lane = null, t = 0, hop = 0;
      function baru() {
        lane?.els.forEach(e => e.remove());
        const s = soalAcak(3);
        c.task(s.q);
        lane = { s, base: Math.random() * c.W(), arah: Math.random() < 0.5 ? 1 : -1, v: 60 + t * 1.2, xs: [], ganti: null,
                 els: s.pilihan.map(o => c.el(o, 'gitem glog')) };
      }
      const loncat = () => {
        if (hop > 0 || !lane || lane.ganti !== null) return;
        hop = 0.35;
        const tw = lane.els[0].offsetWidth, i = lane.xs.findIndex(x => Math.abs(x - c.W() / 2) < tw / 2);
        if (i < 0) { c.salah(); c.task('💦 Tercebur! Tunggu papan lewat. ' + lane.s.q); return; }
        const bi = lane.s.pilihan.indexOf(lane.s.ok);
        lane.els[bi].classList.add('ok');
        if (i === bi) c.tambah(10); else { lane.els[i].classList.add('no'); c.salah(); }
        lane.ganti = 0.7;
      };
      c.onTap = loncat;
      c.onKey = (k, d) => { if (d && lompatKey(k)) loncat(); };
      c.hint('Tap / Spasi untuk melompat saat papan yang benar ada di depanmu');
      c.update = dt => {
        t += dt;
        if (!lane) baru();
        const W = c.W(), H = c.H(), LY = H * 0.4, tw = Math.min(170, W * 0.3), span = W + tw;
        c.box(air, 0, LY - 36, W, 72);
        lane.base += lane.arah * lane.v * dt;
        lane.xs = lane.els.map((e, i) => {
          const x = (((lane.base + i * span / 3) % span) + span) % span - tw / 2;
          e.style.width = tw + 'px';
          c.pos(e, x, LY);
          return x;
        });
        if (hop > 0) hop -= dt;
        const p = hop > 0 ? 1 - hop / 0.35 : 0;
        c.pos(hero, W / 2, H - 50 - Math.sin(Math.PI * p) * (H - 50 - LY));
        if (lane.ganti !== null && (lane.ganti -= dt) <= 0) baru();
      };
    },
  },

  stack: {
    ikon: '🧱', nama: 'Stack', desc: 'Jatuhkan blok berisi langkah yang benar, susun dari bawah ke atas.',
    main(c) {
      let seq, idx, tumpuk, blok = null, lbl, x = 0, arah = 1, bh, jeda = 0;
      function ganti() {
        const sisa = seq.items.slice(idx);
        lbl = sisa.length === 1 || Math.random() < 0.45 ? sisa[0] : pilih1(sisa.slice(1));
        blok.textContent = lbl;
      }
      function baru() {
        c.A.querySelectorAll('.gblock').forEach(e => e.remove());
        seq = pilih1(URUTAN[pemain.jj]); idx = 0;
        const W = c.W(), H = c.H(), w0 = Math.min(W * 0.7, 340);
        bh = Math.min(38, (H - 70) / (seq.items.length + 2.5));
        tumpuk = [{ x: (W - w0) / 2, w: w0 }];
        c.box(c.el('FONDASI', 'gblock base'), tumpuk[0].x, H - bh, w0, bh);
        c.task(`Susun dari BAWAH ke ATAS: ${seq.judul}`);
        blok = c.el('', 'gblock gerak'); x = 0; arah = 1;
        ganti();
      }
      const jatuh = () => {
        if (!blok) return;
        const atas = tumpuk[tumpuk.length - 1], w = atas.w;
        if (lbl !== seq.items[idx]) { c.salah(); c.task(`❌ Belum giliran "${lbl}". ${seq.judul}`); ganti(); return; }
        let L = Math.max(x, atas.x), R = Math.min(x + w, atas.x + atas.w);
        if (R - L < w * 0.35) { c.salah(); c.task('Meleset! Jatuhkan saat posisinya pas di atas tumpukan.'); return; }
        if (R - L > w * 0.75) { L = atas.x; R = atas.x + atas.w; }   // hampir pas dianggap pas
        c.box(c.el(lbl, 'gblock'), L, c.H() - bh * (tumpuk.length + 1), R - L, bh);
        tumpuk.push({ x: L, w: R - L }); idx++;
        c.tambah(10);
        if (idx === seq.items.length) { c.tambah(30); c.task(`✅ ${seq.judul} — SELESAI!`); blok.remove(); blok = null; }
        else { c.task(`Susun dari BAWAH ke ATAS: ${seq.judul}`); ganti(); }
      };
      c.onTap = jatuh;
      c.onKey = (k, d) => { if (d && (k === ' ' || k === 'ArrowDown')) jatuh(); };
      c.hint('Tap / Spasi saat blok kuning berisi langkah berikutnya DAN posisinya pas');
      baru();
      c.update = dt => {
        if (!blok) { if ((jeda += dt) > 1.3) { jeda = 0; baru(); } return; }
        const W = c.W(), H = c.H(), w = tumpuk[tumpuk.length - 1].w;
        x += arah * (110 + idx * 12) * dt;
        if (x < 0) { x = 0; arah = 1; ganti(); }
        if (x + w > W) { x = W - w; arah = -1; ganti(); }
        c.box(blok, x, H - bh * (tumpuk.length + 2.3), w, bh);
      };
    },
  },

  doodle: {
    ikon: '🦘', nama: 'Doodle Jump', desc: 'Memantul ke atas, mendarat di pijakan berisi jawaban benar.',
    main(c) {
      const hero = c.hero(38);
      let px = c.W() / 2, py = c.H() - 40, vy = -700, plats = [], topY, n = 0, target = null;
      const lantai = y => plats.push({ x: 0, y, w: c.W(), el: c.el(null, 'gplat') });
      function baris(y) {
        const W = c.W();
        if (n++ % 2 === 0) { const w = 90; plats.push({ x: Math.random() * (W - w), y, w, el: c.el(null, 'gplat') }); }
        else {
          const s = soalAcak(3), row = { s, dijawab: false };
          s.pilihan.forEach((o, i) => plats.push({ x: i * W / 3 + 5, y, w: W / 3 - 10, el: c.el(o, 'gplat soal'), row, label: o }));
        }
        topY = y;
      }
      const isi = () => { while (topY > -120) baris(topY - 110); };
      lantai(c.H() - 20); topY = c.H() - 20; isi();
      c.onTap = x => { target = x; };
      c.onDrag = x => { target = x; };
      c.onUp = () => { target = null; };
      c.hint('Tahan & geser jari ke kiri/kanan, atau tombol ← →');
      c.update = dt => {
        const W = c.W(), H = c.H();
        if (c.keys.has('ArrowLeft')) px -= 320 * dt;
        if (c.keys.has('ArrowRight')) px += 320 * dt;
        if (target !== null) px += Math.max(-420 * dt, Math.min(420 * dt, target - px));
        if (px < 0) px += W;
        if (px > W) px -= W;
        const yLama = py;
        vy += 1400 * dt; py += vy * dt;
        if (vy > 0) for (const p of plats) {
          if (p.pecah || !(yLama <= p.y && py >= p.y && px > p.x - 10 && px < p.x + p.w + 10)) continue;
          if (p.row && !p.row.dijawab) {
            p.row.dijawab = true;
            plats.filter(q => q.row === p.row).forEach(q => {
              if (q.label === q.row.s.ok) q.el.classList.add('ok'); else { q.pecah = true; q.el.classList.add('pecah'); }
            });
            if (p.label === p.row.s.ok) c.tambah(10); else c.salah();   // pijakan salah pecah setelah dipijak
          }
          py = p.y; vy = -700;
          break;
        }
        if (py < H * 0.45) { const d = H * 0.45 - py; py += d; topY += d; plats.forEach(p => { p.y += d; }); }
        isi();
        if (py > H + 60) {
          c.salah();
          plats.forEach(p => p.el.remove()); plats = [];
          lantai(H - 20); topY = H - 20; isi();
          py = H - 40; vy = -700;
        }
        plats = plats.filter(p => p.y < H + 40 || (p.el.remove(), false));
        plats.forEach(p => { Object.assign(p.el.style, { left: p.x + 'px', top: p.y + 'px', width: p.w + 'px' }); });
        c.pos(hero, px, py - hero.clientHeight / 2);
        const next = plats.filter(p => p.row && !p.row.dijawab && p.y < py).sort((a, b) => b.y - a.y)[0];
        c.task(next ? next.row.s.q : 'Lompat terus ke atas!');
      };
    },
  },

  dino: {
    ikon: '🦖', nama: 'Dino Run', desc: 'Lompati yang berbahaya, tabrak (ambil) yang aman.',
    main(c) {
      const D = AMAN[pemain.jj], hero = c.hero(40), lantai = c.el(null, 'gground');
      let h = 0, vy = 0, obj = [], jeda = 1, t = 0;
      const lompat = () => { if (h === 0) vy = 700; };
      c.onTap = lompat;
      c.onKey = (k, d) => { if (d && lompatKey(k)) lompat(); };
      c.task(`LOMPATI: ${D.burukJudul} · AMBIL: ${D.baikJudul}`);
      c.hint('Tap / Spasi = lompat. Jangan lompat kalau bendanya aman!');
      c.update = dt => {
        t += dt;
        const W = c.W(), H = c.H(), G = H - 40, X = W * 0.18, v = 210 + t * 2;
        c.box(lantai, 0, G, W, 40);
        vy -= 1700 * dt; h += vy * dt;
        if (h <= 0) { h = 0; vy = 0; }
        c.pos(hero, X, G - h - hero.clientHeight / 2);
        if ((jeda -= dt) <= 0) {
          const baik = Math.random() < 0.45;
          obj.push({ baik, el: c.el(pilih1(baik ? D.baik : D.buruk), 'gitem'), x: W + 100 });
          jeda = 1.3 + Math.random() * 0.9 - Math.min(0.4, t / 200);
        }
        for (const o of obj) {
          o.x -= v * dt;
          const ow = o.el.offsetWidth, oh = o.el.offsetHeight;
          c.pos(o.el, o.x, G - oh / 2);
          if (!o.done && Math.abs(o.x - X) < ow / 2 + 10 && h < oh - 4) {
            o.done = true;
            if (o.baik) { c.tambah(10); o.el.classList.add('ok'); }
            else { c.salah(); o.el.classList.add('no'); c.task(`Awas! "${o.el.textContent}" = ${D.burukJudul}. Lompati!`); }
          }
          if (!o.done && o.x < X - ow / 2 - 12) {
            o.done = true;
            if (o.baik) c.task(`Sayang! "${o.el.textContent}" itu ${D.baikJudul}, harusnya diambil.`); else c.tambah(5);
          }
        }
        obj = obj.filter(o => o.x > -200 || (o.el.remove(), false));
      };
    },
  },

  jetpack: {
    ikon: '🚀', nama: 'Jetpack Joyride', desc: 'Tahan untuk terbang, kumpulkan yang sesuai kategori.',
    main(c) {
      const grup = Object.keys(KATEGORI[pemain.jj]), hero = c.hero(40);
      let y = c.H() / 2, vy = 0, obj = [], jeda = 0, ti = 0, gantiT = 0, target;
      const ganti = () => { target = grup[ti++ % grup.length]; c.task(`Kumpulkan: ${target} · hindari yang lain`); };
      ganti();
      c.hint('Tahan layar / Spasi untuk naik, lepas untuk turun');
      c.update = dt => {
        const W = c.W(), H = c.H(), X = W * 0.2;
        const naik = c.tahan || c.keys.has(' ') || c.keys.has('ArrowUp');
        vy = Math.max(-420, Math.min(420, vy + (naik ? -1300 : 1100) * dt));
        y += vy * dt;
        if (y < 30) { y = 30; vy = 0; }
        if (y > H - 30) { y = H - 30; vy = 0; }
        c.pos(hero, X, y);
        if ((gantiT += dt) > 20) { gantiT = 0; ganti(); }
        if ((jeda -= dt) <= 0) {
          const it = itemKategori(0.45, target);
          obj.push({ ...it, el: c.el(it.label, 'gitem'), x: W + 80, y: 30 + Math.random() * (H - 60) });
          jeda = 0.8;
        }
        for (const o of obj) {
          o.x -= 230 * dt;
          c.pos(o.el, o.x, o.y);
          if (!o.done && c.tabrak(hero, o.el, 8)) {
            o.done = true; o.x = -999;
            if (o.g === target) c.tambah(10); else { c.salah(); c.task(`"${o.label}" bukan ${target}. Kumpulkan: ${target}`); }
          }
        }
        obj = obj.filter(o => o.x > -200 || (o.el.remove(), false));
      };
    },
  },

  helix: {
    ikon: '🌀', nama: 'Helix Jump', desc: 'Geser papan agar bola jatuh lewat lubang jawaban benar.',
    main(c) {
      const papan = c.el(null, 'gbar'), bola = c.el(null, 'gball'), legenda = c.el(null, 'glegend');
      let s, holes = [], o = 0, o0 = 0, y = 0, vy = 0;
      function baru() {
        holes.forEach(e => e.remove());
        s = soalAcak(4); c.task(s.q);
        holes = s.pilihan.map((p, i) => c.el('ABCD'[i], 'ghole'));
        legenda.textContent = s.pilihan.map((p, i) => `${'ABCD'[i]}. ${p}`).join('\n');
        o = 0; y = c.H() * 0.12; vy = 0;
      }
      baru();
      c.onTap = () => { o0 = o; };
      c.onDrag = (x, y_, dx) => { o = o0 + dx; };
      c.hint('Geser papan ungu kiri/kanan (jari / tombol ← →)');
      c.update = dt => {
        const W = c.W(), H = c.H(), PY = H * 0.62, hw = W / 4 * 0.62, bx = W / 2;
        if (c.keys.has('ArrowLeft')) o -= 260 * dt;
        if (c.keys.has('ArrowRight')) o += 260 * dt;
        c.box(papan, 0, PY, W, 30);
        legenda.style.top = (PY + 40) + 'px';
        const hx = holes.map((e, i) => {
          const x = ((o + i * W / 4 + W / 8) % W + W) % W;
          e.style.width = hw + 'px';
          c.pos(e, x, PY + 15);
          return x;
        });
        const yLama = y;
        vy += 1200 * dt; y += vy * dt;
        if (yLama < PY - 13 && y >= PY - 13) {
          const i = hx.findIndex(x => Math.abs(x - bx) < hw / 2 - 4);
          if (i < 0) { y = PY - 13; vy = -Math.sqrt(2 * 1200 * (PY - H * 0.12)); }
          else {
            const bi = s.pilihan.indexOf(s.ok);
            holes[bi].classList.add('ok');
            if (i === bi) c.tambah(10); else { holes[i].classList.add('no'); c.salah(); }
          }
        }
        c.pos(bola, bx, y);
        if (y > H + 30) baru();
      };
    },
  },

  fruit: {
    ikon: '🍉', nama: 'Fruit Ninja', desc: 'Tebas yang sesuai kategori, hindari "bom".',
    main(c) {
      const grup = Object.keys(KATEGORI[pemain.jj]);
      let target, ti = 0, gantiT = 0, obj = [], jeda = 0.5;
      const ganti = () => { target = grup[ti++ % grup.length]; c.task(`Tebas: ${target} · lainnya = BOM 💣`); };
      ganti();
      c.hint('Usap / tap benda yang melayang untuk menebas');
      const tebas = (x, y) => {
        const r = c.A.getBoundingClientRect();
        for (const o of obj) {
          if (o.cut) continue;
          const b = o.el.getBoundingClientRect();
          if (x + r.left >= b.left - 6 && x + r.left <= b.right + 6 && y + r.top >= b.top - 6 && y + r.top <= b.bottom + 6) {
            o.cut = true;
            o.el.classList.add(o.g === target ? 'ok' : 'no', 'cut');
            if (o.g === target) c.tambah(10); else { c.salah(); c.task(`💣 "${o.label}" bukan ${target}!`); }
          }
        }
      };
      c.onTap = tebas;
      c.onDrag = tebas;
      c.update = dt => {
        const W = c.W(), H = c.H(), G = 900;
        if ((gantiT += dt) > 20) { gantiT = 0; ganti(); }
        if ((jeda -= dt) <= 0) {
          const it = itemKategori(0.5, target), x = W * (0.15 + Math.random() * 0.7);
          obj.push({ ...it, el: c.el(it.label, 'gitem'), x, y: H + 20, vx: (W / 2 - x) * (0.2 + Math.random() * 0.4),
                     vy: -Math.sqrt(2 * G * H * (0.55 + Math.random() * 0.3)) });
          jeda = 0.9;
        }
        for (const o of obj) { o.vy += G * dt; o.x += o.vx * dt; o.y += o.vy * dt; c.pos(o.el, o.x, o.y); }
        obj = obj.filter(o => o.vy < 0 || o.y < H + 60 || (o.el.remove(), false));
      };
    },
  },

  papers: {
    ikon: '🛂', nama: 'Papers, Please', desc: 'Periksa dokumen satu per satu: izinkan atau tolak.',
    main(c) {
      const D = AMAN[pemain.jj], doc = c.el(null, 'gcard'), bar = c.el(null, 'gtimer'), tombol = c.el(null, 'gbtns');
      tombol.innerHTML = '<button style="background:#dc2626">⛔ TOLAK</button><button style="background:#16a34a">✅ IZINKAN</button>';
      const [bT, bI] = tombol.querySelectorAll('button');
      let it, sisa = 0, batas = 1, n = 0, jeda = 0;
      function baru() {
        const baik = Math.random() < 0.5;
        it = { baik, label: pilih1(baik ? D.baik : D.buruk) };
        n++;
        doc.className = 'gcard';
        doc.innerHTML = '<small></small><big></big>';
        doc.querySelector('small').textContent = `📄 DOKUMEN #${n}`;
        doc.querySelector('big').textContent = it.label;
        batas = sisa = Math.max(3, 7 - n * 0.15);
      }
      const putus = izin => {
        if (jeda > 0) return;
        const tepat = izin === it.baik;
        doc.classList.add(tepat ? 'stamp-ok' : 'stamp-no');
        if (tepat) c.tambah(10); else { c.salah(); c.task(`"${it.label}" = ${it.baik ? D.baikJudul : D.burukJudul}`); }
        jeda = 0.7;
      };
      bT.onclick = () => putus(false);
      bI.onclick = () => putus(true);
      c.onSwipe = d => { if (d === 'kanan') putus(true); if (d === 'kiri') putus(false); };
      c.onKey = (k, d) => { if (d && k === 'ArrowRight') putus(true); if (d && k === 'ArrowLeft') putus(false); };
      c.task(`IZINKAN: ${D.baikJudul} · TOLAK: ${D.burukJudul}`);
      c.hint('Tombol / geser kanan = izinkan, kiri = tolak. Makin lama makin cepat!');
      baru();
      c.update = dt => {
        if (jeda > 0) { if ((jeda -= dt) <= 0) baru(); return; }
        sisa -= dt;
        bar.style.width = (sisa / batas * 100) + '%';
        if (sisa <= 0) { c.salah(); doc.classList.add('stamp-no'); c.task('⏱️ Terlalu lama memeriksa!'); jeda = 0.7; }
      };
    },
  },

  reigns: {
    ikon: '👑', nama: 'Swipe Benar/Salah', desc: 'Geser kartu: kanan = BENAR, kiri = SALAH (ala Reigns).',
    main(c) {
      const card = c.el(null, 'gcard'), bar = c.el(null, 'gtimer'), tombol = c.el(null, 'gbtns');
      tombol.innerHTML = '<button style="background:#dc2626">❌ SALAH</button><button style="background:#16a34a">✅ BENAR</button>';
      const [bS, bB] = tombol.querySelectorAll('button');
      let st, sisa = 10, jeda = 0;
      function baru() {
        st = pernyataan();
        card.className = 'gcard';
        card.style.transform = '';
        card.innerHTML = '<small></small><big></big>';
        card.querySelector('small').textContent = st.q;
        card.querySelector('big').textContent = '➜ ' + st.a;
        sisa = 10;
        c.task('Pernyataan ini BENAR atau SALAH?');
      }
      const putus = jawab => {
        if (jeda > 0) return;
        const tepat = jawab === st.benar;
        card.classList.add(tepat ? 'stamp-ok' : 'stamp-no');
        card.style.transform = `translateX(${jawab ? 140 : -140}px) rotate(${jawab ? 14 : -14}deg)`;
        if (tepat) c.tambah(10); else c.salah();
        c.task(st.benar ? '✅ Pernyataan tadi BENAR' : `❌ Pernyataan tadi SALAH. Jawaban benar: ${BANK_SOAL[pemain.jj].find(r => r[0] === st.q)[1]}`);
        jeda = 1.4;
      };
      bS.onclick = () => putus(false);
      bB.onclick = () => putus(true);
      c.onDrag = (x, y, dx) => { if (jeda <= 0) card.style.transform = `translateX(${dx}px) rotate(${dx / 12}deg)`; };
      c.onUp = dx => { if (jeda > 0) return; if (Math.abs(dx) > 70) putus(dx > 0); else card.style.transform = ''; };
      c.onKey = (k, d) => { if (d && k === 'ArrowRight') putus(true); if (d && k === 'ArrowLeft') putus(false); };
      c.hint('Geser kartu / tombol / tombol ← →');
      baru();
      c.update = dt => {
        if (jeda > 0) { if ((jeda -= dt) <= 0) baru(); return; }
        sisa -= dt;
        bar.style.width = (sisa / 10 * 100) + '%';
        if (sisa <= 0) { c.salah(); card.classList.add('stamp-no'); c.task('⏱️ Terlalu lama!'); jeda = 1; }
      };
    },
  },

  overcooked: {
    ikon: '🧑‍🍳', nama: 'Overcooked: Pesanan', desc: 'Baca fungsi di pesanan, ambil barang yang tepat dari rak.',
    main(c) {
      const F = FUNGSI[pemain.jj], tiket = c.el(null, 'gticket'), rak = c.el(null, 'ggrid rak'), batas = 20;
      let order, sisa;
      function baru() {
        order = acak(F).slice(0, 3).map(([d, item]) => ({ d, item, ok: false }));
        const lain = acak(F.filter(f => !order.some(o => o.item === f[1]))).slice(0, 9).map(f => f[1]);
        rak.innerHTML = '';
        acak([...order.map(o => o.item), ...lain]).forEach(item => {
          const b = document.createElement('button');
          b.textContent = item;
          b.onclick = () => pilihBarang(item, b);
          rak.appendChild(b);
        });
        sisa = batas;
        tiketPesanan(tiket, order, sisa, batas);
      }
      function pilihBarang(item, b) {
        const o = order.find(o => !o.ok && o.item === item);
        if (!o) { b.classList.add('no'); c.salah(); return; }
        o.ok = true; b.disabled = true; b.classList.add('ok');
        c.tambah(5);
        tiketPesanan(tiket, order, sisa, batas);
        if (order.every(o => o.ok)) { c.tambah(25); baru(); }
      }
      c.task('Baca FUNGSI di pesanan, lalu ambil barang yang tepat dari rak!');
      c.hint('Pesanan selesai = +40. Waktu tiap pesanan 20 detik.');
      baru();
      c.update = dt => {
        sisa -= dt;
        const bar = tiket.querySelector('.gtbar');
        if (bar) bar.style.width = (sisa / batas * 100) + '%';
        if (sisa <= 0) { c.salah(); baru(); }
      };
    },
  },

  pilah: {
    ikon: '🗑️', nama: 'Pilah ke Tong', desc: 'Masukkan benda ke tong kategori yang benar.',
    main(c) {
      const data = KATEGORI[pemain.jj], grup = Object.keys(data), tong = c.el(null, 'gbins');
      let it = null, t = 0;
      const masuk = i => {
        if (!it || it.done) return;
        it.done = true; it.tujuan = i;
        const tepat = grup[i] === it.g;
        it.el.classList.add(tepat ? 'ok' : 'no');
        if (tepat) c.tambah(10); else { c.salah(); c.task(`"${it.label}" termasuk ${it.g}`); }
      };
      grup.forEach((g, i) => { const b = document.createElement('button'); b.textContent = `${i + 1}. ${g}`; b.onclick = () => masuk(i); tong.appendChild(b); });
      c.onKey = (k, d) => { if (d && +k >= 1 && +k <= grup.length) masuk(+k - 1); };
      c.task('Tap tong yang sesuai sebelum benda jatuh!');
      c.hint(`Tap tong, atau tombol angka 1–${grup.length}`);
      c.update = dt => {
        t += dt;
        const W = c.W(), H = c.H(), batasY = H - tong.offsetHeight - 30;
        if (!it) { const g = pilih1(grup); it = { g, label: pilih1(data[g]), x: W / 2, y: -20 }; it.el = c.el(it.label, 'gitem big'); }
        if (it.done) { const tx = W * (it.tujuan + 0.5) / grup.length; it.x += (tx - it.x) * Math.min(1, dt * 10); it.y += 500 * dt; }
        else it.y += (50 + t * 1.2) * dt;
        c.pos(it.el, it.x, it.y);
        if (!it.done && it.y > batasY) { it.done = true; it.tujuan = grup.indexOf(it.g); c.salah(); c.task(`Terlambat! "${it.label}" termasuk ${it.g}`); }
        if (it.done && it.y > H + 30) { it.el.remove(); it = null; }
      };
    },
  },

  tetris: {
    ikon: '🟦', nama: 'Tetris Kategori', desc: 'Arahkan balok ke kolom kategorinya. Salah = menumpuk!',
    main(c) {
      const data = KATEGORI[pemain.jj], grup = Object.keys(data), n = grup.length, bh = 34;
      const kepala = c.el(null, 'gheads');
      kepala.style.gridTemplateColumns = `repeat(${n},1fr)`;
      grup.forEach(g => { const d = document.createElement('div'); d.textContent = g; kepala.appendChild(d); });
      let tinggi = grup.map(() => 0), b = null, t = 0, cepat = false;
      const gerak = d => { if (b) b.col = Math.max(0, Math.min(n - 1, b.col + d)); };
      c.onSwipe = d => { if (d === 'kiri') gerak(-1); if (d === 'kanan') gerak(1); if (d === 'bawah') cepat = true; };
      c.onKlik = x => { if (b) b.col = Math.min(n - 1, Math.floor(x / (c.W() / n))); };
      c.onKey = (k, d) => {
        if (k === 'ArrowDown') cepat = d;
        if (d && k === 'ArrowLeft') gerak(-1);
        if (d && k === 'ArrowRight') gerak(1);
      };
      c.task('Balok berisi istilah jatuh. Arahkan ke kolom kategori yang benar!');
      c.hint('Tap kolom / geser ← → · geser ke bawah atau ↓ = jatuh cepat');
      c.update = dt => {
        t += dt;
        const W = c.W(), H = c.H(), cw = W / n;
        if (!b) { const g = pilih1(grup); b = { g, col: Math.floor(Math.random() * n), y: kepala.offsetHeight + 4, el: c.el(pilih1(data[g]), 'gblock') }; cepat = false; }
        b.y += (cepat ? 420 : 40 + t * 0.8) * dt;
        c.box(b.el, b.col * cw + 3, b.y, cw - 6, bh);
        const dasar = H - tinggi[b.col] * bh;
        if (b.y + bh >= dasar) {
          if (grup[b.col] === b.g) { c.tambah(10); b.el.remove(); }
          else {
            c.box(b.el, b.col * cw + 3, dasar - bh, cw - 6, bh);
            b.el.classList.add('no');
            tinggi[b.col]++;
            c.salah();
            c.task(`"${b.el.textContent}" termasuk ${b.g}`);
            if (dasar - 2 * bh < kepala.offsetHeight + bh) { b = null; return c.selesai('🧱 KOLOM PENUH!'); }
          }
          b = null;
        }
      };
    },
  },

  d2048: {
    ikon: '🔢', nama: '2048 Data', desc: 'Gabungkan dua yang sama untuk naik ke tingkat berikutnya.', waktu: 150,
    main(c) {
      const R = RANTAI[pemain.jj], papan = c.el(null, 'ggrid g2048');
      c.pakaiNyawa = false;
      let g = Array(16).fill(-1);
      const isi = () => { const kosong = g.map((v, i) => v < 0 ? i : -1).filter(i => i >= 0); if (kosong.length) g[pilih1(kosong)] = Math.random() < 0.85 ? 0 : 1; };
      const gambar = () => {
        papan.innerHTML = '';
        g.forEach(v => { const d = document.createElement('div'); d.className = 'cell' + (v >= 0 ? ' lv' + v : ''); d.textContent = v >= 0 ? R[v] : ''; papan.appendChild(d); });
      };
      const bisaGabung = (a, b) => a >= 0 && a === b && a < R.length - 1;
      const bisaGerak = () => g.some((v, i) => v < 0 || (i % 4 < 3 && bisaGabung(v, g[i + 1])) || (i < 12 && bisaGabung(v, g[i + 4])));
      function geser(dir) {
        let berubah = false, poin = 0;
        for (let a = 0; a < 4; a++) {
          const idx = [0, 1, 2, 3].map(b => dir === 'kiri' ? a * 4 + b : dir === 'kanan' ? a * 4 + 3 - b : dir === 'atas' ? b * 4 + a : (3 - b) * 4 + a);
          const v = idx.map(i => g[i]).filter(x => x >= 0), hasil = [];
          for (let i = 0; i < v.length; i++) {
            if (bisaGabung(v[i], v[i + 1])) { hasil.push(v[i] + 1); poin += (v[i] + 1) * 10; i++; }
            else hasil.push(v[i]);
          }
          idx.forEach((i, k) => { const nv = k < hasil.length ? hasil[k] : -1; if (g[i] !== nv) berubah = true; g[i] = nv; });
        }
        if (!berubah) return;
        if (poin) c.tambah(poin);
        isi(); gambar();
        if (!bisaGerak()) c.selesai('🧩 PAPAN PENUH!');
      }
      c.onSwipe = geser;
      c.onKey = (k, d) => { const m = { ArrowLeft: 'kiri', ArrowRight: 'kanan', ArrowUp: 'atas', ArrowDown: 'bawah' }[k]; if (d && m) geser(m); };
      c.task(`Gabungkan dua yang sama → naik tingkat: ${R.join(' → ')}`);
      c.hint('Geser ke atas/bawah/kiri/kanan, atau tombol panah');
      isi(); isi(); gambar();
    },
  },

  whack: {
    ikon: '🔨', nama: 'Whack-a-Mole', desc: 'Pukul hanya yang sesuai target, biarkan yang lain.',
    main(c) {
      const grup = Object.keys(KATEGORI[pemain.jj]), papan = c.el(null, 'ggrid gholes');
      const lubang = Array.from({ length: 9 }, () => { const b = document.createElement('button'); papan.appendChild(b); return { b, it: null, t: 0 }; });
      let target, ti = 0, gantiT = 0, jeda = 0.5, total = 0;
      const ganti = () => { target = grup[ti++ % grup.length]; c.task(`Pukul hanya: ${target}`); };
      ganti();
      lubang.forEach(l => {
        l.b.onpointerdown = () => {
          if (!l.it) return;
          const tepat = l.it.g === target;
          l.b.classList.add(tepat ? 'ok' : 'no');
          if (tepat) c.tambah(10); else { c.salah(); c.task(`"${l.it.label}" bukan ${target}. Pukul hanya: ${target}`); }
          l.it = null; l.t = 0.25;
        };
      });
      c.hint('Tap cepat sebelum masuk lagi!');
      c.update = dt => {
        total += dt;
        if ((gantiT += dt) > 20) { gantiT = 0; ganti(); }
        for (const l of lubang) if (l.t > 0 && (l.t -= dt) <= 0) { l.it = null; l.b.textContent = ''; l.b.className = ''; }
        if ((jeda -= dt) <= 0) {
          const kosong = lubang.filter(l => !l.it && l.t <= 0);
          if (kosong.length) {
            const l = pilih1(kosong);
            l.it = itemKategori(0.45, target);
            l.b.textContent = l.it.label; l.b.className = 'up';
            l.t = Math.max(0.9, 1.7 - total / 100);
          }
          jeda = 0.6;
        }
      };
    },
  },

  candy: {
    ikon: '🍬', nama: 'Candy Crush Istilah', desc: 'Tukar 2 kotak agar 3 istilah sekategori sejajar.', waktu: 120,
    main(c) {
      const data = KATEGORI[pemain.jj], grup = Object.keys(data).slice(0, 3), N = 6, papan = c.el(null, 'ggrid gcandy');
      c.pakaiNyawa = false;
      const acakSel = () => { const g = pilih1(grup); return { g, label: pilih1(data[g]) }; };
      let sel = Array.from({ length: N * N }, acakSel), pilihI = -1, sibuk = false;
      const cocok = () => {
        const m = new Set();
        for (let r = 0; r < N; r++) for (let k = 0; k < N; k++) {
          const i = r * N + k;
          if (k <= N - 3 && sel[i].g === sel[i + 1].g && sel[i].g === sel[i + 2].g) [i, i + 1, i + 2].forEach(x => m.add(x));
          if (r <= N - 3 && sel[i].g === sel[i + N].g && sel[i].g === sel[i + 2 * N].g) [i, i + N, i + 2 * N].forEach(x => m.add(x));
        }
        return m;
      };
      const bersihkan = () => { let m; while ((m = cocok()).size) m.forEach(i => { sel[i] = acakSel(); }); };
      const gambar = (tandai = new Set()) => {
        papan.innerHTML = '';
        sel.forEach((s, i) => {
          const b = document.createElement('button');
          b.textContent = s.label;
          if (i === pilihI) b.classList.add('sel');
          if (tandai.has(i)) b.classList.add('ok');
          b.onclick = () => klik(i);
          papan.appendChild(b);
        });
      };
      const tidur = ms => new Promise(r => setTimeout(r, ms));
      async function klik(i) {
        if (sibuk || !c.aktif) return;
        if (pilihI < 0) { pilihI = i; gambar(); return; }
        const j = pilihI;
        pilihI = -1;
        const dekat = Math.abs(i - j) === N || (Math.abs(i - j) === 1 && Math.floor(i / N) === Math.floor(j / N));
        if (!dekat) { pilihI = i === j ? -1 : i; gambar(); return; }
        [sel[i], sel[j]] = [sel[j], sel[i]];
        let m = cocok();
        if (!m.size) { [sel[i], sel[j]] = [sel[j], sel[i]]; sfx('sfx_salah'); c.task('Belum ada 3 istilah SEKATEGORI yang sejajar. Coba lagi!'); gambar(); return; }
        sibuk = true;
        while (m.size && c.aktif) {
          c.task(`✅ ${[...new Set([...m].map(x => sel[x].g))].join(' & ')}!`);
          gambar(m); c.tambah(m.size * 5);
          await tidur(450);
          for (let k = 0; k < N; k++) {   // isi yang tersisa turun, atasnya diisi sel baru
            const sisa = [];
            for (let r = N - 1; r >= 0; r--) if (!m.has(r * N + k)) sisa.push(sel[r * N + k]);
            for (let r = N - 1, x = 0; r >= 0; r--, x++) sel[r * N + k] = sisa[x] || acakSel();
          }
          m = cocok(); gambar();
          await tidur(200);
        }
        sibuk = false;
      }
      c.el('🔀 Acak papan', 'gacak').onclick = () => { if (sibuk) return; sel = acak(sel); bersihkan(); pilihI = -1; gambar(); };
      c.task(`Tukar 2 kotak bersebelahan agar 3 istilah sekategori sejajar (${grup.join(' / ')})`);
      c.hint('Tap kotak pertama, lalu tap kotak di sebelahnya');
      bersihkan(); gambar();
    },
  },

  sushi: {
    ikon: '🍣', nama: 'Sushi Conveyor', desc: 'Ambil barang di ban berjalan sesuai pesanan.',
    main(c) {
      const F = FUNGSI[pemain.jj], tiket = c.el(null, 'gticket'), ban = c.el(null, 'gbelt'), batas = 25;
      let order, sisa, obj = [], jeda = 0;
      function baru() { order = acak(F).slice(0, 3).map(([d, item]) => ({ d, item, ok: false })); sisa = batas; tiketPesanan(tiket, order, sisa, batas); }
      function ambilPiring(o) {
        if (o.diambil || !c.aktif) return;
        const p = order.find(p => !p.ok && p.item === o.item);
        if (!p) { o.el.classList.add('no'); c.salah(); return; }
        o.diambil = true; p.ok = true; o.el.classList.add('ok');
        c.tambah(5);
        tiketPesanan(tiket, order, sisa, batas);
        if (order.every(p => p.ok)) { c.tambah(25); baru(); }
      }
      c.task('Ambil barang di ban berjalan yang cocok dengan FUNGSI di pesanan!');
      c.hint('Tap barang di ban berjalan. Pesanan selesai = +40');
      baru();
      c.update = dt => {
        const W = c.W(), H = c.H(), Y = H * 0.65;
        c.box(ban, 0, Y - 34, W, 68);
        sisa -= dt;
        const bar = tiket.querySelector('.gtbar');
        if (bar) bar.style.width = (sisa / batas * 100) + '%';
        if (sisa <= 0) { c.salah(); baru(); }
        if ((jeda -= dt) <= 0) {
          const perlu = order.filter(p => !p.ok);
          const item = perlu.length && Math.random() < 0.4 ? pilih1(perlu).item : pilih1(F)[1];
          const o = { item, el: c.el(item, 'gitem'), x: -80 };
          o.el.onpointerdown = () => ambilPiring(o);
          obj.push(o);
          jeda = 0.85;
        }
        for (const o of obj) { o.x += 100 * dt; c.pos(o.el, o.x, o.diambil ? Y - 60 : Y); }
        obj = obj.filter(o => o.x < W + 100 || (o.el.remove(), false));
      };
    },
  },

  tangkap: {
    ikon: '🧺', nama: 'Tangkap Item', desc: 'Tangkap benda sesuai kategori, hindari yang salah.',
    main(c) {
      const grup = Object.keys(KATEGORI[pemain.jj]), hero = c.hero(64);
      let x = 0.5, target, ti = 0, gantiT = 0, obj = [], jeda = 0, t = 0;
      const ganti = () => { target = grup[ti++ % grup.length]; c.task(`Tangkap: ${target}`); };
      ganti();
      c.onTap = px => { x = px / c.W(); };
      c.onDrag = px => { x = px / c.W(); };
      c.hint('Geser jari / tombol ← → untuk bergerak');
      c.update = dt => {
        t += dt;
        const W = c.W(), H = c.H();
        if (c.keys.has('ArrowLeft')) x -= 0.7 * dt;
        if (c.keys.has('ArrowRight')) x += 0.7 * dt;
        x = Math.max(0.06, Math.min(0.94, x));
        c.pos(hero, x * W, H - hero.clientHeight / 2);
        if ((gantiT += dt) > 15) { gantiT = 0; ganti(); }
        if ((jeda -= dt) <= 0) {
          const it = itemKategori(0.45, target);
          obj.push({ ...it, el: c.el(it.label, 'gitem'), x: 0.1 + Math.random() * 0.8, y: -20, vy: 80 + Math.random() * 50 + t * 1.5 });
          jeda = Math.max(0.6, 1.2 - t / 100);
        }
        for (const o of obj) {
          o.y += o.vy * dt;
          c.pos(o.el, o.x * W, o.y);
          if (!o.done && c.tabrak(hero, o.el, 10)) {
            o.done = true; o.y = H + 999;
            if (o.g === target) c.tambah(10); else { c.salah(); c.task(`"${o.label}" bukan ${target}. Tangkap: ${target}`); }
          }
        }
        obj = obj.filter(o => o.y < H + 40 || (o.el.remove(), false));
      };
    },
  },
};
