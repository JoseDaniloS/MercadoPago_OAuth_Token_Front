export function truncateString(str?: string, length = 8) {
    return str ? `${str.slice(0, length)}...` : "";
}
