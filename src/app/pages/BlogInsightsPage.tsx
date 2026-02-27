import { useState, useEffect } from 'react';
import { Header } from '@/app/components/Header';
import { ResourcesFooter } from '@/app/components/ResourcesFooter';
import { SEO } from '@/app/components/SEO';
import { PageHero } from '@/app/components/hero/PageHero';
import { BreadcrumbNav } from '@/app/components/BreadcrumbNav';
import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { Calendar, User, ArrowRight, TrendingUp } from 'lucide-react';
import { fetchStrapiPosts, type StrapiPost } from '@/app/lib/strapiClient';
import { fetchBlogPostsFromSupabase } from '@/app/lib/blogFromSupabase';
import { getAllStaticBlogPosts } from '@/app/lib/staticBlogPosts';
import { format } from 'date-fns';
import { Link } from 'react-router';
import { content } from './BlogInsightsPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.gallery.g1, alt: 'Blog and industry insights' },
  hero: {
    src: PLACEHOLDERS.hero.warehouse,
    alt: 'Blog and industry insights for thermal paper',
    overlay: 'light',
    focal: 'center',
  },
  gallery: [],
  cards: {
    'post-cover-1': { src: PLACEHOLDERS.gallery.g1, alt: 'Blog post cover' },
    'post-cover-2': { src: PLACEHOLDERS.gallery.g2, alt: 'Blog post cover' },
    'post-cover-3': { src: PLACEHOLDERS.gallery.g3, alt: 'Blog post cover' },
  },
  proofs: [],
};

interface BlogInsightsPageProps {
  lang: 'en' | 'ru' | 'zh';
}

