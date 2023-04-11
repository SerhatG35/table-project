import { FC, PropsWithChildren, useEffect } from "react";
import { useTableContext } from "src/context/TableContext";

export const Cell: FC<PropsWithChildren> = ({ children }) => {
  const { addCell } = useTableContext();

  useEffect(() => {
    addCell(children);
  }, [children, addCell]);

  return null;
};
