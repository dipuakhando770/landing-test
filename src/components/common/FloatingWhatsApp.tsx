import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Sparkles, Send, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useLiveActivity } from '../../context/LiveActivityContext';
import { sanitizeWhatsAppNumber } from '../../utils/formatters';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useStore();
  const { liveViewers, totalChatsToday, currentActivity } = useLiveActivity();
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');
  const [promptIndex, setPromptIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(true);

  const whatsappNumber = settings.whatsappNumber || '01962780922';
  const targetNumber = sanitizeWhatsAppNumber(whatsappNumber);

  const prompts = [
    `👋 কোনো প্রশ্ন আছে? ৩ জন সাপোর্ট স্পেশালিস্ট এখন অনলাইনে আছেন!`,
    `💬 আজকে ${totalChatsToday}+ জন কাস্টমার হোয়াটসঅ্যাপে চ্যাট করে অর্ডার নিয়েছেন!`,
    `🟢 লাইভে ${liveViewers} জন ভিজিটর সক্রিয় • যে কোনো প্রয়োজনে কথা বলুন!`
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % prompts.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [prompts.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const textToSend = userMsg.trim() || 'আসসালামু আলাইকুম! নাসির ডিজিটাল হাব থেকে সেবা নিতে চাই।';
    const url = `https://wa.me/${targetNumber}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setUserMsg('');
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 font-['Hind_Siliguri',sans-serif]">
      {/* Floating Rotating Support & Chat Prompt Bubble */}
      {!isOpen && showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="mb-2 max-w-[270px] sm:max-w-xs bg-slate-950/95 hover:bg-slate-900 border border-emerald-500/40 hover:border-emerald-500/80 rounded-2xl p-2.5 shadow-xl text-white cursor-pointer backdrop-blur-md relative group transition-all"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowPrompt(false);
            }}
            className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-[10px]"
            title="বন্ধ করুন"
          >
            ×
          </button>

          <div className="flex items-center gap-2">
            {/* Avatar Stack */}
            <div className="flex -space-x-1.5 shrink-0">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-[9px] flex items-center justify-center border-2 border-slate-950">
                NH
              </span>
              <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold text-[9px] flex items-center justify-center border-2 border-slate-950">
                SP
              </span>
              <div className="relative">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center border-2 border-slate-950">
                  ২৪
                </span>
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-slate-950 animate-pulse" />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold text-emerald-300 leading-tight">
                {prompts[promptIndex]}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span>সরাসরি চ্যাটে মেসেজ দিন</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Chat Drawer Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="mb-3 w-80 sm:w-88 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden text-slate-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-700 to-teal-800 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <MessageCircle className="w-5 h-5 fill-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-emerald-900" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Nasir Digital Hub Live Chat</h4>
                  <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    ৩ জন প্রতিনিধি অনলাইনে আছেন (২৪/৭)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Live Chat Metric Strip */}
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <Users className="w-3.5 h-3.5" />
                <span>আজকে {totalChatsToday} জন সহায়তা নিয়েছেন</span>
              </span>
              <span className="text-[10px] text-teal-300">গড় রিপ্লাই: ৩০ সেকেন্ড</span>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-slate-950/60 space-y-3 text-xs">
              <div className="bg-slate-900 p-3 rounded-2xl rounded-tl-sm border border-slate-800 text-slate-200 leading-relaxed shadow-sm">
                👋 আসসালামু আলাইকুম! কীভাবে সহায়তা করতে পারি? আপনার পছন্দের প্রোডাক্ট, সফটওয়্যার বা ড্রাইভ লিঙ্ক সম্পর্কিত যেকোনো প্রশ্ন সরাসরি করুন।
              </div>

              {/* Quick Questions Chips */}
              <div className="space-y-1.5 pt-1">
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">দ্রুত প্রশ্ন করুন:</p>
                <button
                  type="button"
                  onClick={() => setUserMsg('Canva Pro / CapCut Pro এর লাইসেন্স কীভাবে পাবো?')}
                  className="w-full text-left p-2 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800/80 text-slate-300 hover:text-emerald-400 text-[11px] transition-colors"
                >
                  ⚡ সফটওয়্যার লাইসেন্স ও এক্টিভেশন কীভাবে পাবো?
                </button>
                <button
                  type="button"
                  onClick={() => setUserMsg('পেমেন্ট মেথড (bKash/Nagad) এবং ডেলিভারি চার্জ কত?')}
                  className="w-full text-left p-2 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800/80 text-slate-300 hover:text-emerald-400 text-[11px] transition-colors"
                >
                  💳 পেমেন্ট মাধ্যম ও ইন্সট্যান্ট ডেলিভারি প্রক্রিয়া
                </button>
                <button
                  type="button"
                  onClick={() => setUserMsg('১০০TB মেগা বান্ডেল এর ড্রাইভ লিঙ্ক কতদিন থাকবে?')}
                  className="w-full text-left p-2 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800/80 text-slate-300 hover:text-emerald-400 text-[11px] transition-colors"
                >
                  📁 ১০০TB মেগা বান্ডেলের লাইফটাইম অ্যাক্সেস সম্পর্কে জানতে চাই
                </button>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                placeholder="আপনার বার্তা লিখুন..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-all shrink-0 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pulse Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white text-slate-800 shadow-xl border border-slate-200 hover:border-emerald-400 group cursor-pointer"
      >
        <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>লাইভ চ্যাট</span>
        </span>
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md shrink-0">
          <MessageCircle className="w-4 h-4 fill-white" />
        </div>
      </motion.button>
    </div>
  );
};

