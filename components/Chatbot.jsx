import { useState, useRef, useEffect, useCallback } from 'react';

const TMDB_IMG = 'https://image.tmdb.org/t/p/w500';

const CHATBOT_CSS = `
.cnv-chat-btn{position:fixed;bottom:24px;right:24px;z-index:10000;width:60px;height:60px;border-radius:50%;border:none;background:radial-gradient(circle at 34% 26%,rgba(255,255,255,.55),rgba(255,255,255,0) 46%),linear-gradient(135deg,#60a5fa 0%,#8b5cf6 48%,#7c3aed 100%);color:#fff;font-size:28px;cursor:pointer;box-shadow:0 6px 22px rgba(124,58,237,.5),0 2px 8px rgba(0,0,0,.4),inset 0 -3px 8px rgba(76,29,149,.35),inset 0 2px 6px rgba(255,255,255,.35);transition:transform .25s cubic-bezier(.2,.8,.2,1),box-shadow .25s;display:flex;align-items:center;justify-content:center;line-height:1;animation:cnvPulse 2.8s ease-in-out infinite,cnvFloat 3.6s ease-in-out infinite}
.cnv-chat-btn:hover{transform:scale(1.12) rotate(-6deg);box-shadow:0 10px 34px rgba(124,58,237,.7),0 2px 12px rgba(0,0,0,.5);animation-play-state:paused}
.cnv-chat-btn:active{transform:scale(1.04)}
.cnv-chat-btn svg{filter:drop-shadow(0 1px 2px rgba(0,0,0,.25))}
.cnv-chat-window{display:none;position:fixed;bottom:96px;right:24px;z-index:10000;width:380px;max-height:540px;border-radius:var(--radius-lg,6px);background:var(--bg-secondary,#0e0e12);color:#e5e5e5;box-shadow:0 8px 32px rgba(0,0,0,.6);font-family:var(--font-body,'DM Sans',sans-serif);flex-direction:column;overflow:hidden;border:1px solid rgba(139,92,246,.25)}
.cnv-chat-window.open{display:flex}
.cnv-chat-header{background:linear-gradient(135deg,#8b5cf6,#7c3aed);padding:14px 18px;font-size:16px;font-weight:700;display:flex;justify-content:space-between;align-items:center;color:#fff;font-family:var(--font-heading,'Cormorant Garamond',serif)}
.cnv-chat-header button{background:none;border:none;color:#fff;font-size:22px;cursor:pointer;line-height:1;padding:0}
.cnv-chat-header button:hover{opacity:.7}
.cnv-messages{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;max-height:360px}
.cnv-messages::-webkit-scrollbar{width:6px}
.cnv-messages::-webkit-scrollbar-thumb{background:rgba(139,92,246,.4);border-radius:3px}
.cnv-msg{max-width:85%;padding:10px 14px;border-radius:var(--radius-md,4px);font-size:14px;line-height:1.45;white-space:pre-line}
.cnv-msg.bot{background:rgba(139,92,246,.10);align-self:flex-start;border:1px solid rgba(139,92,246,.18)}
.cnv-msg.user{background:#7c3aed;color:#fff;align-self:flex-end;font-weight:500}
.cnv-actions{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 8px}
.cnv-actions button{background:rgba(139,92,246,.10);color:#a78bfa;border:1px solid rgba(139,92,246,.30);border-radius:var(--radius-sm,2px);padding:6px 14px;font-size:13px;cursor:pointer;transition:background .2s,color .2s;font-family:var(--font-body,'DM Sans',sans-serif)}
.cnv-actions button:hover{background:#7c3aed;border-color:#7c3aed;color:#fff}
.cnv-input-bar{display:flex;border-top:1px solid rgba(139,92,246,.18);padding:10px}
.cnv-input-bar input{flex:1;background:rgba(139,92,246,.07);border:1px solid rgba(139,92,246,.18);border-radius:var(--radius-sm,2px);padding:10px 16px;color:#e5e5e5;font-size:14px;outline:none;font-family:var(--font-body,'DM Sans',sans-serif)}
.cnv-input-bar input::placeholder{color:#888}
.cnv-input-bar input:focus{border-color:#8b5cf6}
.cnv-input-bar button{background:#7c3aed;border:none;border-radius:var(--radius-sm,2px);width:38px;height:38px;margin-left:8px;color:#fff;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center}
.cnv-input-bar button:hover{opacity:.85}
.cnv-movie-card{background:rgba(139,92,246,.05);border-radius:var(--radius-md,4px);overflow:hidden;margin-top:6px;border:1px solid rgba(139,92,246,.12)}
.cnv-movie-card img{width:100%;height:160px;object-fit:cover}
.cnv-movie-card .cnv-card-body{padding:10px 12px}
.cnv-movie-card .cnv-card-title{font-weight:700;font-size:15px;margin-bottom:4px;color:#a78bfa}
.cnv-movie-card .cnv-card-meta{font-size:12px;color:#aaa;margin-bottom:6px}
.cnv-movie-card .cnv-card-overview{font-size:13px;color:#ccc;line-height:1.4}
.cnv-movie-card .cnv-card-providers{font-size:12px;color:#a78bfa;margin-top:6px;font-weight:600}
.cnv-typing span{display:inline-block;width:8px;height:8px;background:#8b5cf6;border-radius:50%;margin-right:4px;animation:cnvBounce .6s infinite alternate}
.cnv-typing span:nth-child(2){animation-delay:.2s}
.cnv-typing span:nth-child(3){animation-delay:.4s}
@keyframes cnvBounce{to{opacity:.3;transform:translateY(-4px)}}
@media(max-width:480px){.cnv-chat-window{width:calc(100vw - 20px);right:10px;bottom:86px;max-height:calc(100dvh - 110px)}.cnv-chat-btn{bottom:16px;right:16px;width:52px;height:52px}.cnv-chat-btn svg{width:28px;height:28px}.cnv-chat-tooltip{right:78px;bottom:22px;font-size:13px;padding:8px 14px}}
.cnv-chat-tooltip{position:fixed;bottom:30px;right:96px;z-index:10000;background:#7c3aed;color:#fff;font-family:var(--font-body,'DM Sans',sans-serif);font-size:14px;font-weight:600;padding:10px 16px;border-radius:var(--radius-md,4px);box-shadow:0 4px 12px rgba(0,0,0,.3);white-space:nowrap;animation:cnvFadeIn .4s ease-out}
.cnv-chat-tooltip::after{content:'';position:absolute;right:-6px;top:50%;transform:translateY(-50%);border:6px solid transparent;border-left-color:#7c3aed;border-right:0}
@keyframes cnvFadeIn{from{opacity:0;transform:translateX(8px)}to{opacity:1;transform:translateX(0)}}
@keyframes cnvPulse{0%,100%{box-shadow:0 6px 22px rgba(124,58,237,.5),0 0 0 0 rgba(139,92,246,.55),inset 0 -3px 8px rgba(76,29,149,.35),inset 0 2px 6px rgba(255,255,255,.35)}50%{box-shadow:0 8px 28px rgba(124,58,237,.6),0 0 0 12px rgba(139,92,246,0),inset 0 -3px 8px rgba(76,29,149,.35),inset 0 2px 6px rgba(255,255,255,.35)}}
@keyframes cnvFloat{0%,100%{translate:0 0}50%{translate:0 -7px}}
@media(prefers-reduced-motion:reduce){.cnv-chat-btn{animation:none}}
`;

