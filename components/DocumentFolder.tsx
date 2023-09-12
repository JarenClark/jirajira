"use client";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { ChevronDown, FolderKanbanIcon, MinusIcon } from "lucide-react";
import Link from "next/link";
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
    <li>
      <div
        className="flex space-x-1 items-center"
        onClick={() => setFolderIsOpen(!folderIsOpen)}
      >
        <div
          className={`${
            folderIsOpen ? "" : "-rotate-90"
          } block transform transititon duration-300`}
        >
          <ChevronDown className="w-4 h-4" />
        </div>
        <h3>{folder?.title}</h3>
      </div>
      <ul className="px-4">
        {docs.map((doc) => (
          <DocumentListItem key={doc.id} id={doc.id} title={doc.title} />
        ))}
      </ul>
    </li>
  );
}
type DocProps = { id: string; title: string };

function DocumentListItem({ id, title }: DocProps) {
  const params = useParams();
  return (
    <li className={`rounded-lg my-1 p-1 ${params.docId == id ? " bg-white bg-opacity-5 pointer-events-none" : ""}`}>
      <Link href={`/documents/${id}`}>
        <div className="flex space-x-1">
          <div className="w-4 mr-1 hidden">
            <MinusIcon />
          </div>
          <h3 className="text-sm">{title} </h3>
        </div>
      </Link>
      <div></div>
    </li>
  );
}
export default DocumentFolder;
