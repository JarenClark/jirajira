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
import H1 from "@/components/ui/h1";
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
          <div>
            <div>
              <ScrollArea className="h-[70vh] mt-[5vh]">
                <DocumentContent docId={params.docId} />
              </ScrollArea>
            </div>
          </div>
        </>
      )}
    </>
  );
}
