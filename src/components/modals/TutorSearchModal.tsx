import React, { useState } from 'react';
import { X, Search, Filter, Star, ShieldCheck, MapPin, Video, Calendar, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { sampleTutors, Tutor } from '../../data/sampleTutors';

interface TutorSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilters?: {
    subject?: string;
    stage?: string;
    type?: string;
  };
}

export const TutorSearchModal: React.FC<TutorSearchModalProps> = ({
  isOpen,
  onClose,
  initialFilters,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>(initialFilters?.subject || 'الكل');
  const [selectedType, setSelectedType] = useState<string>(initialFilters?.type || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingTutor, setBookingTutor] = useState<Tutor | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!isOpen) return null;

  const subjects = ['الكل', 'رياضيات', 'فيزياء', 'لغة إنجليزية', 'كيمياء', 'أحياء وعلوم', 'لغة عربية'];

  const filteredTutors = sampleTutors.filter((tutor) => {
    const matchesSubject = selectedSubject === 'الكل' || tutor.subject.includes(selectedSubject);
    const matchesType =
      selectedType === 'all' ||
      tutor.deliveryType === 'both' ||
      tutor.deliveryType === selectedType;
    const matchesQuery =
      searchQuery.trim() === '' ||
      tutor.name.includes(searchQuery) ||
      tutor.subject.includes(searchQuery) ||
      tutor.bio.includes(searchQuery);

    return matchesSubject && matchesType && matchesQuery;
  });

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingTutor(null);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden text-right">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/80">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">
              دليل المدرسين المعتمدين
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              تصفح نخبة المدرسين الخصوصيين المعتمدين واحجز درسك مباشرة
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-4 sm:p-5 border-b border-neutral-100 bg-white space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث باسم المدرس، المادة، أو التخصص..."
                className="w-full pl-4 pr-10 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute right-3.5 top-3" />
            </div>

            {/* Delivery Type Filter */}
            <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedType === 'all'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                الكل
              </button>
              <button
                onClick={() => setSelectedType('online')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedType === 'online'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                أونلاين
              </button>
              <button
                onClick={() => setSelectedType('in_person')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedType === 'in_person'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                حضوري
              </button>
            </div>
          </div>

          {/* Subjects horizontal pill buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-neutral-400 text-[11px] whitespace-nowrap">المادة:</span>
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1 rounded-lg whitespace-nowrap text-xs font-medium transition-colors cursor-pointer ${
                  selectedSubject === sub
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Tutor Cards List / Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredTutors.length === 0 ? (
            <div className="py-16 text-center text-neutral-500">
              <Search className="w-10 h-10 mx-auto mb-3 text-neutral-300" />
              <p className="font-bold text-sm">لم نجد نتائج مطابقة لبحثك</p>
              <p className="text-xs mt-1">جرب تغيير المادة أو نوع الدرس</p>
            </div>
          ) : (
            filteredTutors.map((tutor) => (
              <div
                key={tutor.id}
                className="bg-white rounded-2xl p-5 border border-neutral-200 hover:border-emerald-300 hover:shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
              >
                {/* Tutor Info */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                    <img
                      src={tutor.avatar}
                      alt={tutor.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-neutral-900">{tutor.name}</h3>
                      <span title="هوية وشهادات موثقة">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      </span>
                      {tutor.badge && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 rounded">
                          {tutor.badge}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-neutral-500 font-medium">{tutor.title}</p>
                    <p className="text-xs text-neutral-600 line-clamp-2 mt-1">{tutor.bio}</p>

                    <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-neutral-500">
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{tutor.rating}</span>
                        <span className="text-neutral-400 font-normal">({tutor.reviewsCount})</span>
                      </span>
                      <span>·</span>
                      <span>خبرة {tutor.experienceYears} سنوات</span>
                      <span>·</span>
                      <span className="text-emerald-700 font-medium">متاح: {tutor.availableNext}</span>
                      {tutor.city && (
                        <>
                          <span>·</span>
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-neutral-400" />
                            <span>{tutor.city}</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pricing & Booking Action */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100 shrink-0">
                  <div className="text-right">
                    <div className="text-lg font-black text-neutral-900 font-mono tabular-nums">
                      {tutor.hourlyRate} {tutor.currency}
                    </div>
                    <span className="text-[10px] text-neutral-400">للحصة (60 دقيقة)</span>
                  </div>

                  <button
                    onClick={() => setBookingTutor(tutor)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer whitespace-nowrap"
                  >
                    احجز موعد
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 text-xs text-neutral-500 flex items-center justify-between">
          <span>يتم فحص وتدقيق كافة المدرسين دورياً لضمان معايير الجودة الأكاديمية</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-semibold rounded-lg transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>

      </div>

      {/* Booking Drawer/Dialog inside modal */}
      {bookingTutor && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-right shadow-2xl border border-neutral-200 animate-in zoom-in-95">
            {bookingSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">تم حجز موعدك بنجاح!</h3>
                <p className="text-xs text-neutral-600">
                  تم إرسال تفاصيل الموعد ورابط الدفع الآمن إلى بريدك الإلكتروني وهاتفك.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <h3 className="text-base font-bold text-neutral-900">حجز موعد مع {bookingTutor.name}</h3>
                  <button
                    type="button"
                    onClick={() => setBookingTutor(null)}
                    className="p-1 text-neutral-400 hover:text-neutral-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-3 bg-neutral-50 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">المادة:</span>
                    <span className="font-bold text-neutral-800">{bookingTutor.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">سعر الحصة:</span>
                    <span className="font-bold text-emerald-700">{bookingTutor.hourlyRate} {bookingTutor.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">أقرب موعد متاح:</span>
                    <span className="font-semibold text-neutral-800">{bookingTutor.availableNext}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">اسم الطالب أو ولي الأمر</label>
                  <input
                    type="text"
                    required
                    placeholder="الاسم الكامل"
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">رقم الجوال لتأكيد الحجز</label>
                  <input
                    type="tel"
                    required
                    placeholder="05xxxxxxxx"
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">طريقة الحضور المفضلة</label>
                  <select className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs">
                    <option value="online">أونلاين (قاعة مَسار الافتراضية)</option>
                    <option value="in_person">حضوري (في منزلك)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  تأكيد الحجز المبدئي (بدون دفع مسبق)
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