const GENRE_MAP = {
  action: 28, adventure: 12, animation: 16, comedy: 35, crime: 80,
  documentary: 99, drama: 18, family: 10751, fantasy: 14, history: 36,
  horror: 27, music: 10402, mystery: 9648, romance: 10749, scifi: 878,
  'science fiction': 878, thriller: 53, war: 10752, western: 37,
};

function MovieCard({ movie, providers }) {
  const year = (movie.release_date || '').slice(0, 4);
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  let overview = movie.overview || 'No overview available.';
  if (overview.length > 140) overview = overview.slice(0, 139).trimEnd() + '\u2026';
  const backdrop = movie.backdrop_path ? TMDB_IMG + movie.backdrop_path : '';
  const providerText = providers && providers.length > 0
    ? 'Stream on: ' + providers.join(', ')
    : 'Check klick.stream for availability';

  return (
    <div className="cnv-movie-card">
      {backdrop && <img src={backdrop} alt={movie.title} />}
      <div className="cnv-card-body">
        <div className="cnv-card-title">{movie.title}{year ? ` (${year})` : ''}</div>
        <div className="cnv-card-meta">{'\u2B50'} {rating}/10</div>
        <div className="cnv-card-overview">{overview}</div>
        <div className="cnv-card-providers">{providerText}</div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="cnv-msg bot cnv-typing">
      <span /><span /><span />
    </div>
  );
}

