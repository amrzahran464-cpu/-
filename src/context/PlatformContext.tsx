import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  TutorProfile,
  BookingRecord,
  TutorReview,
  BlogPost,
  FAQItem,
  SubjectCategory,
  EducationalSystem,
  PlatformUser,
  UserRole,
} from '@/types/platform';
import {
  SEED_TUTORS,
  SEED_REVIEWS,
  SEED_BLOG_POSTS,
  SEED_FAQS,
  SUBJECT_CATEGORIES,
  EDUCATIONAL_SYSTEMS,
  CITIES_AND_AREAS,
} from '@/data/seedData';

interface BookingFilterState {
  subject?: string;
  stage?: string;
  system?: string;
  city?: string;
  deliveryType?: 'all' | 'online' | 'in_person';
  gender?: 'all' | 'male' | 'female';
  maxPrice?: number;
  minExperience?: number;
  availableNowOnly?: boolean;
  searchQuery?: string;
}

interface PlatformContextType {
  // Navigation / Route
  currentPath: string;
  navigate: (path: string) => void;

  // Auth
  currentUser: PlatformUser | null;
  login: (role: UserRole, email?: string) => void;
  logout: () => void;

  // Data
  tutors: TutorProfile[];
  reviews: TutorReview[];
  bookings: BookingRecord[];
  blogPosts: BlogPost[];
  faqs: FAQItem[];
  categories: SubjectCategory[];
  educationalSystems: EducationalSystem[];
  favorites: string[];

  // Actions
  toggleFavorite: (tutorId: string) => void;
  createBooking: (bookingData: Omit<BookingRecord, 'id' | 'bookingNumber' | 'createdAt'>) => BookingRecord;
  cancelBooking: (bookingId: string) => void;
  addReview: (review: Omit<TutorReview, 'id' | 'date' | 'isVerified'>) => void;
  updateTutorStatus: (tutorId: string, isVerified: boolean) => void;

  // Filter state for /tutors page
  searchFilters: BookingFilterState;
  setSearchFilters: React.Dispatch<React.SetStateAction<BookingFilterState>>;

  // Active tutor detail slug
  selectedTutorSlug: string | null;
  setSelectedTutorSlug: (slug: string | null) => void;

