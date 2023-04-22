import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { TableContext } from "src/context/TableContext";
import { ColumnContext } from "src/context/ColumnContext";
import { RiArrowDownSFill, RiArrowRightSFill } from "react-icons/ri";
import styled from "styled-components";

type Props<T extends object> = {
  data: T[];
  columns?: ColumnDef<any, any>[];
  children: ReactNode;
};

const Table = <T extends object>({
  data,
  columns = [],
  children,
}: Props<T>) => {
  const [columnsState, setColumnsState] =
    useState<ColumnDef<any, any>[]>(columns);
  const [grouping, setGrouping] = useState<string[]>([]);

  const memoizedData = useMemo(() => data, [data]);

  const table = useReactTable({
    data: memoizedData,
    columns: columnsState,
    state: {
      grouping,
    },
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  const ref = useRef(() => {});

  const contextValue = useMemo(
    () => ({
      getTableMethods: () => table,
      subToTableInitialize: (callback: any) => (ref.current = callback),
      addHeader: () => null,
      addCell: () => null,
      setGrouping: (group: string) => {
        setGrouping([group]);
      },
      addColumn: (newColumn: ColumnDef<any, any>) => {
        const helperResponse = {
          ...newColumn,
          cell: (info: any) => {
            return (
              <ColumnContext.Provider value={info}>
                {(newColumn.cell as ReactNode) ?? info.getValue()}
              </ColumnContext.Provider>
            );
          },
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

  useEffect(() => {
    columnsState.length > 0 && ref.current();
  }, [columnsState]);

  return (
    <TableContext.Provider value={contextValue}>
      {children}
      <StyledTable>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TH
                    width={header.getSize()}
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </TH>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return row.getIsGrouped() ? (
              <GroupRow
                onClick={row.getToggleExpandedHandler()}
                background={row.getIsExpanded() ? "#a696d6" : "#cdc3eb"}
                key={row.id}
              >
                <td style={{ padding: "10px" }} colSpan={columnsState.length}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ display: "flex", fontSize: "1.5rem" }}>
                      {row.getIsExpanded() ? (
                        <RiArrowDownSFill />
                      ) : (
                        <RiArrowRightSFill />
                      )}
                    </div>
                    <div style={{ marginLeft: "1rem" }}>
                      {row.groupingValue as string}
                    </div>
                    <div style={{ marginLeft: "0.2rem" }}>
                      ({row.subRows.length})
                    </div>
                  </div>
                </td>
              </GroupRow>
            ) : (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      {...{
                        key: cell.id,
                        style: {
                          background: cell.getIsGrouped()
                            ? "#0aff0082"
                            : cell.getIsPlaceholder()
                            ? "#fff"
                            : "#eaeaea",
                          textAlign:
                            typeof cell.getValue() === "number"
                              ? "right"
                              : "left",
                          border: "2px solid #8d8d8d",
                        },
                      }}
                      width={cell.column.getSize() ?? 100}
                    >
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
      </StyledTable>
    </TableContext.Provider>
  );
};

export default Table;

const TH = styled.th<{ width?: number }>`
  border: 2px solid #8d8d8d;
  width: ${({ width }) => width ?? undefined};
`;

const StyledTable = styled.table`
  border-collapse: collapse;
`;

const GroupRow = styled.tr<{ cursor?: string; background?: string }>`
  background: ${({ background }) => background ?? undefined};
  white-space: nowrap;
  cursor: ${({ cursor }) => cursor ?? undefined};
  font-size: 1.1rem;
  border: 2px solid;
  border-bottom: 2px solid;
  cursor: pointer;
`;
