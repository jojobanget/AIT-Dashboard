import React, { useState } from 'react';
import { TimePeriod, ProvinceAitData } from './types';
import { PROVINCES_DATA } from './data/aitData';
import { Navbar } from './components/Navbar';
import { IndonesiaMap } from './components/IndonesiaMap';
import { DashboardAnalytics } from './components/DashboardAnalytics';
import { AitConceptPage } from './components/AitConceptPage';
import { ProvinceExplorer } from './components/ProvinceExplorer';
import { AiAssistant } from './components/AiAssistant';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('map');
  const [period, setPeriod] = useState<TimePeriod>('jan-jul-2026');
  const [selectedProvince, setSelectedProvince] = useState<ProvinceAitData | null>(PROVINCES_DATA[0]);

  const handleSelectProvince = (prov: ProvinceAitData) => {
    setSelectedProvince(prov);
    setActiveTab('explorer');
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-gray-100 font-sans flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Header & Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        period={period}
        setPeriod={setPeriod}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {activeTab === 'map' && (
          <IndonesiaMap
            period={period}
            onSelectProvince={handleSelectProvince}
            onNavigateToConcept={() => setActiveTab('concept')}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardAnalytics period={period} />
        )}

        {activeTab === 'concept' && (
          <AitConceptPage />
        )}

        {activeTab === 'explorer' && (
          <ProvinceExplorer initialSelectedProv={selectedProvince} />
        )}

        {activeTab === 'ai' && (
          <AiAssistant />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
