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
  {
    id: 'afi-fest-2026',
    title: 'AFI Fest 2026',
    type: 'Festival',
    date: '2026-10-22',
    endDate: '2026-10-29',
    location: 'TCL Chinese Theatre, Hollywood',
    accent: '#e67e22',
    blurb:
      'The American Film Institute’s Hollywood showcase closes out the fall circuit, spotlighting the year’s awards hopefuls with galas right on Hollywood Boulevard.',
    films: ['Awards Season Galas', 'World Cinema'],
    watch: 'Hollywood, CA',
  },
  {
    id: 'governors-awards-2026',
    title: '16th Governors Awards',
    type: 'Awards',
    date: '2026-11-14',
    location: 'Ray Dolby Ballroom, Hollywood',
    accent: '#d4af37',
    blurb:
      'The Academy’s honorary ceremony and the unofficial kickoff of Oscar campaign season — an intimate night of Honorary Awards and the year’s first real red carpet of the race.',
    films: ['Honorary Oscars', 'Career Tributes'],
    watch: 'Hollywood, CA',
  },
  {
    id: 'palm-springs-2027',
    title: 'Palm Springs Film Festival',
    type: 'Festival',
    date: '2027-01-02',
    endDate: '2027-01-12',
    location: 'Palm Springs, California',
    accent: '#e84393',
    blurb:
      'Its star-studded awards gala is a key Oscar-season stop, gathering the year’s frontrunners in the desert for one of the most-watched red carpets before the nominations.',
    films: ['Awards Gala', 'International Features'],
    watch: 'Palm Springs, CA',
  },
  {
    id: 'golden-globes-2027',
    title: '84th Golden Globe Awards',
    type: 'Awards',
    date: '2027-01-10',
    location: 'Beverly Hilton, Beverly Hills',
    accent: '#d4af37',
    blurb:
      'Hollywood’s loosest, boldest awards night returns to the Beverly Hilton — the champagne-fueled ceremony that honors the best in film and television and sets the season’s tone.',
    films: ['Best Motion Picture', 'Best TV Series'],
    watch: 'Live on CBS & Paramount+',
  },
  {
    id: 'critics-choice-2027',
    title: 'Critics’ Choice Awards 2027',
    type: 'Awards',
    date: '2027-01-17',
    location: 'Barker Hangar, Santa Monica',
    accent: '#f5b041',
    blurb:
      'Voted by the Critics Choice Association, this is one of the most reliable Oscar bellwethers — a full evening of film and television honors on the Santa Monica red carpet.',
    films: ['Best Picture', 'Best Series'],
    watch: 'Live on The CW',
  },
  {
    id: 'sundance-2027',
    title: 'Sundance Film Festival 2027',
    type: 'Festival',
    date: '2027-01-21',
    endDate: '2027-01-31',
    location: 'Park City, Utah',
    accent: '#0ea5e9',
    blurb:
      'The world’s premier independent film festival launches the discoveries of the year from the snowy mountains of Utah — where breakout hits and bidding wars are born.',
    films: ['U.S. Dramatic Competition', 'Premieres'],
    watch: 'Park City, Utah',
  },
  {
    id: 'berlinale-2027',
    title: '77th Berlin International Film Festival',
    type: 'Festival',
    date: '2027-02-11',
    endDate: '2027-02-21',
    location: 'Berlin, Germany',
    accent: '#c0392b',
    blurb:
      'The Berlinale — one of the “Big Three” European festivals alongside Cannes and Venice — brings its politically charged, world-cinema lineup and the coveted Golden Bear.',
    films: ['Golden Bear Competition', 'World Premieres'],
    watch: 'Berlin, Germany',
  },
  {
    id: 'bafta-2027',
    title: 'EE BAFTA Film Awards 2027',
    type: 'Awards',
    date: '2027-02-14',
    location: 'Royal Festival Hall, London',
    accent: '#9b59b6',
    blurb:
      'Britain’s biggest film honors and a crucial final signpost before the Oscars, with the industry’s A-list walking the rain-or-shine red carpet on London’s Southbank.',
    films: ['Best Film', 'Outstanding British Film'],
    watch: 'Live on BBC One',
  },
  {
    id: 'sag-awards-2027',
    title: 'SAG Awards 2027',
    type: 'Awards',
    date: '2027-02-21',
    location: 'Shrine Auditorium, Los Angeles',
    accent: '#16a085',
    blurb:
      'Actors honoring actors — the Screen Actors Guild ceremony is the single best predictor of the acting Oscars, and the last major stop before the Academy Awards.',
    films: ['Best Cast', 'Best Ensemble'],
    watch: 'Streaming on Netflix',
  },
  {
    id: 'sxsw-2027',
    title: 'SXSW Film & TV Festival 2027',
    type: 'Festival',
    date: '2027-03-13',
    endDate: '2027-03-21',
    location: 'Austin, Texas',
    accent: '#e74c3c',
    blurb:
      'Where film, music, and tech collide. SXSW premieres genre-bending crowd-pleasers and studio surprises to the most enthusiastic midnight audiences in the country.',
    films: ['Headliner Premieres', 'Midnighters'],
    watch: 'Austin, Texas',
  },
  {
    id: 'oscars-2027',
    title: '99th Academy Awards',
    type: 'Awards',
    date: '2027-03-14',
    location: 'Dolby Theatre, Hollywood',
    accent: '#d4af37',
    blurb:
      'The biggest night in cinema. The 99th Academy Awards crown the year’s best on the most famous red carpet in the world — the finish line of the entire awards season.',
    films: ['Best Picture', 'Best Director'],
    watch: 'Live on ABC',
  },
  {
    id: 'cannes-2027',
    title: '80th Festival de Cannes',
    type: 'Festival',
    date: '2027-05-11',
    endDate: '2027-05-22',
    location: 'Palais des Festivals, Cannes',
    accent: '#c0392b',
    blurb:
      'The most glamorous festival on Earth. Cannes’ 80th edition rolls out the iconic red steps of the Palais for twelve days of Palme d’Or contenders and legendary star power.',
    films: ['Palme d’Or Competition', 'Out of Competition'],
    watch: 'Cannes, France',
  },
];

