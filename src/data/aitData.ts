import {
  TimePeriod,
  ProvinceAitData,
  RegencyAitData,
  LandCoverBreakdown,
  FaqItem
} from '../types';

export const SUMMARY_STATS = {

  'jan-jul-2026': {
    totalHa: 229000,
    recurringHa: 9827,
    recurringPercentage: 4.28,
    nonRecurringHa: 219513,
    nonRecurringPercentage: 95.72,
    topProvince: 'Kalimantan Barat',
    topProvinceHa: 50558,
    topRegency: 'Kabupaten Merauke (Pasel)',
    topRegencyHa: 33609,
    julySpikeHa: 124040,
    forestAreaPercentage: 59.21,
    forestAreaHa: 129971,
    peatlandPercentage: 37.29,
    peatlandHa: 81858,
    concessionPercentage: 41.00,
    concessionHa: 90090,
    moratoriumPercentage: 35.00,
    moratoriumHa: 76838,
    foluNetSinkPercentage: 32.60,
    foluNetSinkHa: 71565,
    kbaPercentage: 10.13,
    kbaHa: 22228,
  },
  'jan-jun-2026': {
    totalHa: 105000,
    recurringHa: 7060,
    recurringPercentage: 6.70,
    nonRecurringHa: 98241,
    nonRecurringPercentage: 93.30,
    topProvince: 'Kalimantan Barat',
    topProvinceHa: 25500,
    topRegency: 'Kabupaten Bengkalis (Riau)',
    topRegencyHa: 12081,
    julySpikeHa: 16947,
    forestAreaPercentage: 54.72,
    forestAreaHa: 53759,
    peatlandPercentage: 52.33,
    peatlandHa: 51414,
    concessionPercentage: 50.25,
    concessionHa: 49364,
    moratoriumPercentage: 40.20,
    moratoriumHa: 39496,
    foluNetSinkPercentage: 44.99,
    foluNetSinkHa: 44200,
    kbaPercentage: 10.76,
    kbaHa: 10567,
  }
};

export const MONTHLY_TREND_2026 = [
  { month: 'Januari', ha: 19288, label: '19,3 ribu ha' },
  { month: 'Februari', ha: 10837, label: '10,8 ribu ha' },
  { month: 'Maret', ha: 34015, label: '34,0 ribu ha' },
  { month: 'April', ha: 9827, label: '9,8 ribu ha' },
  { month: 'Mei', ha: 6033, label: '6,0 ribu ha' },
  { month: 'Juni', ha: 15474, label: '15,5 ribu ha' },
  { month: 'Juli', ha: 124040, label: '124,0 ribu ha' },
];

