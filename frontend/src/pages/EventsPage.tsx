import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";
import EventFilter from "../components/events/EventFilter";
import { searchEvents, filterByCategory } from "../utils/filter-events";
import type { Category } from "../types/campus-event";

export default function EventsPage() {
    const { events } = useEvents();
    const [searchText, setSearchText] = useState("");
    const [category, setCategory] = useState<Category | "">("");

    const categories = [...new Set(events.map((e) => e.category))];

    const filtered = filterByCategory(
        searchEvents(events, searchText),
        category
    );

    return (
        <>
            <h2>Etkinlikler</h2>
            <EventFilter
                searchText={searchText}
                onSearchChange={setSearchText}
                category={category}
                onCategoryChange={setCategory}
                categories={categories}
            />
            <EventList events={filtered} />
        </>
    );
}