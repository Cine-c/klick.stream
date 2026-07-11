import { useState } from 'react';
import SEOHead from '../../components/seo/SEOHead';
import MovieGrid from '../../components/trailers/MovieGrid';
import TrailerModal from '../../components/trailers/TrailerModal';
import Link from 'next/link';
import { getSharedList } from '../../lib/firestore-admin';

export default function SharedListPage({ list, shareId }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (!list) {
    return (
      <div className="error-page">
        <h1>List not found</h1>
        <p>This shared watchlist could not be found or has expired.</p>
        <Link href="/trailers">← Browse movies</Link>
      </div>
    );
  }

  const movies = list.items || [];

  return (
    <>
      <SEOHead
        title="Shared Watchlist - Klick.stream"
        description={`A shared watchlist with ${movies.length} movies`}
        url={`/list/${shareId}`}
      />

      <div className="shared-list-page">
        <section className="shared-list-hero">
          <h1>Shared Watchlist</h1>
          <p>
            {movies.length > 0
              ? `${movies.length} movie${movies.length !== 1 ? 's' : ''} to watch`
              : 'This watchlist is empty'}
          </p>
          <p className="shared-info">
            Created: {new Date(list.createdAt).toLocaleDateString()} · Share ID: <code>{shareId}</code>
          </p>
        </section>

        {movies.length > 0 ? (
          <MovieGrid movies={movies} onWatchTrailer={setSelectedMovie} />
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🍿</div>
            <h3>This list is empty</h3>
            <Link href="/trailers" className="btn btn-primary">
              Browse Movies
            </Link>
          </div>
        )}

        {selectedMovie && (
          <TrailerModal
            movie={selectedMovie}
            mediaType={selectedMovie.media_type === 'tv' ? 'tv' : 'movie'}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { shareId } = params;

  try {
    const list = await getSharedList(shareId);
    if (!list) {
      return { notFound: true };
    }
    return {
      props: { list, shareId },
      revalidate: 3600,
    };
  } catch (err) {
    console.error(`Error fetching shared list ${shareId}:`, err);
    return { notFound: true };
  }
}
