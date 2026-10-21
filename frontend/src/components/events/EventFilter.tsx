import type { Category } from "../../types/campus-event";

interface EventFilterProps {
    searchText: string;
    category: Category | "";
    categories: string[];
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: Category | "") => void;
}

export default function EventFilter({
    searchText,
    category,
    categories,
    onSearchChange,
    onCategoryChange,
}: EventFilterProps) {
    return (
        <div className="form-grup">
            <label htmlFor="search">Etkinlik ara</label>
            <input
                id="search"
                type="search"
                placeholder="Örn. atölye, kariyer"
                value={searchText}
                onChange={(e) => onSearchChange(e.target.value)}
            />

            <label htmlFor="category">Kategori</label>
            <select
                id="category"
                value={category}
                onChange={(e) => onCategoryChange(e.target.value as Category | "")}
            >
                <option value="">Tümü</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
        </div>
    );
}