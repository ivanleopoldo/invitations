import type { ColumnDef } from "@tanstack/react-table";

export type Invited = {
  id: string;
  max_num_of_attendees: number;
  num_of_attendees: number | null;
  name: string;
  prefix: "Mr. & Mrs." | "Mr." | "Mrs." | "Ms.";
  role: "guest" | "family" | "host";
};

export const columns: ColumnDef<Invited>[] = [
  {
    accessorKey: "prefix",
    header: "Prefix",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "max_num_of_attendees",
    header: "Max Number of Seats",
  },
  {
    accessorFn: (row) =>
      `${row.num_of_attendees === null ? 0 : row.num_of_attendees}`,
    header: "Number of People Going",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorFn: (row) => `https://localhost:5173/invite/${row.id}`,
    header: "Invite Link",
  },
];
