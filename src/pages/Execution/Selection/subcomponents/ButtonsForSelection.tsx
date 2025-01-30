// import { Button, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { Button, Flex } from "@chakra-ui/react";
import {
  boxconteiner,
  buttonconteiner,
  conteiner,
  button,
} from "../../styles/BtnSelectionStyles";
import ComboBox from "../../../../components/Inputs/ComboBox";
// import { FaPen } from "react-icons/fa6";
import { useContext } from "react";
import AppContext from "../../../../components/Context/AppContext";
import StudySelectionContext from "../../../../components/Context/StudiesSelectionContext";
import { StudyInterface } from "../../../../../public/interfaces/IStudy";
// import StudyEdtionModal from "../../../../components/Modals/StudyModal/StudyEdtionModal";
import useFetchInclusionCriteria from "../../../../hooks/fetch/useFetchInclusionCriteria";
import useFetchExclusionCriteria from "../../../../hooks/fetch/useFetchExclusionCriterias";

import { RiRestartFill } from "react-icons/ri";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function ButtonsForSelection() {
  const context = useContext(AppContext);
  const selectionContext = useContext(StudySelectionContext);

  const isIncluded = selectionContext?.isIncluded;
  const isExcluded = selectionContext?.isExcluded;
  const sortedStudies = context?.selectionStudies as StudyInterface[];
  const index = context?.selectionStudyIndex as number;
  const criteriosExclusao: string[] = useFetchExclusionCriteria();
  const criteriosInclusao: string[] = useFetchInclusionCriteria();

  function ChangeToNext() {
    if (index < sortedStudies.length - 1) {
      const newIndex = (index as number) + 1;
      context?.setSelectionStudyIndex(newIndex);
      context?.setSelectionStudy((sortedStudies as StudyInterface[])[newIndex]);
    }
  }

  function ChangeToPrevius() {
    if (index >= 1) {
      const newIndex = (index as number) - 1;
      context?.setSelectionStudyIndex(newIndex);
      context?.setSelectionStudy((sortedStudies as StudyInterface[])[newIndex]);
    }
  }

  function ResetState() {
    console.log("Preciso ver se a rota permite unclassified");
  }

  if (isExcluded != undefined && isIncluded != undefined)
    return (
      <>
        <Flex sx={conteiner}>
          <Flex sx={buttonconteiner}>
            <Button
              _hover={{
                bg: "white",
                color: "black",
                border: "2px solid black",
              }}
              onClick={ChangeToPrevius}
              sx={button}
            >
              <IoIosArrowBack size="1.5rem" /> Previous
            </Button>
          </Flex>

          <Flex sx={boxconteiner}>
            <ComboBox
              isDisabled={isExcluded}
              text="Include"
              options={criteriosInclusao}
            />
            <ComboBox
              isDisabled={isIncluded}
              text="Exclude"
              options={criteriosExclusao}
            />
            <Button
              borderRadius="6px"
              bg="#eab308"
              color="white"
              border="2px solid #f6bb42"
              _hover={{bg:"white", color:"#eab308"}}
              transition="0.2s ease-in-out"
              boxShadow="md"
              p="1rem"
              onClick={ResetState}
            >
              Reset
            </Button>
          </Flex>

          <Flex sx={buttonconteiner}>
            <Button
              _hover={{
                bg: "white",
                color: "black",
                border: "2px solid black",
              }}
              onClick={ChangeToNext}
              sx={button}
            >
              Next
              <IoIosArrowForward size="1.5rem" />
            </Button>
          </Flex>
        </Flex>
      </>
    );
}
