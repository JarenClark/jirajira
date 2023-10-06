import React from "react";
import DocumentEdit from "@/components/document/DocumentEdit";

export default async function DocEditPage({
  params,
}: {
  params: { docId: string };
}) {
  return (
    <>
      <DocumentEdit docId={params.docId} />
    </>
  );
}
