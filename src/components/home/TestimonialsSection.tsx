'use client';

import React from 'react';
import { Star, ShieldCheck, Quote, ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { usePlatform } from '@/context/PlatformContext';

export const TestimonialsSection: React.FC = () => {
  const { reviews } = usePlatform();

  // Pick top 6 authentic reviews
  const topReviews = reviews.slice(0, 6);

  return (
    <section className="py-20 bg-neutral-50/70 border-b border-neutral-200/80">
      <Container size="wide">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="emerald" className="mb-2">
            تجارب حقيقية موثقة
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mb-2">
            ماذا يقول الطلاب وأولياء الأمور عن مَسار؟
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            تقييمات فعلية لا يمكن إضافتها إلا بعد اكتمال الحصة الدراسية
          </p>
        </div>

        {/* 6 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-right">
          {topReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Rating and date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-400 font-medium">{rev.date}</span>
                </div>

                {/* Comment quote */}
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal mb-6">
                  "{rev.comment}"
                </p>
              </div>

              {/* Student info and verified booking badge */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-neutral-900">{rev.studentName}</div>
                  <div className="text-[11px] text-emerald-700 font-semibold">{rev.subject}</div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>حجز مؤكد</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
};
