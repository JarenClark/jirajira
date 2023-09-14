"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Props = {
  userId: string;
};

function UserAvatar({ userId }: Props) {
  const supabase = createClientComponentClient();
  const [userProfile, setUserProfile] = useState<any>(null);
  useEffect(() => {
    const getUser = async () => {
      let { data: user, error } = await supabase
        .from("_drive_users")
        .select("*")
        .eq("id", userId)
        .single();
      if (user) {
        setUserProfile(user);
      }
    };
    getUser();
  }, [supabase]);

  if (!userProfile) {
    return null;
  }

  return (
    <>
      <Avatar>
        <AvatarImage src={userProfile.avatar_url} alt="@shadcn" />
        <AvatarFallback>
          {userProfile.first_name.slice(0,1)}
          {userProfile.last_name.slice(0,1)}
        </AvatarFallback>
      </Avatar>
    </>
  );
}

export default UserAvatar;