  // Active blog detail slug
  selectedBlogSlug: string | null;
  setSelectedBlogSlug: (slug: string | null) => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

const STORAGE_KEYS = {
  BOOKINGS: 'masar_edu_bookings_v2',
  REVIEWS: 'masar_edu_reviews_v2',
  FAVORITES: 'masar_edu_favorites_v2',
  USER: 'masar_edu_user_v2',
};

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state syncing with window.location.pathname / hash
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path && path !== '/' ? path : '/';
    }
    return '/';
  });

  const [selectedTutorSlug, setSelectedTutorSlug] = useState<string | null>(null);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);

  // Authenticated User: default to student for immediate rich interactive experience
  const [currentUser, setCurrentUser] = useState<PlatformUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default demo student user
    return {
      id: 'usr-student-demo',
      name: 'عبد الله الدوسري',
      email: 'abdullah@example.com',
      phone: '0501234567',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    };
  });

  // Data states
  const [tutors, setTutors] = useState<TutorProfile[]>(SEED_TUTORS);
  const [reviews, setReviews] = useState<TutorReview[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return SEED_REVIEWS;
  });

  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Initial sample bookings for the student
    return [
      {
        id: 'bk-demo-1',
        bookingNumber: 'MSR-88410',
        tutorId: 'tut-01',
        tutorName: 'أ. د. سارة القحطاني',
        tutorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
        tutorSubject: 'رياضيات - تفاضل وتكامل',
        studentId: 'usr-student-demo',
        studentName: 'عبد الله الدوسري',
        studentPhone: '0501234567',
        studentEmail: 'abdullah@example.com',
        deliveryType: 'online',
        meetingLink: 'https://classroom.masar-edu.com/room/msr-88410',
        date: 'غداً، الأحد 5 أكتوبر',
        timeSlot: '05:30 م',
        durationMinutes: 60,
        price: 140,
        currency: 'ر.س',
        status: 'confirmed',
        paymentStatus: 'paid',
        paymentMethod: 'مدى (Mada)',
        createdAt: '2026-10-01',
      },
      {
        id: 'bk-demo-2',
        bookingNumber: 'MSR-88395',
        tutorId: 'tut-02',
        tutorName: 'م. أحمد الشريف',
        tutorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        tutorSubject: 'فيزياء ميكانيكا',
        studentId: 'usr-student-demo',
        studentName: 'عبد الله الدوسري',
        studentPhone: '0501234567',
        studentEmail: 'abdullah@example.com',
        deliveryType: 'both',
        lessonLocation: 'منزل الطالب - الرياض، حي الملقا',
        date: 'الأسبوع الماضي، 28 سبتمبر',
        timeSlot: '06:30 م',
        durationMinutes: 60,
        price: 120,
        currency: 'ر.س',
        status: 'completed',
        paymentStatus: 'paid',
        paymentMethod: 'Apple Pay',
        createdAt: '2026-09-25',
        hasReview: true,
      },
    ];
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['tut-01', 'tut-03'];
  });

  const [searchFilters, setSearchFilters] = useState<BookingFilterState>({
    subject: '',
    stage: '',
    system: '',
    city: '',
    deliveryType: 'all',
    gender: 'all',
    maxPrice: 200,
    minExperience: 0,
    availableNowOnly: false,
    searchQuery: '',
  });

  // Navigate handler that updates URL without hard reload
  const navigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
    }
  };

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync bookings & favorites to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  // Auth actions
  const login = (role: UserRole, email: string = '') => {
    let user: PlatformUser;
    if (role === 'teacher') {
      user = {
        id: 'tut-01',
        name: 'أ. د. سارة القحطاني',
        email: email || 'sara@masar-edu.com',
        phone: '0559876543',
        role: 'teacher',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      };
    } else if (role === 'admin') {
      user = {
        id: 'usr-admin-1',
        name: 'مدير منصة مَسار',
        email: email || 'admin@masar-edu.com',
        phone: '0500000000',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      };
    } else {
      user = {
        id: 'usr-student-demo',
        name: 'عبد الله الدوسري',
        email: email || 'abdullah@example.com',
        phone: '0501234567',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      };
    }
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Favorites
  const toggleFavorite = (tutorId: string) => {
    setFavorites((prev) =>
      prev.includes(tutorId) ? prev.filter((id) => id !== tutorId) : [...prev, tutorId]
    );
  };

  // Booking actions
  const createBooking = (
    bookingData: Omit<BookingRecord, 'id' | 'bookingNumber' | 'createdAt'>
  ): BookingRecord => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newBooking: BookingRecord = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      bookingNumber: `MSR-${randomNum}`,
      createdAt: new Date().toISOString().split('T')[0],
      meetingLink:
        bookingData.deliveryType === 'online'
          ? `https://classroom.masar-edu.com/room/msr-${randomNum}`
          : undefined,
    };

    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );
  };

  // Review actions
  const addReview = (review: Omit<TutorReview, 'id' | 'date' | 'isVerified'>) => {
    const newReview: TutorReview = {
      ...review,
      id: `rev-${Date.now()}`,
      date: 'الآن',
      isVerified: true,
    };
    setReviews((prev) => [newReview, ...prev]);

    // Recalculate tutor rating
    setTutors((prev) =>
      prev.map((t) => {
        if (t.id === review.tutorId) {
          const newCount = t.reviewsCount + 1;
          const newAvg = Number(((t.rating * t.reviewsCount + review.rating) / newCount).toFixed(2));
          return { ...t, reviewsCount: newCount, rating: newAvg };
        }
        return t;
      })
    );
  };

  // Admin actions
  const updateTutorStatus = (tutorId: string, isVerified: boolean) => {
    setTutors((prev) =>
      prev.map((t) => (t.id === tutorId ? { ...t, isVerified } : t))
    );
  };

  return (
    <PlatformContext.Provider
      value={{
        currentPath,
        navigate,
        currentUser,
        login,
        logout,
        tutors,
        reviews,
        bookings,
        blogPosts: SEED_BLOG_POSTS,
        faqs: SEED_FAQS,
        categories: SUBJECT_CATEGORIES,
        educationalSystems: EDUCATIONAL_SYSTEMS,
        favorites,
        toggleFavorite,
        createBooking,
        cancelBooking,
        addReview,
        updateTutorStatus,
        searchFilters,
        setSearchFilters,
        selectedTutorSlug,
        setSelectedTutorSlug,
        selectedBlogSlug,
        setSelectedBlogSlug,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};
