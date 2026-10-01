import React from 'react';
import Image from 'next/image';
import { UserCheck, BookOpen, Coins, Calendar, BellRing, Users, ArrowLeft, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { teacherBenefits } from '@/data/about';

const iconMap = {
  UserCheck,
  BookOpen,
  Coins,
  Calendar,
  BellRing,
  Users,
};

interface ForTeachersProps {
  onJoinClick?: () => void;
}

export function ForTeachers({ onJoinClick }: ForTeachersProps) {
  return (
    <section className="py-20 lg:py-28 bg-neutral-900 text-white relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <Container className="relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="emerald" className="bg-emerald-950 text-emerald-400 border-emerald-800 mb-3">
            شراكة تعليمية واعدة
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4">
            هل أنت مدرس؟ انضم إلى منصتنا
          </h2>
          <p className="text-base text-neutral-300 font-normal leading-relaxed">
            حوّل خبرتك الأكاديمية إلى عمل مستقل ناجح، وانضم إلى شبكة معلمين تحظى بثقة آلاف الأسر
          </p>
        </div>

        {/* 6 Teacher Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14 text-right">
          {teacherBenefits.map((perk, idx) => {
            const IconComponent = iconMap[perk.iconName] || UserCheck;
            return (
              <div
                key={perk.id}
                className="bg-neutral-800/80 rounded-3xl p-6 border border-neutral-700 hover:border-emerald-500 hover:bg-neutral-800 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {perk.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                    {perk.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-neutral-700/60 text-[11px] font-mono text-neutral-400">
                  ميزة 0{idx + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Callout & CTA Action Card */}
        <div className="bg-neutral-800 rounded-3xl p-6 sm:p-10 border border-neutral-700 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-right">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden relative shrink-0 border border-neutral-700 hidden sm:block">
              <Image
                src="/src/assets/images/tutor_teaching_session_1790850680204.jpg"
                alt="معلم متميز في منصة مَسار"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                ابدأ رحلتك التدريسية معنا خلال دقائق
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300">
                تسجيل مجاني، بدون رسوم اشتراك، وبدون التزامات مسبقة
              </p>
            </div>
          </div>

          <Button
            variant="emerald"
            size="lg"
            onClick={onJoinClick}
            className="w-full lg:w-auto shadow-md hover:shadow-lg gap-2"
          >
            <span>انضم كمدرس</span>
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>

      </Container>
    </section>
  );
}
