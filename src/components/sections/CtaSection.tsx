import React from 'react';
import { ArrowLeft, Search, ShieldCheck, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { PlatformContent } from '../../types/content';

interface CtaSectionProps {
  content: PlatformContent['cta'];
  onStartSearch: () => void;
  onJoinTutor: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  content,
  onStartSearch,
  onJoinTutor,
}) => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-emerald-50/40 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-neutral-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden text-center">
          
          {/* Ambient light circles */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold mb-6 border border-white/10 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>خطوتك الأولى نحو التميز الدراسي</span>
          </div>

          {/* Main Title requested */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
            {content.title}
          </h2>

          {/* Subtitle requested */}
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            {content.subtitle}
          </p>

          {/* Primary Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={onStartSearch}
              className="w-full sm:w-auto px-8 py-4 bg-white text-emerald-950 hover:bg-emerald-50 font-extrabold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Search className="w-4 h-4 text-emerald-700" />
              <span>{content.buttonText}</span>
              <ArrowLeft className="w-4 h-4 text-emerald-700 transition-transform group-hover:-translate-x-1" />
            </button>

            <button
              onClick={onJoinTutor}
              className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base rounded-xl border border-white/20 backdrop-blur-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span>انضم كمعلم مسجل</span>
            </button>
          </div>

          {/* Guarantees bar */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-emerald-200">
            {content.guarantees.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
