import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutIntro } from '@/components/about/AboutIntro';
import { VisionMission } from '@/components/about/VisionMission';
import { WhyChooseUs } from '@/components/about/WhyChooseUs';
import { HowItWorks } from '@/components/about/HowItWorks';
import { StatsSection } from '@/components/about/StatsSection';
import { ForStudents } from '@/components/about/ForStudents';
import { ForTeachers } from '@/components/about/ForTeachers';
import { AboutCTA } from '@/components/about/AboutCTA';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: `من نحن | ${SITE_CONFIG.shortName}`,
  description: `تعرف على ${SITE_CONFIG.name} وكيف نساعد الطلاب وأولياء الأمور في الوصول إلى مدرسين خصوصيين معتمدين أونلاين وحضوري بكل سهولة وأمان.`,
  alternates: {
    canonical: `${SITE_CONFIG.url}/about`,
  },
  openGraph: {
    title: `من نحن | ${SITE_CONFIG.shortName}`,
    description: `تعرف على ${SITE_CONFIG.name} وكيف نساعد الطلاب وأولياء الأمور في الوصول إلى مدرسين خصوصيين معتمدين أونلاين وحضوري.`,
    url: `${SITE_CONFIG.url}/about`,
    siteName: SITE_CONFIG.name,
    locale: 'ar_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `من نحن | ${SITE_CONFIG.shortName}`,
    description: `تعرف على ${SITE_CONFIG.name} وكيف نساعد الطلاب وأولياء الأمور في الوصول إلى مدرسين خصوصيين أونلاين وحضوري.`,
  },
};

export default function AboutPage({
  onOpenAuth,
  onOpenSearch,
  onOpenJoinTeacher,
}: {
  onOpenAuth?: (role?: 'student' | 'tutor') => void;
  onOpenSearch?: () => void;
  onOpenJoinTeacher?: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        onOpenAuth={onOpenAuth}
        onOpenSearch={onOpenSearch}
        onOpenJoinTeacher={onOpenJoinTeacher}
      />

      {/* Main Content Container with Semantic Order */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <AboutHero
          onExploreClick={onOpenSearch}
          onJoinTeacherClick={onOpenJoinTeacher}
        />

        {/* 2. About Intro */}
        <AboutIntro />

        {/* 3. Vision & Mission */}
        <VisionMission />

        {/* 4. Why Choose Us */}
        <WhyChooseUs />

        {/* 5. How It Works */}
        <HowItWorks />

        {/* 6. Stats Section (values from data/about.ts) */}
        <StatsSection />

        {/* 7. For Students */}
        <ForStudents onSearchClick={onOpenSearch} />

        {/* 8. For Teachers */}
        <ForTeachers onJoinClick={onOpenJoinTeacher} />

        {/* 9. Final CTA */}
        <AboutCTA
          onExploreClick={onOpenSearch}
          onJoinTeacherClick={onOpenJoinTeacher}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenAuth={onOpenAuth}
        onOpenJoinTeacher={onOpenJoinTeacher}
      />
    </div>
  );
}
