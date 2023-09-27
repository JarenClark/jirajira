import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
type Props = {
  folderId: string;
  title: string;
};

export default async function DocumentBreadCrumbs({ folderId, title }: Props) {
  const supabase = createServerComponentClient({ cookies });
  const { data: document } = await supabase
    .from("_drive_folders")
    .select("title, id")
    .eq("id", folderId)
    .single();
  return <div>DocumentBreadCrumbs</div>;
}
