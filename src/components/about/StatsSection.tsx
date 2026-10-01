import React from 'react';
import { Users, GraduationCap, TrendingUp, Star, Award } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { aboutStats } from '@/data/about';

const statIcons: Record<string, React.ElementType> = {
  teachers: GraduationCap,
  students: Users,
  lessons: TrendingUp,
  satisfaction: Star,
};

export function StatsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-neutral-200/80">
      <Container>
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="emerald" className="mb-3">
            أرقام وإنجازات
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">
            أرقام تترجم ثقة الطلاب والأسر
          </h2>
          <p className="text-base text-neutral-600 font-medium">
            نمو متواصل يعكس التزامنا بتقديم تجربة تعليمية متميزة
          </p>
        </div>

        {/* 4 Stats Cards Grid with tabular figures */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-right">
          {aboutStats.map((stat) => {
            const IconComponent = statIcons[stat.id] || Award;
            return (
              <Card
                key={stat.id}
                hoverEffect
                className="p-7 bg-neutral-50/70 border-neutral-200/90 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-white border border-neutral-200 text-emerald-700 flex items-center justify-center shadow-xs">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400">إحصائية موثقة</span>
                  </div>

                  {/* Value from data/about.ts */}
                  <div className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight font-mono tabular-nums mb-2">
                    {stat.value}
                  </div>

                  <h3 className="text-base font-bold text-neutral-800 mb-1">
                    {stat.label}
                  </h3>
                </div>

                <p className="mt-4 pt-3 border-t border-neutral-200/70 text-xs text-neutral-500 leading-relaxed font-normal">
                  {stat.description}
                </p>
              </Card>
            );
          })}
        </div>

      </Container>
    </section>
  );
}
