import { Link } from "react-router-dom";
import AccordionElement from "./AccordionItem";
import NavItem from "./NavItem";
import { Accordion } from "@chakra-ui/react";
import { IoLibrarySharp } from "react-icons/io5";
import LogoutButton from "./LogoutButton";

interface IAccordion {
  navSize: string;
  defaultOpen: number;
}

export default function AccordionNav({ navSize, defaultOpen }: IAccordion) {
  return (
    <>
      <Accordion defaultIndex={defaultOpen} >
        <AccordionElement
          navSize={navSize}
          title="Planning"
          names={["Protocol"]}
          basePath="/newReview"
          index={0}
          defaultOpen={defaultOpen}
        />
        <AccordionElement
          navSize={navSize}
          title="Execution"
          names={["KeyWords", "Insertion", "Identification", "Selection", "Extraction"]}
          basePath="/newReview"
          index={1}
          defaultOpen={defaultOpen}
        />
        <AccordionElement
          navSize={navSize}
          title="Summarization"
          names={["Graphics", "Visualization", "Finalization"]}
          basePath="/newReview"
          index={2}
          defaultOpen={defaultOpen}
        />
      </Accordion>

      <Link to="/user">
        {" "}
        <NavItem submenu={false} navSize={navSize} icon={IoLibrarySharp} title="My Reviews" />
      </Link>

      <LogoutButton navSize={navSize} />
    </>
  );
}
