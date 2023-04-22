import { createContext, useContext } from "react";

export const ColumnContext = createContext({} as any);

export const useTableData = () => {
  const data = useContext(ColumnContext);

  return { data };
};
