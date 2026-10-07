const form = document.querySelector("#etkinlik-formu");
const mesajKutusu = document.querySelector("#form-mesaj");

if (form && form.dataset.mode === "guncelle") {
    const id = new URLSearchParams(location.search).get("id");
    const etkinlik = events.find((e) => e.id === id);

    if (etkinlik) {
        form.elements["ad"].value = etkinlik.title || "";
        form.elements["kategori"].value = etkinlik.category || "";

        if (etkinlik.date) {
            const parcalar = etkinlik.date.split("-");
            if (parcalar.length === 3) {
                form.elements["tarih"].value = `${parcalar[2]}-${parcalar[1]}-${parcalar[0]}`;
            }
        }

        form.elements["saat"].value = etkinlik.time || "";
        form.elements["yer"].value = etkinlik.location || "";
        form.elements["kontenjan"].value = etkinlik.capacity !== null ? etkinlik.capacity : "";
        form.elements["aciklama"].value = etkinlik.description || "";
    } else {
        form.outerHTML = `
            <div style="border: 1px solid red; background-color: #ffe6e6; padding: 20px; border-radius: 5px; color: #a00; max-width: 600px; margin: 20px auto;">
                <p>Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
            </div>
            <br>
            <a href="etkinlikler.html" class="kaydet-btn" style="display: inline-block; text-decoration: none; text-align: center; background-color: #16a34a; color: white; padding: 10px 20px; border-radius: 4px;">Etkinliklere git</a>
        `;
    }
}

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Form alanlarını ve hata span'lerini seç
        const adInput = form.elements["ad"];
        const kategoriSelect = form.elements["kategori"];
        const tarihInput = form.elements["tarih"];
        const saatInput = form.elements["saat"];
        const yerInput = form.elements["yer"];
        const kontenjanInput = form.elements["kontenjan"];

        const adHata = document.querySelector("#ad-hata");
        const kategoriHata = document.querySelector("#kategori-hata");
        const tarihHata = document.querySelector("#tarih-hata");
        const saatHata = document.querySelector("#saat-hata");
        const yerHata = document.querySelector("#yer-hata");
        const kontenjanHata = document.querySelector("#kontenjan-hata");

        [adInput, kategoriSelect, tarihInput, saatInput, yerInput, kontenjanInput].forEach(input => {
            if (input) input.removeAttribute("aria-invalid");
        });
        [adHata, kategoriHata, tarihHata, saatHata, yerHata, kontenjanHata].forEach(span => {
            if (span) span.textContent = "";
        });
        if (mesajKutusu) mesajKutusu.innerHTML = "";

        const fd = new FormData(form);
        const data = {
            id: "event-" + Date.now(),
            title: fd.get("ad") ? fd.get("ad").trim() : "",
            category: fd.get("kategori") ? fd.get("kategori").trim() : "",
            date: fd.get("tarih") ? fd.get("tarih").trim() : "",
            time: fd.get("saat") ? fd.get("saat").trim() : "",
            location: fd.get("yer") ? fd.get("yer").trim() : "",
            capacity: fd.get("kontenjan") && fd.get("kontenjan").trim() !== "" ? Number(fd.get("kontenjan")) : null,
            description: fd.get("aciklama") ? fd.get("aciklama").trim() : ""
        };

        const errors = {};

        if (data.title.length < 3) {
            errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
            if (adInput) adInput.setAttribute("aria-invalid", "true");
            if (adHata) adHata.textContent = errors.ad;
        }

        if (!data.category) {
            errors.kategori = "Bir kategori seçin.";
            if (kategoriSelect) kategoriSelect.setAttribute("aria-invalid", "true");
            if (kategoriHata) kategoriHata.textContent = errors.kategori;
        }

        if (!data.date) {
            errors.tarih = "Tarih seçin.";
            if (tarihInput) tarihInput.setAttribute("aria-invalid", "true");
            if (tarihHata) tarihHata.textContent = errors.tarih;
        }

        if (!data.time) {
            errors.saat = "Saat seçin.";
            if (saatInput) saatInput.setAttribute("aria-invalid", "true");
            if (saatHata) saatHata.textContent = errors.saat;
        }

        if (!data.location) {
            errors.yer = "Yer bilgisini yazın.";
            if (yerInput) yerInput.setAttribute("aria-invalid", "true");
            if (yerHata) yerHata.textContent = errors.yer;
        }

        if (data.capacity !== null && (data.capacity < 1 || data.capacity > 1000)) {
            errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalıdır.";
            if (kontenjanInput) kontenjanInput.setAttribute("aria-invalid", "true");
            if (kontenjanHata) kontenjanHata.textContent = errors.kontenjan;
        }

        if (Object.keys(errors).length > 0) {
            return;
        }

        if (mesajKutusu) {
            mesajKutusu.innerHTML = `
                <div style="border: 1px solid #16a34a; background-color: #f0fdf4; padding: 20px; border-radius: 8px; color: #166534;">
                    <p style="font-weight: bold; margin-bottom: 10px;">Etkinlik oluşturuldu (bu sprintte kaydedilmez):</p>
                    <pre style="margin: 0; font-family: monospace;">${JSON.stringify(data, null, 2)}</pre>
                </div>
            `;
        }
    });
}