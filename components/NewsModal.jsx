import { useEffect } from 'react';

/**
 * On-site reader for a news headline. Opens in place instead of redirecting
 * off-site; shows the image + summary from the feed, with an opt-in link to
 * the full story at the source (the only outbound navigation, user-initiated).
 */
export default function NewsModal({ article, onClose }) {
  useEffect(() => {
    if (!article) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [article, onClose]);

  if (!article) return null;

  const date = article.date
    ? new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <div className="news-modal-overlay" onClick={onClose}>
      <div
        className="news-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={article.title}
      >
        <button className="news-modal-close" onClick={onClose} aria-label="Close">&times;</button>
        {article.image && (
          <div className="news-modal-thumb">
            <img
              src={article.image}
              alt=""
              referrerPolicy="no-referrer"
              onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
            />
          </div>
        )}
        <div className="news-modal-body">
          {date && <div className="news-modal-meta">{date}</div>}
          <h2 className="news-modal-title">{article.title}</h2>
          {article.description && <p className="news-modal-desc">{article.description}</p>}
          <a className="news-modal-cta" href={article.link} target="_blank" rel="noopener noreferrer">
            Read the full story&nbsp;↗
          </a>
        </div>
      </div>
    </div>
  );
}
