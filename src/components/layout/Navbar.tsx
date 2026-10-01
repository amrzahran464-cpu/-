'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Calendar,
  MessageSquare,
  Bell,
  LayoutDashboard,
  Sparkles,
  BookOpen,
  GraduationCap,
  ArrowLeft,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { usePlatform } from '@/context/PlatformContext';

interface NavbarProps {
  onOpenAuthModal?: (defaultRole?: 'student' | 'teacher') => void;
  onOpenAuth?: (role?: 'student' | 'tutor') => void;
  onOpenSearch?: () => void;
  onOpenJoinTeacher?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuthModal,
  onOpenAuth,
  onOpenSearch,
  onOpenJoinTeacher,
}) => {
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
  const {
    currentPath,
    navigate,
    currentUser,
    logout,
    login,
    categories,
    educationalSystems,
    setSearchFilters,
    bookings,
  } = usePlatform();

  const [tutorsMegaOpen, setTutorsMegaOpen] = useState(false);
  const [systemsMegaOpen, setSystemsMegaOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTutorsAccordion, setMobileTutorsAccordion] = useState(false);
  const [mobileSystemsAccordion, setMobileSystemsAccordion] = useState(false);

  const tutorsRef = useRef<HTMLDivElement>(null);
  const systemsRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close mega menus on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (tutorsRef.current && !tutorsRef.current.contains(e.target as Node)) {
        setTutorsMegaOpen(false);
      }
      if (systemsRef.current && !systemsRef.current.contains(e.target as Node)) {
        setSystemsMegaOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSubjectClick = (subjectName: string) => {
    setTutorsMegaOpen(false);
    setMobileMenuOpen(false);
    setSearchFilters((prev) => ({ ...prev, subject: subjectName }));
    navigate('/tutors');
  };

  const handleSystemClick = (systemName: string) => {
    setSystemsMegaOpen(false);
    setMobileMenuOpen(false);
    setSearchFilters((prev) => ({ ...prev, system: systemName }));
    navigate('/tutors');
  };

  const activeBookingsCount = bookings.filter((b) => b.status === 'confirmed').length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 transition-all">
      <Container size="wide">
        <div className="flex items-center justify-between h-20">
          
          {/* Right Zone: Brand Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className="text-right focus:outline-none cursor-pointer"
            >
              <Logo />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-5 text-sm font-semibold text-neutral-700">
              
              {/* الرئيسية */}
              <button
                onClick={() => navigate('/')}
                className={`py-2 px-1 transition-colors hover:text-emerald-700 cursor-pointer ${
                  currentPath === '/' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
                }`}
              >
                الرئيسية
              </button>

              {/* المدرسين Mega Menu */}
              <div ref={tutorsRef} className="relative">
                <button
                  onClick={() => {
                    setTutorsMegaOpen(!tutorsMegaOpen);
                    setSystemsMegaOpen(false);
                  }}
                  className={`flex items-center gap-1.5 py-2 px-1 transition-colors hover:text-emerald-700 cursor-pointer ${
                    tutorsMegaOpen || currentPath === '/tutors' ? 'text-emerald-700 font-bold' : ''
                  }`}
                >
                  <span>المدرسين</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${tutorsMegaOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Mega Menu */}
                {tutorsMegaOpen && (
                  <div className="absolute top-full right-0 mt-3 w-[780px] bg-white rounded-3xl shadow-2xl border border-neutral-200 p-6 z-50 text-right animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100">
                      <div>
                        <h4 className="text-base font-extrabold text-neutral-900">تصفح المدرسين حسب التخصص</h4>
                        <p className="text-xs text-neutral-500">اختر المادة لتصفح المدرسين المعتمدين والمتاحين فوراً</p>
                      </div>
                      <Button
                        variant="emerald"
                        size="sm"
                        onClick={() => {
                          setTutorsMegaOpen(false);
                          navigate('/tutors');
                        }}
                      >
                        <span>كافة المدرسين (+30)</span>
                        <ArrowLeft className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      {categories.map((cat) => (
                        <div key={cat.id} className="space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800 pb-1 border-b border-neutral-100">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{cat.name}</span>
                          </div>
                          <ul className="space-y-1">
                            {cat.subjects.slice(0, 5).map((sub) => (
                              <li key={sub.id}>
                                <button
                                  onClick={() => handleSubjectClick(sub.name)}
                                  className="text-xs text-neutral-600 hover:text-emerald-700 hover:bg-emerald-50/70 p-1.5 rounded-lg w-full text-right transition-colors flex items-center justify-between group cursor-pointer"
                                >
                                  <span>{sub.name}</span>
                                  <span className="text-[10px] text-neutral-400 group-hover:text-emerald-600">
                                    {sub.tutorsCount}+
                                  </span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* الأنظمة الدراسية Mega Menu */}
              <div ref={systemsRef} className="relative">
                <button
                  onClick={() => {
                    setSystemsMegaOpen(!systemsMegaOpen);
                    setTutorsMegaOpen(false);
                  }}
                  className={`flex items-center gap-1.5 py-2 px-1 transition-colors hover:text-emerald-700 cursor-pointer ${
                    systemsMegaOpen ? 'text-emerald-700 font-bold' : ''
                  }`}
                >
                  <span>الأنظمة الدراسية</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${systemsMegaOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Systems Dropdown Mega Menu */}
                {systemsMegaOpen && (
                  <div className="absolute top-full right-0 mt-3 w-[720px] bg-white rounded-3xl shadow-2xl border border-neutral-200 p-6 z-50 text-right animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-100">
                      <div>
                        <h4 className="text-base font-extrabold text-neutral-900">الأنظمة والمناهج الدراسية المعتمدة</h4>
                        <p className="text-xs text-neutral-500">نغطي كافة المناهج المحلية والدولية من الروضة حتى الجامعة</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-5">
                      {educationalSystems.map((sys) => (
                        <div
                          key={sys.id}
                          className="p-3.5 rounded-2xl border border-neutral-100 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all cursor-pointer group"
                          onClick={() => handleSystemClick(sys.name)}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                              {sys.name.slice(0, 1)}
                            </div>
                            <h5 className="text-xs font-bold text-neutral-900 group-hover:text-emerald-700">
                              {sys.name}
                            </h5>
                          </div>
                          <p className="text-[11px] text-neutral-500 line-clamp-2">
                            {sys.description}
                          </p>
                          <div className="mt-2 text-[10px] font-semibold text-emerald-700">
                            {sys.stages.length} مراحل دراسية ←
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* من نحن؟ */}
              <button
                onClick={() => navigate('/about')}
                className={`py-2 px-1 transition-colors hover:text-emerald-700 cursor-pointer ${
                  currentPath === '/about' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
                }`}
              >
                من نحن؟
              </button>

              {/* لماذا مسار؟ */}
              <button
                onClick={() => navigate('/why-us')}
                className={`py-2 px-1 transition-colors hover:text-emerald-700 cursor-pointer ${
                  currentPath === '/why-us' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
                }`}
              >
                لماذا مسار؟
              </button>

              {/* كيف تعمل المنصة؟ */}
              <button
                onClick={() => navigate('/how-it-works')}
                className={`py-2 px-1 transition-colors hover:text-emerald-700 cursor-pointer ${
                  currentPath === '/how-it-works' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
                }`}
              >
                كيف تعمل المنصة؟
              </button>

              {/* الأسئلة الشائعة */}
              <button
                onClick={() => navigate('/faq')}
                className={`py-2 px-1 transition-colors hover:text-emerald-700 cursor-pointer ${
                  currentPath === '/faq' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
                }`}
              >
                الأسئلة الشائعة
              </button>

              {/* المدونة */}
              <button
                onClick={() => navigate('/blog')}
                className={`py-2 px-1 transition-colors hover:text-emerald-700 cursor-pointer ${
                  currentPath === '/blog' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
                }`}
              >
                المدونة
              </button>
            </nav>
          </div>

          {/* Left Zone: Action Buttons & User Profile */}
          <div className="flex items-center gap-3">
            
            {/* Direct CTA: احجز مدرس الآن */}
            <Button
              variant="emerald"
              size="default"
              onClick={() => navigate('/request-tutor')}
              className="hidden sm:inline-flex shadow-sm hover:shadow-md font-extrabold"
            >
              <span>احجز مدرس الآن</span>
              <ArrowLeft className="w-4 h-4 ml-1" />
            </Button>

            {/* User Account / Auth Dropdown */}
            {currentUser ? (
              <div ref={userRef} className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200/80 transition-colors cursor-pointer border border-neutral-200"
                >
                  <div className="w-7 h-7 rounded-xl overflow-hidden bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {currentUser.avatar ? (
                      <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                    ) : (
                      currentUser.name.charAt(0)
                    )}
                  </div>
                  <div className="hidden md:flex flex-col text-right leading-tight">
                    <span className="text-xs font-bold text-neutral-900 truncate max-w-[110px]">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold">
                      {currentUser.role === 'student' ? 'حساب طالب' : currentUser.role === 'teacher' ? 'حساب مدرس' : 'مدير المنصة'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                </button>

                {/* Dropdown Menu for Authenticated User */}
                {userDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-neutral-200 p-2 z-50 text-right animate-in fade-in duration-100">
                    {/* User Summary */}
                    <div className="p-3 border-b border-neutral-100 bg-neutral-50 rounded-xl mb-1.5">
                      <p className="text-xs font-bold text-neutral-900">{currentUser.name}</p>
                      <p className="text-[11px] text-neutral-500 truncate" dir="ltr">{currentUser.email}</p>
                      
                      {/* Fast Role Switcher */}
                      <div className="mt-2 pt-2 border-t border-neutral-200 flex items-center justify-between text-[10px]">
                        <span className="text-neutral-500">تبديل الحساب:</span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => { login('student'); setUserDropdownOpen(false); }}
                            className={`px-1.5 py-0.5 rounded ${currentUser.role === 'student' ? 'bg-emerald-600 text-white font-bold' : 'bg-neutral-200 text-neutral-700'}`}
                          >
                            طالب
                          </button>
                          <button
                            onClick={() => { login('teacher'); setUserDropdownOpen(false); }}
                            className={`px-1.5 py-0.5 rounded ${currentUser.role === 'teacher' ? 'bg-emerald-600 text-white font-bold' : 'bg-neutral-200 text-neutral-700'}`}
                          >
                            مدرس
                          </button>
                          <button
                            onClick={() => { login('admin'); setUserDropdownOpen(false); }}
                            className={`px-1.5 py-0.5 rounded ${currentUser.role === 'admin' ? 'bg-emerald-600 text-white font-bold' : 'bg-neutral-200 text-neutral-700'}`}
                          >
                            إدارة
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-0.5 text-xs font-semibold text-neutral-700">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          if (currentUser.role === 'teacher') navigate('/teacher/dashboard');
                          else if (currentUser.role === 'admin') navigate('/admin');
                          else navigate('/student/dashboard');
                        }}
                        className="w-full flex items-center gap-2 p-2 hover:bg-neutral-100 rounded-xl text-right transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                        <span>لوحة التحكم الرئيسية</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigate(currentUser.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard');
                        }}
                        className="w-full flex items-center justify-between p-2 hover:bg-neutral-100 rounded-xl text-right transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-emerald-600" />
                          <span>الحجوزات والدروس</span>
                        </div>
                        {activeBookingsCount > 0 && (
                          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center">
                            {activeBookingsCount}
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigate(currentUser.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard');
                        }}
                        className="w-full flex items-center gap-2 p-2 hover:bg-neutral-100 rounded-xl text-right transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 text-emerald-600" />
                        <span>الرسائل والمحادثات</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigate('/admin');
                        }}
                        className="w-full flex items-center gap-2 p-2 hover:bg-neutral-100 rounded-xl text-right transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>لوحة Admin</span>
                      </button>

                      <div className="pt-1 mt-1 border-t border-neutral-100">
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                            navigate('/');
                          }}
                          className="w-full flex items-center gap-2 p-2 hover:bg-rose-50 text-rose-700 rounded-xl text-right transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>تسجيل الخروج</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => triggerAuth('student')}
                  className="font-bold text-neutral-700"
                >
                  <User className="w-4 h-4 ml-1" />
                  <span>تسجيل الدخول</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => triggerJoinTeacher()}
                  className="font-bold hidden sm:inline-flex"
                >
                  انضم كمدرس
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl hover:bg-neutral-100 text-neutral-800 transition-colors"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </Container>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-neutral-200 px-4 pt-3 pb-8 shadow-2xl max-h-[85vh] overflow-y-auto text-right animate-in slide-in-from-top-2">
          <div className="space-y-1 mb-4">
            
            <button
              onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
              className="w-full p-2.5 rounded-xl text-sm font-bold text-neutral-800 hover:bg-emerald-50 text-right"
            >
              الرئيسية
            </button>

            {/* Mobile Tutors Accordion */}
            <div className="border-b border-neutral-100 pb-1">
              <button
                onClick={() => setMobileTutorsAccordion(!mobileTutorsAccordion)}
                className="w-full p-2.5 rounded-xl text-sm font-bold text-neutral-800 hover:bg-emerald-50 flex items-center justify-between text-right"
              >
                <span>تصفح المدرسين</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileTutorsAccordion ? 'rotate-180' : ''}`} />
              </button>
              {mobileTutorsAccordion && (
                <div className="pr-4 py-2 space-y-1.5 text-xs text-neutral-600 bg-neutral-50 rounded-xl p-3">
                  {categories.map((cat) => (
                    <div key={cat.id} className="py-1">
                      <span className="font-bold text-emerald-800 block mb-1">{cat.name}:</span>
                      <div className="grid grid-cols-2 gap-1">
                        {cat.subjects.slice(0, 4).map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => handleSubjectClick(sub.name)}
                            className="p-1 hover:text-emerald-700 text-right truncate"
                          >
                            • {sub.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Systems Accordion */}
            <div className="border-b border-neutral-100 pb-1">
              <button
                onClick={() => setMobileSystemsAccordion(!mobileSystemsAccordion)}
                className="w-full p-2.5 rounded-xl text-sm font-bold text-neutral-800 hover:bg-emerald-50 flex items-center justify-between text-right"
              >
                <span>الأنظمة الدراسية</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSystemsAccordion ? 'rotate-180' : ''}`} />
              </button>
              {mobileSystemsAccordion && (
                <div className="pr-4 py-2 space-y-1 text-xs text-neutral-600 bg-neutral-50 rounded-xl p-3">
                  {educationalSystems.map((sys) => (
                    <button
                      key={sys.id}
                      onClick={() => handleSystemClick(sys.name)}
                      className="w-full text-right p-1.5 hover:text-emerald-700 font-semibold block"
                    >
                      {sys.name} ({sys.country})
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => { navigate('/about'); setMobileMenuOpen(false); }}
              className="w-full p-2.5 rounded-xl text-sm font-bold text-neutral-800 hover:bg-emerald-50 text-right"
            >
              من نحن؟
            </button>

            <button
              onClick={() => { navigate('/why-us'); setMobileMenuOpen(false); }}
              className="w-full p-2.5 rounded-xl text-sm font-bold text-neutral-800 hover:bg-emerald-50 text-right"
            >
              لماذا مسار؟
            </button>

            <button
              onClick={() => { navigate('/how-it-works'); setMobileMenuOpen(false); }}
              className="w-full p-2.5 rounded-xl text-sm font-bold text-neutral-800 hover:bg-emerald-50 text-right"
            >
              كيف تعمل المنصة؟
            </button>

            <button
              onClick={() => { navigate('/faq'); setMobileMenuOpen(false); }}
              className="w-full p-2.5 rounded-xl text-sm font-bold text-neutral-800 hover:bg-emerald-50 text-right"
            >
              الأسئلة الشائعة
            </button>

            <button
              onClick={() => { navigate('/blog'); setMobileMenuOpen(false); }}
              className="w-full p-2.5 rounded-xl text-sm font-bold text-neutral-800 hover:bg-emerald-50 text-right"
            >
              المدونة
            </button>
          </div>

          <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
            <Button
              variant="emerald"
              onClick={() => { navigate('/request-tutor'); setMobileMenuOpen(false); }}
              className="w-full justify-center"
            >
              <span>احجز مدرس الآن</span>
              <ArrowLeft className="w-4 h-4 ml-1" />
            </Button>

            {!currentUser && (
              <div className="grid grid-cols-2 gap-2 mt-1">
                <Button
                  variant="outline"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    triggerAuth('student');
                  }}
                  className="w-full justify-center text-xs"
                >
                  تسجيل الدخول
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    triggerJoinTeacher();
                  }}
                  className="w-full justify-center text-xs"
                >
                  انضم كمدرس
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
