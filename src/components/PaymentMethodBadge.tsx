import { CreditCard, QrCode } from "lucide-react";

export default function PaymentMethodBadge({
  payment_method_id,
}: {
  payment_method_id: "pix" | "master";
}) {
  const icons = {
    pix: <QrCode />,
    master: <CreditCard />,
  };

  return (
    <span className={`px-3 py-1 text-xs flex items-center gap-2`}>
      {icons[payment_method_id]} {payment_method_id}
    </span>
  );
}
