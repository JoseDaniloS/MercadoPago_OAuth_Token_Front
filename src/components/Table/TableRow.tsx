import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TableRowComposition {
  children: ReactNode;
  className?: string;
}

export default function TableRow({ children, className }: TableRowComposition) {
  return (
    <tr
      className={twMerge(
        "hover:bg-primary/20 cursor-pointer transition-colors",
        className,
      )}
    >
      {children}
    </tr>
  );
}
