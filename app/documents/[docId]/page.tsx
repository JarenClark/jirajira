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
import DocumentContent from "@/components/DocumentContent";
import DocumentInfo from "@/components/DocumentInfo";
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

  // our initrial comments are fetched on the server
  const { data: comments } = await supabase
    .from("_drive_comments")
    .select("id, message, user, created_at ")
    .eq("doc", params.docId);
  console.log(`comments are:`, comments);

  // get our user for chats functionailty
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
      {document && document.title && document.description && (
        <>
          <div className="pt-8 pb-2 px-6">
            <h1 className="text-2xl text-white font-semibold leading-none tracking-tight">
              {document.title}
            </h1>
          </div>
          <div className="flex justify-between  w-full">
            <div className="p-2 space-y-4 w-3/5 min-w-4xl">
              <ScrollArea className="h-[60vh]">
                <DocumentContent docId={params.docId} />
              </ScrollArea>
            </div>
            <aside className="p-2 space-y-4 w-2/5">
              <DocumentInfo id={params.docId} />
              <DocumentChat serverChats={comments} currentUser={user?.id} />
            </aside>
          </div>
        </>
      )}
    </>
  );
}
