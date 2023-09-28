import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import DocumentChat from "@/components/DocumentChat";
type Props = {};

export default async function DocumentChatPage({ params }: { params: { docId: string } }) {
  const supabase = createServerComponentClient({ cookies });

  // our initial comments are fetched on the server
  const { data: comments } = await supabase
    .from("_drive_comments")
    .select("id, message, user, created_at ")
    .eq("doc", params.docId);

  // get our user for chats functionailty
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (<div>
    <DocumentChat serverChats={comments} currentUser={user?.id} />
  </div>);
}

