"use client";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
type Props = { teamId: string };

function TeamJoinButton({ teamId }: Props) {
  const { toast } = useToast();
  return (
    <Button
      onClick={() => {
        toast({
          title: "Welcome to the team",
          description: "Lorem ipsum Dolor sit amet",
        });
      }}
    >
      Request to Join
    </Button>
  );
}

export default TeamJoinButton;
