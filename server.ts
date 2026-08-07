import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "Pantau Karhutla AIT - MADANI Berkelanjutan" });
  });

  // AI Assistant endpoint for Karhutla & AIT Questions
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Pesan tidak boleh kosong." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          reply: "Model AI Gemini memerlukan API Key yang belum terkonfigurasi di server. Namun Anda tetap dapat membaca panduan lengkap Konsep AIT dan statistik Karhutla di tab Konsep AIT dan Dashboard!"
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `Anda adalah "Asisten AI Karhutla AIT" dari MADANI Berkelanjutan, sebuah lembaga riset independen lingkungan hidup di Indonesia.
Tugas utama Anda adalah menjelaskan update Kebakaran Hutan dan Lahan (Karhutla) di Indonesia serta Metode Pemodelan Area Indikatif Terbakar (AIT) secara ramah, mudah dipahami masyarakat awam, dan akurat berdasarkan data resmi MADANI Berkelanjutan.

Pengetahuan Utama Anda:
1. Konsep AIT (Area Indikatif Terbakar):
   - Dikembangkan MADANI Berkelanjutan sejak tahun 2019.
   - Bertujuan mendeteksi gambaran awal karhutla dalam skala hektare secara dekat-realtime dengan jeda output model hanya 1 minggu (hingga H-3) dari hari pelaporan.
   - Pemilahan Hotspot: Memfilter hotspot awal (confidence > 60%) dan menapiskan (mengeliminasi) hotspot di area perkotaan, utilitas industri (pabrik, stockpile, konstruksi), serta kawah gunung api aktif.
   - Dual Validasi:
     a) Citra Satelit Sentinel-2 pada kombinasi band B8-B4-B3 dan B12-B11-B4 (SWIR) untuk memverifikasi kepulan asap dan bekas terbakar.
     b) Tabulasi SIPONGI Kemenhut: Memiliki nilai koefisien korelasi 90,65% dan R² scatter plot sebesar 82,2% - 96,17%, membuktikan pola sebaran AIT sangat mirip dengan SIPONGI.

2. Data Terkini (Januari - Juli 2026):
   - Total AIT Kumulatif: 229.000 Hektare.
   - Area Berulang (terbakar berulang tiap bulan): 9.827 ha (4,28%).
   - Area Tidak Berulang (fokus analisis): 219.513 Hektare (95,72%).
   - Lonjakan Juli 2026: Terjadi lonjakan tajam pada Juli 2026 mencapai 124.040 ha akibat puncak kemarau.
   - Provinsi Terluas AIT (Jan-Jul 2026):
     1. Kalimantan Barat: 50.558 ha (50,5 ribu ha)
     2. Papua Selatan: 41.790 ha (41,7 ribu ha)
     3. Riau: 20.699 ha
     4. Kalimantan Tengah: 11.723 ha
     5. NTT: 10.221 ha
   - Kabupaten Terluas AIT:
     1. Kab. Merauke (Papua Selatan): 33.609 ha
     2. Kab. Ketapang (Kalbar): 13.072 ha
     3. Kab. Bengkalis (Riau): 12.279 ha
     4. Kab. Kubu Raya (Kalbar): 10.963 ha
   - Analisis Tutupan Lahan & Kerentanan:
     * Kawasan Hutan: 59,21% (129,9 ribu ha), terbanyak di Hutan Produksi (94,9 ribu ha).
     * Fungsi Ekosistem Gambut (FE Gambut): 37,29% (81,8 ribu ha), mayoritas di gambut rusak ringan (49 ribu ha) & sedang (20 ribu ha).
     * Tumpang Tindih Izin & Konsesi: 41% (90 ribu ha), terluas di izin perkebunan sawit (35 ribu ha), MIGAS (19 ribu ha), dan PBPH (16,3 ribu ha).
     * Area Moratorium PIPPIB: 35% (76,8 ribu ha), terbanyak di PIPPIB Gambut (40,1 ribu ha).
     * RO FOLU Net Sink 2030: 32,6% (71,5 ribu ha).
     * Key Biodiversity Area (KBA): 10,13% (22,2 ribu ha).

Petunjuk Sikap & Jawaban:
- Jawablah menggunakan bahasa Indonesia yang ramah, jelas, terstruktur, dan mudah dipahami orang awam.
- Gunakan format bullet points atau penekanan bold jika menjelaskan angka agar nyaman dibaca.
- Selalu tegaskan bahwa AIT adalah indikator dini (bukan luasan final terbakar) untuk membantu pemangku kepentingan melakukan tindakan pencegahan sedini mungkin.`;

      const contents = [];
      if (Array.isArray(history)) {
        for (const item of history) {
          contents.push({
            role: item.sender === "user" ? "user" : "model",
            parts: [{ text: item.text }]
          });
        }
      }
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "Maaf, terjadi masalah dalam memproses tanggapan.";
      res.json({ reply: replyText });
    } catch (error: any) {
      console.error("Error in /api/chat:", error);
      res.status(500).json({ error: "Terjadi kesalahan internal server saat menghubungi AI." });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
