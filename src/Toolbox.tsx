import { useEffect, useState } from "react";
import { useTableContext } from "./context/TableContext";
import { Column } from "@tanstack/react-table";
import styled from "styled-components";

export const Toolbox = () => {
  const { getTableMethods, subToTableInitialize, setGrouping } =
    useTableContext();
  const [columns, setColumns] = useState<Column<any, unknown>[]>([]);
  const [group, setGroup] = useState<string | undefined>(undefined);

  useEffect(() => {
    subToTableInitialize(() => {
      //get columns
      const allColumns = getTableMethods()?.getAllColumns();
      if (allColumns) {
        setColumns(allColumns);
      }

      //get default groupable column
      const defaultGroup = getTableMethods()
        ?.getAllColumns()
        .find((column) => column.getCanGroup() !== false);

      if (defaultGroup?.columnDef.header) {
        const defaultGroupHeader = defaultGroup.columnDef.header as string;
        setGroup(defaultGroupHeader);
      }

      // set a single grouping state to the table
      if (defaultGroup?.id) {
        setGrouping(defaultGroup?.id);
      }
    });
  }, [columns, getTableMethods, setGrouping, subToTableInitialize]);

  const handleGroupChange = (e: any) => {
    setGroup(e.target.value);
    const findGroupToTrigger = columns.find(
      (column) => column.columnDef.header === e.target.value
    );

    // set a single grouping state to the table
    if (findGroupToTrigger?.id) {
      setGrouping(findGroupToTrigger?.id);
    }
  };

  return (
    <StyledDiv>
      {group && (
        <select onChange={handleGroupChange} defaultValue={group}>
          {columns.map((column) => {
            return (
              <option
                disabled={!column.getCanGroup()}
                key={column.id}
                value={column.columnDef.header as string}
              >
                {column.columnDef.header as string}
                {!column.getCanGroup() && "(Not Groupable)"}
              </option>
            );
          })}
        </select>
      )}
      <button onClick={() => getTableMethods()?.toggleAllRowsExpanded()}>
        Toggle All Rows
      </button>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;
