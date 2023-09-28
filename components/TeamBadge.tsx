import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Badge } from "@/components/ui/badge";
type Props = {
  teamId: string;
};

export default async function TeamBadge({ teamId }: Props) {
  const supabase = createServerComponentClient({ cookies });
  const { data: team } = await supabase
    .from("_drive_teams")
    .select("id,title")
    .eq("id", teamId)
    .single();

  if (!team) {
    return null;
  }
  return <Badge>{team.title}</Badge>;
}
