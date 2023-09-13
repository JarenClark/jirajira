"use client";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { Label } from "@/components/ui/label";

function DocumentCollaborators() {
  const [collaborators, setCollaborators] = useState<any[]>([]);
  const supabase = createClientComponentClient();
  const params = useParams();
  useEffect(() => {
    // get collaborators here
    const getCollaborators = async () => {
      const { data: people, error } = await supabase
        .from("_drive_collaborators")
        .select("id, online, user(first_name,last_name)")
        .eq("document", params.docId);

      console.log("error", error);
      if (people) {
        setCollaborators(people);
      }
    };
    getCollaborators();
  }, [supabase]);

  return (
    <>
      <div className="my-4">
        <Label>Collaborators</Label>
        <ul className="flex text-gray-400">
          {collaborators.map((person) => (
            <li key={person.id} className="relative group">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>
                  {person.user.first_name.slice(0, 1)}
                  {person.user.last_name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden group-hover:block absolute top-full mt-2 left-0 text-gray-400 text-xs whitespace-nowrap ">
                {person.user.first_name} {person.user.last_name.slice(0, 1)}.
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default DocumentCollaborators;
