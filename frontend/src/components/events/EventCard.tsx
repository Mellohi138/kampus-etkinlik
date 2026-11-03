import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";

interface EventCardProps {
    event: CampusEvent;
}

export default function EventCard({ event }: EventCardProps) {
    return (
        <div className="etkinlik-karti">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <div className="etkinlik-detay-bilgi">
                <span><strong>Tarih:</strong> {event.date}</span>
                <span><strong>Kategori:</strong> {event.category}</span>
            </div>
            <Link className="buton" to={`/events/${event.id}`}>
                Detayları gör
            </Link>
        </div>
    );
}