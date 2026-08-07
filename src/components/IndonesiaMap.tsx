import React, { useState } from 'react';
import { PROVINCES_DATA, SUMMARY_STATS } from '../data/aitData';
import { ProvinceAitData, TimePeriod } from '../types';
import {
  Flame,
  Search,
  Layers,
  Info,
  Maximize2,
  ChevronRight,
  TrendingUp,
  MapPin,
  Trees,
  SlidersHorizontal
} from 'lucide-react';

interface IndonesiaMapProps {
  period: TimePeriod;
  onSelectProvince?: (prov: ProvinceAitData) => void;
  onNavigateToConcept?: () => void;
}

export const IndonesiaMap: React.FC<IndonesiaMapProps> = ({
  period,
  onSelectProvince,
  onNavigateToConcept
}) => {
  const [selectedProvId, setSelectedProvId] = useState<string>('kalbar');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOverlay, setSelectedOverlay] = useState<'all' | 'gambut' | 'hutan' | 'pippib' | 'sawit'>('all');
  const [islandFilter, setIslandFilter] = useState<string>('all');

  const stats = SUMMARY_STATS[period];

  const selectedProvince = PROVINCES_DATA.find((p) => p.id === selectedProvId) || PROVINCES_DATA[0];

  const filteredProvinces = PROVINCES_DATA.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.topRegencies.some(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesIsland = islandFilter === 'all' || p.island === islandFilter;
    return matchesSearch && matchesIsland;
  });

  const getHeatColor = (totalHa: number) => {
    if (totalHa > 30000) return '#dc2626'; // Dark Red / Critical
    if (totalHa > 15000) return '#ea580c'; // Bright Orange / High
    if (totalHa > 8000) return '#d97706';  // Amber
    if (totalHa > 4000) return '#ca8a04';  // Yellow-orange
    return '#16a34a'; // Green / Moderate
  };

  const getOverlayLabel = () => {
    switch (selectedOverlay) {
      case 'gambut': return 'Fungsi Ekosistem Gambut (37,29% AIT)';
      case 'hutan': return 'Kawasan Hutan Negara (59,21% AIT)';
      case 'pippib': return 'Area Moratorium PIPPIB (35,00% AIT)';
      case 'sawit': return 'Izin Perkebunan Sawit (41,00% Konsesi)';
      default: return 'Seluruh Area Indikatif Terbakar (AIT)';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-[#0d1016] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(234,88,12,0.2)]">
                <MapPin className="w-3.5 h-3.5" /> Peta Nasional Karhutla Indonesia
              </span>
              <span className="text-gray-400 text-xs">Jeda Pemodelan 1 Minggu</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase">
              Sebaran Area Indikatif Terbakar <span className="text-orange-500 font-light">(AIT)</span>
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              Klik pada titik hotspot provinsi atau gunakan filter untuk melihat estimasi luasan karhutla dalam hektare.
              Model AIT menapiskan hotspot kawasan industri/perkotaan dan diverifikasi dengan citra satelit Sentinel-2.
            </p>
          </div>

          <button
            id="btn-explain-ait"
            onClick={onNavigateToConcept}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-950/40 transition-all shrink-0 border border-orange-400/30"
          >
            <Info className="w-4 h-4" /> Pelajari Konsep AIT
          </button>
        </div>

        {/* Quick Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
          <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider block">Total AIT Kumulatif</span>
            <span className="text-2xl font-light text-white">{(stats.totalHa / 1000).toFixed(0)}rb <span className="text-xs text-gray-400">Ha</span></span>
            <span className="text-[10px] text-orange-400 font-semibold block mt-0.5">Jan - Jul 2026</span>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider block">Provinsi Terparah</span>
            <span className="text-lg font-normal text-amber-400 truncate block">{stats.topProvince}</span>
            <span className="text-[10px] text-gray-400 block font-semibold mt-0.5">{(stats.topProvinceHa / 1000).toFixed(1)} ribu ha</span>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider block">Kabupaten Terluas</span>
            <span className="text-lg font-normal text-red-400 truncate block">{stats.topRegency}</span>
            <span className="text-[10px] text-gray-400 block font-semibold mt-0.5">{(stats.topRegencyHa / 1000).toFixed(1)} ribu ha</span>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-transparent p-4 rounded-xl border border-orange-500/20">
            <span className="text-[11px] text-orange-400 font-medium uppercase tracking-wider block">Puncak Juli 2026</span>
            <span className="text-2xl font-light text-white">{(stats.julySpikeHa / 1000).toFixed(0)}rb <span className="text-xs text-gray-400">Ha</span></span>
            <span className="text-[10px] text-red-400 font-medium block mt-0.5">Kemarau Ekstrem</span>
          </div>
        </div>
      </div>

      {/* Map Control Toolbar */}
      <div className="bg-[#0d1016] border border-white/10 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Layer Filter Overlay buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-semibold text-gray-400 flex items-center gap-1 mr-1 shrink-0 uppercase tracking-wider text-[11px]">
            <Layers className="w-3.5 h-3.5 text-orange-400" /> Layer Overlay:
          </span>
          <button
            id="overlay-all"
            onClick={() => setSelectedOverlay('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              selectedOverlay === 'all'
                ? 'bg-orange-600 text-white shadow-[0_0_10px_rgba(234,88,12,0.4)]'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
            }`}
          >
            Semua AIT
          </button>
          <button
            id="overlay-gambut"
            onClick={() => setSelectedOverlay('gambut')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              selectedOverlay === 'gambut'
                ? 'bg-amber-600 text-white shadow'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
            }`}
          >
            FE Gambut (37%)
          </button>
          <button
            id="overlay-hutan"
            onClick={() => setSelectedOverlay('hutan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              selectedOverlay === 'hutan'
                ? 'bg-emerald-700 text-white shadow'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
            }`}
          >
            Kawasan Hutan (59%)
          </button>
          <button
            id="overlay-pippib"
            onClick={() => setSelectedOverlay('pippib')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              selectedOverlay === 'pippib'
                ? 'bg-red-600 text-white shadow'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
            }`}
          >
            PIPPIB Moratorium (35%)
          </button>
          <button
            id="overlay-sawit"
            onClick={() => setSelectedOverlay('sawit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              selectedOverlay === 'sawit'
                ? 'bg-amber-700 text-white shadow'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
            }`}
          >
            Izin Sawit & Konsesi (41%)
          </button>
        </div>

        {/* Island filter & Search */}
        <div className="flex items-center gap-2">
          <select
            id="select-island"
            value={islandFilter}
            onChange={(e) => setIslandFilter(e.target.value)}
            className="bg-[#0a0c10] text-gray-200 border border-white/10 text-xs rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none font-medium"
          >
            <option value="all">Semua Pulau</option>
            <option value="Kalimantan">Kalimantan</option>
            <option value="Papua">Papua</option>
            <option value="Sumatera">Sumatera</option>
            <option value="Nusa Tenggara">Nusa Tenggara</option>
            <option value="Maluku">Maluku</option>
            <option value="Jawa">Jawa</option>
          </select>

          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
            <input
              id="search-map"
              type="text"
              placeholder="Cari provinsi/kabupaten..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0c10] border border-white/10 text-gray-100 text-xs rounded-xl pl-9 pr-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Main Map View and Side Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SVG Interactive Map Canvas */}
        <div className="lg:col-span-8 bg-[#0d1016] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl relative min-h-[420px] flex flex-col justify-between backdrop-blur-xl">
          {/* Active Overlay Tag */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-gray-200 bg-white/5 px-3 py-1 rounded-lg border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
              Aktif: {getOverlayLabel()}
            </span>
            <span className="text-[11px] text-gray-400 hidden sm:inline font-mono">
              Klik hotspot bulat untuk detail wilayah
            </span>
          </div>

          {/* SVG Map Render */}
          <div className="relative w-full aspect-[2/1] bg-[#0a0c10]/80 rounded-xl border border-white/10 p-2 sm:p-4 overflow-hidden flex items-center justify-center shadow-inner">
            {/* Background Grid Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#ffffff" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Stylized Indonesia Archipelago Base Outlines */}
            <svg viewBox="0 0 1000 500" className="w-full h-full max-h-[380px] drop-shadow-2xl">
              {/* Sumatra */}
              <path
                d="M 50 60 L 120 110 L 180 180 L 220 220 L 200 250 L 140 180 L 80 120 Z"
                fill="#151921"
                stroke="#2a3241"
                strokeWidth="1.5"
                className="hover:fill-[#1e2532] transition-colors"
              />
              {/* Java */}
              <path
                d="M 230 350 L 320 355 L 420 360 L 400 375 L 230 365 Z"
                fill="#151921"
                stroke="#2a3241"
                strokeWidth="1.5"
                className="hover:fill-[#1e2532] transition-colors"
              />
              {/* Kalimantan */}
              <path
                d="M 290 180 L 370 160 L 460 180 L 450 270 L 380 290 L 300 270 Z"
                fill="#151921"
                stroke="#2a3241"
                strokeWidth="1.5"
                className="hover:fill-[#1e2532] transition-colors"
              />
              {/* Sulawesi */}
              <path
                d="M 520 180 L 580 180 L 560 230 L 610 230 L 570 260 L 530 300 L 520 240 Z"
                fill="#151921"
                stroke="#2a3241"
                strokeWidth="1.5"
                className="hover:fill-[#1e2532] transition-colors"
              />
              {/* Maluku */}
              <path
                d="M 680 230 Q 720 220 740 270 Q 700 290 680 230 Z"
                fill="#151921"
                stroke="#2a3241"
                strokeWidth="1.5"
                className="hover:fill-[#1e2532] transition-colors"
              />
              {/* Nusa Tenggara */}
              <path
                d="M 440 380 L 580 390 L 570 410 L 440 395 Z"
                fill="#151921"
                stroke="#2a3241"
                strokeWidth="1.5"
                className="hover:fill-[#1e2532] transition-colors"
              />
              {/* Papua */}
              <path
                d="M 780 220 L 860 210 L 960 250 L 950 400 L 880 380 L 830 310 L 780 280 Z"
                fill="#151921"
                stroke="#2a3241"
                strokeWidth="1.5"
                className="hover:fill-[#1e2532] transition-colors"
              />

              {/* Province Hotspot Nodes */}
              {filteredProvinces.map((prov) => {
                const isSelected = prov.id === selectedProvId;
                const heatColor = getHeatColor(prov.totalHa);
                // Radius size proportional to AIT hectares
                const radius = Math.min(Math.max(Math.sqrt(prov.totalHa) / 7, 10), 32);

                return (
                  <g
                    key={prov.id}
                    className="cursor-pointer group transition-all"
                    onClick={() => {
                      setSelectedProvId(prov.id);
                      if (onSelectProvince) onSelectProvince(prov);
                    }}
                  >
                    {/* Outer Glowing Pulse Effect for Critical/Selected */}
                    {(isSelected || prov.totalHa > 20000) && (
                      <circle
                        cx={prov.coordinates.x}
                        cy={prov.coordinates.y}
                        r={radius + 8}
                        fill={heatColor}
                        opacity="0.4"
                        className="animate-ping"
                      />
                    )}

                    {/* Main Hotspot Circle */}
                    <circle
                      cx={prov.coordinates.x}
                      cy={prov.coordinates.y}
                      r={radius}
                      fill={heatColor}
                      stroke={isSelected ? '#ffffff' : '#0a0c10'}
                      strokeWidth={isSelected ? '3' : '1.5'}
                      className={`transition-all duration-300 drop-shadow-[0_0_12px_rgba(234,88,12,0.5)] ${
                        isSelected ? 'scale-125' : 'group-hover:scale-110'
                      }`}
                    />

                    {/* Flame Icon or Number Inside Node */}
                    <text
                      x={prov.coordinates.x}
                      y={prov.coordinates.y + 4}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={radius > 16 ? '11' : '9'}
                      fontWeight="bold"
                      className="pointer-events-none font-mono"
                    >
                      {(prov.totalHa / 1000).toFixed(0)}k
                    </text>

                    {/* Hover Label Tooltip */}
                    <text
                      x={prov.coordinates.x}
                      y={prov.coordinates.y - radius - 6}
                      textAnchor="middle"
                      fill={isSelected ? '#f97316' : '#9ca3af'}
                      fontSize="11"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      className="pointer-events-none drop-shadow-lg"
                    >
                      {prov.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Heat Legend */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs bg-[#0a0c10]/90 p-3 rounded-xl border border-white/10">
            <span className="text-gray-400 font-semibold flex items-center gap-1 uppercase text-[10px] tracking-wider">
              <Flame className="w-3.5 h-3.5 text-orange-500" /> Skala Luas AIT (Hektare):
            </span>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-600 inline-block shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
                <span className="text-gray-300 font-medium">&lt; 4rb ha (Sedang)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-yellow-500 inline-block shadow-[0_0_6px_rgba(234,179,8,0.4)]" />
                <span className="text-gray-300 font-medium">4rb - 8rb ha</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-amber-600 inline-block shadow-[0_0_6px_rgba(217,119,6,0.4)]" />
                <span className="text-gray-300 font-medium">8rb - 15rb ha</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-orange-500 inline-block shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                <span className="text-gray-300 font-medium">15rb - 30rb ha</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-red-600 inline-block shadow-[0_0_8px_rgba(220,38,38,0.6)]" />
                <span className="text-gray-300 font-medium">&gt; 30rb ha (Kritis)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Province Deep-Dive Panel */}
        <div className="lg:col-span-4 bg-[#0d1016] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between space-y-5 backdrop-blur-xl">
          <div>
            {/* Header Badge & Province Name */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-orange-400 font-bold block">
                  {selectedProvince.island} &bull; Profil Wilayah
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5 uppercase">
                  {selectedProvince.name}
                </h3>
              </div>

              <span
                className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                  selectedProvince.riskLevel === 'Kritis'
                    ? 'bg-red-500/20 text-red-400 border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                    : selectedProvince.riskLevel === 'Tinggi'
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                }`}
              >
                Risiko {selectedProvince.riskLevel}
              </span>
            </div>

            {/* Total Hectares Card */}
            <div className="bg-gradient-to-br from-orange-500/10 to-transparent p-4 rounded-xl border border-orange-500/20 mb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-orange-400 uppercase font-semibold block tracking-wider">Total Luas Terindikasi (AIT)</span>
                <span className="text-2xl font-light text-white">
                  {selectedProvince.totalHa.toLocaleString('id-ID')} <span className="text-xs font-normal text-gray-400">ha</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 uppercase font-semibold block tracking-wider">Kontribusi Nasional</span>
                <span className="text-lg font-bold text-orange-400 font-mono">
                  {((selectedProvince.totalHa / stats.totalHa) * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Monthly Trend Mini Sparkline */}
            <div className="space-y-2 mb-4">
              <span className="text-xs font-semibold text-gray-300 flex items-center gap-1 uppercase tracking-wider text-[11px]">
                <TrendingUp className="w-3.5 h-3.5 text-orange-400" /> Pergerakan Bulanan (Ha):
              </span>
              <div className="grid grid-cols-7 gap-1 bg-[#0a0c10] p-2.5 rounded-xl border border-white/10 text-center">
                {Object.entries(selectedProvince.monthly).map(([monthKey, val]) => {
                  const maxMonthlyVal = Math.max(...Object.values(selectedProvince.monthly), 1);
                  const heightPct = Math.max(Math.round((val / maxMonthlyVal) * 100), 10);

                  return (
                    <div key={monthKey} className="flex flex-col items-center">
                      <div className="h-16 w-full flex items-end justify-center py-1">
                        <div
                          style={{ height: `${heightPct}%` }}
                          className={`w-full max-w-[12px] rounded-t transition-all ${
                            monthKey === 'jul' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-orange-500'
                          }`}
                          title={`${monthKey.toUpperCase()}: ${val.toLocaleString('id-ID')} ha`}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400 uppercase font-mono">{monthKey}</span>
                      <span className="text-[9px] text-gray-300 font-bold font-mono truncate max-w-full">
                        {val > 1000 ? `${(val / 1000).toFixed(1)}k` : val}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Regency Affected */}
            <div className="space-y-2 mb-4">
              <span className="text-xs font-semibold text-gray-300 flex items-center gap-1 uppercase tracking-wider text-[11px]">
                <Flame className="w-3.5 h-3.5 text-red-400" /> Kabupaten Terdampak Terluas:
              </span>
              <div className="space-y-1.5">
                {selectedProvince.topRegencies.map((reg, idx) => (
                  <div
                    key={reg.name}
                    className="flex items-center justify-between text-xs bg-white/5 p-2 rounded-lg border border-white/5"
                  >
                    <span className="text-gray-200 font-medium flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-white/10 text-gray-300 flex items-center justify-center text-[10px] font-bold font-mono">
                        {idx + 1}
                      </span>
                      {reg.name}
                    </span>
                    <span className="text-orange-400 font-bold font-mono">
                      {reg.ha.toLocaleString('id-ID')} ha
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Land Cover Exposure Pills */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-emerald-950/30 border border-emerald-500/20 p-2.5 rounded-xl">
                <span className="text-[10px] text-emerald-400 block font-semibold flex items-center gap-1 uppercase">
                  <Trees className="w-3 h-3 text-emerald-400" /> Kawasan Hutan
                </span>
                <span className="text-sm font-bold text-white mt-0.5 block font-mono">
                  {selectedProvince.kawasanHutanHa.toLocaleString('id-ID')} ha
                </span>
              </div>

              <div className="bg-orange-950/30 border border-orange-500/20 p-2.5 rounded-xl">
                <span className="text-[10px] text-orange-400 block font-semibold flex items-center gap-1 uppercase">
                  <Flame className="w-3-3 text-orange-400" /> FE Gambut
                </span>
                <span className="text-sm font-bold text-white mt-0.5 block font-mono">
                  {selectedProvince.gambutHa.toLocaleString('id-ID')} ha
                </span>
              </div>
            </div>
          </div>

          {/* Action Link to Region Explorer */}
          <div className="pt-4 border-t border-white/10">
            <button
              id="btn-detail-prov"
              onClick={() => {
                if (onSelectProvince) onSelectProvince(selectedProvince);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase rounded-lg shadow-lg shadow-orange-900/30 transition-all group"
            >
              <span>Lihat Analisis Lengkap {selectedProvince.name}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
