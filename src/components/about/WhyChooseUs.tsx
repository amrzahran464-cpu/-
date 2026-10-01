import React from 'react';
import { ShieldCheck, FileText, Star, CalendarCheck, Clock, Users } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { whyChooseUs } from '@/data/about';

const iconMap = {
  ShieldCheck,
  FileText,
  Star,
  CalendarCheck,
  Clock,
  Users,
};

export function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-neutral-200/80">
      <Container>
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="emerald" className="mb-3">
            المزايا والضمانات
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">
            لماذا تختار منصتنا؟
          </h2>
          <p className="text-base text-neutral-600 font-medium">
            صممنا المنصة لتمنحك أقصى درجات الراحة والمرونة والأمان الأكاديمي
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-right">
          {whyChooseUs.map((item, index) => {
            const IconComponent = iconMap[item.iconName] || ShieldCheck;
            return (
              <Card
                key={item.id}
                hoverEffect
                className="p-7 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-400">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 mb-2.5 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 text-[11px] font-semibold text-emerald-700">
                  ميزة معتمدة في المنصة
                </div>
              </Card>
            );
          })}
        </div>

      </Container>
    </section>
  );
}
