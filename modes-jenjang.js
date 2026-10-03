// Mode khusus tiap jenjang. Ditambahkan ke GAMES (modes.js) dan hanya tampil untuk kelas yang sesuai.
// Bergantung pada modes.js (GAMES, RANTAI, mesin game) dan index.html ($, acak, sfx).

const IMG = n => `assets/images/${n}.svg`;
function pasangGambar(c, nama, cls) { const i = document.createElement('img'); i.src = IMG(nama); i.className = cls; i.alt = ''; c.A.appendChild(i); return i; }
function tombolGambar(teks, img) {
  const b = document.createElement('button');
  b.className = 'gpick';
  b.innerHTML = `<img src="${IMG(img)}" alt=""><span></span>`;
  b.querySelector('span').textContent = teks;
  return b;
}
function kolom(c) { const d = document.createElement('div'); d.className = 'gkolom'; c.A.appendChild(d); return d; }
// Ambil item berikutnya dari antrean acak supaya tidak cepat berulang.
function antrean(data) { let q = []; return () => { if (!q.length) q = acak(data); return q.pop(); }; }

/* ======================= DATA KELAS 7 ======================= */
// Posisi slot dalam % terhadap gambar motherboard.svg (400×300).
const SLOT_PC = [
  { id: 'cpu', nama: 'Soket CPU', part: 'CPU', img: 'part_cpu', x: 37.5, y: 20, w: 17.5, h: 23.3 },
  { id: 'kipas', nama: 'Pendingin di atas CPU', part: 'Kipas + Heatsink', img: 'part_kipas' },
  { id: 'ram', nama: 'Slot RAM', part: 'RAM', img: 'part_ram', x: 62, y: 12, w: 13, h: 42 },
  { id: 'vga', nama: 'Slot PCIe', part: 'VGA Card', img: 'part_vga', x: 14, y: 59, w: 52, h: 12 },
  { id: 'ssd', nama: 'Slot M.2', part: 'SSD', img: 'part_ssd', x: 14, y: 74, w: 30, h: 12 },
  { id: 'psu', nama: 'Konektor Daya', part: 'PSU', img: 'part_psu', x: 79, y: 62, w: 17, h: 32 },
];
const PENGECOH_PC = [['Printer', 'dev_printer'], ['Mouse', 'dev_mouse'], ['Flashdisk', 'dev_flashdisk'], ['Speaker', 'dev_speaker']];

const PORT = { HDMI: 'port_hdmi', USB: 'port_usb', LAN: 'port_lan', Audio: 'port_audio', Daya: 'port_power', VGA: 'port_vga' };
const ALAT_PORT = [
  ['Monitor', 'dev_monitor', 'HDMI'], ['TV', 'dev_tv', 'HDMI'], ['Flashdisk', 'dev_flashdisk', 'USB'], ['Mouse', 'dev_mouse', 'USB'],
  ['Keyboard', 'dev_keyboard', 'USB'], ['Printer', 'dev_printer', 'USB'], ['Kabel internet', 'dev_router', 'LAN'],
  ['Headphone', 'dev_headphone', 'Audio'], ['Speaker', 'dev_speaker', 'Audio'], ['Kabel listrik', 'dev_colokan', 'Daya'],
  ['Proyektor lama', 'dev_proyektor', 'VGA'],
];

// [keluhan, penanganan tepat, penjelasan]
const KASUS = [
  ['Komputerku lambat dan sering muncul iklan aneh.', 'Scan dengan antivirus', 'Iklan aneh & lambat sering tanda virus/malware.'],
  ['Layar monitorku gelap, padahal CPU menyala.', 'Cek kabel HDMI/VGA ke monitor', 'Kabel video yang lepas membuat monitor tidak menerima gambar.'],
  ['Pointer mouse tidak mau bergerak.', 'Cek kabel/baterai mouse', 'Mouse butuh sambungan yang baik atau baterai yang terisi.'],
  ['Aku sering mati sendiri saat terasa panas.', 'Bersihkan kipas & heatsink', 'Debu membuat pendinginan buruk sehingga komputer kepanasan.'],
  ['Tidak ada suara sama sekali.', 'Cek speaker & pengaturan volume', 'Volume mungkin di-mute atau speaker belum tersambung.'],
  ['Penyimpananku penuh, tidak bisa simpan file.', 'Hapus file tak perlu / pindah ke cloud', 'Mengosongkan ruang membuat file baru bisa disimpan.'],
  ['Printer tidak mau mencetak.', 'Cek kertas, tinta, dan kabel printer', 'Kertas, tinta, atau sambungan sering jadi penyebabnya.'],
  ['Tugasku hilang saat listrik padam.', 'Pakai UPS & sering tekan Ctrl+S', 'UPS memberi listrik cadangan, Ctrl+S menyimpan pekerjaan.'],
  ['Internetku putus terus.', 'Cek kabel LAN / sambungan WiFi', 'Sambungan jaringan yang lepas memutus internet.'],
  ['Aplikasi macet "Not Responding".', 'Tutup paksa lewat Task Manager', 'Task Manager bisa menghentikan aplikasi yang macet.'],
  ['Flashdisk tidak terbaca.', 'Coba colok di port USB lain', 'Port USB yang longgar/rusak bisa membuat flashdisk tak terbaca.'],
  ['Ada file .exe aneh di flashdisk.', 'Scan antivirus & jangan dibuka', 'File .exe asing di flashdisk sering berisi virus.'],
  ['Aku berbunyi bip berulang dan layar tidak tampil.', 'Periksa pemasangan RAM', 'Bunyi bip saat menyala sering tanda RAM tidak terpasang baik.'],
  ['Jam dan tanggalku selalu salah.', 'Ganti baterai CMOS', 'Baterai CMOS menjaga jam tetap jalan saat komputer mati.'],
];

/* ======================= DATA KELAS 8 ======================= */
const PARSONS = [
  { judul: 'Judul & paragraf', baris: ['<!DOCTYPE html>', '<html>', '<body>', '  <h1>Profil Saya</h1>', '  <p>Saya siswa SMP.</p>', '</body>', '</html>'] },
  { judul: 'Rutinitas pagi (daftar bernomor)', baris: ['<h2>Pagiku</h2>', '<ol>', '  <li>Bangun tidur</li>', '  <li>Mandi</li>', '  <li>Sarapan</li>', '</ol>'] },
  { judul: 'Tabel nilai', baris: ['<table border="1">', '  <tr>', '    <th>Nama</th>', '    <th>Nilai</th>', '  </tr>', '  <tr>', '    <td>Budi</td>', '    <td>90</td>', '  </tr>', '</table>'] },
  { judul: 'Link favorit', baris: ['<h1>Link Favorit</h1>', '<p>', '  <a href="https://kemdikbud.go.id">Kemdikbud</a>', '</p>'] },
  { judul: 'Gambar dengan judul', baris: ['<h1>Kucingku</h1>', '<img src="kucing.jpg" alt="Foto kucing">', '<p>Namanya Oyen.</p>'] },
  { judul: 'Struktur lengkap', baris: ['<!DOCTYPE html>', '<html>', '<head>', '  <title>Web Kelas</title>', '</head>', '<body>', '  <h1>Kelas 8</h1>', '</body>', '</html>'] },
];

// [deklarasi, properti]
const DEKLARASI = [
  ['color: red', 'color'], ['color: blue', 'color'], ['color: green', 'color'],
  ['background-color: yellow', 'background-color'], ['background-color: lightblue', 'background-color'],
  ['text-align: center', 'text-align'], ['text-align: right', 'text-align'],
  ['font-size: 28px', 'font-size'], ['font-size: 11px', 'font-size'],
  ['font-weight: bold', 'font-weight'], ['font-style: italic', 'font-style'], ['text-decoration: underline', 'text-decoration'],
  ['border: 3px solid black', 'border'], ['font-family: monospace', 'font-family'],
];

