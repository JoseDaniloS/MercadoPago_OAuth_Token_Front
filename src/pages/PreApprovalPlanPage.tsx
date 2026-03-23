import { Plus } from "lucide-react";
import { Button } from "../components/Button";
import { PlanCard } from "../components/PreApprovalPlanPage/PlanCard";
import { Plan } from "../types/PlanTypes";
import { usePlans } from "../hooks/useTransactions";

export function PreApprovalPlanPage() {
  const { data, isLoading } = usePlans();
  return (
    <div className="w-full p-6 min-h-screen flex flex-col gap-10 overflow-x-hidden">
      <div className="flex justify-between xl:items-center  max-md:flex-col max-md:gap-5">
        <div className="max-w-2xl space-y-2">
          <h1 className="titles text-3xl">
            Planos e <span className="text-primary">Assinaturas</span>
          </h1>
          <p className="subtitles text-wrap">
            Projete, gerencie e dimensione suas ofertas de produtos. Monitore as métricas de desempenho em tempo real em
            seus níveis editoriais.
          </p>
        </div>
        <Button.Root className="text-black">
          <Button.Icon icon={Plus} />
          Novo Plano
        </Button.Root>
      </div>

      <div className="w-full grid grid-cols-4 max-md:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-3 gap-5">
        {data && data.map((plan: Plan) => <PlanCard key={plan.id} plan={plan} />)}
      </div>
    </div>
  );
}
