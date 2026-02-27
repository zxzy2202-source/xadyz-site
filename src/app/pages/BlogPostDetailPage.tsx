import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router';
import { Header } from '@/app/components/Header';
import { ResourcesFooter } from '@/app/components/ResourcesFooter';
import { SEO } from '@/app/components/SEO';
import { BreadcrumbNav } from '@/app/components/BreadcrumbNav';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { ArrowLeft, Calendar } from 'lucide-react';
import { fetchStrapiPostBySlug, blocksToHtml, type StrapiPost } from '@/app/lib/strapiClient';
import { fetchBlogPostBySlugFromSupabase } from '@/app/lib/blogFromSupabase';
import { getStaticBlogPost, type StaticBlogPost } from '@/app/lib/staticBlogPosts';
import { format } from 'date-fns';
import { labels } from './BlogPostDetailPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.gallery.g1, alt: 'Blog post detail' },
  hero: {
    src: PLACEHOLDERS.gallery.g1,
    alt: 'Blog post content',
    overlay: 'dark',
    focal: 'center',
  },
  gallery: [
    { src: PLACEHOLDERS.gallery.g1, alt: 'Blog post image 1' },
    { src: PLACEHOLDERS.gallery.g2, alt: 'Blog post image 2' },
    { src: PLACEHOLDERS.gallery.g3, alt: 'Blog post image 3' },
  ],
  cards: {},
  proofs: [],
};

type Lang = 'en' | 'ru' | 'zh';

function staticPostToStrapiShape(p: StaticBlogPost): StrapiPost {
  return {
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
  } as StrapiPost;
}

function renderPlainBody(body: string): string {
  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const escaped = escape(body || '');
  const paragraphs = escaped.split(/\n{2,}/).map((p) => p.replace(/\n/g, '<br/>').trim()).filter(Boolean);
  if (paragraphs.length === 0) return '';
  return paragraphs.map((p) => `<p>${p}</p>`).join('');
}

export function BlogPostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lang = (pathname.split('/')[1] || 'en') as Lang;
  const lb = labels[lang];

  const [post, setPost] = useState<StrapiPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) { setError(true); setLoading(false); return; }
    (async () => {
      try {
        const fromSupabase = await fetchBlogPostBySlugFromSupabase(slug, lang);
        if (fromSupabase) { setPost(fromSupabase); setLoading(false); return; }
        const fromStrapi = await fetchStrapiPostBySlug(slug);
        if (fromStrapi) { setPost(fromStrapi); setLoading(false); return; }
        const staticPost = getStaticBlogPost(slug, lang);
        if (staticPost) { setPost(staticPostToStrapiShape(staticPost)); }
        else { setError(true); }
      } catch {
        const staticPost = getStaticBlogPost(slug, lang);
        if (staticPost) { setPost(staticPostToStrapiShape(staticPost)); }
        else { setError(true); }
      } finally {
        setLoading(false);
      }
    })();
  }, [slug, lang]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header lang={lang} />
        <div className="flex-1 container mx-auto px-6 py-20">
          <div className="max-w-3xl mx-auto animate-pulse space-y-6">
            <div className="h-12 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="aspect-video bg-gray-200 rounded-xl" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
        <ResourcesFooter lang={lang} />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header lang={lang} />
        <div className="flex-1 container mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{lb.notFound}</h1>
          <button onClick={() => navigate(`/${lang}/resources/blog-insights`)} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            <ArrowLeft className="w-4 h-4" />{lb.backToList}
          </button>
        </div>
        <ResourcesFooter lang={lang} />
      </div>
    );
  }

  const coverUrl = post.heroImage?.url || post.coverImage?.url;
  const seoTitle = post.seoTitle || post.title;
  const seoDescription = post.seoDescription || post.excerpt || post.title;

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} lang={lang} ogImage={coverUrl || undefined} />
      <div className="min-h-screen flex flex-col bg-white">
        <Header lang={lang} />
        <div className="relative bg-neutral-900 text-white py-8">
          <div className="absolute top-0 left-0 right-0 z-10">
            <BreadcrumbNav lang={lang} />
          </div>
          <div className="container mx-auto px-6 pt-12">
            <Link to={`/${lang}/resources/blog-insights`} className="inline-flex items-center gap-2 text-blue-300 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />{lb.backToList}
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold max-w-3xl">{post.heroTitle || post.title}</h1>
            {post.publishedAt && (
              <div className="flex items-center gap-2 mt-4 text-gray-300">
                <Calendar className="w-5 h-5" />
                <span>{format(new Date(post.publishedAt), 'PPP', { locale: undefined })}</span>
              </div>
            )}
          </div>
        </div>

        <article className="flex-1 container mx-auto px-6 py-12">
          <div className="max-w-3xl mx-auto">
            {coverUrl && (
              <div className="aspect-video rounded-xl overflow-hidden mb-10 shadow-xl">
                <img src={coverUrl} alt={post.coverImage?.alternativeText || post.title} className="w-full h-full object-cover" />
              </div>
            )}
            {post.excerpt && <p className="text-xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>}
            {post.body && (
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-img:rounded-lg"
                dangerouslySetInnerHTML={{
                  __html: (() => {
                    if (typeof post.body === 'string') return renderPlainBody(post.body);
                    if (Array.isArray(post.body)) return blocksToHtml(post.body as Parameters<typeof blocksToHtml>[0]);
                    const maybeHtml = (post.body as { html?: string })?.html;
                    if (typeof maybeHtml === 'string') return renderPlainBody(maybeHtml);
                    return '';
                  })(),
                }}
              />
            )}
          </div>
        </article>

        <ResourcesFooter lang={lang} />
      </div>
    </>
  );
}
