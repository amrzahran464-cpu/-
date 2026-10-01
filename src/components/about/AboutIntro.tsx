import React from 'react';
import Image from 'next/image';
import { CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { aboutIntroData } from '@/data/about';

export function AboutIntro() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-neutral-200/80">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center text-right">
          
          {/* Right Column: Text Information (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start order-2 lg:order-1 text-right">
            <Badge variant="emerald" className="mb-4">
              {aboutIntroData.badge}
            </Badge>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight leading-snug mb-5 text-balance">
              {aboutIntroData.title}
            </h2>

            <p className="text-base text-neutral-600 leading-relaxed mb-6 font-normal">
              {aboutIntroData.description}
            </p>

            {/* Bullet points */}
            <div className="space-y-3.5 w-full">
              {aboutIntroData.points.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-neutral-50/80 border border-neutral-100"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center gap-6 text-xs text-neutral-500">
              <span className="flex items-center gap-1.5 font-semibold text-neutral-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>منصة سعودية مرخصة</span>
              </span>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <span className="flex items-center gap-1.5 font-semibold text-neutral-700">
                <HeartHandshake className="w-4 h-4 text-emerald-600" />
                <span>ضمان الرضا عن الحصة الأولى</span>
              </span>
            </div>
          </div>

          {/* Left Column: Visual Image (5 cols) */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden border border-neutral-200/90 shadow-xl aspect-[4/3] bg-neutral-100">
              <Image
                src={aboutIntroData.imagePath}
                alt="ولي الأمر والطالب يحتفلان بالنجاح الدراسي عبر منصة مَسار"
                fill
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
              />
              <div className="absolute bottom-4 right-4 left-4 text-white">
                <span className="text-[11px] font-bold text-emerald-300">شراكة نجاح وثقة</span>
                <p className="text-xs sm:text-sm font-bold mt-0.5">
                  راحة بال أولياء الأمور وتفوق مستحق لأبنائنا الطلاب
                </p>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
