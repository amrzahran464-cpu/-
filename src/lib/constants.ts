export const SITE_CONFIG = {
  name: 'مَسار للتعليم الخصوصي',
  shortName: 'مَسار',
  description: 'المنصة التقنية الأولى لحجز الدروس الخصوصية أونلاين وحضوري مع نخبة من أفضل المدرسين المعتمدين والموثوقين.',
  url: 'https://masar-edu.com',
  email: 'contact@masar-edu.com',
  phone: '+966 800 124 5678',
  address: 'الرياض، المملكة العربية السعودية',
  currency: 'ر.س',
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com',
  },
} as const;

export const NAV_LINKS = [
  { label: 'الرئيسية', href: '/' },
  { label: 'ابحث عن مدرس', href: '#search' },
  { label: 'كيف تعمل المنصة', href: '#how-it-works' },
  { label: 'من نحن', href: '/about' },
  { label: 'المدونة', href: '#blog' },
] as const;

export const FOOTER_LINKS = {
  platform: [
    { label: 'من نحن', href: '/about' },
    { label: 'كيف تعمل المنصة', href: '#how-it-works' },
    { label: 'المدرسين', href: '#teachers' },
    { label: 'الأسعار', href: '#pricing' },
  ],
  support: [
    { label: 'الأسئلة الشائعة', href: '#faq' },
    { label: 'تواصل معنا', href: '#contact' },
    { label: 'سياسة الخصوصية', href: '#privacy' },
    { label: 'الشروط والأحكام', href: '#terms' },
  ],
  teachers: [
    { label: 'انضم كمدرس', href: '#join-teacher' },
    { label: 'تسجيل دخول المدرس', href: '#teacher-login' },
  ],
} as const;
