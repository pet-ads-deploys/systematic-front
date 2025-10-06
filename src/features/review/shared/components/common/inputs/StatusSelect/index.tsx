import { FormControl, Menu, MenuButton, MenuList, MenuItem, Button, HStack, Text, Box, Divider, Portal } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState, ReactNode } from "react";
import { FaCheckCircle, FaCopy, FaQuestionCircle, FaRegCircle, FaTimes } from "react-icons/fa";
import type ArticleInterface from "@features/review/shared/types/ArticleInterface";

type StatusKey = "INCLUDED" | "DUPLICATED" | "EXCLUDED" | "UNCLASSIFIED";

interface StatusSelectProps {
  articles: ArticleInterface[];
  selectedValue: string | null;
  onSelect: (value: string | null) => void;
  page: "Selection" | "Extraction";
  placeholder?: string;
}

const colors = {
  background: "#EBF0F3",
  text: "#2E4B6C",
  hover: "rgb(144, 205, 244)",
  selected: "rgb(190, 227, 248)",
  clearFilters: "rgb(38, 60, 86)",
};

const iconConfig: Record<
  Lowercase<StatusKey>,
  { icon: ReactNode; bg: string }> = {
  included: { icon: <FaCheckCircle color="white" size="12px" />, bg: "green" },
  duplicated: { icon: <FaCopy color="white" size="12px" />, bg: "blue" },
  excluded: { icon: <FaTimes color="white" size="12px" />, bg: "red" },
  unclassified: {icon: <FaQuestionCircle color="white" size="12px" />, bg: "gold"}
};

const getIcon = (status: string) => {
  const cfg = iconConfig[status.toLowerCase() as Lowercase<StatusKey>];
  if (!cfg) return <FaRegCircle color="gray" />;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="20px"
      h="20px"
      borderRadius="50%"
      bg={cfg.bg}
    >
      {cfg.icon}
    </Box>
  );
};

export default function StatusSelect({
  articles,
  selectedValue,
  onSelect,
  page,
  placeholder = "Select status",
}: StatusSelectProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [menuWidth, setMenuWidth] = useState<number>(0);

  const counts: Record<StatusKey, number> = {
    INCLUDED: 0,
    DUPLICATED: 0,
    EXCLUDED: 0,
    UNCLASSIFIED: 0,
  };

  articles.forEach((a) => {
    const status =
      page === "Selection" ? a.selectionStatus : a.extractionStatus;
    if (status && counts[status as StatusKey] !== undefined) {
      counts[status as StatusKey] += 1;
    }
  });

  const options = [
    { value: "INCLUDED", label: `Included (${counts.INCLUDED})` },
    { value: "DUPLICATED", label: `Duplicated (${counts.DUPLICATED})` },
    { value: "EXCLUDED", label: `Excluded (${counts.EXCLUDED})` },
    { value: "UNCLASSIFIED", label: `Unclassified (${counts.UNCLASSIFIED})` },
  ];

  const selectedLabel = selectedValue
    ? options.find((o) => o.value === selectedValue)?.label
    : placeholder;

  useEffect(() => {
    const update = () => setMenuWidth(btnRef.current?.offsetWidth ?? 0);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [selectedLabel]);

  return (
    <FormControl w="20rem">
      <Menu isLazy>
        <MenuButton
          ref={btnRef}
          as={Button}
          bgColor={colors.background}
          color={colors.text}
          rightIcon={<ChevronDownIcon />}
          w="100%"
          textAlign="left"
          fontWeight="normal"
        >
          {selectedLabel}
        </MenuButton>
        <Portal>
          <MenuList
            minW="unset"
            w={menuWidth ? `${menuWidth}px` : "100%"}
            maxW={menuWidth ? `${menuWidth}px` : "100%"}
            zIndex={1400}
            p={0}
            boxShadow="none"
            overflow="hidden"
          >
            {options.map((opt) => {
              const isSelected = opt.value === selectedValue;
              return (
                <MenuItem
                  key={opt.value}
                  onClick={() => onSelect(opt.value)}
                  w="100%"
                  bg={isSelected ? colors.selected : "transparent"}
                  _hover={{ bg: colors.hover }}
                >
                  <HStack w="100%" spacing={3}>
                    {getIcon(opt.value)}
                    <Text flex="1" textAlign="left" color={colors.text}>
                      {opt.label.replace(/\s*\(\d+\)/, "")}
                    </Text>
                    <Box minW="2rem" textAlign="right" color={colors.text}>
                      {opt.label.match(/\((\d+)\)/)?.[1]}
                    </Box>
                  </HStack>
                </MenuItem>
              );
            })}
            <Divider borderColor="gray.300" />
            <MenuItem onClick={() => onSelect(null)} w="100%">
              <Text
                flex={1}
                textAlign="center"
                fontWeight="semibold"
                color={colors.clearFilters}
              >
                Clear filters
              </Text>
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </FormControl>
  );
}
