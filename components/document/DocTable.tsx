"use client";
import React, { Suspense, useState, useMemo } from "react";
import Link from "next/link";
// import { columns } from "./columns";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
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
import TeamBadge from "@/components/team/TeamBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
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
        <Link href={`/documents/${id}`} className="block py-2 hover:text-white">
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
      return <TeamBadge teamId={val as string} />;
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
  const [data, setData] = useState<Doc[]>(docs);
  const [filter, setFilter] = useState<string>("");
  const [teamFilter, setTeamFilter] = useState<string | null>(null)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filter,
    },
  });
  return (
    <div className="mb-64">
      <ScrollArea className="h-[50vh]">
        {table ? (
          <div className="flex items-center mb-8">
            <div className="w-64">
              <Input
                placeholder="Search..."
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          </div>
        ) : null}
        {table && (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-zinc-800 hover:bg-transparent"
                >
                  {headerGroup.headers.map((header) => {
                    //console.log(`header is`, header);
                    return (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                    <TableRow
                      key={row.id}
                      className="hover:bg-slate-900 border-zinc-800"
                    >
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
