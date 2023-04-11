import { FC, useEffect } from "react";
import { useTableContext } from "src/context/TableContext";
import { ColumnDef } from "@tanstack/react-table";

export const Header: FC<{ children: ColumnDef<["header"], any> | string }> = ({
  children,
}) => {
  const { addHeader } = useTableContext();

  useEffect(() => {
    addHeader(children);
  }, [addHeader, children]);

  return null;
};
