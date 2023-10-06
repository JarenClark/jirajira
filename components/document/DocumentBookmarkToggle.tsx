"use client";
import { BookmarkIcon } from "lucide-react";
import React from "react";

type Props = { docId: string };

function DocumentBookmarkToggle({ docId }: Props) {
  return (
    <>
      <BookmarkIcon />
    </>
  );
}

export default DocumentBookmarkToggle;
