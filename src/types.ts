export type TimePeriod = 'jan-jul-2026' | 'jan-jun-2026';

export interface MonthlyData {
  month: string;
  ha: number;
}

export interface ProvinceAitData {
  id: string;
  name: string;
  island: 'Kalimantan' | 'Papua' | 'Sumatera' | 'Nusa Tenggara' | 'Maluku' | 'Jawa' | 'Sulawesi';
  totalHa: number;
  monthly: {
    jan: number;
    feb: number;
    mar: number;
    apr: number;
    may: number;
    jun: number;
    jul: number;
  };
  topRegencies: { name: string; ha: number }[];
  kawasanHutanHa: number;
  gambutHa: number;
  izinSawitHa: number;
  coordinates: { x: number; y: number }; // SVG Map relative coordinates (0-1000, 0-500)
  pathData?: string;
  riskLevel: 'Kritis' | 'Tinggi' | 'Sedang' | 'Rendah';
}

export interface RegencyAitData {
  rank: number;
  name: string;
  province: string;
  ha: number;
}

export interface LandCoverBreakdown {
  category: string;
  percentage: number;
  hectares: number;
  details: string;
  color: string;
}

export interface ValidationMetric {
  title: string;
  value: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Konsep AIT' | 'Data & Akurasi' | 'Dampak & Kebijakan';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
