import { Td ,Text,Tooltip} from '@chakra-ui/react';

type StudyCellProps = {
    text: string | string[];
    maxW?: string;
};

export const StudyTd = ({ text, maxW = "250px" }: StudyCellProps) => {
  return (
    <Td maxW={maxW}>
      <Tooltip label={text} hasArrow>
        <Text isTruncated>{text}</Text>
      </Tooltip>
    </Td>
  );
};
