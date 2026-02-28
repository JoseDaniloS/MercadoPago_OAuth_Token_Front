import { stylesStatus } from "../constants/mpErrorTranslate";

const labels: Record<keyof typeof stylesStatus, string> = {
  approved: "Aprovado",
  pending: "Pendente",
  in_process: "Em análise",
  authorized: "Autorizado",

  rejected: "Rejeitado",
  charged_back: "Chargeback",

  refunded: "Estornado",
  cancelled: "Cancelado",

  in_mediation: "Em disputa",
};

type Status = keyof typeof stylesStatus;

export default function StatusBadge({ status }: { status?: string }) {
  if (!status || !(status in stylesStatus)) return null;

  const key = status as Status;

  return (
    <span className={`px-3 py-1 text-xs rounded-full border ${stylesStatus[key]}`}>
      {labels[key]}
    </span>
  );
}