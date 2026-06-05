import Link from 'next/link';
import type { Metadata } from 'next';
import { listPublishedPosts } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest industry insights and solutions from Zhixin Paper.',
};

export default async function BlogIndexPage() {
  const posts = await listPublishedPosts('en');

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <header>
        <h1 className="text-3xl font-bold mb-2">Blog</h1>
        <p className="text-gray-600">
          Industry insights, solutions, and practical guides for thermal paper &amp; labels.
        </p>
      </header>

      <section className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold mb-1">
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                {post.title}
              </Link>
            </h2>
            {post.excerpt && <p className="text-gray-700 mb-2">{post.excerpt}</p>}
            {post.published_at && (
              <p className="text-xs text-gray-500">
                {new Date(post.published_at).toLocaleDateString()}
              </p>
            )}
          </article>
        ))}

        {posts.length === 0 && (
          <p className="text-gray-500">No published articles yet.</p>
        )}
      </section>
    </main>
  );
}