export const PROVINCES_DATA: ProvinceAitData[] = [
  {
    id: 'kalbar',
    name: 'Kalimantan Barat',
    island: 'Kalimantan',
    totalHa: 50558,
    riskLevel: 'Kritis',
    monthly: { jan: 6427, feb: 3113, mar: 13869, apr: 794, may: 157, jun: 758, jul: 25441 },
    topRegencies: [
      { name: 'Ketapang', ha: 13072 },
      { name: 'Kubu Raya', ha: 10963 },
      { name: 'Mempawah', ha: 6877 },
      { name: 'Kayong Utara', ha: 5394 },
      { name: 'Sanggau', ha: 4106 },
    ],
    kawasanHutanHa: 28400,
    gambutHa: 24300,
    izinSawitHa: 18500,
    coordinates: { x: 310, y: 220 },
  },
  {
    id: 'pasel',
    name: 'Papua Selatan',
    island: 'Papua',
    totalHa: 41790,
    riskLevel: 'Kritis',
    monthly: { jan: 234, feb: 93, mar: 48, apr: 96, may: 194, jun: 3706, jul: 37418 },
    topRegencies: [
      { name: 'Merauke', ha: 33609 },
      { name: 'Mappi', ha: 8510 },
      { name: 'Asmat', ha: 1120 },
    ],
    kawasanHutanHa: 26500,
    gambutHa: 15200,
    izinSawitHa: 9800,
    coordinates: { x: 920, y: 380 },
  },
  {
    id: 'riau',
    name: 'Riau',
    island: 'Sumatera',
    totalHa: 20699,
    riskLevel: 'Tinggi',
    monthly: { jan: 419, feb: 5033, mar: 10092, apr: 4131, may: 132, jun: 409, jul: 482 },
    topRegencies: [
      { name: 'Bengkalis', ha: 12279 },
      { name: 'Pelalawan', ha: 6145 },
      { name: 'Siak', ha: 1280 },
      { name: 'Indragiri Hilir', ha: 995 },
    ],
    kawasanHutanHa: 12100,
    gambutHa: 16800,
    izinSawitHa: 11200,
    coordinates: { x: 140, y: 200 },
  },
  {
    id: 'kalteng',
    name: 'Kalimantan Tengah',
    island: 'Kalimantan',
    totalHa: 11723,
    riskLevel: 'Tinggi',
    monthly: { jan: 1132, feb: 205, mar: 362, apr: 79, may: 41, jun: 341, jul: 9563 },
    topRegencies: [
      { name: 'Kotawaringin Barat', ha: 3450 },
      { name: 'Kapuas', ha: 3120 },
      { name: 'Pulang Pisau', ha: 2890 },
    ],
    kawasanHutanHa: 7800,
    gambutHa: 6900,
    izinSawitHa: 4200,
    coordinates: { x: 380, y: 260 },
  },
  {
    id: 'ntt',
    name: 'Nusa Tenggara Timur',
    island: 'Nusa Tenggara',
    totalHa: 10221,
    riskLevel: 'Tinggi',
    monthly: { jan: 7, feb: 18, mar: 117, apr: 47, may: 887, jun: 2018, jul: 7145 },
    topRegencies: [
      { name: 'Sumba Timur', ha: 3839 },
      { name: 'Sumba Barat Daya', ha: 2150 },
      { name: 'Timor Tengah Selatan', ha: 1890 },
    ],
    kawasanHutanHa: 4200,
    gambutHa: 0,
    izinSawitHa: 0,
    coordinates: { x: 520, y: 410 },
  },
  {
    id: 'maluku',
    name: 'Maluku',
    island: 'Maluku',
    totalHa: 10024,
    riskLevel: 'Tinggi',
    monthly: { jan: 134, feb: 292, mar: 99, apr: 478, may: 169, jun: 1126, jul: 8000 },
    topRegencies: [
      { name: 'Kepulauan Aru', ha: 4200 },
      { name: 'Maluku Tenggara', ha: 3100 },
    ],
    kawasanHutanHa: 6100,
    gambutHa: 800,
    izinSawitHa: 1200,
    coordinates: { x: 720, y: 280 },
  },
  {
    id: 'aceh',
    name: 'Aceh',
    island: 'Sumatera',
    totalHa: 9207,
    riskLevel: 'Tinggi',
    monthly: { jan: 3036, feb: 52, mar: 1325, apr: 332, may: 1608, jun: 537, jul: 2077 },
    topRegencies: [
      { name: 'Aceh Selatan', ha: 2080 },
      { name: 'Aceh Barat', ha: 1950 },
      { name: 'Nagan Raya', ha: 1420 },
    ],
    kawasanHutanHa: 5800,
    gambutHa: 2900,
    izinSawitHa: 2100,
    coordinates: { x: 50, y: 80 },
  },
  {
    id: 'kaltim',
    name: 'Kalimantan Timur',
    island: 'Kalimantan',
    totalHa: 8008,
    riskLevel: 'Sedang',
    monthly: { jan: 876, feb: 52, mar: 836, apr: 1110, may: 524, jun: 1339, jul: 3271 },
    topRegencies: [
      { name: 'Kutai Timur', ha: 2676 },
      { name: 'Kutai Kartanegara', ha: 2100 },
      { name: 'Paser', ha: 1450 },
    ],
    kawasanHutanHa: 5200,
    gambutHa: 1100,
    izinSawitHa: 2800,
    coordinates: { x: 440, y: 210 },
  },
  {
    id: 'ntb',
    name: 'Nusa Tenggara Barat',
    island: 'Nusa Tenggara',
    totalHa: 5895,
    riskLevel: 'Sedang',
    monthly: { jan: 15, feb: 0, mar: 0, apr: 136, may: 342, jun: 1490, jul: 3913 },
    topRegencies: [
      { name: 'Bima', ha: 2400 },
      { name: 'Sumbawa', ha: 1980 },
    ],
    kawasanHutanHa: 3100,
    gambutHa: 0,
    izinSawitHa: 0,
    coordinates: { x: 460, y: 400 },
  },
  {
    id: 'kepri',
    name: 'Kepulauan Riau',
    island: 'Sumatera',
    totalHa: 4984,
    riskLevel: 'Sedang',
    monthly: { jan: 407, feb: 366, mar: 3510, apr: 507, may: 33, jun: 0, jul: 162 },
    topRegencies: [
      { name: 'Bintan', ha: 2100 },
      { name: 'Karimun', ha: 1650 },
    ],
    kawasanHutanHa: 2100,
    gambutHa: 1800,
    izinSawitHa: 300,
    coordinates: { x: 190, y: 170 },
  },
  {
    id: 'jatim',
    name: 'Jawa Timur',
    island: 'Jawa',
    totalHa: 4890,
    riskLevel: 'Sedang',
    monthly: { jan: 0, feb: 0, mar: 0, apr: 2, may: 12, jun: 618, jul: 4257 },
    topRegencies: [
      { name: 'Pasuruan (Bromo)', ha: 1890 },
      { name: 'Banyuwangi', ha: 1450 },
    ],
    kawasanHutanHa: 3900,
    gambutHa: 0,
    izinSawitHa: 0,
    coordinates: { x: 360, y: 380 },
  },
  {
    id: 'sumut',
    name: 'Sumatera Utara',
    island: 'Sumatera',
    totalHa: 3250,
    riskLevel: 'Rendah',
    monthly: { jan: 895, feb: 87, mar: 1067, apr: 52, may: 296, jun: 49, jul: 804 },
    topRegencies: [
      { name: 'Labuhanbatu', ha: 1100 },
      { name: 'Mandailing Natal', ha: 890 },
    ],
    kawasanHutanHa: 1900,
    gambutHa: 1200,
    izinSawitHa: 950,
    coordinates: { x: 90, y: 130 },
  },
  {
    id: 'sumbar',
    name: 'Sumatera Barat',
    island: 'Sumatera',
    totalHa: 2890,
    riskLevel: 'Rendah',
    monthly: { jan: 639, feb: 290, mar: 555, apr: 42, may: 349, jun: 298, jul: 717 },
    topRegencies: [
      { name: 'Pesisir Selatan', ha: 1811 },
      { name: 'Pasaman Barat', ha: 650 },
    ],
    kawasanHutanHa: 1700,
    gambutHa: 900,
    izinSawitHa: 720,
    coordinates: { x: 100, y: 220 },
  }
];

