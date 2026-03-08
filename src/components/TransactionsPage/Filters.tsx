import { Trash } from "lucide-react";
import { labels, payment_methods_id } from "../../constants/constants";
import { TransactionFilters } from "../../types/transactionFilters";
import TextUppercase from "../TextUppercase";
import { Dispatch, memo, SetStateAction } from "react";

interface FiltersProps {
  filterForm: TransactionFilters;
  setFilterForm: Dispatch<SetStateAction<TransactionFilters>>;
}

function Filters({ filterForm, setFilterForm }: FiltersProps) {
  const hasActiveFilters = Object.values(filterForm).some((value) => value !== undefined && value !== "") 

  const handleClearFilters = () => setFilterForm({});

  return (
    <div className="flex items-center gap-5">
      <TextUppercase>FILTROS ATIVOS:</TextUppercase>

      {filterForm.status && (
        <p className="bg-primary/20 rounded-md border px-3 text-primary">{labels[filterForm.status]}</p>
      )}

      {filterForm.payment_method_id && (
        <p className="bg-primary/20 rounded-lg px-3 text-primary border">
          {payment_methods_id[filterForm.payment_method_id] as keyof typeof payment_methods_id}
        </p>
      )}

      {hasActiveFilters && ( // ✅ nome legível
        <button
          onClick={handleClearFilters}
          className="hover:underline text-primary cursor-pointer border border-primary/30 px-3 py-1 rounded-lg bg-primary/10"
        >
          <span className="text-xs flex gap-2 items-center">
            Limpar Filtros
            <Trash size={16} />
          </span>
        </button>
      )}
    </div>
  );
}
export default memo(Filters)
