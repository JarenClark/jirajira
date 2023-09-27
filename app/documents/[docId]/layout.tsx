import React from "react";
import DocumentHeader from "@/components/DocumentHeader";
import DocumentContent from "@/components/DocumentContent";

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

      <div>{children}</div>
    </>
  );
}