export const TOP_REGENCIES: RegencyAitData[] = [
  { rank: 1, name: 'Kabupaten Merauke', province: 'Papua Selatan', ha: 33609 },
  { rank: 2, name: 'Kabupaten Ketapang', province: 'Kalimantan Barat', ha: 13072 },
  { rank: 3, name: 'Kabupaten Bengkalis', province: 'Riau', ha: 12279 },
  { rank: 4, name: 'Kabupaten Kubu Raya', province: 'Kalimantan Barat', ha: 10963 },
  { rank: 5, name: 'Kabupaten Mappi', province: 'Papua Selatan', ha: 8510 },
  { rank: 6, name: 'Kabupaten Mempawah', province: 'Kalimantan Barat', ha: 6877 },
  { rank: 7, name: 'Kabupaten Pelalawan', province: 'Riau', ha: 6145 },
  { rank: 8, name: 'Kabupaten Kayong Utara', province: 'Kalimantan Barat', ha: 5394 },
  { rank: 9, name: 'Kabupaten Sanggau', province: 'Kalimantan Barat', ha: 4106 },
  { rank: 10, name: 'Kabupaten Sumba Timur', province: 'Nusa Tenggara Timur', ha: 3839 },
];

export const LAND_COVER_BREAKDOWN: LandCoverBreakdown[] = [
  {
    category: 'Kawasan Hutan (State Forest Area)',
    percentage: 59.21,
    hectares: 129971,
    details: 'Dominan di Hutan Produksi (94.9k ha), Hutan Lindung (18.2k ha), & Hutan Konservasi (16.8k ha).',
    color: '#059669', // Emerald
  },
  {
    category: 'Tumpang Tindih Izin & Konsesi',
    percentage: 41.00,
    hectares: 90090,
    details: 'Terluas di Izin Perkebunan Sawit (35k ha), Konsesi MIGAS (19k ha), & PBPH Kehutanan (16.3k ha).',
    color: '#d97706', // Amber
  },
  {
    category: 'Fungsi Ekosistem Gambut (FE Gambut)',
    percentage: 37.29,
    hectares: 81858,
    details: '49,15k ha di FEG Lindung dan 32,7k ha di FEG Budidaya. 49k ha merupakan gambut terdegradasi/rusak ringan.',
    color: '#b45309', // Brown / Warm Amber
  },
  {
    category: 'Area Moratorium PIPPIB',
    percentage: 35.00,
    hectares: 76838,
    details: '40,1k ha di PIPPIB Gambut, 34,5k ha di PIPPIB Kawasan, dan 2,2k ha di Hutan Primer.',
    color: '#dc2626', // Red
  },
  {
    category: 'Rencana Operasional FOLU Net Sink 2030',
    percentage: 32.60,
    hectares: 71565,
    details: 'Area prioritas komitmen iklim Indonesia. Terjadi lonjakan tajam di Juli hingga 28k ha.',
    color: '#16a34a', // Green
  },
  {
    category: 'Key Biodiversity Area (KBA)',
    percentage: 10.13,
    hectares: 22228,
    details: 'Kawasan bernilai keanekaragaman hayati penting dunia, melonjak tajam dari 1.58k ha di Jun ke 12k ha di Jul.',
    color: '#7c3aed', // Purple
  },
  {
    category: 'Pencadangan Pangan & Energi (Food/Energy)',
    percentage: 14.00,
    hectares: 30782,
    details: '11,6k ha berasal dari koridor non-izin dan 11,8k ha dari koridor PBPH.',
    color: '#eab308', // Yellow
  },
  {
    category: 'Tutupan Hutan Alam (Primary Forest)',
    percentage: 12.70,
    hectares: 27869,
    details: 'Mengalami puncaknya di Juli mencapai 16.2k ha akibat kekeringan tajam.',
    color: '#0d9488', // Teal
  }
];

