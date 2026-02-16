import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";

interface TableRootComposition {
  children: ReactNode;
  className?: string;
}

export default function TableRoot({
  children,
  className,
}: TableRootComposition) {
  return <table className={twMerge("w-full", className)}>{children}</table>;
}
