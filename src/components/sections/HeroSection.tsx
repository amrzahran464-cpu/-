import React, { useState } from 'react';
import { Search, MapPin, Video, Sparkles, CheckCircle2, ArrowLeft, Users, ShieldCheck } from 'lucide-react';
import { PlatformContent } from '../../types/content';

interface HeroSectionProps {
  content: PlatformContent['hero'];
  onStartNow: () => void;
  onExploreTutors: (filters?: { subject?: string; stage?: string; type?: string }) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  content,
  onStartNow,
  onExploreTutors,
}) => {
  const [selectedSubject, setSelectedSubject] = useState('الكل');
  const [selectedStage, setSelectedStage] = useState('الكل');
  const [deliveryType, setDeliveryType] = useState<'all' | 'online' | 'in_person'>('all');
  const [imgError, setImgError] = useState(false);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onExploreTutors({
      subject: selectedSubject !== 'الكل' ? selectedSubject : undefined,
      stage: selectedStage !== 'الكل' ? selectedStage : undefined,
      type: deliveryType,
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-neutral-50 pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Decorative ambient background blur */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute top-1/3 left-10 -z-10 w-80 h-80 bg-teal-100/50 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text and Actions Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-right">
            
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold mb-6 border border-emerald-200/60 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{content.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.25] text-balance mb-6">
              {content.title}{' '}
              <span className="text-emerald-700 underline decoration-emerald-300 underline-offset-8">
                {content.titleHighlight}
              </span>
            </h1>

            {/* Explanatory Lead */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-8 max-w-2xl">
              {content.description}
            </p>

            {/* Primary & Secondary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={onStartNow}
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{content.primaryCta}</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </button>

              <button
                onClick={() => onExploreTutors()}
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-neutral-100/80 text-neutral-800 border border-neutral-300 font-semibold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4 text-neutral-500" />
                <span>{content.secondaryCta}</span>
              </button>
            </div>

            {/* Quick Interactive Search Bar */}
            <div className="w-full max-w-2xl bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/90 shadow-md">
              <div className="text-xs font-semibold text-neutral-500 mb-3 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-emerald-600" />
                <span>بحث سريع عن مدرس معتمد</span>
              </div>

              <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                {/* Subject selector */}
                <div>
                  <label className="block text-[11px] font-medium text-neutral-500 mb-1">المادة</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2 px-2.5 text-xs text-neutral-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  >
                    <option value="الكل">كافة المواد</option>
                    <option value="رياضيات">رياضيات</option>
                    <option value="فيزياء">فيزياء</option>
                    <option value="لغة إنجليزية">لغة إنجليزية</option>
                    <option value="كيمياء">كيمياء</option>
                    <option value="أحياء وعلوم">أحياء وعلوم</option>
                    <option value="لغة عربية">لغة عربية</option>
                  </select>
                </div>

                {/* Stage selector */}
                <div>
                  <label className="block text-[11px] font-medium text-neutral-500 mb-1">المرحلة</label>
                  <select
                    value={selectedStage}
                    onChange={(e) => setSelectedStage(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2 px-2.5 text-xs text-neutral-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  >
                    <option value="الكل">كافة المراحل</option>
                    <option value="ابتدائي">ابتدائي</option>
                    <option value="متوسط">متوسط</option>
                    <option value="ثانوي">ثانوي</option>
                    <option value="جامعي">جامعي</option>
                  </select>
                </div>

                {/* Delivery Type */}
                <div>
                  <label className="block text-[11px] font-medium text-neutral-500 mb-1">نوع الدرس</label>
                  <select
                    value={deliveryType}
                    onChange={(e) => setDeliveryType(e.target.value as any)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2 px-2.5 text-xs text-neutral-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  >
                    <option value="all">أونلاين وحضوري</option>
                    <option value="online">أونلاين فقط</option>
                    <option value="in_person">حضوري فقط</option>
                  </select>
                </div>

                {/* Submit button */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>بحث</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Trust points underneath */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-xs text-neutral-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>مدرسون موثوقون ومدققون</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>خيارات أونلاين وحضوري</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>ضمان استرجاع وإلغاء مرن</span>
              </div>
            </div>

          </div>

          {/* Visual Showcase Column (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Image container */}
              <div className="relative rounded-3xl overflow-hidden border border-neutral-200/80 shadow-2xl bg-neutral-100 aspect-[4/3] sm:aspect-[16/11]">
                {!imgError ? (
                  <img
                    src={content.imagePath}
                    alt="تعليم خصوصي وتوجيه أكاديمي متميز"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-tr from-emerald-100 to-teal-50 text-emerald-800 text-center">
                    <Sparkles className="w-12 h-12 mb-3 text-emerald-600" />
                    <p className="font-bold text-base">منصة مَسار للتعليم الخصوصي</p>
                    <p className="text-xs text-neutral-600 mt-1">الربط الذكي بين الطلاب والمدرسين</p>
                  </div>
                )}

                {/* Subtle scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Image caption card on bottom */}
                <div className="absolute bottom-4 right-4 left-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-emerald-300">جلسات فردية مركزة</p>
                      <p className="text-sm font-bold">حضوري في بيتك أو أونلاين عبر الفصل التفاعلي</p>
                    </div>
                    <div className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[11px] font-medium border border-white/30">
                      متاح الآن
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating verified tutor preview badge */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-3.5 rounded-2xl border border-neutral-200/90 shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom duration-500">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-neutral-900">أكثر من +1,850 مدرس معتمد</div>
                  <div className="text-[11px] text-neutral-500">فحص أمني وأكاديمي شامل</div>
                </div>
              </div>

              {/* Floating review card top-left */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-neutral-200/80 shadow-lg hidden sm:flex items-center gap-2">
                <span className="text-amber-500 text-sm font-black">★ 4.96</span>
                <span className="text-xs font-medium text-neutral-700">متوسط تقييم الحصص</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
