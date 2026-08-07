import React, { useState } from 'react';
import { TimePeriod } from '../types';
import {
  SUMMARY_STATS,
  MONTHLY_TREND_2026,
  PROVINCES_DATA,
  TOP_REGENCIES,
  LAND_COVER_BREAKDOWN,
  PEATLAND_DAMAGE_BREAKDOWN,
  CONCESSION_TYPE_BREAKDOWN
} from '../data/aitData';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  BarChart3,
  Flame,
  Trees,
  Layers,
  ShieldAlert,
  Calendar,
  TrendingUp,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

interface DashboardAnalyticsProps {
  period: TimePeriod;
}

export const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({ period }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'forest' | 'peatland' | 'concession' | 'pippib'>('all');

  const stats = SUMMARY_STATS[period];

  const top10Provinces = PROVINCES_DATA.slice(0, 10);

  return (
    <div className="space-y-8">
      {/* Overview Header Banner */}
      <div className="bg-[#0d1016] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-1 mb-1">
              <BarChart3 className="w-4 h-4 text-orange-500" /> Statistik & Visualisasi Komprehensif
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase">
              Dashboard Analisis Karhutla <span className="text-orange-500 font-light">AIT 2026</span>
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              Membedah sebaran akumulasi Karhutla berdasarkan batas administrasi, tutupan lahan kawasan hutan,
              ekosistem gambut, moratorium PIPPIB, serta izin &amp; konsesi sektor perkebunan dan kehutanan.
            </p>
          </div>

          <div className="bg-white/5 px-4 py-3 rounded-xl border border-white/10 text-right shrink-0 shadow-lg">
            <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider block">Total AIT Periode Terpilih</span>
            <span className="text-2xl font-light text-white">
              {stats.totalHa.toLocaleString('id-ID')} <span className="text-xs font-normal text-gray-400">ha</span>
            </span>
          </div>
        </div>

        {/* Core KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Trees className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block">Kawasan Hutan Negara</span>
              <span className="text-xl font-bold text-white">{stats.forestAreaPercentage}%</span>
              <span className="text-[11px] text-emerald-400 font-mono font-semibold block mt-0.5">
                {(stats.forestAreaHa / 1000).toFixed(1)} ribu ha
              </span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block">Fungsi Ekosistem Gambut</span>
              <span className="text-xl font-bold text-amber-400">{stats.peatlandPercentage}%</span>
              <span className="text-[11px] text-gray-400 font-mono font-semibold block mt-0.5">
                {(stats.peatlandHa / 1000).toFixed(1)} ribu ha
              </span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block">Izin &amp; Konsesi Berizin</span>
              <span className="text-xl font-bold text-orange-400">{stats.concessionPercentage}%</span>
              <span className="text-[11px] text-gray-400 font-mono font-semibold block mt-0.5">
                {(stats.concessionHa / 1000).toFixed(1)} ribu ha (Sawit/PBPH)
              </span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block">Moratorium PIPPIB</span>
              <span className="text-xl font-bold text-red-400">{stats.moratoriumPercentage}%</span>
              <span className="text-[11px] text-gray-400 font-mono font-semibold block mt-0.5">
                {(stats.moratoriumHa / 1000).toFixed(1)} ribu ha
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Fire Trajectory Line Chart */}
      <div className="bg-[#0d1016] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                Tren Perkembangan AIT Bulanan (Januari - Juli 2026)
              </h3>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Terlihat lonjakan drastis pada bulan Juli 2026 mencapai <strong className="text-red-400 font-mono font-bold">124.040 Hektare</strong> akibat puncak kemarau sesuai prediksi BMKG.
            </p>
          </div>
          <span className="text-xs font-mono bg-white/5 text-gray-300 px-3 py-1 rounded-lg border border-white/10 self-start sm:self-auto">
            Satuan: Hektare (Ha)
          </span>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MONTHLY_TREND_2026} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3241" opacity={0.5} />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0c10', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                formatter={(value: any) => [`${Number(value).toLocaleString('id-ID')} Ha`, 'Luas AIT']}
              />
              <Line
                type="monotone"
                dataKey="ha"
                stroke="#ea580c"
                strokeWidth={3.5}
                dot={{ fill: '#ea580c', r: 6 }}
                activeDot={{ r: 9, fill: '#f97316' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top 10 Provinces & Top 10 Regencies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 10 Provinces Chart */}
        <div className="bg-[#0d1016] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-base font-bold text-white uppercase flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" /> 10 Provinsi Terluas AIT
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Kalimantan Barat (50.5k ha) &amp; Papua Selatan (41.7k ha) memimpin luasan terbesar.
              </p>
            </div>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top10Provinces} layout="vertical" margin={{ top: 5, right: 30, left: 70, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3241" opacity={0.4} />
                <XAxis type="number" stroke="#9ca3af" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
                <YAxis dataKey="name" type="category" stroke="#e5e7eb" fontSize={11} width={110} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0a0c10', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  formatter={(value: any) => [`${Number(value).toLocaleString('id-ID')} Ha`, 'Luas AIT']}
                />
                <Bar dataKey="totalHa" radius={[0, 8, 8, 0]}>
                  {top10Provinces.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? '#dc2626' : index === 1 ? '#ea580c' : '#d97706'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 10 Regencies Chart */}
        <div className="bg-[#0d1016] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-base font-bold text-white uppercase flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400" /> 10 Kabupaten Terluas AIT
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Kabupaten Merauke (33.6k ha) &amp; Ketapang (13.0k ha) mengalami Karhutla paling masif.
              </p>
            </div>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TOP_REGENCIES} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3241" opacity={0.4} />
                <XAxis type="number" stroke="#9ca3af" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
                <YAxis dataKey="name" type="category" stroke="#e5e7eb" fontSize={11} width={120} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0a0c10', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  formatter={(value: any, name: any, item: any) => [
                    `${Number(value).toLocaleString('id-ID')} Ha (${item.payload.province})`,
                    'Luas AIT'
                  ]}
                />
                <Bar dataKey="ha" radius={[0, 8, 8, 0]}>
                  {TOP_REGENCIES.map((entry, index) => (
                    <Cell
                      key={`reg-cell-${index}`}
                      fill={index === 0 ? '#ef4444' : index < 3 ? '#f97316' : '#ea580c'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Spatial Overlay Categories & Concession Deep-Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Land Cover Category Breakdown List */}
        <div className="lg:col-span-7 bg-[#0d1016] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 backdrop-blur-xl">
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-white uppercase flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-400" /> Analisis Proporsi Tutupan Lahan &amp; Kebijakan
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Sebagian besar AIT berada di Kawasan Hutan Negara, Gambut, dan area Tumpang Tindih Konsesi.
            </p>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {LAND_COVER_BREAKDOWN.map((item) => (
              <div
                key={item.category}
                className="bg-white/5 p-3.5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white flex items-center gap-2 uppercase">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.category}
                  </span>
                  <div className="text-right">
                    <span className="text-xs font-black text-orange-400 font-mono">{item.percentage}%</span>
                    <span className="text-[11px] text-gray-400 font-mono ml-2">
                      ({item.hectares.toLocaleString('id-ID')} ha)
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#0a0c10] h-2 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(item.percentage, 100)}%`, backgroundColor: item.color }}
                  />
                </div>

                <p className="text-[11px] text-gray-300 leading-normal">
                  {item.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Peatland Degradation & Concession Breakdown Charts */}
        <div className="lg:col-span-5 space-y-6">
          {/* Peatland Damage Degradation */}
          <div className="bg-[#0d1016] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-3 backdrop-blur-xl">
            <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2 border-b border-white/10 pb-2">
              <Flame className="w-4 h-4 text-orange-500" /> Tingkat Kerusakan Gambut Terbakar
            </h3>
            <p className="text-xs text-gray-400">
              AIT di gambut mencapai 81,8 ribu ha (37,29%), didominasi kondisi rusak ringan &amp; sedang.
            </p>

            <div className="h-44 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PEATLAND_DAMAGE_BREAKDOWN} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="level" stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={10} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0a0c10', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                    formatter={(val: any) => [`${Number(val).toLocaleString('id-ID')} Ha`, 'Luas AIT Gambut']}
                  />
                  <Bar dataKey="hectares" radius={[6, 6, 0, 0]}>
                    {PEATLAND_DAMAGE_BREAKDOWN.map((entry, idx) => (
                      <Cell key={`peat-${idx}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Concession Type Distribution */}
          <div className="bg-[#0d1016] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-3 backdrop-blur-xl">
            <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2 border-b border-white/10 pb-2">
              <FileSpreadsheet className="w-4 h-4 text-orange-400" /> Tumpang Tindih Izin &amp; Konsesi (90rb ha)
            </h3>

            <div className="space-y-2">
              {CONCESSION_TYPE_BREAKDOWN.map((conc) => (
                <div key={conc.name} className="flex items-center justify-between text-xs bg-white/5 p-2.5 rounded-lg border border-white/5">
                  <span className="text-gray-200 font-medium">{conc.name}</span>
                  <div className="text-right font-mono">
                    <span className="text-orange-400 font-bold">{conc.hectares.toLocaleString('id-ID')} ha</span>
                    <span className="text-gray-400 text-[10px] ml-1.5">({conc.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
