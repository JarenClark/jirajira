"use client";
import React, { Suspense, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

type Props = {
  teamId: string;
};

export default function TeamBadge({ teamId }: Props) {
  const [team, setTeam] = useState<any>(null);

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
        // setTimeout(() => {
          setTeam(team);
        // }, 3000);
      }
    };

    getTeam();
  }, [supabase]);
  if (!team) return <Skeleton className="w-20 h-4 rounded-full" />;
  return (
    <Link href={`/teams/${teamId}`}>
      <Badge>{team.title}</Badge>
    </Link>
  );
}
