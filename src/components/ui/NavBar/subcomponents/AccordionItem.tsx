import NavItem from "./NavItem";
import { useContext } from "react";
import { Link } from "react-router-dom";

import {
  AccordionButton,
  Icon,
  AccordionIcon,
  Box,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { iconbox } from "../styles/AccordionItenStyles";
import AppContext from "../../../../context/AppContext";

interface IAccordionElementProps {
  navSize: string;
  icon?: React.ElementType;
  title: string;
  names: string[];
  basePath: string;
  index: number;
  defaultOpen: number;
}

export default function AccordionElement({
  navSize,
  icon,
  title,
  names,
  basePath,
  index,
  defaultOpen,
}: IAccordionElementProps) {
  const isSmallSize = navSize === "small";

  const shouldRenderIcon = isSmallSize || (
    <Box sx={iconbox}>
      <Icon as={icon} /> {title}
    </Box>
  );

  const context = useContext(AppContext);
  if (!context) {
    return <>Problema com useContext em NavItem.tsx</>;
  }
  const isOpen = index === defaultOpen;

  const id = localStorage.getItem("systematicReviewId");

  return (
    <AccordionItem
      alignContent={isSmallSize ? "center" : "flex-start"}
      w={"100%"}
    >
      <AccordionButton
        bg={isOpen ? "#C9D9E5" : "#263C56"}
        color={isOpen ? "#263C56" : "#C9D9E5"}
      >
        {isSmallSize && <Icon as={icon} />}
        {shouldRenderIcon}
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel padding={"0px"}>
        {names.map((name) =>
          name == "Protocol" ? (
            <Link to={`${basePath}/${name.toLowerCase()}/${id}`} key={name}>
              <NavItem title={name} navSize={navSize} submenu={true} />
            </Link>
          ) : (
            <Link to={`${basePath}/${name.toLowerCase()}`} key={name}>
              <NavItem title={name} navSize={navSize} submenu={true} />
            </Link>
          )
        )}
      </AccordionPanel>
    </AccordionItem>
  );
}
