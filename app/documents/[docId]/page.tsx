import React from "react";
import { useRouter } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import TaskGroup from "@/components/TaskGroup";
import { ScrollArea } from "@/components/ui/scroll-area";
import DocumentCollaborators from "@/components/DocumentCollaborators";
import DocumentHeader from "@/components/DocumentHeader";
import DocumentChat from "@/components/DocumentChat";
import { Separator } from "@/components/ui/separator";
type Props = {};

export default async function DocumentPage({
  params,
}: {
  params: { docId: string };
}) {
  const supabase = createServerComponentClient({ cookies });

  // doc overview
  const { data: document } = await supabase
    .from("_drive_documents")
    .select("*")
    .eq("id", params.docId)
    .single();

  return (
    <div className="flex justify-between">
      <div className="p-2 w-screen max-w-4xl">
        <DocumentHeader
          title={document.title}
          description={document.description}
        />

        <ScrollArea className="h-[60vh]">
          <div className="bg-white  bg-opacity-10 p-4 rounded-lg">
            <div>
              <p>Content for {params.docId}</p>
            </div>
            <div className="text-green-400">
              <pre>{JSON.stringify(document, null, 2)}</pre>
            </div>
          </div>
        </ScrollArea>
      </div>
      <div className="w-screen max-w-md">
        <DocumentChat />
      </div>
    </div>
  );
}
