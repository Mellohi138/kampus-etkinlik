import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

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

    function formatDate(dateStr: string): string {
        const [year, month, day] = dateStr.split("-");
        const months = [
            "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
            "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
        ];
        return `${day} ${months[parseInt(month, 10) - 1]} ${year}`;
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

    function renderCard(event: CampusEvent) {
        return (
            <article className="kart" key={event.id}>
                <h2>{event.title}</h2>
                <span className="kategori-etiket">{event.category}</span>
                <p><strong>Tarih:</strong> {formatDate(event.date)}, {event.time}</p>
                <p><strong>Yer:</strong> {event.location}</p>
                <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
                <p>{event.description}</p>
                <a
                    href="#detail"
                    onClick={(e) => {
                        e.preventDefault();
                        go("detail", event.id);
                    }}
                >
                    Detayları gör
                </a>
            </article>
        );
    }

    return (
        <>
            <header className="site-baslik">
                <h1>{page === "update" ? "Etkinlik Güncelle" : page === "add" ? "Etkinlik Ekle" : "Kampüs Etkinlikleri"}</h1>
                {page !== "add" && page !== "update" && (
                    <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
                )}
            </header>

            <nav className="menu">
                <ul>
                    <li>
                        <a
                            href="#home"
                            onClick={(e) => { e.preventDefault(); go("home"); }}
                            aria-current={page === "home" ? "page" : undefined}
                        >
                            Ana Sayfa
                        </a>
                    </li>
                    <li>
                        <a
                            href="#events"
                            onClick={(e) => { e.preventDefault(); go("events"); }}
                            aria-current={page === "events" ? "page" : undefined}
                        >
                            Etkinlikler
                        </a>
                    </li>
                    <li>
                        <a
                            href="#add"
                            onClick={(e) => { e.preventDefault(); go("add"); }}
                            aria-current={page === "add" ? "page" : undefined}
                        >
                            Ekle
                        </a>
                    </li>
                </ul>
            </nav>

            <main>
                {page === "home" && (
                    <section>
                        <h2>Yaklaşan 2 Etkinlik</h2>
                        <div className="etkinlik-listesi">
                            {upcoming.map(renderCard)}
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <a
                                href="#events"
                                onClick={(e) => { e.preventDefault(); go("events"); }}
                                className="buton"
                            >
                                Tüm etkinlikleri gör
                            </a>
                        </div>
                    </section>
                )}

                {page === "events" && (
                    <section className="etkinlikler-sayfasi">
                        <h2>Tüm Etkinlikler</h2>
                        <p>Ekim ayında kampüste düzenlenen etkinlikler.</p>

                        <div className="filtre-kutusu">
                            <label htmlFor="search">Etkinlik ara</label>
                            <input
                                id="search"
                                type="search"
                                placeholder="Örn. atölye, kariyer"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />

                            <label htmlFor="category">Kategori</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value as Category | "")}
                            >
                                <option value="">Tümü</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <p className="sonuc-sayisi">
                            {filtered.length === 0
                                ? "Aradığınız kriterlere uygun etkinlik bulunamadı."
                                : `${filtered.length} etkinlik listeleniyor.`}
                        </p>

                        <div className="etkinlik-listesi">
                            {filtered.map(renderCard)}
                        </div>
                    </section>
                )}

                {page === "detail" && (
                    <section>
                        {!selected ? (
                            <div>
                                <p>Aradığınız etkinlik bulunamadı.</p>
                                <a href="#events" onClick={(e) => { e.preventDefault(); go("events"); }}>
                                    Listeye dön
                                </a>
                            </div>
                        ) : (
                            <article className="detay">
                                <h2>{selected.title}</h2>

                                <div className="detay-icerik">
                                    {selected.image && (
                                        <figure>
                                            <img src={selected.image} alt={`${selected.title} afişi`} />
                                            <figcaption>{selected.title} afişi</figcaption>
                                        </figure>
                                    )}

                                    <div className="etkinlik-kunyesi">
                                        <h3>Etkinlik Künyesi</h3>
                                        <p><strong>Tarih:</strong> {formatDate(selected.date)}, {selected.time}</p>
                                        <p><strong>Yer:</strong> {selected.location}</p>
                                        <p><strong>Kategori:</strong> {selected.category}</p>
                                        <p><strong>Kontenjan:</strong> {selected.capacity} kişi</p>
                                    </div>
                                </div>

                                <h3>Açıklama</h3>
                                <p>{selected.description}</p>

                                <div className="detay-butonlar">
                                    <a
                                        href="#events"
                                        onClick={(e) => { e.preventDefault(); go("events"); }}
                                    >
                                        &larr; Listeye dön
                                    </a>
                                    <b> </b>
                                    <a
                                        href="#update"
                                        onClick={(e) => { e.preventDefault(); go("update", selected.id); }}
                                    >
                                        Bu etkinliği güncelle
                                    </a>
                                </div>
                            </article>
                        )}
                    </section>
                )}

                {(page === "add" || page === "update") && (
                    <main className="form-icerik">
                        <h2 style={{ marginBottom: "10px" }}>
                            {page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}
                        </h2>
                        <p style={{ marginBottom: "15px", color: "#666" }}>
                            {page === "add"
                                ? "Bu sprintte form sadece görünüm; kayıt yapılmaz."
                                : "Alanlar mevcut etkinliğin bilgileriyle dolu gelir. Bu sprintte form veri güncellemez."}
                        </p>

                        <form
                            id="etkinlik-formu"
                            {...(page === "update" ? { "data-mode": "guncelle" } : {})}
                            onSubmit={(e) => e.preventDefault()}
                            noValidate
                        >
                            <div className="form-grup">
                                <label htmlFor="name">Etkinlik Adı *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="ad"
                                    maxLength={80}
                                    placeholder="Örn. Kariyer Günleri 2026"
                                    value={formTitle}
                                    onChange={(e) => setFormTitle(e.target.value)}
                                />
                                <span id="ad-hata" className="hata-metni" style={{ color: "red", fontSize: "0.85em", display: "block", marginTop: "4px" }}></span>
                            </div>

                            <div className="form-grup">
                                <label htmlFor="category">Kategori *</label>
                                <select
                                    id="category"
                                    name="kategori"
                                    value={formCategory}
                                    onChange={(e) => setFormCategory(e.target.value as Category)}
                                >
                                    <option value="" disabled>Seçiniz</option>
                                    <option value="Seminer">Seminer</option>
                                    <option value="Atölye">Atölye</option>
                                    <option value="Söyleşi">Söyleşi</option>
                                    <option value="Yarışma">Yarışma</option>
                                </select>
                                <span id="kategori-hata" className="hata-metni" style={{ color: "red", fontSize: "0.85em", display: "block", marginTop: "4px" }}></span>
                            </div>

                            <div className="form-grup">
                                <label htmlFor="date">Tarih *</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="tarih"
                                    value={formDate}
                                    onChange={(e) => setFormDate(e.target.value)}
                                />
                                <span id="tarih-hata" className="hata-metni" style={{ color: "red", fontSize: "0.85em", display: "block", marginTop: "4px" }}></span>
                            </div>

                            <div className="form-grup">
                                <label htmlFor="time">Saat *</label>
                                <input
                                    type="time"
                                    id="time"
                                    name="saat"
                                    value={formTime}
                                    onChange={(e) => setFormTime(e.target.value)}
                                />
                                <span id="saat-hata" className="hata-metni" style={{ color: "red", fontSize: "0.85em", display: "block", marginTop: "4px" }}></span>
                            </div>

                            <div className="form-grup">
                                <label htmlFor="location">Yer *</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="yer"
                                    placeholder="Örn. A Blok Konferans Salonu"
                                    value={formLocation}
                                    onChange={(e) => setFormLocation(e.target.value)}
                                />
                                <span id="yer-hata" className="hata-metni" style={{ color: "red", fontSize: "0.85em", display: "block", marginTop: "4px" }}></span>
                            </div>

                            <div className="form-grup">
                                <label htmlFor="capacity">Kontenjan</label>
                                <input
                                    type="number"
                                    id="capacity"
                                    name="kontenjan"
                                    value={formCapacity}
                                    onChange={(e) => setFormCapacity(e.target.value === "" ? "" : Number(e.target.value))}
                                />
                                <span id="kontenjan-hata" className="hata-metni" style={{ color: "red", fontSize: "0.85em", display: "block", marginTop: "4px" }}></span>
                            </div>

                            <div className="form-grup">
                                <label htmlFor="desc">Açıklama</label>
                                <textarea
                                    id="desc"
                                    name="aciklama"
                                    rows={5}
                                    value={formDescription}
                                    onChange={(e) => setFormDescription(e.target.value)}
                                ></textarea>
                                <span id="aciklama-hata" className="hata-metni" style={{ color: "red", fontSize: "0.85em", display: "block", marginTop: "4px" }}></span>
                            </div>

                            <button type="submit" className="kaydet-btn">
                                {page === "add" ? "Kaydet" : "Güncelle"}
                            </button>
                        </form>

                        <div id="form-mesaj" style={{ marginTop: "20px" }}></div>
                    </main>
                )}
            </main>

            <footer>
                <p>Yiğit Tunç &middot; 2416501046 &middot; 2026</p>
            </footer>
        </>
    );
}

export default App;