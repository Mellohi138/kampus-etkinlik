import { useState, type ChangeEvent, type FormEvent } from "react";
import type { EventFormData } from "../../context/EventsContext";
import { validateEvent, type EventFormErrors } from "../../utils/validate-event";

interface EventFormProps {
    initialData: EventFormData;
    submitText: string;
    onSubmit: (data: EventFormData) => void;
}

export default function EventForm({
    initialData,
    submitText,
    onSubmit,
}: EventFormProps) {
    const [data, setData] = useState<EventFormData>(initialData);
    const [errors, setErrors] = useState<EventFormErrors>({}); // Hata state'i

    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const found = validateEvent(data); // Doğrulamayı çalıştır[cite: 14]
        setErrors(found);

        // Hata yoksa üst componente bildir[cite: 14]
        if (Object.keys(found).length === 0) {
            onSubmit(data);
        }
    }

    return (
        <div className="form-icerik">
            <form onSubmit={handleSubmit} noValidate>
                {/* Etkinlik Adı */}
                <div className="form-grup">
                    <label htmlFor="title">Etkinlik Adı *</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        maxLength={80}
                        placeholder="Örn. Kariyer Günleri 2026"
                        value={data.title}
                        onChange={handleChange}
                        aria-invalid={errors.title ? true : undefined}
                    />
                    {errors.title && <span className="hata-metni">{errors.title}</span>}
                </div>

                {/* Kategori */}
                <div className="form-grup">
                    <label htmlFor="category">Kategori *</label>
                    <select
                        id="category"
                        name="category"
                        value={data.category}
                        onChange={handleChange}
                        aria-invalid={errors.category ? true : undefined}
                    >
                        <option value="" disabled>
                            Seçiniz
                        </option>
                        <option value="Seminer">Seminer</option>
                        <option value="Atölye">Atölye</option>
                        <option value="Söyleşi">Söyleşi</option>
                        <option value="Yarışma">Yarışma</option>
                    </select>
                    {errors.category && <span className="hata-metni">{errors.category}</span>}
                </div>

                {/* Tarih */}
                <div className="form-grup">
                    <label htmlFor="date">Tarih *</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={data.date}
                        onChange={handleChange}
                        aria-invalid={errors.date ? true : undefined}
                    />
                    {errors.date && <span className="hata-metni">{errors.date}</span>}
                </div>

                {/* Saat */}
                <div className="form-grup">
                    <label htmlFor="time">Saat *</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={data.time}
                        onChange={handleChange}
                        aria-invalid={errors.time ? true : undefined}
                    />
                    {errors.time && <span className="hata-metni">{errors.time}</span>}
                </div>

                {/* Yer */}
                <div className="form-grup">
                    <label htmlFor="location">Yer *</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Örn. A Blok Konferans Salonu"
                        value={data.location}
                        onChange={handleChange}
                        aria-invalid={errors.location ? true : undefined}
                    />
                    {errors.location && <span className="hata-metni">{errors.location}</span>}
                </div>

                {/* Kontenjan */}
                <div className="form-grup">
                    <label htmlFor="capacity">Kontenjan *</label>
                    <input
                        type="text"
                        id="capacity"
                        name="capacity"
                        placeholder="1 - 1000 arası"
                        value={data.capacity}
                        onChange={handleChange}
                        aria-invalid={errors.capacity ? true : undefined}
                    />
                    {errors.capacity && <span className="hata-metni">{errors.capacity}</span>}
                </div>

                {/* Açıklama */}
                <div className="form-grup">
                    <label htmlFor="description">Açıklama *</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={5}
                        value={data.description}
                        onChange={handleChange}
                        aria-invalid={errors.description ? true : undefined}
                    ></textarea>
                    {errors.description && <span className="hata-metni">{errors.description}</span>}
                </div>

                <button type="submit" className="kaydet-btn">
                    {submitText}
                </button>
            </form>
        </div>
    );
}