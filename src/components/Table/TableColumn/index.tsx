import { ColumnDef } from "@tanstack/react-table";
import { FC, useState, useEffect, useMemo, PropsWithChildren } from "react";
import { TableContext, useTableContext } from "src/context/TableContext";

type ColumnType = ColumnDef<any, any>;

export const Column: FC<PropsWithChildren<ColumnType>> = ({
  children,
  ...column
}) => {
  const { addColumn, subToTableInitialize, getTableMethods, setGrouping } =
    useTableContext();

  const [header, setHeader] = useState<ColumnDef<["header"], any> | string>("");
  const [cell, setCell] = useState<any>(undefined);

  useEffect(() => {
    if (header) {
      addColumn({
        ...column,
        ...(cell ? { cell } : {}),
        header: header,
      } as ColumnType);
    }
  }, [addColumn, cell, column, header]);

  const contextValue = useMemo(
    () => ({
      subToTableInitialize,
      getTableMethods,
      setGrouping,
      addColumn,
      addHeader: (newHeader: ColumnDef<["header"], any> | string) => {
        setHeader(newHeader);
      },
      addCell: (cell: any) => {
        setCell(cell);
      },
    }),
    [addColumn, getTableMethods, setGrouping, subToTableInitialize]
  );

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  );
};
