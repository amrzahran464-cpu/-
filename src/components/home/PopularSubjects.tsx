'use client';

import React from 'react';
import {
  Calculator,
  Languages,
  FlaskConical,
  BookOpen,
  GraduationCap,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { usePlatform } from '@/context/PlatformContext';

const iconMap: Record<string, React.ElementType> = {
  Languages,
  FlaskConical,
  Calculator,
  BookOpen,
  Sparkles,
  GraduationCap,
};

export const PopularSubjects: React.FC = () => {
  const { categories, setSearchFilters, navigate } = usePlatform();

  const handleSelectSubject = (subjectName: string) => {
    setSearchFilters((prev) => ({ ...prev, subject: subjectName }));
    navigate('/tutors');
  };

  return (
    <section className="py-20 bg-white border-b border-neutral-200/80">
      <Container size="wide">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 text-right">
          <div>
            <Badge variant="emerald" className="mb-2">
              تخصصات تعليمية شاملة
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              المواد الأكثر طلباً عبر مَسار
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              أكثر من 50 تخصصاً ومادة دراسية مغطاة بنخبة من أفضل المعلمين
            </p>
          </div>

          <button
            onClick={() => navigate('/tutors')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>استعراض كافة المواد (+50)</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-right">
          {categories.map((cat) => {
            const IconComp = iconMap[cat.icon] || BookOpen;
            return (
              <div
                key={cat.id}
                className="bg-neutral-50/70 rounded-3xl p-6 border border-neutral-200/80 hover:border-emerald-300 hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-neutral-400 font-mono">
                      {cat.subjects.reduce((sum, s) => sum + s.tutorsCount, 0)}+ معلماً
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  {/* Top 4 Sub-subjects pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-200/60">
                    {cat.subjects.slice(0, 4).map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleSelectSubject(sub.name)}
                        className="text-[11px] font-semibold text-neutral-700 bg-white hover:bg-emerald-600 hover:text-white px-2.5 py-1 rounded-lg border border-neutral-200/80 transition-colors cursor-pointer"
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSearchFilters((prev) => ({ ...prev, subject: cat.subjects[0]?.name }));
                      navigate('/tutors');
                    }}
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>عرض المدرسين</span>
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
};
