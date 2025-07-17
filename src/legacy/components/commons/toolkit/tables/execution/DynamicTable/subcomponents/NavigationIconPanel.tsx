import { Flex } from "@chakra-ui/react";
import StudyDataButton from "../../../../buttons/execution/article/StudyDataButton";
import SelectionDataButton from "../../../../buttons/execution/article/SelectionStudiesButton";
import DataExtractionFormButton from "../../../../buttons/execution/article/DataExtractionFormButton";
import SimilarStudiesButton from "../../../../buttons/execution/article/SimilarStudiesButton";
import QualityFormButton from "../../../../buttons/execution/article/QualityFormButton";
import ReferencesButton from "../../../../buttons/execution/article/ReferencesButton";

export default function NavegationIconsPanel() {
  return (
    <>
      <Flex w="100%" h="10" gap="5">
        <StudyDataButton />
        <SelectionDataButton />
        <DataExtractionFormButton />
        <SimilarStudiesButton />
        <QualityFormButton />
        <ReferencesButton />
      </Flex>
    </>
  );
}
