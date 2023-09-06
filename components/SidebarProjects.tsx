"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import SidebarFolder from "./SidebarFolder";

// export const dynamic = "auto";

type Props = { children?: React.ReactNode };
export default function SidebarProjects({ children }: Props) {
  const [folders, setFolders] = useState<any[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getFolders = async () => {
      const { data: folders, error } = await supabase
        .from("project_folders")
        .select("id");

      console.log("error", error);
      if (folders) {
        setFolders(folders);
      }
    };

    getFolders();
  }, [supabase, setFolders]);
  return (
    <div className="mt-8">
      <ul>
        {folders?.map((folder, i) => (
          <li key={i}>
            <SidebarFolder id={folder.id}></SidebarFolder>
          </li>
        ))}
      </ul>
    </div>
  );
}
