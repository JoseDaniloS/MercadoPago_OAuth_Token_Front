import { CreditCard, QrCode } from "lucide-react";

interface PaymentMethodBadgeProps {
  payment_method_id: string | undefined;
}

export default function PaymentMethodBadge({
  payment_method_id,
}: PaymentMethodBadgeProps) {

  if(!payment_method_id) return null;
  const icons : Record<string, JSX.Element> = {
    pix: <QrCode />,
    master: <CreditCard />,
  };

  return (
    <span className={`px-3 py-1 text-xs flex items-center gap-2`}>
      {icons[payment_method_id]} {payment_method_id}
    </span>
  );
}
