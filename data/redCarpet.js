/**
 * Red Carpet & Premieres — curated calendar of upcoming film festivals,
 * award ceremonies, and marquee world premieres.
 *
 * Dates are ISO (start of the event). `withCountdown()` derives days-until
 * and a friendly status so pages can render a live countdown without shipping
 * client-side date logic. Update this list as the season evolves.
 */

export const RED_CARPET_EVENTS = [
  {
    id: 'sdcc-2026',
    title: 'San Diego Comic-Con 2026',
    type: 'Convention',
    date: '2026-07-23',
    endDate: '2026-07-26',
    location: 'San Diego Convention Center, CA',
    accent: '#e0245e',
    blurb:
      'The biggest pop-culture event of the summer. Hall H hosts first looks at the fall and 2027 tentpoles, with studio panels, surprise footage, and cast red carpets across four days.',
    films: ['Marvel Studios — Hall H', 'Dune: Part Three (first look)', 'Star Wars Universe'],
    watch: 'Panels & livestreams',
  },
  {
    id: 'locarno-2026',
    title: 'Locarno Film Festival',
    type: 'Festival',
    date: '2026-08-05',
    endDate: '2026-08-15',
    location: 'Piazza Grande, Locarno, Switzerland',
    accent: '#f59e0b',
    blurb:
      'Europe’s boldest summer festival, famous for its 8,000-seat open-air Piazza Grande premieres and its championing of daring, auteur-driven world cinema.',
    films: ['Golden Leopard Competition', 'Piazza Grande Premieres'],
    watch: 'Locarno, Switzerland',
  },
  {
    id: 'venice-2026',
    title: '83rd Venice Film Festival',
    type: 'Festival',
    date: '2026-09-02',
    endDate: '2026-09-12',
    location: 'Lido di Venezia, Italy',
    accent: '#c0392b',
    blurb:
      'Where awards season truly begins. The oldest film festival in the world launches the year’s biggest Oscar contenders on the Lido, with the Golden Lion the prize everyone chases.',
    films: ['Golden Lion Competition', 'Awards-season world premieres'],
    watch: 'Red carpet on the Lido',
  },
  {
    id: 'telluride-2026',
    title: 'Telluride Film Festival',
    type: 'Festival',
    date: '2026-09-04',
    endDate: '2026-09-07',
    location: 'Telluride, Colorado',
    accent: '#8e44ad',
    blurb:
      'The secretive Labor Day festival with no announced lineup until you arrive — and a track record of unveiling eventual Best Picture winners in the Colorado mountains.',
    films: ['Surprise Oscar contenders', 'Silver Medallion tributes'],
    watch: 'Telluride, Colorado',
  },
  {
    id: 'tiff-2026',
    title: 'Toronto International Film Festival',
    type: 'Festival',
    date: '2026-09-10',
    endDate: '2026-09-20',
    location: 'Toronto, Canada',
    accent: '#0ea5e9',
    blurb:
      'The largest public film festival on the planet and the ultimate crowd-pleaser barometer. TIFF’s People’s Choice Award has predicted the Best Picture race for a decade.',
    films: ['People’s Choice Award', 'Gala Premieres'],
    watch: 'Toronto, Canada',
  },
  {
    id: 'emmys-2026',
    title: '78th Primetime Emmy Awards',
    type: 'Awards',
    date: '2026-09-20',
    location: 'Peacock Theater, Los Angeles',
    accent: '#d4af37',
    blurb:
      'Television’s biggest night. Severance leads the Drama race, The Bear dominates Comedy, and Zendaya chases a historic third trophy for Euphoria. Our full predictions are live.',
    films: ['Severance', 'The Bear', 'The Studio'],
    watch: 'Live on NBC & Peacock',
    url: '/articles/emmy-awards-2026-preview',
  },
  {
    id: 'fantastic-fest-2026',
    title: 'Fantastic Fest 2026',
    type: 'Festival',
    date: '2026-09-24',
    endDate: '2026-10-01',
    location: 'Alamo Drafthouse, Austin, TX',
    accent: '#e74c3c',
    blurb:
      'The largest genre festival in the U.S. — horror, sci-fi, action, and cult cinema premieres for the die-hards, plus the infamous late-night secret screenings.',
    films: ['Horror & genre premieres', 'Secret screenings'],
    watch: 'Austin, Texas',
  },
  {
    id: 'nyff-2026',
    title: '64th New York Film Festival',
    type: 'Festival',
    date: '2026-09-25',
    endDate: '2026-10-11',
    location: 'Lincoln Center, New York',
    accent: '#2ecc71',
    blurb:
      'The prestige capstone of the fall circuit. NYFF’s tightly curated Main Slate hands over the biggest Opening, Centerpiece, and Closing Night galas of the season.',
    films: ['Opening Night Gala', 'Main Slate Premieres'],
    watch: 'Lincoln Center, NYC',
  },
  {
    id: 'lff-2026',
    title: 'BFI London Film Festival',
    type: 'Festival',
    date: '2026-10-07',
    endDate: '2026-10-18',
    location: 'Southbank, London, UK',
    accent: '#3498db',
    blurb:
      'The UK’s flagship festival brings the fall’s biggest titles to Leicester Square, with European premieres and star-packed red carpets across twelve days.',
    films: ['European Premieres', 'Leicester Square Galas'],
    watch: 'London, UK',
  },
  {
    id: 'dune-three-premiere-2026',
    title: 'Dune: Part Three — World Premiere',
    type: 'Premiere',
    date: '2026-12-01',
    location: 'Leicester Square, London',
    accent: '#c8964b',
    blurb:
      'Denis Villeneuve returns to Arrakis. The world premiere of the trilogy’s epic conclusion ahead of its December theatrical release — the red carpet event of the winter.',
    films: ['Dune: Part Three'],
    watch: 'In theaters Dec 18',
  },
  {
    id: 'avatar-fire-ash-premiere-2026',
    title: 'Avatar: Fire and Ash — World Premiere',
    type: 'Premiere',
    date: '2026-12-08',
    location: 'Dolby Theatre, Hollywood',
    accent: '#1abc9c',
    blurb:
      'James Cameron’s third Pandora saga gets its global bow. Expect a spectacle red carpet before the film opens worldwide in time for the holidays.',
    films: ['Avatar: Fire and Ash'],
    watch: 'In theaters Dec 18',
  },
];

