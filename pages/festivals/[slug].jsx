import EventGuide from '../../components/EventGuide';
import { FESTIVAL_GUIDES } from '../../data/festivalGuides';
import { getEventById, getRelatedEvents } from '../../data/redCarpet';

export default function FestivalGuide({ event, guide, related }) {
  return <EventGuide event={event} guide={guide} related={related} />;
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(FESTIVAL_GUIDES).map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const guide = FESTIVAL_GUIDES[params.slug] || null;
  const event = getEventById(params.slug);
  if (!guide || !event) {
    return { notFound: true };
  }
  return {
    props: { event: { ...event, coverageBase: '/festivals' }, guide, related: getRelatedEvents(params.slug) },
    revalidate: 3600,
  };
}
