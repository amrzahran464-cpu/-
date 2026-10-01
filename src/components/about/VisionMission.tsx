import React from 'react';
import { Compass, Target, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { visionMissionData } from '@/data/about';

export function VisionMission() {
  const vision = visionMissionData.find((item) => item.type === 'vision');
  const mission = visionMissionData.find((item) => item.type === 'mission');

  return (
    <section className="py-20 lg:py-28 bg-neutral-50/60 border-b border-neutral-200/80">
      <Container>
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="emerald" className="mb-3">
            المبادئ والاتجاه
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">
            رؤيتنا ورسالتنا
          </h2>
          <p className="text-base text-neutral-600 font-medium">
            قيم راسخة تقودنا نحو الارتقاء بتجربة التعليم الخصوصي في العالم العربي
          </p>
        </div>

        {/* 2 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
          
          {/* Vision Card */}
          {vision && (
            <Card className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white border-emerald-700/80 p-8 sm:p-10 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
              />

              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300 border border-white/10 mb-6">
                  <Compass className="w-6 h-6" />
                </div>

                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block mb-2">
                  نحو المستقبل
                </span>
                
                <h3 className="text-2xl font-extrabold text-white mb-6">
                  {vision.title}
                </h3>

                {vision.quote && (
                  <blockquote className="text-xl sm:text-2xl font-bold leading-snug text-emerald-100 mb-6 border-r-4 border-emerald-400 pr-4">
                    "{vision.quote}"
                  </blockquote>
                )}

                <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                  {vision.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-emerald-800/80 flex items-center justify-between text-xs text-emerald-300 font-medium">
                <span>سهولة · مرونة · شفافية</span>
                <span className="font-mono text-emerald-400">2026+</span>
              </div>
            </Card>
          )}

          {/* Mission Card */}
          {mission && (
            <Card className="bg-white border-neutral-200/90 p-8 sm:p-10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 border border-emerald-200 mb-6">
                  <Target className="w-6 h-6" />
                </div>

                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-2">
                  واجبنا اليومي
                </span>

                <h3 className="text-2xl font-extrabold text-neutral-900 mb-6">
                  {mission.title}
                </h3>

                <p className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-6 font-medium">
                  {mission.description}
                </p>

                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  نركز على المعايير الجوهرية: المادة، المرحلة، السعر العادل، والخبرة الموثقة لضمان أفضل مطابقة بين الطالب والمعلم.
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-medium">
                <span>معايير دقيقة · تقييمات حقيقية</span>
                <span className="font-bold text-emerald-700">100% موثق</span>
              </div>
            </Card>
          )}

        </div>

      </Container>
    </section>
  );
}
