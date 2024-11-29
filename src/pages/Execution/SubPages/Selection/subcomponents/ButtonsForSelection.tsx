import { Button, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { boxconteiner, buttonconteiner, conteiner } from "../../../styles/BtnSelectionStyles";
import ComboBox from "../../../../../components/Inputs/ComboBox";
import { FaPen } from "react-icons/fa6";
import { useContext } from "react";
import AppContext from "../../../../../components/Context/AppContext";
import StudySelectionContext from "../../../../../components/Context/StudiesSelectionContext";
import { StudyInterface } from "../../../../../../public/interfaces/IStudy";
import StudyEdtionModal from "../../../../../components/Modals/StudyModal/StudyEdtionModal";
import useFetchInclusionCriteria from "../../../../../hooks/fetch/useFetchInclusionCriteria";
import useFetchExclusionCriteria from "../../../../../hooks/fetch/useFetchExclusionCriterias";

export default function ButtonsForSelection() {
  const context = useContext(AppContext);
  const selectionContext = useContext(StudySelectionContext);
  
  const isIncluded = selectionContext?.isIncluded;
  const isExcluded = selectionContext?.isExcluded;
  const sortedStudies = (context?.selectionStudies as StudyInterface[]);
  const index = (context?.selectionStudyIndex as number);
  const criteriosExclusao: string[] = useFetchExclusionCriteria();
  const criteriosInclusao: string[] = useFetchInclusionCriteria();

  function ChangeToNext() {
    if (index < sortedStudies.length -1) {
      const newIndex = (index as number) + 1;
      context?.setSelectionStudyIndex(newIndex)
      context?.setSelectionStudy((sortedStudies as StudyInterface[])[newIndex])
    }
  }

  function ChangeToPrevius() {
    if (index >= 1) {
      const newIndex = (index as number) - 1;
      context?.setSelectionStudyIndex(newIndex)
      context?.setSelectionStudy((sortedStudies as StudyInterface[])[newIndex])
    }
  }

  if(isExcluded != undefined && isIncluded != undefined)
  return (
    <>
      <Flex sx={conteiner}>
        <Flex sx={boxconteiner}>
          
          <ComboBox
            isDisabled={isIncluded}
            text="Exclude"
            options={criteriosExclusao}
          />
          <ComboBox
            isDisabled={isExcluded}
            text="Include"
            options={criteriosInclusao}
          />
        </Flex>

        <Flex sx={buttonconteiner}>
          <Button borderRadius={"3px"} onClick={ChangeToPrevius}>Prev</Button>
          <Button borderRadius={"3px"} onClick={ChangeToNext}>Next</Button>
        </Flex>

        <Button borderRadius={"3px"}>Redifine</Button>
      </Flex>
    </>
  );
}
