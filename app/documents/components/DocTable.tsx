"use client";
import React, { useState } from "react";
import Link from "next/link";
// import { columns } from "./columns";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import TeamBadge from "@/components/TeamBadge";
// import TeamLinkFromId from "@/components/TeamLinkFromId";
export type Doc = {
  title: string;
  team: string;
  id: string;
  updated_at: Date | string;
};

export const columns: ColumnDef<Doc>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: (value) => {
      const id = value.row.original.id;
      return (
        <Link href={`/documents/${id}`} className="block oy-2 hover:text-white">
          {value.getValue() as string}
        </Link>
      );
    },
  },
  {
    accessorKey: "team",
    header: "Team",
    cell: (value) => {
      let val = value.getValue();
      return (
        <Link href={`/teams/${val as string}`}>
          <TeamBadge teamId={val as string} />
        </Link>
      );
    },
  },
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    // sortType: "datetime",
    cell: (value) => {
      let val = value.getValue(),
        d = new Date(val as Date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        });
      return <span className="whitespace-nowrap">{d}</span>;
    },
  },
];

function DocTable({ docs }: { docs: Doc[] }) {
  if (!docs) return null;
  const [data, setData] = useState(docs);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="mb-64">
      <ScrollArea className="h-[50vh]">
        {table && (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    //console.log(`header is`, header);
                    return (
                      <TableHead key={header.id}>
                        <span>{header.column.columnDef.header}</span>
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                <>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        //console.log(`cell is`, cell);
                        return (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell>No Results.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </ScrollArea>
    </div>
  );
}

export default DocTable;