const BUGS = [
  { kode: ['<html>', '<body>', '<h1>Selamat Datang</h2>', '<p>Halo semua</p>', '</body>', '</html>'], bug: 2, fix: 'Tag penutupnya harus </h1>, sama dengan tag pembuka.' },
  { kode: ['<h2>Kegiatan</h2>', '<p>Ini paragraf pertama', '<p>Ini paragraf kedua</p>'], bug: 1, fix: 'Paragraf pertama belum ditutup dengan </p>.' },
  { kode: ['<h2>Galeri</h2>', '<img scr="foto.jpg" alt="Foto">', '<p>Foto kelas kami</p>'], bug: 1, fix: 'Atribut alamat gambar adalah src, bukan scr.' },
  { kode: ['<a href="https://google.com">Google</a>', '<br>', '<a hreff="profil.html">Profil</a>'], bug: 2, fix: 'Atribut tujuan link adalah href, bukan hreff.' },
  { kode: ['<ul>', '  <li>Apel</li>', '  <li>Jeruk</il>', '</ul>'], bug: 2, fix: 'Tag penutup item daftar adalah </li>.' },
  { kode: ['<table>', '  <tr>', '    <td>Nama</td>', '  </tr>', '<table>'], bug: 4, fix: 'Tabel harus ditutup dengan </table>.' },
  { kode: ['<p style="color red;">Merah</p>', '<p>Biasa</p>', '<p>Lagi</p>'], bug: 0, fix: 'Properti CSS butuh titik dua: color: red;' },
  { kode: ['<head>', '  <title>Web Saya</title>', '<head>', '<body>', '  <h1>Hai</h1>', '</body>'], bug: 2, fix: 'Bagian head harus ditutup dengan </head>.' },
  { kode: ['<p><b>Teks tebal</p></b>', '<p>Normal</p>', '<p>Lagi</p>'], bug: 0, fix: 'Tag bersarang ditutup berurutan: <p><b>…</b></p>.' },
  { kode: ['<h1>Kelasku</h1>', '<p Kami kelas 8.</p>', '<p>Senang belajar</p>'], bug: 1, fix: 'Tag pembuka <p belum ditutup dengan tanda >.' },
  { kode: ['<!DOCTYPE html>', '<html>', '<body>', '<h1>Hai</h1>', '</body>', '</htm>'], bug: 5, fix: 'Penutup dokumen yang benar adalah </html>.' },
  { kode: ['<p style="font-size: 20px;">Besar</p>', '<p style="text-align: middle;">Tengah</p>', '<p>Biasa</p>'], bug: 1, fix: 'Nilai rata tengah yang benar adalah text-align: center.' },
];

// Potongan prompt: [teks, jenis, alasan jika buruk]. Wajib: tugas + topik + isi. Bonus: gaya, format.
const PROMPT_RONDE = [
  { tujuan: 'Membuat halaman profil sekolah', chips: [
    ['Buatkan kode HTML', 'tugas'], ['halaman profil SMP Negeri 1', 'topik'], ['berisi judul, foto, dan sejarah singkat', 'isi'],
    ['dengan nuansa warna biru', 'gaya'], ['beri komentar penjelasan di kodenya', 'format'],
    ['terserah kamu', 'buruk', 'terlalu umum, AI tidak tahu yang kamu mau.'], ['ini NIK saya 3201xxxx', 'buruk', 'jangan pernah memberi data pribadi ke AI.'],
    ['sekalian kerjakan PR matematikaku', 'buruk', 'di luar tujuan, dan PR harus dikerjakan sendiri.']] },
  { tujuan: 'Membuat daftar ekstrakurikuler', chips: [
    ['Tulis kode HTML', 'tugas'], ['halaman ekstrakurikuler sekolah', 'topik'], ['berisi daftar berpoin 5 ekskul', 'isi'],
    ['dengan judul berwarna hijau', 'gaya'], ['agar tampil rapi di layar HP', 'format'],
    ['yang keren pokoknya', 'buruk', 'kata "keren" tidak jelas ukurannya.'], ['password akun sekolah: abc123', 'buruk', 'kata sandi tidak boleh dibagikan.'],
    ['buatkan juga game online', 'buruk', 'di luar tujuan, prompt jadi tidak fokus.']] },
  { tujuan: 'Membuat tabel jadwal pelajaran', chips: [
    ['Buatkan kode HTML', 'tugas'], ['jadwal pelajaran kelas 8', 'topik'], ['dalam tabel Senin–Jumat dengan 3 jam pelajaran', 'isi'],
    ['beri garis tepi dan warna pada judul kolom', 'gaya'], ['jelaskan tiap tag yang dipakai', 'format'],
    ['bebas aja', 'buruk', 'tidak spesifik.'], ['alamat rumahku Jl. Melati 5', 'buruk', 'data pribadi tidak perlu dan berisiko.'],
    ['pakai bahasa kasar biar lucu', 'buruk', 'tidak sopan dan melanggar etika.']] },
  { tujuan: 'Membuat halaman hobi', chips: [
    ['Tolong buatkan kode HTML', 'tugas'], ['halaman tentang hobi saya bermain bulu tangkis', 'topik'], ['berisi judul, paragraf, dan 1 gambar', 'isi'],
    ['dengan huruf besar dan latar terang', 'gaya'], ['kodenya singkat agar mudah ditempel di HP', 'format'],
    ['yang bagus', 'buruk', '"bagus" tidak terukur.'], ['nomor HP orang tuaku 0812xxxx', 'buruk', 'data pribadi jangan diberikan.'],
    ['tapi jangan pakai HTML', 'buruk', 'bertentangan dengan tujuan.']] },
];

/* ======================= DATA KELAS 9 ======================= */
const TOPIK_SLIDE = [
  { judul: 'Bahaya Sampah Plastik', poin: ['Plastik sulit terurai', 'Bawa botol minum sendiri', 'Pilah sampah di rumah'],
    paragraf: 'Plastik merupakan bahan yang sangat sulit terurai dan membutuhkan waktu ratusan tahun sehingga menumpuk di tanah, sungai, dan laut, kemudian membahayakan hewan dan manusia di sekitarnya dalam jangka waktu yang sangat panjang.',
    ajakan: 'Ayo mulai hari ini!', img: 'slide_plastik', sumber: 'Sumber: Kementerian Lingkungan Hidup' },
  { judul: 'Hemat Energi di Sekolah', poin: ['Matikan lampu saat keluar kelas', 'Cabut charger tak terpakai', 'Manfaatkan cahaya matahari'],
    paragraf: 'Energi listrik yang kita gunakan sehari-hari sebagian besar berasal dari pembangkit yang memakai bahan bakar fosil sehingga penggunaan yang boros akan menambah polusi dan biaya yang harus dibayar setiap bulan oleh sekolah.',
    ajakan: 'Hemat energi, selamatkan bumi!', img: 'slide_energi', sumber: 'Sumber: Kementerian ESDM' },
  { judul: 'Waspada Hoaks', poin: ['Cek sumber berita', 'Jangan langsung bagikan', 'Laporkan konten palsu'],
    paragraf: 'Hoaks adalah informasi palsu yang sengaja dibuat untuk menipu atau memancing emosi pembaca dan biasanya disebarkan dengan cepat melalui media sosial serta aplikasi pesan sehingga banyak orang mempercayainya tanpa memeriksa kebenarannya.',
    ajakan: 'Saring sebelum sharing!', img: 'slide_hoaks', sumber: 'Sumber: Komdigi' },
];

