import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

interface LoginErrors {
    email?: string;
    password?: string;
}

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<LoginErrors>({});
    const [sent, setSent] = useState(false);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const found: LoginErrors = {};

        if (!email.includes("@")) {
            found.email = "Geçerli bir e-posta girin.";
        }
        if (password.length < 6) {
            found.password = "Şifre en az 6 karakter olmalı.";
        }

        setErrors(found);
        setSent(Object.keys(found).length === 0);
    }

    return (
        <div className="auth-sayfa">
            <h2>Oturum Aç</h2>

            {sent && (
                <p className="mesaj mesaj-basari">
                    Giriş simülasyonu başarılı (Demo).
                </p>
            )}

            <form onSubmit={handleSubmit} noValidate>
                <div className="form-grup">
                    <label htmlFor="email">E-posta</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={errors.email ? true : undefined}
                    />
                    {errors.email && <span className="hata-metni">{errors.email}</span>}
                </div>

                <div className="form-grup">
                    <label htmlFor="password">Şifre</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        aria-invalid={errors.password ? true : undefined}
                    />
                    {errors.password && <span className="hata-metni">{errors.password}</span>}
                </div>

                <button type="submit" className="buton">
                    Giriş yap
                </button>
            </form>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    gap: "20px",
                    marginTop: "15px"
                }}
            >
                <Link to="/forgot-password">Şifremi unuttum</Link>
                <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
            </div>
        </div>
    );
}