export const PEATLAND_DAMAGE_BREAKDOWN = [
  { level: 'Rusak Ringan', hectares: 49000, color: '#fcd34d' },
  { level: 'Rusak Sedang', hectares: 20000, color: '#f97316' },
  { level: 'Rusak Berat', hectares: 7900, color: '#dc2626' },
  { level: 'Rusak Sangat Berat', hectares: 2500, color: '#991b1b' },
  { level: 'Tidak Rusak / Intact', hectares: 2458, color: '#22c55e' },
];

export const CONCESSION_TYPE_BREAKDOWN = [
  { name: 'Izin Sawit (Palm Oil)', hectares: 35000, percentage: 38.8 },
  { name: 'Izin MIGAS', hectares: 19000, percentage: 21.1 },
  { name: 'PBPH (Hutan Tanaman/Alam)', hectares: 16300, percentage: 18.1 },
  { name: 'Konsesi Tambang Minerba', hectares: 6400, percentage: 7.1 },
  { name: 'Tumpang Tindih Lainnya', hectares: 13390, percentage: 14.9 },
];

export const VALIDATION_METRICS = [
  {
    title: 'Kecepatan Deteksi (Near Real-Time)',
    value: 'Jeda 1 Minggu (H-3)',
    description: 'Memberikan peringatan dini indikasi terbakar jauh lebih cepat dibanding publikasi resmi bulanan/tahunan.',
  },
  {
    title: 'Koefisien Korelasi vs SIPONGI',
    value: '90,65%',
    description: 'Tingkat kemiripan sebaran akumulasi tiap provinsi antara pemodelan AIT dan data tabulasi resmi SIPONGI Kemenhut.',
  },
  {
    title: 'Akurasi Trendline ($R^2$ Scatter Plot)',
    value: '82.2% - 96.17%',
    description: 'Validasi statistik konsisten yang membuktikan AIT presisi memetakan pergerakan karhutla di Indonesia.',
  },
  {
    title: 'Verifikasi Visual Satelit',
    value: 'Sentinel-2 (B8 B4 B3 & B12 B11 B4)',
    description: 'Diverifikasi langsung dengan citra gelombang inframerah gelombang pendek (SWIR) untuk memastikan kepulan asap dan titik api nyata.',
  }
];

