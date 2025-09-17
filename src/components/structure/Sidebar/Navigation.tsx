// External library
import { Box, Flex } from "@chakra-ui/react";

// Components
import NavItem from "./subComponents/NavItem";
import LogoutButton from "./buttons/LogoutButton";
import AccordionComponent from "./subComponents/Accordion/AccordionComponent";

// Styles
import Styles from "./Sidebar.module.css";

// Types
interface Props {
  type: string;
}

const Navigation = ({ type }: Props) => {
  return type == "Default" ? (
    <Flex direction="column" justifyContent="space-between" height="100%">
      <Box className={Styles.navDiv}>
        <NavItem
          to="/review/planning/protocol/general-definition"
          text="New Review"
        />
        <NavItem to="/my-reviews" text="My Reviews" />
        <NavItem to="/profile" text="Profile" />
        <LogoutButton />
      </Box>
    </Flex>
  ) : (
    <Box className={Styles.accordionNavDiv}>
      <AccordionComponent />
      <Box mt="2.6vw">
        <NavItem to="/my-reviews" text="My Reviews" />
        <NavItem to="/profile" text="Profile" />
        <LogoutButton />
      </Box>
    </Box>
  );
};

export default Navigation;
