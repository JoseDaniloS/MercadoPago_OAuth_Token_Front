import { Download } from "lucide-react";
import { Button } from "../components/Button";
import StatusBadge from "../components/statusBadge";
import { Table } from "../components/Table";
import { useEffect, useState} from "react";
import { fetchTransactionsWithPagination } from "../api/fetchTransactions";
import { UserAmplify } from "./MercadoPagoConnect";
import { truncateString } from "../utils/StringUtils";
import { formatDate } from "../utils/DateUtils";
import PaymentMethodBadge from "../components/PaymentMethodBadge";

export default function Transactions({ userCognito }: UserAmplify) {
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState();
  const [transactions, setTransactions] = useState([]);

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
          <p className="subtitles">
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
            {transactions.map((transaction, index) => {
              const { date, time } = formatDate(transaction?.date_created);
              return (
                <Table.Body.Row key={index}>
                  <Table.Body.Data>
                    <div className="font-medium text-white">
                      {transaction?.id}
                    </div>
                    <div className="text-xs text-gray-500">
                      API Ref: {truncateString(transaction.external_reference)}
                    </div>
                  </Table.Body.Data>
                  <Table.Body.Data>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-600 text-white text-xs font-semibold">
                        JD
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {transaction.payer.first_name || "Sem nome"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {transaction.payer.email || "Sem Email"}
                        </div>
                      </div>
                    </div>
                  </Table.Body.Data>
                  <Table.Body.Data>
                    <span className="text-green-400 font-medium uppercase">
                      <PaymentMethodBadge
                        payment_method_id={transaction.payment_method_id}
                      />
                    </span>
                  </Table.Body.Data>
                  <Table.Body.Data>
                    <span>R$ {transaction.transaction_amount}</span>
                  </Table.Body.Data>
                  <Table.Body.Data>
                    <StatusBadge status={transaction.status} />
                  </Table.Body.Data>
                  <Table.Body.Data>
                    <div>{date}</div>
                    <div className="text-xs text-gray-500">{time}</div>
                  </Table.Body.Data>
                  <Table.Body.Data className="text-right">
                    <button> ⋮</button>
                  </Table.Body.Data>
                </Table.Body.Row>
              );
            })}
          </Table.Body.Root>
        </Table.Root>
      </div>
    </div>
  );
}
