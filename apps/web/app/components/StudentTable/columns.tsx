"use client"

import { Checkbox } from "@repo/ui/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Students = {
  id: number
  prn: number
  name: string
  rollNo: number

}


export const columns: ColumnDef<Students>[] = [
  {
    accessorKey: "prn",
    header: "PRN",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "rollNo",
    header: "Roll No",
  },{
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)

        }
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
]
