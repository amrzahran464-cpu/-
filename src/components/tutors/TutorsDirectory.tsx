'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Star,
  ShieldCheck,
  MapPin,
  Video,
  Users,
  Heart,
  Calendar,
  X,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { usePlatform } from '@/context/PlatformContext';
import { TutorProfile } from '@/types/platform';
import { CITIES_AND_AREAS } from '@/data/seedData';

interface TutorsDirectoryProps {
  onBookTutor: (tutor: TutorProfile) => void;
}

export const TutorsDirectory: React.FC<TutorsDirectoryProps> = ({ onBookTutor }) => {
  const {
    tutors,
    categories,
    educationalSystems,
    searchFilters,
    setSearchFilters,
    favorites,
    toggleFavorite,
    setSelectedTutorSlug,
    navigate,
  } = usePlatform();

  const [sortBy, setSortBy] = useState<'rating' | 'price_asc' | 'price_desc' | 'experience'>('rating');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter logic
  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      // Search query
      if (searchFilters.searchQuery && searchFilters.searchQuery.trim() !== '') {
        const q = searchFilters.searchQuery.toLowerCase();
        const matchesName = tutor.name.toLowerCase().includes(q);
        const matchesTitle = tutor.title.toLowerCase().includes(q);
        const matchesSubject = tutor.subjects.some((s) => s.toLowerCase().includes(q));
        const matchesCity = tutor.city.toLowerCase().includes(q);
        if (!matchesName && !matchesTitle && !matchesSubject && !matchesCity) {
          return false;
        }
      }

      // Subject
      if (searchFilters.subject && searchFilters.subject !== '') {
        const matches = tutor.subjects.some((s) => s.includes(searchFilters.subject!));
        if (!matches) return false;
      }

      // Educational System
      if (searchFilters.system && searchFilters.system !== '') {
        const matches = tutor.educationalSystems.some((sys) => sys.includes(searchFilters.system!));
        if (!matches) return false;
      }

      // Stage
      if (searchFilters.stage && searchFilters.stage !== '') {
        const matches = tutor.stages.some((stg) => stg.includes(searchFilters.stage!));
        if (!matches) return false;
      }

      // City
      if (searchFilters.city && searchFilters.city !== '') {
        if (!tutor.city.includes(searchFilters.city) && tutor.city !== 'الرياض') {
          return false;
        }
      }

      // Delivery Type
      if (searchFilters.deliveryType && searchFilters.deliveryType !== 'all') {
        if (tutor.deliveryType !== 'both' && tutor.deliveryType !== searchFilters.deliveryType) {
          return false;
        }
      }

      // Gender
      if (searchFilters.gender && searchFilters.gender !== 'all') {
        if (tutor.gender !== searchFilters.gender) {
          return false;
        }
      }

      // Max Price
      if (searchFilters.maxPrice && tutor.hourlyRate > searchFilters.maxPrice) {
        return false;
      }

      // Min Experience
      if (searchFilters.minExperience && tutor.experienceYears < searchFilters.minExperience) {
        return false;
      }

      // Available Now Only
      if (searchFilters.availableNowOnly && !tutor.isAvailableNow) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_asc') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'price_desc') return b.hourlyRate - a.hourlyRate;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      return 0;
    });
  }, [tutors, searchFilters, sortBy]);

  const resetFilters = () => {
    setSearchFilters({
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
  };

  const hasActiveFilters = Boolean(
    searchFilters.subject ||
    searchFilters.system ||
    searchFilters.stage ||
    searchFilters.city ||
    searchFilters.deliveryType !== 'all' ||
    searchFilters.gender !== 'all' ||
    (searchFilters.maxPrice && searchFilters.maxPrice < 200) ||
    searchFilters.availableNowOnly ||
    searchFilters.searchQuery
  );

  return (
    <div className="py-10 bg-neutral-50/60 min-h-screen text-right">
      <Container size="wide">
        
        {/* Breadcrumb & Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
              <button onClick={() => navigate('/')} className="hover:text-emerald-700">الرئيسية</button>
              <span>/</span>
              <span className="text-neutral-900 font-semibold">دليل المدرسين</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              البحث عن مدرسين خصوصيين
            </h1>
          </div>

          {/* Quick Search & Sort */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle Button */}
            <Button
              variant="outline"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden text-xs gap-1.5"
            >
              <Filter className="w-4 h-4 text-emerald-600" />
              <span>الفلاتر ({hasActiveFilters ? 'مفعّلة' : 'الكل'})</span>
            </Button>

            {/* Sorting select */}
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              <span>الترتيب:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="rating">الأعلى تقييماً</option>
                <option value="price_asc">الأقل سعراً</option>
                <option value="price_desc">الأعلى سعراً</option>
                <option value="experience">الأكثر خبرة</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters (3 cols) + Results (9 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Sidebar Filters (3 cols) */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-6 sticky top-24">
            
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-neutral-900">تصفية النتائج</h3>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-rose-600 hover:underline font-semibold cursor-pointer"
                >
                  إعادة ضبط
                </button>
              )}
            </div>

            {/* Search Input Filter */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">البحث بالاسم أو التخصص</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchFilters.searchQuery || ''}
                  onChange={(e) => setSearchFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                  placeholder="مثال: سارة، كيمياء، تفاضل..."
                  className="w-full pl-3 pr-9 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-emerald-600"
                />
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-2.5" />
              </div>
            </div>

            {/* Subject Filter */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">المادة الدراسية</label>
              <select
                value={searchFilters.subject || ''}
                onChange={(e) => setSearchFilters((prev) => ({ ...prev, subject: e.target.value }))}
                className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-emerald-600"
              >
                <option value="">كافة المواد</option>
                {categories.flatMap((c) =>
                  c.subjects.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Educational System Filter */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">النظام والمقرر الدراسي</label>
              <select
                value={searchFilters.system || ''}
                onChange={(e) => setSearchFilters((prev) => ({ ...prev, system: e.target.value }))}
                className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-emerald-600"
              >
                <option value="">كافة الأنظمة والمناهج</option>
                {educationalSystems.map((sys) => (
                  <option key={sys.id} value={sys.name}>
                    {sys.name} ({sys.country})
                  </option>
                ))}
              </select>
            </div>

            {/* Delivery Type */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">طريقة الدرس</label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-neutral-100 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setSearchFilters((prev) => ({ ...prev, deliveryType: 'all' }))}
                  className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
                    searchFilters.deliveryType === 'all' || !searchFilters.deliveryType ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-600'
                  }`}
                >
                  الكل
                </button>
                <button
                  type="button"
                  onClick={() => setSearchFilters((prev) => ({ ...prev, deliveryType: 'online' }))}
                  className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
                    searchFilters.deliveryType === 'online' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-neutral-600'
                  }`}
                >
                  أونلاين
                </button>
                <button
                  type="button"
                  onClick={() => setSearchFilters((prev) => ({ ...prev, deliveryType: 'in_person' }))}
                  className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
                    searchFilters.deliveryType === 'in_person' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-neutral-600'
                  }`}
                >
                  حضوري
                </button>
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">المدينة</label>
              <select
                value={searchFilters.city || ''}
                onChange={(e) => setSearchFilters((prev) => ({ ...prev, city: e.target.value }))}
                className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-emerald-600"
              >
                <option value="">كافة المدن</option>
                {CITIES_AND_AREAS.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">جنس المدرس</label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-neutral-100 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setSearchFilters((prev) => ({ ...prev, gender: 'all' }))}
                  className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
                    searchFilters.gender === 'all' || !searchFilters.gender ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-600'
                  }`}
                >
                  الكل
                </button>
                <button
                  type="button"
                  onClick={() => setSearchFilters((prev) => ({ ...prev, gender: 'female' }))}
                  className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
                    searchFilters.gender === 'female' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-neutral-600'
                  }`}
                >
                  معلمة
                </button>
                <button
                  type="button"
                  onClick={() => setSearchFilters((prev) => ({ ...prev, gender: 'male' }))}
                  className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
                    searchFilters.gender === 'male' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-neutral-600'
                  }`}
                >
                  معلم
                </button>
              </div>
            </div>

            {/* Hourly Rate Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="text-neutral-700">الحد الأقصى لسعر الحصة:</span>
                <span className="text-emerald-700 font-mono">{searchFilters.maxPrice || 200} ر.س</span>
              </div>
              <input
                type="range"
                min="50"
                max="250"
                step="10"
                value={searchFilters.maxPrice || 200}
                onChange={(e) => setSearchFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                <span>50 ر.س</span>
                <span>250 ر.س</span>
              </div>
            </div>

            {/* Available Now Toggle */}
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-700">متاح للحجز الفوري اليوم</span>
              <input
                type="checkbox"
                checked={Boolean(searchFilters.availableNowOnly)}
                onChange={(e) => setSearchFilters((prev) => ({ ...prev, availableNowOnly: e.target.checked }))}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </div>

          </aside>

          {/* Results Grid (9 cols) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-4">
            
            {/* Results count header */}
            <div className="bg-white p-4 rounded-2xl border border-neutral-200/90 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="font-bold text-neutral-800">
                وجدنا <strong className="text-emerald-700 font-mono text-sm">{filteredTutors.length}</strong> معلماً مطابقاً لمعاييرك
              </span>

              {hasActiveFilters && (
                <div className="flex items-center gap-2 flex-wrap">
                  {searchFilters.subject && (
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-md font-semibold text-[11px]">
                      {searchFilters.subject}
                    </span>
                  )}
                  {searchFilters.system && (
                    <span className="px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded-md font-semibold text-[11px]">
                      {searchFilters.system}
                    </span>
                  )}
                  {searchFilters.city && (
                    <span className="px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded-md font-semibold text-[11px]">
                      {searchFilters.city}
                    </span>
                  )}
                  <button
                    onClick={resetFilters}
                    className="text-rose-600 hover:underline font-bold text-[11px] cursor-pointer"
                  >
                    مسح الفلاتر
                  </button>
                </div>
              )}
            </div>

            {/* Empty state */}
            {filteredTutors.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 space-y-4">
                <Search className="w-12 h-12 text-neutral-300 mx-auto" />
                <h3 className="text-lg font-bold text-neutral-800">لم نجد معلمين مطابقين لهذه الفلاتر</h3>
                <p className="text-xs text-neutral-500 max-w-md mx-auto">
                  جرب توسيع نطاق السعر أو تغيير المادة أو المدينة للعثور على معلمين متاحين.
                </p>
                <Button variant="emerald" onClick={resetFilters}>
                  إعادة ضبط جميع الفلاتر
                </Button>
              </div>
            ) : (
              /* Tutor Cards */
              filteredTutors.map((tutor) => {
                const isFav = favorites.includes(tutor.id);
                return (
                  <div
                    key={tutor.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-neutral-200 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-right"
                  >
                    {/* Left/Middle Content */}
                    <div className="flex items-start gap-4 flex-1">
                      
                      {/* Avatar */}
                      <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                        <img
                          src={tutor.avatar}
                          alt={tutor.name}
                          className="w-full h-full object-cover"
                        />
                        {tutor.isAvailableNow && (
                          <span
                            title="متاح للحجز الفوري"
                            className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"
                          />
                        )}
                      </div>

                      {/* Info */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            onClick={() => {
                              setSelectedTutorSlug(tutor.slug);
                              navigate(`/tutors/${tutor.slug}`);
                            }}
                            className="text-base font-extrabold text-neutral-900 hover:text-emerald-700 text-right cursor-pointer"
                          >
                            {tutor.name}
                          </button>
                          
                          {tutor.isVerified && (
                            <span title="معلم موثق الهوية والشهادات">
                              <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            </span>
                          )}

                          {tutor.badges.map((b, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded"
                            >
                              {b}
                            </span>
                          ))}
                        </div>

                        <p className="text-xs text-neutral-500 font-semibold">{tutor.title}</p>
                        <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">{tutor.bio}</p>

                        {/* Details Tags */}
                        <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-neutral-500">
                          <span className="flex items-center gap-1 text-amber-500 font-black">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{tutor.rating}</span>
                            <span className="text-neutral-400 font-normal">({tutor.reviewsCount})</span>
                          </span>
                          <span>·</span>
                          <span>خبرة {tutor.experienceYears} سنوات</span>
                          <span>·</span>
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-neutral-400" />
                            <span>{tutor.city}</span>
                          </span>
                          <span>·</span>
                          <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            {tutor.deliveryType === 'both' ? 'أونلاين وحضوري' : tutor.deliveryType === 'online' ? 'أونلاين فقط' : 'حضوري فقط'}
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Right / Pricing & CTAs Column */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100 shrink-0">
                      
                      <div className="text-right">
                        <div className="text-xl font-black text-neutral-900 font-mono tabular-nums">
                          {tutor.hourlyRate} {tutor.currency}
                        </div>
                        <span className="text-[10px] text-neutral-400">للحصة (60 دقيقة)</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleFavorite(tutor.id)}
                          className={`p-2 rounded-xl border border-neutral-200 transition-colors cursor-pointer ${
                            isFav ? 'text-rose-500 bg-rose-50 border-rose-200' : 'text-neutral-400 hover:bg-neutral-100'
                          }`}
                          aria-label="المفضلة"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedTutorSlug(tutor.slug);
                            navigate(`/tutors/${tutor.slug}`);
                          }}
                          className="px-3.5 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer border border-neutral-200"
                        >
                          عرض الملف
                        </button>

                        <Button
                          variant="emerald"
                          size="sm"
                          onClick={() => onBookTutor(tutor)}
                          className="text-xs font-bold shadow-xs whitespace-nowrap"
                        >
                          احجز الآن
                        </Button>
                      </div>

                    </div>

                  </div>
                );
              })
            )}

          </div>

        </div>

      </Container>

      {/* Mobile Filters Bottom Sheet */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs lg:hidden animate-in fade-in">
          <div className="bg-white rounded-t-3xl max-h-[85vh] w-full overflow-y-auto p-6 text-right space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900">تصفية نتائج البحث</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">المادة</label>
              <select
                value={searchFilters.subject || ''}
                onChange={(e) => setSearchFilters((prev) => ({ ...prev, subject: e.target.value }))}
                className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs"
              >
                <option value="">كافة المواد</option>
                {categories.flatMap((c) =>
                  c.subjects.map((s) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))
                )}
              </select>
            </div>

            {/* System */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">النظام الدراسي</label>
              <select
                value={searchFilters.system || ''}
                onChange={(e) => setSearchFilters((prev) => ({ ...prev, system: e.target.value }))}
                className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs"
              >
                <option value="">كافة الأنظمة</option>
                {educationalSystems.map((sys) => (
                  <option key={sys.id} value={sys.name}>{sys.name}</option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">المدينة</label>
              <select
                value={searchFilters.city || ''}
                onChange={(e) => setSearchFilters((prev) => ({ ...prev, city: e.target.value }))}
                className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs"
              >
                <option value="">كافة المدن</option>
                {CITIES_AND_AREAS.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex gap-2">
              <Button
                variant="emerald"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 justify-center"
              >
                تطبيق الفلاتر ({filteredTutors.length} نتائج)
              </Button>
              <Button
                variant="outline"
                onClick={() => { resetFilters(); setMobileFilterOpen(false); }}
                className="text-xs"
              >
                إعادة ضبط
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
