"use client";
import React from "react";

type Props = { docId: string };

function DocumentEdit({ docId }: Props) {
  return <div>DocumentEdit {JSON.stringify(docId)}</div>;
}

export default DocumentEdit;
