import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TableBodyComposition {
  children: ReactNode;
  className?: string;
}

export default function TableBody({
  children,
  className,
}: TableBodyComposition) {
  return (
    <tbody
      className={twMerge(
        "bg-charcoal text-left text-white text-xs text-nowrap",
        className,
      )}
    >
      {children}
    </tbody>
  );
}
