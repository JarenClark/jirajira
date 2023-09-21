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
import { EditIcon } from "lucide-react";
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

  // our initial comments are fetched on the server
  const { data: comments } = await supabase
    .from("_drive_comments")
    .select("id, message, user, created_at ")
    .eq("doc", params.docId);

  // get our user for chats functionailty
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
      {document && document.title && document.description && (
        <>
          <div className="grid w-full grid-cols-5 gap-2">
            <div className="col-span-3 ">
              <ScrollArea className="h-[80vh]">
                <div className="flex items-center min-h-[10vh]">
                  <h1 className="text-4xl mx-4 text-gray-200 font-semibold leading-none tracking-tight">
                    {document.title}
                  </h1>
                </div>

                <div className="mb-4 px-6 text-gray-600 max-w-lg">
                  {document.description}
                </div>
                <DocumentContent docId={params.docId} />
              </ScrollArea>
            </div>
            <aside className=" border-l border-zinc-800  pl-4 col-span-2 space-y-3 min-h-[90vh]">
              {/* <DocumentInfo desc={document.description} /> */}
              <DocumentChat serverChats={comments} currentUser={user?.id} />
            </aside>
          </div>
        </>
      )}
    </>
  );
}
