import SidebarProjects from "./SidebarProjects";
import { Home, WorkflowIcon } from "lucide-react";
import Link from "next/link";
export const dynamic = "auto";

type Props = { children?: React.ReactNode };
export default async function Sidebar({ children }: Props) {
  return (
    <div className="p-4 lg:p-8 bg-white bg-opacity-5 rounded-xl m-2">
      {/* {children} */}
      <ul className="space-y-3">
        <li className="block p-1 hover:bg-[white/5] bg-opacity-5 rounded-md">
          <Link href={"/"}>
            <span className="flex space-x-2 items-center ">
              <Home /> <span>Home</span>
            </span>
          </Link>
        </li>
        <li className="flex space-x-2">
          <WorkflowIcon /> <span>My Work</span>
        </li>
      </ul>
      <SidebarProjects />
    </div>
  );
}
