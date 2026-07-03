/**
 * Long-form coverage guides for the Red Carpet festival calendar.
 * Keyed by the event id in data/redCarpet.js. Each festival card on the
 * homepage and /red-carpet links to /festivals/[id], which renders this
 * content. Facts are real (founding years, venues, top prizes, notable
 * premieres) so the pages are genuinely useful, not filler.
 */

export const FESTIVAL_GUIDES = {
  'sdcc-2026': {
    headline: 'San Diego Comic-Con 2026: The Ultimate Movie & TV Preview Guide',
    standfirst:
      'Four days of first looks, surprise footage, and Hall H madness — everything to expect from pop culture’s biggest weekend.',
    facts: [
      ['Founded', '1970'],
      ['Location', 'San Diego Convention Center'],
      ['Signature', 'Hall H studio panels'],
      ['Attendance', '~135,000'],
    ],
    body: [
      'San Diego Comic-Con is the closest thing the entertainment industry has to a summer Super Bowl. What began in 1970 as a 300-person comics gathering is now the most-watched marketing event of the year, where Marvel, Warner Bros., and Lucasfilm unveil their next slate to a 6,500-seat Hall H crowd — and, via livestream, to the world.',
      'For 2026, expect first-footage reveals for the fall and 2027 tentpoles, cast reunions, and the usual crop of surprise announcements that set the internet on fire. Marvel Studios’ Hall H presentation remains the hottest ticket, while genre TV — from HBO to streaming — increasingly dominates the schedule alongside film.',
    ],
    highlightsTitle: 'Moments Comic-Con Made Famous',
    highlights: [
      'The first Avengers cast assembly (2010)',
      'Marvel’s Phase reveals that map out years of releases',
      'Surprise trailer drops for Star Wars and DC tentpoles',
      'Cast panels that become instant viral moments',
    ],
    follow: 'Follow the biggest panels via official studio livestreams and the Comic-Con schedule at comic-con.org.',
  },

  'locarno-2026': {
    headline: 'Locarno Film Festival 2026: The Open-Air Home of Bold World Cinema',
    standfirst:
      'Under the stars on the Piazza Grande, Europe’s most adventurous summer festival champions the films the big three won’t.',
    facts: [
      ['Founded', '1946'],
      ['Location', 'Locarno, Switzerland'],
      ['Top Prize', 'Pardo d’Oro (Golden Leopard)'],
      ['Signature', '8,000-seat Piazza Grande'],
    ],
    body: [
      'Locarno occupies a unique place on the calendar: a major festival that prizes discovery over glamour. Its 8,000-seat Piazza Grande — one of the largest open-air screens in the world — turns a Swiss lakeside town into a nightly cinema for tens of thousands, while the competition spotlights emerging auteurs from every corner of the globe.',
      'The Golden Leopard has a track record of anointing directors years before the wider world catches on, making Locarno essential viewing for anyone who wants to know where cinema is heading next rather than where it has already been.',
    ],
    highlightsTitle: 'Why Locarno Matters',
    highlights: [
      'A launchpad for first- and second-time directors',
      'Career retrospectives and honorary Leopards for screen legends',
      'The Piazza Grande — cinema for 8,000 under the night sky',
      'A reputation for bold, form-breaking world premieres',
    ],
    follow: 'Lineup, jury, and award news are published throughout the festival at locarnofestival.ch.',
  },

  'venice-2026': {
    headline: 'Venice Film Festival 2026: Where Oscar Season Officially Begins',
    standfirst:
      'The oldest film festival on Earth launches the year’s biggest awards contenders from the Lido — and hands out the Golden Lion everyone chases.',
    facts: [
      ['Founded', '1932'],
      ['Location', 'Lido di Venezia, Italy'],
      ['Top Prize', 'Golden Lion'],
      ['Edition', '83rd'],
    ],
    body: [
      'When the lights go up on the Lido, awards season has begun. Founded in 1932, Venice is the world’s oldest film festival and, over the past decade, its most reliable Oscar bellwether — the launchpad that sent Joker, Nomadland, The Shape of Water, and Poor Things toward the Academy Awards.',
      'Its blend of A-list world premieres, out-of-competition blockbusters, and the coveted Golden Lion makes the late-August/early-September stretch the single most important week of the pre-Oscar calendar. What plays well on the Lido tends to define the conversation right through to March.',
    ],
    highlightsTitle: 'Golden Lion Winners That Went the Distance',
    highlights: [
      'Joker (2019) — Golden Lion, then Best Actor at the Oscars',
      'Nomadland (2020) — Golden Lion to Best Picture',
      'The Shape of Water (2017) — Golden Lion to Best Picture',
      'Poor Things (2023) — Golden Lion and four Academy Awards',
    ],
    follow: 'Competition titles, jury verdicts, and red carpet coverage run daily at labiennale.org.',
  },

  'telluride-2026': {
    headline: 'Telluride Film Festival 2026: The Secret Festival That Picks Oscar Winners',
    standfirst:
      'No announced lineup, no prizes, no red-carpet circus — just a mountain town that keeps launching Best Picture winners.',
    facts: [
      ['Founded', '1974'],
      ['Location', 'Telluride, Colorado'],
      ['Format', 'Non-competitive'],
      ['Signature', 'Lineup kept secret until arrival'],
    ],
    body: [
      'Telluride is the festival that trades spectacle for prestige. It announces nothing until attendees arrive in the Colorado mountains over Labor Day weekend — and yet, year after year, it unveils the eventual Oscar frontrunner before anyone else has seen it.',
      'Slumdog Millionaire, The King’s Speech, 12 Years a Slave, Argo, Spotlight, La La Land, and The Holdovers all built their momentum here. With no jury and no prizes, Telluride’s only currency is the buzz that follows a film off the mountain — and that buzz has an uncanny way of ending at the Dolby Theatre.',
    ],
    highlightsTitle: 'Best Picture Winners Telluride Launched',
    highlights: [
      'Slumdog Millionaire (2008)',
      'The King’s Speech (2010)',
      '12 Years a Slave (2013)',
      'Spotlight (2015)',
    ],
    follow: 'The lineup drops the day the festival opens — watch for it at telluridefilmfestival.org.',
  },

  'tiff-2026': {
    headline: 'Toronto International Film Festival 2026: The People’s Oscar Barometer',
    standfirst:
      'The largest public film festival on the planet, and the award that has predicted Best Picture better than almost anything.',
    facts: [
      ['Founded', '1976'],
      ['Location', 'Toronto, Canada'],
      ['Top Prize', 'People’s Choice Award'],
      ['Known for', 'Audience-driven Oscar buzz'],
    ],
    body: [
      'TIFF is where the industry meets the audience. Unlike the jury-driven European festivals, its headline prize is voted by the public — and that People’s Choice Award has become one of the most accurate Best Picture predictors in the business, tracing a line through Nomadland, Green Book, Jojo Rabbit, and American Fiction.',
      'Sprawling across downtown Toronto every September with hundreds of titles and star-studded galas, TIFF is the definitive test of whether a prestige film can also win a crowd. A rapturous reception here can turn a festival darling into a genuine awards contender overnight.',
    ],
    highlightsTitle: 'People’s Choice Winners That Chased the Oscar',
    highlights: [
      'Nomadland (2020) — People’s Choice to Best Picture',
      'Green Book (2018) — People’s Choice to Best Picture',
      'Jojo Rabbit (2019) — People’s Choice winner',
      '12 Years a Slave (2013) — People’s Choice to Best Picture',
    ],
    follow: 'Galas, premieres, and the People’s Choice result are announced at tiff.net.',
  },

  'fantastic-fest-2026': {
    headline: 'Fantastic Fest 2026: America’s Wildest Genre Film Festival',
    standfirst:
      'Horror, sci-fi, action, and cult cinema for the die-hards — plus the notorious late-night secret screenings.',
    facts: [
      ['Founded', '2005'],
      ['Location', 'Alamo Drafthouse, Austin, TX'],
      ['Focus', 'Genre & cult cinema'],
      ['Signature', 'Secret screenings'],
    ],
    body: [
      'Founded in 2005 at Austin’s Alamo Drafthouse, Fantastic Fest is the largest genre film festival in the United States — a joyful, midnight-movie celebration of horror, sci-fi, fantasy, and everything too strange for the prestige circuit. Its audiences are among the most enthusiastic anywhere, and its secret screenings are the stuff of legend.',
      'For genre fans, it’s the essential fall stop: a place where the year’s scariest, weirdest, and most inventive films get their loudest, most appreciative premieres before they reach the rest of us.',
    ],
    highlightsTitle: 'What Makes Fantastic Fest Special',
    highlights: [
      'World premieres of the year’s boldest horror',
      'Legendary unannounced secret screenings',
      'A raucous, genre-loving audience',
      'Discoveries that become cult classics',
    ],
    follow: 'Programming and secret-screening reveals land throughout the week at fantasticfest.com.',
  },

  'nyff-2026': {
    headline: 'New York Film Festival 2026: The Prestige Capstone of the Fall Circuit',
    standfirst:
      'A tightly curated Main Slate at Lincoln Center that hands the season its biggest Opening, Centerpiece, and Closing galas.',
    facts: [
      ['Founded', '1963'],
      ['Location', 'Lincoln Center, New York'],
      ['Format', 'Non-competitive, curated'],
      ['Signature', 'Main Slate galas'],
    ],
    body: [
      'Where other festivals go big, the New York Film Festival goes selective. Since 1963, its fiercely curated Main Slate has favored quality over quantity, and its Opening, Centerpiece, and Closing Night galas at Lincoln Center are among the most prestigious premieres in North America.',
      'NYFF has launched The Social Network, Gone Girl, and The Irishman, and its stamp of approval carries real weight in the final stretch before the Oscars. It’s the festival for cinephiles who want the season’s finest, not its loudest.',
    ],
    highlightsTitle: 'Landmark NYFF Premieres',
    highlights: [
      'The Social Network (2010) — Opening Night',
      'Gone Girl (2014) — Opening Night',
      'The Irishman (2019) — Opening Night',
      'Marriage Story (2019) — Main Slate',
    ],
    follow: 'The Main Slate and gala titles are announced ahead of the festival at filmlinc.org.',
  },

  'lff-2026': {
    headline: 'BFI London Film Festival 2026: The UK’s Flagship Film Event',
    standfirst:
      'Twelve days of European premieres and star-packed Leicester Square galas bring the fall’s biggest titles to London.',
    facts: [
      ['Founded', '1957'],
      ['Location', 'Southbank & Leicester Square, London'],
      ['Organiser', 'British Film Institute'],
      ['Signature', 'Leicester Square galas'],
    ],
    body: [
      'The BFI London Film Festival is Britain’s biggest and most prestigious film event, bringing the autumn’s major titles — many fresh from Venice, Telluride, and Toronto — to European audiences across twelve days each October. Its Leicester Square galas draw the industry’s A-list to some of the season’s most glamorous red carpets.',
      'For UK audiences, LFF is the first chance to see the year’s awards contenders on the big screen, and its blend of blockbuster premieres, bold independents, and international discoveries makes it a highlight of the London cultural calendar.',
    ],
    highlightsTitle: 'What to Expect at LFF',
    highlights: [
      'European premieres of the fall’s prestige titles',
      'Star-studded Leicester Square gala screenings',
      'A strong slate of British and international cinema',
      'The festival’s own Best Film competition',
    ],
    follow: 'Gala announcements and screening schedules are published at bfi.org.uk/lff.',
  },

  'afi-fest-2026': {
    headline: 'AFI Fest 2026: Hollywood’s Awards-Season Showcase',
    standfirst:
      'The American Film Institute closes out the fall circuit with galas right on Hollywood Boulevard.',
    facts: [
      ['Founded', '1987'],
      ['Location', 'TCL Chinese Theatre, Hollywood'],
      ['Organiser', 'American Film Institute'],
      ['Format', 'Non-competitive'],
    ],
    body: [
      'AFI Fest is Hollywood’s hometown festival — the American Film Institute’s annual showcase, staged at the historic TCL Chinese Theatre and other Hollywood Boulevard venues. Landing late in the fall, it functions as one of the last major stops before Oscar voting begins in earnest.',
      'Its galas gather the year’s hopefuls in the heart of the film capital, pairing high-profile awards contenders with a broad international slate and career tributes to the industry’s biggest names.',
    ],
    highlightsTitle: 'Why AFI Fest Counts',
    highlights: [
      'Premieres in the heart of Hollywood',
      'A key late-season stop for Oscar contenders',
      'Tributes and conversations with major filmmakers',
      'A curated blend of prestige and world cinema',
    ],
    follow: 'Lineup and gala news are posted at fest.afi.com.',
  },

  'palm-springs-2027': {
    headline: 'Palm Springs International Film Festival 2027: The Desert’s Awards-Season Kickoff',
    standfirst:
      'Its star-studded January gala gathers the year’s frontrunners in the desert just as Oscar voting heats up.',
    facts: [
      ['Founded', '1989'],
      ['Location', 'Palm Springs, California'],
      ['Signature', 'Film Awards Gala'],
      ['Timing', 'Early January'],
    ],
    body: [
      'The Palm Springs International Film Festival has become a fixture of the early-January awards run, thanks largely to its glamorous Film Awards Gala — one of the most-watched red carpets before the Oscar nominations, where the season’s frontrunners gather to accept honors in the desert.',
      'Beyond the gala, the festival is one of the largest in the U.S. for international cinema, hosting a sprawling slate that includes many of the year’s foreign-language Oscar hopefuls. It’s where the final sprint of awards season effectively begins.',
    ],
    highlightsTitle: 'Palm Springs Highlights',
    highlights: [
      'The star-packed Film Awards Gala',
      'A major showcase for international Oscar contenders',
      'One of the first red carpets of the new year',
      'A key stop on the road to the Academy Awards',
    ],
    follow: 'Gala honorees and screening schedules are announced at psfilmfest.org.',
  },

  'sundance-2027': {
    headline: 'Sundance Film Festival 2027: Where Independent Cinema Is Born',
    standfirst:
      'The world’s premier indie festival launches the year’s breakout discoveries from the snow of Park City.',
    facts: [
      ['Founded', '1978'],
      ['Location', 'Park City, Utah'],
      ['Top Prize', 'Grand Jury Prize'],
      ['Founder', 'Robert Redford'],
    ],
    body: [
      'Robert Redford’s Sundance is the beating heart of American independent film — the festival where careers launch and bidding wars ignite. Every January, the industry decamps to snowy Park City to discover the year’s breakout voices before anyone else.',
      'Its roster of discoveries is staggering: CODA, Whiplash, Little Miss Sunshine, Reservoir Dogs, Precious, and countless others premiered here first. A Grand Jury Prize — or even a rapturous midnight screening — can turn an unknown filmmaker into the industry’s next big thing overnight.',
    ],
    highlightsTitle: 'Sundance Discoveries That Made History',
    highlights: [
      'CODA (2021) — Sundance to Best Picture',
      'Whiplash (2014) — Grand Jury Prize winner',
      'Little Miss Sunshine (2006)',
      'Reservoir Dogs (1992)',
    ],
    follow: 'The lineup, awards, and acquisition news are posted throughout at sundance.org.',
  },

  'berlinale-2027': {
    headline: 'Berlin International Film Festival 2027: Europe’s Boldest Political Stage',
    standfirst:
      'One of the “big three” festivals, the Berlinale pairs world cinema with a fearless political conscience — and the Golden Bear.',
    facts: [
      ['Founded', '1951'],
      ['Location', 'Berlin, Germany'],
      ['Top Prize', 'Golden Bear'],
      ['Known for', 'Politically engaged cinema'],
    ],
    body: [
      'The Berlinale rounds out the “big three” European festivals alongside Cannes and Venice, and it wears its political heart on its sleeve. Held each February, it’s the most publicly attended festival in the world and a champion of socially engaged, boundary-pushing filmmaking from every continent.',
      'The Golden Bear has crowned a diverse and daring roster of winners, and the festival’s enormous public audience gives it an energy the more exclusive festivals can’t match. It’s the first major European stop of the new film year.',
    ],
    highlightsTitle: 'The Berlinale at a Glance',
    highlights: [
      'The prestigious Golden Bear competition',
      'The world’s largest public festival audience',
      'A tradition of politically fearless programming',
      'The Grand Budapest Hotel’s 2014 opening-night bow',
    ],
    follow: 'Competition titles and Golden Bear news are published at berlinale.de.',
  },

  'sxsw-2027': {
    headline: 'SXSW Film & TV Festival 2027: Where Film, Music & Tech Collide',
    standfirst:
      'Austin’s genre-loving crowds have turned crowd-pleasers into phenomena — from A Quiet Place to Everything Everywhere All at Once.',
    facts: [
      ['Founded', '1987'],
      ['Location', 'Austin, Texas'],
      ['Known for', 'Enthusiastic premiere audiences'],
      ['Focus', 'Crowd-pleasers & discoveries'],
    ],
    body: [
      'SXSW is the festival where the audience makes the movie. Its famously electric Austin crowds have launched some of the most beloved films of the past decade — A Quiet Place and Everything Everywhere All at Once both detonated here before conquering the world — making it the ideal venue for genre thrills and studio surprises.',
      'Sitting at the intersection of film, music, and technology, SXSW has an energy unlike any other stop on the circuit. A rapturous premiere in Austin can build word-of-mouth that carries a film all the way to awards season.',
    ],
    highlightsTitle: 'SXSW Premieres That Broke Out',
    highlights: [
      'Everything Everywhere All at Once (2022)',
      'A Quiet Place (2018)',
      'Us (2019)',
      'Baby Driver (2017)',
    ],
    follow: 'Headliner and premiere announcements are posted at sxsw.com.',
  },

  'cannes-2027': {
    headline: 'Cannes Film Festival 2027: The Most Glamorous Festival on Earth',
    standfirst:
      'The red steps of the Palais, the Palme d’Or, and twelve days of the highest-stakes premieres in cinema.',
    facts: [
      ['Founded', '1946'],
      ['Location', 'Palais des Festivals, Cannes'],
      ['Top Prize', 'Palme d’Or'],
      ['Edition', '80th'],
    ],
    body: [
      'Cannes is cinema at its most glamorous and its most consequential. For twelve days each May, the film world ascends the red steps of the Palais des Festivals, where the Palme d’Or is the most prestigious prize in the medium and a single premiere can define a director’s career.',
      'Its history is the history of great film itself — Pulp Fiction, Apocalypse Now, Taxi Driver, and Parasite all took the Palme, and Parasite’s 2019 win famously carried all the way to Best Picture. What premieres on the Croisette shapes the year in cinema that follows.',
    ],
    highlightsTitle: 'Palme d’Or Winners That Defined Cinema',
    highlights: [
      'Parasite (2019) — Palme d’Or, then Best Picture',
      'Pulp Fiction (1994)',
      'Apocalypse Now (1979)',
      'Taxi Driver (1976)',
    ],
    follow: 'Competition lineup, jury, and Palme d’Or news are published at festival-cannes.com.',
  },
};

export function hasFestivalGuide(id) {
  return Object.prototype.hasOwnProperty.call(FESTIVAL_GUIDES, id);
}
