import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TableHeadDataComposition {
  children?: ReactNode;
  className?: string;
}

export default function TableHeadData({
  children,
  className,
}: TableHeadDataComposition) {
  return <th className={twMerge("px-6 py-4", className)}>{children}</th>;
}
