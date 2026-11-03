import { NavLink } from "react-router-dom";

const menu = [
    { to: "/", label: "Ana Sayfa" },
    { to: "/events", label: "Etkinlikler" },
    { to: "/admin", label: "Yönetim" },
    { to: "/login", label: "Giriş" },
];

export default function Navigation() {
    return (
        <nav>
            <ul>
                {menu.map((item) => (
                    <li key={item.to}>
                        <NavLink to={item.to} end={item.to === "/"}>
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}