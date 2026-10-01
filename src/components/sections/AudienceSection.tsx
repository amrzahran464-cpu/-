import React, { useState } from 'react';
import { Clock, ShieldCheck, HeartHandshake, Sparkles, CheckCircle, GraduationCap, CheckCircle2 } from 'lucide-react';
import { PlatformContent } from '../../types/content';

interface AudienceSectionProps {
  content: PlatformContent['audience'];
  onExploreClick: () => void;
}

export const AudienceSection: React.FC<AudienceSectionProps> = ({
  content,
  onExploreClick,
}) => {
  const [selectedPerspective, setSelectedPerspective] = useState<'both' | 'student' | 'parent'>('both');
  const [imgError, setImgError] = useState(false);

  return (
    <section id="audience" className="py-20 lg:py-28 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full mb-3 border border-emerald-200">
            لأجلك ولأجل مستقبلك
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">
            {content.title}
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 font-medium leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* Perspective Toggle Buttons */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedPerspective('both')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
              selectedPerspective === 'both'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
            }`}
          >
            معاً (الطالب وولي الأمر)
          </button>
          <button
            onClick={() => setSelectedPerspective('student')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
              selectedPerspective === 'student'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
            }`}
          >
            ماذا يستفيد الطالب؟
          </button>
          <button
            onClick={() => setSelectedPerspective('parent')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
              selectedPerspective === 'parent'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
            }`}
          >
            ماذا يستفيد ولي الأمر؟
          </button>
        </div>

        {/* Two-Column Grid with Image & Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-neutral-200 shadow-xl aspect-[4/3] bg-neutral-100">
              {!imgError ? (
                <img
                  src={content.imagePath}
                  alt="ولي الأمر والطالب يحتفلان بالنجاح والتفوق الأكاديمي"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-emerald-50 to-neutral-100 text-emerald-900 text-center">
                  <HeartHandshake className="w-12 h-12 mb-3 text-emerald-600" />
                  <p className="font-bold text-base">شراكة نجاح حقيقية</p>
                  <p className="text-xs text-neutral-600 mt-1">توفير الوقت وراحة البال للأسر والطلاب</p>
                </div>
              )}

              {/* Scrim and Overlay info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 right-4 left-4 text-white">
                <span className="text-xs font-bold text-emerald-300">اطمئنان أسري تام</span>
                <p className="text-sm font-bold mt-0.5">معلومات دقيقة ومدرسون تم التحقق منهم قبل كل شيء</p>
              </div>
            </div>

            {/* Quick Stat Pill below image */}
            <div className="mt-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between text-xs text-neutral-600">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>توفير أكثر من 8 ساعات أسبوعياً في البحث والتنسيق</span>
              </span>
              <span className="font-bold text-emerald-700">100% موثق</span>
            </div>
          </div>

          {/* Benefits Detail Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Student Lens */}
            {(selectedPerspective === 'both' || selectedPerspective === 'student') && (
              <div className="p-6 sm:p-7 rounded-3xl bg-neutral-50 border border-neutral-200/90 shadow-xs">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    قيمة مَسار للطالب: دراسة تفاعلية وتفوق مستحق
                  </h3>
                </div>

                <div className="space-y-3">
                  {content.studentBenefits.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Parent Lens */}
            {(selectedPerspective === 'both' || selectedPerspective === 'parent') && (
              <div className="p-6 sm:p-7 rounded-3xl bg-neutral-50 border border-neutral-200/90 shadow-xs">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    قيمة مَسار لولي الأمر: وضوح مالي وراحة بال كاملة
                  </h3>
                </div>

                <div className="space-y-3">
                  {content.parentBenefits.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action CTA */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onExploreClick}
                className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              >
                تصفح قائمة المدرسين المعتمدين الآن
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
