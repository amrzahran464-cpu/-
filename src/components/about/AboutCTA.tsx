import React from 'react';
import { ArrowLeft, Search, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { aboutCtaData } from '@/data/about';

interface AboutCTAProps {
  onExploreClick?: () => void;
  onJoinTeacherClick?: () => void;
}

export function AboutCTA({ onExploreClick, onJoinTeacherClick }: AboutCTAProps) {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-emerald-50/50 relative overflow-hidden">
      <Container size="narrow">
        <div className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-neutral-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden text-center">
          
          {/* Ambient Lighting */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/4 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"
          />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold mb-6 border border-white/10 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>خطوتك الأولى نحو التميز الدراسي</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
            {aboutCtaData.title}
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-xl mx-auto mb-10 leading-relaxed font-normal">
            {aboutCtaData.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="default"
              size="lg"
              onClick={onExploreClick}
              className="w-full sm:w-auto bg-white text-emerald-950 hover:bg-neutral-100 hover:text-emerald-950 font-extrabold shadow-lg"
            >
              <Search className="w-4 h-4 text-emerald-700" />
              <span>{aboutCtaData.primaryCtaText}</span>
              <ArrowLeft className="w-4 h-4 text-emerald-700" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={onJoinTeacherClick}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md"
            >
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span>{aboutCtaData.secondaryCtaText}</span>
            </Button>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-emerald-200 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ضمان الرضا عن الحصة الأولى</span>
            </div>
            <span>·</span>
            <div>إلغاء واسترجاع مرن</div>
            <span>·</span>
            <div>دعم متواصل على مدار الساعة</div>
          </div>

        </div>
      </Container>
    </section>
  );
}
