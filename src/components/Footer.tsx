import React from 'react';
import { ShieldCheck, Mail, Phone, Clock, MapPin, Sliders } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-[#0B1020] text-slate-400 font-['Hind_Siliguri',sans-serif] pt-16 pb-28 md:pb-16 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl">
                N
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Nasir Digital Hub</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Nasir Digital Hub is a Digital Education & Product Platform dedicated to turning practical skills into profitable online income systems.
            </p>
            <div className="space-y-1 text-xs text-slate-400 pt-1">
              <div>Trade L #: TRAD/DNCC/037312/2025</div>
              <div>TIN: 359147217020</div>
            </div>
          </div>

          {/* Col 2: Services / Policies */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Important Links</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#order-now" className="hover:text-white transition-colors">Courses & Combo Pack</a>
              </li>
              <li>
                <a href="#curriculum" className="hover:text-white transition-colors">Course Curriculum</a>
              </li>
              <li>
                <a href="#proofs" className="hover:text-white transition-colors">Live Proofs & Reviews</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">FAQ & Help</a>
              </li>
              {onOpenAdmin && (
                <li>
                  <button
                    onClick={onOpenAdmin}
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>অ্যাডমিন ড্যাশবোর্ড (Meta Pixel Settings)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Get in Touch */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Get In Touch</h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>CS - 10347, Krishi Bank Road, Middle Badda, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Email: mdnasirhassan365.02@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>WhatsApp: +8801875656565</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Hours: Mon-Fri 9:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>© 2026 Nasir Digital Hub. All Rights Reserved.</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Securely Integrated with Custom PayBD Gateway</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
