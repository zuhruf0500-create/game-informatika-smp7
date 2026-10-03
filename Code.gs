// Backend Informatika Party — Google Apps Script yang menempel di Google Sheets.
// Deploy > New deployment > Web app > Execute as: Me, Who has access: Anyone. Salin URL /exec ke index.html.
const SHEET = 'Data';
const HEAD = ['Waktu Mulai', 'Nama', 'Kelas', 'Materi', 'Nilai', 'Benar', 'Waktu Selesai'];
const KELAS = ['VII.2', 'VII.3', 'VIII.1', 'VIII.2', 'VIII.3', 'IX.1', 'IX.2', 'IX.3'];
const JUMLAH_SOAL = 25;

function doGet(e) {
  const p = e.parameter || {};
  let out;
  try {
    if (p.aksi === 'mulai') out = mulai(p);
    else if (p.aksi === 'selesai') out = selesai(p);
    else out = papan(p.kelas);
  } catch (err) {
    out = { ok: false, pesan: String(err) };
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}

function sheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET);
  if (!sh) {
    sh = ss.insertSheet(SHEET);
    sh.appendRow(HEAD);
    sh.setFrozenRows(1);
  }
  return sh;
}

const norm = s => String(s || '').trim().replace(/\s+/g, ' ');
const kunci = s => norm(s).toLowerCase();

function cekInput(p) {
  const nama = norm(p.nama);
  if (nama.length < 3 || nama.length > 60) throw 'Nama tidak valid';
  if (KELAS.indexOf(p.kelas) < 0) throw 'Kelas tidak valid';
  return nama;
}

function cariBaris(sh, nama, kelas) {
  const v = sh.getDataRange().getValues();
  for (let i = 1; i < v.length; i++) {
    if (kunci(v[i][1]) === kunci(nama) && v[i][2] === kelas) return i + 1;
  }
  return 0;
}

// Percobaan dicatat saat siswa MULAI, sehingga refresh/keluar di tengah game tidak bisa dipakai untuk mengulang.
// Reset darurat: guru cukup menghapus baris siswa tersebut di sheet "Data".
function mulai(p) {
  const nama = cekInput(p);
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sh = sheet();
    if (cariBaris(sh, nama, p.kelas)) {
      return { ok: false, pesan: 'Kamu sudah pernah ikut battle ini. Setiap siswa hanya punya 1 kesempatan.' };
    }
    // Awali dengan ' agar nama seperti "=..." tidak dibaca sebagai rumus.
    sh.appendRow([new Date(), "'" + nama, p.kelas, String(p.materi || ''), '', '', '']);
    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}

function selesai(p) {
  const nama = cekInput(p);
  const benar = Math.max(0, Math.min(JUMLAH_SOAL, Math.floor(Number(p.benar) || 0)));
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sh = sheet();
    const r = cariBaris(sh, nama, p.kelas);
    if (!r) return { ok: false, pesan: 'Data mulai tidak ditemukan. Hubungi guru.' };
    if (sh.getRange(r, 5).getValue() !== '') return { ok: true, pesan: 'Nilai sudah tercatat.' };
    sh.getRange(r, 5, 1, 3).setValues([[benar * (100 / JUMLAH_SOAL), benar, new Date()]]);
    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}

function papan(kelas) {
  const v = sheet().getDataRange().getValues().slice(1);
  const data = v
    .filter(r => !kelas || r[2] === kelas)
    .map(r => ({ nama: r[1], kelas: r[2], nilai: r[4] === '' ? null : Number(r[4]) }));
  return { ok: true, data };
}
