import { Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel } from "@chakra-ui/react"
// import NavItem from "../NavItem"
import ProtocolAccordionSubItem from "./AccordionNavItem";
// import LogoutButton from "../../buttons/LogoutButton";

import { MdRule, MdOutlineArticle} from "react-icons/md";
import { LuFileSearch, LuFileCheck2, LuTextSelect } from "react-icons/lu";
import { CgFileAdd, CgCheckR } from "react-icons/cg";
import { IoText, IoBarChartSharp} from "react-icons/io5";
import { GrTag } from "react-icons/gr";
import { TbFilterSearch } from "react-icons/tb";
import { VscOpenPreview } from "react-icons/vsc";


const AccordionComponent = () => {
    const id = localStorage.getItem('systematicReviewId');

    return (
        <Accordion w='80%' allowToggle>
    <AccordionItem>
      <h2>
        <AccordionButton p='1.2vw 1vh' color="white">
          <Box color='#c9d9e5' as='span' flex='1' textAlign='left' display="flex" gap=".5rem">
            <MdRule size="1.25rem" color="#c9d9e5"/>
            Planning
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <ProtocolAccordionSubItem icon={<MdOutlineArticle size="1.2rem" color='#c9d9e5'/>} to={`/newReview/protocol/${id}`} text='Protocol' />
      </AccordionPanel>
    </AccordionItem>
  
    <AccordionItem>
      <h2>
        <AccordionButton p='1.2vw 1vh' color="white">
          <Box color='#c9d9e5' as='span' flex='1' textAlign='left' display="flex" gap=".5rem">
            <LuFileSearch  size="1.1rem" color="#c9d9e5"/>
            Execution
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {/* <ProtocolAccordionSubItem icon={<IoText size="1.1rem" color='#c9d9e5'/>} to={`/newReview/keywords`} text='Keywords' /> */}
        {/* <ProtocolAccordionSubItem icon={<CgFileAdd  size="1.1rem" color='#c9d9e5'/>} to={`/newReview/insertion`} text='Insertion' /> */}
        <ProtocolAccordionSubItem icon={<GrTag size="1rem" color='#c9d9e5'/>} to={`/newReview/identification`} text='Identification' />
        <ProtocolAccordionSubItem icon={<LuTextSelect size="1.2rem" color='#c9d9e5'/>} to={`/newReview/selection`} text='Selection' />
        <ProtocolAccordionSubItem icon={<TbFilterSearch size="1.2rem" color='#c9d9e5'/>} to={`/newReview/extraction`} text='Extraction' />
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <h2>
        <AccordionButton p='1.2vw 1vh' color="white">
          <Box color='#c9d9e5' as='span' flex='1' textAlign='left' display="flex" gap=".5rem">
            <LuFileCheck2  size="1rem" color="#c9d9e5"/>
            Summarization
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <ProtocolAccordionSubItem icon={<IoBarChartSharp size="1rem" color='#c9d9e5'/>} to={`/newReview/graphics`} text='Graphics' />
        <ProtocolAccordionSubItem icon={<VscOpenPreview size="1.2rem" color='#c9d9e5'/>} to={`/newReview/visualization`} text='Visualization' />
        <ProtocolAccordionSubItem icon={<CgCheckR size="1rem" color='#c9d9e5'/>} to={`/newReview/finalization`} text='Finalization' />
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
    )
}

export default AccordionComponent;