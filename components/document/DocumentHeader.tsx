import React from "react";
import H1 from "@/components/ui/h1";
import { BookmarkIcon, ChevronRight } from "lucide-react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Skeleton } from "@/components//ui/skeleton";
import Link from "next/link";
import DocumentSubNav from "./DocumentSubNav";
import DocumentBreadCrumbs from "./DocumentBreadCrumbs";
import DocumentBookmarkToggle from "./DocumentBookmarkToggle";
type Props = { id: string };
type DocType = {
  id: string;
  title: string;
  folder: {
    id: string;
    title: string;
  } | null;
};
export default async function DocumentHeader({ id }: Props) {
  const supabase = createServerComponentClient({ cookies });
  const { data: document } = await supabase
    .from("_drive_documents")
    .select("title, folder (id, title)")
    .eq("id", id)
    .single();

  if (!document) {
    return <Skeleton className="h-12 w-64" />;
  }

  const { title, folder } = document;

  return (
    <>
      {/* <DocumentBreadCrumbs title={title} /> */}
      <div className="min-h-[10vh] flex justify-between items-center w-screen max-w-3xl">
        <H1 text={title} />
        <DocumentBookmarkToggle docId={id} />
      </div>
      <DocumentSubNav docId={id} />
    </>
  );
}

// export default DocumentHeader;
