import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import EventDetail from "../components/events/EventDetail";
import { findEventById } from "../utils/filter-events";
import { useEvents } from "../context/EventsContext"; // Context'i import ediyoruz

export default function EventDetailPage() {
    const { id } = useParams();
    const { events } = useEvents(); // Veriyi Context'ten alıyoruz

    const event = findEventById(events, id ?? "");

    if (!event) return <NotFoundPage />;

    return (
        <>
            <h2>Etkinlik Detayları</h2>
            <EventDetail event={event} />
        </>
    );
}