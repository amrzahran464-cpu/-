import React, { useState } from 'react';
import { Target, Compass, BookOpen, GraduationCap, CreditCard, Award, Star, Sparkles, Video, CheckCircle2 } from 'lucide-react';
import { PlatformContent, CriteriaItem } from '../../types/content';

interface VisionMissionSectionProps {
  content: PlatformContent['visionMission'];
  onSelectCriterion?: (criterionId: string) => void;
}

export const VisionMissionSection: React.FC<VisionMissionSectionProps> = ({
  content,
  onSelectCriterion,
}) => {
  const [activeCriterionId, setActiveCriterionId] = useState<string>('subject');

  const criteriaIcons: Record<string, React.ElementType> = {
    BookOpen,
    GraduationCap,
    CreditCard,
    Award,
    Star,
    Sparkles,
    Video,
  };

  const selectedCriterion = content.mission.criteria.find((c) => c.id === activeCriterionId) || content.mission.criteria[0];

  return (
    <section id="vision-mission" className="py-20 lg:py-28 bg-neutral-50/60 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full mb-3 border border-emerald-200">
            البوصلة والاتجاه
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">
            رؤيتنا ورسالتنا التعليمية
          </h2>
          <p className="text-base text-neutral-600 font-medium">
            مبادئ واضحة تقود كل قرار نتخذه لبناء بيئة تعليم خصوصي موثوقة وعادلة
          </p>
        </div>

        {/* Vision Card & Mission Hero in 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* 3. رؤيتنا */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300 border border-white/10">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white">
                  {content.vision.title}
                </h3>
              </div>

              {/* Exact Quote requested */}
              <blockquote className="text-2xl sm:text-3xl font-extrabold leading-snug text-emerald-100 mb-6 border-r-4 border-emerald-400 pr-4">
                "{content.vision.quote}"
              </blockquote>

              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                {content.vision.description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-emerald-800/80 flex items-center justify-between text-xs text-emerald-300 font-medium">
              <span>سهولة · مرونة · شفافية</span>
              <span className="font-mono text-emerald-400">2026 - وما بعدها</span>
            </div>
          </div>

          {/* 4. رسالتنا Intro Box */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 border border-emerald-200">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-neutral-900">
                  {content.mission.title}
                </h3>
              </div>

              <p className="text-base sm:text-lg text-neutral-800 font-medium leading-relaxed mb-6">
                {content.mission.lead}
              </p>

              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-xs sm:text-sm text-neutral-700 leading-relaxed mb-6">
                لا نكتفي بإدراج أرقام هواتف المدرسين؛ بل نمنح الطالب وولي الأمر منظومة ترشيح ومطابقة ذكية تضمن التوافق التام مع المعايير السبعة التالية، لتجنب أي تجربة درس غير مرضية.
              </div>
            </div>

            {/* Criteria Quick Grid Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-neutral-700">
              {content.mission.criteria.slice(0, 4).map((c) => (
                <div key={c.id} className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200/80 text-center">
                  {c.name}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Deep Dive into the 7 Criteria */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/90 shadow-md">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-neutral-100">
            <div>
              <span className="text-xs font-bold text-emerald-700">معايير الاختيار السبعة</span>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
                كيف تضمن المنصة كل معيار من معايير رسالتنا؟
              </h3>
            </div>
            <p className="text-xs text-neutral-500 max-w-sm">
              انقر على أي معيار أدناه للاطلاع على كيفية توظيفه في المنصة لتسهيل اختيارك للمدرس
            </p>
          </div>

          {/* 7 Interactive Criteria Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-8">
            {content.mission.criteria.map((item) => {
              const IconComp = criteriaIcons[item.icon] || BookOpen;
              const isSelected = item.id === activeCriterionId;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveCriterionId(item.id);
                    if (onSelectCriterion) onSelectCriterion(item.id);
                  }}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md -translate-y-0.5'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200/80 hover:bg-neutral-100/80'
                  }`}
                >
                  <IconComp className={`w-5 h-5 mb-2 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
                  <span className="text-xs font-bold leading-tight">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Criterion Showcase */}
          {selectedCriterion && (
            <div className="bg-neutral-50/80 rounded-2xl p-6 border border-neutral-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-in fade-in duration-300">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-[11px] font-bold bg-emerald-100 text-emerald-800 rounded-md">
                    المعيار المحدد
                  </span>
                  <h4 className="text-lg font-bold text-neutral-900">
                    {selectedCriterion.name}
                  </h4>
                </div>
                <p className="text-sm text-neutral-600 max-w-2xl leading-relaxed">
                  {selectedCriterion.summary}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-neutral-200/80 shadow-xs md:max-w-xs w-full">
                <div className="text-[11px] font-bold text-neutral-400 mb-1">في محرك بحث مَسار:</div>
                <p className="text-xs font-semibold text-neutral-800 leading-normal">
                  {selectedCriterion.filterExample}
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
