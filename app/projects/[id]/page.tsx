import React from "react";
import { useRouter } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
type Props = {};

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerComponentClient({ cookies });

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id)
    .single();

  return (
    <div className="p-4">
      <div className="rounded-lg m-2 p-8">
        <h1 className="text-2xl">{project.title}</h1>
      </div>
      <pre>{JSON.stringify(project, null, 4)}</pre>
    </div>
  );
}
