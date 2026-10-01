'use client';

import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  MapPin,
  Calendar,
  Clock,
  Video,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  Heart,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { usePlatform } from '@/context/PlatformContext';
import { TutorProfile } from '@/types/platform';

interface TutorProfileViewProps {
  tutor: TutorProfile;
  onBook: () => void;
}

export const TutorProfileView: React.FC<TutorProfileViewProps> = ({ tutor, onBook }) => {
  const { navigate, reviews, favorites, toggleFavorite } = usePlatform();
  const [selectedDay, setSelectedDay] = useState(tutor.availableDays[0] || 'الأحد');
  const [selectedSlot, setSelectedSlot] = useState(tutor.availableTimeSlots[0] || '05:00 م');
  const [copySuccess, setCopySuccess] = useState(false);

  const isFav = favorites.includes(tutor.id);
  const tutorReviews = reviews.filter((r) => r.tutorId === tutor.id);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="py-10 bg-neutral-50/70 min-h-screen text-right">
      <Container size="wide">
        
        {/* Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <button onClick={() => navigate('/')} className="hover:text-emerald-700">الرئيسية</button>
            <span>/</span>
            <button onClick={() => navigate('/tutors')} className="hover:text-emerald-700">دليل المدرسين</button>
            <span>/</span>
            <span className="text-neutral-900 font-bold">{tutor.name}</span>
          </div>

          <button
            onClick={() => navigate('/tutors')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-neutral-900"
          >
            <span>العودة لقائمة المدرسين</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* 2 Columns: Main Profile (8 cols) + Sticky Booking Card (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Profile Info (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header Hero Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                
                {/* Tutor Avatar */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden bg-neutral-100 border-2 border-emerald-100 shrink-0 shadow-sm">
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="w-full h-full object-cover"
                  />
                  {tutor.isAvailableNow && (
                    <span
                      title="متاح اليوم للحجز"
                      className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"
                    />
                  )}
                </div>

                {/* Name & Titles */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-black text-neutral-900">
                      {tutor.name}
                    </h1>
                    {tutor.isVerified && (
                      <span title="هوية وشهادات موثقة" className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>موثق رسمياً</span>
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-neutral-600">
                    {tutor.title}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-neutral-500">
                    <span className="flex items-center gap-1 text-amber-500 font-black">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{tutor.rating}</span>
                      <span className="text-neutral-400 font-normal">({tutor.reviewsCount} تقييم)</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{tutor.studentsCount}+ طالب درسوا معه</span>
                    </span>
                    <span>·</span>
                    <span>{tutor.completedLessonsCount}+ درس منجز</span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {tutor.badges.map((b, i) => (
                      <span
                        key={i}
                        className="text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-lg"
                      >
                        {b}
                      </span>
                    ))}
                    <span className="text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
                      {tutor.deliveryType === 'both' ? 'أونلاين وحضوري' : tutor.deliveryType === 'online' ? 'أونلاين' : 'حضوري'}
                    </span>
                  </div>
                </div>

                {/* Favorite & Share */}
                <div className="flex sm:flex-col items-center gap-2 self-end sm:self-start">
                  <button
                    onClick={() => toggleFavorite(tutor.id)}
                    className={`p-2.5 rounded-2xl border transition-colors cursor-pointer ${
                      isFav ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-neutral-50 text-neutral-500 border-neutral-200 hover:bg-neutral-100'
                    }`}
                    aria-label="المفضلة"
                  >
                    <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-600' : ''}`} />
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-2xl border border-neutral-200 bg-neutral-50 text-neutral-500 hover:bg-neutral-100 transition-colors cursor-pointer"
                    aria-label="مشاركة الملف"
                    title={copySuccess ? 'تم نسخ الرابط!' : 'مشاركة'}
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

              </div>
            </div>

            {/* Bio Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3">
                نبذة تعريفية وأسلوب التدريس
              </h2>
              <p className="text-sm text-neutral-700 leading-relaxed font-normal">
                {tutor.bio}
              </p>
            </div>

            {/* Qualifications & Specializations */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
              <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3">
                المؤهلات والخبرات الأكاديمية
              </h2>

              <div className="space-y-3">
                {tutor.qualifications.map((q, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <Award className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-neutral-800">{q}</span>
                  </div>
                ))}
              </div>

              {/* Covered Subjects and Systems */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-neutral-500">المواد التي يدرّسها:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tutor.subjects.map((sub, i) => (
                      <span key={i} className="text-xs font-bold bg-neutral-100 text-neutral-800 px-3 py-1 rounded-lg">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-neutral-500">المناهج والأنظمة:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tutor.educationalSystems.map((sys, i) => (
                      <span key={i} className="text-xs font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-lg border border-emerald-100">
                        {sys}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Delivery Areas */}
              <div className="space-y-2 pt-4 border-t border-neutral-100">
                <h4 className="text-xs font-bold text-neutral-500">المدينة ونطاق التغطية للحضور المنزلي:</h4>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>{tutor.city}: {tutor.areas.join(' · ')}</span>
                </div>
              </div>
            </div>

            {/* Student Reviews */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <h2 className="text-lg font-bold text-neutral-900">
                  آراء وتقييمات الطلاب ({tutorReviews.length || tutor.reviewsCount})
                </h2>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{tutor.rating} من 5.0</span>
                </div>
              </div>

              {tutorReviews.length === 0 ? (
                <p className="text-xs text-neutral-500">لا توجد تقييمات مكتوبة مسجلة لهذا المعلم بعد.</p>
              ) : (
                <div className="space-y-4">
                  {tutorReviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-neutral-900">{rev.studentName}</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                            حجز موثق
                          </span>
                        </div>
                        <span className="text-[11px] text-neutral-400">{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        ))}
                      </div>

                      <p className="text-xs text-neutral-700 leading-relaxed font-normal">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Sticky Booking Widget Sidebar (4 cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xl space-y-6 text-right">
              
              {/* Pricing Header */}
              <div className="flex items-baseline justify-between pb-4 border-b border-neutral-100">
                <div>
                  <span className="text-xs text-neutral-400 font-semibold block">سعر الحصة:</span>
                  <div className="text-3xl font-black text-neutral-900 font-mono tabular-nums">
                    {tutor.hourlyRate} {tutor.currency}
                  </div>
                  <span className="text-[11px] text-neutral-500">مدة الحصة: 60 دقيقة</span>
                </div>

                <Badge variant="emerald">
                  ضمان الرضا 100%
                </Badge>
              </div>

              {/* Select Day */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-2">
                  الأيام المتاحة هذا الأسبوع:
                </label>
                <div className="flex flex-wrap gap-2">
                  {tutor.availableDays.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedDay === day
                          ? 'bg-neutral-900 text-white shadow-xs'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Time Slot */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-2">
                  الأوقات الشاغرة:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {tutor.availableTimeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                        selectedSlot === slot
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-neutral-50 border border-neutral-200 text-neutral-800 hover:border-emerald-500'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery method preview */}
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-xs text-neutral-600 space-y-1">
                <div className="flex justify-between">
                  <span>طريقة الحضور:</span>
                  <span className="font-bold text-neutral-900">
                    {tutor.deliveryType === 'both' ? 'أونلاين أو منزلي' : tutor.deliveryType === 'online' ? 'أونلاين (قاعة ذكية)' : 'حضوري منزلي'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>الموعد المختار:</span>
                  <span className="font-bold text-emerald-700">{selectedDay} · {selectedSlot}</span>
                </div>
              </div>

              {/* Book Button */}
              <Button
                variant="emerald"
                size="lg"
                onClick={onBook}
                className="w-full font-black text-sm shadow-md hover:shadow-lg py-3.5"
              >
                <span>احجز الحصة الآن</span>
                <ArrowRight className="w-4 h-4 ml-1 rotate-180" />
              </Button>

              <p className="text-[11px] text-neutral-400 text-center leading-normal">
                لن يتم خصم أي مبالغ إلا بعد تأكيد الحجز واختيار وسيلة الدفع الآمنة.
              </p>

            </div>
          </div>

        </div>

      </Container>
    </div>
  );
};
