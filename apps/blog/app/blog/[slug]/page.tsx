import type { Metadata, ResolvingMetadata } from 'next';
import type { Locale } from '@/lib/types';
import { getPostBySlug } from '@/lib/queries';

type Params = { slug: string };
type SearchParams = { lang?: Locale };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export async function generateMetadata(
  { params, searchParams }: { params: Params; searchParams: SearchParams },
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const locale: Locale = searchParams.lang ?? 'en';
  const post = await getPostBySlug(params.slug, locale);

  if (!post) {
    return {
      title: 'Article not found',
      robots: { index: false, follow: false },
    };
  }

  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt || undefined;
  const canonical = post.canonical_url || `${siteUrl}/blog/${post.slug}`;
  const ogImage = post.og_image_url || undefined;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'article',
      url: canonical,
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const locale: Locale = searchParams.lang ?? 'en';
  const post = await getPostBySlug(params.slug, locale);

  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold mb-2">Article not found</h1>
        <p className="text-gray-600">The article you are looking for does not exist or is unpublished.</p>
      </main>
    );
  }

  const canonical = post.canonical_url || `${siteUrl}/blog/${post.slug}`;
  const published = post.published_at ? new Date(post.published_at) : null;
  const modified = new Date(post.updated_at);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.seo_title || post.title,
    description: post.seo_description || post.excerpt || undefined,
    datePublished: published ? published.toISOString() : undefined,
    dateModified: modified.toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    url: canonical,
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="space-y-4">
        <header>
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          {published && (
            <p className="text-sm text-gray-500">
              {published.toLocaleDateString()}
            </p>
          )}
          {post.excerpt && <p className="text-gray-700 mt-2">{post.excerpt}</p>}
        </header>

        {post.body ? (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.body }} />
        ) : post.content && typeof post.content === 'object' ? (
          <div className="prose max-w-none">
            <p className="text-gray-600">结构化内容（需自定义渲染）</p>
          </div>
        ) : (
          <p className="text-gray-500">Content coming soon.</p>
        )}
      </article>
    </main>
  );
}

