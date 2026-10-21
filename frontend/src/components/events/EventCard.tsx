import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/formatDate";

interface EventCardProps {
    event: CampusEvent;
    onShowDetail: (id: string) => void;
}

export default function EventCard({ event, onShowDetail }: EventCardProps) {
    return (
        <article className="etkinlik-kart">
            <h3>{event.title}</h3>
            <p><strong>Tarih:</strong> {formatDate(event.date)}, {event.time}</p>
            <p><strong>Yer:</strong> {event.location}</p>
            <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
            <p>{event.description}</p>
            <a
                href="#detail"
                className="detay-link"
                onClick={(e) => {
                    e.preventDefault();
                    onShowDetail(event.id);
                }}
            >
                Detayları gör
            </a>
        </article>
    );
}