export const SCATTER_PLOT_DATA = [
  { province: 'Kalbar', sipongi: 25.5, ait: 25.5 },
  { province: 'Pasel/Papua', sipongi: 18.2, ait: 19.8 },
  { province: 'Riau', sipongi: 20.1, ait: 20.2 },
  { province: 'Kalteng', sipongi: 11.2, ait: 11.7 },
  { province: 'NTT', sipongi: 9.8, ait: 10.2 },
  { province: 'Aceh', sipongi: 8.9, ait: 9.2 },
  { province: 'Kaltim', sipongi: 7.5, ait: 8.0 },
  { province: 'Maluku', sipongi: 9.2, ait: 10.0 },
  { province: 'NTB', sipongi: 5.5, ait: 5.9 },
  { province: 'Kepri', sipongi: 4.8, ait: 5.0 },
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Konsep AIT',
    question: 'Apa itu Area Indikatif Terbakar (AIT) dan bagaimana cara kerjanya?',
    answer: 'Area Indikatif Terbakar (AIT) adalah model pengamatan dini karhutla yang dikembangkan oleh MADANI Berkelanjutan sejak 2019. Model ini mengolah data titik panas (hotspot) satelit dengan tingkat kepercayaan >60%, lalu memfilter/menapis hotspot palsu di area perkotaan, pabrik/kilang, serta kawah gunung berapi aktif. Hasilnya adalah luasan terindikasi terbakar (dalam hektare) dengan jeda waktu output hanya 1 minggu (hingga H-3).'
  },
  {
    id: 'faq-2',
    category: 'Konsep AIT',
    question: 'Mengapa AIT menggunakan satuan hektare (luas) dan bukan sekadar jumlah titik panas (hotspot)?',
    answer: 'Titik panas (hotspot) hanya menunjukkan suhu tinggi di permukaan bumi pada satu titik koordinat, namun tidak menggambarkan seberapa luas area yang terdampak. AIT mengestimasi luasan riil kebakaran dalam hektare, sehingga masyarakat dan pemangku kepentingan mendapatkan gambaran yang jauh lebih konkret untuk mengukur tingkat keparahan dan kebutuhan penanganan di lapangan.'
  },
  {
    id: 'faq-3',
    category: 'Data & Akurasi',
    question: 'Apakah hasil pemodelan AIT ini akurat jika dibandingkan dengan data pemerintah (SIPONGI)?',
    answer: 'Sangat akurat. Hasil verifikasi statistik AIT disandingkan dengan tabulasi resmi SIPONGI Kemenhut menunjukkan koefisien korelasi sebesar 90,65% dan nilai R² pada scatter plot berkisar 82,2% hingga 96,17%. Contohnya pada periode Jan-Jun 2026, data SIPONGI mencatat 107 ribu hektare sedangkan AIT Madani mencatat 105 ribu hektare.'
  },
  {
    id: 'faq-4',
    category: 'Data & Akurasi',
    question: 'Bagaimana AIT diverifikasi menggunakan citra satelit Sentinel-2?',
    answer: 'Setiap area AIT yang terdeteksi disandingkan dengan citra satelit resolusi tinggi Sentinel-2 dari ESA. Peneliti menggunakan kombinasi band B8-B4-B3 (True/False Color) serta B12-B11-B4 (Short-Wave Infrared / SWIR). Kombinasi SWIR ini sangat efektif menembus asap tipis untuk melihat secara jelas bekas bakar hitam (burn scars) dan kepulan asap aktif di darat.'
  },
  {
    id: 'faq-5',
    category: 'Dampak & Kebijakan',
    question: 'Mengapa terjadi lonjakan tajam AIT pada bulan Juli 2026 (124 ribu hektare)?',
    answer: 'BMKG telah memprediksi bahwa tahun 2026 mengalami fenomena kemarau dan kekeringan ekstrem yang termasuk tertinggi sejak 1950. Memasuki puncak musim kemarau di bulan Juli, vegetasi di kawasan hutan, gambut, dan semak belukar menjadi sangat kering dan rentan terbakar, memicu lonjakan AIT terutama di Kalimantan Barat dan Papua Selatan.'
  },
  {
    id: 'faq-6',
    category: 'Dampak & Kebijakan',
    question: 'Apa risiko jika karhutla terjadi di kawasan Gambut, PIPPIB, dan Konsesi?',
    answer: 'Kebakaran di lahan gambut merilis emisi karbon dalam jumlah masif dan memicu kabut asap tebal beracun yang sulit dipadamkan karena api membakar di bawah permukaan. Kebakaran di area PIPPIB (moratorium) dan Izin Konsesi (seperti Sawit dan Kehutanan) menandakan perlunya pengawasan ketat dan penegakan hukum bagi pemegang izin untuk menjaga fungsi ekosistem lindung.'
  }
];
