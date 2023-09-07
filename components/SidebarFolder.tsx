"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, FolderKanbanIcon } from "lucide-react";
import Link from "next/link";
// export const dynamic = "auto";

type Props = { id: String };
export default function SidebarFolder({ id }: Props) {
  const [folder, setFolder] = useState<any>({});
  const [projects, setProjects] = useState<any[]>([]);
  const [folderIsOpen, setFolderIsOpen] = useState<Boolean>(false);
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

      {projects && projects.length > 0 && (
        <ul className={`text-sm pl-4 mb-4 p-2 rounded-lg`}>
          {projects.map((project, i) => (
            <li key={i}>
              <Link href={`/projects/${project.id}`}>
                <span className="flex space-x-1 items-center">
                  <FolderKanbanIcon className="w-4 h-4" />

                  <h3>
                {project.title}</h3>
                </span>
              </Link>
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
