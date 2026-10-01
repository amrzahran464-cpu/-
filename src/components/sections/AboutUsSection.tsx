import React, { useState } from 'react';
import { Users, GraduationCap, HeartHandshake, BookOpen, CheckCircle, ArrowRight, ShieldCheck, Search, Calendar, CreditCard } from 'lucide-react';
import { PlatformContent } from '../../types/content';

interface AboutUsSectionProps {
  content: PlatformContent['about'];
  onStartSearch: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  content,
  onStartSearch,
}) => {
  const [activeTab, setActiveTab] = useState<'students' | 'parents' | 'tutors'>('students');

  const tabsConfig = [
    {
      id: 'students' as const,
      label: 'للطلاب',
      title: content.pillars.students.title,
      desc: content.pillars.students.description,
      points: content.pillars.students.points,
      icon: GraduationCap,
      badge: 'فهم أعمق وتفوق مستمر',
      accentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      id: 'parents' as const,
      label: 'لأولياء الأمور',
      title: content.pillars.parents.title,
      desc: content.pillars.parents.description,
      points: content.pillars.parents.points,
      icon: HeartHandshake,
      badge: 'راحة بال ومتابعة دقيقة',
      accentColor: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      id: 'tutors' as const,
      label: 'للمدرسين الخصوصيين',
      title: content.pillars.tutors.title,
      desc: content.pillars.tutors.description,
      points: content.pillars.tutors.points,
      icon: BookOpen,
      badge: 'استقلالية ونمو مهني',
      accentColor: 'text-amber-800 bg-amber-50 border-amber-200',
    },
  ];

  const currentTab = tabsConfig.find((t) => t.id === activeTab)!;

  const stepsIcons = [Search, BookOpen, Calendar, CreditCard, CheckCircle];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full mb-3 border border-emerald-200">
            قصتنا ورسالتنا
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">
            {content.title}
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-medium">
            {content.subtitle}
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          <div className="lg:col-span-7 space-y-5 text-neutral-700 leading-relaxed text-base">
            <p className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200/80 text-neutral-800 font-medium">
              {content.summaryParagraph}
            </p>
            <p className="text-neutral-600">
              {content.secondaryParagraph}
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-neutral-600">
              <span className="flex items-center gap-1.5 py-1 px-2.5 bg-neutral-100 rounded-md">
                ✓ منظومة تقنية متكاملة
              </span>
              <span className="flex items-center gap-1.5 py-1 px-2.5 bg-neutral-100 rounded-md">
                ✓ توثيق هويات وشهادات
              </span>
              <span className="flex items-center gap-1.5 py-1 px-2.5 bg-neutral-100 rounded-md">
                ✓ دفع مؤمّن بالكامل
              </span>
            </div>
          </div>

          {/* 3 Core Beneficiaries Card */}
          <div className="lg:col-span-5 bg-neutral-900 text-white p-7 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
            <h3 className="text-lg font-bold text-white mb-2">ثلاثية نجاح العملية التعليمية</h3>
            <p className="text-xs text-neutral-400 mb-6">
              تربط منصة مَسار أطراف المعادلة التعليمية الثلاثة في بيئة رقمية عادلة ومحفزة:
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-800/80 border border-neutral-700">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">الطلاب</h4>
                  <p className="text-xs text-neutral-300">اختيار المدرس الأنسب لكل مادة، والتعلم بوتيرة تلائم قدراتهم.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-800/80 border border-neutral-700">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">أولياء الأمور</h4>
                  <p className="text-xs text-neutral-300">مدرسون موثوقون، أسعار شفافة، ومتابعة فورية للحضور والنتائج.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-800/80 border border-neutral-700">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">المدرسون الخصوصيون</h4>
                  <p className="text-xs text-neutral-300">استقلالية في تحديد الأسعار والجدول، وتوسع مستمر في قاعدة الطلاب.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Experience Journey (5 Stages) */}
        <div className="bg-neutral-50 rounded-3xl p-6 sm:p-10 border border-neutral-200/90 mb-16">
          <div className="text-right mb-8">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              تجربة مستخدم متكاملة وسلسة
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
              كيف تكتمل تجربة التعلم عبر مَسار؟
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              صممنا مساراً رقمياً يريحك من عناء الاتصالات الطويلة والتردد:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {content.journeyStages.map((stage, idx) => {
              const StepIcon = stepsIcons[idx] || CheckCircle;
              return (
                <div
                  key={stage.order}
                  className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-7 h-7 rounded-lg bg-neutral-100 text-neutral-700 font-mono text-xs font-bold flex items-center justify-center">
                        {stage.order}
                      </span>
                      <StepIcon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <h4 className="text-sm font-bold text-neutral-900 mb-2">
                      {stage.title}
                    </h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] font-medium text-emerald-700 flex items-center gap-1">
                    <span>ميزة المنصة</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Tabs for the 3 Audiences */}
        <div className="max-w-4xl mx-auto">
          {/* Tabs Selector */}
          <div className="flex items-center justify-center p-1.5 bg-neutral-100 rounded-2xl mb-8 max-w-md mx-auto">
            {tabsConfig.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/90 shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${currentTab.accentColor}`}>
                  <currentTab.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">{currentTab.title}</h3>
                  <p className="text-xs text-neutral-500 mt-0.5">{currentTab.badge}</p>
                </div>
              </div>

              <button
                onClick={onStartSearch}
                className="px-4 py-2 text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
              >
                اكتشف الخدمات
              </button>
            </div>

            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-6 font-medium">
              {currentTab.desc}
            </p>

            <div className="space-y-3">
              {currentTab.points.map((point, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50/70 border border-neutral-100">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="text-xs sm:text-sm text-neutral-700 leading-normal font-normal">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
