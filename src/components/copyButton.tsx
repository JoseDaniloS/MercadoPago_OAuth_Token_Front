import { Copy, CheckCircle } from "lucide-react";
import { useClipboard } from "../hooks/useClipboard";
import { ReactNode } from "react";

interface CopyButtonProps {
  value: string | number;
  className?: string;
  children?: ReactNode;
}

export default function CopyButton({
  value,
  className,
  children,
}: CopyButtonProps) {
  const { copy, copied } = useClipboard();

  return (
    <button
      onClick={() => copy(value)}
      className={`cursor-pointer transition ${className}`}
    >
      {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
      {children}
    </button>
  );
}