// [pernyataan AI, benar?, penjelasan]
const KLAIM_AI = [
  ['PowerPoint adalah aplikasi presentasi yang dikembangkan Microsoft.', true, 'PowerPoint memang bagian dari Microsoft Office.'],
  ['Google Slides dapat diedit beberapa orang secara bersamaan.', true, 'Google Slides mendukung kolaborasi lewat tautan berbagi.'],
  ['Rasio slide layar lebar yang umum dipakai adalah 16:9.', true, '16:9 adalah ukuran widescreen standar saat ini.'],
  ['Di PowerPoint, tombol F5 memulai slideshow dari slide pertama.', true, 'F5 = mulai dari awal, Shift+F5 = dari slide saat ini.'],
  ['AI generatif bisa memberi jawaban salah yang terdengar meyakinkan.', true, 'Inilah yang disebut halusinasi AI, jadi hasil AI wajib dicek.'],
  ['File PowerPoint umumnya berekstensi .pptx.', true, '.pptx adalah format standar PowerPoint modern.'],
  ['Gamma adalah aplikasi AI untuk membuat presentasi.', true, 'Gamma membuat slide otomatis dari perintah teks.'],
  ['Diagram lingkaran cocok untuk menunjukkan persentase dari keseluruhan.', true, 'Pie chart menunjukkan bagian dari 100%.'],
  ['Menyimpan ke PDF membuat tampilan presentasi tetap sama di perangkat lain.', true, 'PDF menjaga tata letak tidak berubah.'],
  ['Speaker notes tidak terlihat audiens saat memakai Presenter View.', true, 'Catatan hanya tampil di layar penyaji.'],
  ['Ctrl + M menambah slide baru di PowerPoint.', true, 'Ctrl + M = New Slide.'],
  ['AI dilatih memakai data dalam jumlah sangat besar.', true, 'Model AI belajar pola dari data latih yang sangat banyak.'],
  ['Tombol F5 di PowerPoint akan menghapus semua slide.', false, 'F5 memulai slideshow, tidak menghapus apa pun.'],
  ['Google Slides hanya bisa dipakai tanpa internet.', false, 'Google Slides adalah aplikasi online; mode offline hanya fitur tambahan.'],
  ['Penelitian membuktikan slide dengan 15 warna paling mudah diingat.', false, 'Tidak ada penelitian seperti itu; 2–3 warna justru lebih baik.'],
  ['Aturan internasional mewajibkan semua slide berukuran 1:1.', false, 'Tidak ada aturan itu; yang umum dipakai 16:9.'],
  ['AI selalu benar karena mengambil data langsung dari buku pelajaran.', false, 'AI bisa salah dan tidak selalu bersumber dari buku.'],
  ['Huruf 8 pt paling mudah dibaca dari belakang kelas.', false, '8 pt terlalu kecil; isi slide sebaiknya 24 pt ke atas.'],
  ['Gamma adalah aplikasi pengolah angka seperti Excel.', false, 'Gamma adalah aplikasi AI untuk presentasi.'],
  ['File .pptx hanya bisa dibuka di HP Android.', false, '.pptx bisa dibuka di komputer, laptop, maupun HP.'],
  ['Animasi berlebihan terbukti menaikkan nilai presentasi 80%.', false, 'Angka itu karangan; animasi berlebihan justru mengganggu.'],
  ['Chatbot AI dapat membaca pikiran penggunanya.', false, 'AI hanya memproses teks/perintah yang kita berikan.'],
  ['Mencantumkan sumber gambar di slide itu dilarang.', false, 'Justru sumber gambar wajib dicantumkan.'],
  ['Diagram garis paling cocok untuk persentase dari keseluruhan.', false, 'Diagram garis untuk tren waktu; persentase pakai diagram lingkaran.'],
];

// Brief untuk Studio Presentasi. Opsi: [teks, skor 0-2, kritik juri]
const STUDIO_BRIEF = [
  { topik: 'Bahaya Sampah Plastik', audiens: 'siswa SD', img: 'slide_plastik',
    judul: [['Ayo Kurangi Sampah Plastik!', 2, ''], ['Sampah', 0, 'judul terlalu umum'], ['Analisis Dampak Polimer Sintetis terhadap Ekosistem', 1, 'judul terlalu rumit untuk siswa SD']],
    isi: [['• Plastik sulit terurai\n• Bawa botol minum sendiri\n• Buang sampah pada tempatnya', 2, ''],
          ['Plastik adalah polimer sintetis yang membutuhkan waktu ratusan tahun untuk terurai sehingga menumpuk di lingkungan dan membahayakan makhluk hidup…', 0, 'isi berupa paragraf panjang'],
          ['• Plastik\n• Sampah', 1, 'poin terlalu singkat']] },
  { topik: 'Hemat Energi di Sekolah', audiens: 'teman sekelas', img: 'slide_energi',
    judul: [['3 Cara Hemat Energi di Kelas', 2, ''], ['Energi', 0, 'judul terlalu umum'], ['HEMAT!!!!!!', 0, 'judul tidak jelas dan berlebihan']],
    isi: [['• Matikan lampu saat keluar kelas\n• Cabut charger tak terpakai\n• Pakai cahaya matahari', 2, ''],
          ['Energi listrik dihasilkan dari berbagai pembangkit dan penggunaannya harus dihemat karena biaya dan polusi yang ditimbulkannya cukup besar setiap…', 0, 'isi berupa paragraf panjang'],
          ['• Hemat\n• Listrik\n• Penting', 1, 'poin kurang jelas maksudnya']] },
  { topik: 'Kenali Berita Hoaks', audiens: 'orang tua siswa', img: 'slide_hoaks',
    judul: [['Cara Mudah Mengenali Berita Hoaks', 2, ''], ['Hoaks', 0, 'judul terlalu umum'], ['Wkwk Hoaks Bikin Pusing', 0, 'bahasa tidak cocok untuk orang tua']],
    isi: [['• Cek sumber beritanya\n• Waspadai judul heboh\n• Jangan langsung bagikan', 2, ''],
          ['Hoaks adalah informasi palsu yang sengaja dibuat untuk menipu dan biasanya disebarkan melalui media sosial atau aplikasi pesan secara berantai…', 0, 'isi berupa paragraf panjang'],
          ['• Hoaks itu jahat', 1, 'isi kurang lengkap']] },
];
const STUDIO_UMUM = {
  gambar: [['Ilustrasi sesuai topik', 2, '', 'ok'], ['Gambar lucu tak berhubungan', 0, 'gambar tidak relevan', 'meme'], ['Gambar sesuai tapi buram', 0, 'gambar buram', 'buram']],
  warna: [['Teks gelap di latar terang', 2, '', 'background:#f8fafc;color:#0f172a;'],
          ['Teks kuning di latar putih', 0, 'kontras terlalu rendah', 'background:#fff;color:#fde047;'],
          ['Latar pelangi warna-warni', 0, 'terlalu banyak warna', 'background:linear-gradient(90deg,#f0abfc,#67e8f9,#fde047,#86efac);color:#dc2626;']],
  huruf: [['Sans-serif, ukuran besar', 2, '', 'font-family:Arial,sans-serif;font-size:15px;'],
          ['Huruf sambung kecil', 0, 'huruf terlalu kecil & sulit dibaca', 'font-family:cursive;font-size:9px;'],
          ['SEMUA HURUF KAPITAL', 1, 'huruf kapital semua terasa seperti berteriak', 'font-family:Arial,sans-serif;font-size:15px;text-transform:uppercase;']],
};

