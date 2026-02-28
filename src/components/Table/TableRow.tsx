import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TableRowComposition extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
  className?: string;
}

export default function TableRow({ children, className, ...rest }: TableRowComposition) {
  return (
    <tr
      {...rest}
      className={twMerge(
        "hover:bg-primary/20 cursor-pointer transition-colors",
        className,
      )}
    >
      {children}
    </tr>
  );
}
