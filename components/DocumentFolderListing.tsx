import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import DocumentFolder from "./DocumentFolder";

export default async function DocumentFolderListing() {
  const supabase = createServerComponentClient({ cookies });

  // our doc folders
  const { data: folders } = await supabase.from("_drive_folders").select("id");

  return (
    <div>
      {folders && folders.length > 0 ? (
        <ul className="px-4">
          {folders?.map((folder) => (
            <DocumentFolder id={folder.id} key={folder.id} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}
