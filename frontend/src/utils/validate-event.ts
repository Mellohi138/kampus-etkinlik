import type { EventFormData } from "../context/EventsContext";

// Her alana en fazla bir hata mesajı tutacak tip tanımı
export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;

export function validateEvent(data: EventFormData): EventFormErrors {
    const errors: EventFormErrors = {};

    // 1. Etkinlik Adı Kontrolü
    if (data.title.trim().length < 3) {
        errors.title = "En az 3 karakter olmalı.";
    }

    // 2. Kategori Kontrolü
    if (data.category === "") {
        errors.category = "Bir kategori seçin.";
    }

    // 3. Tarih Kontrolü
    if (!data.date.trim()) {
        errors.date = "Tarih boş olamaz.";
    }

    // 4. Saat Kontrolü
    if (!data.time.trim()) {
        errors.time = "Saat boş olamaz.";
    }

    // 5. Yer Kontrolü
    if (!data.location.trim()) {
        errors.location = "Yer boş olamaz.";
    }

    // 6. Kontenjan Kontrolü
    const capacity = Number(data.capacity);
    if (!Number.isInteger(capacity) || capacity < 1 || capacity > 1000) {
        errors.capacity = "1 ile 1000 arası tam sayı olmalı.";
    }

    // 7. Açıklama Kontrolü
    if (data.description.trim().length < 10) {
        errors.description = "En az 10 karakter olmalı.";
    }

    return errors;
}