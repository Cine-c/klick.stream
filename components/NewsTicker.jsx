/**
 * Live-scrolling headline ticker for the homepage news section.
 * Items are duplicated once so the CSS marquee loops seamlessly; the second
 * copy is hidden from assistive tech. Pauses on hover, respects reduced motion.
 */
export default function NewsTicker({ items = [] }) {
  if (!items || items.length === 0) return null;
  const loop = [...items, ...items];

  return (
    <div className="news-ticker" role="complementary" aria-label="Latest news headlines">
      <span className="news-ticker-badge">Live</span>
      <div className="news-ticker-viewport">
        <div className="news-ticker-track">
          {loop.map((item, i) => (
            <a
              key={`${i}-${item.link}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="news-ticker-item"
              aria-hidden={i >= items.length ? true : undefined}
              tabIndex={i >= items.length ? -1 : undefined}
            >
              <span className="news-ticker-source">{item.source}</span>
              <span className="news-ticker-title">{item.title}</span>
              <span className="news-ticker-sep" aria-hidden="true">◆</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
