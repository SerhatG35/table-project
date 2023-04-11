import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any, any>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Age",
    accessorKey: "age",
  },
  {
    header: "City",
    accessorKey: "city",
  },
  {
    header: "Food",
    accessorKey: "food",
  },
  {
    header: "Rating",
    accessorKey: "rating",
  },
  {
    header: "Color",
    accessorKey: "color",
  },
  {
    header: "",
    accessorKey: "action",
  },
];
