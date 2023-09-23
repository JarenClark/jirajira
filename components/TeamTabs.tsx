"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {};

function TeamTabs({}: Props) {
  return (
    <Tabs defaultValue="overview" className="space-y-4 bg-zinc-700">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        this is an overview
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        this is an analytics
      </TabsContent>
      <TabsContent value="reports" className="space-y-4">
        this is an reports
      </TabsContent>
      <TabsContent value="notifications" className="space-y-4">
        this is an notifications
      </TabsContent>
    </Tabs>
  );
}

export default TeamTabs;
