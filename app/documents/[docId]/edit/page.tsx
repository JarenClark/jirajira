import React from "react";
import DocumentEdit from "@/components/document/DocumentEdit";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function DocEditPage({
  params,
}: {
  params: { docId: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  // our initial content is fetched on the server
  const { data: initialContent } = await supabase
    .from("_drive_documents")
    .select("id, content")
    .eq("id", params.docId)
    .single();

    console.log(`initial content :`, JSON.stringify(initialContent, null,2))
  return (
    <>
      <DocumentEdit docId={params.docId} initialContent={initialContent?.content ?? null} />
    </>
  );
}
