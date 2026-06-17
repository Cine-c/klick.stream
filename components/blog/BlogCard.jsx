import Link from 'next/link';
import Image from 'next/image';

export default function BlogCard({ post }) {
  const href = post.href || `/blog/${post.slug}`;

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <article className="blog-card">
      {post.imageUrl && (
        <Link href={href} className="blog-card-image">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
          {post.category && (
            <span className="blog-category-badge">{post.category}</span>
          )}
        </Link>
      )}
      <div className="blog-card-content">
        <Link href={href}>
          <h3 className="blog-card-title">{post.title}</h3>
        </Link>
        {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
        <div className="blog-card-meta">
          {formattedDate && <time dateTime={post.publishedAt}>{formattedDate}</time>}
          {post.author && <span className="blog-card-author">by {post.author}</span>}
          {post.readingTime && <span>{post.readingTime} min read</span>}
        </div>
        <Link href={href} className="blog-card-link">
          Read More
        </Link>
      </div>
    </article>
  );
}
