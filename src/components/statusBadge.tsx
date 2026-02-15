export default function StatusBadge({ status }: { status: "approved" | "pending" | "failed" | "refunded" }) {
    const styles = {
        approved: "bg-green-900/40 text-green-400 border-green-500/30",
        pending: "bg-yellow-900/40 text-yellow-400 border-yellow-500/30",
        failed: "bg-red-900/40 text-red-400 border-red-500/30",
        refunded: "bg-gray-700/40 text-gray-400 border-gray-500/30",
    };

    const labels = {
        approved: "Aprovado",
        pending: "Pendente",
        failed: "Falha",
        refunded: "Estornado",
    };

    return (
        <span className={`px-3 py-1 text-xs rounded-full border ${styles[status]}`}>
            {labels[status]}
        </span>
    );
}
