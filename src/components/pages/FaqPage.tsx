'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, MessageSquare, ArrowLeft, PhoneCall } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { usePlatform } from '@/context/PlatformContext';

export const FaqPage: React.FC = () => {
  const { faqs, navigate } = usePlatform();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIds, setOpenFaqIds] = useState<string[]>([faqs[0]?.id || 'faq-1']);

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = [
    { id: 'all', label: 'كافة الأسئلة' },
    { id: 'students', label: 'الطلاب والدراسة' },
    { id: 'booking', label: 'الحجز والجدولة' },
    { id: 'payment', label: 'الدفع والضمان' },
    { id: 'online', label: 'الدروس أونلاين' },
    { id: 'in_person', label: 'الدروس الحضورية' },
    { id: 'parents', label: 'أولياء الأمور' },
    { id: 'teachers', label: 'للمدرسين والمعلمين' },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      faq.question.includes(searchQuery) ||
      faq.answer.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-14 bg-neutral-50/60 min-h-screen text-right">
      <Container size="wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="emerald" className="mb-3">
            مركز المساعدة والمعلومات
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">
            الأسئلة الأكثر شيوعاً
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            إجابات واضحة ومباشرة لكل ما يدور في ذهنك حول اختيار المعلم، الحجز، طرق التدريس وضمانات الرضا في مَسار.
          </p>

          {/* Search bar */}
          <div className="mt-8 relative max-w-lg mx-auto">
            <Search className="w-5 h-5 text-neutral-400 absolute right-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن سؤالك هنا (مثال: الدفع، الدروس الحضورية، المعلم...)"
              className="w-full bg-white border border-neutral-300 rounded-2xl py-3.5 pr-12 pl-4 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 shadow-2xs transition-all"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQs List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-emerald-200 shadow-sm ring-1 ring-emerald-500/10'
                      : 'border-neutral-200 hover:border-neutral-300 shadow-2xs'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-right cursor-pointer gap-4"
                  >
                    <span className="font-bold text-sm sm:text-base text-neutral-900 leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                        isOpen ? 'bg-emerald-600 text-white rotate-180' : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 animate-in fade-in duration-200">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200 p-8">
              <HelpCircle className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <h3 className="font-bold text-neutral-800 text-base mb-1">لم نجد نتائج مطابقة لبحثك</h3>
              <p className="text-xs text-neutral-500 mb-4">جرب البحث بكلمات أخرى أو تصفح كل الأسئلة</p>
              <Button variant="outline" size="sm" onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
                إعادة ضبط البحث
              </Button>
            </div>
          )}
        </div>

        {/* Still have questions CTA */}
        <div className="max-w-2xl mx-auto mt-16 p-8 bg-gradient-to-r from-emerald-900 to-teal-900 rounded-3xl text-white text-center shadow-lg">
          <MessageSquare className="w-10 h-10 text-emerald-300 mx-auto mb-3" />
          <h3 className="text-lg font-extrabold mb-2">هل ما زال لديك أي استفسار آخر؟</h3>
          <p className="text-xs text-emerald-100 leading-relaxed mb-6 max-w-md mx-auto">
            فريق الدعم الفني والأكاديمي في مَسار متواجد على مدار الساعة لمساعدتك واقتراح المدرس الأنسب لاحتياجاتك.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="secondary"
              size="default"
              onClick={() => navigate('/request-tutor')}
              className="bg-white text-emerald-950 hover:bg-neutral-100 font-extrabold"
            >
              <span>طلب مدرس مخصص</span>
              <ArrowLeft className="w-4 h-4 mr-1.5" />
            </Button>
            <Button
              variant="outline"
              size="default"
              onClick={() => navigate('/about')}
              className="border-white/30 text-white bg-transparent hover:bg-white/10"
            >
              <span>تعرف أكثر على مَسار</span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
