"use client";
import React, { useRef, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { EditorProvider, FloatingMenu, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
type Props = { docId: string };
// define your extension array
const extensions = [
  StarterKit,
  Document,
  Paragraph,
  Text,
  Heading.configure({
    levels: [1, 2, 3],
  }),
];
function DocumentEdit({ docId }: Props) {
  const [docContent, setDocContent] = useState<any>(null);
  const supabase = createClientComponentClient();
  const content = "<p>Hello World!</p> <ul><li>one</li><li>two</li></ul>";
  return (
    <>
      <EditorProvider extensions={extensions} content={content}>
        <FloatingMenu>This is the floating menu</FloatingMenu>
        <BubbleMenu>This is the bubble menu</BubbleMenu>
      </EditorProvider>
    </>
  );
}

export default DocumentEdit;
