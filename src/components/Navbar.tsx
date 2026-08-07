import React from 'react';
import { TimePeriod } from '../types';
import {
  Flame,
  Map as MapIcon,
  BarChart3,
  BookOpen,
  MapPin,
  Bot,
  Calendar,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  period: TimePeriod;
  setPeriod: (period: TimePeriod) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  period,
  setPeriod,
}) => {
  const tabs = [
    { id: 'map', label: 'Peta Interaktif', icon: MapIcon },
    { id: 'dashboard', label: 'Dashboard Analisis', icon: BarChart3 },
    { id: 'concept', label: 'Konsep AIT', icon: BookOpen },
    { id: 'explorer', label: 'Eksplorasi Wilayah', icon: MapPin },
    { id: 'ai', label: 'Tanya AI Karhutla', icon: Bot },
  ];

  return (
    <header className="bg-[#0f1218] border-b border-white/10 text-gray-100 sticky top-0 z-40 shadow-2xl">
      {/* Alert ticker banner */}
      <div className="bg-gradient-to-r from-orange-950/80 via-amber-950/70 to-red-950/80 text-orange-200 text-xs py-1.5 px-4 flex items-center justify-between border-b border-orange-500/20">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap max-w-5xl">
          <span className="flex items-center gap-1 font-semibold text-orange-400 bg-black/50 px-2 py-0.5 rounded text-[11px] uppercase tracking-wider shrink-0 border border-orange-500/40">
            <AlertTriangle className="w-3 h-3 text-orange-400" /> Peringatan BMKG 2026
          </span>
          <span className="truncate text-gray-300">
            Musim kemarau ekstrem 2026 berdampak pada puncaknya AIT Juli 2026 (124rb ha). Total Karhutla Jan-Jul mencapai <strong className="text-orange-400 font-bold">229.000 Hektare</strong>.
          </span>
        </div>
        <a
          href="https://sipongi.gakkum.kehutanan.go.id"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1 text-[11px] text-orange-300 hover:text-white transition-colors underline shrink-0"
        >
          Disandingkan dengan SIPONGI <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 gap-4">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(234,88,12,0.4)] border border-orange-400/30">
              <Flame className="w-5 h-5 text-white fill-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-widest text-orange-400 uppercase">
                  MADANI Berkelanjutan
                </span>
                <span className="text-[10px] bg-white/10 text-gray-300 px-1.5 py-0.5 rounded font-mono border border-white/10">
                  Update H-3
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase flex items-center gap-2">
                AIT Watch <span className="text-orange-500 font-light">Indonesia</span>
              </h1>
            </div>
          </div>

          {/* Right Controls: Period Selector */}
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md p-1.5 rounded-xl border border-white/10">
            <Calendar className="w-4 h-4 text-orange-400 ml-2" />
            <span className="text-xs text-gray-400 font-medium hidden sm:inline">Periode Data:</span>
            <div className="flex gap-1">
              <button
                id="period-jan-jul"
                onClick={() => setPeriod('jan-jul-2026')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  period === 'jan-jul-2026'
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/40'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                Jan - Jul 2026
              </button>
              <button
                id="period-jan-jun"
                onClick={() => setPeriod('jan-jun-2026')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  period === 'jan-jun-2026'
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/40'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                Jan - Jun 2026
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-2 border-t border-white/10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30 shadow-[0_0_12px_rgba(234,88,12,0.2)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
                {tab.id === 'ai' && (
                  <span className="bg-orange-500/20 text-orange-300 text-[10px] px-1.5 py-0.2 rounded-full font-bold border border-orange-500/30">
                    AI
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
