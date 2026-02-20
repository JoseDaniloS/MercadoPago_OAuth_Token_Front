export function formatDate(dateString?: string) {
  if (!dateString) return { date: "-", time: "-" };

  const date = new Date(dateString);

  return {
    date: date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    time: date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}
