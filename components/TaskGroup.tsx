import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

type Props = {
  color: string;
  group: {
    id: string;
    title: string;
    description?: string;
  };
};

async function TaskGroup({ group, color }: Props) {
  const supabase = createServerComponentClient({ cookies });

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("task_group", group.id);

  return (
    <div className="my-8">
      {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}
      <h2 style={{ color: color }}>{group.title}</h2>
      <Table>
        {/* {group.description && <TableCaption>{group.description}</TableCaption>} */}
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>People</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks &&
            tasks.length > 0 &&
            tasks
              .sort((a, b) => (a.due_date > b.due_date ? 1 : -1))
              .map((task, i) => (
                <TableRow key={i}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>
                    {format(new Date(task.due_date), "MMMM dd")}
                  </TableCell>
                  <TableCell>circlecircle</TableCell>
                  <StatusCell status={task.status} />
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}

function StatusCell({ status }: { status: String }) {
  const colorChooser = (status: String) => {
    switch (status) {
      case "Done":
        return "bg-[#34d391] bg-opacity-90 text-white";
      case "Working on it":
        return "bg-[#fdbc64] bg-opacity-90 text-white";
      case "Stuck":
        return "bg-[#c95c76] bg-opacity-90 text-white";
      default:
        return '';

    }
  };
  return (
    <TableCell className={`${colorChooser(status)} text-center`}>
      {status}
    </TableCell>
  );
}

export default TaskGroup;
