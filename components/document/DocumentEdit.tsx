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
type Props = { docId: string };
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
function DocumentEdit({ docId }: Props) {
  const [editorOpen, setEditorOpen] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [docContent, setDocContent] = useState<any>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getDoc = async () => {
      let { data: document, error } = await supabase
        .from("_drive_documents")
        .select("title,content")
        .eq("id", docId)
        .single();
      if (document && document.content) {
        setValue(document.content);
        setDocContent(document.content);
      }
      if (document && document.title) {
        setTitle(document.title);
      }
    };
    getDoc();
  }, [supabase]);

  // useEffect(() => {
  //   console.log(`value is`, value);
  // }, [value]);

  return (
    <>
    <div className="flex justify-center items-center">
    <button onClick={() => setEditorOpen(true)}>Join 5 others</button>
    </div>
      
      {editorOpen && (
        <>
        {console.log('editor is open')}
          <div className="bg-black/50 backdrop-blur-lg fixed top-0 left-0 right-0 bottom-0 p-8 z-50 flex justify-center items-center">
            <ScrollArea className="h-[90vh] max-h-[700px]">
              <div className="rounded-lg bg-black border-zinc-700 border w-full max-w-4xl h-full  mx-auto p-8 ">
                <div className="flex justify-between p-8">
                  <h2 className="text-2xl text-gray-200">{title}</h2>
                  <XIcon onClick={() => setEditorOpen(false)} />
                </div>

                {value && (
                  <ReactQuill theme="snow" value={value} onChange={setValue} />
                )}
              </div>
            </ScrollArea>
          </div>
        </>
      )}


    </>
  );
}

export default DocumentEdit;
