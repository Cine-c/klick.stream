import EventGuide from '../../components/EventGuide';
import { AWARD_GUIDES } from '../../data/awardGuides';
import { getEventById, getRelatedEvents } from '../../data/redCarpet';

export default function AwardGuide({ event, guide, related }) {
  return <EventGuide event={event} guide={guide} related={related} />;
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(AWARD_GUIDES).map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const guide = AWARD_GUIDES[params.slug] || null;
  const event = getEventById(params.slug);
  if (!guide || !event) {
    return { notFound: true };
  }
  return {
    props: { event: { ...event, coverageBase: '/awards' }, guide, related: getRelatedEvents(params.slug) },
    revalidate: 3600,
  };
}
