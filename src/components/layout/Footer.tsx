import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, ArrowUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { Container } from '@/components/ui/Container';
import { BRAND_CONFIG } from '@/config/brand';
import { usePlatform } from '@/context/PlatformContext';

interface FooterProps {
  onOpenAuthModal?: (role?: 'student' | 'teacher') => void;
  onOpenAuth?: (role?: 'student' | 'tutor') => void;
  onOpenJoinTeacher?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAuthModal,
  onOpenAuth,
  onOpenJoinTeacher,
}) => {
  const { navigate } = usePlatform();

  const triggerAuth = (role: 'student' | 'teacher' = 'student') => {
    if (onOpenAuthModal) {
      onOpenAuthModal(role);
    } else if (onOpenAuth) {
      onOpenAuth(role === 'teacher' ? 'tutor' : 'student');
    }
  };

  const triggerJoinTeacher = () => {
    if (onOpenJoinTeacher) {
      onOpenJoinTeacher();
    } else {
      triggerAuth('teacher');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs border-t border-neutral-800">
      <Container size="wide" className="py-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800 text-right">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="white" />
            
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              {BRAND_CONFIG.description}
            </p>

            <div className="pt-2 space-y-2 text-neutral-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span dir="ltr">{BRAND_CONFIG.supportEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span dir="ltr">{BRAND_CONFIG.supportPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{BRAND_CONFIG.address}</span>
              </div>
            </div>
          </div>

          {/* مسار (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white mb-2">مَسار</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  من نحن
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/why-us')}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  لماذا مسار؟
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  كيف تعمل المنصة
                </button>
              </li>
            </ul>
          </div>

          {/* للطلاب (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white mb-2">للطلاب وأولياء الأمور</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => navigate('/tutors')}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  دليل المدرسين
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/request-tutor')}
                  className="hover:text-white transition-colors text-emerald-400 font-semibold cursor-pointer text-right"
                >
                  احجز مدرس الآن
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/faq')}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  الأسئلة الشائعة
                </button>
              </li>
            </ul>
          </div>

          {/* للمدرسين (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white mb-2">للمدرسين</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => triggerJoinTeacher()}
                  className="hover:text-white transition-colors text-emerald-400 font-bold cursor-pointer text-right"
                >
                  انضم كمدرس
                </button>
              </li>
              <li>
                <button
                  onClick={() => triggerAuth('teacher')}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  تسجيل دخول المدرس
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/faq')}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  مركز المساعدة
                </button>
              </li>
            </ul>
          </div>

          {/* قانوني وموارد (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white mb-2">الموارد والقانوني</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => navigate('/blog')}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  المدونة التعليمية
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/faq')}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  سياسة الخصوصية
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/faq')}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  الشروط والأحكام
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/faq')}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  سياسة الإلغاء والاسترداد
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-right">
            <span>© {new Date().getFullYear()} {BRAND_CONFIG.name}. جميع الحقوق محفوظة.</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>دفع إلكتروني آمن 100% · مدى · فيزا · ماستركارد · Apple Pay</span>
            </div>
            <span aria-hidden="true" className="text-neutral-700 hidden sm:inline">·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <span>العودة للأعلى</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </Container>
    </footer>
  );
};
