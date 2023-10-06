import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import H1 from "@/components/ui/h1";
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
    <div className="min-h-[10vh] flex justify-between items-center w-screen max-w-3xl">
      <H1 text={team.title} />
      <TeamJoinButton teamId={teamId} />
    </div>
  );
}
