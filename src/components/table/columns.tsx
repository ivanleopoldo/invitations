import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CopyIcon, CopyCheckIcon } from "lucide-react";
import { Button } from "../ui/button";
import copy from "copy-to-clipboard";
import { toast } from "sonner";
import { useState } from "react";
import { URL } from "@/lib/constants";

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
    header: "Invite",
    cell: ({ row }) => {
      const [isCopied, setIsCopied] = useState(false);
      const link = `${URL}/invite/${row.original.id}`;
      return (
        <Button
          size={"icon"}
          onClick={() => {
            copy(link)
              .then(() => {
                toast.success("Copied");
                setIsCopied(true);
              })
              .catch((err) => {
                toast.error(err);
              });
          }}
        >
          {!isCopied ? (
            <>
              <CopyIcon />
            </>
          ) : (
            <>
              <CopyCheckIcon />
            </>
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "max_num_of_attendees",
    header: "Max",
  },
  {
    accessorFn: (row) =>
      `${row.num_of_attendees === null ? 0 : row.num_of_attendees}`,
    header: "Going",
  },
];
