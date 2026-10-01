import React from 'react';
import { Search, SlidersHorizontal, CalendarCheck, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { howItWorks } from '@/data/about';

const stepIcons = [Search, SlidersHorizontal, CalendarCheck, GraduationCap];

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 bg-neutral-50/70 border-b border-neutral-200/80">
      <Container>
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="emerald" className="mb-3">
            رحلة التعلم
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">
            كيف تعمل المنصة؟
          </h2>
          <p className="text-base text-neutral-600 font-medium">
            4 خطوات سريعة تفصلك عن بدء حصتك التعليمية الأولى
          </p>
        </div>

        {/* 4 Steps Timeline */}
        <div className="relative">
          
          {/* Desktop timeline connector bar */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-neutral-200 -translate-y-8 -z-0"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-right relative z-10">
            {howItWorks.map((step, idx) => {
              const StepIcon = stepIcons[idx] || Search;
              return (
                <Card
                  key={step.step}
                  hoverEffect
                  className="p-6 bg-white flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                        <StepIcon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xl font-black text-neutral-300">
                        {step.step}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-emerald-700 mb-1">
                      {step.action}
                    </div>

                    <h3 className="text-lg font-bold text-neutral-900 mb-2">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500 font-medium">
                    <span>المرحلة {step.step}</span>
                    <span className="font-bold text-emerald-700">{step.badge}</span>
                  </div>
                </Card>
              );
            })}
          </div>

        </div>

      </Container>
    </section>
  );
}
