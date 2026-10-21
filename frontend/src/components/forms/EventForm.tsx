import type { Category } from "../../types/campus-event";
import type { PageName } from "../../types/page";

interface EventFormProps {
    page: PageName;
    formTitle: string;
    setFormTitle: (val: string) => void;
    formCategory: Category | "";
    setFormCategory: (val: Category | "") => void;
    formDate: string;
    setFormDate: (val: string) => void;
    formTime: string;
    setFormTime: (val: string) => void;
    formLocation: string;
    setFormLocation: (val: string) => void;
    formCapacity: number | "";
    setFormCapacity: (val: number | "") => void;
    formDescription: string;
    setFormDescription: (val: string) => void;
    onSubmit: () => void;
}

export default function EventForm({
    page,
    formTitle,
    setFormTitle,
    formCategory,
    setFormCategory,
    formDate,
    setFormDate,
    formTime,
    setFormTime,
    formLocation,
    setFormLocation,
    formCapacity,
    setFormCapacity,
    formDescription,
    setFormDescription,
    onSubmit,
}: EventFormProps) {
    return (
        <div className="form-icerik">
            <p style={{ marginBottom: "15px", color: "#666" }}>
                {page === "add"
                    ? "Bu sprintte form sadece görünüm; kayıt yapılmaz."
                    : "Alanlar mevcut etkinliğin bilgileriyle dolu gelir. Bu sprintte form veri güncellemez."}
            </p>

            <form
                id="etkinlik-formu"
                {...(page === "update" ? { "data-mode": "guncelle" } : {})}
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
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
                </div>

                <div className="form-grup">
                    <label htmlFor="category">Kategori *</label>
                    <select
                        id="category"
                        name="kategori"
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value as Category)}
                    >
                        <option value="" disabled>
                            Seçiniz
                        </option>
                        <option value="Seminer">Seminer</option>
                        <option value="Atölye">Atölye</option>
                        <option value="Söyleşi">Söyleşi</option>
                        <option value="Yarışma">Yarışma</option>
                    </select>
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
                </div>

                <div className="form-grup">
                    <label htmlFor="capacity">Kontenjan</label>
                    <input
                        type="number"
                        id="capacity"
                        name="kontenjan"
                        value={formCapacity}
                        onChange={(e) =>
                            setFormCapacity(e.target.value === "" ? "" : Number(e.target.value))
                        }
                    />
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
                </div>

                <button type="submit" className="kaydet-btn">
                    {page === "add" ? "Kaydet" : "Güncelle"}
                </button>
            </form>
        </div>
    );
}