"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
export type Doc = {
  title: string;
  id: string;
  team: string;
//   accessoryKey: string;
};

export const columns: ColumnDef<Doc>[] = [
  { accessoryKey: "title", header: "Title" },
  { accessoryKey: "team", header: "Team" },
];
