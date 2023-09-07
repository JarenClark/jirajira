import SidebarProjects from "./SidebarProjects";
import { Home, WorkflowIcon, BriefcaseIcon } from "lucide-react";
import Link from "next/link";
export const dynamic = "auto";

type Props = { children?: React.ReactNode };
export default async function Sidebar({ children }: Props) {
  return (
    <div className="w-[256px] bg-white bg-opacity-5 rounded-xl m-2">
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
            <Link href={"/"}>
              <span className="flex space-x-2 items-center ">
                <BriefcaseIcon className="w-4 h-4" /> <span>My Work</span>
              </span>
            </Link>
          </li>
        </ul>
      </div>

      <SidebarProjects />
    </div>
  );
}