// [akun, isi postingan, hoaks?, alasan]
const POSTS = [
  ['Info_Viral99', 'SEBARKAN!!! Mulai besok WhatsApp berbayar Rp50.000/bulan. Kirim ke 10 grup agar akunmu tetap gratis!!!', true, 'Huruf kapital, banyak tanda seru, dan pesan berantai = ciri hoaks.'],
  ['Kabar Kilat', 'Minum air es setelah makan langsung menyebabkan kanker! Dokter merahasiakan ini!', true, 'Klaim kesehatan berlebihan tanpa sumber yang jelas.'],
  ['Hadiah Resmi', 'Selamat! Kamu terpilih dapat HP gratis. Klik bit.ly/hp-gratis lalu isi data KTP & PIN ATM.', true, 'Meminta data pribadi dan PIN adalah penipuan.'],
  ['BeritaHeboh.xyz', 'Semua sekolah libur 3 bulan mulai Senin! (sumber: teman sepupu saya)', true, 'Sumber tidak jelas, bukan dari sekolah/dinas resmi.'],
  ['Akun Anonim', 'Foto ini bukti ada ikan raksasa 20 meter di danau kota kita!', true, 'Foto bisa hasil edit/AI; cek dengan pencarian gambar.'],
  ['Mr.Teknologi', 'Main game sambil mengisi daya PASTI membuat HP meledak dalam 5 menit!', true, 'Kata "pasti" dan klaim berlebihan tanpa bukti.'],
  ['Promo Pulsa', 'Pulsa gratis 100 ribu untuk semua pelajar, cukup kirim kode OTP yang masuk ke HP kamu.', true, 'Kode OTP tidak boleh diberikan kepada siapa pun.'],
  ['Situs Sekolah (sch.id)', 'Pengumuman: penilaian akhir semester dimulai minggu depan. Jadwal lengkap ada di website resmi sekolah.', false, 'Dari website resmi sekolah dan bisa dicek.'],
  ['BMKG (akun resmi)', 'Peringatan dini: potensi hujan lebat di beberapa wilayah sore ini. Siapkan payung.', false, 'Dari lembaga resmi yang berwenang.'],
  ['Perpustakaan Kota', 'Perpustakaan buka sampai pukul 19.00 selama bulan ini. Info lengkap di situs resmi pemkot.', false, 'Info wajar dan menyertakan sumber resmi.'],
  ['Guru Informatika', 'Tips: aktifkan verifikasi 2 langkah agar akun media sosialmu lebih aman.', false, 'Saran keamanan yang benar.'],
  ['Komdigi (akun resmi)', 'Jangan pernah membagikan kode OTP kepada siapa pun, termasuk yang mengaku petugas.', false, 'Pesan resmi dan isinya benar.'],
  ['Dinas Kesehatan', 'Cuci tangan pakai sabun minimal 20 detik membantu mencegah penyakit.', false, 'Anjuran kesehatan umum dari sumber berwenang.'],
  ['OSIS Sekolah', 'Lomba poster digital dibuka! Daftar lewat formulir di website sekolah.', false, 'Info kegiatan dari pihak sekolah.'],
];

