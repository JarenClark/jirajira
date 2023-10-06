"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
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
import DocumentChatForm from "@/components/document/DocumentChatForm";
import UserAvatar from "@/components/UserAvatar";
import UserName from "@/components/UserName";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
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

  // show username if end of chats or if current index sender does not equal next index sender
  const name = (idx: number): boolean => {
    // if its you
    // if (chats[idx].user == currentUser) {
    //   return false;
    // }
    // if its the first
    if (idx == 0) {
      return true;
    }
    // if its not the first but it is a new person speaking
    if (chats[idx].user != chats[idx - 1].user) {
      return true;
    }
    // default do not show
    return false;
  };

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
    <Card className="">
      <CardHeader>
        <CardDescription>Comments</CardDescription>
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
                  showName={name(i)}
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
  showName: boolean;
  chat: {
    message: string;
    user: string;
  };
};
function ChatMessage({ currentUser, chat, showAvatar, showName }: ChatProps) {
  let classes = "w-48 mr-4 rounded-lg p-2 text-sm";
  if (currentUser == chat.user) {
    classes += " bg-blue-700 text-gray-200 mr-4";
    // if (showName) {
    //   classes += " rounded-t-lg rounded-bl-lg ";
    // } else {
    //   classes += " rounded-lg ";
    // }
  } else {
    classes += "  bg-gray-800 text-gray-200 ";
    // if (showName) {
    //   classes += " rounded-t-lg rounded-br-lg ";
    // } else {
    //   classes += " rounded-lg ";
    // }
  }
  return (
    <li className="">
      <div
        className={`${
          currentUser == chat.user ? "flex-row-reverse " : ""
        } flex items-end space-x-3 `}
      >
        <div>
          {showName && (
            <div className="px-2">
              <Label>
                <UserName userId={chat.user} />
              </Label>
            </div>
          )}
          <div className={classes}>{chat.message}</div>
        </div>
      </div>
    </li>
  );
}
export default DocumentChat;
