import TableBody from "./TableBody";
import TableBodyData from "./TableBodyData";
import TableHead from "./TableHead";
import TableHeadData from "./TableHeadData";

import TableRoot from "./TableRoot";
import TableRow from "./TableRow";
import TransactionRow from "./TransactionRow";

export const Table = {
  Root: TableRoot,
  Head: {
    Root: TableHead,
    Data: TableHeadData,
  },
  Body: {
    Root: TableBody,
    Row: TableRow,
    Data: TableBodyData,
    TransactionRow: TransactionRow
  },
};
