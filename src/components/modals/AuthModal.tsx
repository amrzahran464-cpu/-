import React, { useState } from 'react';
import { X, User, GraduationCap, BookOpen, CheckCircle2, Lock, Mail, ArrowLeft } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'student' | 'tutor';
  onSwitchToJoinTutor?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'student',
  onSwitchToJoinTutor,
}) => {
  const [role, setRole] = useState<'student' | 'tutor'>(defaultRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-neutral-200 overflow-hidden text-right">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/80">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">
              تسجيل الدخول إلى مَسار
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              متابعة الحصص، الجداول، والدفعات المالية
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Switcher */}
        <div className="p-4 bg-neutral-100/70 border-b border-neutral-200">
          <div className="grid grid-cols-2 gap-2 bg-neutral-200/80 p-1 rounded-xl">
            <button
              onClick={() => setRole('student')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                role === 'student'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>طالب أو ولي أمر</span>
            </button>

            <button
              onClick={() => setRole('tutor')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                role === 'tutor'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>مدرس خصوصي</span>
            </button>
          </div>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">
              مرحباً بك مجدداً!
            </h3>
            <p className="text-xs text-neutral-500">
              جارٍ توجيهك إلى لوحة التحكم الخاصة بـ {role === 'student' ? 'الطالب' : 'المدرس'}...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                البريد الإلكتروني أو رقم الجوال
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com أو 05xxxxxxxx"
                  className="w-full pl-3 pr-10 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white"
                  dir="ltr"
                />
                <Mail className="w-4 h-4 text-neutral-400 absolute right-3.5 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-neutral-700">كلمة المرور</label>
                <a href="#" className="text-[11px] text-emerald-700 hover:underline">
                  نسيت كلمة المرور؟
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-3 pr-10 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 focus:bg-white"
                  dir="ltr"
                />
                <Lock className="w-4 h-4 text-neutral-400 absolute right-3.5 top-3" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-600 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500" />
                <span>تذكر تسجيل دخولي</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>دخول إلى الحساب</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            {role === 'tutor' && onSwitchToJoinTutor && (
              <div className="pt-3 text-center text-xs text-neutral-500 border-t border-neutral-100">
                <span>ليس لديك حساب مدرس بعد؟ </span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSwitchToJoinTutor();
                  }}
                  className="text-emerald-700 font-bold hover:underline"
                >
                  انضم إلينا كمدرس الآن
                </button>
              </div>
            )}
          </form>
        )}

      </div>
    </div>
  );
};
