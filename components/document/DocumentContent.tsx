import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EditIcon } from "lucide-react";
type Props = { docId: string };

export default async function DocumentContent({ docId }: Props) {
  const supabase = createServerComponentClient({ cookies });

  const { data: document } = await supabase
    .from("_drive_documents")
    .select("content")
    .eq("id", docId)
    .single();

  return (
    <>
      <Card className="py-8">
        <CardContent>
          <Suspense fallback={<p>Loading...</p>}>
            {document && (
              <ScrollArea className="h-[60vh]">
                <article
                  className="prose-invert prose md:prose-lg"
                  dangerouslySetInnerHTML={{ __html: document.content }}
                />
              </ScrollArea>
            )}
          </Suspense>
        </CardContent>
        {/* <CardFooter></CardFooter> */}
      </Card>
    </>
  );
}
