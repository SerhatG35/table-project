import { createContext, useContext } from "react";
import { ColumnDef, Table } from "@tanstack/react-table";

type TableContextTypes = {
  addColumn: (newColumn: ColumnDef<any, any>) => void;
  addHeader: (header: ColumnDef<["header"], any> | string) => void;
  addCell: (cell: any) => void;
  getTableMethods: () => Table<any> | null;
  subToTableInitialize: (callback: any) => void;
  setGrouping: (group: string) => void;
};

export const TableContext = createContext<TableContextTypes>({
  addColumn: (c: ColumnDef<any, any>) => {},
  addHeader: (h: ColumnDef<["header"], any> | string) => {},
  addCell: (cell: any) => {},
  getTableMethods: () => null,
  subToTableInitialize: (callback: Function) => {},
  setGrouping: () => null,
});

export const useTableContext = () => useContext(TableContext);
