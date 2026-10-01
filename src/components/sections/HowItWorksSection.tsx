import React, { useState } from 'react';
import { Search, UserCheck, Calendar, CheckCircle2, ArrowLeft, Clock, ShieldCheck, Video, MapPin } from 'lucide-react';
import { PlatformContent } from '../../types/content';

interface HowItWorksSectionProps {
  content: PlatformContent['howItWorks'];
  onStartStep1: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  content,
  onStartStep1,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const stepIcons = [Search, UserCheck, Calendar, CheckCircle2];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-neutral-50/70 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full mb-3 border border-emerald-200">
            خطوة بخطوة
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">
            {content.title}
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 font-medium">
            {content.subtitle}
          </p>
        </div>

        {/* 4 Interactive Step Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {content.steps.map((step) => {
            const StepIcon = stepIcons[step.stepNumber - 1];
            const isActive = activeStep === step.stepNumber;
            return (
              <div
                key={step.stepNumber}
                onClick={() => setActiveStep(step.stepNumber)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer text-right flex flex-col justify-between ${
                  isActive
                    ? 'bg-white border-emerald-600 shadow-lg ring-2 ring-emerald-500/20 -translate-y-1'
                    : 'bg-white/80 border-neutral-200/80 hover:bg-white hover:border-neutral-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`w-9 h-9 rounded-xl font-mono text-sm font-bold flex items-center justify-center ${
                        isActive
                          ? 'bg-emerald-600 text-white'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      0{step.stepNumber}
                    </span>
                    <StepIcon
                      className={`w-5 h-5 ${
                        isActive ? 'text-emerald-600' : 'text-neutral-400'
                      }`}
                    />
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    <span>{step.duration}</span>
                  </span>
                  <span className="font-semibold text-emerald-700">{step.badge}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Interactive Step Preview Display */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/90 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Step Explanation */}
            <div className="lg:col-span-6 space-y-4 text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-bold border border-emerald-200">
                <span>المرحلة 0{activeStep} من 4</span>
                <span className="text-emerald-500">·</span>
                <span>{content.steps[activeStep - 1].badge}</span>
              </div>

              <h3 className="text-2xl font-extrabold text-neutral-900">
                {content.steps[activeStep - 1].title}
              </h3>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                {content.steps[activeStep - 1].description}
              </p>

              <div className="pt-2 space-y-2.5">
                <div className="text-xs font-bold text-neutral-500 mb-1">ما الذي يحدث في هذه الخطوة؟</div>
                {content.steps[activeStep - 1].details.map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={onStartStep1}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>جرب البحث الآن</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                {activeStep < 4 ? (
                  <button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    الخطوة التالية (0{activeStep + 1})
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveStep(1)}
                    className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    العودة للخطوة الأولى
                  </button>
                )}
              </div>
            </div>

            {/* Interactive Preview Mockup Box for Current Step */}
            <div className="lg:col-span-6">
              <div className="bg-neutral-50 rounded-2xl p-5 sm:p-6 border border-neutral-200/90 shadow-inner">
                
                {/* Step 1 Preview: Search Bar & Filters Mockup */}
                {activeStep === 1 && (
                  <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                      <span className="text-xs font-bold text-neutral-800">محاكي محرك البحث</span>
                      <span className="text-[11px] text-emerald-600 font-semibold">+60 مادة متوفرة</span>
                    </div>
                    <div className="space-y-2">
                      <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs flex justify-between">
                        <span className="text-neutral-500">المادة المطلوبة:</span>
                        <span className="font-bold text-neutral-800">رياضيات (تفاضل وتكامل)</span>
                      </div>
                      <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs flex justify-between">
                        <span className="text-neutral-500">المرحلة الدراسية:</span>
                        <span className="font-bold text-neutral-800">الثانوية العامة</span>
                      </div>
                      <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs flex justify-between">
                        <span className="text-neutral-500">طريقة الدرس:</span>
                        <span className="font-bold text-emerald-700">حضوري (الرياض) أو أونلاين</span>
                      </div>
                    </div>
                    <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-lg text-[11px] text-center font-medium">
                      ✓ وجدنا 48 معلماً معتمداً يطابق اختياراتك
                    </div>
                  </div>
                )}

                {/* Step 2 Preview: Tutor Profile Card Mockup */}
                {activeStep === 2 && (
                  <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                        د. س
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-neutral-900">أ. د. سارة القحطاني</h4>
                        <p className="text-xs text-neutral-500">أستاذة الرياضيات والإحصاء · خبرة 10 سنوات</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs py-2 px-3 bg-neutral-50 rounded-lg">
                      <span className="text-amber-500 font-bold">★ 4.95 (142 تقييم)</span>
                      <span className="font-bold text-neutral-900">140 ريال / ساعة</span>
                    </div>
                    <div className="flex gap-2 text-[11px]">
                      <span className="flex-1 py-1.5 px-2 bg-emerald-50 text-emerald-700 rounded text-center font-semibold">فيديو تعريفي 1:30 د</span>
                      <span className="flex-1 py-1.5 px-2 bg-neutral-100 text-neutral-700 rounded text-center font-semibold">شهادة تدريس موثقة</span>
                    </div>
                  </div>
                )}

                {/* Step 3 Preview: Calendar Slot Selection Mockup */}
                {activeStep === 3 && (
                  <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
                      <span>الأوقات المتاحة لهذا الأسبوع</span>
                      <span className="text-emerald-700 text-[11px]">تحديث مباشر</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
                        <div className="text-[11px] text-neutral-500">اليوم</div>
                        <div className="font-bold text-neutral-800 mt-0.5">5:00 م</div>
                      </div>
                      <div className="p-2.5 bg-emerald-600 text-white rounded-lg font-bold shadow-xs">
                        <div className="text-[11px] text-emerald-100">غداً</div>
                        <div className="mt-0.5">6:30 م</div>
                      </div>
                      <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
                        <div className="text-[11px] text-neutral-500">الأربعاء</div>
                        <div className="font-bold text-neutral-800 mt-0.5">4:00 م</div>
                      </div>
                    </div>
                    <p className="text-[11px] text-neutral-500 text-center">
                      تم اختيار: غداً الثلاثاء الساعة 6:30 مساءً (مدة الحصة: 60 دقيقة)
                    </p>
                  </div>
                )}

                {/* Step 4 Preview: Booking Confirmed & Classroom Link */}
                {activeStep === 4 && (
                  <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm space-y-3">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-xs font-bold">تم تأكيد الحجز بنجاح!</span>
                    </div>
                    <div className="p-3 bg-neutral-50 rounded-lg text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">المدرس:</span>
                        <span className="font-semibold text-neutral-800">أ. د. سارة القحطاني</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">الموعد:</span>
                        <span className="font-semibold text-neutral-800">غداً الساعة 6:30 م</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">طريقة الحضور:</span>
                        <span className="font-semibold text-emerald-700">قاعة مَسار الافتراضية التفاعلية</span>
                      </div>
                    </div>
                    <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-500">
                      <span>إشعار واتساب وإيميل تم إرساله</span>
                      <span className="text-emerald-700 font-bold">رقم الحجز: #MSR-9842</span>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
