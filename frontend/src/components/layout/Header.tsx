import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    const path = location.pathname.replace(/\/$/, "") || "/";

    let title = "Kampüs Etkinlikleri";
    let text = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";

    if (path === "/") {
        title = "Ana Sayfa";
        text = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";
    } else if (path === "/events") {
        title = "Etkinlik Listesi";
        text = "Tüm kampüs etkinliklerini görüntüleyin ve filtreleyin.";
    } else if (path.startsWith("/events/")) {
        title = "Etkinlik Detayı";
        text = "Seçilen etkinliğe ait ayrıntılı bilgiler.";
    } else if (path === "/login") {
        title = "Oturum Aç";
        text = "Hesabınıza güvenle giriş yapın.";
    } else if (path === "/register") {
        title = "Kayıt Ol";
        text = "Yeni bir hesap oluşturarak aramıza katılın.";
    } else if (path === "/forgot-password") {
        title = "Şifremi Unuttum";
        text = "Şifrenizi yenilemek için e-posta adresinizi girin.";
    } else if (path === "/admin") {
        title = "Yönetim Paneli";
        text = "Etkinlikleri listeleyin, silin veya yeni etkinlik ekleyin.";
    } else if (path === "/admin/new") {
        title = "Yeni Etkinlik Ekle";
        text = "Sisteme yeni bir etkinlik kaydı oluşturun.";
    } else if (path.includes("/edit")) {
        title = "Etkinliği Düzenle";
        text = "Mevcut etkinlik bilgilerini güncelleyin.";
    } else {
        title = "Sayfa Bulunamadı";
        text = "Aradığınız sayfa mevcut değil.";
    }

    useEffect(() => {
        document.title = `${title} - Kampüs Etkinlikleri`;
    }, [title]);

    return (
        <header className="site-baslik">
            <h1>{title}</h1>
            {text && <p>{text}</p>}
        </header>
    );
}