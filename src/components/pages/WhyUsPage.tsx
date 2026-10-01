'use client';

import React from 'react';
import {
  ShieldCheck,
  FileText,
  Star,
  CalendarCheck,
  Clock,
  Users,
  Coins,
  Headphones,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { usePlatform } from '@/context/PlatformContext';

export const WhyUsPage: React.FC = () => {
  const { navigate } = usePlatform();

  const advantages = [
    {
      icon: ShieldCheck,
      title: 'مدرسون موثوقون ومعتمدون',
      desc: 'تدقيق أمني وأكاديمي صارم للهويات، الشهادات الجامعية، وسجلات الخبرة لضمان أقصى درجات الثقة والأمان لأبنائك.',
      badge: 'فحص بنسبة 100%',
    },
    {
      icon: FileText,
      title: 'ملفات تعريفية وفيديوهات واضحة',
      desc: 'سيرة ذاتية مفصلة وفيديو تعريفي لكل معلم يوضح طريقة شرحه على السبورة ونبرة صوته قبل أن تتخذ قرار الحجز.',
      badge: 'شفافية تامة',
    },
    {
      icon: Star,
      title: 'تقييمات حقيقية من الطلاب والأسر',
      desc: 'مراجعات وتقييمات موثقة لا يمكن كتابتها إلا من قبل طلاب أكملوا حصصاً فعلية عبر المنصة بدون أي تزييف.',
      badge: 'مراجعات موثقة',
    },
    {
      icon: CalendarCheck,
      title: 'حجز إلكتروني فوري وسهل',
      desc: 'تصفح التقويم المباشر للمدرس واحجز حصتك بـ 3 نقرات فقط ودون الحاجة لمكالمات وتنسيقات هاتفية مطولة.',
      badge: 'تأكيد مباشر',
    },
    {
      icon: Coins,
      title: 'أسعار واضحة وبدون عمولات خفية',
      desc: 'سعر الحصة معلن ومحدد بالساعة بشكل عادل، دون أي رسوم اشتراك شهرية أو عمولات مفاجئة عند الدفع.',
      badge: 'سعر ثابت ومعلن',
    },
    {
      icon: Headphones,
      title: 'دعم تعليمي وإرشادي على مدار الساعة',
      desc: 'فريق استشاري متخصص يتابع تجربة الحصص أولاً بأول وجاهز لمساعدتك في استبدال المدرس أو حل أي استفسار.',
      badge: 'خدمة عملاء 24/7',
    },
    {
      icon: Users,
      title: 'دروس أونلاين وحضورية معاً',
      desc: 'حرية الاختيار بين قاعاتنا الافتراضية الذكية المزودة بسبورة تفاعلية، أو طلب زيارة المعلم لحصة منزلية وجهاً لوجه.',
      badge: 'مرونة المسارين',
    },
    {
      icon: Clock,
      title: 'نظام متابعة وتقارير إنجاز مستمرة',
      desc: 'لوحة تحكم منظمة تتيح لولي الأمر معرفة عدد الساعات المنجزة، الحصص القادمة، ومستوى تقدم الطالب الأكاديمي.',
      badge: 'لوحة متابعة ذكية',
    },
  ];

  return (
    <div className="py-14 bg-neutral-50/60 min-h-screen text-right">
      <Container size="wide">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="emerald" className="mb-3">
            معايير الجودة والتميز
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight mb-4">
            لماذا يختار آلاف الطلاب والأسر منصة مَسار؟
          </h1>
          <p className="text-base text-neutral-600 leading-relaxed font-normal">
            بنينا المنصة لحل المشاكل الشائعة في التعليم الخصوصي التقليدي: غياب التوثيق، تفاوت الأسعار، وإهدار الوقت.
          </p>
        </div>

        {/* 8 Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {advantages.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-neutral-200/90 hover:border-emerald-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-400">0{idx + 1}</span>
                </div>

                <h3 className="text-base font-bold text-neutral-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-bold text-emerald-700">
                <span>{item.badge}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Callout */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200 shadow-sm max-w-4xl mx-auto mb-16">
          <h3 className="text-xl font-black text-neutral-900 text-center mb-8">
            مقارنة بين منصة مَسار والبحث العشوائي عن المدرسين
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>عبر منصة مَسار</span>
                </div>
                <ul className="space-y-1.5 text-neutral-700 text-xs">
                  <li>• شهادات وهويات مفحوصة وموثقة 100%</li>
                  <li>• تقييمات موثقة من طلاب حقيقيين أنهوا حصصاً</li>
                  <li>• ضمان استرجاع الرصيد عند عدم الرضا عن أول حصة</li>
                  <li>• جدول مباشر بدون مكالمات تنسيق محرجة</li>
                </ul>
              </div>

              <div className="p-4 bg-neutral-100/70 border border-neutral-200 rounded-2xl space-y-2">
                <div className="font-bold text-neutral-700 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-neutral-300 text-neutral-600 flex items-center justify-center text-[10px]">✕</span>
                  <span>البحث التقليدي العشوائي</span>
                </div>
                <ul className="space-y-1.5 text-neutral-500 text-xs">
                  <li>• أرقام هواتف غير مؤكدة بدون أي تحقق أكاديمي</li>
                  <li>• آراء غير موثوقة في المنتديات والجروبات</li>
                  <li>• دفع مسبق بدون أي ضمان لاسترجاع الأموال</li>
                  <li>• صعوبة التنسيق وتكرار الاعتذار في المواعيد</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            variant="emerald"
            size="lg"
            onClick={() => navigate('/tutors')}
            className="font-bold shadow-md hover:shadow-lg gap-2"
          >
            <span>ابدأ الآن - استعرض المدرسين المعتمدين</span>
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>

      </Container>
    </div>
  );
};
