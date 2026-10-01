import React, { useState } from 'react';
import { ShieldCheck, FileText, Star, CalendarCheck, Clock, Users, Lock, LayoutDashboard, Sparkles, Check } from 'lucide-react';
import { PlatformContent, BenefitCard } from '../../types/content';

interface WhyUsSectionProps {
  content: PlatformContent['whyUs'];
  onCardAction?: (cardId: string) => void;
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({
  content,
  onCardAction,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const iconMap: Record<string, React.ElementType> = {
    ShieldCheck,
    FileText,
    Star,
    CalendarCheck,
    Clock,
    Users,
    Lock,
    LayoutDashboard,
  };

  const filterOptions = [
    { id: 'all', label: 'كافة المزايا (8)' },
    { id: 'trust', label: 'الموثوقية والتقييم' },
    { id: 'booking', label: 'الحجز والمرونة' },
    { id: 'experience', label: 'طريقة الدرس والمتابعة' },
    { id: 'security', label: 'الأمان والدفع' },
  ];

  const filteredCards = selectedFilter === 'all'
    ? content.cards
    : content.cards.filter((c) => c.category === selectedFilter);

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full mb-3 border border-emerald-200">
            القيمة المضافة
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">
            {content.title}
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 font-medium">
            {content.subtitle}
          </p>
        </div>

        {/* Filter Bar (Interactive Buttons) */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedFilter(opt.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                selectedFilter === opt.id
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/80'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* 8 Distinct Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCards.map((card, index) => {
            const IconComponent = iconMap[card.icon] || ShieldCheck;
            return (
              <div
                key={card.id}
                onClick={() => onCardAction && onCardAction(card.id)}
                className="group bg-white rounded-3xl p-6 border border-neutral-200/90 hover:border-emerald-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon & Sequence */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-neutral-400 font-semibold">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-neutral-900 mb-2.5 group-hover:text-emerald-700 transition-colors">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Card Footer with clean unboxed metadata */}
                {card.highlightText && (
                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                    <Check className="w-3.5 h-3.5" />
                    <span>{card.highlightText}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Reassurance Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-right">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900">هل تحتاج مساعدة في اختيار المدرس المناسب؟</h4>
              <p className="text-xs text-neutral-600">فريقنا الإرشادي متاح لمساعدتك في مطابقة احتياجاتك مع أفضل معلم خلال دقائق.</p>
            </div>
          </div>
          <a
            href="https://wa.me/9668001245678"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-800 text-xs font-bold rounded-xl transition-colors whitespace-nowrap shadow-xs"
          >
            تحدث مع مستشار تعليمي
          </a>
        </div>

      </div>
    </section>
  );
};
