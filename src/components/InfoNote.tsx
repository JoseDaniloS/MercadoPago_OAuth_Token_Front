import { ReactNode } from "react";
import { Info } from "lucide-react";
import TextUppercase from "./TextUppercase";


interface InfoNoteProps {
  title: string;
  children: ReactNode;
}

export function InfoNote({ title, children }: InfoNoteProps) {
  return (
    <div className="rounded-xl flex gap-3 border-l-4 p-3 border-blue-300 bg-blue-500/5">
      <div className="mt-0.5">
        <Info className="text-blue-300" size={18} />
      </div>

      <div className="flex flex-col gap-2">
        <TextUppercase className="text-white">{title}</TextUppercase>
        <span className="text-sm text-white/80 leading-relaxed">{children}</span>
      </div>
    </div>
  );
}
