import type { PageName } from "../../types/page";

interface NavigationProps {
    current: PageName;
    onNavigate: (page: PageName) => void;
}

export default function Navigation({ current, onNavigate }: NavigationProps) {
    return (
        <nav>
            <ul>
                <li>
                    <a
                        href="#home"
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigate("home");
                        }}
                        aria-current={current === "home" ? "page" : undefined}
                    >
                        Ana Sayfa
                    </a>
                </li>
                <li>
                    <a
                        href="#events"
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigate("events");
                        }}
                        aria-current={current === "events" ? "page" : undefined}
                    >
                        Etkinlikler
                    </a>
                </li>
                <li>
                    <a
                        href="#add"
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigate("add");
                        }}
                        aria-current={current === "add" ? "page" : undefined}
                    >
                        Ekle
                    </a>
                </li>
            </ul>
        </nav>
    );
}