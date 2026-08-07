import React, { useState } from 'react';
import { VALIDATION_METRICS, SCATTER_PLOT_DATA, FAQS } from '../data/aitData';
import {
  BookOpen,
  Filter,
  CheckCircle2,
  Flame,
  ShieldCheck,
  ScatterChart as ScatterIcon,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Layers,
  ArrowRight,
  Eye,
  Activity,
  Zap,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const AitConceptPage: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');
  const [activeTab, setActiveTab] = useState<'flow' | 'satellite' | 'validation' | 'faq'>('flow');

  return (
    <div className="space-y-8">
      {/* Hero Title Section */}
      <div className="bg-[#0d1016] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl relative z-10">
          <span className="text-xs font-bold text-orange-400 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30 uppercase tracking-widest inline-flex items-center gap-1.5 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-orange-500" /> Panduan Edukasi Publik
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight uppercase">
            Memahami Konsep Model Area Indikatif Terbakar <span className="text-orange-500 font-light">(AIT)</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-3 leading-relaxed">
            Metode inovatif yang dikembangkan oleh <strong className="text-white">MADANI Berkelanjutan sejak tahun 2019</strong> untuk mendeteksi pergerakan Kebakaran Hutan dan Lahan (Karhutla) di Indonesia secara lebih cepat (<em className="text-amber-400 not-italic font-mono">near real-time, jeda 1 minggu / H-3</em>) dalam skala luasan hektare.
          </p>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-white/10 overflow-x-auto no-scrollbar">
          <button
            id="concept-tab-flow"
            onClick={() => setActiveTab('flow')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'flow'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-950/80 border border-orange-500/50'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
            }`}
          >
            <Filter className="w-4 h-4" /> Alur Kerja &amp; Filter
          </button>
          <button
            id="concept-tab-satellite"
            onClick={() => setActiveTab('satellite')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'satellite'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-950/80 border border-orange-500/50'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
            }`}
          >
            <Eye className="w-4 h-4" /> Validasi Citra Sentinel-2
          </button>
          <button
            id="concept-tab-validation"
            onClick={() => setActiveTab('validation')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'validation'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-950/80 border border-orange-500/50'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
            }`}
          >
            <ScatterIcon className="w-4 h-4" /> Akurasi vs SIPONGI
          </button>
          <button
            id="concept-tab-faq"
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'faq'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-950/80 border border-orange-500/50'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
            }`}
          >
            <HelpCircle className="w-4 h-4" /> Tanya Jawab FAQ
          </button>
        </div>
      </div>

      {/* SECTION 1: Hotspot Filtering Flowchart Diagram */}
      {(activeTab === 'flow' || activeTab === undefined) && (
        <div className="space-y-6">
          <div className="bg-[#0d1016] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6 backdrop-blur-xl">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white uppercase flex items-center gap-2">
                <Filter className="w-5 h-5 text-orange-500" /> Tahapan Pemodelan AIT (Flowchart Method)
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">
                AIT memilah titik panas (hotspot) mentah menjadi estimasi luasan area terbakar yang bersih dari sinyal palsu perkotaan dan industri.
              </p>
            </div>

            {/* Step-by-Step Visual Flowchart Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {/* Step 1 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between relative group hover:border-orange-500/50 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs border border-orange-500/30">
                      1
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono uppercase">INPUT DATA</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1 uppercase">Deteksi Hotspot Satelit</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Mengambil titik panas mentah dari sensor satelit dengan ambang batas <strong className="text-orange-400 font-mono">Confidence &gt; 60%</strong>.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-amber-400 font-medium flex items-center gap-1 font-mono">
                  <Flame className="w-3 h-3 text-orange-500" /> Data Mentah Sinyal Suhu
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between relative group hover:border-amber-500/50 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/30">
                      2
                    </span>
                    <span className="text-[10px] text-amber-400 font-mono uppercase">FILTERING PROCESS</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1 uppercase">Penapisan Hotspot Palsu</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Mengeliminasi sinyal panas dari Perkotaan, Utilitas Industri (Pabrik, Stockpile, Konstruksi), serta Kawah Gunung Berapi Aktif.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-amber-400 font-medium flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3 h-3 text-amber-400" /> Eliminasi Sinyal Industri
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between relative group hover:border-orange-500/50 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/30">
                      3
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono uppercase">DUAL VALIDATION</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1 uppercase">Validasi Sentinel-2 &amp; SIPONGI</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Diverifikasi dengan citra Sentinel-2 (B8-B4-B3 &amp; SWIR B12-B11-B4) dan disandingkan secara statistik dengan luasan tabulasi SIPONGI Kemenhut.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-blue-300 font-medium flex items-center gap-1 font-mono">
                  <Eye className="w-3 h-3 text-blue-400" /> Verifikasi Kepulan Asap
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-gradient-to-br from-orange-950/80 to-[#0d1016] border border-orange-500/40 rounded-xl p-4 flex flex-col justify-between relative group shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-xs shadow-[0_0_8px_rgba(249,115,22,0.8)]">
                      4
                    </span>
                    <span className="text-[10px] text-orange-400 font-mono font-bold uppercase">OUTPUT AIT</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1 uppercase">Estimasi Luasan Hektare (AIT)</h4>
                  <p className="text-xs text-gray-200 leading-relaxed">
                    Diperoleh gambaran terperinci luasan dan sebaran karhutla dalam hektare dengan jeda pemodelan hanya 1 minggu (H-3).
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-orange-500/30 text-[10px] text-orange-400 font-bold flex items-center gap-1 font-mono uppercase">
                  <Zap className="w-3 h-3 text-orange-500" /> Peringatan Dini Near Real-Time
                </div>
              </div>
            </div>

            {/* Why AIT Matters Callout Box */}
            <div className="bg-white/5 rounded-xl p-5 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg border border-orange-500/30 shrink-0">
                  <Info className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase">Mengapa Jeda 1 Minggu Sangat Krusial?</h4>
                  <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">
                    Laporan resmi akhir luasan kebakaran seringkali membutuhkan pemrosesan bertbulan-bulan. AIT hadir sebagai <strong className="text-amber-400">instrumen indikatif dini</strong> agar pemangku kepentingan, Manggala Agni, dan masyarakat adat dapat segera mengambil langkah pencegahan dan intervensi sebelum api meluas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Sentinel-2 Satellite Band Validation */}
      {(activeTab === 'satellite' || activeTab === undefined) && (
        <div className="bg-[#0d1016] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6 backdrop-blur-xl">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold text-white uppercase flex items-center gap-2">
              <Eye className="w-5 h-5 text-orange-500" /> Verifikasi Citra Satelit Sentinel-2
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Untuk memastikan indikasi kebakaran bukan merupakan kesalahan sensor, setiap titik AIT diverifikasi menggunakan kombinasi band spektra gelombang dari satelit Sentinel-2 (ESA).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Band Combination 1: B8-B4-B3 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-400 bg-orange-950/80 px-2.5 py-1 rounded-lg border border-orange-800 font-mono uppercase">
                  Kombinasi Band B8 - B4 - B3
                </span>
                <span className="text-[11px] text-gray-400 font-mono">Inframerah Dekat &amp; Visible</span>
              </div>
              <h4 className="text-base font-bold text-white uppercase">Deteksi Vegetasi &amp; Kepulan Asap</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Menampilkan kontras antara kerapatan tutupan kanopi vegetasi hijau (Hutan) dengan kolom kepulan asap (smoke plumes) berwarna putih keabu-abuan yang membumbung di atas area karhutla.
              </p>
              <div className="bg-[#0a0c10] p-4 rounded-xl border border-white/10 text-xs text-gray-300 space-y-1 font-mono">
                <div>&bull; B8: Near Infrared (NIR) - Vegetasi Sehat</div>
                <div>&bull; B4: Red - Pembatas Tutupan Tanah</div>
                <div>&bull; B3: Green - Pantulan Kanopi</div>
              </div>
            </div>

            {/* Band Combination 2: B12-B11-B4 */}
            <div className="bg-white/5 border border-amber-500/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-800 font-mono uppercase">
                  Kombinasi Band B12 - B11 - B4
                </span>
                <span className="text-[11px] text-amber-300 font-mono">Short-Wave Infrared (SWIR)</span>
              </div>
              <h4 className="text-base font-bold text-white uppercase">Deteksi Titik Api &amp; Bekas Terbakar</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Gelombang inframerah pendek (SWIR) memiliki kemampuan luar biasa untuk menembus kabut asap tipis, secara langsung menyorot titik api aktif (<em className="text-red-400 not-italic font-bold">bright orange/red hot spots</em>) dan areal bekas terbakar hitam (<em className="text-amber-400 not-italic font-bold">burn scars</em>).
              </p>
              <div className="bg-[#0a0c10] p-4 rounded-xl border border-white/10 text-xs text-gray-300 space-y-1 font-mono">
                <div>&bull; B12: SWIR-2 - Energi Panas Tinggi / Api Aktif</div>
                <div>&bull; B11: SWIR-1 - Bekas Terbakar (Burn Scar)</div>
                <div>&bull; B4: Red - Kontras Latar Belakang</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: Statistical Validation vs SIPONGI */}
      {(activeTab === 'validation' || activeTab === undefined) && (
        <div className="bg-[#0d1016] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6 backdrop-blur-xl">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold text-white uppercase flex items-center gap-2">
              <ScatterIcon className="w-5 h-5 text-orange-500" /> Bukti Statistik Akurasi Pemodelan AIT vs SIPONGI
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Hasil akumulasi luasan AIT disandingkan dengan luasan tabulasi resmi SIPONGI (Kemenhut) pada periode yang sama untuk memverifikasi tingkat presisi.
            </p>
          </div>

          {/* Validation Metrics 4-Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALIDATION_METRICS.map((metric, i) => (
              <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-2">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">{metric.title}</span>
                <span className="text-2xl font-bold text-orange-400 font-mono block">{metric.value}</span>
                <p className="text-[11px] text-gray-300 leading-snug">{metric.description}</p>
              </div>
            ))}
          </div>

          {/* Scatter Plot Chart View */}
          <div className="bg-[#0a0c10] p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-white uppercase">Scatter Plot Korelasi Provinsi (SIPONGI vs AIT)</h4>
                <p className="text-xs text-gray-400">
                  Trendline menunjukkan garis linier presisi tinggi dengan <strong className="text-orange-400 font-mono">$R^2 = 82,2\% - 96,17\%$</strong>.
                </p>
              </div>
              <span className="text-xs bg-orange-500/20 text-orange-300 px-3 py-1 rounded-lg border border-orange-500/30 font-bold font-mono self-start sm:self-auto">
                Korelasi r = 90,65%
              </span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a3241" opacity={0.5} />
                  <XAxis dataKey="sipongi" name="SIPONGI" unit="k ha" stroke="#9ca3af" fontSize={11} label={{ value: 'Luas SIPONGI (ribu ha)', position: 'bottom', offset: 0, fill: '#9ca3af', fontSize: 11 }} />
                  <YAxis dataKey="ait" name="AIT Madani" unit="k ha" stroke="#9ca3af" fontSize={11} label={{ value: 'Luas AIT (ribu ha)', angle: -90, position: 'insideLeft', fill: '#9ca3af', fontSize: 11 }} />
                  <ZAxis dataKey="province" name="Provinsi" />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ backgroundColor: '#0a0c10', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                    formatter={(val: any, name: any) => [`${val} ribu ha`, name === 'sipongi' ? 'Data SIPONGI' : 'Model AIT']}
                  />
                  <Scatter name="Provinsi" data={SCATTER_PLOT_DATA} fill="#f97316" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: FAQ Accordion Section for Public */}
      {(activeTab === 'faq' || activeTab === undefined) && (
        <div className="bg-[#0d1016] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6 backdrop-blur-xl">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold text-white uppercase flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-orange-500" /> Tanya Jawab Publik seputar Konsep AIT
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Pertanyaan umum masyarakat awam untuk membantu memahami laporan dan data Karhutla.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white/5 rounded-xl border border-white/5 overflow-hidden transition-all"
                >
                  <button
                    id={`btn-faq-${faq.id}`}
                    onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                    className="w-full text-left p-4 flex items-center justify-between gap-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="bg-orange-500/20 text-orange-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase font-mono shrink-0 border border-orange-500/30">
                        {faq.category}
                      </span>
                      <h4 className="text-sm font-bold text-white">{faq.question}</h4>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-orange-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 bg-[#0a0c10]/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
