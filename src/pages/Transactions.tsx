import { ArrowLeft, ArrowRight, ArrowUpDown, Download, LoaderCircleIcon } from "lucide-react";
import { Button } from "../components/Button";
import { Table } from "../components/Table";

import { UserAmplify } from "./MercadoPagoConnect";
import { useTransactions } from "../hooks/useTransactions";
import { useState } from "react";
export default function Transactions({ userCognito }: UserAmplify) {

  const [page, setPage] = useState(1);

  const { data, isLoading } = useTransactions({
    userId: userCognito?.userId,
    page,
    pageSize: 10,
  });

  const transactions = data?.Items ?? [];
  const hasNextPage = !!data?.LastEvaluatedKey;
  const hasPreviousPage = page > 1;
  const isEmpity = transactions.length === 0 && !isLoading

  const nextPage = () => {
    if (hasNextPage) setPage((prev) => prev + 1);
  };
  const previousPage = () => {
    if (hasPreviousPage) setPage((prev) => prev - 1);
  };


  return (
    <div className="w-full p-6 min-h-screen flex flex-col gap-5 overflow-x-hidden">
      <div className="flex justify-between md:max-h-14 max-md:flex-col max-md:gap-5">
        <div>
          <h1 className="titles">Transações</h1>
          <p className="subtitles text-wrap">
            Visualize e gerencie todas as transações da sua conta.
          </p>
        </div>
        {/* <div className="flex gap-3">
          <Button.Root className="text-charcoal">
            <Button.Icon className="text-charcoal" icon={Download} />
            Exportar CSV
          </Button.Root>
        </div> */}
      </div>

      <div className="max-md:overflow-x-scroll overflow-y-hidden border rounded-xl border-[#1E293B] w-full">
        {!isEmpity &&
          <Table.Root>
            <Table.Head.Root>
              <Table.Head.Data>ID da Transação</Table.Head.Data>
              <Table.Head.Data>Cliente</Table.Head.Data>
              <Table.Head.Data>Método</Table.Head.Data>
              <Table.Head.Data>Valor</Table.Head.Data>
              <Table.Head.Data>Status</Table.Head.Data>
              <Table.Head.Data>Data</Table.Head.Data>
              <Table.Head.Data></Table.Head.Data>
            </Table.Head.Root>
            <Table.Body.Root>
              {transactions.map((transaction, index) => (
                <Table.Body.TransactionRow key={index} transaction={transaction} />
              ))}
            </Table.Body.Root>
          </Table.Root>
        }

        {isLoading &&
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <LoaderCircleIcon className="text-text-gray animate-spin w-7 h-7" />
            </div>
            <div className="text-center">
              <p className="text-white font-semibold">Carregando...</p>

            </div>
          </div>
        }
        {isEmpity &&
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <ArrowUpDown className="text-text-gray w-7 h-7" />
            </div>
            <div className="text-center">
              <p className="text-white font-semibold">Nenhuma transação encontrada</p>
              <p className="text-text-gray text-sm mt-1">
                Suas transações aparecerão aqui assim que forem realizadas.
              </p>
            </div>
          </div>
        }
      </div>


      <div className="flex gap-5 items-center max-md:justify-between">
        <p>{transactions.length} Item | Página {page}</p>
        <div className="flex gap-2">
          <Button.Root className="p-2" disabled={!hasPreviousPage} onClick={previousPage}>
            <Button.Icon icon={ArrowLeft} />
          </Button.Root>
          {!isEmpity && <Button.Root className="p-2" onClick={nextPage}>
            <Button.Icon icon={ArrowRight} />
          </Button.Root>}
        </div>
      </div>
    </div>
  );
}