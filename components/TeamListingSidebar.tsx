import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Home,
  WorkflowIcon,
  BriefcaseIcon,
  UserCircleIcon,
  FilesIcon,
  UsersIcon,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";
type Props = { teams: any[] };

function TeamListingSidebar({ teams }: Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default TeamListingSidebar;
