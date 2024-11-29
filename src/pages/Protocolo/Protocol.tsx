import { Box, FormControl, Flex, Progress, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Heading, Divider } from "@chakra-ui/react";
import Header from "../../components/ui/Header/Header";
import NavButton from "../../components/Buttons/NavButton";
import { btnBox, formControl } from "./styles/partOneStyles";
import TextAreaInput from "../../components/Inputs/InputTextArea";
import FlexLayout from "../../components/ui/Flex/Flex";
import useProtocolAccordion from "../../hooks/useProtocolAccordion";
import useCreatePortocol from '../../hooks/reviews/useCreateProtocol';
import { useEffect } from "react";
import AddTextTable from "../../components/AddDataFields/AddTextTable";

export default function Protocol() {
  
  const { handleDataAndGoNext, handleDataAndReturn, setGoal, setJustification, setPopulation, 
    setIntervention, setControl, setOutcome, setContext, goal, justification, population, intervention,
    control, outcome, context, setFlag } = useCreatePortocol();

  const { showResearchQuestions, loading, showPicoc } = useProtocolAccordion();
  
  useEffect(() => {
    setFlag('protocol');
  }, [])

  if(loading) return (<></>);

  return (
    <FlexLayout defaultOpen={0} navigationType="Accordion">

      <Box w={"100%"}>
      
        <Header text="Protocol" />
        <Progress value={33} w={"100%"} />
        <Flex w={"100%"} justifyContent={"center"} direction={"column"} alignItems={"center"}>
          <FormControl sx={formControl}>
            <TextAreaInput value={goal} label="Objectives:" placeholder="What are your goals?" onChange={(e) => { setGoal(e.target.value) }}/>
            <TextAreaInput value={justification} label="Main question:" placeholder="The reason behind your research..." onChange={(e) => { setJustification(e.target.value) }}/>
            
            <Accordion defaultIndex={showResearchQuestions ? [0] : [-1]} allowToggle mt={6} w="60vw">
              
              <AccordionItem>
                <h2 style={{color: "#2E4B6C"}}>
                  <AccordionButton>
                    <Box flex="1" textAlign="center">
                      <Heading size="md">Optional Research Questions</Heading>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>

                <AccordionPanel pb={4}>
                  <Flex>
                    <AddTextTable text="Research Questions" placeholder="Enter the other Research Questions"/>
                  </Flex>
                </AccordionPanel>

              </AccordionItem>
            </Accordion>
            
            <Accordion defaultIndex={showPicoc ? [0] : [-1]} allowToggle mt={6} w="60vw">
              
              <AccordionItem>
                <h2 style={{color: "#2E4B6C"}}>
                  <AccordionButton>
                    <Box flex="1" textAlign="center">
                      <Heading size="md">PICOC Criteria (Optional)</Heading>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>

                <AccordionPanel pb={4}>
                  <Divider mb={4} />
                  <TextAreaInput value={population} label="Population:" placeholder="What is your study population?" onChange={(e) => { setPopulation(e.target.value) }} mt={4}/>
                  <TextAreaInput value={intervention} label="Intervention:" placeholder="What is your intervention?" onChange={(e) => { setIntervention(e.target.value) }} mt={4}/>
                  <TextAreaInput value={control} label="Control:" placeholder="What is your control?" onChange={(e) => { setControl(e.target.value) }} mt={4}/>
                  <TextAreaInput value={outcome} label="Outcome:" placeholder="What is your outcome?" onChange={(e) => { setOutcome(e.target.value) }} mt={4}/>
                  <TextAreaInput value={context} label="Context:" placeholder="What is your context?" onChange={(e) => { setContext(e.target.value) }} mt={4}/>
                </AccordionPanel>

              </AccordionItem>
            </Accordion>
          </FormControl>

          <Box sx={btnBox}>
            <NavButton event={handleDataAndReturn} text='Return'/>
            <NavButton event={handleDataAndGoNext} text="Next" />
          </Box>
        </Flex>

      </Box>

    </FlexLayout>
  );
}
