import { useDisclosure, Tr, Td, Checkbox } from "@chakra-ui/react";
import StudiesModal from "./StudiesModal";
import { ModalProvider } from "../../../../../../../context/ModalContext";

import { useContext } from "react";
import ColoredIcon from "../../../../../../../../components/common/icons/ColoredIcon";

import { TableHeadersInterface } from "../../../../../../../types/ITableHeaders";
import { KeyWordHeaderInterface } from "../../../../../../../types/IKeyWordHeard";
import { KeywordInterface } from "../../../../../../../types/KeywordInterface";
import { StudyInterface } from "../../../../../../../../features/review/shared/types/IStudy";
import AppContext from "@features/shared/context/ApplicationContext";

interface IStudy<T, U> {
  rowData: U;
  rowIndex: number;
  isKeyWordTable: boolean;
  getColumnVisibility: (text: string) => boolean;
  headerData: T;
  title: string;
  status: "Accepted" | "Rejected" | "Unclassified" | "Duplicated";
  readingPriority: "Very high" | "High" | "Low" | "Very low";
  searchSession: "Scopus" | "Web of Science";
  score: number;
  isSelectionTable: boolean;
  isExtractionTable: boolean;
}

export default function TableRow<
  T extends TableHeadersInterface | KeyWordHeaderInterface,
  U extends StudyInterface | KeywordInterface
>({
  rowData,
  rowIndex,
  isKeyWordTable,
  isSelectionTable,
  isExtractionTable,
  getColumnVisibility,
  headerData,
}: IStudy<T, U>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useContext(AppContext);

  function handleClick(rowData: U) {
    if (isExtractionTable) {
      onOpen();
      context?.setExtractionStudy(rowData as StudyInterface);
      context?.setSortedExtractionStudyIndex(rowIndex);
    }
    if (isSelectionTable) {
      context?.setSelectionStudy(rowData as StudyInterface);
      context?.setSelectionStudyIndex(rowIndex);
    }
  }

  return (
    <>
      <Tr key={rowIndex}>
        {!isKeyWordTable && (
          <Td bgColor={"#9CB0C0"}>
            <Checkbox borderColor={"#2A4F6C"} />
          </Td>
        )}
        {isKeyWordTable && (
          <Td bgColor={"#9CB0C0"}>
            <ColoredIcon frequency={rowData[0 as keyof U] as number} />
          </Td>
        )}

        {Object.keys(headerData).map((key, keyIndex) => (
          <Td
            cursor={"pointer"}
            onClick={() => {
              handleClick(rowData);
            }}
            key={keyIndex}
            display={
              isKeyWordTable
                ? ""
                : getColumnVisibility(
                    (headerData[key as keyof T] as string).toLowerCase()
                  )
                ? "none"
                : ""
            }
            textAlign={"center"}
            bgColor={"#9CB0C0"}
          >
            {rowData[key as keyof U]?.toString()}
          </Td>
        ))}
      </Tr>

      {isExtractionTable &&
        (isOpen ? (
          <ModalProvider>
            <StudiesModal isOpen={isOpen} onClose={onClose} />
          </ModalProvider>
        ) : (
          <></>
        ))}
    </>
  );
}
