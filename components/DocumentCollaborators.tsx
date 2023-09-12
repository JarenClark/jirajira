"use client";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
type Props = { id: string };

function DocumentCollaborators({ id }: Props) {
  const [collaborators, setCollaborators] = useState<any[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    // get collaborators here
    const getCollaborators = async () => {
      const { data: people, error } = await supabase
        .from("_drive_collaborators")
        .select("*")
        .eq("document", id)

      console.log("error", error);
      if (people) {
        setCollaborators(people);
      }
    };
    getCollaborators()
  }, [supabase]);

  return (
    <>
      <ul className="flex">
        {collaborators.map(person => <li key={person.id}>
            {person.online.toString()}
        </li>)}
      </ul>
    </>
  );
}

export default DocumentCollaborators;
