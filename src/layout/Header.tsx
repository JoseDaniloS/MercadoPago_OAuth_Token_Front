import { Clock, ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full p-3 flex gap-5 justify-between bg-charcoal/50">
      <div className="flex items-center gap-3">
        <div className="p-2 flex gap-2 items-center font-bold uppercase text-xs bg-primary/20 border text-primary border-primary/50 rounded">
          <Clock />
        </div>
        <p className="uppercase text-xl max-md:text-md text-slate-100 font-extrabold">
          CHRONOS<span className="text-primary">PAY</span>
        </p>
      </div>
      <div className="p-2 flex gap-2 items-center font-bold uppercase text-xs bg-green-400/20 border text-green-400 border-green-400/50 rounded">
        <ShieldCheck />
        <p>Ambiente Seguro</p>
      </div>
    </header>
  );
}
