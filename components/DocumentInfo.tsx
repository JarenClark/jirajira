import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DocumentCollaborators from "./DocumentCollaborators";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
type Props = { id: String };

function DocumentInfo({ id }: Props) {
  const supabase = createServerComponentClient({ cookies });
  return (
    <Card>
      <CardHeader>
        <CardDescription>About</CardDescription>
      </CardHeader>
      <CardContent>
        <DocumentCollaborators />
      </CardContent>
    </Card>
  );
}

export default DocumentInfo;
