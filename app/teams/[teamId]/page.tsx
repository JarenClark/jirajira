import React from "react";
import H1 from "@/components/ui/h1";
import TeamTabs from "@/components/TeamTabs";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function TeamsOverviewPage({
  params,
}: {
  params: { teamId: string };
}) {
  return (
    <div className=" py-8">
      <H1 text={params.teamId}></H1>
      <div>
<TeamTabs />
      </div>
    </div>
  );
}
