import React, { useState } from 'react';
import { X, CheckCircle2, ArrowLeft, ArrowRight, UserCheck, BookOpen, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface JoinTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinTutorModal: React.FC<JoinTutorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('الرياض');
  const [subject, setSubject] = useState('رياضيات');
  const [experience, setExperience] = useState('5');
  const [hourlyRate, setHourlyRate] = useState('120');
  const [teachingMode, setTeachingMode] = useState('both');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-neutral-200 overflow-hidden text-right">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/80">
          <div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
              بوابة المعلمين
            </span>
            <h2 className="text-lg font-bold text-neutral-900 mt-1">
              انضم إلى نخبة معلمي مَسار
            </h2>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 text-neutral-400 hover:text-neutral-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 sm:p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-neutral-900">
              تم استلام طلب انضمامك بنجاح!
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md mx-auto">
              شكراً يا <strong>{fullName || 'أستاذنا الفاضل'}</strong>. سيقوم فريق مراجعة جودة التدريس بفحص بياناتك والتواصل معك عبر الواتساب على رقمك <strong>{phone}</strong> لتفعيل حسابك وتحديد موعد المقابلة التعارفية.
            </p>
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs text-neutral-500 text-right space-y-1">
              <div className="flex justify-between font-medium">
                <span>المادة المسجلة:</span>
                <span className="text-neutral-900">{subject}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>سعر الحصة المقترح:</span>
                <span className="text-emerald-700 font-bold">{hourlyRate} ريال / ساعة</span>
              </div>
            </div>
            <button
              onClick={handleResetAndClose}
              className="mt-4 px-8 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              تم، حسناً
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Step Indicators */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 text-xs font-semibold">
              <span className={step >= 1 ? 'text-emerald-700 font-bold' : 'text-neutral-400'}>
                1. البيانات الشخصية
              </span>
              <span className="text-neutral-300">←</span>
              <span className={step >= 2 ? 'text-emerald-700 font-bold' : 'text-neutral-400'}>
                2. التخصص والخبرة
              </span>
              <span className="text-neutral-300">←</span>
              <span className={step >= 3 ? 'text-emerald-700 font-bold' : 'text-neutral-400'}>
                3. الأسعار والجدول
              </span>
            </div>

            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">الاسم الكامل (كما في الهوية)</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: أ. محمد العتيبي"
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">البريد الإلكتروني</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="teacher@example.com"
                      className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">رقم الجوال (واتساب)</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05xxxxxxxx"
                      className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">المدينة ومكان الإقامة</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs"
                  >
                    <option value="الرياض">الرياض</option>
                    <option value="جدة">جدة</option>
                    <option value="الدمام والخبر">الدمام والخبر</option>
                    <option value="مكة المكرمة">مكة المكرمة</option>
                    <option value="المدينة المنورة">المدينة المنورة</option>
                    <option value="مدينة أخرى">مدينة أخرى</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Specialization & Experience */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">المادة الأساسية التي تدرّسها</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs"
                  >
                    <option value="رياضيات">رياضيات (كافة المراحل)</option>
                    <option value="فيزياء">فيزياء</option>
                    <option value="لغة إنجليزية">لغة إنجليزية وآيلتس</option>
                    <option value="كيمياء">كيمياء</option>
                    <option value="أحياء وعلوم">أحياء وعلوم</option>
                    <option value="لغة عربية">لغة عربية ونحو</option>
                    <option value="حاسب آلي وبرمجة">حاسب وبرمجة</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">سنوات الخبرة في التدريس</label>
                    <input
                      type="number"
                      min="1"
                      max="35"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">طريقة التدريس المفضلة</label>
                    <select
                      value={teachingMode}
                      onChange={(e) => setTeachingMode(e.target.value)}
                      className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs"
                    >
                      <option value="both">أونلاين وحضوري معاً</option>
                      <option value="online">أونلاين فقط</option>
                      <option value="in_person">حضوري فقط</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600">
                  سيُطلب منك في الخطوة التالية رفع صورة الهوية الوطنية والمؤهل الجامعي لإتمام عملية التوثيق.
                </div>
              </div>
            )}

            {/* Step 3: Rates and Final Submit */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">سعر الحصة المقترح (ريال / ساعة)</label>
                  <input
                    type="number"
                    min="50"
                    max="400"
                    step="5"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono font-bold"
                  />
                  <span className="text-[11px] text-neutral-500 block mt-1">
                    يمكنك تعديل هذا السعر في أي وقت لاحقاً من لوحة تحكم المعلم.
                  </span>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-neutral-700 space-y-2">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>تأكيد الالتزام المهني</span>
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-relaxed">
                    بالنقر على "إرسال طلب الانضمام"، فإنك تقر بصحة البيانات المقدمة والموافقة على سياسة الجودة وميثاق التعامل مع الطلاب في منصة مَسار.
                  </p>
                </div>
              </div>
            )}

            {/* Modal Controls */}
            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-neutral-100 rounded-lg cursor-pointer"
                >
                  السابق
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (step === 1 && (!fullName || !phone)) {
                      alert('يرجى ملء الاسم الكامل ورقم الجوال للمتابعة');
                      return;
                    }
                    setStep(step + 1);
                  }}
                  className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>التالي</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm cursor-pointer"
                >
                  إرسال طلب الانضمام
                </button>
              )}
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
