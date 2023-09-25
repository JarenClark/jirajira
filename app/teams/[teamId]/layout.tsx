import TeamHeader from "@/components/TeamHeader";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: {
    teamId: string;
  };
};

export default function TeamPageLayout({ children, params }: Props) {
  return (
    <>
      <TeamHeader teamId={params.teamId} />
      <div>{children}</div>
    </>
  );
}
