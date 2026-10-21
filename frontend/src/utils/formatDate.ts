export function formatDate(dateStr: string): string {
    const [year, month, day] = dateStr.split("-");
    const months = [
        "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
        "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];
    return `${day} ${months[parseInt(month, 10) - 1]} ${year}`;
}