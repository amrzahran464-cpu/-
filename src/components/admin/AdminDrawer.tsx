import React, { useState } from 'react';
import { X, Save, RotateCcw, Code, CheckCircle, Settings2, Sparkles } from 'lucide-react';
import { PlatformContent } from '../../types/content';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  content: PlatformContent;
  onSaveContent: (updatedContent: PlatformContent) => void;
  onResetContent: () => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  content,
  onSaveContent,
  onResetContent,
}) => {
  const [formData, setFormData] = useState<PlatformContent>(content);
  const [activeTab, setActiveTab] = useState<'stats' | 'hero' | 'vision' | 'export'>('stats');
  const [saveToast, setSaveToast] = useState(false);

  // Sync state when content updates
  React.useEffect(() => {
    setFormData(content);
  }, [content]);

  if (!isOpen) return null;

  const handleStatChange = (id: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        items: prev.stats.items.map((item) =>
          item.id === id ? { ...item, value } : item
        ),
      },
    }));
  };

  const handleSave = () => {
    onSaveContent(formData);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg h-full flex flex-col shadow-2xl text-right overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Settings2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">لوحة تخصيص المحتوى (Admin CMS)</h2>
              <p className="text-[11px] text-neutral-400">تعديل الإحصائيات والنصوص ديناميكياً</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex items-center border-b border-neutral-200 bg-neutral-50 px-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('stats')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'stats'
                ? 'border-emerald-600 text-emerald-800 bg-white font-bold'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            الإحصائيات والأرقام
          </button>
          <button
            onClick={() => setActiveTab('hero')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'hero'
                ? 'border-emerald-600 text-emerald-800 bg-white font-bold'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            الواجهة الرئيسية (Hero)
          </button>
          <button
            onClick={() => setActiveTab('vision')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'vision'
                ? 'border-emerald-600 text-emerald-800 bg-white font-bold'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            الرؤية والرسالة
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'export'
                ? 'border-emerald-600 text-emerald-800 bg-white font-bold'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            تصدير JSON للـ API
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          
          {saveToast && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>تم حفظ التغييرات وتحديث الصفحة بنجاح!</span>
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="space-y-4">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600">
                يمكنك هنا تغيير أرقام وإحصائيات المنصة الحية، وستظهر التغييرات فوراً في قسم الإحصائيات وباقي الأقسام.
              </div>

              {formData.stats.items.map((stat) => (
                <div key={stat.id} className="p-4 bg-white border border-neutral-200 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-neutral-800">{stat.label}</label>
                    <span className="text-[11px] font-mono text-neutral-400">ID: {stat.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step={stat.id === 'satisfaction' ? '0.1' : '1'}
                      value={stat.value}
                      onChange={(e) => handleStatChange(stat.id, parseFloat(e.target.value) || 0)}
                      className="flex-1 p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono font-bold"
                    />
                    <span className="px-3 py-2 bg-neutral-100 rounded-lg text-xs font-mono text-neutral-700">
                      {stat.suffix}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">{stat.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Hero Tab */}
          {activeTab === 'hero' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">شارة Hero العلوية</label>
                <input
                  type="text"
                  value={formData.hero.badge}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, badge: e.target.value },
                    }))
                  }
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">العنوان الرئيسي (البداية)</label>
                <input
                  type="text"
                  value={formData.hero.title}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, title: e.target.value },
                    }))
                  }
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">النص المميز في العنوان (Highlight)</label>
                <input
                  type="text"
                  value={formData.hero.titleHighlight}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, titleHighlight: e.target.value },
                    }))
                  }
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-bold text-emerald-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">النص التوضيحي للـ Hero</label>
                <textarea
                  rows={4}
                  value={formData.hero.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, description: e.target.value },
                    }))
                  }
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">الزر الرئيسي</label>
                  <input
                    type="text"
                    value={formData.hero.primaryCta}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, primaryCta: e.target.value },
                      }))
                    }
                    className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">الزر الثانوي</label>
                  <input
                    type="text"
                    value={formData.hero.secondaryCta}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, secondaryCta: e.target.value },
                      }))
                    }
                    className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Vision Tab */}
          {activeTab === 'vision' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">نص الرؤية المقتبس</label>
                <textarea
                  rows={3}
                  value={formData.visionMission.vision.quote}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      visionMission: {
                        ...prev.visionMission,
                        vision: { ...prev.visionMission.vision, quote: e.target.value },
                      },
                    }))
                  }
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">مقدمة الرسالة</label>
                <textarea
                  rows={3}
                  value={formData.visionMission.mission.lead}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      visionMission: {
                        ...prev.visionMission,
                        mission: { ...prev.visionMission.mission, lead: e.target.value },
                      },
                    }))
                  }
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs"
                />
              </div>
            </div>
          )}

          {/* Export JSON Tab */}
          {activeTab === 'export' && (
            <div className="space-y-3">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600">
                هذا النموذج جاهز للربط مع أي API أو قاعدة بيانات (مثل Firestore أو PostgreSQL أو Strapi CMS):
              </div>
              <pre className="p-3 bg-neutral-900 text-emerald-400 rounded-xl text-[11px] font-mono overflow-x-auto max-h-96" dir="ltr">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              if (window.confirm('هل أنت متأكد من استعادة القيم الافتراضية؟')) {
                onResetContent();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>استعادة الافتراضي</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-neutral-200 rounded-lg transition-colors cursor-pointer"
            >
              إلغاء
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>حفظ وتطبيق</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
