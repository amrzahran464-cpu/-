'use client';

import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck, Clock, User, Phone, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { usePlatform } from '@/context/PlatformContext';
import { CITIES_AND_AREAS } from '@/data/seedData';

export const RequestTutorForm: React.FC = () => {
  const { categories, educationalSystems, currentUser, navigate } = usePlatform();

  const [studentName, setStudentName] = useState(currentUser?.name || '');
  const [studentPhone, setStudentPhone] = useState(currentUser?.phone || '');
  const [subject, setSubject] = useState('رياضيات');
  const [system, setSystem] = useState('النظام المصري');
  const [stage, setStage] = useState('ثانوي عام ولغات');
  const [deliveryType, setDeliveryType] = useState<'online' | 'in_person' | 'both'>('both');
  const [city, setCity] = useState('الرياض');
  const [area, setArea] = useState('شمال الرياض');
  const [budget, setBudget] = useState('100 - 150 ريال / ساعة');
  const [preferredDays, setPreferredDays] = useState(['الأحد', 'الثلاثاء']);
  const [notes, setNotes] = useState('');

  const [submittedRequestNumber, setSubmittedRequestNumber] = useState<string | null>(null);

  const toggleDay = (day: string) => {
    setPreferredDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reqNum = `REQ-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedRequestNumber(reqNum);
  };

  const allDays = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

  return (
    <div className="py-12 bg-neutral-50/70 min-h-screen text-right">
      <Container size="narrow">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="emerald" className="mb-2">
            خدمة المطابقة الذكية
          </Badge>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight mb-2">
            طلب مدرس خصوصي مخصص
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600">
            أخبرنا باحتياجاتك بدقة، وسيقوم فريق التوجيه الأكاديمي بترشيح أفضل 3 معلمين مناسبين لك خلال أقل من ساعتين.
          </p>
        </div>

        {submittedRequestNumber ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200 shadow-xl text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                رقم الطلب: #{submittedRequestNumber}
              </span>
              <h2 className="text-2xl font-black text-neutral-900 mt-3">
                تم استلام طلبك بنجاح!
              </h2>
              <div className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                الحالة: جارٍ مطابقة المعلمين الأنسب
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
              شكراً لك يا <strong>{studentName || 'طالبنا العزيز'}</strong>. يقوم مستشارنا التعليمي بمراجعة متطلبات مادة <strong>{subject}</strong> لمنهج <strong>{system}</strong> والتواصل معك عبر الواتساب على <strong>{studentPhone}</strong> بالترشيحات المتاحة وأسعارها.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="emerald"
                onClick={() => navigate('/tutors')}
                className="w-full sm:w-auto"
              >
                تصفح قائمة المدرسين بنفسك
              </Button>
              <Button
                variant="outline"
                onClick={() => setSubmittedRequestNumber(null)}
                className="w-full sm:w-auto"
              >
                تقديم طلب آخر
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200 shadow-xl space-y-6">
            
            {/* Student info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">اسم الطالب أو ولي الأمر</label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="الاسم الثلاثي"
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">رقم الجوال (واتساب للتواصل)</label>
                <input
                  type="tel"
                  required
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  placeholder="05xxxxxxxx"
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Academic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">المادة المطلوبة</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs"
                >
                  {categories.flatMap((c) =>
                    c.subjects.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">النظام الدراسي</label>
                <select
                  value={system}
                  onChange={(e) => setSystem(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs"
                >
                  {educationalSystems.map((sys) => (
                    <option key={sys.id} value={sys.name}>{sys.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">المرحلة الدراسية</label>
                <input
                  type="text"
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  placeholder="مثال: ثالث ثانوي علمي، الصف التاسع..."
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs"
                />
              </div>
            </div>

            {/* Mode & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">طريقة الحضور</label>
                <select
                  value={deliveryType}
                  onChange={(e) => setDeliveryType(e.target.value as any)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs"
                >
                  <option value="both">أونلاين أو حضوري (الأفضل للمعلم)</option>
                  <option value="online">أونلاين فقط عبر القاعة الذكية</option>
                  <option value="in_person">حضوري في المنزل فقط</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">المدينة</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs"
                >
                  {CITIES_AND_AREAS.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">الحي أو المنطقة</label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="مثال: حي الملقا، التجمع، سموحة..."
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs"
                />
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">الميزانية المستهدفة للحصة (ساعة)</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs"
              >
                <option value="80 - 100 ريال / ساعة">80 - 100 ريال / ساعة (ميزانية اقتصادية)</option>
                <option value="100 - 150 ريال / ساعة">100 - 150 ريال / ساعة (متوسط الشائع)</option>
                <option value="150 - 200 ريال / ساعة">150 - 200 ريال / ساعة (معلمون خبراء وشهادات دولية)</option>
                <option value="+200 ريال / ساعة">+200 ريال / ساعة (دكاترة جامعيين وتدريب خاص)</option>
              </select>
            </div>

            {/* Preferred Days */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-2">الأيام المفضلة للحصص</label>
              <div className="flex flex-wrap gap-2">
                {allDays.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleDay(d)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                      preferredDays.includes(d)
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">أي تفاصيل أو متطلبات خاصة ترغب بإضافتها</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="أهداف الطالب، مواعيد الاختبارات، أو أي تفضيلات لشخصية المعلم..."
                className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs leading-relaxed"
              />
            </div>

            <Button
              type="submit"
              variant="emerald"
              size="lg"
              className="w-full font-black text-sm shadow-md hover:shadow-lg py-3.5"
            >
              <span>إرسال طلب الترشيح المجاني</span>
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Button>

            <p className="text-[11px] text-neutral-500 text-center leading-normal">
              خدمة الترشيح مجانية بالكامل وبدون أي التزام بالشراء.
            </p>

          </form>
        )}

      </Container>
    </div>
  );
};
