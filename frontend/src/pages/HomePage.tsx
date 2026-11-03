import { Link, useNavigate } from "react-router-dom"; // 1. Buraya useNavigate eklendi
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList"; // veya kendi yolunuz

export default function HomePage() {
    const { events } = useEvents();
    const navigate = useNavigate();

    const upcoming = events.slice(0, 2);

    return (
        <>
            <EventList
                events={upcoming}
                onShowDetail={(id) => navigate(`/events/${id}`)}
            />
            <Link className="buton" to="/events">
                Tüm Etkinlikleri Gör
            </Link>
        </>
    );
}