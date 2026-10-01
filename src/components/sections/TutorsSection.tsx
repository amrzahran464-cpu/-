import React, { useState } from 'react';
import { UserCheck, BookOpen, Coins, Calendar, BellRing, Users, BadgeDollarSign, ArrowLeft, Calculator, Sparkles, CheckCircle2 } from 'lucide-react';
import { PlatformContent, TeacherPerk } from '../../types/content';

interface TutorsSectionProps {
  content: PlatformContent['tutors'];
  onJoinTutorClick: () => void;
}

export const TutorsSection: React.FC<TutorsSectionProps> = ({
  content,
  onJoinTutorClick,
}) => {
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(content.calculatorDefaults.defaultHoursPerWeek);
  const [hourlyRate, setHourlyRate] = useState<number>(content.calculatorDefaults.defaultHourlyRate);
  const [imgError, setImgError] = useState(false);

  const iconMap: Record<string, React.ElementType> = {
    UserCheck,
    BookOpen,
    Coins,
    Calendar,
    BellRing,
    Users,
    BadgeDollarSign,
  };

  // Estimated monthly earnings: hours * rate * 4.2 weeks
  const estimatedMonthly = Math.round(hoursPerWeek * hourlyRate * 4.2);

  return (
    <section id="tutors" className="py-20 lg:py-28 bg-neutral-900 text-white relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3.5 py-1.5 rounded-full mb-3 border border-emerald-800">
            {content.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            {content.title}
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
            {content.description}
          </p>
        </div>

        {/* 7 Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-16">
          {content.perks.map((perk, idx) => {
            const PerkIcon = iconMap[perk.icon] || UserCheck;
            return (
              <div
                key={perk.id}
                className="bg-neutral-800/80 rounded-2xl p-6 border border-neutral-700 hover:border-emerald-500 hover:bg-neutral-800 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
                    <PerkIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {perk.title}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {perk.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-700/60 text-[11px] font-mono text-neutral-400">
                  ميزة 0{idx + 1}
                </div>
              </div>
            );
          })}

          {/* 8th Slot: Join Card Trigger */}
          <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-2xl p-6 border border-emerald-600 flex flex-col justify-between text-right">
            <div>
              <div className="w-11 h-11 rounded-xl bg-white/20 text-white flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">ابدأ خلال أقل من 10 دقائق</h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                أنشئ ملفك الآن، ارفع شهاداتك، وابدأ في استقبال حجوزات الطلاب المؤكدة فور اعتماد حسابك.
              </p>
            </div>
            <button
              onClick={onJoinTutorClick}
              className="mt-6 w-full py-3 bg-white text-emerald-900 hover:bg-neutral-100 font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{content.ctaText}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Calculator & Teacher Visual Showcase */}
        <div className="bg-neutral-800/90 rounded-3xl p-6 sm:p-10 border border-neutral-700 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Visual Portrait */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-900 border border-neutral-700 shadow-lg">
                {!imgError ? (
                  <img
                    src={content.imagePath}
                    alt="معلم متميز يدير حصة خصوصية ناجحة"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-neutral-400">
                    <UserCheck className="w-12 h-12 mb-2 text-emerald-400" />
                    <p className="font-bold text-sm text-white">معلمو مَسار المعتمدون</p>
                    <p className="text-xs">بيئة تدريس مستقلة ومرنة</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 right-4 left-4 text-white">
                  <span className="text-[11px] font-bold text-emerald-400">تحكم كامل بحصصك</span>
                  <p className="text-xs font-semibold text-neutral-200 mt-0.5">أنت من يحدد مواعيدك وسعر حصتك</p>
                </div>
              </div>
            </div>

            {/* Interactive Earnings Calculator */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <div className="flex items-center gap-2 text-emerald-400">
                <Calculator className="w-5 h-5" />
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  احسب دخلك الشهري المتوقع كمدرس
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300">
                حرك المؤشرات أدناه لتخمين العائد المالي المتوقع بحسب عدد الساعات وسعر الحصة الذي تفضله:
              </p>

              {/* Sliders */}
              <div className="space-y-5 bg-neutral-900/80 p-5 rounded-2xl border border-neutral-700/80">
                {/* Hours Slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-neutral-300">ساعات التدريس أسبوعياً:</span>
                    <span className="text-emerald-400 font-mono text-sm">{hoursPerWeek} ساعة/أسبوع</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="40"
                    step="1"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-2 bg-neutral-700 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                    <span>3 ساعات (دوام جزئي خفيف)</span>
                    <span>40 ساعة (تفرغ كامل)</span>
                  </div>
                </div>

                {/* Hourly Rate Slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-neutral-300">سعر الحصة المقترح:</span>
                    <span className="text-emerald-400 font-mono text-sm">{hourlyRate} {content.calculatorDefaults.currency} / ساعة</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="300"
                    step="5"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-2 bg-neutral-700 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                    <span>50 ريال</span>
                    <span>300 ريال</span>
                  </div>
                </div>
              </div>

              {/* Calculator Output Card */}
              <div className="p-4 bg-emerald-950/60 border border-emerald-700/60 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-neutral-300 font-medium">الدخل الشهري التقديري:</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-mono tabular-nums">
                    {estimatedMonthly.toLocaleString('ar-SA')} {content.calculatorDefaults.currency}
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-0.5">* تقدير تقريبي محسوب على 4.2 أسابيع بالشهر بدون التزام قانوني</p>
                </div>

                <button
                  onClick={onJoinTutorClick}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-extrabold text-xs rounded-xl transition-all shadow-md whitespace-nowrap cursor-pointer"
                >
                  انضم وابدأ التدريس
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
