import { useParams, useNavigate } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import NotFoundPage from "./NotFoundPage";
import { useEvents, type EventFormData } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";

export default function EditEventPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { events, updateEvent } = useEvents();

    const event = findEventById(events, id ?? "");

    if (!event) return <NotFoundPage />;

    const initialData: EventFormData = {
        title: event.title,
        category: event.category,
        capacity: String(event.capacity),
        date: event.date,
        time: event.time,
        location: event.location,
        description: event.description,
        image: event.image,
    };

    function handleSubmit(data: EventFormData) {
        if (id) {
            updateEvent(id, data);
            navigate(`/events/${id}`); // Güncelleme sonrası detay sayfasına git
        }
    }

    return (
        <>
            <h2>Etkinliği Güncelle</h2>
            <EventForm
                initialData={initialData}
                submitText="Güncelle"
                onSubmit={handleSubmit}
            />
        </>
    );
}