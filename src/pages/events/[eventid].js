import EventContent from "components/event-detail/event-content";
import EventLogistics from "components/event-detail/event-logistics";
import EventSummary from "components/event-detail/event-summary";
import { getEventById, getFeaturedEvents } from "helpers/api-util";

import { Fragment } from "react";

function EventDetailPage(props) {
  

  const event = props.selectedEvent;

  if (!event) {
    return  <div><p>Loading...</p></div> 
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {

  const eventId = context.params.eventid;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event
      },
    revalidate: 30
    
    }


}

export async function getStaticPaths() {

  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventid: event.id } }));
  if (!events || paths.length === 0) {
    return {
      notFound: true
    }
  }

  return {
    paths: paths,
    fallback: true
    }
  }

export default EventDetailPage;
