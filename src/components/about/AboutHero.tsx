'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, ShieldCheck, Star, Users } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { aboutHeroData } from '@/data/about';

interface AboutHeroProps {
  onExploreClick?: () => void;
  onJoinTeacherClick?: () => void;
}

export function AboutHero({ onExploreClick, onJoinTeacherClick }: AboutHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-neutral-50/40 pt-12 pb-16 lg:pt-20 lg:pb-28">
      {/* Decorative ambient gradients */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl opacity-50 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-teal-100/50 rounded-full blur-3xl opacity-40 pointer-events-none"
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center text-right">
          
          {/* Text and Actions (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-right"
          >
            {/* Badge */}
            <Badge variant="emerald" className="mb-6 py-1.5 px-3.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 ml-1" />
              <span>{aboutHeroData.badge}</span>
            </Badge>

            {/* H1 Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.25] text-balance mb-6">
              {aboutHeroData.title}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-8 max-w-2xl font-normal">
              {aboutHeroData.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <Button
                variant="emerald"
                size="lg"
                onClick={onExploreClick}
                className="w-full sm:w-auto shadow-md hover:shadow-lg"
              >
                <span>{aboutHeroData.primaryCtaText}</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onJoinTeacherClick}
                className="w-full sm:w-auto"
              >
                <span>{aboutHeroData.secondaryCtaText}</span>
              </Button>
            </div>

            {/* Trust Markers */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-neutral-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 ml-1" />
                <span>مدرسون معتمدون ومدققون</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-600 ml-1" />
                <span>دروس أونلاين وحضوري</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 ml-1" />
                <span>تقييمات موثقة 100%</span>
              </div>
            </div>

          </motion.div>

          {/* Hero Visual Column (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Image Container with single elevation & soft shadow */}
              <div className="relative rounded-3xl overflow-hidden border border-neutral-200/90 shadow-2xl bg-neutral-100 aspect-[4/3] sm:aspect-[16/11]">
                <Image
                  src={aboutHeroData.imagePath}
                  alt="جلسة تدريس خصوصي تفاعلية تجمع المعلم والطالب"
                  fill
                  priority
                  className="object-cover"
                />
                
                {/* Subtle scrim */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
                />

                {/* Caption overlay */}
                <div className="absolute bottom-4 right-4 left-4 text-white">
                  <p className="text-xs font-semibold text-emerald-300">تعليم موجه ومخصص</p>
                  <p className="text-sm font-bold mt-0.5">جلسات فردية تواكب استيعابك الدراسي</p>
                </div>
              </div>

              {/* Floating verified badge */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white p-3.5 rounded-2xl border border-neutral-200 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-neutral-900">+1,000 مدرس معتمد</div>
                  <div className="text-[11px] text-neutral-500">فحص أمني وأكاديمي</div>
                </div>
              </div>

              {/* Floating rating badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-2.5 px-3.5 rounded-xl border border-neutral-200/90 shadow-lg hidden sm:flex items-center gap-2">
                <span className="text-amber-500 text-xs font-black">★ 4.95</span>
                <span className="text-xs font-medium text-neutral-700">متوسط الرضا</span>
              </div>

            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
