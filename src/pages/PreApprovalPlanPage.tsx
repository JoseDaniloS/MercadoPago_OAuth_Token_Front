import { Check, ChevronDown, Info, Plus } from "lucide-react";
import { Button } from "../components/Button";
import { PlanCard } from "../components/PreApprovalPlanPage/PlanCard";
import { Plan } from "../types/PlanTypes";
import { usePlans } from "../hooks/useTransactions";
import { useState } from "react";
import { Modal } from "../components/Modal";
import { AnimatePresence, motion } from "motion/react";
import InputField from "../components/InputField";
import { Select } from "../components/Select";
import { TIME_UNITS_LABELS } from "../constants/constants";
import { SwitchCheckBox } from "../components/SwitchCheckBox";
import TextUppercase from "../components/TextUppercase";
import { InfoNote } from "../components/InfoNote";

export function PreApprovalPlanPage() {
  const { data, isLoading } = usePlans();
  const [show, setShow] = useState<boolean | null>(null);

  const handleShowModal = () => {
    setShow(true);
  };

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
        <Button.Root onClick={handleShowModal} className="text-black">
          <Button.Icon icon={Plus} />
          Novo Plano
        </Button.Root>
      </div>

      <div className="w-full grid grid-cols-4 max-md:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-3 gap-5">
        {data && data.map((plan: Plan) => <PlanCard key={plan.id} plan={plan} />)}
      </div>

      <AnimatePresence>
        {show && (
          <Modal setShow={setShow}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{ willChange: "transform, opacity" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="transform-gpu glass-card rounded-lg  overflow-y-auto max-md:h-full  shadow-xl p-6 w-full max-w-4xl space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full flex flex-col gap-5">
                <h1 className="titles text-primary text-2xl">Informações Gerais</h1>
                <InputField label="Nome do plano (Motivo)" placeholder="ex: Acesso Editorial Premium" />
                <div className="flex max-md:flex-col w-full gap-5 ">
                  <InputField label="Preço (R$)" placeholder="R$ 0,00" />
                  <InputField label="URL DO WEBSITE (BACK_URL)" placeholder="https://suamarca.com.br/sucesso" />
                </div>
              </div>
              <div className="w-full flex flex-col gap-5">
                <h1 className="titles text-primary text-2xl">Ciclo de Faturamento</h1>
                <div className="flex max-md:flex-col items-start gap-5">
                  <div className="flex w-full items-end gap-5">
                    <InputField className="max-w-32" defaultValue={1} label="FREQUÊNCIA" />

                    <Select className="max-w-32" options={TIME_UNITS_LABELS} icon={ChevronDown} />
                  </div>
                  <div className="w-full">
                    <InputField type="number" label="Número de repetições (Opcional)" placeholder="Infinito" />
                    <span className="text-xs">Deixe em branco para assinaturas por tempo indeterminado</span>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-5">
                <div className="flex w-full justify-between gap-3">
                  <div>
                    <h1 className="titles text-primary text-2xl">Incentivos</h1>
                    <span className="max-md:text-sm">Ofereça um período de teste para aumentar a conversão</span>
                  </div>
                  <SwitchCheckBox />
                </div>
                <div className="flex w-full max-md:flex-col gap-5 justify-between">
                  <InputField type="number" label="Duração do teste" placeholder="Ex: 7" />
                  <Select label="unidade de teste" options={TIME_UNITS_LABELS} icon={ChevronDown} />
                </div>
              </div>
              <InfoNote title="Nota de conformidade">
                Planos criados são imutáveis assim que a primeira assinatura estiver ativa. Certifique-se de que suas
                frequências de cobrança estejam alinhadas com seus contratos de nível de serviço.
              </InfoNote>

              <Button.Root className="w-full flex justify-center">
                <Button.Icon icon={Check} />
                <span className="text-black">Criar</span>
              </Button.Root>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
