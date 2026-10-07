import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const arama = document.querySelector("#arama");
const kategoriSelect = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

function formatiDuzelt(tarihStr) {
    if (!tarihStr) return "";
    const parcalar = tarihStr.split("-");
    if (parcalar.length !== 3) return tarihStr;

    const dateObj = new Date(`${parcalar[2]}-${parcalar[1]}-${parcalar[0]}`);

    return dateObj.toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function createCard(event) {
    return `<article class="kart">
        <h2>${event.title}</h2>
        <span class="kategori-etiket">${event.category}</span>
        <p><strong>Tarih:</strong> ${formatiDuzelt(event.date)}, ${event.time}</p>
        <p><strong>Yer:</strong> ${event.location}</p>
        ${event.capacity ? `<p><strong>Kontenjan:</strong> ${event.capacity} kişi</p>` : ""}
        <p>${event.description}</p>
        <a href="etkinlik-detay.html?id=${event.id}">Detayları gör</a>
    </article>`;
}

function render(dizi) {
    if (list) {
        list.innerHTML = dizi.map(createCard).join("");
    }
}

if (kategoriSelect) {
    const kategoriler = [...new Set(events.map(e => e.category).filter(Boolean))];
    kategoriler.forEach(kategori => {
        const option = document.createElement("option");
        option.value = kategori;
        option.textContent = kategori;
        kategoriSelect.appendChild(option);
    });
}

function filtrele() {
    const aranan = arama ? arama.value.toLocaleLowerCase("tr-TR").trim() : "";
    const secilenKategori = kategoriSelect ? kategoriSelect.value : "";

    const sonuc = events.filter((e) => {
        const baslik = e.title ? e.title.toLocaleLowerCase("tr-TR") : "";
        const aciklama = e.description ? e.description.toLocaleLowerCase("tr-TR") : "";

        const metinUyuyor = baslik.includes(aranan) || aciklama.includes(aranan);
        const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;

        return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);

    if (sonucSatiri) {
        if (sonuc.length === 0) {
            sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
        } else {
            sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
        }
    }
}

if (arama) {
    arama.addEventListener("input", filtrele);
}

if (kategoriSelect) {
    kategoriSelect.addEventListener("change", filtrele);
}

if (list) {
    if (list.dataset.limit) {
        const yaklasan = [...events]
            .sort((a, b) => a.date.localeCompare(b.date))
            .slice(0, Number(list.dataset.limit));
        render(yaklasan);
    } else {
        filtrele();
    }
}