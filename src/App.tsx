/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PlatformProvider, usePlatform } from '@/context/PlatformContext';
import AboutPage from '@/app/about/page';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HomeHero } from '@/components/home/HomeHero';
import { PopularSubjects } from '@/components/home/PopularSubjects';
import { PopularSystems } from '@/components/home/PopularSystems';
import { FeaturedTutors } from '@/components/home/FeaturedTutors';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { WhyChooseUs } from '@/components/about/WhyChooseUs';
import { HowItWorks } from '@/components/about/HowItWorks';
import { StatsSection } from '@/components/about/StatsSection';
import { AboutCTA } from '@/components/about/AboutCTA';
import { TutorsDirectory } from '@/components/tutors/TutorsDirectory';
import { TutorProfileView } from '@/components/tutors/TutorProfileView';
import { HowItWorksPage } from '@/components/pages/HowItWorksPage';
import { WhyUsPage } from '@/components/pages/WhyUsPage';
import { FaqPage } from '@/components/pages/FaqPage';
import { BlogPage } from '@/components/pages/BlogPage';
import { RequestTutorForm } from '@/components/booking/RequestTutorForm';
import { BookingFlow } from '@/components/booking/BookingFlow';
import { StudentDashboard } from '@/components/dashboard/StudentDashboard';
import { TeacherDashboard } from '@/components/dashboard/TeacherDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { TutorSearchModal } from '@/components/modals/TutorSearchModal';
import { JoinTutorModal } from '@/components/modals/JoinTutorModal';
import { AuthModal } from '@/components/modals/AuthModal';
import { TutorProfile } from '@/types/platform';
import { Sparkles, ArrowLeft, BookOpen } from 'lucide-react';

