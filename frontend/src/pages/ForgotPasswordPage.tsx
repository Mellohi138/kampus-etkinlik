import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // E-posta kontrolü: @ işareti var mı?[cite: 9]
        const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
        setError(found);
        setSent(found === "");
    }

    return (
        <div className="auth-sayfa">
            <h2>Şifremi Unuttum</h2>
            <p>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>

            {sent && (
                <p className="mesaj mesaj-basari">
                    Bağlantı ({email}) adresine gönderildi (demo).
                </p>
            )}

            <form onSubmit={handleSubmit} noValidate>
                <div className="form-grup">
                    <label htmlFor="email">E-posta</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="ali@sdu.edu.tr"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={error ? true : undefined}
                    />
                    {error && <span className="hata-metni">{error}</span>}
                </div>

                <button type="submit" className="buton">
                    Bağlantı gönder
                </button>
            </form>

            <div style={{ marginTop: "15px" }}>
                <Link to="/login">Girişe dön</Link>
            </div>
        </div>
    );
}