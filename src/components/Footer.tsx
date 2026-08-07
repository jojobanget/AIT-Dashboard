import React from 'react';
import { Flame, ExternalLink, ShieldAlert, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f1218] border-t border-white/10 text-gray-400 py-10 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-[0_0_12px_rgba(234,88,12,0.4)]">
                <Flame className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-base font-bold text-white tracking-tight uppercase">
                AIT Watch <span className="text-orange-500 font-light">Indonesia</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Platform Pemantauan Kebakaran Hutan dan Lahan (Karhutla) di Indonesia berbasis model <strong className="text-gray-200">Area Indikatif Terbakar (AIT)</strong> oleh MADANI Berkelanjutan. Dirancang user-friendly agar dapat dipahami oleh publik, pemangku kepentingan, dan pembuat kebijakan.
            </p>
          </div>

          {/* Primary Data Sources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest">
              Sumber Data &amp; Referensi
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center justify-between">
                <span>Model AIT (Jeda 1 Minggu / H-3)</span>
                <span className="text-orange-400 font-mono font-medium">MADANI 2026</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Citra Satelit Sentinel-2 (SWIR)</span>
                <span className="text-orange-400 font-mono font-medium">ESA / Copernicus</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Tabulasi Kebakaran Resmi</span>
                <a
                  href="https://sipongi.gakkum.kehutanan.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline flex items-center gap-1 font-mono"
                >
                  SIPONGI Kemenhut <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="flex items-center justify-between">
                <span>Prediksi Musim Kemarau 2026</span>
                <span className="text-orange-400 font-mono font-medium">BMKG</span>
              </li>
            </ul>
          </div>

          {/* Important Legal & Methodological Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-orange-500" /> Catatan Penting AIT
            </h4>
            <p className="text-gray-400 leading-relaxed bg-[#0a0c10] p-3 rounded-xl border border-white/10">
              Angka luasan AIT merupakan <strong className="text-gray-200">gambaran dini indikatif</strong> area yang patut diduga terbakar untuk kepentingan pencegahan respon cepat, bukan gambaran akhir hukum luasan terbakar.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400 font-mono">
          <p>© 2026 MADANI Berkelanjutan &bull; AIT Watch Indonesia.</p>
          <div className="flex items-center gap-6 uppercase tracking-wider text-[10px]">
            <span>Satelit: MODIS / VIIRS</span>
            <span className="text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Status: Operasional
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