/**
 * Event imagery — real TMDB backdrops of a film/show emblematic of each event
 * (e.g. Venice → Joker, which won its Golden Lion there). Same image CDN the
 * rest of the site uses. Keyed by event id so the event objects stay clean.
 */
const IMG = (p) => `https://image.tmdb.org/t/p/w780${p}`;
export const RED_CARPET_IMAGES = {
  'sdcc-2026': IMG('/eZ239CUp1d6OryZEBPnO2n87gMG.jpg'),
  'locarno-2026': IMG('/pnTSOKcYnvdpQNQElAtJM1rWOxH.jpg'),
  'venice-2026': IMG('/rlay2M5QYvi6igbGcFjq8jxeusY.jpg'),
  'telluride-2026': IMG('/A99WMiz0ASpH9coOFrxSEuwTWx0.jpg'),
  'tiff-2026': IMG('/lTyikzfGgRX5ZqIfVeT26APYfRL.jpg'),
  'emmys-2026': IMG('/ixgFmf1X59PUZam2qbAfskx2gQr.jpg'),
  'fantastic-fest-2026': IMG('/nAxGnGHOsfzufThz20zgmRwKur3.jpg'),
  'nyff-2026': IMG('/84XcRwKHAw4VXdKOYTSW5ARxFEt.jpg'),
  'lff-2026': IMG('/yCN98oNvavyHvFvdvwqmw9TkY9A.jpg'),
  'dune-three-premiere-2026': IMG('/eZ239CUp1d6OryZEBPnO2n87gMG.jpg'),
  'avatar-fire-ash-premiere-2026': IMG('/kJsPVzdyBrYHLomuNv5SJDXUQ2f.jpg'),
  'afi-fest-2026': IMG('/xQyGkQ8ICa4lgifGr3oZjkm3AJ2.jpg'),
  'governors-awards-2026': IMG('/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg'),
  'palm-springs-2027': IMG('/zh6IdheEYinU4TPtorWsjx6qPQE.jpg'),
  'golden-globes-2027': IMG('/3N5QNUqS76GFYNoEayfkkJyAyTN.jpg'),
  'critics-choice-2027': IMG('/fnxQUdLAjmSRCdudbYClkSnrxVf.jpg'),
  'sundance-2027': IMG('/v85FlkbMYKa5du1glm0YfYNsL2n.jpg'),
  'berlinale-2027': IMG('/9udCLTxTFl28RxnK8Q05E154ZGa.jpg'),
  'bafta-2027': IMG('/2lBOQK06tltt8SQaswgb8d657Mv.jpg'),
  'sag-awards-2027': IMG('/563sRDK3rZS31TXCdTY4lfcwrNK.jpg'),
  'sxsw-2027': IMG('/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg'),
  'oscars-2027': IMG('/neeNHeXjMF5fXoCJRsOmkNGC7q.jpg'),
  'cannes-2027': IMG('/wCuUKiRaz0wEESsYqmQy005xvTE.jpg'),
};

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
      image: RED_CARPET_IMAGES[e.id] || null,
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
