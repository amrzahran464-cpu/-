export type DeliveryType = 'online' | 'in_person' | 'both';
export type UserRole = 'student' | 'teacher' | 'admin';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';

export interface SubjectCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  subjects: { id: string; name: string; slug: string; tutorsCount: number }[];
}

export interface EducationalSystem {
  id: string;
  name: string;
  slug: string;
  country: string;
  description: string;
  stages: { id: string; name: string; grades: string[] }[];
}

export interface CityLocation {
  id: string;
  name: string;
  areas: string[];
}

export interface TutorReview {
  id: string;
  tutorId: string;
  studentName: string;
  studentAvatar?: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  subject: string;
  isVerified: boolean;
}

export interface TutorProfile {
  id: string;
  slug: string;
  name: string;
  title: string;
  avatar: string;
  gender: 'male' | 'female';
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  completedLessonsCount: number;
  experienceYears: number;
  hourlyRate: number;
  currency: string;
  deliveryType: DeliveryType;
  city: string;
  areas: string[];
  bio: string;
  qualifications: string[];
  subjects: string[];
  educationalSystems: string[];
  stages: string[];
  badges: string[];
  isVerified: boolean;
  isAvailableNow: boolean;
  videoIntroUrl?: string;
  availableDays: string[];
  availableTimeSlots: string[];
}

export interface BookingRecord {
  id: string;
  bookingNumber: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  tutorSubject: string;
  studentId: string;
  studentName: string;
  studentPhone: string;
  studentEmail: string;
  deliveryType: DeliveryType;
  meetingLink?: string;
  lessonLocation?: string;
  date: string;
  timeSlot: string;
  durationMinutes: number;
  price: number;
  currency: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  createdAt: string;
  notes?: string;
  hasReview?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: { name: string; role: string; avatar: string };
  category: string;
  readTime: string;
  publishedAt: string;
  coverImage: string;
  tags: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'students' | 'parents' | 'teachers' | 'booking' | 'payment' | 'online' | 'in_person';
}

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
}
