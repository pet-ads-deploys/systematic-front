import { Box } from "@chakra-ui/react";
import Header from "../../../components/ui/Header/Header";

import PieChart from "../../../components/Charts/PieChart/PieChart";
import { barchartBox, conteiner, graphicsconteiner, piechartBox } from "../styles/graphicsStyles";
import FlexLayout from "../../../components/ui/Flex/Flex";
import BarChart from "../../../components/Charts/BarChart/BarChart";

export default function Graphics() {
  return (
    <FlexLayout navigationType="Accordion" defaultOpen={2}>
      <Header text="Graphics" />
      <Box sx={conteiner} bg={'red'}>
        <Box sx={graphicsconteiner}>
          <Box sx={piechartBox}>
            <PieChart />
          </Box>
        </Box>
        <Box sx={graphicsconteiner}>
          <Box sx={barchartBox}>
            <BarChart />
          </Box>
        </Box>
      </Box>
    </FlexLayout>
  );
}
