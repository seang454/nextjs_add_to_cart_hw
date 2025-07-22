"use client"

import { Button } from "@/components/ui/button"
import { BlogType } from "@/types/blogtType"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export const columns: ColumnDef<BlogType>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="w-[50px] overflow-hidden text-ellipsis whitespace-nowrap">
        {row.getValue("id")}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "body",
    header: "Description",
    cell: ({ row }) => (
      <div className="w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
        {row.getValue("body")}
      </div>
    ),

  },
]