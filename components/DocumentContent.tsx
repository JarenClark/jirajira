import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EditIcon } from "lucide-react";
type Props = { docId: string };

function DocumentContent({ docId }: Props) {
  return (
    <>
      <Card className="h-[80vh]">
        <CardHeader>
          {/* <CardTitle>Chat</CardTitle> */}
          <div className="flex justify-end">
            <EditIcon className="w-4 h-4 text-gray-500 hover:text-white" />
          </div>
          {/* <CardDescription>Content</CardDescription> */}
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh]">
            {[...Array(6)].map((item, i) => (
              <p key={i} className="text-gray-400 mb-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Incidunt at dolores quia deserunt architecto ad delectus
                veritatis rem neque molestias ex sint totam exercitationem ea
                consectetur animi aliquid quis vel voluptas dicta, asperiores
                cupiditate ut ipsam est. Perspiciatis fugit necessitatibus
                cupiditate quasi commodi magnam fuga quaerat assumenda, harum
                eveniet pariatur veniam reprehenderit aliquid recusandae sunt
                at? Repudiandae inventore ullam sapiente?
              </p>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}

export default DocumentContent;
