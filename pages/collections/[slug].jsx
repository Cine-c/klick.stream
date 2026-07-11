import SEOHead from '../../components/seo/SEOHead';
import MovieGrid from '../../components/trailers/MovieGrid';
import { useState } from 'react';
import TrailerModal from '../../components/trailers/TrailerModal';
import Link from 'next/link';
import { COLLECTIONS } from '../../data/collections';

export default function CollectionPage({ collection, movies = [] }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (!collection) {
    return (
      <div className="error-page">
        <h1>Collection not found</h1>
        <Link href="/collections">← Back to Collections</Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${collection.title} - Klick.stream`}
        description={collection.description}
        url={`/collections/${collection.slug}`}
      />

      <div className="collection-detail-page">
        <section className="collection-hero">
          <Link href="/collections" className="back-link">← Collections</Link>
          <h1>{collection.title}</h1>
          <p>{collection.description}</p>
          <span className="film-count">{movies.length} films</span>
        </section>

        {movies.length > 0 ? (
          <MovieGrid movies={movies} onWatchTrailer={setSelectedMovie} />
        ) : (
          <div className="empty-state">
            <p>No films available in this collection.</p>
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

export async function getStaticProps({ params }) {
  const { slug } = params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);

  if (!collection) {
    return { notFound: true };
  }

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return { props: { collection, movies: [] }, revalidate: 3600 };
  }

  try {
    const movieResults = await Promise.allSettled(
      collection.movieIds.map((id) =>
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
          .then((r) => r.json())
      )
    );

    const movies = movieResults
      .filter((r) => r.status === 'fulfilled' && r.value?.id)
      .map((r) => {
        const data = r.value;
        return {
          id: data.id,
          title: data.title,
          poster_path: data.poster_path,
          backdrop_path: data.backdrop_path,
          vote_average: data.vote_average,
          release_date: data.release_date,
          overview: data.overview,
          genre_ids: data.genres?.map((g) => g.id) || [],
          media_type: 'movie',
        };
      });

    return {
      props: { collection, movies },
      revalidate: 86400,
    };
  } catch (err) {
    console.error(`Error fetching movies for collection ${slug}:`, err);
    return {
      props: { collection, movies: [] },
      revalidate: 3600,
    };
  }
}

export async function getStaticPaths() {
  return {
    paths: COLLECTIONS.map((c) => ({ params: { slug: c.slug } })),
    fallback: 'blocking',
  };
}
