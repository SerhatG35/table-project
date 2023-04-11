import { createContext, useContext } from "react";
import { ColumnDef } from "@tanstack/react-table";

export const TableContext = createContext({
  addColumn: (c: ColumnDef<any, any>) => {},
  addHeader: (h: ColumnDef<["header"], any> | string) => {},
  addCell: (cell: any) => {},
  getTableMethods: () => {},
});

export const useTableContext = () => useContext(TableContext);
