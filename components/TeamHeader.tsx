import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import H1 from "./ui/h1";
import TeamJoinButton from "./TeamJoinButton";
type Props = {
  teamId: string;
};
export default async function TeamHeader({ teamId }: Props) {
  const supabase = createServerComponentClient({ cookies });
  const { data: team } = await supabase
    .from("_drive_teams")
    .select("id,title")
    .eq("id", teamId)
    .single();

  if (!team) {
    return null;
  }
  return (
    <div className="flex justify-between items-center min-h-[10vh]">
      <H1 text={team.title} />
      <TeamJoinButton teamId={teamId} />
    </div>
  );
}
