import { Icon } from "@chakra-ui/react";
import { FaRegCircle } from "react-icons/fa";
import { useIconColor } from "../../legacy/hooks/execution/useIconColor";

interface ColoredIconProps {
  frequency: number;
}

export default function ColoredIcon({ frequency }: ColoredIconProps) {
  const iconColor = useIconColor({ frequency });

  return <Icon as={FaRegCircle} color={iconColor} bgColor={iconColor} borderRadius={360} />;
}
