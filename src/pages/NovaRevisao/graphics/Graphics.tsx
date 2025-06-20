import { Box, Text } from "@chakra-ui/react";
import Header from "../../../components/ui/Header/Header";


import { barchartBox, conteiner, fluxogramaBox, graphicsconteiner, piechartBox, textDescription, textSection } from "../styles/graphicsStyles";
import FlexLayout from "../../../components/ui/Flex/Flex";
import BarChart from "../../../components/Charts/BarChart/BarChart";
import { SearchSorcesTable } from "../../../components/Tables/SearchSoucesTable/SearchSorcesTable";
import DinamicChart from "../../../components/Charts/DinamicChart/DinamicChart";
import { IncludedStudiesTable } from "../../../components/Tables/IncludedStudiesTable/IncludedStudiesTable";
import LineChart from "../../../components/Charts/LineChart.tsx/LineChart";
import FlowChart from "../../../components/Charts/FunnelChart/FlowChart";



export default function Graphics() {
  return (
    <FlexLayout navigationType="Accordion" defaultOpen={2}>
      <Header text="Graphics" />
      <Box sx={conteiner}>

        {/* SEÇÃO:GENERAL INFORMATION*/}
        <Box>
          <Text sx={textSection}>General Information</Text>


          {/* Serach sources*/}
          <Text sx={textDescription}>Search Sources</Text>
          <Box sx={graphicsconteiner}>
            <Box sx={piechartBox}>
              <DinamicChart/>
            </Box>
            <SearchSorcesTable />
          </Box>

          {/*First Selection*/}
          <Text sx={textDescription}>First Selection</Text>
          <Box sx={graphicsconteiner}>
            <Box sx={barchartBox}>
              <BarChart criteria="inclusion" stage="selection" />
            </Box>
            <Box sx={barchartBox}>
              <BarChart criteria="exclusion" stage="selection" />
            </Box>
          </Box>

          {/*Second Selection*/}
          <Text sx={textDescription}>Second Selection</Text>
          <Box sx={graphicsconteiner}>
            <Box sx={barchartBox}>
              <BarChart criteria="inclusion" stage="extraction"  />
            </Box>
            <Box sx={barchartBox}>
              <BarChart criteria="exclusion" stage="extraction"  />
            </Box>
          </Box>

          {/*Funnel*/}
          <Text sx={textDescription}>Studies Funnel</Text>
          <Box sx={graphicsconteiner}>
            <Box sx={fluxogramaBox}>
             <FlowChart/>
            </Box>
          </Box>


           {/*included studies*/}
          <Text sx={textDescription}>Included Studies</Text>
          <Box sx={graphicsconteiner}>
            
              <IncludedStudiesTable/>
              <LineChart/>
            
          </Box>
        </Box>

        {/* SEÇÃO:FORM QUESTIONS*/}
        <Box>
          <Text sx={textSection}>Form Questions</Text>
        
        </Box>

      </Box>
    </FlexLayout>
  );


}
