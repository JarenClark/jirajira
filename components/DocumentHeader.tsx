import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import H1 from "@/components/ui/h1";
import { BookmarkIcon } from "lucide-react";
type Props = { title: string; id: string };

function DocumentHeader({ title, id }: Props) {
  return (
    <div className="flex justify-between items-center min-h-[10vh]">
      <H1 text={title} />
      <BookmarkIcon />
    </div>
  );
}

export default DocumentHeader;
