import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/formatDate";

interface EventDetailProps {
    event: CampusEvent;
    onBack: () => void;
    onEdit: (id: string) => void;
}

export default function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
    return (
        <article className="detay-container detay-sayfasi-grid">
            <div className="afis-bolumu detay-sol">
                {event.image ? (
                    <figure>
                        <img src={event.image} alt={`${event.title} afişi`} />
                        <figcaption>{event.title} afişi</figcaption>
                    </figure>
                ) : (
                    <div className="afis-kutu">Afiş Bulunamadı</div>
                )}

                <h3>Açıklama</h3>
                <p>{event.description}</p>

                <div>
                    <a
                        href="#events"
                        className="geri-link"
                        onClick={(e) => {
                            e.preventDefault();
                            onBack();
                        }}
                    >
                        &larr; Listeye dön
                    </a>{" | "}
                    <a
                        href="#update"
                        className="detay-link"
                        onClick={(e) => {
                            e.preventDefault();
                            onEdit(event.id);
                        }}
                    >
                        Bu etkinliği güncelle
                    </a>
                </div>
            </div>

            <div className="bilgi-bolumu detay-sag">
                <div className="detay-mobil-container">
                    <h3>Etkinlik Künyesi</h3>
                    <p>
                        <strong>Tarih:</strong> {formatDate(event.date)},{" "}
                        {event.time}
                    </p>
                    <p>
                        <strong>Yer:</strong> {event.location}
                    </p>
                    <p>
                        <strong>Kategori:</strong> {event.category}
                    </p>
                    <p>
                        <strong>Kontenjan:</strong> {event.capacity} kişi
                    </p>
                </div>
            </div>
        </article>
    );
}