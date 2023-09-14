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
type Props = { desc: String };

function DocumentInfo({ desc }: Props) {
  const supabase = createServerComponentClient({ cookies });
  return (
    <Card>
      {/* <CardHeader>
        <CardDescription>About</CardDescription>
      </CardHeader> */}
      <CardContent>
        <div className="h-8"></div>
        <Label>About</Label>
        <p className="mt-2 mb-4 text-gray-400">{desc} </p>
        <DocumentCollaborators />
      </CardContent>
    </Card>
  );
}

export default DocumentInfo;
