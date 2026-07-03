import EventGuide from '../../components/EventGuide';
import { AWARD_GUIDES } from '../../data/awardGuides';
import { getEventById } from '../../data/redCarpet';

export default function AwardGuide({ event, guide }) {
  return <EventGuide event={event} guide={guide} />;
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
    props: { event: { ...event, coverageBase: '/awards' }, guide },
    revalidate: 3600,
  };
}
