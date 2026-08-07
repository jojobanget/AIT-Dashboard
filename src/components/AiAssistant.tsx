import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import {
  Bot,
  Send,
  User,
  Sparkles,
  Flame,
  HelpCircle,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: 'Halo! Saya Asisten AI Karhutla AIT dari **MADANI Berkelanjutan**. Saya siap membantu Anda memahami data update kebakaran hutan dan lahan (Karhutla) di Indonesia serta konsep metode pemodelan **Area Indikatif Terbakar (AIT)**.\n\nApa yang ingin Anda tanyakan hari ini?',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Bagaimana alur pemodelan AIT?',
    'Mengapa AIT beda dengan hotspot?',
    'Berapa luas AIT di kawasan gambut?',
    'Provinsi mana saja yang AIT-nya paling luas?',
    'Bagaimana akurasi AIT dibanding SIPONGI?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-6), // Send last 6 messages context
        }),
      });

      const data = await response.json();

      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || data.error || 'Maaf, terjadi kendala saat merespons.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'Maaf, terjadi gangguan koneksi dengan server AI. Anda tetap bisa menelusuri data AIT secara lengkap pada tab Dashboard dan Peta Interaktif.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0d1016] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col h-[650px] relative overflow-hidden backdrop-blur-xl">
      {/* Header Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center shadow-[0_0_12px_rgba(234,88,12,0.3)]">
            <Bot className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
              Tanya AI Karhutla <span className="text-orange-500 font-light">AIT</span>
              <span className="text-[10px] bg-orange-950/80 text-orange-400 px-2 py-0.5 rounded-full border border-orange-800 font-mono font-bold">
                Gemini 2.5
              </span>
            </h2>
            <p className="text-xs text-gray-400">
              Asisten AI interaktif untuk menjawab pertanyaan masyarakat mengenai Karhutla &amp; Metode AIT
            </p>
          </div>
        </div>

        <button
          id="btn-reset-chat"
          onClick={() => {
            setMessages([
              {
                id: 'init-1',
                sender: 'assistant',
                text: 'Percakapan telah diperbarui. Silakan ajukan pertanyaan baru mengenai data Karhutla atau konsep AIT!',
                timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
              },
            ]);
          }}
          className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
          title="Reset Percakapan"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Prompts Scrollbar */}
      <div className="py-3 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 border-b border-white/10">
        <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1 shrink-0 font-mono">
          <Sparkles className="w-3 h-3 text-orange-400" /> Contoh Pertanyaan:
        </span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            id={`quick-prompt-${idx}`}
            onClick={() => handleSendMessage(prompt)}
            disabled={loading}
            className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-medium border border-white/10 shrink-0 transition-colors disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message Stream Container */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 no-scrollbar">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-orange-600 text-white shadow-[0_0_10px_rgba(234,88,12,0.5)]'
                    : 'bg-white/5 text-orange-400 border border-white/10'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-orange-500" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-lg ${
                  isUser
                    ? 'bg-orange-600 text-white rounded-tr-none'
                    : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none'
                }`}
              >
                {msg.text}
                <span
                  className={`block text-[10px] mt-2 font-mono ${
                    isUser ? 'text-orange-200 text-right' : 'text-gray-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/5 text-orange-400 border border-white/10 flex items-center justify-center">
              <Bot className="w-4 h-4 animate-bounce text-orange-500" />
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-gray-300 flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              Memproses jawaban berdasarkan data MADANI Berkelanjutan...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="pt-3 border-t border-white/10 flex items-center gap-2 shrink-0"
      >
        <input
          id="input-chat-msg"
          type="text"
          placeholder="Ketik pertanyaan Anda seputar Karhutla atau AIT..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={loading}
          className="flex-1 bg-[#0a0c10] border border-white/10 text-gray-100 text-xs sm:text-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:outline-none placeholder-gray-500 disabled:opacity-50"
        />
        <button
          id="btn-send-chat"
          type="submit"
          disabled={loading || !inputText.trim()}
          className="p-3 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white rounded-xl font-bold transition-all shrink-0 shadow-lg shadow-orange-950/80 border border-orange-500/50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
