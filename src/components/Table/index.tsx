import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import {
  GroupingState,
  useReactTable,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { TableContext } from "src/context/TableContext";

export const ColumnContext = createContext({} as any);

type Props<T extends object> = {
  data: T[];
  columns?: ColumnDef<any, any>[];
  children: ReactNode;
};

export const useCellData = () => {
  const info = useContext(ColumnContext);
  return { data: info.getValue() };
};

const Table = <T extends object>({
  data,
  columns = [],
  children,
}: Props<T>) => {
  const [columnsState, setColumnsState] =
    useState<ColumnDef<any, any>[]>(columns);
  const [grouping, setGrouping] = useState<GroupingState>([]);

  const memoizedData = useMemo(() => data, [data]);

  const table = useReactTable({
    data: memoizedData,
    columns: columnsState,
    state: {
      grouping,
    },
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  const contextValue = useMemo(
    () => ({
      getTableMethods: () => table,
      addHeader: () => null,
      addCell: () => null,
      addColumn: (newColumn: ColumnDef<any, any>) => {
        const helperResponse = {
          ...newColumn,
          cell: (info: any) => (
            <ColumnContext.Provider value={info}>
              {(newColumn.cell as ReactNode) ?? info.getValue()}
            </ColumnContext.Provider>
          ),
        };

        setColumnsState((c) => {
          const findOld = c.findIndex(
            (col) => (col as any).accessorKey === (newColumn as any).accessorKey
          );

          if (findOld !== -1) {
            return [
              ...c.slice(0, findOld),
              helperResponse,
              ...c.slice(findOld + 1),
            ];
          }
          return [...c, helperResponse];
        });
      },
    }),
    [table]
  );

  return (
    <TableContext.Provider value={contextValue}>
      {children}
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} style={{ width: header.getSize() }}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} width={cell.column.getSize()}>
                      {cell.getIsPlaceholder()
                        ? null
                        : flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableContext.Provider>
  );
};

export default Table;
