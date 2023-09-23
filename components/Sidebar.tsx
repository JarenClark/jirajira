import SidebarProjects from "./SidebarProjects";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import DocumentFolderListing from "./DocumentFolderListing";
import {
  Home,
  WorkflowIcon,
  BriefcaseIcon,
  FilesIcon,
  UsersIcon,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";
import SupabaseLogo from "@/components/SupabaseLogo";
import NextJsLogo from "@/components/NextJsLogo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";

export const dynamic = "auto";

type Props = { children?: React.ReactNode };
export default async function Sidebar({ children }: Props) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return null;
  }

  // sidebar items
  const items = [
    { link: "/", title: "Home", icon: <HomeIcon />, children: null },
    { link: "/teams/abc123", title: "Teams", icon: <UsersIcon />, children: null },
    {
      link: "/",
      title: "Resources",
      icon: <FilesIcon />,
      children: <DocumentFolderListing />,
    },
  ];

  return (
    <aside
      id="sidebar"
      className="fixd left-0 top-0 z-40 h-[90vh] w-64 transition-transform flex flex-col justify-between"
      aria-label="Sidebar"
    >
      {" "}
      <ScrollArea className="h-[90vh]  w-64 border-r  border-zinc-800">
        <div className="flex h-[90vh] flex-col justify-between px-3 py-4">
          {/* {children} */}
          <div className="p-4">
            <ul className=" flex flex-col space-y-3 w-full divide-y divide-zinc-800">
              {items.map((item, i) => (
                <SidebarLiItem
                  key={i}
                  link={item.link}
                  title={item.title}
                  icon={item.icon}
                  children={item.children}
                />
              ))}

              {/* <li className="block rounded-md py-3">
                <Link href={"/"}>
                  <span className="flex space-x-2 items-center ">
                    <Home className="w-6 h-6" /> <span>Home</span>
                  </span>
                </Link>
              </li>
              <li className="block rounded-md py-3">
                <Link href={"/"}>
                  <span className="flex space-x-2 items-center ">
                    <UsersIcon className="w-6 h-6" /> <span>Teams</span>
                  </span>
                </Link>
              </li>
              <li className="">
                <Link href={"/documents"}>
                  <span className="text-zinc-600">Resources</span>
                </Link>
                <DocumentFolderListing />
              </li> */}
            </ul>
          </div>
          <div className="p-4"></div>

          {/* <SidebarProjects /> */}
        </div>
      </ScrollArea>
    </aside>
  );
}

type LiProps = {
  link: string;
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};
function SidebarLiItem({ link, icon, title, children }: LiProps) {
  return (
    <li className="block rounded-md py-4">
      <Link href={link}>
        <span className="flex space-x-2 items-center ">
          {icon ? icon : null}
          <span className={children ? 'text-zinc-600': ''}>{title}</span>
        </span>
      </Link>
      {children ? children : null}
    </li>
  );
}
