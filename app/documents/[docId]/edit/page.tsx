import React from "react";
import DocumentEdit from "@/components/DocumentEdit";
// type Props = {
//     params: {
//         docId: string;
//     }
// }

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
