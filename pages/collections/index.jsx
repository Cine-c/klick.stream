import SEOHead from '../../components/seo/SEOHead';
import Link from 'next/link';
import { COLLECTIONS } from '../../data/collections';

export default function CollectionsPage() {
  return (
    <>
      <SEOHead
        title="Collections - Klick.stream"
        description="Curated movie collections and themed lists."
        url="/collections"
      />

      <div className="collections-page">
        <section className="collections-hero">
          <h1>Collections</h1>
          <p>Curated lists of the best films, handpicked by our editors</p>
        </section>

        <div className="collections-grid">
          {COLLECTIONS.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="collection-card"
            >
              <div className="collection-card-header">
                <h2>{collection.title}</h2>
                <span className="collection-count">{collection.movieIds.length} films</span>
              </div>
              <p className="collection-description">{collection.description}</p>
              <span className="collection-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
