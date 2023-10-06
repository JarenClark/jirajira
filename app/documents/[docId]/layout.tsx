import React from "react";
import DocumentHeader from "@/components/document/DocumentHeader";
import DocumentContent from "@/components/document/DocumentContent";
import Link from "next/link";
import DocumentSubNav from "@/components/document/DocumentSubNav";
import DocumentInfo from "@/components/document/DocumentInfo";

type Props = {
  children: React.ReactNode;
  params: {
    docId: string;
  };
};

export default async function DocRootLayout({ children, params }: Props) {
  return (
    <>
      <DocumentHeader id={params.docId} />
      <div className="grid grid-cols-4 w-full">
      <div className="col-span-3">{children}</div>

      </div>

    </>
  );
}

//




// <aside className=" border-l border-zinc-800  pl-4 col-span-1 space-y-3 min-h-[90vh]">
// <DocumentInfo docId={params.docId} />

// {/* <DocumentChat serverChats={comments} currentUser={user?.id} /> */}
// </aside>