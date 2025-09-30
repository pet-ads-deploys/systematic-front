import { Td ,Text,Tooltip} from '@chakra-ui/react';

type StudyCellProps = {
    text: string | string[];
    maxW?: string;
    type?:"number" |"string"
};

export const ReportTd = ({ text, maxW = "250px",type ="string"}: StudyCellProps) => {
  return (
   
    <Td maxW={maxW} isNumeric= {type=="number"}>
      <Tooltip label={text} hasArrow>
        <Text isTruncated>{text}</Text>
      </Tooltip>
    </Td>
  );
};
