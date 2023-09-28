import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DocumentCollaborators from "@/components/DocumentCollaborators";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Label } from "@/components/ui/label";
import TeamBadge from "./TeamBadge";
type Props = { docId: String };

export default async function DocumentInfo({ docId }: Props) {
  const supabase = createServerComponentClient({ cookies });
  const { data: document } = await supabase
    .from("_drive_documents")
    .select("description, team")
    .eq("id", docId)
    .single();

  if (!document) return null;
  return (
    <Card>
      {/* <CardHeader>
        <CardDescription>About</CardDescription>
      </CardHeader> */}
      <CardContent>
        <div>
          <TeamBadge teamId={document.team} />
        </div>
        <Label className="text-gray-600">About</Label>
        <p className="mt-2 mb-4 text-gray-400">{document.description} </p>
        <DocumentCollaborators />
      </CardContent>
    </Card>
  );
}
