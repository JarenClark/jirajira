"use client";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Badge } from "@/components/ui/badge";
type Props = {
  teamId: string;
};

export default function TeamBadge({ teamId }: Props) {
  const [team, setTeam] = useState<any>({});

  const supabase = createClientComponentClient();

  useEffect(() => {
    const getTeam = async () => {
      const { data: team, error } = await supabase
        .from("_drive_teams")
        .select("*")
        .eq("id", teamId)
        .single();

      console.log("error", error);
      if (team) {
        setTeam(team);
      }
    };

    getTeam();
  }, [supabase]);

  if (!team) return null;
  return <Badge>{team.title}</Badge>;
}
