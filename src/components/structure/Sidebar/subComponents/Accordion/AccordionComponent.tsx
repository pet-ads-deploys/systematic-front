// External library
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { MdRule } from "react-icons/md";
import { LuFileSearch, LuFileCheck2 } from "react-icons/lu";

// Components
import ProtocolAccordionSubItem from "./AccordionNavItem";

// Constants
const hasShowOcultScreens = false;

const AccordionComponent = () => {
  const id = localStorage.getItem("systematicReviewId");

  return (
    <Accordion w="80%" allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton p="1.2vw 1vh" color="white">
            <Box
              color="#c9d9e5"
              as="span"
              flex="1"
              textAlign="left"
              display="flex"
              gap=".5rem"
            >
              <MdRule size="1.25rem" color="#c9d9e5" />
              Planning
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <ProtocolAccordionSubItem
            to={`/review/planning/protocol/general-definition`}
            text="Definition"
          />
          <ProtocolAccordionSubItem
            to={`/review/planning/protocol/research-questions/${id}`}
            text="Research"
          />
          <ProtocolAccordionSubItem
            to={`/review/planning/protocol/picoc/${id}`}
            text="Picoc"
          />
          <ProtocolAccordionSubItem
            to={`/review/planning/protocol/eligibility-criteria/${id}`}
            text="Criteria"
          />
          <ProtocolAccordionSubItem
            to={`/review/planning/protocol/information-sources-and-search-strategy/${id}`}
            text="Sources"
          />
          <ProtocolAccordionSubItem
            to={`/review/planning/protocol/selection-and-extraction/${id}`}
            text="Selection"
          />
          <ProtocolAccordionSubItem
            to={`/review/planning/protocol/risk-of-bias-assessment/${id}`}
            text="Risk Of Bias"
          />
          <ProtocolAccordionSubItem
            to={`/review/planning/protocol/analysis-and-synthesis-of-results/${id}`}
            text="Analysys"
          />
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton p="1.2vw 1vh" color="white">
            <Box
              color="#c9d9e5"
              as="span"
              flex="1"
              textAlign="left"
              display="flex"
              gap=".5rem"
            >
              <LuFileSearch size="1.1rem" color="#c9d9e5" />
              Execution
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <ProtocolAccordionSubItem
            to={`/review/execution/identification`}
            text="Identification"
          />
          <ProtocolAccordionSubItem
            to={`/review/execution/selection`}
            text="Selection"
          />
          <ProtocolAccordionSubItem
            to={`/review/execution/extraction`}
            text="Extraction"
          />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton p="1.2vw 1vh" color="white">
            <Box
              color="#c9d9e5"
              as="span"
              flex="1"
              textAlign="left"
              display="flex"
              gap=".5rem"
            >
              <LuFileCheck2 size="1rem" color="#c9d9e5" />
              Summarization
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <ProtocolAccordionSubItem
            to={`/review/summarization/graphics`}
            text="Graphics"
          />
          {hasShowOcultScreens && (
            <>
              <ProtocolAccordionSubItem
                to={`/review/summarization/visualization`}
                text="Visualization"
              />
              <ProtocolAccordionSubItem
                to={`/review/summarization/finalization`}
                text="Finalization"
              />
            </>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionComponent;
