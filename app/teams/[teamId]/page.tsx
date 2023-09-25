import React from "react";
import H1 from "@/components/ui/h1";
import TeamTabs from "@/components/TeamTabs";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamHeader from "@/components/TeamHeader";
import TeamJoinButton from "@/components/TeamJoinButton";
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
