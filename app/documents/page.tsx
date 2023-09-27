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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import H1 from "@/components/ui/h1";
import Link from "next/link";

export default async function DocumentsPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: docs } = await supabase.from("_drive_documents").select("*");

  return (
    <div className="p-2 w-screen max-w-4xl">
      <div className="min-h-[10vh]">
        <div className="flex justify-between items-center my-4 max-w-3xl">
          <H1 text={"Documents"} />
        </div>
      </div>
      <Card>
        <CardContent>
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            {docs && docs.length > 0 ? (
              <TableBody>
                {docs.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-semibold whitespace-nowrap ">
                      <Link href={`/documents/${doc.id}`}>
                      {doc.title}
                      </Link>
                      
                    </TableCell>
                    <TableCell>Published</TableCell>
                    <TableCell>{doc.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : null}
          </Table>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
