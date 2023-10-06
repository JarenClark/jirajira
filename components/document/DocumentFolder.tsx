"use client";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { ChevronDown, FolderKanbanIcon, MinusIcon } from "lucide-react";
import Link from "next/link";
import slugify from "slugify";
type Props = { id: string };

function DocumentFolder({ id }: Props) {
  const [folder, setFolder] = useState<any>({});
  const [docs, setDocs] = useState<any[]>([]);
  const [folderIsOpen, setFolderIsOpen] = useState<Boolean>(false);
  const supabase = createClientComponentClient();

  // get our folder
  useEffect(() => {
    const getFolder = async () => {
      const { data: folder, error } = await supabase
        .from("_drive_folders")
        .select("*")
        .eq("id", id)
        .single();

      //   console.log("error", error);
      if (folder) {
        setFolder(folder);
      }
    };

    getFolder();
  }, [supabase, setFolder]);

  // get projects from our folder
  useEffect(() => {
    const getProjects = async () => {
      const { data: documents, error } = await supabase
        .from("_drive_documents")
        .select("id,title")
        .eq("folder", id);

      //   console.log("error", error);
      if (documents) {
        setDocs(documents);
      }
    };

    getProjects();
  }, [supabase, setDocs]);

  return (
    <>
      {folder && folder.title && (
        <AccordionItem className="border-b border-zinc-800" value={slugify(folder.title)}>
          <AccordionTrigger className="text-left">{folder?.title}</AccordionTrigger>
          <AccordionContent >
            <ul className="ml-2 pl-2 border-l border-zinc-800">
              {docs.map((doc) => (
                <DocumentListItem key={doc.id} id={doc.id} title={doc.title} />
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      )}
    </>
  );
}
type DocProps = { id: string; title: string };

function DocumentListItem({ id, title }: DocProps) {
  const params = useParams();
  return (
    <li
      className={`rounded-lg my-1 p-1 ${
        params.docId == id ? " bg-white bg-opacity-10 pointer-events-none" : ""
      }`}
    >
      <Link href={`/documents/${id}`}>
        <div className="flex space-x-1">
          {/* <div className="w-4 mr-1 hidden">
            <MinusIcon />
          </div> */}
          <h3 className="">{title} </h3>
        </div>
      </Link>
      <div></div>
    </li>
  );
}
export default DocumentFolder;
