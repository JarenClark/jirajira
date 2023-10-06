import React from "react";
import H1 from "@/components/ui/h1";
import TeamTabs from "@/components/team/TeamTabs";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamHeader from "@/components/team/TeamHeader";
import TeamJoinButton from "@/components/team/TeamJoinButton";
export default async function TeamsOverviewPage({
  params,
}: {
  params: { teamId: string };
}) {
  return (
    <div>
        <TeamTabs />
    </div>
  );
}
