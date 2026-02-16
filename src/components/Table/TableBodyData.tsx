import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TableBodyDataComposition {
  children: ReactNode;
  className?: string;
}

export default function TableBodyData({
  children,
  className,
}: TableBodyDataComposition) {
  return <td className={twMerge("px-6 py-4", className)}>{children}</td>;
}
