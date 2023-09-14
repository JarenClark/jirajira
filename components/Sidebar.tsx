import SidebarProjects from "./SidebarProjects";
import DocumentFolderListing from "./DocumentFolderListing";
import { Home, WorkflowIcon, BriefcaseIcon, FilesIcon } from "lucide-react";
import Link from "next/link";
import SupabaseLogo from "@/components/SupabaseLogo";
import NextJsLogo from "@/components/NextJsLogo";
import { ScrollArea } from "./ui/scroll-area";
export const dynamic = "auto";

type Props = { children?: React.ReactNode };
export default async function Sidebar({ children }: Props) {
  return (
    <aside
      id="sidebar"
      className="fixed left-0 top-0 z-40 h-screen w-64 transition-transform"
      aria-label="Sidebar"
    >
      {" "}
      <ScrollArea className="h-screen w-64 border-r bg-slate-900 border-slate-700">
        <div className="flex h-full flex-col justify-between px-3 py-4">
          {/* {children} */}
          <div className="p-4">
            <ul className="space-y-3 w-full">
              <li className="block rounded-md">
                <Link href={"/"}>
                  <span className="flex space-x-2 items-center ">
                    <Home className="w-4 h-4" /> <span>Home</span>
                  </span>
                </Link>
              </li>
              <li className="flex space-x-2">
                <Link href={"/documents"}>
                  <span className="flex space-x-2 items-center ">
                    <FilesIcon className="w-4 h-4" /> <span>Documents</span>
                  </span>
                </Link>
              </li>
              {/* <li className="flex space-x-2">
                <Link href={"/"}>
                  <span className="flex space-x-2 items-center ">
                    <BriefcaseIcon className="w-4 h-4" /> <span>My Work</span>
                  </span>
                </Link>
              </li> */}
            </ul>
          </div>
          <DocumentFolderListing />
          {/* <SidebarProjects /> */}
        </div>
      </ScrollArea>
    </aside>
  );
}
