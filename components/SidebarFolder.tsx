"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
// export const dynamic = "auto";

type Props = { id: String };
export default function SidebarFolder({ id }: Props) {
  const [folder, setFolder] = useState<any>({});
  const [projects, setProjects] = useState<any[]>([]);
  const [folderIsOpen, setFolderIsOpen] = useState<Boolean>(true);
  const supabase = createClientComponentClient();
  const router = useRouter();

  // get our folder
  useEffect(() => {
    const getFolder = async () => {
      const { data: folder, error } = await supabase
        .from("project_folders")
        .select("*")
        .eq("id", id)
        .single();

      console.log("error", error);
      if (folder) {
        setFolder(folder);
      }
    };

    getFolder();
  }, [supabase, setFolder]);

  // get projects from our folder
  useEffect(() => {
    const getProjects = async () => {
      const { data: projects, error } = await supabase
        .from("projects")
        .select("*")
        .eq("folder", id);

      console.log("error", error);
      if (projects) {
        setProjects(projects);
      }
    };

    getProjects();
  }, [supabase, setProjects]);
  return (
    <article>
      <div
        className="flex space-x-2 justify-between"
        onClick={() => setFolderIsOpen(!folderIsOpen)}
      >
        <h3>{folder?.title}</h3>
        <div className={`${folderIsOpen ? '' : 'rotate-180'} block transform transititon duration-300`}>
          <ChevronDown />
        </div>
      </div>

      {folderIsOpen && projects && projects.length > 0 && (
        <ul className="list-disc pl-4 mb-4">
          {projects.map((project, i) => (
            <li key={i}>
              <Link href={`/projects/${project.id}`}>{project.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

//   const { data: folder } = await supabase
// .from("project_folders")
// .select("*")
// .eq("id", id)
// .single();

//   if (!folder) {
//     return null;
//   }

//   const { data: projects } = await supabase
//     .from("projects")
//     .select("*")
//     .eq("folder", id);
