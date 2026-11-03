import { createContext, useContext, useState, type ReactNode } from "react";
import type { CampusEvent, Category } from "../types/campus-event";
import { events as initialEvents } from "../data/events";

export interface EventFormData {
    title: string;
    category: Category | "";
    capacity: string;
    date: string;
    time: string;
    location: string;
    description: string;
    image?: string;
}

interface EventsContextValue {
    events: CampusEvent[];
    addEvent: (data: EventFormData) => void;
    updateEvent: (id: string, data: EventFormData) => void;
    deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

function toEvent(id: string, data: EventFormData): CampusEvent {
    return {
        id,
        title: data.title.trim(),
        category: data.category as Category,
        capacity: Number(data.capacity),
        date: data.date,
        time: data.time,
        location: data.location,
        description: data.description,
        image: data.image || "/afis.svg",
    };
}

export function EventsProvider({ children }: { children: ReactNode }) {
    const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

    function addEvent(data: EventFormData) {
        setEvents([...events, toEvent(`event-${Date.now()}`, data)]);
    }

    function updateEvent(id: string, data: EventFormData) {
        setEvents(events.map((e) => (e.id === id ? toEvent(id, data) : e)));
    }

    function deleteEvent(id: string) {
        setEvents(events.filter((e) => e.id !== id));
    }

    return (
        <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
            {children}
        </EventsContext.Provider>
    );
}

export function useEvents() {
    const value = useContext(EventsContext);
    if (value === null) {
        throw new Error("EventsProvider bulunamadı!");
    }
    return value;
}