// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

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
import H1 from "@/components/ui/h1";
import Link from "next/link";
import DocTable from "./components/DocTable";

export default async function DocumentsPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: docs } = await supabase.from("_drive_documents").select(" title, team, id, updated_at");
  // const { data: teams } = await supabase.from("_drive_teams").select("*");

  return (
    <div className="p-2 w-screen max-w-4xl">
      <div className="min-h-[10vh]">
        <div className="flex justify-between items-center my-4 max-w-3xl">
          <H1 text={"Documents"} />
        </div>
      </div>
      {docs && <DocTable docs={docs} />}
    </div>
  );
}