export function BlogInsightsPage({ lang }: BlogInsightsPageProps) {
  const [strapiPosts, setStrapiPosts] = useState<StrapiPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const fromSupabase = await fetchBlogPostsFromSupabase(lang, 12);
        if (cancelled) return;
        if (fromSupabase.length > 0) {
          setStrapiPosts(fromSupabase);
          setPostsLoading(false);
          return;
        }
        const fromStrapi = await fetchStrapiPosts({ limit: 12 });
        if (cancelled) return;
        if (fromStrapi.length > 0) {
          setStrapiPosts(fromStrapi);
          setPostsLoading(false);
          return;
        }
      } catch (err) {
        console.error('[BlogInsightsPage] Failed to load dynamic posts:', err);
      }
      if (cancelled) return;
      const staticPosts = getAllStaticBlogPosts(lang);
      setStrapiPosts(
        staticPosts.map((p) => ({
          id: 0,
          documentId: p.slug,
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          body: p.body,
          coverImage: null,
          heroTitle: p.title,
          publishedAt: p.publishedAt,
          seoTitle: p.title,
          seoDescription: p.excerpt,
        } as StrapiPost))
      );
      setPostsLoading(false);
    })();
    return () => { cancelled = true; };
  }, [lang]);

  const t = content[lang];

  return (
    <>
      <SEO
        title={`${t.hero.title} | Zhixin Paper - B2B Thermal Paper Supplier`}
        description={t.hero.description}
        lang={lang}
      />
      <div className="min-h-screen flex flex-col bg-white">
        <Header lang={lang} />

        <div className="relative">
          <div className="absolute top-0 left-0 right-0 z-10">
            <BreadcrumbNav lang={lang} />
          </div>
          <PageHero
            eyebrow={t.hero.subtitle}
            title={t.hero.title}
            description={t.hero.description}
            image={{ src: pageAssets.hero.src, alt: pageAssets.hero.alt }}
            overlay={pageAssets.hero.overlay}
            placeholderKey="blog_hero"
          />
        </div>

        {/* Featured Article */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{t.featured.title}</h2>
            </div>

            {postsLoading ? (
              <div className="grid lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 lg:p-12 animate-pulse">
                <div className="aspect-[4/3] rounded-xl bg-gray-200" />
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ) : strapiPosts.length > 0 ? (
              <div className="grid lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 lg:p-12">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                  {strapiPosts[0].coverImage?.url ? (
                    <img src={strapiPosts[0].coverImage.url} alt={strapiPosts[0].coverImage.alternativeText || strapiPosts[0].title} className="w-full h-full object-cover" />
                  ) : (
                    <ImagePlaceholder type="section" aspectRatio="4:3" description={strapiPosts[0].title} size="lg" />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {strapiPosts[0].category ?? t.featured.category}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{strapiPosts[0].title}</h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">{strapiPosts[0].excerpt || t.featured.excerpt}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-2"><User className="w-4 h-4" /><span>{t.featured.author}</span></div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{strapiPosts[0].publishedAt ? format(new Date(strapiPosts[0].publishedAt), 'MMMM yyyy', { locale: undefined }) : t.featured.date}</span>
                    </div>
                    <span>{t.featured.readTime}</span>
                  </div>
                  <a href={`/${lang}/resources/blog-insights/${strapiPosts[0].slug}`} className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    <span>{t.readArticle}</span><ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ) : (() => {
              const staticPosts = getAllStaticBlogPosts(lang);
              const featuredPost = staticPosts[0];
              return featuredPost ? (
                <div className="grid lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 lg:p-12">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                    <ImagePlaceholder type="section" aspectRatio="4:3" description={featuredPost.title} size="lg" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">{featuredPost.category}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-2"><User className="w-4 h-4" /><span>{t.featured.author}</span></div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredPost.publishedAt ? format(new Date(featuredPost.publishedAt), 'MMMM yyyy', { locale: undefined }) : t.featured.date}</span>
                      </div>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <Link to={`/${lang}/resources/blog-insights/${featuredPost.slug}`} className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                      <span>{t.readArticle}</span><ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 lg:p-12">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                    <ImagePlaceholder type="section" aspectRatio="4:3" description={t.featured.articleTitle} size="lg" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">{t.featured.category}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{t.featured.articleTitle}</h3>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">{t.featured.excerpt}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-2"><User className="w-4 h-4" /><span>{t.featured.author}</span></div>
                      <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{t.featured.date}</span></div>
                      <span>{t.featured.readTime}</span>
                    </div>
                    <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                      <span>{t.readArticle}</span><ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t.categories.title}</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {t.categories.items.map((category, index) => (
                <button key={index} className="px-6 py-3 bg-white border-2 border-gray-200 rounded-full hover:border-blue-600 hover:text-blue-600 transition-colors font-medium">
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">{t.articles.title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(strapiPosts.length > 1
                ? strapiPosts.slice(1).map((p) => ({
                    id: String(p.id), slug: p.slug, title: p.title, excerpt: p.excerpt || '',
                    category: p.category ?? t.articles.items[0]?.category ?? 'Article',
                    date: p.publishedAt ? format(new Date(p.publishedAt), 'MMMM yyyy', { locale: undefined }) : '',
                    coverUrl: p.coverImage?.url,
                  }))
                : []
              ).concat(
                strapiPosts.length > 1
                  ? []
                  : getAllStaticBlogPosts(lang).slice(1).map((p) => ({
                      id: p.slug, slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category,
                      date: p.publishedAt ? format(new Date(p.publishedAt), 'MMMM yyyy', { locale: undefined }) : '',
                      coverUrl: undefined as string | undefined,
                    }))
              ).slice(0, 6).map((article) => (
                <article key={article.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
                  <a href={article.slug ? `/${lang}/resources/blog-insights/${article.slug}` : '#'} className="block">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      {article.coverUrl ? (
                        <img src={article.coverUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      ) : (
                        <ImagePlaceholder type="section" aspectRatio="16:9" description={article.title} size="md" />
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">{article.category}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{article.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{t.featured.author}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <TrendingUp className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl font-bold mb-6">{t.newsletter.title}</h2>
            <p className="text-xl text-blue-100 mb-8">{t.newsletter.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input type="email" placeholder={t.newsletter.placeholder} className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold whitespace-nowrap">
                {t.newsletter.button}
              </button>
            </div>
          </div>
        </section>

        <ResourcesFooter lang={lang} />
      </div>
    </>
  );
}
