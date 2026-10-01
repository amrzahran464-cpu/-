'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, MapPin, Video, Users, Sparkles, ArrowLeft, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { usePlatform } from '@/context/PlatformContext';
import { BRAND_CONFIG } from '@/config/brand';
import { CITIES_AND_AREAS } from '@/data/seedData';

export const HomeHero: React.FC = () => {
  const { navigate, setSearchFilters, categories, educationalSystems } = usePlatform();

  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [selectedSystem, setSelectedSystem] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [deliveryType, setDeliveryType] = useState<'all' | 'online' | 'in_person'>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFilters((prev) => ({
      ...prev,
      subject: selectedSubject || undefined,
      stage: selectedStage || undefined,
      system: selectedSystem || undefined,
      city: selectedCity || undefined,
      deliveryType,
    }));
    navigate('/tutors');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-neutral-50/40 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-neutral-200/80">
      {/* Decorative ambient blurred gradients */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl opacity-60 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-teal-100/50 rounded-full blur-3xl opacity-50 pointer-events-none"
      />

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center text-right">
          
          {/* Right Column: Titles, Description & Big Search Box (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-right">
            
            <Badge variant="emerald" className="mb-5 py-1.5 px-3.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 ml-1.5" />
              <span>المنصة الرائدة في التعليم الخصوصي الذكي</span>
            </Badge>

            {/* H1 Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.2] text-balance mb-5">
              اعثر على المدرس المناسب{' '}
              <span className="text-emerald-700 underline decoration-emerald-300 underline-offset-8">
                لمسارك التعليمي
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-8 max-w-2xl font-normal">
              اختر المادة والمرحلة وطريقة التعلم، واكتشف مدرسين متخصصين أونلاين أو حضوريًا مع تقييمات موثقة وأسعار شفافة.
            </p>

            {/* Large Multi-Field Search Box */}
            <div className="w-full bg-white p-5 sm:p-6 rounded-3xl border border-neutral-200 shadow-xl mb-6">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-100">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                  <Search className="w-4 h-4 text-emerald-600" />
                  <span>أبحث عن مدرس معتمد</span>
                </div>

                {/* Delivery Type Toggle Pills */}
                <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('all')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      deliveryType === 'all' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-600'
                    }`}
                  >
                    الكل
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType('online')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      deliveryType === 'online' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-neutral-600'
                    }`}
                  >
                    أونلاين
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType('in_person')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      deliveryType === 'in_person' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-neutral-600'
                    }`}
                  >
                    حضوري
                  </button>
                </div>
              </div>

              <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                
                {/* 1. المادة */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-600 mb-1">المادة</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2 px-2.5 text-xs text-neutral-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  >
                    <option value="">كافة المواد والتخصصات</option>
                    {categories.flatMap((cat) =>
                      cat.subjects.map((sub) => (
                        <option key={sub.id} value={sub.name}>
                          {sub.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                {/* 2. النظام الدراسي */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-600 mb-1">النظام الدراسي</label>
                  <select
                    value={selectedSystem}
                    onChange={(e) => setSelectedSystem(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2 px-2.5 text-xs text-neutral-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  >
                    <option value="">كافة المناهج والأنظمة</option>
                    {educationalSystems.map((sys) => (
                      <option key={sys.id} value={sys.name}>
                        {sys.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. المرحلة */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-600 mb-1">المرحلة التعليمية</label>
                  <select
                    value={selectedStage}
                    onChange={(e) => setSelectedStage(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2 px-2.5 text-xs text-neutral-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  >
                    <option value="">كافة المراحل</option>
                    <option value="ابتدائي">ابتدائي</option>
                    <option value="متوسط">متوسط / إعدادي</option>
                    <option value="ثانوي">ثانوي عام / لغات</option>
                    <option value="IGCSE">IGCSE & A Level</option>
                    <option value="SAT">SAT & ACT الدبلومة الأمريكية</option>
                    <option value="IB">البكالوريا الدولية IB</option>
                    <option value="جامعي">المرحلة الجامعية</option>
                  </select>
                </div>

                {/* 4. المدينة (لحضوري) */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-600 mb-1">المدينة / النطاق</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2 px-2.5 text-xs text-neutral-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  >
                    <option value="">كافة المدن (أو أونلاين)</option>
                    {CITIES_AND_AREAS.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Action */}
                <div className="sm:col-span-2 lg:col-span-4 mt-2">
                  <Button
                    type="submit"
                    variant="emerald"
                    size="lg"
                    className="w-full font-extrabold shadow-md hover:shadow-lg gap-2"
                  >
                    <Search className="w-4 h-4" />
                    <span>ابحث الآن عن المدرسين المتاحين</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </div>

              </form>
            </div>

            {/* Micro Trust markers underneath */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 ml-1" />
                <span>+30 معلماً معتمداً ومدققاً</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-1" />
                <span>حجز فوري وإلغاء مرن</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 ml-1" />
                <span>متوسط تقييم 4.95 / 5.0</span>
              </div>
            </div>

          </div>

          {/* Left Column: Visual Photorealistic Student Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Image Container: Arab student studying with laptop */}
              <div className="relative rounded-3xl overflow-hidden border border-neutral-200 shadow-2xl aspect-[4/3] bg-neutral-100">
                <Image
                  src="/src/assets/images/student_online_laptop_1790851730212.jpg"
                  alt="طالبة عربية تدرس أونلاين عبر منصة مسار التعليمية"
                  fill
                  priority
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
                />
                <div className="absolute bottom-4 right-4 left-4 text-white">
                  <span className="text-[11px] font-bold text-emerald-300">دروس تفاعلية حية</span>
                  <p className="text-xs sm:text-sm font-bold mt-0.5">
                    فهم عميق وتحصيل دراسي متفوق من راحة بيتك
                  </p>
                </div>
              </div>

              {/* Floating Verified Tutors Counter Card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-3.5 rounded-2xl border border-neutral-200 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-neutral-900">+1,000 مدرس معتمد</div>
                  <div className="text-[10px] text-neutral-500">فحص أمني وتدقيق أكاديمي</div>
                </div>
              </div>

              {/* Floating Rating Pill */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-2.5 px-3.5 rounded-xl border border-neutral-200 shadow-lg hidden sm:flex items-center gap-2">
                <span className="text-amber-500 text-xs font-black">★ 4.96</span>
                <span className="text-xs font-medium text-neutral-700">رضا الطلاب والأسر</span>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
