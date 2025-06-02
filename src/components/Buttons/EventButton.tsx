import { AddIcon } from "@chakra-ui/icons";
import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactElement } from "react";

interface IEventButtonProps extends ButtonProps {
  event?: () => void;
  text?: string;
  icon?: ReactElement;
  variant?: "default" | "dark";
}

const variants = {
  default: {
    bgColor: "#2E4B6C",
    color: "#EBF0F3",
    hoverBgColor: "#C9D9E5",
    hoverColor: "#2E4B6C",
    borderRadius: "50px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  dark: {
    bgColor: "#FDF0D5",
    color: "#301E1A",
    hoverBgColor: "#301E1A",
    hoverColor: "#FDF0D5",
    borderRadius: "50px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default function EventButton({
  event,
  text,
  icon = <AddIcon />,
  variant = "default",
  ...buttonProps
}: IEventButtonProps) {
  const handleClick = () => {
    if (event) event();
  };

  const { bgColor, color, borderRadius, boxShadow } =
    variants[variant];

  return (
    <Button
      bgColor={bgColor}
      color={color}
      _hover={{
        bgColor: "#263C56",
        color: "#C9D9E5",
        boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
      }}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      onClick={event ? handleClick : undefined}
      {...buttonProps}
      lineHeight="1"
      transition="all 0.3s ease"
      outline="none"
      _focus={{
        boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
      }}
    >
      {icon}
      {/* {text} */}
    </Button>
  );
}
