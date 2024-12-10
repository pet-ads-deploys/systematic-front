import { Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel } from "@chakra-ui/react"
import NavItem from "../NavItem"
import ProtocolAccordionSubItem from "./AccordionNavItem";
import LogoutButton from "../../buttons/LogoutButton";

const AccordionComponent = () => {
    const id = localStorage.getItem('systematicReviewId');

    return (
        <Accordion w='80%'>
    <AccordionItem>
      <h2>
        <AccordionButton p='1.2vw 1vh'>
          <Box color='#c9d9e5' as='span' flex='1' textAlign='left'>
            Protocol
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <ProtocolAccordionSubItem to={`/newReview/protocol/${id}`} text='Protocol' />
      </AccordionPanel>
    </AccordionItem>
  
    <AccordionItem>
      <h2>
        <AccordionButton p='1.2vw 1vh'>
          <Box color='#c9d9e5' as='span' flex='1' textAlign='left'>
            Execution
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <ProtocolAccordionSubItem to={`/newReview/keywords`} text='Keywords' />
        <ProtocolAccordionSubItem to={`/newReview/insertion`} text='Insertion' />
        <ProtocolAccordionSubItem to={`/newReview/identification`} text='Identification' />
        <ProtocolAccordionSubItem to={`/newReview/selection`} text='Selection' />
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <h2>
        <AccordionButton p='1.2vw 1vh'>
          <Box color='#c9d9e5' as='span' flex='1' textAlign='left'>
            Summarization
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <ProtocolAccordionSubItem to={`/newReview/graphics`} text='Graphics' />
        <ProtocolAccordionSubItem to={`/newReview/visualization`} text='Visualization' />
        <ProtocolAccordionSubItem to={`/newReview/finalization`} text='Finalization' />
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
    )
}

export default AccordionComponent;