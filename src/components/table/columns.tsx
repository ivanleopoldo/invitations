import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CopyCheckIcon, Link } from "lucide-react";
import { Button } from "../ui/button";
import copy from "copy-to-clipboard";
import { toast } from "sonner";
import { useState } from "react";
import { URL } from "@/lib/constants";
import type { Invited } from "@/lib/types";
import { ButtonAnimated } from "../animated/button-animated";
import { CircleCheck, CircleX } from "lucide-react";

export const columns: ColumnDef<Invited>[] = [
  {
    header: " ",
    cell: ({ row }) => (
      <div>
        {row.original.num_of_attendees !== null ? (
          <CircleCheck className="w-8 h-8 text-green-600" />
        ) : (
          <CircleX className="w-8 h-8 text-red-600" />
        )}
      </div>
    ),
  },
  {
    header: " ",
    cell: ({ row }) => {
      const [isCopied, setIsCopied] = useState(false);
      const link = `${URL}/invite/${row.original.id}`;
      return (
        <div className="flex flex-row gap-2">
          <ButtonAnimated>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                copy(link)
                  .then(() => {
                    toast.success("Invite link copied!");
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                  })
                  .catch(() => {
                    toast.error("Failed to copy link");
                  });
              }}
              className="group hover:bg-primary/10 border-border/50 hover:border-primary/50 transition-all duration-200"
            >
              {isCopied ? (
                <>
                  <CopyCheckIcon className="w-4 h-4 text-green-600" />
                  <span className="ml-2 text-xs">Copied!</span>
                </>
              ) : (
                <>
                  <Link className="w-4 h-4" />
                  <span className="ml-2 text-xs">Copy</span>
                </>
              )}
            </Button>
          </ButtonAnimated>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-muted/20 -ml-3 px-2 h-8 font-semibold text-foreground"
        >
          Name
          <ArrowUpDown className="ml-2 w-3 h-3" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium text-foreground">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "max_num_of_attendees",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-muted/20 -ml-3 px-2 h-8 font-semibold text-foreground"
        >
          Max
          <ArrowUpDown className="ml-2 w-3 h-3" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="">{row.getValue("max_num_of_attendees")}</div>
    ),
  },
  {
    id: "going",
    accessorFn: (row) =>
      `${row.num_of_attendees === null ? 0 : row.num_of_attendees}`,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-muted/20 -ml-3 px-2 h-8 font-semibold text-foreground"
        >
          Going
          <ArrowUpDown className="ml-2 w-3 h-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value =
        row.original.num_of_attendees === null
          ? 0
          : row.original.num_of_attendees;

      return <div className="flex items-center space-x-2">{value}</div>;
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-muted/20 -ml-3 px-2 h-8 font-semibold text-foreground"
        >
          Role
          <ArrowUpDown className="ml-2 w-3 h-3" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="inline-flex items-center bg-primary px-2 py-1 border border-primary/20 rounded-full font-medium text-foreground text-xs">
        {row.getValue("role")}
      </span>
    ),
  },
];
