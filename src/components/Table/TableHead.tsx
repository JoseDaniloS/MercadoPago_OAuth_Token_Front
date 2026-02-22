import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TableHeadComposition {
  children: ReactNode;
  className?: string;
}

export default function TableHead({
  children,
  className,
}: TableHeadComposition) {
  return (
    <thead
      className={twMerge(
        "text-text-gray rounded-xl text-left text-nowrap uppercase text-xs",
        className,
      )}
    >
      <tr>{children}</tr>
    </thead>
  );
}
