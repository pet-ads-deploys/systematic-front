import { Box, Text } from "@chakra-ui/react";
import Header from "../../../components/ui/Header/Header";

import PieChart from "../../../components/Charts/PieChart/PieChart";
import { barchartBox, conteiner, graphicsconteiner, piechartBox, textDescription } from "../styles/graphicsStyles";
import FlexLayout from "../../../components/ui/Flex/Flex";
import BarChart from "../../../components/Charts/BarChart/BarChart";
import FunnelChart from "../../../components/Charts/FunnelChart/FunnelChart";

export default function Graphics() {
  return (
    <FlexLayout navigationType="Accordion" defaultOpen={2}>
      <Header text="Graphics" />
      <Box sx={conteiner} >

        <Text sx={textDescription}>Search Sorces</Text>
        <Box sx={graphicsconteiner}>
          <Box sx={piechartBox}>
            <PieChart/>
          </Box>
        </Box>

         <Text sx={textDescription}>First Selection</Text>
        <Box sx={graphicsconteiner}>
          <Box sx={barchartBox}>
            <BarChart criteria="inclusion" />
          </Box>
          <Box sx={barchartBox} >
            <BarChart  criteria="exclusion" />
          </Box>
        </Box>

        <Text sx={textDescription}>Second Selection</Text>
        <Box sx={graphicsconteiner}>
          <Box sx={barchartBox}>
            <BarChart criteria="inclusion" />
          </Box>
          <Box sx={barchartBox}>
            <BarChart criteria="exclusion" />
          </Box>
        </Box>


        <Text sx={textDescription}>Studies Funnel</Text>
        <Box sx={graphicsconteiner}>
          <Box>
            <FunnelChart />
          </Box>
        </Box>

          <Text sx={textDescription}>Included Studies</Text>

      </Box>

    




    </FlexLayout>
  );
}
