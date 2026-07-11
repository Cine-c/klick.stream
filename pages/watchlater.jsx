import SEOHead from '../components/seo/SEOHead';
import { useWatchLater } from '../components/WatchLaterContext';
import MovieGrid from '../components/trailers/MovieGrid';
import TrailerModal from '../components/trailers/TrailerModal';
import WatchlistStats from '../components/watchlist/WatchlistStats';
import Toast from '../components/Toast';
import { LEAVING_SOON } from '../data/leavingSoon';
import { useState } from 'react';
import Link from 'next/link';

export default function WatchLaterPage() {
  const { items, removeMany, undoRemove, toggle } = useWatchLater();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [selectMode, setSelectMode] = useState(false);
  const [toast, setToast] = useState(null);
  const [shareUrl, setShareUrl] = useState(null);
  const [shareLoading, setShareLoading] = useState(false);

  const leavingSoonIds = new Set(LEAVING_SOON.map((l) => l.id));

  const handleShare = async () => {
    if (items.length === 0) return;
    setShareLoading(true);
    try {
      const res = await fetch('/api/watchlist/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.shareId) {
        setShareUrl(`${window.location.origin}/list/${data.shareId}`);
      }
    } catch (err) {
      console.error('Share failed:', err);
    } finally {
      setShareLoading(false);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(items.map((m) => m.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleRemoveSelected = () => {
    removeMany(Array.from(selectedIds));
    setToast({ show: true });
    setSelectedIds(new Set());
    setSelectMode(false);
  };

  const handleUndo = () => {
    undoRemove();
    setToast(null);
  };

  const itemsWithLeavingFlag = items.map((item) => {
    const leaving = LEAVING_SOON.find((l) => l.id === item.id);
    return leaving ? { ...item, leaving } : item;
  });

  return (
    <>
      <SEOHead
        title="Watch Later - Klick.stream"
        description="Your saved movies to watch later."
        url="/watchlater"
      />

      <div className="watchlater-page">
        <section className="watchlater-hero">
          <h1>Watch Later</h1>
          <p>
            {items.length > 0
              ? `You have ${items.length} movie${items.length !== 1 ? 's' : ''} saved`
              : 'Your watch list is empty'}
          </p>
        </section>

        {items.length > 0 ? (
          <>
            <WatchlistStats items={items} />

            {selectMode && (
              <div className="watchlist-toolbar">
                <label className="select-all-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === items.length && items.length > 0}
                    onChange={handleSelectAll}
                  />
                  <span>Select All</span>
                </label>
                <span className="select-count">
                  {selectedIds.size > 0 && `${selectedIds.size} selected`}
                </span>
                <button
                  className="btn btn-danger"
                  onClick={handleRemoveSelected}
                  disabled={selectedIds.size === 0}
                >
                  Remove Selected
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setSelectMode(false);
                    setSelectedIds(new Set());
                  }}
                >
                  Cancel
                </button>
              </div>
            )}

            {!selectMode && (
              <div className="watchlist-actions">
                <button className="btn btn-secondary" onClick={() => setSelectMode(true)}>
                  Bulk Actions
                </button>
                <button className="btn btn-secondary" onClick={handleShare} disabled={shareLoading}>
                  {shareLoading ? 'Sharing...' : '🔗 Share List'}
                </button>
              </div>
            )}

            {shareUrl && (
              <div className="share-modal-overlay" onClick={() => setShareUrl(null)}>
                <div className="share-modal" onClick={(e) => e.stopPropagation()}>
                  <h2>Share Your Watchlist</h2>
                  <p>Share this link with anyone to show your saved movies:</p>
                  <div className="share-url-box">
                    <input type="text" value={shareUrl} readOnly className="share-url-input" />
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        navigator.clipboard.writeText(shareUrl);
                        setShareUrl(null);
                      }}
                    >
                      Copy Link
                    </button>
                  </div>
                  <button className="btn btn-secondary" onClick={() => setShareUrl(null)}>
                    Done
                  </button>
                </div>
              </div>
            )}

            <div className="movie-grid-wrapper">
              {itemsWithLeavingFlag.map((movie) => (
                <div key={movie.id} className="movie-item-wrapper">
                  {selectMode && (
                    <div className="movie-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(movie.id)}
                        onChange={() => handleSelectOne(movie.id)}
                      />
                    </div>
                  )}

                  {movie.leaving && (
                    <div className="leaving-badge">
                      Leaving {movie.leaving.platform}
                      <br />
                      {movie.leaving.leaveDate}
                    </div>
                  )}

                  <div onClick={() => setSelectedMovie(movie)} className="movie-card-clickable">
                    <MovieCardPreview movie={movie} />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🎬</div>
            <h3>No movies saved yet</h3>
            <p>Browse trailers and tap the bookmark icon to save movies for later.</p>
            <Link href="/trailers" className="btn btn-primary">
              Browse Trailers
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

        {toast?.show && (
          <Toast
            message={`${LEAVING_SOON.filter((l) => Array.from(selectedIds).includes(l.id)).length || 1} item${selectedIds.size !== 1 ? 's' : ''} removed`}
            action={true}
            actionLabel="Undo"
            onAction={handleUndo}
            autoClose={5000}
          />
        )}
      </div>
    </>
  );
}

// Simple movie card preview for watchlist
function MovieCardPreview({ movie }) {
  return (
    <div className="movie-card">
      <div className="movie-card-image">
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt={movie.title}
            width={160}
            height={240}
          />
        )}
      </div>
      <div className="movie-card-info">
        <h3>{movie.title}</h3>
        {movie.releaseYear && <p className="year">{movie.releaseYear}</p>}
        {movie.vote_average && <p className="rating">★ {movie.vote_average.toFixed(1)}</p>}
      </div>
    </div>
  );
}
