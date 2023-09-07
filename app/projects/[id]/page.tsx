import React from "react";
import { useRouter } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import TaskGroup from "@/components/TaskGroup";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
type Props = {};

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerComponentClient({ cookies });

  // project overview
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id)
    .single();

  // task groups
  const { data: groups } = await supabase
    .from("task_groups")
    .select("*")
    .eq("project", params.id);

  let count = 0;
  const colors = ["#00c875", "#579bfc", "#ff642e", "#ffcb00"];
  function cycle() {
    console.log('CYCLE')
    count++;
    if (count == colors.length) {
      count = 0;
    }
  }
  return (
    <div className="p-4 w-max bg-white m-2 bg-opacity-5">
      <div className="rounded-lg m-2 px-2 py-2">
        <h1 className="text-3xl text-white">{project.title}</h1>
      </div>

      <ScrollArea className="h-[60vh]">
        <div>
          {/* <pre>{JSON.stringify(project, null, 4)}</pre> */}
          {groups && groups.length > 0 && (
            <>
              {groups.map((group, i) => (
                <>
                  <TaskGroup color={colors[count]} group={group} key={i} />
                  {cycle()}
                </>
              ))}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
