import React from 'react';
import { Users, GraduationCap, BookOpen, Star, Settings2, Sparkles, TrendingUp } from 'lucide-react';
import { PlatformContent } from '../../types/content';

interface StatsSectionProps {
  content: PlatformContent['stats'];
  onOpenAdmin: () => void;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  content,
  onOpenAdmin,
}) => {
  const statIcons: Record<string, React.ElementType> = {
    tutors: BookOpen,
    students: GraduationCap,
    lessons: TrendingUp,
    satisfaction: Star,
  };

  return (
    <section id="stats" className="py-20 lg:py-28 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Admin trigger */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="text-right max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full mb-3 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>إنجازات ملموسة</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-2">
              {content.title}
            </h2>
            <p className="text-base text-neutral-600 font-medium">
              {content.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl border border-neutral-200 transition-colors shadow-xs cursor-pointer"
            >
              <Settings2 className="w-4 h-4 text-emerald-600" />
              <span>تعديل الإحصائيات كمسؤول (Admin)</span>
            </button>
          </div>
        </div>

        {/* 4 Stats Cards Grid with tabular numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.items.map((stat) => {
            const IconComp = statIcons[stat.id] || TrendingUp;
            return (
              <div
                key={stat.id}
                className="bg-neutral-50/70 rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs hover:border-emerald-300 hover:bg-white transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-white border border-neutral-200 text-emerald-700 flex items-center justify-center shadow-xs">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400">محدّث تلقائياً</span>
                  </div>

                  <div className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight font-mono tabular-nums mb-2">
                    {stat.value.toLocaleString('ar-SA')}
                    <span className="text-emerald-600 text-2xl sm:text-3xl mr-0.5">{stat.suffix}</span>
                  </div>

                  <h3 className="text-sm font-bold text-neutral-800 mb-1">
                    {stat.label}
                  </h3>
                </div>

                <p className="mt-4 pt-3 border-t border-neutral-200/70 text-xs text-neutral-500 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Live Admin Note for testing */}
        <div className="mt-8 text-center text-xs text-neutral-400">
          * هذه الإحصائيات ديناميكية وتُغذّى من قاعدة البيانات، ويمكنك اختبار تعديلها عبر زر <strong className="text-neutral-700">"لوحة الإدارة"</strong> أعلى الصفحة.
        </div>

      </div>
    </section>
  );
};
