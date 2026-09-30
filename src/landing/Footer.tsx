import React from 'react';
import { ShieldCheck, Mail, Phone, Clock, MapPin } from 'lucide-react';
import { scrollToElement } from '../utils/navigation';
import { BrandLogo } from '../components/common/BrandLogo';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-slate-100 text-slate-600 font-['Hind_Siliguri',sans-serif] pt-14 pb-28 md:pb-14 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-slate-200">
          {/* Col 1: Brand info */}
          <div className="space-y-4">
            <BrandLogo variant="footer" />
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              একটি শীর্ষস্থানীয় ডিজিটাল এডুকেশন ও রিসোর্স প্ল্যাটফর্ম। ব্যবহারিক স্কিল ও ২TB প্রিমিয়াম রিসোর্সের মাধ্যমে নিজের লাভজনক ডিজিটাল প্রোডাক্ট বিজনেস গড়ে তুলুন।
            </p>
            <div className="space-y-1 text-xs text-slate-500 font-medium pt-1">
              <div>Trade License #: TRAD/DNCC/037312/2025</div>
              <div>TIN: 359147217020</div>
            </div>
          </div>

          {/* Col 2: Services / Policies */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">গুরুত্বপূর্ণ লিঙ্ক</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <a href="/" className="hover:text-blue-600 transition-colors">মূল ওয়েবসাইট</a>
              </li>
              <li>
                <button type="button" onClick={() => scrollToElement('order-now')} className="hover:text-blue-600 transition-colors cursor-pointer text-left">
                  কম্বো প্যাক অফার (৳২৯৯)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToElement('curriculum')} className="hover:text-blue-600 transition-colors cursor-pointer text-left">
                  কোর্স কারিকুলাম
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToElement('proofs')} className="hover:text-blue-600 transition-colors cursor-pointer text-left">
                  লাইভ প্রুফ ও রিভিউ
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToElement('faq')} className="hover:text-blue-600 transition-colors cursor-pointer text-left">
                  প্রশ্নোত্তর ও সহায়তা
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Get in Touch */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">যোগাযোগ ও সাপোর্ট</h4>
            <div className="space-y-3 text-xs sm:text-sm font-medium text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>CS - 10347, Krishi Bank Road, Middle Badda, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Email: mdnasirhassan365.02@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <span>WhatsApp: +8801962780922</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <span>সাপোর্ট সময়: প্রতিদিন সকাল ৯:০০ - রাত ১১:০০</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div>© 2026 All Rights Reserved.</div>
          <div className="flex items-center gap-2 text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>১০০% সুরক্ষিত ও এনক্রিপ্টেড পেমেন্ট</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
