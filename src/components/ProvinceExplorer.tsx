import React, { useState } from 'react';
import { PROVINCES_DATA } from '../data/aitData';
import { ProvinceAitData } from '../types';
import {
  MapPin,
  Search,
  Filter,
  Flame,
  Trees,
  Layers,
  ChevronRight,
  TrendingUp,
  X,
  FileSpreadsheet,
  AlertTriangle
} from 'lucide-react';

interface ProvinceExplorerProps {
  initialSelectedProv?: ProvinceAitData | null;
}

export const ProvinceExplorer: React.FC<ProvinceExplorerProps> = ({ initialSelectedProv }) => {
  const [selectedProv, setSelectedProv] = useState<ProvinceAitData | null>(initialSelectedProv || PROVINCES_DATA[0]);
  const [search, setSearch] = useState('');
  const [island, setIsland] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  const filteredProvinces = PROVINCES_DATA.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.topRegencies.some(r => r.name.toLowerCase().includes(search.toLowerCase()));
    const matchIsland = island === 'all' || p.island === island;
    const matchRisk = riskFilter === 'all' || p.riskLevel === riskFilter;
    return matchSearch && matchIsland && matchRisk;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0d1016] border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-1 mb-1">
              <MapPin className="w-4 h-4 text-orange-500" /> Eksplorasi Data Per Wilayah
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase">
              Katalog Provinsi &amp; Kabupaten <span className="text-orange-500 font-light">Terdampak Karhutla</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 leading-relaxed">
              Pilih wilayah untuk membedah data perkembangan bulanan, paparan kawasan hutan, ekosistem gambut, dan izin perkebunan/konsesi.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-300 font-mono bg-white/5 px-3 py-2 rounded-xl border border-white/10">
            <span>Total Provinsi Terdata: <strong className="text-orange-400 font-bold">{PROVINCES_DATA.length}</strong></span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/10">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              id="explorer-search"
              type="text"
              placeholder="Cari provinsi/kabupaten..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0a0c10] border border-white/10 text-gray-100 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <select
              id="explorer-island-select"
              value={island}
              onChange={(e) => setIsland(e.target.value)}
              className="w-full bg-[#0a0c10] border border-white/10 text-gray-200 text-xs rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="all">Semua Pulau / Wilayah</option>
              <option value="Kalimantan">Kalimantan</option>
              <option value="Papua">Papua</option>
              <option value="Sumatera">Sumatera</option>
              <option value="Nusa Tenggara">Nusa Tenggara</option>
              <option value="Maluku">Maluku</option>
              <option value="Jawa">Jawa</option>
            </select>
          </div>

          <div>
            <select
              id="explorer-risk-select"
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full bg-[#0a0c10] border border-white/10 text-gray-200 text-xs rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="all">Semua Tingkat Risiko</option>
              <option value="Kritis">Risiko Kritis (&gt; 30rb ha)</option>
              <option value="Tinggi">Risiko Tinggi (8rb - 30rb ha)</option>
              <option value="Sedang">Risiko Sedang (4rb - 8rb ha)</option>
              <option value="Rendah">Risiko Rendah (&lt; 4rb ha)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Province Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProvinces.map((prov) => {
          const isSelected = selectedProv?.id === prov.id;
          return (
            <div
              key={prov.id}
              onClick={() => setSelectedProv(prov)}
              className={`bg-[#0d1016] rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-xl backdrop-blur-xl ${
                isSelected
                  ? 'border-orange-500 ring-2 ring-orange-500/30 bg-[#121620]'
                  : 'border-white/10 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] uppercase font-bold text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10 font-mono">
                    {prov.island}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase font-mono ${
                      prov.riskLevel === 'Kritis'
                        ? 'bg-red-500/20 text-red-400 border-red-500/30'
                        : prov.riskLevel === 'Tinggi'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    }`}
                  >
                    {prov.riskLevel}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight uppercase">{prov.name}</h3>

                <div className="mt-3 bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium uppercase">Total Luas AIT</span>
                  <span className="text-lg font-bold text-orange-400 font-mono">
                    {prov.totalHa.toLocaleString('id-ID')} ha
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider block">Kabupaten Terluas:</span>
                <div className="flex flex-wrap gap-1">
                  {prov.topRegencies.slice(0, 3).map((r) => (
                    <span
                      key={r.name}
                      className="text-[10px] bg-white/5 text-gray-300 px-2 py-0.5 rounded border border-white/10 font-mono"
                    >
                      {r.name} ({r.ha > 1000 ? `${(r.ha / 1000).toFixed(1)}k` : r.ha} ha)
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-orange-400 font-bold group uppercase tracking-wider">
                <span>Detail Wilayah</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-orange-500" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Province Detailed Drawer Modal */}
      {selectedProv && (
        <div className="fixed inset-0 bg-[#0a0c10]/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0d1016] border border-white/10 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              id="btn-close-prov-modal"
              onClick={() => setSelectedProv(null)}
              className="absolute right-4 top-4 p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-orange-400 bg-orange-950/80 px-2.5 py-0.5 rounded border border-orange-800 uppercase font-mono">
                  {selectedProv.island} &bull; Laporan Detail
                </span>
                <span className="text-xs text-gray-400 font-mono">Update AIT 2026</span>
              </div>
              <h2 className="text-2xl font-bold text-white uppercase">{selectedProv.name}</h2>
            </div>

            {/* Total Metric Card */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <div>
                <span className="text-[11px] text-gray-400 block font-medium uppercase">Total Luas AIT</span>
                <span className="text-xl font-bold text-orange-400 font-mono">
                  {selectedProv.totalHa.toLocaleString('id-ID')} ha
                </span>
              </div>
              <div>
                <span className="text-[11px] text-gray-400 block font-medium uppercase">Kawasan Hutan</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">
                  {selectedProv.kawasanHutanHa.toLocaleString('id-ID')} ha
                </span>
              </div>
              <div>
                <span className="text-[11px] text-gray-400 block font-medium uppercase">FE Gambut</span>
                <span className="text-lg font-bold text-amber-400 font-mono">
                  {selectedProv.gambutHa.toLocaleString('id-ID')} ha
                </span>
              </div>
            </div>

            {/* Monthly Trend Breakdown Table */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-500" /> Perkembangan AIT Bulanan (Ha)
              </h3>
              <div className="grid grid-cols-7 gap-1 text-center bg-[#0a0c10] p-3 rounded-xl border border-white/10">
                {Object.entries(selectedProv.monthly).map(([m, val]) => {
                  const numVal = Number(val);
                  return (
                    <div key={m} className="space-y-1">
                      <span className="text-[10px] uppercase font-mono text-gray-400 block">{m}</span>
                      <span className="text-xs font-bold text-white font-mono block">
                        {numVal > 1000 ? `${(numVal / 1000).toFixed(1)}k` : numVal}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Regency List Table */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-400" /> Rincian Kabupaten Terdampak
              </h3>
              <div className="space-y-1.5">
                {selectedProv.topRegencies.map((reg, idx) => (
                  <div
                    key={reg.name}
                    className="flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-white/5 text-xs"
                  >
                    <span className="font-medium text-gray-200 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-white/10 text-gray-300 flex items-center justify-center font-bold text-[10px] font-mono">
                        {idx + 1}
                      </span>
                      Kabupaten {reg.name}
                    </span>
                    <span className="font-bold text-orange-400 font-mono">
                      {reg.ha.toLocaleString('id-ID')} ha
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policy Interventions Recommendation */}
            <div className="bg-orange-950/40 border border-orange-800/60 p-4 rounded-xl text-xs text-orange-200 space-y-1">
              <span className="font-bold text-orange-400 uppercase tracking-wider block flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-orange-500" /> Rekomendasi Tindakan Lapangan:
              </span>
              <p className="leading-relaxed text-gray-300">
                Prioritaskan patroli pencegahan di area konsesi perkebunan sawit dan lahan gambut terdegradasi. Perlu pertimbangan respon intervensi cepat bagi daerah risiko {selectedProv.riskLevel.toLowerCase()} untuk mencegah bahaya kabut asap.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
