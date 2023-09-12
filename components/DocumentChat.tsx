"use client";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import DocumentChatForm from "@/components/DocumentChatForm";
type Props = {};

function DocumentChat({}: Props) {
  const supabase = createClientComponentClient();
  const params = useParams();
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    const getChats = async () => {
      let { data: comments, error } = await supabase
        .from("_drive_comments")
        .select("*")
        .eq("doc", params.docId);
      if (comments) {
        setChats(comments);
      }
    };
    getChats();
  }, [supabase]);

  return (
    <Card>
      <CardHeader>
        {/* <CardTitle>Chat</CardTitle> */}
        <CardDescription>Chat</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 w-72">
          <ul>
            {chats.map((chat) => (
              <li key={chat.id}>
                <div className="bg-black w-48 text-white rounded-lg p-2 text-sm">
                  {chat.message}
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <DocumentChatForm />
      </CardFooter>
    </Card>
  );
}

export default DocumentChat;
