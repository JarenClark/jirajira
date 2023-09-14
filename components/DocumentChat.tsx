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
import UserAvatar from "./UserAvatar";
type Props = {
  serverChats:
    | { id: string; message: string; user: string; created_at: Date | string }[]
    | null;
  currentUser: string | undefined | null;
};

function DocumentChat({ currentUser, serverChats }: Props) {
  const supabase = createClientComponentClient();
  const params = useParams();
  const [chats, setChats] = useState<any[]>(serverChats ? serverChats : []);

  // our initial chats if server prop is empty array
  useEffect(() => {
    const getChats = async () => {
      if (chats.length != 0) {
        return null;
      }
      // console.log(`getting chats`);
      let { data: comments, error } = await supabase
        .from("_drive_comments")
        .select("id,message, user, created_at ")
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

  // show avatar if end of chats or if current index sender does not equal next index sender
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
        <CardDescription>Chat</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full border border-zinc-700 rounded-xl px-4">
          <ul className="space-y-2 py-4">
            {chats
              .sort((a, b) =>
                new Date(a.created_at) > new Date(b.created_at) ? 1 : -1
              )
              .map((chat, i) => (
                <ChatMessage
                  currentUser={currentUser}
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
  currentUser: string | undefined | null;
  showAvatar: boolean;
  chat: {
    message: string;
    user: string;
  };
};
function ChatMessage({ currentUser, chat, showAvatar }: ChatProps) {
  let classes = "w-48 rounded-t-lg p-2 text-sm ";
  if (currentUser == chat.user) {
    classes += " bg-blue-600 text-white ";
    if (showAvatar) {
      classes += " rounded-t-lg rounded-bl-lg ";
    } else {
      classes += " rounded-lg ";
    }
  } else {
    classes += "  bg-gray-600 text-gray-200 ";
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
          currentUser == chat.user ? "flex-row-reverse" : ""
        } flex items-end space-x-3 ${showAvatar && "mb-8"}`}
      >
        {showAvatar ? (
          <div className="relative">
            <UserAvatar userId={chat.user} />
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
