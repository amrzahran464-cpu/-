'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  User,
  Phone,
  Mail,
  Receipt,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { usePlatform } from '@/context/PlatformContext';
import { TutorProfile, DeliveryType, BookingRecord } from '@/types/platform';

interface BookingFlowProps {
  tutor?: TutorProfile;
  onFinished?: () => void;
}

export const BookingFlow: React.FC<BookingFlowProps> = ({ tutor: initialTutor, onFinished }) => {
  const { tutors, currentUser, createBooking, navigate } = usePlatform();

  // Selected tutor or fallback to first
  const [selectedTutor, setSelectedTutor] = useState<TutorProfile>(initialTutor || tutors[0]);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form selections
  const [selectedSubject, setSelectedSubject] = useState(selectedTutor.subjects[0] || 'رياضيات');
  const [deliveryType, setDeliveryType] = useState<DeliveryType>(
    selectedTutor.deliveryType === 'both' ? 'online' : selectedTutor.deliveryType
  );
  const [lessonLocation, setLessonLocation] = useState('الرياض، حي الملقا - شارع أنس بن مالك');
  const [selectedDate, setSelectedDate] = useState('غداً الأحد، 5 أكتوبر 2026');
  const [selectedTime, setSelectedTime] = useState(selectedTutor.availableTimeSlots[0] || '05:00 م');
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [studentName, setStudentName] = useState(currentUser?.name || 'عبد الله الدوسري');
  const [studentPhone, setStudentPhone] = useState(currentUser?.phone || '0501234567');
  const [studentEmail, setStudentEmail] = useState(currentUser?.email || 'student@example.com');
  const [notes, setNotes] = useState('');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'mada' | 'apple_pay' | 'visa' | 'cash'>('mada');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  // Price calculations
  const baseRate = selectedTutor.hourlyRate;
  const multiplier = durationMinutes === 60 ? 1 : durationMinutes === 90 ? 1.5 : 2;
  const totalPrice = Math.round(baseRate * multiplier);

  const handleConfirmAndPay = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord = createBooking({
      tutorId: selectedTutor.id,
      tutorName: selectedTutor.name,
      tutorAvatar: selectedTutor.avatar,
      tutorSubject: selectedSubject,
      studentId: currentUser?.id || 'guest-student',
      studentName,
      studentPhone,
      studentEmail,
      deliveryType,
      lessonLocation: deliveryType === 'in_person' ? lessonLocation : undefined,
      date: selectedDate,
      timeSlot: selectedTime,
      durationMinutes,
      price: totalPrice,
      currency: selectedTutor.currency,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod:
        paymentMethod === 'mada'
          ? 'مدى (Mada)'
          : paymentMethod === 'apple_pay'
          ? 'Apple Pay'
          : paymentMethod === 'visa'
          ? 'Visa / MasterCard'
          : 'دفع نقدي عند الحضور',
      notes,
    });

    setConfirmedBooking(newRecord);
    setStep(4);
  };

  return (
    <div className="py-12 bg-neutral-50/70 min-h-screen text-right">
      <Container size="narrow">
        
        {/* Progress Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-neutral-900">
                حجز موعد درس مع {selectedTutor.name}
              </h1>
              <p className="text-xs text-neutral-500 mt-0.5">
                خطوات سهلة وآمنة لتثبيت موعد حصتك
              </p>
            </div>
            <button
              onClick={() => navigate('/tutors')}
              className="text-xs font-bold text-neutral-500 hover:text-neutral-900"
            >
              إلغاء
            </button>
          </div>

          {/* Stepper */}
          <div className="grid grid-cols-3 gap-2 pt-4 text-xs font-bold text-center">
            <div className={`p-2 rounded-xl transition-colors ${step >= 1 ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-neutral-100 text-neutral-400'}`}>
              1. تفاصيل الحصة
            </div>
            <div className={`p-2 rounded-xl transition-colors ${step >= 2 ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-neutral-100 text-neutral-400'}`}>
              2. بيانات الطالب
            </div>
            <div className={`p-2 rounded-xl transition-colors ${step >= 3 ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-neutral-100 text-neutral-400'}`}>
              3. الدفع والتأكيد
            </div>
          </div>
        </div>

        {/* STEP 1: Lesson Details */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              1. اختر المادة والموعد وطريقة الدرس
            </h2>

            {/* Subject Selector */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-2">المادة المطلوبة</label>
              <div className="flex flex-wrap gap-2">
                {selectedTutor.subjects.map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSelectedSubject(sub)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                      selectedSubject === sub
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Type */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-2">طريقة الحضور</label>
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setDeliveryType('online')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    deliveryType === 'online'
                      ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Video className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-sm text-neutral-900">أونلاين تفاعلي</span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    عبر قاعة مَسار الذكية مع سبورة بيضاء وتسجيل كامل للحصة
                  </p>
                </div>

                <div
                  onClick={() => setDeliveryType('in_person')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    deliveryType === 'in_person'
                      ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-sm text-neutral-900">حضوري في المنزل</span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    المعلم يحضر لموقعك في {selectedTutor.city}
                  </p>
                </div>
              </div>
            </div>

            {/* If In-person: address input */}
            {deliveryType === 'in_person' && (
              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2">
                <label className="block text-xs font-bold text-neutral-700">عنوان وموقع الدرس بالتفصيل</label>
                <input
                  type="text"
                  value={lessonLocation}
                  onChange={(e) => setLessonLocation(e.target.value)}
                  placeholder="مثال: الرياض، حي الملقا، شارع أنس بن مالك، فيلا 14"
                  className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-xs"
                />
              </div>
            )}

            {/* Duration Selector */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-2">مدة الحصة</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { min: 60, label: '60 دقيقة', price: baseRate },
                  { min: 90, label: '90 دقيقة', price: Math.round(baseRate * 1.5) },
                  { min: 120, label: '120 دقيقة (ساعتان)', price: baseRate * 2 },
                ].map((item) => (
                  <button
                    key={item.min}
                    type="button"
                    onClick={() => setDurationMinutes(item.min)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      durationMinutes === item.min
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                        : 'border-neutral-200 bg-neutral-50/70 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <div className="text-xs">{item.label}</div>
                    <div className="text-sm font-mono font-black mt-1">{item.price} {selectedTutor.currency}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">تاريخ الحصة</label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold"
                >
                  <option value="غداً الأحد، 5 أكتوبر 2026">غداً الأحد، 5 أكتوبر 2026</option>
                  <option value="الإثنين، 6 أكتوبر 2026">الإثنين، 6 أكتوبر 2026</option>
                  <option value="الثلاثاء، 7 أكتوبر 2026">الثلاثاء، 7 أكتوبر 2026</option>
                  <option value="الأربعاء، 8 أكتوبر 2026">الأربعاء، 8 أكتوبر 2026</option>
                  <option value="الخميس، 9 أكتوبر 2026">الخميس، 9 أكتوبر 2026</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">وقت البدء المتاح</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold font-mono"
                >
                  {selectedTutor.availableTimeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex justify-between items-center">
              <div className="text-sm font-bold text-neutral-900 font-mono">
                الإجمالي المبدئي: <span className="text-emerald-700 font-black">{totalPrice} {selectedTutor.currency}</span>
              </div>
              <Button variant="emerald" onClick={() => setStep(2)} className="gap-2">
                <span>المتابعة إلى بيانات الطالب</span>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Student Details */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              2. بيانات التواصل والتأكيد
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">اسم الطالب أو ولي الأمر</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full pl-3 pr-10 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold"
                  />
                  <User className="w-4 h-4 text-neutral-400 absolute right-3.5 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">رقم الجوال لتلقي التذكير</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      className="w-full pl-3 pr-10 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono"
                      dir="ltr"
                    />
                    <Phone className="w-4 h-4 text-neutral-400 absolute right-3.5 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">البريد الإلكتروني للفاتورة</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="w-full pl-3 pr-10 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono"
                      dir="ltr"
                    />
                    <Mail className="w-4 h-4 text-neutral-400 absolute right-3.5 top-3" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">ملاحظات أو مواضيع خاصة للمدرس (اختياري)</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="مثال: التركيز على حل مسائل الفصل الثالث، التحضير لاختبار منتصف الفصل..."
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs leading-relaxed"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex justify-between items-center">
              <Button variant="outline" onClick={() => setStep(1)}>
                السابق
              </Button>
              <Button variant="emerald" onClick={() => setStep(3)} className="gap-2">
                <span>المتابعة إلى الدفع والتأكيد</span>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Payment & Final Checkout */}
        {step === 3 && (
          <form onSubmit={handleConfirmAndPay} className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              3. مراجعة الحجز وبوابة الدفع الآمن
            </h2>

            {/* Summary Ticket */}
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2 text-xs">
              <div className="flex justify-between font-medium">
                <span className="text-neutral-500">المدرس:</span>
                <span className="font-bold text-neutral-900">{selectedTutor.name}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-neutral-500">المادة:</span>
                <span className="font-bold text-neutral-900">{selectedSubject}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-neutral-500">الموعد المحدد:</span>
                <span className="font-bold text-emerald-700">{selectedDate} في تمام {selectedTime}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-neutral-500">طريقة الدرس:</span>
                <span className="font-bold text-neutral-900">
                  {deliveryType === 'online' ? 'أونلاين (قاعة مَسار الافتراضية)' : `حضوري في (${lessonLocation})`}
                </span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-neutral-200 text-sm">
                <span className="font-bold text-neutral-900">المبلغ الإجمالي المستحق:</span>
                <span className="font-black text-emerald-700 font-mono">{totalPrice} {selectedTutor.currency}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-neutral-700">اختر طريقة الدفع</label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => setPaymentMethod('mada')}
                  className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'mada' ? 'border-emerald-600 bg-emerald-50/50' : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold">بطاقة مدى (Mada)</span>
                  </div>
                  <span className="text-[10px] text-neutral-400">فوري</span>
                </div>

                <div
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'apple_pay' ? 'border-emerald-600 bg-emerald-50/50' : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-neutral-900" />
                    <span className="text-xs font-bold">Apple Pay</span>
                  </div>
                  <span className="text-[10px] text-neutral-400">بنقرة واحدة</span>
                </div>

                <div
                  onClick={() => setPaymentMethod('visa')}
                  className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'visa' ? 'border-emerald-600 bg-emerald-50/50' : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold">فيزا / ماستركارد</span>
                  </div>
                  <span className="text-[10px] text-neutral-400">مشفر</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>ضمان مَسار:</strong> المبالغ محجوزة بحساب ضمان مؤمن ولا تُحوّل للمعلم إلا بعد انتهاء الحصة بنجاح.
              </span>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex justify-between items-center">
              <Button variant="outline" type="button" onClick={() => setStep(2)}>
                السابق
              </Button>
              <Button variant="emerald" type="submit" size="lg" className="font-black gap-2 shadow-md">
                <span>تأكيد الحجز والدفع ({totalPrice} {selectedTutor.currency})</span>
                <CheckCircle2 className="w-4 h-4" />
              </Button>
            </div>
          </form>
        )}

        {/* STEP 4: Success & Confirmed Ticket */}
        {step === 4 && confirmedBooking && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200 shadow-xl text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                رقم الحجز: {confirmedBooking.bookingNumber}
              </span>
              <h2 className="text-2xl font-black text-neutral-900 mt-3">
                تم تأكيد حجزك بنجاح!
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-md mx-auto">
                تم إرسال تذكرة الموعد وتفاصيل الحصة إلى بريدك الإلكتروني وهاتفك المسجل.
              </p>
            </div>

            {/* Confirmed Ticket Card */}
            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 text-right space-y-3 max-w-md mx-auto text-xs">
              <div className="flex justify-between pb-2 border-b border-neutral-200 font-semibold">
                <span className="text-neutral-500">المعلم:</span>
                <span className="font-bold text-neutral-900">{confirmedBooking.tutorName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-neutral-200 font-semibold">
                <span className="text-neutral-500">الموعد:</span>
                <span className="font-bold text-emerald-700">{confirmedBooking.date} · {confirmedBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-neutral-200 font-semibold">
                <span className="text-neutral-500">نوع الحضور:</span>
                <span className="font-bold text-neutral-900">
                  {confirmedBooking.deliveryType === 'online' ? 'أونلاين (قاعة مَسار الافتراضية)' : 'حضوري منزلي'}
                </span>
              </div>
              {confirmedBooking.meetingLink && (
                <div className="pt-1">
                  <span className="text-neutral-500 block mb-1">رابط القاعة الافتراضية:</span>
                  <a
                    href={confirmedBooking.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-emerald-100 text-emerald-900 font-mono text-[11px] rounded-lg block truncate font-bold hover:underline"
                    dir="ltr"
                  >
                    {confirmedBooking.meetingLink}
                  </a>
                </div>
              )}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="emerald"
                onClick={() => navigate('/student/dashboard')}
                className="w-full sm:w-auto"
              >
                <span>الذهاب إلى لوحة تحكم الطالب</span>
                <ArrowLeft className="w-4 h-4 ml-1" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full sm:w-auto"
              >
                العودة للرئيسية
              </Button>
            </div>
          </div>
        )}

      </Container>
    </div>
  );
};
