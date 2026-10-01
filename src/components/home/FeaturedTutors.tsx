'use client';

import React from 'react';
import { Star, ShieldCheck, Video, MapPin, ArrowLeft, Heart, Calendar } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { usePlatform } from '@/context/PlatformContext';
import { TutorProfile } from '@/types/platform';

interface FeaturedTutorsProps {
  onBookTutor?: (tutor: TutorProfile) => void;
}

export const FeaturedTutors: React.FC<FeaturedTutorsProps> = ({ onBookTutor }) => {
  const { tutors, navigate, favorites, toggleFavorite, setSelectedTutorSlug } = usePlatform();

  // Top 6 featured tutors
  const featured = tutors.slice(0, 6);

  const handleViewProfile = (tutor: TutorProfile) => {
    setSelectedTutorSlug(tutor.slug);
    navigate(`/tutors/${tutor.slug}`);
  };

  return (
    <section className="py-20 bg-white border-b border-neutral-200/80">
      <Container size="wide">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 text-right">
          <div>
            <Badge variant="emerald" className="mb-2">
              نخبة المعلمين المعتمدين
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              مدرسون مميزون متاحون للحجز الفوري
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              تم التحقق من هوياتهم وخبراتهم الأكاديمية بنسبة 100%
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => navigate('/tutors')}
            className="self-start md:self-auto gap-1.5"
          >
            <span>استعراض كافة المدرسين (+30)</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* 6 Tutor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-right">
          {featured.map((tutor) => {
            const isFav = favorites.includes(tutor.id);
            return (
              <div
                key={tutor.id}
                className="bg-white rounded-3xl p-6 border border-neutral-200 hover:border-emerald-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Avatar & Favorite */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-3.5">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                        <img
                          src={tutor.avatar}
                          alt={tutor.name}
                          className="w-full h-full object-cover"
                        />
                        {tutor.isAvailableNow && (
                          <span
                            title="متاح للحجز الفوري"
                            className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"
                          />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="text-base font-extrabold text-neutral-900">
                            {tutor.name}
                          </h3>
                          {tutor.isVerified && (
                            <span title="معلم موثق">
                              <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-500 font-medium line-clamp-1 mt-0.5">
                          {tutor.title}
                        </p>
                        
                        {/* Rating and Reviews */}
                        <div className="flex items-center gap-1 mt-1.5 text-xs">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span className="font-black text-neutral-800">{tutor.rating}</span>
                          <span className="text-neutral-400 text-[11px]">({tutor.reviewsCount} تقييم)</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleFavorite(tutor.id)}
                      className={`p-2 rounded-xl transition-colors cursor-pointer ${
                        isFav ? 'text-rose-500 bg-rose-50' : 'text-neutral-400 hover:bg-neutral-100'
                      }`}
                      aria-label="إضافة للمفضلة"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2 mb-4">
                    {tutor.bio}
                  </p>

                  {/* Badges / Subject Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tutor.subjects.slice(0, 2).map((sub, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-semibold bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-md"
                      >
                        {sub}
                      </span>
                    ))}
                    <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md">
                      {tutor.deliveryType === 'both' ? 'أونلاين وحضوري' : tutor.deliveryType === 'online' ? 'أونلاين' : 'حضوري'}
                    </span>
                  </div>

                  {/* Details Bar: City & Experience */}
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 py-2 border-t border-neutral-100">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-400" />
                      <span>{tutor.city}</span>
                    </span>
                    <span>خبرة {tutor.experienceYears} سنوات</span>
                    <span className="font-semibold text-emerald-700">{tutor.studentsCount}+ طالب</span>
                  </div>
                </div>

                {/* Footer: Price & Actions */}
                <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div className="text-right">
                    <div className="text-lg font-black text-neutral-900 font-mono tabular-nums leading-tight">
                      {tutor.hourlyRate} {tutor.currency}
                    </div>
                    <span className="text-[10px] text-neutral-400">للحصة (60 دقيقة)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewProfile(tutor)}
                      className="px-3 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer"
                    >
                      الملف
                    </button>
                    <Button
                      variant="emerald"
                      size="sm"
                      onClick={() => (onBookTutor ? onBookTutor(tutor) : handleViewProfile(tutor))}
                      className="shadow-xs text-xs font-bold"
                    >
                      <span>احجز الآن</span>
                    </Button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
};
