import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventDetail from "../components/events/EventDetail";

export default function EventDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { events } = useEvents();
    const navigate = useNavigate();

    const event = events.find((e) => e.id === id);

    if (!event) {
        return <p>Etkinlik bulunamadı.</p>;
    }

    return (
        <>
            <h2>Etkinlik Detayları</h2>
            <EventDetail
                event={event}
                onBack={() => navigate("/events")}
                onEdit={() => navigate(`/admin/${event.id}/edit`)}
            />
        </>
    );
}