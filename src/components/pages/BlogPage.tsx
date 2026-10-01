'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Clock, User, ArrowLeft, ArrowRight, Tag, BookOpen, Share2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { usePlatform } from '@/context/PlatformContext';
import { BlogPost } from '@/types/platform';

interface BlogPageProps {
  postSlug?: string;
}

export const BlogPage: React.FC<BlogPageProps> = ({ postSlug }) => {
  const { blogPosts, navigate, setSelectedBlogSlug } = usePlatform();
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState('');

  // If viewing a specific post
  const currentPost = postSlug ? blogPosts.find((p) => p.slug === postSlug) : null;

  const categories = ['الكل', 'نصائح أولياء الأمور', 'الشهادات الدولية', 'طرق التعلم', 'الرياضيات والعلوم', 'للمعلمين'];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCat = selectedCategory === 'الكل' || post.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      post.title.includes(searchQuery) ||
      post.excerpt.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  const handleOpenPost = (slug: string) => {
    setSelectedBlogSlug(slug);
    navigate(`/blog/${slug}`);
  };

  // POST DETAIL VIEW
  if (currentPost) {
    const relatedPosts = blogPosts.filter((p) => p.id !== currentPost.id).slice(0, 2);

    return (
      <div className="py-12 bg-neutral-50/70 min-h-screen text-right">
        <Container size="narrow">
          
          <button
            onClick={() => { setSelectedBlogSlug(null); navigate('/blog'); }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-neutral-900 mb-6"
          >
            <ArrowRight className="w-4 h-4 ml-1" />
            <span>العودة لكافة المقالات</span>
          </button>

          <article className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200 shadow-sm space-y-6">
            <Badge variant="emerald">{currentPost.category}</Badge>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 leading-snug">
              {currentPost.title}
            </h1>

            {/* Author and Date */}
            <div className="flex items-center gap-3 py-3 border-y border-neutral-100 text-xs text-neutral-500">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-200 shrink-0">
                <img src={currentPost.author.avatar} alt={currentPost.author.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-bold text-neutral-900">{currentPost.author.name}</span>
                <span className="text-neutral-400 block text-[11px]">{currentPost.author.role} · {currentPost.publishedAt}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-neutral-100 border border-neutral-200">
              <Image
                src={currentPost.coverImage}
                alt={currentPost.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content prose */}
            <div className="text-sm sm:text-base text-neutral-700 leading-relaxed space-y-4 whitespace-pre-line font-normal">
              {currentPost.content}
            </div>

            {/* Tags */}
            <div className="pt-4 border-t border-neutral-100 flex flex-wrap gap-2 text-xs">
              <span className="text-neutral-400">الوسوم:</span>
              {currentPost.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded-lg">
                  #{tag}
                </span>
              ))}
            </div>
          </article>

          {/* Related Posts */}
          <div className="mt-12 space-y-4">
            <h3 className="text-lg font-bold text-neutral-900">مقالات ذات صلة</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handleOpenPost(post.slug)}
                  className="bg-white p-5 rounded-2xl border border-neutral-200 hover:border-emerald-300 cursor-pointer shadow-xs"
                >
                  <span className="text-[10px] font-bold text-emerald-700">{post.category}</span>
                  <h4 className="text-sm font-bold text-neutral-900 mt-1 line-clamp-2">{post.title}</h4>
                  <span className="text-[11px] text-neutral-400 block mt-2">{post.readTime}</span>
                </div>
              ))}
            </div>
          </div>

        </Container>
      </div>
    );
  }

  // BLOG LISTING VIEW
  return (
    <div className="py-14 bg-neutral-50/70 min-h-screen text-right">
      <Container size="wide">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="emerald" className="mb-2">
            المدونة التعليمية
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight mb-3">
            مقالات وإرشادات التفوق الدراسي
          </h1>
          <p className="text-base text-neutral-600 font-normal">
            نصائح عملية من نخبة التربويين والمعلمين للطلاب وأولياء الأمور
          </p>
        </div>

        {/* Search & Categories Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-neutral-200 shadow-xs mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Categories Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat ? 'bg-emerald-600 text-white shadow-2xs' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في المقالات..."
              className="w-full pl-3 pr-9 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-2.5" />
          </div>

        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => handleOpenPost(post.slug)}
              className="bg-white rounded-3xl overflow-hidden border border-neutral-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-[10px] font-bold text-emerald-800">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-base font-extrabold text-neutral-900 group-hover:text-emerald-700 transition-colors leading-snug mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed font-normal mb-4">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
                <span>{post.publishedAt}</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <span>اقرأ المقال</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </div>
  );
};
