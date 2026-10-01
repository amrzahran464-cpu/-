'use client';

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  DollarSign,
  Users,
  Star,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Lock,
  Unlock,
  Settings,
  ArrowLeft,
  Video,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { usePlatform } from '@/context/PlatformContext';

export const TeacherDashboard: React.FC = () => {
  const { currentUser, bookings, reviews, navigate } = usePlatform();

  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'bookings' | 'students' | 'earnings' | 'settings'>('overview');

  // Teacher's simulated calendar days & slots
  const [workingDays, setWorkingDays] = useState([
    { day: 'الأحد', enabled: true, slots: ['04:00 م', '05:30 م', '07:00 م'] },
    { day: 'الإثنين', enabled: true, slots: ['04:30 م', '06:00 م', '07:30 م'] },
    { day: 'الثلاثاء', enabled: true, slots: ['04:00 م', '05:30 م', '07:00 م'] },
    { day: 'الأربعاء', enabled: true, slots: ['05:00 م', '06:30 م'] },
    { day: 'الخميس', enabled: true, slots: ['04:00 م', '06:00 م'] },
    { day: 'الجمعة', enabled: false, slots: [] },
    { day: 'السبت', enabled: true, slots: ['02:00 م', '03:30 م', '05:00 م'] },
  ]);

  const [newSlotTime, setNewSlotTime] = useState('08:30 م');
  const [selectedDayForSlot, setSelectedDayForSlot] = useState('الأحد');

  // Teacher's bookings
  const teacherBookings = bookings.filter((b) => b.tutorName.includes('سارة') || b.tutorId === 'tut-01');
  const totalEarnings = teacherBookings
    .filter((b) => b.paymentStatus === 'paid')
    .reduce((sum, b) => sum + b.price, 0);

  const toggleDayEnabled = (dayName: string) => {
    setWorkingDays((prev) =>
      prev.map((d) => (d.day === dayName ? { ...d, enabled: !d.enabled } : d))
    );
  };

  const addSlotToDay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlotTime) return;
    setWorkingDays((prev) =>
      prev.map((d) =>
        d.day === selectedDayForSlot && !d.slots.includes(newSlotTime)
          ? { ...d, slots: [...d.slots, newSlotTime].sort() }
          : d
      )
    );
  };

  const removeSlotFromDay = (dayName: string, slotToRemove: string) => {
    setWorkingDays((prev) =>
      prev.map((d) =>
        d.day === dayName
          ? { ...d, slots: d.slots.filter((s) => s !== slotToRemove) }
          : d
      )
    );
  };

  return (
    <div className="py-10 bg-neutral-50/70 min-h-screen text-right">
      <Container size="wide">
        
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-emerald-100 border border-emerald-200 shrink-0">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'}
                alt="المعلم"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-neutral-900">
                  لوحة تحكم المعلم | {currentUser?.name}
                </h1>
                <Badge variant="emerald">معلم معتمد وموثق</Badge>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                إدارة الحصص، تقويم المواعيد المتاحة، الأرباح ومتابعة الطلاب
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => navigate('/tutors/sara-alqahtani')}
              className="text-xs"
            >
              معاينة ملفي العام
            </Button>
            <Button
              variant="emerald"
              onClick={() => setActiveTab('calendar')}
              className="text-xs gap-1.5"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>إدارة الجدول</span>
            </Button>
          </div>
        </div>

        {/* 4 KPI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs">
            <div className="text-[11px] font-bold text-neutral-400 mb-1">أرباح الحصص المؤكدة</div>
            <div className="text-2xl font-black text-emerald-700 font-mono tabular-nums">
              {totalEarnings || 4200} ر.س
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs">
            <div className="text-[11px] font-bold text-neutral-400 mb-1">الحصص القادمة هذا الأسبوع</div>
            <div className="text-2xl font-black text-neutral-900 font-mono tabular-nums">
              {teacherBookings.filter((b) => b.status === 'confirmed').length || 6} حصص
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs">
            <div className="text-[11px] font-bold text-neutral-400 mb-1">إجمالي الطلاب النشطين</div>
            <div className="text-2xl font-black text-neutral-900 font-mono tabular-nums">
              24 طالباً
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs">
            <div className="text-[11px] font-bold text-neutral-400 mb-1">متوسط تقييم الطلاب</div>
            <div className="text-2xl font-black text-amber-500 font-mono tabular-nums flex items-center gap-1">
              <span>4.98</span>
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-neutral-200 bg-white p-2 rounded-2xl shadow-2xs mb-6 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-4 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            نظرة عامة والطلبات
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`py-2 px-4 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'calendar' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            جدول المواعيد والتقويم
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`py-2 px-4 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'students' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            سجل الطلاب
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            className={`py-2 px-4 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'earnings' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            المحفظة والأرباح
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2 px-4 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'settings' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            إعدادات الملف والأسعار
          </button>
        </div>

        {/* TAB: Overview / Bookings */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
                الحصص والطلبات الواردة المؤكدة
              </h3>

              <div className="space-y-4">
                {teacherBookings.map((b) => (
                  <div key={b.id} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-neutral-400">#{b.bookingNumber}</span>
                        <h4 className="text-sm font-bold text-neutral-900">الطالب: {b.studentName}</h4>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                          مؤكد
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 mt-1">
                        المادة: {b.tutorSubject} · الموعد: {b.date} في تمام {b.timeSlot}
                      </p>
                      {b.lessonLocation && (
                        <p className="text-[11px] text-neutral-500 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          <span>{b.lessonLocation}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-left font-mono">
                        <div className="text-sm font-black text-emerald-700">{b.price} {b.currency}</div>
                        <span className="text-[10px] text-neutral-400">{b.paymentStatus === 'paid' ? 'مدفوع' : 'معلق'}</span>
                      </div>

                      {b.meetingLink && (
                        <a
                          href={b.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>فتح القاعة</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: Calendar & Availability Manager */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  تقويم المواعيد وتحديد أوقات العمل الأسبوعية
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  يمكنك تفعيل أو تعطيل الأيام، وإضافة أو حذف الفترات الزمنية المتاحة لحجز الطلاب دون أي تعارض
                </p>
              </div>

              {/* Add New Slot Inline Form */}
              <form onSubmit={addSlotToDay} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold text-neutral-700">إضافة فترة متاحة جديدة:</span>
                <select
                  value={selectedDayForSlot}
                  onChange={(e) => setSelectedDayForSlot(e.target.value)}
                  className="p-2 bg-white border border-neutral-200 rounded-xl text-xs font-bold"
                >
                  {workingDays.map((d) => (
                    <option key={d.day} value={d.day}>{d.day}</option>
                  ))}
                </select>

                <input
                  type="text"
                  value={newSlotTime}
                  onChange={(e) => setNewSlotTime(e.target.value)}
                  placeholder="مثال: 08:30 م"
                  className="p-2 bg-white border border-neutral-200 rounded-xl text-xs font-mono w-28 text-center"
                />

                <Button type="submit" variant="emerald" size="sm" className="gap-1">
                  <Plus className="w-3.5 h-3.5" />
                  <span>إضافة الفترة</span>
                </Button>
              </form>

              {/* 7 Days Schedule Cards */}
              <div className="space-y-3">
                {workingDays.map((dayItem) => (
                  <div
                    key={dayItem.day}
                    className={`p-4 rounded-2xl border transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      dayItem.enabled ? 'bg-white border-neutral-200' : 'bg-neutral-100 border-neutral-200/60 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleDayEnabled(dayItem.day)}
                        className={`p-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                          dayItem.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-600'
                        }`}
                      >
                        {dayItem.enabled ? <CheckCircle2 className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      </button>
                      <div>
                        <span className="text-sm font-bold text-neutral-900">{dayItem.day}</span>
                        <span className="text-[11px] text-neutral-500 mr-2">
                          {dayItem.enabled ? `(متاح للحجز · ${dayItem.slots.length} فترات)` : '(يوم إجازة معطّل)'}
                        </span>
                      </div>
                    </div>

                    {/* Slots pills */}
                    {dayItem.enabled && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {dayItem.slots.map((slot) => (
                          <span
                            key={slot}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 text-neutral-800 rounded-lg text-xs font-mono font-bold"
                          >
                            <span>{slot}</span>
                            <button
                              type="button"
                              onClick={() => removeSlotFromDay(dayItem.day, slot)}
                              className="text-neutral-400 hover:text-rose-600 cursor-pointer"
                              title="حذف هذه الفترة"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800 font-medium">
                ✓ يمنع النظام تلقائياً حجز أي موعد محجوز مسبقاً أو غير مدرج في جدولك الأسبوعي.
              </div>
            </div>
          </div>
        )}

        {/* TAB: Earnings */}
        {activeTab === 'earnings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              المحفظة المالية والتحويلات البنكية
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200">
                <span className="text-xs text-neutral-500">الرصيد المتاح للسحب</span>
                <div className="text-2xl font-black text-emerald-700 font-mono mt-1">3,450 ر.س</div>
                <Button variant="emerald" size="sm" className="mt-3 text-xs w-full">
                  طلب تحويل إلى الحساب البنكي
                </Button>
              </div>

              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200">
                <span className="text-xs text-neutral-500">أرباح الحصص المعلقة</span>
                <div className="text-2xl font-black text-neutral-800 font-mono mt-1">750 ر.س</div>
                <p className="text-[10px] text-neutral-400 mt-2">تُحوّل فور انتهاء الحصص الجارية</p>
              </div>

              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200">
                <span className="text-xs text-neutral-500">إجمالي الأرباح منذ التسجيل</span>
                <div className="text-2xl font-black text-neutral-900 font-mono mt-1">28,600 ر.س</div>
                <p className="text-[10px] text-neutral-400 mt-2">تم تحويلها بنجاح</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Settings & Rates */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6 max-w-xl">
            <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              تحديد أسعار الحصص والمواد
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">سعر الحصة بالساعة (ر.س)</label>
                <input
                  type="number"
                  defaultValue={140}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">نوع تقديم الدروس المتاح</label>
                <select defaultValue="both" className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl">
                  <option value="both">أونلاين وحضوري منزلي</option>
                  <option value="online">أونلاين فقط</option>
                  <option value="in_person">حضوري فقط</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">المدينة التي تقدم بها الحصص الحضورية</label>
                <input
                  type="text"
                  defaultValue="الرياض - شمال ووسط الرياض"
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl"
                />
              </div>

              <Button variant="emerald">
                حفظ التعديلات
              </Button>
            </div>
          </div>
        )}

      </Container>
    </div>
  );
};
