export interface Tutor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  subject: string;
  stage: string;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  currency: string;
  deliveryType: 'both' | 'online' | 'in_person';
  city?: string;
  experienceYears: number;
  bio: string;
  badge?: string;
  availableNext: string;
}

export const sampleTutors: Tutor[] = [
  {
    id: 't1',
    name: 'أ. د. سارة القحطاني',
    title: 'أستاذة الرياضيات المتقدمة والإحصاء',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80',
    subject: 'رياضيات',
    stage: 'ثانوي وجامعي',
    rating: 4.95,
    reviewsCount: 142,
    hourlyRate: 140,
    currency: 'ريال',
    deliveryType: 'both',
    city: 'الرياض',
    experienceYears: 10,
    bio: 'حاصلة على ماجستير في الرياضيات التطبيقية، خبرة 10 سنوات في تبسيط مفاهيم التفاضل والتكامل والاستعداد لاختبارات التحصيلي.',
    badge: 'الأعلى تقييماً',
    availableNext: 'اليوم، 5:00 م'
  },
  {
    id: 't2',
    name: 'م. أحمد الشريف',
    title: 'معلم الفيزياء والقدرات العلمية',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
    subject: 'فيزياء',
    stage: 'ثانوي وقدرات',
    rating: 4.9,
    reviewsCount: 98,
    hourlyRate: 110,
    currency: 'ريال',
    deliveryType: 'online',
    city: 'جدة',
    experienceYears: 7,
    bio: 'مهندس ومحاضر فيزياء، متخصص في إكساب الطلاب مهارات حل المسائل الفيزيائية المعقدة واجتياز اختبارات القدرات بتفوق.',
    badge: 'معلم مميز',
    availableNext: 'غداً، 4:30 م'
  },
  {
    id: 't3',
    name: 'أ. منى رضوان',
    title: 'معلمة اللغة الإنجليزية والآيلتس (IELTS)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&q=80',
    subject: 'لغة إنجليزية',
    stage: 'كافة المراحل وتأهيل دولي',
    rating: 4.98,
    reviewsCount: 215,
    hourlyRate: 130,
    currency: 'ريال',
    deliveryType: 'both',
    city: 'الرياض',
    experienceYears: 12,
    bio: 'معتمدة من جامعة كامبريدج (CELTA)، متخصصة في تطوير مهارات المحادثة والتأسيس الأكاديمي والتحضير لاختبار IELTS و TOEFL.',
    badge: 'خبير دولي',
    availableNext: 'غداً، 6:00 م'
  },
  {
    id: 't4',
    name: 'أ. طارق عبد الرحمن',
    title: 'معلم الكيمياء للمرحلة الثانوية والجامعية',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
    subject: 'كيمياء',
    stage: 'متوسط وثانوي',
    rating: 4.88,
    reviewsCount: 84,
    hourlyRate: 95,
    currency: 'ريال',
    deliveryType: 'in_person',
    city: 'الدمام والخبر',
    experienceYears: 8,
    bio: 'خبرة طويلة في المناهج الوزارية والدولية، مع التركيز على التجارب الحية وتبسيط المعادلات الكيميائية خطوة بخطوة.',
    availableNext: 'بعد غد، 5:00 م'
  },
  {
    id: 't5',
    name: 'أ. ريم الزهراني',
    title: 'معلمة الأحياء والعلوم الطبية التأسيسية',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80',
    subject: 'أحياء وعلوم',
    stage: 'متوسط وثانوي',
    rating: 4.92,
    reviewsCount: 110,
    hourlyRate: 105,
    currency: 'ريال',
    deliveryType: 'online',
    city: 'مكة المكرمة',
    experienceYears: 6,
    bio: 'متخصصة في إعداد رسوم توضيحية ثلاثية الأبعاد وشرح علوم الأحياء باسلوب شيق يثبت المعلومة ويسهل استذكارها في الاختبارات.',
    availableNext: 'اليوم، 7:30 م'
  },
  {
    id: 't6',
    name: 'أ. خالد التميمي',
    title: 'أستاذ اللغة العربية والنحو والبلاغة',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
    subject: 'لغة عربية',
    stage: 'ابتدائي ومتوسط وثانوي',
    rating: 4.96,
    reviewsCount: 167,
    hourlyRate: 90,
    currency: 'ريال',
    deliveryType: 'both',
    city: 'الرياض',
    experienceYears: 14,
    bio: 'معلم أول لغة عربية، تخصص إعراب ونحو وبلاغة وأسس كتابة المقال، مع أسلوب محبب يجعل الطالب يتقن القواعد بيسر.',
    badge: 'خبرة +14 عام',
    availableNext: 'اليوم، 8:00 م'
  }
];
