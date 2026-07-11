import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const WatchLaterContext = createContext({ items: [], toggle: () => {}, has: () => false, removeMany: () => {}, undoRemove: () => {} });

export function WatchLaterProvider({ children }) {
  const [items, setItems] = useState([]);
  const lastRemovedRef = useRef(null);
  const undoTimerRef = useRef(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('watchLater');
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = useCallback((next) => {
    setItems(next);
    try { localStorage.setItem('watchLater', JSON.stringify(next)); } catch {}
  }, []);

  const toggle = useCallback((movie) => {
    setItems((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      const next = exists ? prev.filter((m) => m.id !== movie.id) : [...prev, {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        releaseYear: movie.releaseYear || (movie.release_date ? movie.release_date.split('-')[0] : ''),
        media_type: movie.media_type || 'movie',
        genre_ids: movie.genre_ids || [],
      }];
      try { localStorage.setItem('watchLater', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const has = useCallback((movieId) => items.some((m) => m.id === movieId), [items]);

  const removeMany = useCallback((ids) => {
    setItems((prev) => {
      const toRemove = prev.filter((m) => ids.includes(m.id));
      const next = prev.filter((m) => !ids.includes(m.id));
      lastRemovedRef.current = toRemove;

      if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
      undoTimerRef.current = setTimeout(() => {
        lastRemovedRef.current = null;
      }, 5000);

      try { localStorage.setItem('watchLater', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const undoRemove = useCallback(() => {
    if (!lastRemovedRef.current || lastRemovedRef.current.length === 0) return;
    setItems((prev) => {
      const next = [...lastRemovedRef.current, ...prev];
      lastRemovedRef.current = null;
      if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
      try { localStorage.setItem('watchLater', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  return (
    <WatchLaterContext.Provider value={{ items, toggle, has, removeMany, undoRemove }}>
      {children}
    </WatchLaterContext.Provider>
  );
}

export function useWatchLater() {
  return useContext(WatchLaterContext);
}
