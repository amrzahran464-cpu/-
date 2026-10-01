'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Heart,
  Star,
  MessageSquare,
  CreditCard,
  User,
  Settings,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { usePlatform } from '@/context/PlatformContext';
import { BookingRecord } from '@/types/platform';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    bookings,
    cancelBooking,
    tutors,
    favorites,
    toggleFavorite,
    addReview,
    navigate,
    setSelectedTutorSlug,
  } = usePlatform();

  const [activeTab, setActiveTab] = useState<'bookings' | 'favorites' | 'messages' | 'payments' | 'profile'>('bookings');
  const [bookingFilter, setBookingFilter] = useState<'upcoming' | 'completed' | 'all'>('upcoming');

  // Review modal inside completed bookings
  const [reviewBooking, setReviewBooking] = useState<BookingRecord | null>(null);
  const [ratingScore, setRatingScore] = useState<number>(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Student's bookings
  const userBookings = bookings.filter(
    (b) => b.studentId === currentUser?.id || b.studentEmail === currentUser?.email
  );

  const upcomingBookings = userBookings.filter((b) => b.status === 'confirmed');
  const completedBookings = userBookings.filter((b) => b.status === 'completed');

  const displayedBookings =
    bookingFilter === 'upcoming'
      ? upcomingBookings
      : bookingFilter === 'completed'
      ? completedBookings
      : userBookings;

  const favoriteTutors = tutors.filter((t) => favorites.includes(t.id));

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewBooking) return;

    addReview({
      tutorId: reviewBooking.tutorId,
      studentName: currentUser?.name || 'طالب مَسار',
      rating: ratingScore,
      comment: reviewText,
      subject: reviewBooking.tutorSubject,
    });

    setReviewSuccess(true);
    setTimeout(() => {
      setReviewSuccess(false);
      setReviewBooking(null);
      setReviewText('');
    }, 1800);
  };

  return (
    <div className="py-10 bg-neutral-50/70 min-h-screen text-right">
      <Container size="wide">
        
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-emerald-100 border border-emerald-200 shrink-0">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                alt={currentUser?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-neutral-900">
                  مرحباً، {currentUser?.name}
                </h1>
                <Badge variant="emerald">طالب مسجل</Badge>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                متابعة الحصص الدراسية، المواعيد، وتقييم المعلمين
              </p>
            </div>
          </div>

          <Button
            variant="emerald"
            onClick={() => navigate('/tutors')}
            className="text-xs font-bold gap-1.5 shadow-sm"
          >
            <span>حجز درس جديد</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Dashboard 4 KPI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs">
            <div className="text-[11px] font-bold text-neutral-400 mb-1">الحصص القادمة المؤكدة</div>
            <div className="text-2xl font-black text-emerald-700 font-mono tabular-nums">
              {upcomingBookings.length} حصص
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs">
            <div className="text-[11px] font-bold text-neutral-400 mb-1">الحصص المكتملة</div>
            <div className="text-2xl font-black text-neutral-900 font-mono tabular-nums">
              {completedBookings.length} درس
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs">
            <div className="text-[11px] font-bold text-neutral-400 mb-1">المعلمون المفضلون</div>
            <div className="text-2xl font-black text-neutral-900 font-mono tabular-nums">
              {favoriteTutors.length} معلمين
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs">
            <div className="text-[11px] font-bold text-neutral-400 mb-1">إجمالي ساعات التعلم</div>
            <div className="text-2xl font-black text-neutral-900 font-mono tabular-nums">
              {(completedBookings.length * 1.5).toFixed(1)} ساعة
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-neutral-200 bg-white p-2 rounded-2xl shadow-2xs mb-6 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-2 px-4 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'bookings' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            جدول الحجوزات ({userBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`py-2 px-4 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'favorites' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            المعلمون المفضلون ({favoriteTutors.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-2 px-4 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'messages' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            الرسائل والمحادثات
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`py-2 px-4 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'payments' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            سجل المدفوعات والفواتير
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 px-4 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'profile' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            الملف الشخصي والإعدادات
          </button>
        </div>

        {/* TAB 1: Bookings */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            
            {/* Filter buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBookingFilter('upcoming')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                  bookingFilter === 'upcoming' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                القادمة ({upcomingBookings.length})
              </button>
              <button
                onClick={() => setBookingFilter('completed')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                  bookingFilter === 'completed' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                المكتملة ({completedBookings.length})
              </button>
              <button
                onClick={() => setBookingFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                  bookingFilter === 'all' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                الكل ({userBookings.length})
              </button>
            </div>

            {displayedBookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 space-y-3">
                <Calendar className="w-12 h-12 text-neutral-300 mx-auto" />
                <h3 className="text-base font-bold text-neutral-800">لا توجد حجوزات في هذه القائمة حالياً</h3>
                <p className="text-xs text-neutral-500">
                  يمكنك استعراض دليل المدرسين واختيار الموعد المناسب لبدء حصتك الأولى.
                </p>
                <Button variant="emerald" onClick={() => navigate('/tutors')}>
                  تصفح المدرسين المتاحين
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {displayedBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                        <img src={b.tutorAvatar} alt={b.tutorName} className="w-full h-full object-cover" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-neutral-400">#{b.bookingNumber}</span>
                          <h3 className="text-base font-extrabold text-neutral-900">{b.tutorName}</h3>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              b.status === 'confirmed'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : b.status === 'completed'
                                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                : 'bg-neutral-100 text-neutral-600'
                            }`}
                          >
                            {b.status === 'confirmed' ? 'مؤكدة' : b.status === 'completed' ? 'مكتملة' : 'ملغية'}
                          </span>
                        </div>

                        <p className="text-xs font-semibold text-emerald-800">{b.tutorSubject}</p>

                        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-neutral-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{b.date}</span>
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{b.timeSlot} ({b.durationMinutes} دقيقة)</span>
                          </span>
                          <span>·</span>
                          <span className="font-bold text-neutral-900 font-mono">{b.price} {b.currency}</span>
                        </div>

                        {b.lessonLocation && (
                          <div className="text-[11px] text-neutral-600 flex items-center gap-1 pt-1">
                            <MapPin className="w-3 h-3 text-emerald-600" />
                            <span>{b.lessonLocation}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end lg:self-center w-full lg:w-auto justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-neutral-100">
                      {b.status === 'confirmed' && b.meetingLink && (
                        <a
                          href={b.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                        >
                          <Video className="w-4 h-4" />
                          <span>دخول القاعة الذكية</span>
                        </a>
                      )}

                      {b.status === 'completed' && !b.hasReview && (
                        <Button
                          variant="emerald"
                          size="sm"
                          onClick={() => setReviewBooking(b)}
                          className="text-xs gap-1"
                        >
                          <Star className="w-3.5 h-3.5 fill-white" />
                          <span>تقييم المعلم</span>
                        </Button>
                      )}

                      {b.status === 'confirmed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (window.confirm('هل أنت متأكد من إلغاء هذه الحصة؟ سيتم استرجاع الرصيد لمحفظتك.')) {
                              cancelBooking(b.id);
                            }
                          }}
                          className="text-xs text-rose-600 hover:bg-rose-50 border-rose-200"
                        >
                          إلغاء الموعد
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Favorites */}
        {activeTab === 'favorites' && (
          <div>
            {favoriteTutors.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 space-y-3">
                <Heart className="w-12 h-12 text-neutral-300 mx-auto" />
                <h3 className="text-base font-bold text-neutral-800">قائمة المفضلة فارغة حالياً</h3>
                <p className="text-xs text-neutral-500">
                  يمكنك النقر على أيقونة القلب على أي معلم في صفحة المدرسين لحفظه في هذه القائمة.
                </p>
                <Button variant="emerald" onClick={() => navigate('/tutors')}>
                  استكشاف المدرسين
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteTutors.map((tutor) => (
                  <div key={tutor.id} className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
                          <img src={tutor.avatar} alt={tutor.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-neutral-900">{tutor.name}</h4>
                          <p className="text-xs text-neutral-500">{tutor.title}</p>
                          <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-0.5">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{tutor.rating}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleFavorite(tutor.id)}
                        className="p-2 text-rose-500 bg-rose-50 rounded-xl"
                      >
                        <Heart className="w-4 h-4 fill-rose-500" />
                      </button>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                      <span className="text-base font-black text-neutral-900 font-mono">
                        {tutor.hourlyRate} {tutor.currency}
                      </span>
                      <Button
                        variant="emerald"
                        size="sm"
                        onClick={() => {
                          setSelectedTutorSlug(tutor.slug);
                          navigate(`/tutors/${tutor.slug}`);
                        }}
                        className="text-xs"
                      >
                        حجز حصة
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Messages Simulation */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              محادثات المعلمين والتنسيق
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" alt="د. سارة" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-neutral-900">أ. د. سارة القحطاني</span>
                    <span className="text-[10px] text-neutral-400">اليوم، 02:15 م</span>
                  </div>
                  <p className="text-xs text-neutral-600">
                    "أهلاً عبد الله، جهزت لك ملف مسائل التفاضل التفاعلية لدرس الغد الساعة 5:30 م. الرابط جاهز في القاعة."
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="م. أحمد" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-neutral-900">م. أحمد الشريف</span>
                    <span className="text-[10px] text-neutral-400">أمس، 06:40 م</span>
                  </div>
                  <p className="text-xs text-neutral-600">
                    "ممتاز أدائك في تدريبات الميكانيكا، درجتك في الكويز كانت 19/20."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Payments & Invoices */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              سجل الفواتير والمدفوعات
            </h3>

            <div className="divide-y divide-neutral-100 text-xs">
              {userBookings.map((b) => (
                <div key={b.id} className="py-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-neutral-900">حصة {b.tutorSubject} مع {b.tutorName}</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">
                      رقم الفاتورة: INV-{b.bookingNumber} · وسيلة الدفع: {b.paymentMethod}
                    </div>
                  </div>
                  <div className="text-left font-mono">
                    <div className="font-black text-neutral-900 text-sm">{b.price} {b.currency}</div>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      مدفوع ومؤمن
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Profile & Settings */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6 max-w-xl">
            <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              إعدادات الحساب والبيانات الشخصية
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">الاسم الكامل</label>
                <input
                  type="text"
                  defaultValue={currentUser?.name}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  defaultValue={currentUser?.email}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">رقم الجوال</label>
                <input
                  type="tel"
                  defaultValue={currentUser?.phone}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl"
                  dir="ltr"
                />
              </div>

              <Button variant="emerald" className="mt-2">
                حفظ التعديلات
              </Button>
            </div>
          </div>
        )}

      </Container>

      {/* Review Dialog */}
      {reviewBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-right shadow-2xl border border-neutral-200 animate-in zoom-in-95">
            {reviewSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-neutral-900">تم تسجيل تقييمك بنجاح!</h3>
                <p className="text-xs text-neutral-500">شكراً لمشاركتك رأيك، يساعد ذلك الطلاب الآخرين على اختيار المدرس.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <h3 className="text-base font-bold text-neutral-900">تقييم درس مع {reviewBooking.tutorName}</h3>
                  <button
                    type="button"
                    onClick={() => setReviewBooking(null)}
                    className="p-1 text-neutral-400 hover:text-neutral-700"
                  >
                    ✕
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-2">التقييم بالنجوم (1 إلى 5)</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingScore(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            star <= ratingScore ? 'text-amber-500 fill-amber-500' : 'text-neutral-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">ملاحظاتك وتقييمك لتجربة الشرح</label>
                  <textarea
                    rows={4}
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="وضح كيف كان أسلوب المعلم، الالتزام بالوقت، وتبسيط المعلومات..."
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs leading-relaxed"
                  />
                </div>

                <div className="p-3 bg-emerald-50 text-emerald-800 text-[11px] rounded-xl flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>سيظهر التقييم مع علامة "حجز مؤكد" لمصداقية تامة</span>
                </div>

                <Button type="submit" variant="emerald" className="w-full justify-center">
                  نشر التقييم
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
