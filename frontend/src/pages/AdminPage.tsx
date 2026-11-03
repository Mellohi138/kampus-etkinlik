import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";

export default function AdminPage() {
    const { events, deleteEvent } = useEvents();

    return (
        <>
            <h2>
                <div style={{ marginBottom: "20px" }}>
                    <Link className="buton" to="/admin/new">
                        + Yeni etkinlik
                    </Link>
                </div>
            </h2>

            {events.length === 0 ? (
                <p>Henüz hiç etkinlik bulunmuyor.</p>
            ) : (
                <table className="tablo">
                    <thead>
                        <tr>
                            <th>Etkinlik</th>
                            <th>Tarih</th>
                            <th>Kategori</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>
                                <td data-baslik="Etkinlik">{event.title}</td>
                                <td data-baslik="Tarih">{event.date}</td>
                                <td data-baslik="Kategori">{event.category}</td>
                                <td data-baslik="İşlemler" className="islemler">
                                    <Link to={`/admin/${event.id}/edit`}>
                                        Düzenle
                                    </Link>
                                    <button
                                        className="buton buton-sil"
                                        onClick={() => {
                                            if (window.confirm(`"${event.title}" silinsin mi?`)) {
                                                deleteEvent(event.id);
                                            }
                                        }}
                                    >
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}