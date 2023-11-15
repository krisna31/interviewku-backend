/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('job_positions', {
    id: 'id',
    job_field_id: {
      type: 'integer',
      notNull: true,
      references: '"job_fields"',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    description: {
      type: 'TEXT',
      notNull: false,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: false,
    },
  });

  pgm.sql(`
    INSERT INTO job_positions(job_field_id, name, description) 
    VALUES
      (1, 'General', 'Peran yang mencakup berbagai tanggung jawab dalam sebuah organisasi.'),
      (6, 'Barista', 'Membuat dan menyajikan minuman kopi, teh, dan minuman lainnya; merawat mesin kopi; melayani pelanggan dengan ramah.'),
      (6, 'Crew Outlet', 'Menjalankan operasional harian di outlet seperti membersihkan, merapihkan, melayani pelanggan, dan membantu dalam tugas-tugas umum.'),
      (6, 'Waiter/Waitress', 'Melayani pelanggan di restoran, mengambil pesanan, menyajikan makanan dan minuman, menjaga kebersihan di area meja makan.'),
      (6, 'Cook', 'Memasak berbagai hidangan sesuai dengan menu yang ditetapkan, mengelola persediaan bahan makanan, memastikan kualitas makanan yang disajikan.'),
      (6, 'Cook Helper', 'Membantu koki dalam persiapan bahan makanan, membersihkan area dapur, mengatur peralatan memasak.'),
      (6, 'Kitchen', 'Bertanggung jawab atas pengelolaan operasional dapur, termasuk koordinasi staf, pengadaan bahan makanan, dan menjaga kebersihan dapur.'),
      (6, 'Kitchen Crew', 'Melakukan tugas-tugas di dapur seperti mempersiapkan bahan makanan, membantu proses memasak, dan membersihkan area kerja.'),
      (6, 'Bartender', 'Membuat minuman beralkohol dan non-alkohol, mengelola stok minuman, memberikan layanan kepada pelanggan di area bar.'),

      (7, 'Sales Executive', 'Menjalin hubungan dengan pelanggan, mengidentifikasi peluang penjualan, menawarkan produk/jasa kepada pelanggan potensial.'),
      (7, 'Marketing', 'Merencanakan dan melaksanakan strategi pemasaran untuk produk/jasa, membangun merek, dan menarik minat pelanggan.'),
      (7, 'Sales', 'Bertanggung jawab atas penjualan produk/jasa, mungkin juga meliputi negosiasi harga dan penyelesaian transaksi.'),
      (7, 'Sales Marketing', 'Menggabungkan aspek-aspek penjualan dan pemasaran, fokus pada strategi untuk meningkatkan penjualan produk/jasa.'),
      (7, 'Account Executive', 'Mengelola hubungan dengan akun pelanggan, menangani kebutuhan pelanggan, dan memastikan kepuasan pelanggan.'),
      (7, 'Sales Manager', 'Mengelola tim penjualan, menetapkan target penjualan, mengembangkan strategi, dan memantau kinerja penjualan.'),
      (7, 'Sales Engineer', 'Membantu dalam penjualan produk teknis atau berbasis teknologi dengan memberikan pemahaman teknis kepada pelanggan.'),
      (7, 'Marketing Executive', 'Melaksanakan strategi pemasaran, membuat kampanye promosi, dan bertanggung jawab atas aspek pelaksanaan pemasaran.'),
      (7, 'Sales Supervisor', 'Mengawasi dan memimpin tim penjualan, memberikan bimbingan, dan memastikan pencapaian target penjualan.'),
      (7, 'Sales Representative', 'Mewakili perusahaan, menjual produk/jasa kepada pelanggan, membangun dan menjaga hubungan baik dengan pelanggan.'),
      (7, 'Business Development', 'Mencari peluang bisnis baru, mengembangkan strategi pertumbuhan perusahaan, dan menjalin kemitraan atau kesepakatan baru.'),
      (7, 'Sales Counter', 'Menangani penjualan secara langsung di toko/counter, memberikan informasi produk kepada pelanggan, dan menyelesaikan transaksi penjualan.'),

      (8, 'Customer Service', 'Menyediakan layanan dan bantuan kepada pelanggan, menanggapi pertanyaan, keluhan, dan memberikan solusi atas masalah yang timbul.'),
      (8, 'Pramuniaga', 'Melayani pelanggan di toko, membantu dalam pemilihan produk, menjaga kebersihan dan keteraturan di area penjualan.'),
      (8, 'Staff Toko', 'Melakukan berbagai tugas operasional di toko seperti merapihkan barang, membantu pelanggan, dan menjalankan proses penjualan.'),
      (8, 'Staff Laundry', 'Menangani pencucian pakaian dan linen, melayani pelanggan, menjaga kebersihan lingkungan kerja, dan menyelesaikan transaksi laundry.'),
      (8, 'Receptionist', 'Menerima tamu atau pengunjung, menjawab telepon, memberikan informasi dasar, dan mengatur jadwal pertemuan atau reservasi.'),
      (8, 'Telemarketing', 'Menghubungi pelanggan potensial melalui telepon untuk memasarkan produk/jasa, menjelaskan penawaran, dan menanggapi pertanyaan pelanggan.'),
      (8, 'Host Live Streaming', 'Memandu acara live streaming, berinteraksi dengan pemirsa, menyajikan konten, menjawab pertanyaan, dan menjaga alur acara yang lancar.'),
      
      (9, 'Finance Staff', 'Menyediakan dukungan administratif di departemen keuangan, memproses transaksi, dan membantu dalam pemeliharaan catatan keuangan.'),
      (9, 'Accountant', 'Bertanggung jawab atas pemeliharaan catatan keuangan, persiapan laporan keuangan, analisis data keuangan, dan perpajakan.'),
      (9, 'Auditor', 'Melakukan pemeriksaan atau audit internal atau eksternal untuk menilai kepatuhan perusahaan terhadap standar dan prosedur keuangan.'),
      (9, 'Financial Analyst', 'Menganalisis data keuangan, menyusun laporan keuangan, membuat perkiraan keuangan, dan memberikan rekomendasi strategis.'),
      (9, 'Payroll Specialist', 'Mengelola dan memproses gaji karyawan, menghitung penggajian, serta memastikan ketaatan terhadap peraturan perpajakan terkait.'),
      (9, 'Accounts Payable Clerk', 'Memproses dan mengelola tagihan yang harus dibayarkan oleh perusahaan kepada pemasok atau vendor.'),
      (9, 'Accounts Receivable Clerk', 'Mengelola tagihan yang harus diterima oleh perusahaan dari pelanggan atau klien.'),
      (9, 'Budget Analyst', 'Mengembangkan, mengelola, dan menganalisis anggaran perusahaan untuk memastikan penggunaan dana yang efisien.'),
      (9, 'Cost Accountant', 'Menganalisis biaya produksi, menghitung harga pokok produk, dan menyusun laporan biaya untuk membantu manajemen dalam pengambilan keputusan.'),
      (9, 'Credit Analyst', 'Menganalisis kelayakan kredit pelanggan atau peminjam, mengevaluasi risiko kredit, dan memberikan rekomendasi persetujuan kredit.'),
      (9, 'Investment Analyst', 'Melakukan analisis pasar keuangan, menganalisis investasi, serta memberikan rekomendasi investasi kepada perusahaan atau klien.'),
      (9, 'Treasury Analyst', 'Mengelola keuangan perusahaan, termasuk manajemen likuiditas, pengelolaan risiko, dan investasi keuangan.'),
      (9, 'Collections Specialist', 'Bertanggung jawab atas pengumpulan pembayaran dari pelanggan yang memiliki keterlambatan pembayaran.'),
      (9, 'Billing Specialist', 'Menyiapkan dan mengeluarkan tagihan kepada pelanggan atas produk atau layanan yang digunakan.'),
      (9, 'Kasir', 'Mengelola transaksi tunai atau non-tunai di suatu tempat usaha dan menangani pembayaran dari pelanggan.'),
      
      (10, 'Graphic Designer', 'Membuat desain grafis untuk berbagai keperluan seperti poster, brosur, logo, dan materi pemasaran lainnya.'),
      (10, 'Art Director', 'Bertanggung jawab atas visi artistik dan estetika kreatif suatu proyek, mengarahkan tim desain, dan menyusun konsep artistik.'),
      (10, 'Creative Director', 'Mengawasi aspek kreatif suatu proyek atau perusahaan, mengarahkan tim kreatif, dan mengembangkan strategi kreatif.'),
      (10, 'Web Designer', 'Merancang antarmuka dan tampilan visual untuk situs web, memperhatikan estetika dan fungsionalitas.'),
      (10, 'User Experience (UX) Designer', 'Fokus pada pengalaman pengguna dengan merancang alur, navigasi, dan interaksi dalam produk digital.'),
      (10, 'User Interface (UI) Designer', 'Membuat elemen visual seperti tombol, ikon, dan layout untuk memastikan antarmuka pengguna yang intuitif dan menarik.'),
      (10, 'Brand Identity Designer', 'Menciptakan elemen-elemen visual yang merepresentasikan identitas merek, seperti logo, warna, dan gaya visual.'),
      (10, 'Packaging Designer', 'Merancang kemasan produk yang menarik dan fungsional, mempertimbangkan desain, keamanan, dan daya tarik konsumen.'),
      (10, 'Motion Graphics Designer', 'Menciptakan grafik bergerak, animasi, dan efek visual untuk video, iklan, atau konten digital lainnya.'),
      (10, '3D Artist', 'Menghasilkan karya tiga dimensi menggunakan perangkat lunak khusus untuk berbagai keperluan seperti film, game, atau arsitektur.'),
      (10, 'Visual Effects (VFX) Artist', 'Bertanggung jawab atas pembuatan efek visual yang digunakan dalam film, iklan, dan produksi multimedia lainnya.'),
      (10, 'Game Designer', 'Merancang gameplay, level, dan fitur game, memastikan pengalaman bermain yang menarik dan memuaskan.'),
      (10, 'Illustrator', 'Membuat gambar atau ilustrasi untuk berbagai keperluan seperti buku anak-anak, majalah, atau media cetak lainnya.'),
      (10, 'Animator', 'Menghasilkan gerakan atau animasi untuk film, video, game, atau presentasi yang membutuhkan elemen visual bergerak.'),
      (10, 'Multimedia Artist', 'Menciptakan karya seni yang menggunakan berbagai media seperti gambar, suara, video, dan interaktivitas.'),
      
      (11, 'Software Developer', 'Membuat, menguji, dan mengembangkan perangkat lunak untuk berbagai keperluan, menerapkan prinsip pemrograman.'),
      (11, 'Web Developer', 'Mengembangkan aplikasi web, membangun struktur dan fitur pada situs web menggunakan berbagai bahasa pemrograman.'),
      (11, 'Mobile Application Developer', 'Mengembangkan aplikasi mobile untuk platform seperti iOS atau Android, memastikan fungsionalitas dan performa yang baik.'),
      (11, 'Frontend Developer', 'Bertanggung jawab atas bagian dari aplikasi web yang terlihat oleh pengguna, menangani tampilan dan interaksi pengguna.'),
      (11, 'Backend Developer', 'Fokus pada pengembangan bagian "belakang layar" dari aplikasi, seperti server, database, dan logika aplikasi.'),
      (11, 'Full-stack Developer', 'Memiliki kemampuan dalam pengembangan baik frontend maupun backend suatu aplikasi, memahami seluruh siklus pengembangan perangkat lunak.'),
      (11, 'Artificial Intelligence Engineer', 'Menerapkan teknik kecerdasan buatan (AI) untuk membangun sistem yang dapat belajar dan beradaptasi.'),
      (11, 'Data Scientist', 'Menganalisis data, membuat model prediktif, dan menemukan wawasan berharga dari data yang ada.'),
      (11, 'Database Administrator', 'Mengelola, merancang, dan memelihara basis data untuk memastikan keandalan dan ketersediaan data.'),
      (11, 'Cloud Computing Engineer', 'Merancang, mengelola, dan mengoptimalkan infrastruktur komputasi awan (cloud) perusahaan.'),
      (11, 'Information Security Analyst', 'Melindungi sistem dan data perusahaan dari ancaman keamanan, melakukan penilaian risiko dan penerapan kebijakan keamanan.'),
      (11, 'Chief Information Security Officer', 'Bertanggung jawab atas strategi keamanan informasi perusahaan, mengawasi kebijakan keamanan dan kepatuhan.'),
      (11, 'Information Technology Specialist', 'Menyediakan dukungan teknis, mengatasi masalah jaringan, perangkat lunak, atau perangkat keras.'),
      (11, 'Business Analyst', 'Menganalisis kebutuhan bisnis, merancang solusi teknologi informasi, dan memastikan kecocokan antara teknologi dan tujuan bisnis.'),
      (11, 'Systems Analyst', 'Menganalisis dan merancang sistem informasi, memastikan bahwa kebutuhan bisnis terpenuhi dengan teknologi yang efisien.'),
      (11, 'Computer Science Professor', 'Mengajar dan melakukan riset dalam bidang ilmu komputer di lingkungan akademis.'),
      (11, 'Research and Development (R&D) Scientist', 'Melakukan riset, mengembangkan, dan menguji teknologi baru untuk aplikasi masa depan.'),
      (11, 'Game Developer', 'Membuat dan mengembangkan permainan komputer atau video, merancang gameplay dan fitur-fitur permainan.'),
      (11, 'Cybersecurity', 'Menangani keamanan dalam jaringan, aplikasi, dan sistem komputer untuk melindungi dari ancaman siber.'),
      
      (12, 'Bank Security Guard', 'Bertanggung jawab atas keamanan fisik dan perlindungan aset di dalam area bank, memastikan keamanan pelanggan dan karyawan.'),
      (12, 'Security Officer', 'Melakukan patroli, pengawasan, dan pemantauan keamanan di lokasi tertentu, menangani situasi darurat, dan laporan kejadian.'),
      (12, 'Security Supervisor', 'Mengawasi dan memimpin tim keamanan, memberikan arahan kepada petugas keamanan, dan mengelola tugas sehari-hari.'),
      (12, 'Security Manager', 'Bertanggung jawab atas strategi keamanan secara keseluruhan, mengembangkan kebijakan keamanan, dan mengelola tim keamanan.'),
      (12, 'Security Consultant', 'Memberikan saran dan konsultasi kepada perusahaan atau individu tentang keamanan, mengevaluasi risiko, dan memberikan solusi keamanan yang efektif.'),
      (12, 'Fraud Investigator', 'Menyelidiki aktivitas kecurangan atau penipuan, mengumpulkan bukti, menganalisis data untuk mendeteksi pelanggaran atau kegiatan ilegal.'),
      (12, 'Risk Management Specialist', 'Menganalisis risiko bisnis, mengidentifikasi potensi kerugian, dan mengembangkan strategi untuk mengurangi risiko dan kerugian perusahaan.'),
      (12, 'Compliance Officer', 'Memastikan bahwa perusahaan atau organisasi mematuhi peraturan dan kebijakan yang relevan, melaksanakan audit kepatuhan.'),
      (12, 'Information Security Analyst', 'Menangani keamanan informasi perusahaan, melakukan evaluasi risiko keamanan, dan mengimplementasikan kebijakan keamanan.'),
      (12, 'Cybersecurity Specialist', 'Mengkhususkan diri dalam melindungi sistem komputer dan jaringan dari serangan siber, memantau ancaman dan merespons insiden keamanan.'),
      
      (13, 'Dokter', 'Memberikan diagnosis, perawatan, dan manajemen perawatan kesehatan kepada pasien.'),
      (13, 'Perawat', 'Memberikan perawatan langsung kepada pasien, memantau kondisi, memberikan obat, dan merencanakan perawatan.'),
      (13, 'Ahli Bedah', 'Melakukan operasi untuk mengobati penyakit atau cedera pada pasien.'),
      (13, 'Dokter Gigi', 'Menangani masalah kesehatan gigi dan mulut, melakukan pemeriksaan gigi, dan memberikan perawatan gigi.'),
      (13, 'Terapis Fisik', 'Merancang dan melaksanakan program rehabilitasi fisik untuk memulihkan fungsi fisik pasien.'),
      (13, 'Terapis Okupasi', 'Membantu individu dalam mengatasi keterbatasan fisik, mental, atau emosional melalui aktivitas sehari-hari.'),
      (13, 'Terapis Wicara', 'Membantu individu dengan gangguan bicara, bahasa, atau komunikasi dalam mengembangkan keterampilan komunikasi.'),
      (13, 'Asisten Medis', 'Memberikan bantuan klinis kepada dokter dan perawat, melakukan tugas-tugas medis tertentu.'),
      (13, 'Teknolog Radiologi', 'Mengoperasikan peralatan radiologi untuk menghasilkan gambar medis seperti sinar-X, CT scan, atau MRI.'),
      (13, 'Teknisi Laboratorium Medis', 'Melakukan uji laboratorium untuk mendiagnosis penyakit, memeriksa sampel darah, urine, atau jaringan.'),
      (13, 'Teknisi Informasi Kesehatan', 'Bertanggung jawab atas manajemen data kesehatan, pemeliharaan rekam medis elektronik, dan sistem informasi kesehatan.'),
      (13, 'Edukator Kesehatan', 'Memberikan informasi dan edukasi kepada masyarakat tentang kesehatan, mendorong perilaku sehat.'),
      (13, 'Ahli Gizi', 'Merancang rencana nutrisi untuk pasien, memberikan nasihat gizi, dan mendidik tentang kebiasaan makan yang sehat.'),
      (13, 'Konselor Kesehatan Mental', 'Memberikan dukungan emosional, konseling, dan perawatan bagi individu dengan masalah kesehatan mental.'),
      (13, 'Pekerja Sosial', 'Memberikan bantuan sosial, mendukung individu atau keluarga dalam mengatasi masalah sosial atau kesehatan.'),
      
      (14, 'Guru', 'Memberikan pengajaran kepada siswa di sekolah atau institusi pendidikan lainnya.'),
      (14, 'Profesor', 'Mengajar di perguruan tinggi, melakukan riset, dan memberikan kontribusi ilmiah di bidangnya.'),
      (14, 'Pustakawan', 'Mengelola koleksi buku dan sumber informasi di perpustakaan, membantu orang dalam mencari informasi.'),
      (14, 'Konselor Sekolah', 'Memberikan dukungan emosional dan akademis kepada siswa, membantu dalam mengatasi masalah pribadi atau pendidikan.'),
      (14, 'Administrator Pendidikan', 'Mengelola operasional dan administrasi di institusi pendidikan, mengawasi kegiatan harian.'),
      (14, 'Pengembang Kurikulum', 'Merancang, mengembangkan, dan mengevaluasi kurikulum pendidikan.'),
      (14, 'Desainer Instruksional', 'Merancang materi ajar dan kurikulum dengan pendekatan yang inovatif dan efektif.'),
      (14, 'Konsultan Pendidikan', 'Memberikan saran dan konsultasi kepada institusi pendidikan tentang kebijakan atau strategi pendidikan.'),
      (14, 'Guru Les', 'Memberikan pengajaran individual atau kelompok kecil di luar lingkungan sekolah.'),
      (14, 'Analis Kebijakan Pendidikan', 'Menganalisis kebijakan pendidikan, memberikan rekomendasi, dan mengevaluasi dampak kebijakan tersebut.'),
      (14, 'Peneliti Pendidikan', 'Melakukan riset di bidang pendidikan, menganalisis tren pendidikan, dan memberikan solusi berbasis bukti.'),
      (14, 'Jurnalis Pendidikan', 'Melaporkan berita atau informasi terkait dengan dunia pendidikan dan isu-isu terkini dalam pendidikan.'),
      (14, 'Spesialis Teknologi Pendidikan', 'Mengintegrasikan teknologi dalam proses pembelajaran, memberikan pelatihan, dan mendukung penggunaan teknologi dalam pendidikan.'),
      (14, 'Edukator Museum', 'Memberikan tur edukatif dan pengajaran di museum, mengelola program pendidikan museum.'),
      (14, 'Pelatih Perusahaan', 'Memberikan pelatihan kepada karyawan perusahaan, mengembangkan keterampilan dan pengetahuan mereka.'),
      
      (15, 'Aktor', 'Menampilkan karakter dalam pertunjukan teater, film, atau televisi dengan memerankan peran yang ditentukan.'),
      (15, 'Musisi', 'Memainkan musik dan menyajikan karya musik secara live atau dalam rekaman.'),
      (15, 'Dancer', 'Menampilkan gerakan koreografi dan ekspresi artistik dalam bentuk tarian.'),
      (15, 'Film Director', 'Bertanggung jawab atas visi artistik dan visual film, mengarahkan aksi para aktor, dan memandu produksi film.'),
      (15, 'Screenwriter', 'Menulis naskah untuk film, televisi, atau produksi media lainnya.'),
      (15, 'Producer', 'Mengelola aspek produksi keseluruhan, termasuk anggaran, jadwal, dan koordinasi produksi.'),
      (15, 'Sound Engineer', 'Bertanggung jawab atas rekaman suara, pengeditan audio, dan pengaturan teknis suara untuk produksi audio atau rekaman.'),
      (15, 'Lighting Technician', 'Menangani pengaturan pencahayaan untuk pertunjukan, film, atau acara secara live.'),
      (15, 'Set Designer', 'Merancang dan membuat set atau latar belakang untuk produksi teater, film, atau televisi.'),
      (15, 'Costume Designer', 'Mendesain dan membuat kostum untuk karakter dalam produksi pertunjukan atau film.'),
      (15, 'Makeup Artist', 'Mengaplikasikan riasan dan efek visual pada para aktor atau karakter dalam produksi pertunjukan atau film.'),
      (15, 'Special Effects Artist', 'Menciptakan efek khusus, baik mekanis maupun digital, untuk menambahkan dimensi visual khusus dalam produksi film atau televisi.'),
      (15, 'Talent Agent', 'Mewakili para aktor, musisi, atau penari untuk mendapatkan pekerjaan dan menegosiasikan kontrak.'),
      (15, 'Event Planner', 'Merencanakan dan mengelola acara atau pertunjukan, termasuk mengatur lokasi, logistik, dan aspek-aspek lainnya.'),
      (15, 'Publicist', 'Mengelola citra publik para selebriti atau produksi hiburan, mengatur promosi, dan hubungan dengan media.'),
      
      (16, 'Hotel Manager', 'Bertanggung jawab atas operasional hotel, manajemen staf, pelayanan pelanggan, dan keuntungan.'),
      (16, 'Front Desk Agent', 'Menangani check-in/check-out tamu, memberikan informasi tentang hotel, dan menangani reservasi.'),
      (16, 'Housekeeper', 'Membersihkan dan merapikan kamar tamu serta ruang umum hotel, menjaga kebersihan.'),
      (16, 'Chef Hotel', 'Bertanggung jawab atas persiapan dan penyajian makanan di hotel, merencanakan menu dan mengelola dapur.'),
      (16, 'Waiter/Waitress', 'Melayani tamu di restoran hotel, mengambil pesanan, dan menyajikan makanan atau minuman.'),
      (16, 'Bartender', 'Membuat minuman, melayani pelanggan di area bar, dan mengelola stok minuman.'),
      (16, 'Travel Agent', 'Memberikan informasi perjalanan, menawarkan paket perjalanan, dan mengurus reservasi untuk pelanggan.'),
      (16, 'Tour Guide', 'Mengarahkan dan memberikan informasi kepada turis selama perjalanan wisata.'),
      (16, 'Event Coordinator', 'Merencanakan dan mengkoordinasikan acara atau pertemuan di hotel, mengatur logistik, dan detail-detail lainnya.'),
      (16, 'Spa Therapist', 'Memberikan layanan spa kepada tamu hotel, seperti pijat, perawatan kulit, dan perawatan tubuh lainnya.')
      ;
  `);
};

exports.down = (pgm) => {
  pgm.dropTable('job_positions');
};
