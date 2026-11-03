import { useNavigate } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { useEvents, type EventFormData } from "../context/EventsContext";

export default function AddEventPage() {
    const navigate = useNavigate();
    const { addEvent } = useEvents();

    const initialData: EventFormData = {
        title: "",
        category: "",
        capacity: "",
        date: "",
        time: "",
        location: "",
        description: "",
    };

    function handleSubmit(data: EventFormData) {
        addEvent(data);
        navigate("/events");
    }

    return (
        <>
            <h2>Yeni Etkinlik Ekle</h2>
            <EventForm
                initialData={initialData}
                submitText="Kaydet"
                onSubmit={handleSubmit}
            />
        </>
    );
}