/* ======================= MODE ======================= */
Object.assign(GAMES, {
  /* ---------- KELAS 7 ---------- */
  rakitpc: {
    jenjang: 'kelas7', ikon: '🖥️', nama: 'Rakit PC', desc: 'Pasang komponen ke slot yang tepat di motherboard, lalu nyalakan!',
    main(c) {
      const papan = c.el(null, 'gboard'), baki = c.el(null, 'gtray');
      let pilih = null, terpasang = new Set(), jeda = 0;
      function pasang(slotId, z) {
        if (jeda > 0) return;
        if (!pilih) { c.task('Pilih dulu komponennya di bawah!'); return; }
        const slot = SLOT_PC.find(s => s.id === slotId);
        if (pilih.id === slotId) {
          terpasang.add(slotId);
          z.innerHTML = `<img src="${IMG(pilih.img)}" alt=""><span>${slot.part}</span>`;
          z.classList.add('isi');
          pilih.b.remove(); pilih = null;
          sfx('sfx_pasang'); c.tambah(10);
          c.task(`✅ ${slot.part} terpasang di ${slot.nama}`);
          if (terpasang.size === SLOT_PC.length) {
            papan.classList.add('nyala'); sfx('sfx_boot'); c.tambah(30);
            c.task('🖥️ PC MENYALA! Bersiap merakit PC berikutnya...');
            jeda = 2.2;
          }
        } else {
          c.salah();
          if (!pilih.id) c.task(`${pilih.nama} adalah perangkat luar, tidak dipasang di motherboard.`);
          else if (pilih.id === 'kipas' && !terpasang.has('cpu')) c.task('Pasang CPU dulu, baru pendinginnya di atas CPU!');
          else c.task(`${pilih.nama} dipasang di ${SLOT_PC.find(s => s.id === pilih.id).nama}, bukan ${slot.nama}.`);
        }
      }
      const zona = SLOT_PC.filter(s => s.x !== undefined).map(s => {
        const z = document.createElement('button');
        z.className = 'gslot';
        Object.assign(z.style, { left: s.x + '%', top: s.y + '%', width: s.w + '%', height: s.h + '%' });
        // Soket CPU dipakai dua kali: CPU dulu, lalu pendinginnya di atasnya.
        z.onclick = () => pasang(s.id === 'cpu' && terpasang.has('cpu') ? 'kipas' : s.id, z);
        papan.appendChild(z);
        return z;
      });
      function ronde() {
        terpasang = new Set(); pilih = null;
        zona.forEach(z => { z.innerHTML = ''; z.classList.remove('isi'); });
        papan.classList.remove('nyala');
        baki.innerHTML = '';
        const isi = [...SLOT_PC.map(s => [s.part, s.img, s.id]), ...acak(PENGECOH_PC).slice(0, 2).map(([n, i]) => [n, i, null])];
        acak(isi).forEach(([nama, img, id]) => {
          const b = tombolGambar(nama, img);
          b.onclick = () => { if (jeda > 0) return; baki.querySelectorAll('.gpick').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); pilih = { nama, img, id, b }; };
          baki.appendChild(b);
        });
        c.task('Pilih komponen di bawah, lalu tap slotnya di motherboard');
      }
      c.hint('Tap komponen → tap slot. Perangkat luar (printer, mouse…) tidak dipasang!');
      ronde();
      c.update = dt => {
        const W = c.W(), H = c.H(), bw = Math.min(W - 12, (H - baki.offsetHeight - 18) * 4 / 3);
        papan.style.width = bw + 'px';
        papan.style.height = bw * 0.75 + 'px';
        if (jeda > 0 && (jeda -= dt) <= 0) ronde();
      };
    },
  },

  kabel: {
    jenjang: 'kelas7', ikon: '🔌', nama: 'Sambung Kabel', desc: 'Sambungkan tiap perangkat ke port yang cocok.',
    main(c) {
      const kiri = c.el(null, 'gcol kiri'), kanan = c.el(null, 'gcol kanan');
      const NS = 'http://www.w3.org/2000/svg', svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('class', 'glines');
      c.A.appendChild(svg);
      let pilih = null, sisa = 0, jeda = 0;
      function garis(a, b, warna) {
        const R = c.A.getBoundingClientRect(), r1 = a.getBoundingClientRect(), r2 = b.getBoundingClientRect(), l = document.createElementNS(NS, 'line');
        [['x1', r1.right - R.left], ['y1', r1.top + r1.height / 2 - R.top], ['x2', r2.left - R.left], ['y2', r2.top + r2.height / 2 - R.top],
         ['stroke', warna], ['stroke-width', 5], ['stroke-linecap', 'round']].forEach(([k, v]) => l.setAttribute(k, v));
        svg.appendChild(l);
        return l;
      }
      function colok(port, pb) {
        if (jeda > 0) return;
        if (!pilih) { c.task('Pilih perangkat di kiri dulu!'); return; }
        if (pilih.port === port) {
          garis(pilih.b, pb, '#22c55e');
          pilih.b.disabled = true; pilih.b.classList.remove('sel'); pilih.b.classList.add('ok');
          sfx('sfx_pasang'); c.tambah(10);
          c.task(`✅ ${pilih.nama} → port ${port}`);
          pilih = null;
          if (--sisa === 0) { c.tambah(20); c.task('🔌 Semua tersambung! Ronde berikutnya...'); jeda = 1.4; }
        } else {
          const l = garis(pilih.b, pb, '#ef4444');
          setTimeout(() => l.remove(), 600);
          c.salah();
          c.task(`${pilih.nama} memakai port ${pilih.port}, bukan ${port}.`);
        }
      }
      Object.entries(PORT).forEach(([nama, img]) => { const b = tombolGambar(nama, img); b.onclick = () => colok(nama, b); kanan.appendChild(b); });
      function ronde() {
        kiri.innerHTML = ''; svg.innerHTML = ''; pilih = null;
        const alat = acak(ALAT_PORT).slice(0, 5);
        sisa = alat.length;
        alat.forEach(([nama, img, port]) => {
          const b = tombolGambar(nama, img);
          b.onclick = () => { if (b.disabled) return; kiri.querySelectorAll('.gpick').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); pilih = { nama, port, b }; };
          kiri.appendChild(b);
        });
        c.task('Tap perangkat di kiri, lalu tap port yang cocok di kanan');
      }
      c.hint('Kiri = perangkat · Kanan = port di belakang CPU');
      ronde();
      c.update = dt => { if (jeda > 0 && (jeda -= dt) <= 0) ronde(); };
    },
  },

  suika: {
    jenjang: 'kelas7', ikon: '🫧', nama: 'Gabung Satuan Data', desc: 'Jatuhkan & gabungkan satuan yang sama: bit → byte → KB → … (ala Suika).', waktu: 120,
    main(c) {
      const R = RANTAI.kelas7, batasEl = c.el(null, 'gdanger'), prev = c.el(null, 'gbola prev');
      c.pakaiNyawa = false;
      let bola = [], x = c.W() / 2, next = 0, jedaJatuh = 0, atasT = 0;
      const rad = lvl => c.W() * (0.05 + lvl * 0.022);
      const gaya = (el, lvl) => { const r = rad(lvl); el.textContent = R[lvl]; Object.assign(el.style, { width: 2 * r + 'px', height: 2 * r + 'px', fontSize: Math.max(11, r * 0.55) + 'px' }); };
      const buat = (lvl, x, y) => { const el = c.el(null, 'gbola lv' + lvl); gaya(el, lvl); const b = { lvl, x, y, vx: 0, vy: 0, r: rad(lvl), el, umur: 0 }; bola.push(b); return b; };
      const siapkan = () => { next = Math.floor(Math.random() * 3); prev.className = 'gbola prev lv' + next; gaya(prev, next); };
      const jatuhkan = () => { if (jedaJatuh > 0) return; buat(next, x, rad(next) + 4); jedaJatuh = 0.6; siapkan(); sfx('sfx_klik'); };
      siapkan();
      c.onTap = px => { x = px; };
      c.onDrag = px => { x = px; };
      c.onKlik = px => { x = px; jatuhkan(); };
      c.onSwipe = () => jatuhkan();
      c.onKey = (k, d) => { if (d && (k === ' ' || k === 'ArrowDown')) jatuhkan(); };
      c.task(`Gabungkan 2 yang sama → naik: ${R.join(' → ')}`);
      c.hint('Geser untuk membidik, lepas untuk menjatuhkan. Jangan melewati garis merah!');
      c.update = dt => {
        const W = c.W(), H = c.H(), BATAS = 70;
        if (c.keys.has('ArrowLeft')) x -= 250 * dt;
        if (c.keys.has('ArrowRight')) x += 250 * dt;
        const rn = rad(next);
        x = Math.max(rn, Math.min(W - rn, x));
        c.pos(prev, x, rn + 4);
        jedaJatuh -= dt;
        c.box(batasEl, 0, BATAS, W, 3);
        for (const b of bola) {
          b.umur += dt; b.vy += 900 * dt; b.x += b.vx * dt; b.y += b.vy * dt; b.vx *= 0.995;
          if (b.x < b.r) { b.x = b.r; b.vx *= -0.3; }
          if (b.x > W - b.r) { b.x = W - b.r; b.vx *= -0.3; }
          if (b.y > H - b.r) { b.y = H - b.r; b.vy *= -0.2; b.vx *= 0.9; }
        }
        // Tabrakan antarbola: tingkat sama → gabung; beda → saling dorong.
        for (let it = 0; it < 4; it++) {
          for (let i = 0; i < bola.length; i++) for (let j = i + 1; j < bola.length; j++) {
            const a = bola[i], b = bola[j];
            if (a.mati || b.mati) continue;
            const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 0.01, min = a.r + b.r;
            if (d >= min) continue;
            if (a.lvl === b.lvl && a.lvl < R.length - 1) {
              a.mati = b.mati = true;
              buat(a.lvl + 1, (a.x + b.x) / 2, (a.y + b.y) / 2).vy = -120;
              c.tambah((a.lvl + 1) * 10);
              continue;
            }
            const nx = dx / d, ny = dy / d, o = (min - d) / 2;
            a.x -= nx * o; a.y -= ny * o; b.x += nx * o; b.y += ny * o;
            const rv = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
            if (rv < 0) { const imp = -0.6 * rv; a.vx -= imp * nx; a.vy -= imp * ny; b.vx += imp * nx; b.vy += imp * ny; }
          }
          bola = bola.filter(b => !b.mati || (b.el.remove(), false));
        }
        bola.forEach(b => c.pos(b.el, b.x, b.y));
        atasT = bola.some(b => b.umur > 1 && b.y - b.r < BATAS) ? atasT + dt : 0;
        batasEl.classList.toggle('bahaya', atasT > 0);
        if (atasT > 1.5) c.selesai('🫧 WADAH PENUH!');
      };
    },
  },

  dokter: {
    jenjang: 'kelas7', ikon: '🩺', nama: 'Dokter Komputer', desc: 'Dengarkan keluhan komputer, pilih penanganan yang tepat.',
    main(c) {
      pasangGambar(c, 'dokter', 'gdok');
      const pasien = pasangGambar(c, 'pasien_sakit', 'gpasien'), bubble = c.el(null, 'gbubble'), opsi = c.el(null, 'ggrid gopsi'), bar = c.el(null, 'gtimer');
      const ambilKasus = antrean(KASUS), batas = 15;
      let kasus, sisa = 0, jeda = 0;
      const tandai = () => [...opsi.children].forEach(x => { x.disabled = true; if (x.textContent === kasus[1]) x.classList.add('ok'); });
      function obati(t, b) {
        if (jeda > 0) return;
        tandai();
        if (t === kasus[1]) { pasien.src = IMG('pasien_sehat'); c.tambah(10); c.task(`✅ Pasien sembuh! ${kasus[2]}`); }
        else { b.classList.add('no'); c.salah(); c.task(`❌ ${kasus[2]}`); }
        jeda = 2.2;
      }
      function baru() {
        kasus = ambilKasus();
        pasien.src = IMG('pasien_sakit');
        bubble.textContent = `🤒 "${kasus[0]}"`;
        const lain = acak(KASUS.filter(k => k !== kasus).map(k => k[1])).slice(0, 3);
        opsi.innerHTML = '';
        acak([kasus[1], ...lain]).forEach(t => { const b = document.createElement('button'); b.textContent = t; b.onclick = () => obati(t, b); opsi.appendChild(b); });
        sisa = batas;
        c.task('Apa penanganan yang tepat?');
      }
      c.hint('Setiap pasien menunggu 15 detik');
      baru();
      c.update = dt => {
        if (jeda > 0) { if ((jeda -= dt) <= 0) baru(); return; }
        sisa -= dt;
        bar.style.width = (sisa / batas * 100) + '%';
        if (sisa <= 0) { c.salah(); tandai(); c.task(`⏱️ Pasien menunggu terlalu lama! ${kasus[2]}`); jeda = 2.2; }
      };
    },
  },

  /* ---------- KELAS 8 ---------- */
  parsons: {
    jenjang: 'kelas8', ikon: '🧩', nama: 'Susun Kode', desc: 'Susun baris kode HTML yang teracak sampai hasilnya sama (Parsons Puzzle).',
    main(c) {
      const box = kolom(c);
      box.innerHTML = '<div class="gpreview"><small>Hasil yang diminta (tampilan di browser):</small><iframe sandbox="" title="Hasil"></iframe></div><div class="gcode jawab"></div><div class="gcode acak"></div>';
      const frame = box.querySelector('iframe'), jawab = box.querySelector('.jawab'), pilihan = box.querySelector('.acak'), ambilPz = antrean(PARSONS);
      let pz, idx = 0, jeda = 0;
      function ketuk(b) {
        if (jeda > 0) return;
        const t = b.textContent;
        if (t === pz.baris[idx]) {
          idx++; b.remove();
          const d = document.createElement('div'); d.textContent = t; jawab.appendChild(d);
          sfx('sfx_pasang'); c.skor += 2; c.hud();
          if (idx === pz.baris.length) { c.tambah(30); c.task('✅ Kode lengkap! Hasilnya sama dengan yang diminta.'); jeda = 2; }
        } else {
          b.classList.add('no'); setTimeout(() => b.classList.remove('no'), 400);
          c.salah();
          c.task(`Baris ke-${idx + 1} bukan "${t.trim()}". Lihat lagi urutan struktur HTML-nya.`);
        }
      }
      function baru() {
        pz = ambilPz(); idx = 0;
        frame.srcdoc = pz.baris.join('\n');
        jawab.innerHTML = '<small>Kodemu:</small>';
        pilihan.innerHTML = '';
        acak(pz.baris).forEach(t => { const b = document.createElement('button'); b.textContent = t; b.onclick = () => ketuk(b); pilihan.appendChild(b); });
        c.task(`Susun kode "${pz.judul}" — tap baris dari ATAS ke BAWAH`);
      }
      c.hint('Tap baris kode sesuai urutan yang benar');
      baru();
      c.update = dt => { if (jeda > 0 && (jeda -= dt) <= 0) baru(); };
    },
  },

  csskafe: {
    jenjang: 'kelas8', ikon: '☕', nama: 'CSS Kafe', desc: 'Racik deklarasi CSS sampai tampilannya sama dengan pesanan (ala CSS Diner).',
    main(c) {
      const box = kolom(c);
      box.innerHTML = `<div class="gduo"><div><small>🧾 Pesanan</small><div class="gtampil">Halo Dunia</div></div><div><small>🍵 Racikanmu</small><div class="gtampil">Halo Dunia</div></div></div>
        <pre class="gcss"></pre><div class="gchips"></div>`;
      const [tTarget, tKamu] = box.querySelectorAll('.gtampil'), kode = box.querySelector('.gcss'), opsi = box.querySelector('.gchips');
      let target = [], pakai = [], n = 0, jeda = 0;
      const tulis = (extra = []) => {
        tKamu.style.cssText = [...pakai, ...extra].join(';');
        kode.textContent = `p {\n${pakai.map(d => `  ${d};`).join('\n')}\n}`;
      };
      function pilih(d, b) {
        if (jeda > 0 || b.disabled) return;
        b.disabled = true;
        if (target.includes(d)) {
          pakai.push(d); b.classList.add('ok'); tulis(); sfx('sfx_pasang');
          if (pakai.length === target.length) { c.tambah(10 * target.length); c.task('✅ Racikan sesuai pesanan!'); jeda = 1.5; }
        } else {
          b.classList.add('no'); c.salah();
          c.task(`"${d}" tidak ada di pesanan. Bandingkan lagi tampilannya.`);
          tulis([d]); setTimeout(() => tulis(), 700);   // perlihatkan sekilas efek yang salah
        }
      }
      function baru() {
        n++;
        const k = Math.min(3, 1 + Math.floor(n / 3)), props = new Set();
        target = [];
        for (const [d, p] of acak(DEKLARASI)) { if (target.length === k) break; if (!props.has(p)) { props.add(p); target.push(d); } }
        pakai = [];
        tTarget.style.cssText = target.join(';');
        tulis();
        const salah = acak(DEKLARASI.map(d => d[0]).filter(d => !target.includes(d))).slice(0, 6 - k);
        opsi.innerHTML = '';
        acak([...target, ...salah]).forEach(d => { const b = document.createElement('button'); b.textContent = d; b.onclick = () => pilih(d, b); opsi.appendChild(b); });
        c.task(`Pesanan #${n}: buat "Racikanmu" sama persis dengan "Pesanan" (${k} deklarasi)`);
      }
      c.hint('Tap deklarasi CSS yang membuat tampilan sama');
      baru();
      c.update = dt => { if (jeda > 0 && (jeda -= dt) <= 0) baru(); };
    },
  },

  caribug: {
    jenjang: 'kelas8', ikon: '🐞', nama: 'Cari Bug Kode', desc: 'Temukan baris kode HTML yang salah.',
    main(c) {
      const box = kolom(c);
      box.innerHTML = `<div class="gbuginfo"><img src="${IMG('boss_kelas8')}" alt=""><span>Ada 1 baris yang salah! Tap baris yang mengandung bug.</span></div><div class="gcode bug"></div>`;
      const kode = box.querySelector('.bug'), ambilBug = antrean(BUGS);
      let soal, jeda = 0;
      function pilih(i, b) {
        if (jeda > 0) return;
        if (i === soal.bug) { b.classList.add('ok'); c.tambah(10); c.task(`✅ Ketemu! ${soal.fix}`); }
        else { b.classList.add('no'); kode.children[soal.bug].classList.add('ok'); c.salah(); c.task(`❌ Bug ada di baris ${soal.bug + 1}. ${soal.fix}`); }
        jeda = 2.8;
      }
      function baru() {
        soal = ambilBug();
        kode.innerHTML = '';
        soal.kode.forEach((t, i) => {
          const b = document.createElement('button');
          b.innerHTML = `<i>${i + 1}</i>`;
          b.append(t);
          b.onclick = () => pilih(i, b);
          kode.appendChild(b);
        });
        c.task('🐞 Cari bug-nya!');
      }
      c.hint('Perhatikan tag pembuka/penutup, nama atribut, dan tanda baca');
      baru();
      c.update = dt => { if (jeda > 0 && (jeda -= dt) <= 0) baru(); };
    },
  },

  prompt: {
    jenjang: 'kelas8', ikon: '🤖', nama: 'Prompt Master', desc: 'Rakit prompt yang lengkap & aman dari potongan kalimat.',
    main(c) {
      const box = kolom(c);
      box.innerHTML = `<div class="gbuginfo"><img src="${IMG('ai_bot')}" alt=""><span></span></div><div class="gprompt"></div>
        <div class="gchips teks"></div><button class="btn" style="margin:0">Kirim ke AI 🤖</button>`;
      const tujuan = box.querySelector('.gbuginfo span'), teks = box.querySelector('.gprompt'), chips = box.querySelector('.gchips'), kirim = box.querySelector('.btn');
      const URUT = ['tugas', 'topik', 'isi', 'gaya', 'format'], WAJIB = { tugas: 'perintah tugas', topik: 'topik', isi: 'isi yang diminta' }, ambilRonde = antrean(PROMPT_RONDE);
      let r, pilih = new Set(), jeda = 0;
      const tulis = () => {
        const t = [...pilih].sort((a, b) => URUT.indexOf(a[1]) - URUT.indexOf(b[1])).map(k => k[0]).join(' ');
        teks.textContent = t ? `"${t}"` : '(prompt masih kosong — tap potongan di bawah)';
      };
      function baru() {
        r = ambilRonde(); pilih = new Set();
        tujuan.textContent = `🎯 Tujuan: ${r.tujuan}`;
        chips.innerHTML = '';
        acak(r.chips).forEach(k => {
          const b = document.createElement('button');
          b.textContent = k[0];
          b.onclick = () => { if (jeda > 0) return; pilih.has(k) ? pilih.delete(k) : pilih.add(k); b.classList.toggle('sel'); tulis(); };
          chips.appendChild(b);
        });
        tulis();
        c.task('Pilih potongan yang membuat prompt jelas & aman, lalu kirim');
      }
      kirim.onclick = () => {
        if (jeda > 0) return;
        const buruk = [...pilih].find(k => k[1] === 'buruk');
        const kurang = Object.keys(WAJIB).filter(w => ![...pilih].some(k => k[1] === w));
        if (buruk) { c.salah(); c.task(`🤖 Hmm... "${buruk[0]}" — ${buruk[2]}`); return; }
        if (kurang.length) { c.salah(); c.task(`🤖 Prompt belum lengkap: belum ada ${kurang.map(w => WAJIB[w]).join(', ')}.`); return; }
        const bonus = [...pilih].filter(k => k[1] === 'gaya' || k[1] === 'format').length;
        c.tambah(20 + bonus * 10);
        c.task(`🤖 Siap! ${'⭐'.repeat(3 + bonus)} ${bonus < 2 ? 'Tambahkan gaya & format agar hasil makin sesuai.' : 'Prompt sempurna!'}`);
        jeda = 2.4;
      };
      c.hint('Prompt yang baik: tugas + topik + isi (+ gaya & format). Hindari data pribadi!');
      baru();
      c.update = dt => { if (jeda > 0 && (jeda -= dt) <= 0) baru(); };
    },
  },

  /* ---------- KELAS 9 ---------- */
  rapikan: {
    jenjang: 'kelas9', ikon: '🧹', nama: 'Rapikan Slide', desc: 'Temukan dan perbaiki bagian slide yang melanggar prinsip desain.',
    main(c) {
      const box = kolom(c), slide = document.createElement('div');
      slide.className = 'gslide';
      box.appendChild(slide);
      const ambilTopik = antrean(TOPIK_SLIDE);
      const BAGIAN = {
        judul: { alasan: 'Judul terlalu kecil & samar → diperbesar', baik: t => `<div class="sj">${t.judul}</div>`, buruk: t => `<div class="sj" style="font-size:.6em;color:#cbd5e1">${t.judul}</div>` },
        isi: { alasan: 'Paragraf panjang → diubah jadi poin singkat', baik: t => `<ul>${t.poin.map(p => `<li>${p}</li>`).join('')}</ul>`, buruk: t => `<p class="sp">${t.paragraf}</p>` },
        gambar: { alasan: 'Gambar buram → diganti yang tajam', baik: t => `<img src="${IMG(t.img)}" alt="">`, buruk: t => `<img src="${IMG(t.img)}" alt="" style="filter:blur(5px)">` },
        pesan: { alasan: 'Kontras rendah (kuning di putih) → warna gelap', baik: t => `<div class="spesan">${t.ajakan}</div>`, buruk: t => `<div class="spesan" style="color:#fde68a">${t.ajakan}</div>` },
        hiasan: { alasan: 'Hiasan & animasi berlebihan → dihapus', baik: () => '', buruk: () => '<div class="shias">✨🎆🌈💥🎉</div>' },
        sumber: { alasan: 'Sumber tidak jelas → sumber resmi dicantumkan', baik: t => `<div class="ssum">${t.sumber}</div>`, buruk: () => '<div class="ssum">Sumber: katanya grup WA</div>' },
      };
      let t, rusak = new Set(), jeda = 0;
      const bagian = b => `<div class="sbag" data-b="${b}">${(rusak.has(b) ? BAGIAN[b].buruk : BAGIAN[b].baik)(t)}</div>`;
      const render = () => { slide.innerHTML = `${bagian('hiasan')}${bagian('judul')}<div class="sbody"><div>${bagian('isi')}${bagian('pesan')}</div>${bagian('gambar')}</div>${bagian('sumber')}`; };
      function baru() {
        t = ambilTopik();
        const keys = Object.keys(BAGIAN);
        do rusak = new Set(keys.filter(() => Math.random() < 0.5)); while (rusak.size < 2 || rusak.size > 4);
        render();
        c.task(`Slide ini punya ${rusak.size} masalah. Tap bagian yang salah untuk memperbaikinya!`);
      }
      slide.onclick = e => {
        const el = e.target.closest('[data-b]');
        if (!el || jeda > 0) return;
        const b = el.dataset.b;
        if (rusak.has(b)) {
          rusak.delete(b); render();
          slide.querySelector(`[data-b="${b}"]`).classList.add('fixed');
          c.tambah(10);
          c.task(`✅ ${BAGIAN[b].alasan}${rusak.size ? ` · sisa ${rusak.size} masalah` : ''}`);
          if (!rusak.size) { c.tambah(20); c.task('🎉 Slide sudah rapi! Slide berikutnya...'); jeda = 2; }
        } else {
          c.salah();
          c.task('Bagian ini sudah baik. Cari bagian lain yang bermasalah!');
        }
      };
      c.hint('Cek: ukuran judul, panjang teks, ketajaman gambar, kontras, hiasan, sumber');
      baru();
      c.update = dt => { if (jeda > 0 && (jeda -= dt) <= 0) baru(); };
    },
  },

  aifakta: {
    jenjang: 'kelas9', ikon: '🕵️', nama: 'AI atau Fakta?', desc: 'Nilai jawaban AI: fakta atau halusinasi? Boleh cek sumber.',
    main(c) {
      const box = kolom(c);
      box.innerHTML = `<div class="gchat"><img src="${IMG('ai_bot')}" alt=""><div class="gbubble2"></div></div><div class="gsumber hidden"></div>
        <div class="gbtns2"><button style="background:#16a34a">✅ FAKTA</button><button style="background:#dc2626">❌ HALUSINASI</button></div>
        <button class="btn alt" style="margin:0">🔎 Cek sumber dulu (poin jadi setengah, −3 detik)</button>`;
      const teks = box.querySelector('.gbubble2'), sumber = box.querySelector('.gsumber'), [bF, bH] = box.querySelectorAll('.gbtns2 button'), bCek = box.querySelector('.btn'), ambilKlaim = antrean(KLAIM_AI);
      let k, cek = false, jeda = 0;
      function baru() { k = ambilKlaim(); cek = false; teks.textContent = k[0]; sumber.classList.add('hidden'); c.task('Pernyataan AI ini FAKTA atau HALUSINASI?'); }
      const jawab = f => {
        if (jeda > 0) return;
        if (f === k[1]) { c.tambah(cek ? 5 : 10); c.task(`✅ Benar! ${k[2]}`); }
        else { c.salah(); c.task(`❌ Itu ${k[1] ? 'FAKTA' : 'HALUSINASI'}. ${k[2]}`); }
        jeda = 2.6;
      };
      bF.onclick = () => jawab(true);
      bH.onclick = () => jawab(false);
      bCek.onclick = () => {
        if (cek || jeda > 0) return;
        cek = true; c.waktu -= 3;
        sumber.textContent = `📚 Hasil cek sumber terpercaya: ${k[2]}`;
        sumber.classList.remove('hidden');
      };
      c.onKey = (key, d) => { if (d && key === 'ArrowLeft') jawab(true); if (d && key === 'ArrowRight') jawab(false); };
      c.hint('Ragu? Cek sumber dulu — lebih lambat, tapi tidak tertipu');
      baru();
      c.update = dt => { if (jeda > 0 && (jeda -= dt) <= 0) baru(); };
    },
  },

  studio: {
    jenjang: 'kelas9', ikon: '🎬', nama: 'Studio Presentasi', desc: 'Rancang slide sesuai brief, lalu dinilai 3 juri.',
    main(c) {
      const box = kolom(c);
      box.innerHTML = '<div class="gbrief"></div><div class="gslide"></div><div class="gstep"></div><div class="gchips teks"></div>';
      const brief = box.querySelector('.gbrief'), slide = box.querySelector('.gslide'), langkah = box.querySelector('.gstep'), opsi = box.querySelector('.gchips');
      const LANGKAH = ['judul', 'isi', 'gambar', 'warna', 'huruf'], NAMA = { judul: 'Judul', isi: 'Isi', gambar: 'Gambar', warna: 'Warna', huruf: 'Huruf' }, ambilBrief = antrean(STUDIO_BRIEF);
      let br, step = 0, pilihan = {}, jeda = 0;
      function render() {
        slide.style.cssText = (pilihan.warna?.[3] || '') + (pilihan.huruf?.[3] || '');
        slide.innerHTML = '<div class="sj"></div><div class="sbody"><div class="si"></div><img alt=""></div>';
        slide.querySelector('.sj').textContent = pilihan.judul?.[0] || 'Judul…';
        slide.querySelector('.si').textContent = pilihan.isi?.[0] || 'Isi…';
        const img = slide.querySelector('img'), g = pilihan.gambar;
        if (!g) img.style.visibility = 'hidden';
        else { img.src = IMG(g[3] === 'meme' ? 'boss_kelas7' : br.img); if (g[3] === 'buram') img.style.filter = 'blur(4px)'; }
      }
      function nilai() {
        const ops = LANGKAH.map(l => pilihan[l]), total = ops.reduce((s, o) => s + o[1], 0), bintang = Math.max(1, Math.round(total / 2));
        langkah.textContent = `Nilai juri: ${total}/10`;
        opsi.innerHTML = `<div class="gjuri">${[0, 1, 2].map(() => `<div><img src="${IMG('juri')}" alt=""><b>${'⭐'.repeat(bintang)}</b></div>`).join('')}</div>`;
        const kritik = ops.filter(o => o[2]).map(o => o[2]);
        c.task(kritik.length ? `💬 Juri: ${kritik.join('; ')}.` : '💬 Juri: Sempurna! Jelas, menarik, dan cocok untuk audiensnya.');
        if (total >= 8) c.tambah(total * 4); else if (total >= 5) c.tambah(total * 2); else c.salah();
        jeda = 4;
      }
      function tampilLangkah() {
        const l = LANGKAH[step], ops = l === 'judul' || l === 'isi' ? br[l] : STUDIO_UMUM[l];
        langkah.textContent = `Langkah ${step + 1}/5: pilih ${NAMA[l]}`;
        opsi.innerHTML = '';
        acak(ops).forEach(op => {
          const b = document.createElement('button');
          b.textContent = op[0].replace(/\n/g, ' ');
          b.onclick = () => { if (jeda > 0) return; pilihan[l] = op; render(); step++; step < 5 ? tampilLangkah() : nilai(); };
          opsi.appendChild(b);
        });
      }
      function baru() {
        br = ambilBrief(); step = 0; pilihan = {};
        brief.textContent = `📋 Brief: "${br.topik}" untuk ${br.audiens}`;
        render(); tampilLangkah();
        c.task('Rancang slide terbaik sesuai brief!');
      }
      c.hint('Ingat audiensnya! Nilai 8+ = poin penuh, di bawah 5 = nyawa berkurang');
      baru();
      c.update = dt => { if (jeda > 0 && (jeda -= dt) <= 0) baru(); };
    },
  },

  hoaks: {
    jenjang: 'kelas9', ikon: '📰', nama: 'Lawan Hoaks', desc: 'Periksa postingan media sosial: laporkan hoaks, bagikan yang valid.',
    main(c) {
      const box = kolom(c);
      box.innerHTML = '<div class="gpost"></div><div class="gbtns2"><button style="background:#dc2626">🚫 Hoaks — Laporkan</button><button style="background:#16a34a">✅ Valid — Bagikan</button></div>';
      const post = box.querySelector('.gpost'), [bL, bB] = box.querySelectorAll('.gbtns2 button'), ambilPost = antrean(POSTS);
      const WARNA = ['#f43f5e', '#8b5cf6', '#0ea5e9', '#f59e0b', '#10b981'];
      let p, n = 0, jeda = 0;
      function baru() {
        p = ambilPost(); n++;
        post.className = 'gpost';
        post.innerHTML = `<div class="gpost-h"><span class="gav" style="background:${WARNA[n % WARNA.length]}"></span><b></b></div><p></p>
          <small>❤️ ${50 + Math.floor(Math.random() * 900)} · 🔁 ${10 + Math.floor(Math.random() * 500)} kali dibagikan</small>`;
        post.querySelector('.gav').textContent = p[0][0];
        post.querySelector('b').textContent = p[0];
        post.querySelector('p').textContent = p[1];
        c.task('Hoaks atau valid? Periksa akun, isi, dan cirinya!');
      }
      const putus = lapor => {
        if (jeda > 0) return;
        if (lapor === p[2]) { c.tambah(10); post.classList.add('stamp-ok'); c.task(`✅ Tepat! ${p[3]}`); }
        else { c.salah(); post.classList.add('stamp-no'); c.task(`❌ ${p[2] ? 'Itu HOAKS' : 'Itu info VALID'}. ${p[3]}`); }
        jeda = 2.8;
      };
      bL.onclick = () => putus(true);
      bB.onclick = () => putus(false);
      c.onKey = (k, d) => { if (d && k === 'ArrowLeft') putus(true); if (d && k === 'ArrowRight') putus(false); };
      c.hint('Ciri hoaks: huruf kapital & tanda seru, minta disebar, sumber tak jelas, minta data pribadi');
      baru();
      c.update = dt => { if (jeda > 0 && (jeda -= dt) <= 0) baru(); };
    },
  },
});
