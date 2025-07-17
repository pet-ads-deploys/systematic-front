import { flexconteiner } from "../styles/Navitemstyles";
import { IoLogOutOutline } from "react-icons/io5";
import { Flex, Icon, Menu, MenuButton, Text } from "@chakra-ui/react";
import useLogout from "../../../../hooks/auth/useLogout";
import { useNavigate } from "react-router-dom";

interface ILogoutButtonProps {
  navSize: string;
}

export default function LogoutButton({
  navSize,
}: ILogoutButtonProps): JSX.Element {
  const isSmallSize = navSize === "small";
  const logout = useLogout();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/");
  };

  return (
    <Flex
      sx={flexconteiner}
      align={isSmallSize ? "center" : "flex-start"}
      onClick={handleClick}
    >
      <Menu placement="right">
        <MenuButton />
        <Flex
          justifyContent={isSmallSize ? "center" : "none"}
          pl={isSmallSize ? "none" : "20px"}
          w={"100%"}
          h={isSmallSize ? "75px" : "3.5em"}
          alignItems="center"
          gap={1.5}
          bg={"#263C56"}
        >
          <Icon
            color={"#C9D9E5"}
            boxSize={isSmallSize ? "1.8em" : "1.1em"}
            as={IoLogOutOutline}
          />
          <Text display={isSmallSize ? "none" : "flex"} textColor={"#C9D9E5"}>
            Logout
          </Text>
        </Flex>
      </Menu>
    </Flex>
  );
}
