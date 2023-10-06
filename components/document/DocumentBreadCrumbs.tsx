import React from "react";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
type Props = {
  title: string;
};

export default async function DocumentBreadCrumbs({  title }: Props) {

  return (
    <div className="px-4 mt-4 mb-2 flex items-center space-x-1 text-zinc-600">
      <Link href={"/documents"} className="hover:text-white">
        Documents
      </Link>
      <ChevronRight className="w-5 h-5" />
      <span>{title}</span>
    </div>
  );
}
