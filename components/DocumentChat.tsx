"use client";
import React, { useEffect, useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import DocumentChatForm from "@/components/DocumentChatForm";
type Props = {
  serverChats: any;
};

function DocumentChat({ serverChats }: Props) {
  const supabase = createClientComponentClient();
  const params = useParams();
  const [chats, setChats] = useState<any[]>(serverChats ? serverChats : []);
  const [userId, setUserId] = useState<any>(null);

  // get our user (should extract this into a hook)
  useEffect(() => {
    const getUser = async () => {
      const authUser = await supabase.auth.getUser();
      console.log(`authUser is `, authUser);
      if (authUser.data.user) {
        setUserId(authUser.data.user.id);
      }
    };
    getUser();
  }, [supabase]);

  // our initial chats (maybe fetch on server)
  useEffect(() => {
    const getChats = async () => {
      console.log(`getting chats`);
      let { data: comments, error } = await supabase
        .from("_drive_comments")
        .select("id,message, user ")
        .eq("doc", params.docId);
      if (comments) {
        setChats(comments);
      }
    };
    getChats();
  }, [supabase]);

  // realtime
  useEffect(() => {
    const channel = supabase
      .channel("realtime chats")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "_drive_comments",
        },
        (payload) => {
          console.log(`payload:`, { payload });
          setChats((old) => [...old, payload.new]);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // show avatar if end of chats or if next chat sender != current chat sender
  const avi = (idx: number): boolean => {
    if (idx + 1 == chats.length) {
      return true;
    }
    if (chats[idx].user != chats[idx + 1].user) {
      return true;
    }
    return false;
  };
  return (
    <Card>
      <CardHeader>
        {/* <CardTitle>Chat</CardTitle> */}
        <CardDescription>Chat</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full border border-zinc-700 rounded-xl px-4">
          <ul className="space-y-2">
            {chats.map((chat, i) => (
              <ChatMessage
                currentUserId={userId}
                key={chat.id}
                chat={chat}
                showAvatar={avi(i)}
              />
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

type ChatProps = {
  currentUserId: string | null;
  showAvatar: boolean;
  chat: {
    message: string;
    user: string;
  };
};
function ChatMessage({ currentUserId, chat, showAvatar }: ChatProps) {
  let classes = "w-48 rounded-t-lg p-2 text-sm ";
  if (currentUserId == chat.user) {
    classes += " bg-blue-600 text-white ";
    if (showAvatar) {
      classes += " rounded-t-lg rounded-bl-lg ";
    } else {
      classes += " rounded-lg ";
    }
  } else {
    classes += "  bg-gray-600 text-gray-400 ";
    if (showAvatar) {
      classes += " rounded-t-lg rounded-br-lg ";
    } else {
      classes += " rounded-lg ";
    }
  }
  return (
    <li className="ref={latest}">
      <div
        className={`${
          currentUserId == chat.user ? "flex-row-reverse" : ""
        } flex items-end space-x-3 ${showAvatar && "mb-8"}`}
      >
        {showAvatar ? (
          <div className="relative">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {/* {typeof chat.user != "string" && (
              <div className="absolute top-full mt-2 left-0 text-gray-400 text-xs whitespace-nowrap ">
                {chat.user.first_name} {chat.user.last_name.slice(0, 1)}.
              </div>
            )} */}
          </div>
        ) : (
          <div className="w-10 h-10" />
        )}
        <div className={classes}>{chat.message}</div>
      </div>
    </li>
  );
}
export default DocumentChat;
