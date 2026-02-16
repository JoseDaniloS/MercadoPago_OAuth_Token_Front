import { Download } from "lucide-react";
import { Button } from "../components/Button";
import StatusBadge from "../components/statusBadge";
import { Table } from "../components/Table";

export default function Transactions() {
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
            <Table.Head.Data>Data</Table.Head.Data>
            <Table.Head.Data>Status</Table.Head.Data>
            <Table.Head.Data></Table.Head.Data>
          </Table.Head.Root>
          <Table.Body.Root>
            <Table.Body.Row>
              <Table.Body.Data>
                <div className="font-medium text-white">txn_892jdn...2k9</div>
                <div className="text-xs text-gray-500">API Ref: order_123</div>
              </Table.Body.Data>
              <Table.Body.Data>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-600 text-white text-xs font-semibold">
                    JD
                  </div>
                  <div>
                    <div className="font-medium text-white">João da Silva</div>
                    <div className="text-xs text-gray-500">joao@email.com</div>
                  </div>
                </div>
              </Table.Body.Data>
              <Table.Body.Data>
                <span className="text-green-400 font-medium">Pix</span>
              </Table.Body.Data>
              <Table.Body.Data>
                <span>R$ 150,00</span>
              </Table.Body.Data>
              <Table.Body.Data>
                <div>24 Out 2023</div>
                <div className="text-xs text-gray-500">14:30</div>
              </Table.Body.Data>
              <Table.Body.Data>
                <StatusBadge status="approved" />
              </Table.Body.Data>
              <Table.Body.Data className="text-right">
                <button> ⋮</button>
              </Table.Body.Data>
            </Table.Body.Row>
          </Table.Body.Root>
        </Table.Root>
      </div>
    </div>
  );
}
