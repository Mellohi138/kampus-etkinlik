import { events } from "./data.js";

const mainContainer = document.querySelector("#detay-ana-alan");
const sayfaBaslik = document.querySelector("#sayfa-baslik");

const urlParams = new URLSearchParams(location.search);
const id = urlParams.get("id");
const event = events.find((e) => e.id === id);

function formatiDuzelt(tarihStr) {
    if (!tarihStr) return "";
    // "12-10-2026" -> ["12", "10", "2026"]
    const parcalar = tarihStr.split("-");
    if (parcalar.length !== 3) return tarihStr;

    // Yıl-Ay-Gün olarak Date objesine çevir
    const dateObj = new Date(`${parcalar[2]}-${parcalar[1]}-${parcalar[0]}`);

    return dateObj.toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

if (mainContainer) {
    if (!event) {
        document.title = "Etkinlik Bulunamadı";
        if (sayfaBaslik) sayfaBaslik.textContent = "Etkinlik Bulunamadı";

        mainContainer.innerHTML = `
            <div class="hata-kutusu" style="border: 1px solid red; background-color: #ffe6e6; padding: 20px; border-radius: 5px; color: #a00; grid-column: 1 / -1;">
                <p>"${id || 'Belirtilmeyen'}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.</p>
            </div>
            <br>
            <a href="etkinlikler.html" class="geri-link">&larr; Listeye dön</a>
        `;
    } else {
        document.title = event.title;
        if (sayfaBaslik) sayfaBaslik.textContent = event.title;

        mainContainer.innerHTML = `
            <section class="afis-bolumu">
                <figure>
                    <div class="afis-kutu" style="background-color: #0f172a; color: white; padding: 40px; text-align: center; border-radius: 8px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 15px;">
                        <h2 style="margin: 0; color: #f59e0b; font-size: 1.8rem;">${event.title}</h2>
                        <p style="margin: 0; font-size: 1.1rem;">📅 ${formatiDuzelt(event.date)}</p>
                        <p style="margin: 0; font-size: 1rem; opacity: 0.9;">📍 ${event.location}</p>
                    </div>
                    <figcaption style="margin-top: 8px;"><i>Şekil: ${event.title} Afişi</i></figcaption>
                </figure>
            </section>

            <section class="bilgi-bolumu">
                <h3>Etkinlik Künyesi</h3>
                <dl>
                    <dt><strong>Tarih</strong></dt>
                    <dd>${formatiDuzelt(event.date)}, ${event.time}</dd>
                    
                    <dt><strong>Yer</strong></dt>
                    <dd>${event.location}</dd>
                    
                    <dt><strong>Kategori</strong></dt>
                    <dd>${event.category}</dd>
                    
                    <dt><strong>Kontenjan</strong></dt>
                    <dd>${event.capacity ? event.capacity + " kişi" : "Belirtilmemiş"}</dd>
                </dl>
                
                <h3 style="margin-top: 20px;">Açıklama</h3>
                <p>${event.description || "Açıklama bulunmuyor."}</p>
                
                <div style="margin-top: 25px; display: flex; gap: 10px;">
                    <a href="etkinlikler.html" class="geri-link">&larr; Listeye dön</a>
                    <a href="etkinlik-guncelle.html?id=${event.id}" class="geri-link" style="background-color: hsl(var(--ton) 65% 38%); color: white; padding: 8px 15px; border-radius: 4px; text-decoration: none;">Bu etkinliği güncelle</a>
                </div>
            </section>
            </section>
        `;
    }
}