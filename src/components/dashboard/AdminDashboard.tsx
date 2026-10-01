'use client';

import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  Edit3,
  Search,
  BookOpen,
  HelpCircle,
  Settings,
  ArrowLeft,
  Calendar,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { usePlatform } from '@/context/PlatformContext';

export const AdminDashboard: React.FC = () => {
  const {
    tutors,
    updateTutorStatus,
    bookings,
    categories,
    educationalSystems,
    blogPosts,
    faqs,
    navigate,
  } = usePlatform();

  const [activeTab, setActiveTab] = useState<'overview' | 'teachers' | 'bookings' | 'categories' | 'blog' | 'settings'>('overview');
  const [teacherSearch, setTeacherSearch] = useState('');

  const totalRevenue = bookings.reduce((sum, b) => sum + b.price, 0);

  const filteredTeachers = tutors.filter(
    (t) =>
      t.name.includes(teacherSearch) ||
      t.subjects.some((s) => s.includes(teacherSearch)) ||
      t.city.includes(teacherSearch)
  );

  return (
    <div className="py-10 bg-neutral-50/70 min-h-screen text-right">
      <Container size="wide">
        
        {/* Header */}
        <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center font-bold text-xl text-white shadow-xs">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black">
                  لوحة الإدارة المركزية (Admin Dashboard)
                </h1>
                <Badge variant="emerald" className="bg-emerald-950 text-emerald-300 border-emerald-800">
                  صلاحيات كاملة
                </Badge>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                إدارة شبكة المعلمين، الحجوزات، المحتوى التعليمي، وإعدادات المنصة
              </p>
            </div>
          </div>

          <Button
            variant="emerald"
            onClick={() => navigate('/')}
            className="text-xs font-bold"
          >
            معاينة الموقع كزائر
          </Button>
        </div>

        {/* 4 KPI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs">
            <div className="text-[11px] font-bold text-neutral-400 mb-1">إجمالي المدرسين المعتمدين</div>
            <div className="text-2xl font-black text-neutral-900 font-mono tabular-nums">
              {tutors.length} معلماً
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs">
            <div className="text-[11px] font-bold text-neutral-400 mb-1">إجمالي الحجوزات</div>
            <div className="text-2xl font-black text-emerald-700 font-mono tabular-nums">
              {bookings.length} حجوزات
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs">
            <div className="text-[11px] font-bold text-neutral-400 mb-1">إجمالي حجم التعاملات</div>
            <div className="text-2xl font-black text-neutral-900 font-mono tabular-nums">
              {totalRevenue.toLocaleString('ar-SA')} ر.س
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs">
            <div className="text-[11px] font-bold text-neutral-400 mb-1">المواد والتخصصات</div>
            <div className="text-2xl font-black text-neutral-900 font-mono tabular-nums">
              +50 مادة
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-neutral-200 bg-white p-2 rounded-2xl shadow-2xs mb-6 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-4 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            نظرة عامة
          </button>
          <button
            onClick={() => setActiveTab('teachers')}
            className={`py-2 px-4 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'teachers' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            إدارة المدرسين ({tutors.length})
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-2 px-4 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'bookings' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            إدارة الحجوزات ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`py-2 px-4 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'categories' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            المواد والأنظمة ({categories.length})
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`py-2 px-4 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'blog' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            المدونة والـ FAQ
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2 px-4 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'settings' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            إعدادات المنصة
          </button>
        </div>

        {/* TAB 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
                أحدث العمليات والحجوزات المسجلة
              </h3>

              <div className="divide-y divide-neutral-100 text-xs">
                {bookings.map((b) => (
                  <div key={b.id} className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-neutral-400">#{b.bookingNumber}</span>
                        <span className="font-bold text-neutral-900">{b.studentName}</span>
                        <span>← مع المعلم:</span>
                        <span className="font-bold text-emerald-800">{b.tutorName}</span>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        {b.tutorSubject} · الموعد: {b.date} في {b.timeSlot}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-neutral-900">{b.price} {b.currency}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800">
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Teachers Management */}
        {activeTab === 'teachers' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-neutral-900">سجل المعلمين وتوثيق الحسابات</h3>
                <p className="text-xs text-neutral-500">فحص شهادات المعلمين، التفعيل، وتعديل الشارات</p>
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={teacherSearch}
                  onChange={(e) => setTeacherSearch(e.target.value)}
                  placeholder="ابحث بالاسم، المادة، أو المدينة..."
                  className="w-full pl-3 pr-9 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs"
                />
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-2.5" />
              </div>
            </div>

            <div className="divide-y divide-neutral-100 text-xs">
              {filteredTeachers.map((tutor) => (
                <div key={tutor.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                      <img src={tutor.avatar} alt={tutor.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-neutral-900">{tutor.name}</h4>
                        {tutor.isVerified ? (
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                            موثق Verified
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                            قيد المراجعة
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-500">{tutor.title} · {tutor.city}</p>
                      <div className="flex gap-2 text-[10px] text-neutral-400 mt-0.5">
                        <span>التقييم: ★ {tutor.rating}</span>
                        <span>·</span>
                        <span>السعر: {tutor.hourlyRate} {tutor.currency}/س</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant={tutor.isVerified ? 'outline' : 'emerald'}
                      size="sm"
                      onClick={() => updateTutorStatus(tutor.id, !tutor.isVerified)}
                      className="text-xs"
                    >
                      {tutor.isVerified ? 'إلغاء التوثيق' : 'توثيق الحساب'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/tutors/${tutor.slug}`)}
                      className="text-xs"
                    >
                      معاينة
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Categories & Systems */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              التصنيفات والأنظمة التعليمية المسجلة
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                <h4 className="font-bold text-neutral-900 text-sm">أقسام المواد الأساسية ({categories.length})</h4>
                <div className="space-y-2 text-xs">
                  {categories.map((c) => (
                    <div key={c.id} className="p-2.5 bg-white rounded-xl border border-neutral-200 flex justify-between">
                      <span className="font-bold text-neutral-800">{c.name}</span>
                      <span className="text-emerald-700 font-semibold">{c.subjects.length} تخصصات</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                <h4 className="font-bold text-neutral-900 text-sm">الأنظمة الدراسية المعتمدة ({educationalSystems.length})</h4>
                <div className="space-y-2 text-xs">
                  {educationalSystems.map((s) => (
                    <div key={s.id} className="p-2.5 bg-white rounded-xl border border-neutral-200 flex justify-between">
                      <span className="font-bold text-neutral-800">{s.name}</span>
                      <span className="text-neutral-500">{s.country}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </Container>
    </div>
  );
};