async function fetchProviders(movieId) {
  try {
    const res = await fetch(`/api/movies/providers?movieId=${movieId}`);
    const data = await res.json();
    return data.providers || [];
  } catch {
    return [];
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [quickActions, setQuickActions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [hasOpened, setHasOpened] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesRef = useRef(null);
  const inputRef = useRef(null);

  // Show tooltip after 3 s, auto-dismiss after 3 more seconds
  useEffect(() => {
    const show = setTimeout(() => { if (!isOpen) setShowTooltip(true); }, 3000);
    const hide = setTimeout(() => setShowTooltip(false), 6000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  // Inject scoped CSS into head
  useEffect(() => {
    const id = 'cnv-chatbot-styles';
    if (!document.getElementById(id)) {
      const style = document.createElement('style');
      style.id = id;
      style.textContent = CHATBOT_CSS;
      document.head.appendChild(style);
    }
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const addBotMessage = useCallback((text) => {
    setMessages(prev => [...prev, { type: 'bot', text }]);
  }, []);

  const addUserMessage = useCallback((text) => {
    setMessages(prev => [...prev, { type: 'user', text }]);
  }, []);

  const addMovieCards = useCallback((movies) => {
    setMessages(prev => [...prev, ...movies.map(m => ({ type: 'movie', movie: m.movie, providers: m.providers }))]);
  }, []);

  const afterActions = useCallback(() => {
    setQuickActions([
      { label: 'Trending Now', key: 'trending' },
      { label: 'Recommend Me Something', key: 'random' },
      { label: 'Top Rated', key: 'toprated' },
    ]);
  }, []);

  const handleTrending = useCallback(async () => {
    setQuickActions([]);
    setIsTyping(true);
    try {
      const res = await fetch('/api/trending/day');
      const data = await res.json();
      const movies = (data.results || []).slice(0, 5);
      const withProviders = [];
      for (const m of movies) {
        const providers = await fetchProviders(m.id);
        withProviders.push({ movie: m, providers });
      }
      setIsTyping(false);
      addBotMessage("Here's what's trending today:");
      addMovieCards(withProviders);
    } catch {
      setIsTyping(false);
      addBotMessage('Sorry, I had trouble fetching trending movies. Try again later.');
    }
    afterActions();
  }, [addBotMessage, addMovieCards, afterActions]);

  const handleTopRated = useCallback(async () => {
    setQuickActions([]);
    setIsTyping(true);
    try {
      const res = await fetch('/api/movies/top-rated');
      const data = await res.json();
      const movies = (data.results || []).slice(0, 5);
      const withProviders = [];
      for (const m of movies) {
        const providers = await fetchProviders(m.id);
        withProviders.push({ movie: m, providers });
      }
      setIsTyping(false);
      addBotMessage('Here are some of the highest rated movies:');
      addMovieCards(withProviders);
    } catch {
      setIsTyping(false);
      addBotMessage('Sorry, I had trouble fetching top rated movies. Try again later.');
    }
    afterActions();
  }, [addBotMessage, addMovieCards, afterActions]);

  const handleRandom = useCallback(async () => {
    setQuickActions([]);
    setIsTyping(true);
    try {
      const page = Math.floor(Math.random() * 5) + 1;
      const res = await fetch(`/api/movies/popular?page=${page}`);
      const data = await res.json();
      const movies = data.results || [];
      const pick = movies[Math.floor(Math.random() * movies.length)];
      const providers = await fetchProviders(pick.id);
      setIsTyping(false);
      addBotMessage('I think you\'d enjoy this one:');
      addMovieCards([{ movie: pick, providers }]);
    } catch {
      setIsTyping(false);
      addBotMessage('Sorry, I had trouble finding a recommendation. Try again later.');
    }
    setQuickActions([
      { label: 'Another One', key: 'random' },
      { label: 'Trending Now', key: 'trending' },
    ]);
  }, [addBotMessage, addMovieCards]);

  const handleSearch = useCallback(async (query) => {
    setQuickActions([]);
    setIsTyping(true);
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (!data.results || data.results.length === 0) {
        setIsTyping(false);
        addBotMessage(`I couldn't find anything for "${query}". Try a different title.`);
        afterActions();
        return;
      }
      const movies = data.results.slice(0, 3);
      const withProviders = [];
      for (const m of movies) {
        const providers = await fetchProviders(m.id);
        withProviders.push({ movie: m, providers });
      }
      setIsTyping(false);
      addBotMessage(`Here's what I found for "${query}":`);
      addMovieCards(withProviders);
    } catch {
      setIsTyping(false);
      addBotMessage('Sorry, I had trouble searching. Try again later.');
    }
    afterActions();
  }, [addBotMessage, addMovieCards, afterActions]);

  const handleGenre = useCallback(async (query) => {
    setQuickActions([]);
    const key = query.toLowerCase().trim();
    const genreId = GENRE_MAP[key];
    if (!genreId) {
      addBotMessage("I don't recognize that genre. Try: action, comedy, horror, drama, thriller, scifi, romance, animation, or documentary.");
      afterActions();
      return;
    }
    setIsTyping(true);
    try {
      const res = await fetch(`/api/movies/discover?genre=${genreId}&sort=popularity.desc`);
      const data = await res.json();
      const movies = (data.results || []).slice(0, 5);
      const withProviders = [];
      for (const m of movies) {
        const providers = await fetchProviders(m.id);
        withProviders.push({ movie: m, providers });
      }
      setIsTyping(false);
      addBotMessage(`Top ${query} movies right now:`);
      addMovieCards(withProviders);
    } catch {
      setIsTyping(false);
      addBotMessage('Sorry, I had trouble fetching genre results. Try again later.');
    }
    afterActions();
  }, [addBotMessage, addMovieCards, afterActions]);

  const processInput = useCallback((text) => {
    const lower = text.toLowerCase();

    if (/trending|what.?s hot|popular now/.test(lower)) {
      handleTrending();
    } else if (/top rated|best movies|highest rated/.test(lower)) {
      handleTopRated();
    } else if (/recommend|suggest|random|surprise/.test(lower)) {
      handleRandom();
    } else if (/^(action|comedy|horror|drama|thriller|scifi|science fiction|romance|animation|documentary|adventure|fantasy|mystery|crime|western|war|family|history|music)\s*(movies?)?$/i.test(lower)) {
      handleGenre(lower.replace(/\s*movies?\s*$/, ''));
    } else if (/where.*(watch|stream)|can i (watch|stream)|available on/.test(lower)) {
      const title = lower.replace(/where.*(watch|stream)|can i (watch|stream)|available on/g, '').trim();
      if (title) handleSearch(title);
      else addBotMessage('Which movie are you looking for? Type the title and I\'ll find it.');
    } else if (/^(help|hi|hello|hey)$/i.test(lower)) {
      addBotMessage("I can help you with:\n\ud83c\udfac Search \u2014 type any movie title\n\ud83d\udd25 Trending \u2014 see what's hot today\n\u2b50 Top Rated \u2014 all-time best\n\ud83c\udfb2 Recommend \u2014 random pick for you\n\ud83c\udfad Genre \u2014 type a genre like \"horror\" or \"comedy\"");
      afterActions();
    } else {
      handleSearch(text);
    }
  }, [handleTrending, handleTopRated, handleRandom, handleSearch, handleGenre, addBotMessage, afterActions]);

  const handleQuickAction = useCallback((key) => {
    const labels = { trending: 'Trending Now', toprated: 'Top Rated', random: 'Recommend Me Something' };
    addUserMessage(labels[key] || key);
    if (key === 'trending') handleTrending();
    else if (key === 'toprated') handleTopRated();
    else if (key === 'random') handleRandom();
  }, [addUserMessage, handleTrending, handleTopRated, handleRandom]);

  const handleSend = useCallback(() => {
    const text = inputValue.trim();
    if (!text) return;
    setInputValue('');
    addUserMessage(text);
    processInput(text);
  }, [inputValue, addUserMessage, processInput]);

  const handleToggle = useCallback(() => {
    setShowTooltip(false);
    setIsOpen(prev => {
      const next = !prev;
      if (next && !hasOpened) {
        setHasOpened(true);
        setMessages([{ type: 'bot', text: "Hey! I'm the Klick.stream assistant. I can help you discover movies and find where to watch them." }]);
        setQuickActions([
          { label: 'Trending Now', key: 'trending' },
          { label: 'Top Rated', key: 'toprated' },
          { label: 'Recommend Me Something', key: 'random' },
        ]);
      }
      return next;
    });
  }, [hasOpened]);

  const botIcon = (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none">
      {/* antenna */}
      <line x1="12" y1="2.4" x2="12" y2="5.2" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="1.9" r="1.35" fill="#fff" />
      {/* ears */}
      <rect x="2.3" y="9.4" width="2.2" height="4.6" rx="1.1" fill="#fff" />
      <rect x="19.5" y="9.4" width="2.2" height="4.6" rx="1.1" fill="#fff" />
      {/* head */}
      <rect x="4.5" y="5.4" width="15" height="12.6" rx="3.6" fill="#fff" />
      {/* eyes */}
      <circle cx="9.1" cy="11" r="2.25" fill="#3b82f6" />
      <circle cx="14.9" cy="11" r="2.25" fill="#3b82f6" />
      {/* eye highlights */}
      <circle cx="9.8" cy="10.3" r="0.7" fill="#dbeafe" />
      <circle cx="15.6" cy="10.3" r="0.7" fill="#dbeafe" />
      {/* smile */}
      <path d="M9 14.7q3 2.1 6 0" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );

  return (
    <>
      {showTooltip && !isOpen && (
        <div className="cnv-chat-tooltip" onClick={handleToggle}>
          Hi! I can help you find movies
        </div>
      )}

      <button
        className="cnv-chat-btn"
        onClick={handleToggle}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? '\u2715' : botIcon}
      </button>

      <div className={`cnv-chat-window${isOpen ? ' open' : ''}`}>
        <div className="cnv-chat-header">
          <span>Klick.stream Assistant</span>
          <button onClick={handleToggle} aria-label="Close chat">&times;</button>
        </div>

        <div className="cnv-messages" ref={messagesRef}>
          {messages.map((msg, i) => {
            if (msg.type === 'movie') {
              return (
                <div key={i} className="cnv-msg bot">
                  <MovieCard movie={msg.movie} providers={msg.providers} />
                </div>
              );
            }
            return (
              <div key={i} className={`cnv-msg ${msg.type}`}>
                {msg.text}
              </div>
            );
          })}
          {isTyping && <TypingIndicator />}
        </div>

        {quickActions.length > 0 && (
          <div className="cnv-actions">
            {quickActions.map((a) => (
              <button key={a.key} onClick={() => handleQuickAction(a.key)}>
                {a.label}
              </button>
            ))}
          </div>
        )}

        <div className="cnv-input-bar">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search a movie or ask me anything..."
            autoComplete="off"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          />
          <button onClick={handleSend} aria-label="Send">&#9654;</button>
        </div>
      </div>
    </>
  );
}
