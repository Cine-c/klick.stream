// Generates original, data-driven editorial prose for a movie detail page.
// The goal is to add genuine human-style analysis on top of raw TMDB/OMDb data
// (verdict, critical-reception interpretation, streaming guidance, box-office read)
// so each page offers original value rather than just reposting a catalog entry.
//
// Everything here is derived from the film's own data, so it stays accurate and
// varies meaningfully from title to title.

function formatRuntime(minutes) {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  return `${m}m`;
}

function listToProse(items, conjunction = 'and') {
  const arr = items.filter(Boolean);
  if (arr.length === 0) return '';
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return `${arr[0]} ${conjunction} ${arr[1]}`;
  return `${arr.slice(0, -1).join(', ')}, ${conjunction} ${arr[arr.length - 1]}`;
}

// Parses the leading number from a score string, e.g. "82%" -> 82,
// "71/100" -> 71. Returns null when there's no number.
function parseScore(value) {
  if (!value) return null;
  const match = String(value).match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

// Builds an array of paragraph strings. Returns [] when there isn't enough data
// to say anything meaningful (so the section can be hidden).
export function generateMovieEditorial({ movie, credits, ratings, watchProviders }) {
  if (!movie) return [];

  const title = movie.title;
  const year = movie.release_date ? movie.release_date.split('-')[0] : null;
  const runtime = formatRuntime(movie.runtime);
  const genres = (movie.genres || []).map((g) => g.name);
  const primaryGenre = genres[0] ? genres[0].toLowerCase() : 'film';
  const director = (credits?.crew || []).find((c) => c.job === 'Director');
  const leads = (credits?.cast || []).slice(0, 3).map((c) => c.name);

  const paragraphs = [];

  // ---- Paragraph 1: contextual lede ----
  {
    const genrePhrase = genres.length
      ? `${listToProse(genres.slice(0, 2).map((g) => g.toLowerCase()))} film`
      : 'film';
    let lede = `${title} is a${year ? ` ${year}` : ''} ${genrePhrase}`;
    if (director) lede += ` directed by ${director.name}`;
    lede += '.';
    if (leads.length) {
      lede += ` It stars ${listToProse(leads)}`;
      if (runtime) lede += `, and runs ${runtime}`;
      lede += '.';
    } else if (runtime) {
      lede += ` The film runs ${runtime}.`;
    }
    paragraphs.push(lede);
  }

  // ---- Paragraph 2: critical reception, interpreted ----
  {
    const tmdb = movie.vote_average > 0 ? movie.vote_average : null;
    const imdb = ratings?.imdbRating && ratings.imdbRating !== 'N/A'
      ? parseFloat(ratings.imdbRating) : null;
    const rt = parseScore(
      (ratings?.Ratings || []).find((r) => r.Source === 'Rotten Tomatoes')?.Value
    );
    const meta = parseScore(
      (ratings?.Ratings || []).find((r) => r.Source === 'Metacritic')?.Value
    );

    const scores = [];
    if (rt !== null) scores.push(`a Rotten Tomatoes score of ${rt}%`);
    if (imdb !== null) scores.push(`an IMDb rating of ${imdb.toFixed(1)}/10`);
    if (meta !== null) scores.push(`a Metacritic score of ${meta}/100`);
    if (tmdb !== null && scores.length < 2) scores.push(`a TMDB user score of ${tmdb.toFixed(1)}/10`);

    if (scores.length) {
      // Pick an overall verdict from whatever signal is strongest available.
      const benchmark = rt !== null ? rt
        : meta !== null ? meta
        : imdb !== null ? imdb * 10
        : tmdb !== null ? tmdb * 10
        : null;

      let verdict;
      if (benchmark === null) verdict = '';
      else if (benchmark >= 80) verdict = `Critics and audiences have responded warmly to ${title}, marking it as one of the better-reviewed ${primaryGenre} releases of its year.`;
      else if (benchmark >= 65) verdict = `Reviews for ${title} land on the positive side, suggesting a solid, watchable entry in the ${primaryGenre} space even if it isn't universally adored.`;
      else if (benchmark >= 50) verdict = `${title} has drawn a mixed reception, with reactions split on whether it fully delivers on its premise.`;
      else verdict = `${title} has struggled with critics, so it's best approached with tempered expectations or as a watch for genre completists.`;

      paragraphs.push(`On the review front, ${title} holds ${listToProse(scores)}. ${verdict}`.trim());
    }
  }

  // ---- Paragraph 3: where to watch guidance ----
  {
    const flat = (watchProviders?.flatrate || []).map((p) => p.provider_name);
    const free = [
      ...(watchProviders?.free || []),
      ...(watchProviders?.ads || []),
    ].map((p) => p.provider_name);
    const rent = (watchProviders?.rent || []).map((p) => p.provider_name);
    const buy = (watchProviders?.buy || []).map((p) => p.provider_name);

    const sentences = [];
    if (flat.length) {
      sentences.push(`In the US, ${title} is included with a subscription on ${listToProse(flat.slice(0, 4))}`);
    }
    if (free.length) {
      sentences.push(`${flat.length ? 'It can also be streamed free' : `${title} can be streamed free`} (with ads) on ${listToProse(free.slice(0, 3))}`);
    }
    if (rent.length || buy.length) {
      const opts = [];
      if (rent.length) opts.push(`rented from ${listToProse(rent.slice(0, 3))}`);
      if (buy.length) opts.push(`bought on ${listToProse(buy.slice(0, 3))}`);
      sentences.push(`${(flat.length || free.length) ? 'For a one-off watch, it can be' : `${title} is available to be`} ${listToProse(opts, 'or')}`);
    }

    if (sentences.length) {
      paragraphs.push(`${sentences.join('. ')}. Streaming availability changes regularly, so check the platforms above for the most current options.`);
    } else {
      paragraphs.push(`Streaming options for ${title} can vary by region and over time. Use the "Where to Watch" section above to see the platforms currently carrying the film in your country.`);
    }
  }

  // ---- Paragraph 4: box office read (only when data supports it) ----
  {
    const budget = movie.budget > 0 ? movie.budget : null;
    const revenue = movie.revenue > 0 ? movie.revenue : null;
    if (budget && revenue) {
      const fmt = (n) => n >= 1_000_000_000
        ? `$${(n / 1_000_000_000).toFixed(2)} billion`
        : `$${Math.round(n / 1_000_000)} million`;
      const multiple = revenue / budget;
      let read;
      if (multiple >= 2.5) read = `comfortably turning a profit and ranking as a commercial success`;
      else if (multiple >= 1) read = `recouping its production budget at the box office`;
      else read = `falling short of its production budget in theatrical returns`;
      paragraphs.push(`Financially, ${title} was made on a reported budget of ${fmt(budget)} and grossed ${fmt(revenue)} worldwide, ${read}.`);
    }
  }

  return paragraphs;
}

export default generateMovieEditorial;
