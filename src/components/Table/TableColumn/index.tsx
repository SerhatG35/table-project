import { ColumnDef } from "@tanstack/react-table";
import { FC, useState, useEffect, useMemo, PropsWithChildren } from "react";
import { TableContext, useTableContext } from "src/context/TableContext";

export const Column: FC<PropsWithChildren<ColumnDef<any, any>>> = ({
  children,
  ...column
}) => {
  const { addColumn, getTableMethods } = useTableContext();

  const [header, setHeader] = useState<ColumnDef<["header"], any> | string>("");
  const [cell, setCell] = useState<ColumnDef<["header"], any> | undefined>(
    undefined
  );

  useEffect(() => {
    if (header) {
      addColumn({
        ...column,
        ...(cell ? { cell } : {}),
        header: header,
      } as ColumnDef<any, any>);
    }
  }, [addColumn, cell, column, header]);

  const contextValue = useMemo(
    () => ({
      getTableMethods,
      addHeader: (newHeader: ColumnDef<["header"], any> | string) => {
        setHeader(newHeader);
      },
      addCell: (cell: any) => {
        setCell(cell);
      },
    }),
    [getTableMethods]
  );

  return (
    <TableContext.Provider value={contextValue as any}>
      {children}
    </TableContext.Provider>
  );
};
