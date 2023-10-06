import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import DocumentFolder from "./DocumentFolder";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default async function DocumentFolderListing() {
  const supabase = createServerComponentClient({ cookies });

  // our doc folders
  const { data: folders } = await supabase.from("_drive_folders").select("id");

  return (
    <div>
      {folders && folders.length > 0 ? (
        <Accordion type="multiple"  className="w-full">
          {folders?.map((folder) => (
            <DocumentFolder id={folder.id} key={folder.id} />
          ))}
        </Accordion>
      ) : null}
    </div>
  );
}
