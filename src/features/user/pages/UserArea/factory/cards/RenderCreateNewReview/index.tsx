import { Flex, Icon, Text } from "@chakra-ui/react";
import { MdSentimentDissatisfied } from "react-icons/md";
import NavButton from "@components/common/buttons/NavigationButton";

const RenderCreateNewReview = () => {
  return (
    <Flex direction="column" align="center" justify="center" w="100%">
      <Icon
        as={MdSentimentDissatisfied}
        boxSize={12}
        color="gray.500"
        mb={4}
        mt={"60px"}
      />

      <Text fontSize="2xl" color="gray.600" mb={4}>
        {" "}
        Oops! We didn't find any reviews here.{" "}
      </Text>

      <Text fontSize="lg" color="gray.500" mb={4}>
        {" "}
        How about creating a new one?{" "}
      </Text>

      <NavButton text="Create review" path="/newReview" ml="0rem" />
    </Flex>
  );
};

export default RenderCreateNewReview;
