export default function StatusBadge({
  status,
}: {
  status: "approved" | "pending" | "rejected" | "refunded" | "cancelled";
}) {
  const styles = {
    approved: "bg-green-900/40 text-green-400 border-green-500/30",
    pending: "bg-yellow-900/40 text-yellow-400 border-yellow-500/30",
    rejected: "bg-red-900/40 text-red-400 border-red-500/30",
    refunded: "bg-gray-700/40 text-gray-400 border-gray-500/30",
    cancelled: "bg-orange-900/40 text-orange-400 border-orange-500/30",
  };

  const labels = {
    approved: "Aprovado",
    pending: "Pendente",
    rejected: "Rejeitado",
    refunded: "Estornado",
    cancelled: "Cancelado",
  };

  return (
    <span className={`px-3 py-1 text-xs rounded-full border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