function AppRouter() {
  const { currentPath, navigate, tutors, selectedTutorSlug, selectedBlogSlug } = usePlatform();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isJoinTutorOpen, setIsJoinTutorOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState<'student' | 'tutor'>('student');
  const [bookingTutor, setBookingTutor] = useState<TutorProfile | null>(null);

  const handleOpenAuth = (role: 'student' | 'tutor' = 'student') => {
    setAuthRole(role);
    setIsAuthOpen(true);
  };

  const handleBookTutor = (tutor: TutorProfile) => {
    setBookingTutor(tutor);
  };

  // Helper for quick banner
  const isAboutRoute = currentPath === '/about';

  // Render current view based on currentPath
  const renderContent = () => {
    // 1. Dedicated About Us Page (Primary Requested Route)
    if (currentPath === '/about') {
      return (
        <AboutPage
          onOpenAuth={handleOpenAuth}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
        />
      );
    }

    // 2. Specific Tutor Detail Page
    if (currentPath.startsWith('/tutors/') || selectedTutorSlug) {
      const slug = selectedTutorSlug || currentPath.replace('/tutors/', '');
      const tutor = tutors.find((t) => t.slug === slug) || tutors[0];
      return (
        <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-emerald-500 selection:text-white">
          <Navbar
            onOpenAuth={handleOpenAuth}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
          />
          <main className="flex-1">
            <TutorProfileView tutor={tutor} onBook={() => handleBookTutor(tutor)} />
          </main>
          <Footer
            onOpenAuth={handleOpenAuth}
            onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
          />
        </div>
      );
    }

    // 3. Tutors Directory Page
    if (currentPath === '/tutors') {
      return (
        <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-emerald-500 selection:text-white">
          <Navbar
            onOpenAuth={handleOpenAuth}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
          />
          <main className="flex-1">
            <TutorsDirectory onBookTutor={handleBookTutor} />
          </main>
          <Footer
            onOpenAuth={handleOpenAuth}
            onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
          />
        </div>
      );
    }

    // 4. How It Works Page
    if (currentPath === '/how-it-works') {
      return (
        <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-emerald-500 selection:text-white">
          <Navbar
            onOpenAuth={handleOpenAuth}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
          />
          <main className="flex-1">
            <HowItWorksPage />
          </main>
          <Footer
            onOpenAuth={handleOpenAuth}
            onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
          />
        </div>
      );
    }

    // 5. Why Masar Page
    if (currentPath === '/why-us') {
      return (
        <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-emerald-500 selection:text-white">
          <Navbar
            onOpenAuth={handleOpenAuth}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
          />
          <main className="flex-1">
            <WhyUsPage />
          </main>
          <Footer
            onOpenAuth={handleOpenAuth}
            onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
          />
        </div>
      );
    }

    // 6. FAQs Page
    if (currentPath === '/faq') {
      return (
        <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-emerald-500 selection:text-white">
          <Navbar
            onOpenAuth={handleOpenAuth}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
          />
          <main className="flex-1">
            <FaqPage />
          </main>
          <Footer
            onOpenAuth={handleOpenAuth}
            onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
          />
        </div>
      );
    }

    // 7. Blog Page
    if (currentPath === '/blog' || currentPath.startsWith('/blog/')) {
      const slug = selectedBlogSlug || (currentPath.startsWith('/blog/') ? currentPath.replace('/blog/', '') : undefined);
      return (
        <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-emerald-500 selection:text-white">
          <Navbar
            onOpenAuth={handleOpenAuth}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
          />
          <main className="flex-1">
            <BlogPage postSlug={slug} />
          </main>
          <Footer
            onOpenAuth={handleOpenAuth}
            onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
          />
        </div>
      );
    }

    // 8. Custom Request Tutor Form
    if (currentPath === '/request-tutor') {
      return (
        <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-emerald-500 selection:text-white">
          <Navbar
            onOpenAuth={handleOpenAuth}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
          />
          <main className="flex-1">
            <RequestTutorForm />
          </main>
          <Footer
            onOpenAuth={handleOpenAuth}
            onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
          />
        </div>
      );
    }

    // 9. Student Dashboard
    if (currentPath === '/student/dashboard') {
      return (
        <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-emerald-500 selection:text-white">
          <Navbar
            onOpenAuth={handleOpenAuth}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
          />
          <main className="flex-1">
            <StudentDashboard />
          </main>
          <Footer
            onOpenAuth={handleOpenAuth}
            onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
          />
        </div>
      );
    }

    // 10. Teacher Dashboard
    if (currentPath === '/teacher/dashboard') {
      return (
        <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-emerald-500 selection:text-white">
          <Navbar
            onOpenAuth={handleOpenAuth}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
          />
          <main className="flex-1">
            <TeacherDashboard />
          </main>
          <Footer
            onOpenAuth={handleOpenAuth}
            onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
          />
        </div>
      );
    }

    // 11. Admin Dashboard
    if (currentPath === '/admin') {
      return (
        <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-emerald-500 selection:text-white">
          <Navbar
            onOpenAuth={handleOpenAuth}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
          />
          <main className="flex-1">
            <AdminDashboard />
          </main>
          <Footer
            onOpenAuth={handleOpenAuth}
            onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
          />
        </div>
      );
    }

    // 12. Home Page (Default /)
    return (
      <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-emerald-500 selection:text-white">
        <Navbar
          onOpenAuth={handleOpenAuth}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
        />
        <main className="flex-1">
          <HomeHero />
          <PopularSubjects />
          <PopularSystems />
          <FeaturedTutors onBookTutor={handleBookTutor} />
          <WhyChooseUs />
          <HowItWorks />
          <TestimonialsSection />
          <StatsSection />
          <AboutCTA
            onExploreClick={() => navigate('/tutors')}
            onJoinTeacherClick={() => setIsJoinTutorOpen(true)}
          />
        </main>
        <Footer
          onOpenAuth={handleOpenAuth}
          onOpenJoinTeacher={() => setIsJoinTutorOpen(true)}
        />
      </div>
    );
  };

  return (
    <>
      {/* Quick Navigation Notification Banner between About Us and Full Platform */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white text-xs py-2 px-4 shadow-sm border-b border-emerald-800/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500 text-neutral-950">
              {isAboutRoute ? 'صفحة من نحن' : 'منصة مسار التعليمية'}
            </span>
            <span className="hidden sm:inline text-emerald-200">
              {isAboutRoute
                ? 'أنت تتصفح صفحة «من نحن» الرسمية لمنصة مسار'
                : 'استكشف رؤيتنا ورسالتنا وكيف تساعدك مسار في حجز أفضل المدرسين'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isAboutRoute ? (
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] transition-colors cursor-pointer"
              >
                <span>الانتقال للرئيسية وحجز المدرسين</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => navigate('/about')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-[11px] transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>عرض صفحة «من نحن»</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {renderContent()}

      {/* Interactive Tutor Search Modal */}
      <TutorSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Interactive Join as Teacher Modal */}
      <JoinTutorModal
        isOpen={isJoinTutorOpen}
        onClose={() => setIsJoinTutorOpen(false)}
      />

      {/* Interactive Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        defaultRole={authRole}
        onSwitchToJoinTutor={() => setIsJoinTutorOpen(true)}
      />

      {/* Interactive Direct Booking Flow Modal */}
      {bookingTutor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 my-8 animate-in zoom-in-95 duration-150">
            <BookingFlow
              tutor={bookingTutor}
              onFinished={() => setBookingTutor(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <PlatformProvider>
      <AppRouter />
    </PlatformProvider>
  );
}
