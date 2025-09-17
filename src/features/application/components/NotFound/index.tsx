import { Box, Text, Icon, Button } from "@chakra-ui/react";
import { MdSearchOff } from "react-icons/md";
import { Link } from "react-router-dom";

export const NoStudiesData = () => {
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, 50%)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={6}
      borderWidth="2px"
      borderRadius="1rem"
      borderColor="gray.500"
      bg="linear-gradient(145deg, #1B2B3A, #2D465D)"
      textAlign="center"
      boxShadow="lg"
      maxW="25vw"
      minH="35vh"
    >
      <Icon as={MdSearchOff} boxSize={10} color="white" mb={4} />
      <Text fontSize="xl" fontWeight="semibold" color="white">
        No Studies Found
      </Text>
      <Text fontSize="md" color="gray.300" mt={2} mb={4}>
        Add a new study session to begin tracking your progress.
      </Text>
      <Button
        as={Link}
        to="/home"
        colorScheme="teal"
        bg="teal.400"
        color="white"
        _hover={{ bg: "teal.500" }}
        size="md"
        borderRadius="full"
      >
        Back to user area
      </Button>
    </Box>
  );
};
