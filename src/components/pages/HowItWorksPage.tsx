'use client';

import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  CalendarCheck,
  CreditCard,
  Video,
  Star,
  UserCheck,
  BookOpen,
  Coins,
  Calendar,
  BellRing,
  Award,
  BadgeDollarSign,
  ArrowLeft,
  GraduationCap,
  Users,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { usePlatform } from '@/context/PlatformContext';

export const HowItWorksPage: React.FC = () => {
  const { navigate } = usePlatform();
  const [activeRole, setActiveRole] = useState<'student' | 'teacher'>('student');

  const studentSteps = [
    { num: '01', title: 'ابحث عن المدرس', desc: 'حدد المادة، النظام الدراسي، المرحلة، والمدينة في محرك البحث المتقدم.', icon: Search },
    { num: '02', title: 'قارن بين المدرسين', desc: 'شاهد الفيديوهات التعريفية واقرأ تقييمات الطلاب وتأكد من الخبرات والأسعار.', icon: SlidersHorizontal },
    { num: '03', title: 'اختر الموعد الأنسب', desc: 'تصفح التقويم المباشر للمدرس واختر اليوم والوقت الملائمين لجدولك.', icon: CalendarCheck },
    { num: '04', title: 'احجز الحصة', desc: 'حدد مدة الحصة (60 أو 90 أو 120 دقيقة) وحدد إذا كنت ترغب بها أونلاين أو حضورياً.', icon: CalendarCheck },
    { num: '05', title: 'ادفع بأمان', desc: 'أتمم الدفع عبر مدى أو Apple Pay مع حفظ أموالك في حساب ضمان حتى انتهاء الحصة.', icon: CreditCard },
    { num: '06', title: 'ابدأ الدرس بتفوق', desc: 'التقِ بمدرسك عبر قاعة مَسار الذكية أو في منزلك في الموعد المحدد بنقرة واحدة.', icon: Video },
    { num: '07', title: 'قيّم المدرس', desc: 'شارك رأيك وتقييمك للحصة لمساعدة الطلاب الآخرين ودعم جودة المنصة.', icon: Star },
  ];

  const teacherSteps = [
    { num: '01', title: 'سجل حسابك مجاناً', desc: 'أنشئ حسابك الجديد كمعلم واملأ بيانات الاتصال ومقر إقامتك.', icon: UserCheck },
    { num: '02', title: 'أنشئ ملفك الاحترافي', desc: 'ارفع صورتك وسيرتك الذاتية وفيديو تعريفي قصير يشرح أسلوبك على السبورة.', icon: Award },
    { num: '03', title: 'أضف تخصصاتك ومناهجك', desc: 'حدد المواد والمراحل والأنظمة الدراسية (وزاري، IGCSE، SAT، وغيرها) التي تبدع فيها.', icon: BookOpen },
    { num: '04', title: 'حدد أسعارك بحرية', desc: 'أنت صاحب القرار في تحديد سعر الحصة بالساعة بما يتناسب مع قيمتك وخبرتك.', icon: Coins },
    { num: '05', title: 'حدد مواعيدك المتاحة', desc: 'نظّم جدولك الأسبوعي وحدد ساعات فراغك مع منع أي تعارض تلقائياً.', icon: Calendar },
    { num: '06', title: 'استقبل الحجوزات المؤكدة', desc: 'تلقَّ إشعارات فورية بكل حجز مؤكد ومسدد من الطلاب.', icon: BellRing },
    { num: '07', title: 'درّس بفاعلية', desc: 'قدّم حصصك عبر فصلنا التفاعلي الذكي أو بالحضور المنزلي المباشر.', icon: Video },
    { num: '08', title: 'استلم مستحقاتك المالية', desc: 'اسحب أرباحك دورياً وبشكل مباشر إلى حسابك البنكي المحلي دون تأخير.', icon: BadgeDollarSign },
  ];

  return (
    <div className="py-14 bg-neutral-50/60 min-h-screen text-right">
      <Container size="wide">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="emerald" className="mb-3">
            دليل الاستخدام السريع
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight mb-3">
            كيف تعمل منصة مَسار؟
          </h1>
          <p className="text-base text-neutral-600 font-normal">
            خطوات واضحة ومبسطة ترشد كلاً من الطالب والمعلم نحو تجربة دراسية سلسة
          </p>

          {/* Toggle Role Selector */}
          <div className="flex items-center justify-center p-1.5 bg-neutral-200/80 rounded-2xl max-w-xs mx-auto mt-6">
            <button
              onClick={() => setActiveRole('student')}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeRole === 'student' ? 'bg-white text-emerald-900 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              رحلة الطالب (7 خطوات)
            </button>
            <button
              onClick={() => setActiveRole('teacher')}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeRole === 'teacher' ? 'bg-white text-emerald-900 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              رحلة المعلم (8 خطوات)
            </button>
          </div>
        </div>

        {/* Steps List */}
        <div className="max-w-4xl mx-auto space-y-4 mb-16">
          {activeRole === 'student'
            ? studentSteps.map((step) => (
                <div
                  key={step.num}
                  className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs flex items-start gap-5 hover:border-emerald-300 transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0 border border-emerald-100">
                    <step.icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-emerald-700">خطوة {step.num}</span>
                      <h3 className="text-base font-bold text-neutral-900">{step.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))
            : teacherSteps.map((step) => (
                <div
                  key={step.num}
                  className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs flex items-start gap-5 hover:border-emerald-300 transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0 border border-emerald-100">
                    <step.icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-emerald-700">خطوة {step.num}</span>
                      <h3 className="text-base font-bold text-neutral-900">{step.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            variant="emerald"
            size="lg"
            onClick={() => navigate(activeRole === 'student' ? '/tutors' : '/request-tutor')}
            className="font-bold gap-2 shadow-md"
          >
            <span>{activeRole === 'student' ? 'ابدأ البحث عن مدرس الآن' : 'انضم كمدرس في مَسار'}</span>
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>

      </Container>
    </div>
  );
};
