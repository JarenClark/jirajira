"use client";
import React, { useRef, useEffect, useState, Suspense } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { EditorProvider, FloatingMenu, BubbleMenu } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Document from "@tiptap/extension-document";
// import Paragraph from "@tiptap/extension-paragraph";
// import Text from "@tiptap/extension-text";
// import Heading from "@tiptap/extension-heading";
// import { ScrollArea } from "@/components/ui/scroll-area";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
type Props = {
  docId: string;
  initialContent?: string | null;
};
// define your extension array
// const extensions = [
//   StarterKit,
//   Document,
//   Paragraph,
//   Text,
//   Heading.configure({
//     levels: [1, 2, 3],
//   }),
// ];

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { XCircleIcon, XIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
function DocumentEdit({ docId, initialContent }: Props) {
  const [editorOpen, setEditorOpen] = useState<boolean>(true);

  const [docContent, setDocContent] = useState<any>(initialContent); // fetched on server
  const supabase = createClientComponentClient(); // for realtime updates

  useEffect(() => {
    const channel = supabase
      .channel("realtime content")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "_drive_documents",
          filter: `id=eq.${docId}`,
        },
        (payload) => {
          console.log(payload);
          const newContent = payload.new.content;
          if (newContent) {
            setDocContent(newContent);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <>
      <div className="flex justify-center items-center">
        <button onClick={() => setEditorOpen(true)}>Join 5 others</button>
      </div>
          <div className="bg-black/50 backdrop-blur-lg fixed top-0 left-0 right-0 bottom-0 p-8 z-50 flex justify-center items-center">
            <ScrollArea className="h-[90vh] max-h-[700px]">
              <div className="rounded-lg bg-black border-zinc-700 border w-full max-w-4xl h-full  mx-auto p-8 ">
                <div className="flex justify-between py-8">
                  {/* <h2 className="text-2xl text-gray-200">{title}</h2> */}
                  <XIcon onClick={() => setEditorOpen(false)} />
                </div>

                {docContent && (
                  <ReactQuill
                    theme="snow"
                    value={docContent}
                    onChange={setDocContent}
                  />
                )}
              </div>
            </ScrollArea>
          </div>

    </>
  );
}

export default DocumentEdit;
