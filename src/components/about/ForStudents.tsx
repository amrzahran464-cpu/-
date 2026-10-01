import React from 'react';
import Image from 'next/image';
import { CheckCircle2, ArrowLeft, HeartHandshake, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { studentBenefits } from '@/data/about';

interface ForStudentsProps {
  onSearchClick?: () => void;
}

export function ForStudents({ onSearchClick }: ForStudentsProps) {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-neutral-200/80">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center text-right">
          
          {/* Right Column: Content (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-right">
            <Badge variant="blue" className="mb-4">
              للطلاب وأولياء الأمور
            </Badge>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight leading-snug mb-4">
              تجربة تعليمية ملهمة تضمن راحة بالك وتفوق ابنك
            </h2>

            <p className="text-base text-neutral-600 leading-relaxed mb-6 font-normal">
              وفر ساعات البحث والتنسيق المرهقة، واحصل على مدرس معتمد يناسب ميزانيتك ومواعيدك مع شفافية تامة في كل تفصيلة.
            </p>

            {/* Benefits List */}
            <div className="space-y-3.5 w-full mb-8">
              {studentBenefits.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-neutral-50/80 border border-neutral-100"
                >
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-900 mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="default"
              size="lg"
              onClick={onSearchClick}
              className="gap-2"
            >
              <span>ابدأ البحث عن مدرسك المناسب</span>
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </div>

          {/* Left Column: Image (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-neutral-200 shadow-xl aspect-[4/3] bg-neutral-100">
              <Image
                src="/src/assets/images/student_parent_success_1790850691030.jpg"
                alt="طالب وولي أمر في بيئة دراسية مريحة وناجحة"
                fill
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
              />
              <div className="absolute bottom-4 right-4 left-4 text-white">
                <span className="text-[11px] font-bold text-blue-300">متابعة مستمرة</span>
                <p className="text-xs sm:text-sm font-bold mt-0.5">
                  تقارير حضور ونتائج واضحة بعد كل حصة
                </p>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
