/**
 * Long-form coverage guides for the awards ceremonies in the Red Carpet
 * calendar. Keyed by the event id in data/redCarpet.js. Award cards link to
 * /awards/[id]. Facts are real (founding years, venues, broadcasters, the
 * statuettes handed out). The Oscars entry follows the site's own continuity —
 * the 98th Academy Awards (2026) went to One Battle After Another.
 */

export const AWARD_GUIDES = {
  'governors-awards-2026': {
    headline: 'The 16th Governors Awards: Where Oscar Season Quietly Begins',
    standfirst:
      'The Academy’s honorary evening hands out its Honorary Oscars — and fires the starting gun on the campaign that ends at the Dolby.',
    facts: [
      ['First held', '2009'],
      ['Venue', 'Ovation Hollywood, Los Angeles'],
      ['Presented by', 'The Academy (AMPAS)'],
      ['Honors', 'Honorary Awards & special prizes'],
    ],
    body: [
      'The Governors Awards is the Academy’s more intimate ceremony — a black-tie dinner where the Honorary Oscars, the Jean Hersholt Humanitarian Award, and the Irving G. Thalberg Memorial Award are presented to figures whose careers have shaped the art form. There’s no telecast and no competition, just tributes and toasts.',
      'But its real significance is timing. Landing in November, the Governors Awards is the first night the season’s hopefuls gather in one room, making it the unofficial launch of Oscar campaigning — the moment the long road to the Academy Awards truly begins.',
    ],
    highlightsTitle: 'What the Governors Awards Presents',
    highlights: [
      'Honorary Academy Awards for lifetime achievement',
      'The Jean Hersholt Humanitarian Award',
      'The Irving G. Thalberg Memorial Award for producers',
      'The unofficial kickoff of Oscar campaign season',
    ],
    follow: 'Honoree announcements and highlights are published at oscars.org.',
  },

  'golden-globes-2027': {
    headline: 'The 84th Golden Globe Awards: Hollywood’s Loosest, Boldest Night',
    standfirst:
      'Film and television, champagne on every table, and the first big televised trophy of the awards-season sprint.',
    facts: [
      ['First held', '1944'],
      ['Venue', 'Beverly Hilton, Beverly Hills'],
      ['Broadcast', 'CBS & Paramount+'],
      ['Covers', 'Film and television'],
    ],
    body: [
      'The Golden Globes are awards season’s most relaxed marquee event — a dinner-table ceremony where film and television are honored side by side and the champagne flows freely. That looseness makes for unpredictable speeches and viral moments the more buttoned-up ceremonies can’t match.',
      'Splitting its top film prizes between Drama and Musical or Comedy, the Globes reward a broader range of movies than the Oscars, and as one of the first major televised ceremonies of the year, they set the tone — and the narratives — for the campaign ahead.',
    ],
    highlightsTitle: 'What Makes the Globes Distinct',
    highlights: [
      'Separate Best Motion Picture — Drama and — Musical/Comedy prizes',
      'Film and TV honored on the same night',
      'A famously loose, unscripted atmosphere',
      'One of the first big televised trophies of the season',
    ],
    follow: 'Nominations, winners, and red carpet coverage are posted at goldenglobes.com.',
  },

  'critics-choice-2027': {
    headline: 'Critics’ Choice Awards 2027: The Season’s Most Reliable Bellwether',
    standfirst:
      'Voted by the Critics Choice Association, and one of the steadiest predictors of the eventual Oscar Best Picture.',
    facts: [
      ['First film awards', '1996'],
      ['Venue', 'Barker Hangar, Santa Monica'],
      ['Presented by', 'Critics Choice Association'],
      ['Covers', 'Film and television'],
    ],
    body: [
      'The Critics’ Choice Awards are handed out by the largest critics’ organization in North America, and that broad professional voting body has made them one of the most dependable Oscar bellwethers on the calendar — their Best Picture pick lines up with the Academy’s more often than almost any other precursor.',
      'Honoring both film and television in a single glossy ceremony, Critics’ Choice sits in the crucial January window, arriving just as Oscar nomination voting gets under way and helping crystallize the frontrunners in every major race.',
    ],
    highlightsTitle: 'Why Critics’ Choice Counts',
    highlights: [
      'One of the most accurate Best Picture predictors',
      'Voted by hundreds of professional critics',
      'Film and television honored together',
      'Perfectly timed with Oscar nomination voting',
    ],
    follow: 'Nominations and winners are announced at criticschoice.com.',
  },

  'bafta-2027': {
    headline: 'The 2027 BAFTA Film Awards: Britain’s Biggest Night at the Movies',
    standfirst:
      'The final major signpost before the Oscars, staged on London’s Southbank with the industry’s A-list in attendance.',
    facts: [
      ['First held', '1949'],
      ['Venue', 'Royal Festival Hall, London'],
      ['Broadcast', 'BBC One'],
      ['Presented by', 'BAFTA'],
    ],
    body: [
      'The British Academy Film Awards are the UK’s most prestigious film honors and, by their February date, one of the last big precursors before the Oscars. A strong BAFTA showing can supply decisive late momentum — or expose a frontrunner’s weaknesses — with the Academy’s international membership watching closely.',
      'Held at London’s Royal Festival Hall and broadcast by the BBC, BAFTA blends the year’s global contenders with its own Outstanding British Film category, and its rain-or-shine Southbank red carpet is one of the most glamorous stops of the season.',
    ],
    highlightsTitle: 'BAFTA at a Glance',
    highlights: [
      'A key final precursor before the Academy Awards',
      'The distinctive Outstanding British Film prize',
      'The EE Rising Star Award, voted by the public',
      'A glamorous Southbank red carpet on BBC One',
    ],
    follow: 'Nominations and winners are published at bafta.org.',
  },

  'sag-awards-2027': {
    headline: 'SAG Awards 2027: Actors Honoring Actors — and Predicting the Oscars',
    standfirst:
      'The Screen Actors Guild ceremony is the single best forecaster of the acting Oscars, and the last major stop before the Dolby.',
    facts: [
      ['First held', '1995'],
      ['Statuette', 'The Actor'],
      ['Top film prize', 'Best Cast (Ensemble)'],
      ['Streaming', 'Netflix'],
    ],
    body: [
      'The Screen Actors Guild Awards carry unique weight: they’re voted entirely by performers, and since actors make up the largest branch of the Academy, the SAG results are the most accurate crystal ball for the acting Oscars anywhere on the calendar.',
      'Its headline film honor, Outstanding Performance by a Cast — the ensemble prize — is a closely watched stand-in for Best Picture, and arriving late in the season, a SAG sweep is one of the strongest signals of Oscar-night momentum a film can get.',
    ],
    highlightsTitle: 'Why the SAG Awards Matter',
    highlights: [
      'The best predictor of the four acting Oscars',
      'Best Cast — the ensemble prize watched as a Best Picture proxy',
      'Voted entirely by fellow actors',
      'The last major precursor before the Academy Awards',
    ],
    follow: 'The nominees and winners are announced at sagawards.org.',
  },

  'oscars-2027': {
    headline: 'The 99th Academy Awards: The Biggest Night in Cinema',
    standfirst:
      'The finish line of the entire awards season — where the year’s best are crowned on the most famous red carpet in the world.',
    facts: [
      ['First held', '1929'],
      ['Venue', 'Dolby Theatre, Hollywood'],
      ['Broadcast', 'ABC'],
      ['Presented by', 'The Academy (AMPAS)'],
    ],
    body: [
      'There is no bigger stage in film. The Academy Awards are the culmination of a months-long season that runs from the fall festivals through Venice, Telluride, and Toronto, past the Globes, Critics’ Choice, BAFTAs, and SAG Awards, and finally to the Dolby Theatre — where every campaign, precursor, and prediction is settled at last.',
      'The 99th ceremony follows a landmark 98th, at which One Battle After Another took Best Picture and Best Director for Paul Thomas Anderson while Sinners rewrote the record books. Whoever hears their name called on the most famous red carpet in the world joins a century of cinema history.',
    ],
    highlightsTitle: 'The Road to the 99th Oscars',
    highlights: [
      'Last year: One Battle After Another won Best Picture (98th)',
      'The season’s final and most prestigious verdict',
      'The Dolby Theatre — the most famous red carpet on Earth',
      'Nearly a century of film history behind the statuette',
    ],
    follow: 'Nominations, winners, and full ceremony coverage are at oscars.org.',
  },
};

export function hasAwardGuide(id) {
  return Object.prototype.hasOwnProperty.call(AWARD_GUIDES, id);
}
