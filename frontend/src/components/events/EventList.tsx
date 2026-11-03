import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";

interface EventListProps {
    events: CampusEvent[];
    onShowDetail?: (id: string) => void; // Opsiyonel yapıldı ki zorunlu kalmasın
    emptyText?: string;
}

export default function EventList({
    events,
    onShowDetail,
    emptyText = "Henüz hiç etkinlik bulunmuyor.",
}: EventListProps) {
    if (!events || events.length === 0) {
        return <p>{emptyText}</p>;
    }

    return (
        <div className="etkinlik-grid etkinlikler-mobil-grid">
            {events.map((event) => (
                <div key={event.id} style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <div style={{ margin: "10px 0" }}>
                        <span><strong>Tarih:</strong> {event.date}</span> | &nbsp;
                        <span><strong>Kategori:</strong> {event.category}</span>
                    </div>
                    {onShowDetail ? (
                        <button
                            className="buton"
                            onClick={() => onShowDetail(event.id)}
                        >
                            Detayları gör
                        </button>
                    ) : (
                        <Link className="buton" to={`/events/${event.id}`}>
                            Detayları gör
                        </Link>
                    )}
                </div>
            ))}
        </div>
    );
}