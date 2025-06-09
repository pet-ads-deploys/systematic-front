import { useContext } from "react";

import MenuOptions from "../../../components/Inputs/MenuOptions";
import ComboBox from "../../../components/Inputs/ComboBox";

import AppContext from "../../../components/Context/AppContext";
import StudySelectionContext from "../../../components/Context/StudiesSelectionContext";

import useFetchInclusionCriteria from "../../../hooks/fetch/useFetchInclusionCriteria";
import useFetchExclusionCriteria from "../../../hooks/fetch/useFetchExclusionCriterias";
import useResetStatus from "../../../hooks/useResetStatus";
import useChangePriority from "../../../hooks/tables/useChangePriority";

import { StudyInterface } from "../../../../public/interfaces/IStudy";
import { PageLayout } from "./LayoutFactory";

import { Button, Flex } from "@chakra-ui/react";
import {
  boxconteiner,
  buttonconteiner,
  conteiner,
} from "../styles/BtnSelectionStyles";
import { RiResetLeftLine } from "react-icons/ri";
import { MdOutlineLowPriority } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface ButtonsForSelectionProps {
  page: PageLayout;
}

export default function ButtonsForSelection({
  page,
}: ButtonsForSelectionProps) {
  const context = useContext(AppContext);
  const selectionContext = useContext(StudySelectionContext);
  const { handleResetStatusToUnclassified } = useResetStatus({ page });
  const { handleChangePriority } = useChangePriority();
  const inclusion = useFetchInclusionCriteria();
  const exclusion = useFetchExclusionCriteria();

  const status = {
    isIncluded: selectionContext?.isIncluded,
    isExcluded: selectionContext?.isExcluded,
  };

  if (status.isIncluded == undefined || status.isExcluded == undefined) return;

  const criterias = { inclusion, exclusion };

  const sortedStudies = context?.selectionStudies as StudyInterface[];
  const index = context?.selectionStudyIndex as number;

  const isUniqueArticle = sortedStudies.length == 1 ? true : false;

  function ChangeToNext() {
    const newIndex = (index + 1) % sortedStudies.length;
    context?.setSelectionStudyIndex(newIndex);
    context?.setSelectionStudy(sortedStudies[newIndex]);
  }

  function ChangeToPrevius() {
    const newIndex = (index - 1 + sortedStudies.length) % sortedStudies.length;
    context?.setSelectionStudyIndex(newIndex);
    context?.setSelectionStudy(sortedStudies[newIndex]);
  }

  return (
    <Flex sx={conteiner}>
      {isUniqueArticle ? null : (
        <Flex sx={buttonconteiner}>
          <Button onClick={ChangeToPrevius} bg="white">
            <IoIosArrowBack color="black" size="1.5rem" />
            prev
          </Button>
        </Flex>
      )}
      <Flex sx={boxconteiner}>
        <ComboBox
          isDisabled={status.isExcluded}
          text="Include"
          options={criterias.inclusion}
          page={page}
          selectedItems={}
        />
        <ComboBox
          isDisabled={status.isIncluded}
          text="Exclude"
          options={criterias.exclusion}
          page={page}
          selectedItems={}
        />
        <Button
          color="black"
          bg="white"
          p="1rem"
          onClick={handleResetStatusToUnclassified}
        >
          <RiResetLeftLine color="black" size="1.5rem" />
        </Button>
        <MenuOptions
          options={["Very Low", "Low", "High", "Very High"]}
          onOptionToggle={(option) => handleChangePriority({ status: option })}
          icon={<MdOutlineLowPriority color="black" size="1.75rem" />}
        />
      </Flex>

      {isUniqueArticle ? null : (
        <Flex sx={buttonconteiner}>
          <Button onClick={ChangeToNext} bg="white">
            next
            <IoIosArrowForward color="black" size="1.5rem" />
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
