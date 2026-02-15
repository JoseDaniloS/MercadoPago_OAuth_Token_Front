import { Download, Plus } from "lucide-react";
import { Button } from "../components/Button/Button";
import StatusBadge from "../components/statusBadge";

export default function Transactions() {
    return (
        <div className="w-full p-6 min-h-screen flex flex-col gap-5 overflow-x-hidden">
            <div className="flex justify-between md:max-h-14 max-md:flex-col max-md:gap-5">
                <div>
                    <h1 className="titles">Transações</h1>
                    <p className="subtitles">Visualize e gerencie todas as transações da sua conta.</p>
                </div>
                <div className="flex gap-3">
                    <Button.Root className="bg-charcoal text-white">
                        <Button.Icon className="text-white" icon={Download} />
                        Exportar CSV
                    </Button.Root>
                    <Button.Root>
                        <Button.Icon icon={Plus} />
                        Nova Transação
                    </Button.Root>
                </div>
            </div>

            <div className="max-md:overflow-x-scroll overflow-y-hidden border rounded-xl border-[#1E293B] w-full">
                <table className="w-full">
                    <thead className="text-text-gray rounded-xl text-left text-nowrap uppercase text-xs" >
                        <th className="px-6 py-4">ID da Transação</th>
                        <th className="px-6 py-4">Cliente</th>
                        <th className="px-6 py-4">Método</th>
                        <th className="px-6 py-4">Valor</th>
                        <th className="px-6 py-4">Data</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4"></th>
                    </thead>

                    <tbody className="bg-charcoal text-left text-white text-xs text-nowrap">
                        <tr className="hover:bg-primary/20 cursor-pointer transition-colors">
                        {/* ID */}
                        <td className="px-6 py-4">
                            <div className="font-medium text-white">
                                txn_892jdn...2k9
                            </div>
                            <div className="text-xs text-gray-500">
                                API Ref: order_123
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-600 text-white text-xs font-semibold">
                                    JD
                                </div>
                                <div>
                                    <div className="font-medium text-white">João da Silva</div>
                                    <div className="text-xs text-gray-500">joao@email.com</div>
                                </div>
                            </div>
                        </td>

                        {/* MÉTODO */}
                        <td className="px-6 py-4">
                            <span className="text-green-400 font-medium">Pix</span>
                        </td>

                        {/* VALOR */}
                        <td className="px-6 py-4 font-medium text-white">
                            R$ 150,00
                        </td>

                        {/* DATA */}
                        <td className="px-6 py-4">
                            <div>24 Out 2023</div>
                            <div className="text-xs text-gray-500">14:30</div>
                        </td>

                        {/* STATUS */}
                        <td className="px-6 py-4">
                            <StatusBadge status="approved" />
                        </td>

                        {/* ACTION */}
                        <td className="px-6 py-4 text-right text-gray-500 cursor-pointer">
                            ⋮
                            </td>
                            </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}