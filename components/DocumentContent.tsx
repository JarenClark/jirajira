import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
type Props = { docId: string };

function DocumentContent({ docId }: Props) {
  return (
    <>
      <Card>
        <CardHeader>
          {/* <CardTitle>Chat</CardTitle> */}
          <CardDescription>Content</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}

export default DocumentContent;
