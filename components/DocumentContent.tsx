import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EditIcon } from "lucide-react";
type Props = { docId: string };

export default async function DocumentContent({ docId }: Props) {
  const supabase = createServerComponentClient({ cookies });

  const { data: document } = await supabase
    .from("_drive_documents")
    .select("title, folder (id, title)")
    .eq("id", docId)
    .single();
  return (
    <>
      <Card className="h-[80vh]">
        <CardContent>
          {/* <ScrollArea className="h-[60vh]"> */}
          {[...Array(6)].map((item, i) => (
            <p key={i} className="text-gray-400 mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              at dolores quia deserunt architecto ad delectus veritatis rem
              neque molestias ex sint totam exercitationem ea consectetur animi
              aliquid quis vel voluptas dicta, asperiores cupiditate ut ipsam
              est. Perspiciatis fugit necessitatibus cupiditate quasi commodi
              magnam fuga quaerat assumenda, harum eveniet pariatur veniam
              reprehenderit aliquid recusandae sunt at? Repudiandae inventore
              ullam sapiente?
            </p>
          ))}
          {/* </ScrollArea> */}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}
