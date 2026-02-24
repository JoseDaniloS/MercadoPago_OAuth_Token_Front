import { ArrowUpDown, Download } from "lucide-react";
import { Button } from "../components/Button";
import { Table } from "../components/Table";
import { useEffect, useState } from "react";
import { fetchTransactionsWithPagination } from "../api/fetchTransactions";
import { UserAmplify } from "./MercadoPagoConnect";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
export default function Transactions({ userCognito }: UserAmplify) {
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState();
  const [transactions, setTransactions] = useState<PaymentResponse[]>([]);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        console.log("Buscando transações para o usuário:", userCognito?.userId);
        const response = await fetchTransactionsWithPagination(
          userCognito?.userId,
          1,
          lastEvaluatedKey,
        );
        if (response.LastEvaluatedKey)
          setLastEvaluatedKey(response.LastEvaluatedKey);

        setTransactions(response.Items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransaction();
  }, []);



  return (
    <div className="w-full p-6 min-h-screen flex flex-col gap-5 overflow-x-hidden">
      <div className="flex justify-between md:max-h-14 max-md:flex-col max-md:gap-5">
        <div>
          <h1 className="titles">Transações</h1>
          <p className="subtitles text-wrap">
            Visualize e gerencie todas as transações da sua conta.
          </p>
        </div>
        <div className="flex gap-3">
          <Button.Root className="text-charcoal">
            <Button.Icon className="text-charcoal" icon={Download} />
            Exportar CSV
          </Button.Root>
        </div>
      </div>

      <div className="max-md:overflow-x-scroll overflow-y-hidden border rounded-xl border-[#1E293B] w-full">
        {transactions.length > 0 ? (
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
        ) : (
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
        )}
      </div>
    </div>
  );
}
