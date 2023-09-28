"use client";
import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
type Props = { docId: string };

function DocumentSubNav({ docId }: Props) {
  const currentPath = usePathname();
  const items = [
    { title: `View`, href: `/documents/${docId}` },
    { title: `Comments`, href: `/documents/${docId}/chat` },
    { title: `Edit`, href: `/documents/${docId}/edit` },
  ];
  return (
    <>
      <ul className=" p-1 rounded-md inline-flex mx-4 bg-slate-800 text-slate-400 text-sm mb-4">
        {items.map((item, i) => (
          <li
            key={i}
            className={`rounded-sm  ${
              currentPath == item.href
                ? `bg-slate-950 text-slate-50`
                : `bg-slate-800 text-slate-400`
            }`}
          >
            <Link href={item.href} legacyBehavior passHref>
              <span className="px-3 py-1.5 block cursor-pointer">
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default DocumentSubNav;
