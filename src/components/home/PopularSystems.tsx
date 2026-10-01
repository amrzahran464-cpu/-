'use client';

import React from 'react';
import { BookOpen, GraduationCap, Award, Globe, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { usePlatform } from '@/context/PlatformContext';

export const PopularSystems: React.FC = () => {
  const { educationalSystems, setSearchFilters, navigate } = usePlatform();

  const handleSelectSystem = (systemName: string) => {
    setSearchFilters((prev) => ({ ...prev, system: systemName }));
    navigate('/tutors');
  };

  return (
    <section className="py-20 bg-neutral-50/70 border-b border-neutral-200/80">
      <Container size="wide">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="emerald" className="mb-2">
            تغطية شاملة لكافة المناهج
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mb-2">
            الأنظمة التعليمية المدعومة
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            مدرسون متخصصون بخبرات مؤكدة في متطلبات وسلالم تصحيح كل نظام دراسي
          </p>
        </div>

        {/* 6 Systems Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-right">
          {educationalSystems.map((sys) => (
            <div
              key={sys.id}
              onClick={() => handleSelectSystem(sys.name)}
              className="bg-white rounded-3xl p-6 border border-neutral-200/90 hover:border-emerald-400 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 font-black text-sm flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    {sys.name.charAt(0)}
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded-md">
                    {sys.country}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
                  {sys.name}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                  {sys.description}
                </p>

                {/* Stages list */}
                <div className="space-y-1.5 pt-2 border-t border-neutral-100 text-xs">
                  {sys.stages.slice(0, 3).map((stg) => (
                    <div key={stg.id} className="flex items-center gap-1.5 text-neutral-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{stg.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>تصفح معلمي {sys.name}</span>
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
};
