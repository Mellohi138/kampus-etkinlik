import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

function App() {
    const [page, setPage] = useState<PageName>("home");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const [searchText, setSearchText] = useState("");
    const [category, setCategory] = useState<Category | "">("");

    const [formTitle, setFormTitle] = useState("");
    const [formCategory, setFormCategory] = useState<Category | "">("");
    const [formDate, setFormDate] = useState("");
    const [formTime, setFormTime] = useState("");
    const [formLocation, setFormLocation] = useState("");
    const [formCapacity, setFormCapacity] = useState<number | "">("");
    const [formDescription, setFormDescription] = useState("");

    function go(next: PageName, id: string | null = null) {
        setPage(next);
        setSelectedId(id);
    }

    const selected = selectedId ? findEventById(events, selectedId) : undefined;

    const pageTitle =
        page === "home"
            ? "Ana Sayfa"
            : page === "events"
                ? "Tüm Etkinlikler"
                : page === "detail" && selected
                    ? selected.title
                    : page === "add"
                        ? "Etkinlik Ekle"
                        : page === "update"
                            ? "Etkinlik Güncelle"
                            : "Kampüs Etkinlikleri";

    useEffect(() => {
        document.title = `Kampüs Etkinlikleri — ${pageTitle}`;
    }, [pageTitle]);

    useEffect(() => {
        if (page === "update" && selected) {
            setFormTitle(selected.title);
            setFormCategory(selected.category);
            setFormDate(selected.date);
            setFormTime(selected.time);
            setFormLocation(selected.location);
            setFormCapacity(selected.capacity);
            setFormDescription(selected.description);
        } else if (page === "add") {
            setFormTitle("");
            setFormCategory("");
            setFormDate("");
            setFormTime("");
            setFormLocation("");
            setFormCapacity("");
            setFormDescription("");
        }
    }, [page, selected]);

    const upcoming = [...events]
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 2);

    const categories = [...new Set(events.map((e) => e.category))];

    const filtered = filterByCategory(
        searchEvents(events, searchText),
        category
    );

    const headerTitle =
        page === "update"
            ? "Etkinlik Güncelle"
            : page === "add"
                ? "Etkinlik Ekle"
                : "Kampüs Etkinlikleri";

    const headerText =
        page !== "add" && page !== "update"
            ? "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
            : undefined;

    return (
        <div>
            <Header title={headerTitle} text={headerText} />

            <Navigation current={page} onNavigate={go} />

            <main>
                {page === "home" && (
                    <section>
                        <h2>Yaklaşan 2 Etkinlik</h2>
                        <EventList
                            events={upcoming}
                            onShowDetail={(id) => go("detail", id)}
                        />
                        <div style={{ marginTop: "20px" }}>
                            <a
                                href="#events"
                                onClick={(e) => {
                                    e.preventDefault();
                                    go("events");
                                }}
                                className="detay-link"
                            >
                                Tüm etkinlikleri gör &rarr;
                            </a>
                        </div>
                    </section>
                )}

                {page === "events" && (
                    <section>
                        <h2>Tüm Etkinlikler</h2>
                        <p>Ekim ayında kampüste düzenlenen etkinlikler.</p>

                        <EventFilter
                            searchText={searchText}
                            category={category}
                            categories={categories}
                            onSearchChange={setSearchText}
                            onCategoryChange={setCategory}
                        />

                        <p>
                            {filtered.length > 0 && `${filtered.length} etkinlik listeleniyor.`}
                        </p>

                        <EventList
                            events={filtered}
                            onShowDetail={(id) => go("detail", id)}
                            emptyText="Aradığınız kriterlere uygun etkinlik bulunamadı."
                        />
                    </section>
                )}

                {page === "detail" && (
                    <section>
                        {!selected ? (
                            <div>
                                <p>Aradığınız etkinlik bulunamadı.</p>
                                <a
                                    href="#events"
                                    className="geri-link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        go("events");
                                    }}
                                >
                                    Listeye dön
                                </a>
                            </div>
                        ) : (
                            <EventDetail
                                event={selected}
                                onBack={() => go("events")}
                                onEdit={(id) => go("update", id)}
                            />
                        )}
                    </section>
                )}

                {(page === "add" || page === "update") && (
                    <EventForm
                        page={page}
                        formTitle={formTitle}
                        setFormTitle={setFormTitle}
                        formCategory={formCategory}
                        setFormCategory={setFormCategory}
                        formDate={formDate}
                        setFormDate={setFormDate}
                        formTime={formTime}
                        setFormTime={setFormTime}
                        formLocation={formLocation}
                        setFormLocation={setFormLocation}
                        formCapacity={formCapacity}
                        setFormCapacity={setFormCapacity}
                        formDescription={formDescription}
                        setFormDescription={setFormDescription}
                        onSubmit={() => window.scrollTo(0, 0)}
                    />
                )}
            </main>

            <Footer />
        </div>
    );
}

export default App;