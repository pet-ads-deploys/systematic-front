import { useContext } from "react";
import { flexconteiner } from "../styles/Navitemstyles";
import { useLocation } from "react-router-dom";

import { Flex, Icon, Menu, MenuButton, Text } from "@chakra-ui/react";
import AppContext from "../../../../context/AppContext";

interface INavItemProps {
  navSize: string;
  icon?: React.ElementType;
  title: string;
  submenu: boolean;
}

export default function NavItem({
  navSize,
  icon,
  title,
}: INavItemProps): JSX.Element {
  const context = useContext(AppContext);
  const location = useLocation();

  if (!context) {
    return <>Problema com useContext em NavItem.tsx</>;
  }

  const { button, setButton } = context;

  const isSmallSize = navSize === "small";
  const isSelected =
    button === title || location.pathname.includes(title.toLowerCase());

  const handleClick = () => {
    console.log("last button: " + button);
    setButton(title);
  };

  return (
    <Flex sx={flexconteiner} align={isSmallSize ? "center" : "flex-start"}>
      <Menu placement="right">
        <MenuButton onClick={handleClick} />

        <Flex
          justifyContent={isSmallSize ? "center" : "none"}
          pl={isSmallSize ? "none" : "20px"}
          w={"250px"}
          h={isSmallSize ? "75px" : "3.5em"}
          alignItems="center"
          gap={1.5}
          //borderRadius={"20px"}
          bg={isSelected ? "#C9D9E5" : "#263C56"}
        >
          <Icon
            color={isSelected ? "#263C56" : "#C9D9E5"}
            boxSize={isSmallSize ? "1.8em" : "1.1em"}
            as={icon}
          />
          <Text
            display={isSmallSize ? "none" : "flex"}
            textColor={isSelected ? "#263C56" : "#C9D9E5"}
          >
            {title}
          </Text>
        </Flex>
      </Menu>
    </Flex>
  );
}