const MS_PER_DAY = 86400000;

function fmtRange(startISO, endISO) {
  const start = new Date(startISO + 'T00:00:00');
  const opts = { month: 'short', day: 'numeric' };
  if (!endISO) return start.toLocaleDateString('en-US', opts);
  const end = new Date(endISO + 'T00:00:00');
  const sameMonth = start.getMonth() === end.getMonth();
  const startStr = start.toLocaleDateString('en-US', opts);
  const endStr = end.toLocaleDateString('en-US', sameMonth ? { day: 'numeric' } : opts);
  return `${startStr}–${endStr}`;
}

/**
 * Returns the events with derived countdown fields, filtering out any that
 * have fully finished, and sorted by soonest start date.
 * @param {number} [nowMs] injectable "now" for deterministic SSG
 */
export function withCountdown(nowMs = Date.now()) {
  return RED_CARPET_EVENTS.map((e) => {
    const startMs = new Date(e.date + 'T00:00:00').getTime();
    const endMs = e.endDate ? new Date(e.endDate + 'T23:59:59').getTime() : startMs + MS_PER_DAY;
    const daysUntil = Math.ceil((startMs - nowMs) / MS_PER_DAY);
    const live = nowMs >= startMs && nowMs <= endMs;
    const month = new Date(e.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const day = new Date(e.date + 'T00:00:00').getDate();
    const plural = (n, unit) => `In ${n} ${unit}${n === 1 ? '' : 's'}`;
    let countdownLabel;
    if (live) countdownLabel = 'Happening now';
    else if (daysUntil <= 0) countdownLabel = 'This week';
    else if (daysUntil === 1) countdownLabel = 'Tomorrow';
    else if (daysUntil <= 7) countdownLabel = plural(daysUntil, 'day');
    else if (daysUntil <= 30) countdownLabel = plural(Math.round(daysUntil / 7), 'week');
    else countdownLabel = plural(Math.round(daysUntil / 30), 'month');
    return {
      ...e,
      dateRange: fmtRange(e.date, e.endDate),
      month,
      day,
      daysUntil,
      live,
      countdownLabel,
      finished: nowMs > endMs,
    };
  })
    .filter((e) => !e.finished)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}
