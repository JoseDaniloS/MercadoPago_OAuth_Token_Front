export function truncateString(str?: string, length = 8) {
    return str ? `${str.slice(0, length)}...` : "";
}

export function formatDocument(value?: string | number): string {
    if (!value) return "";

    const digits = String(value).replace(/\D/g, "");

    // CPF
    if (digits.length <= 11) {
        return digits
            .slice(0, 11)
            .replace(/^(\d{3})(\d)/, "$1.$2")
            .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1-$2");
    }

    // CNPJ
    return digits
        .slice(0, 14)
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
}