import { Center, Spinner, Text, VStack } from '@chakra-ui/react';

export default function LoadingPage() {
  return (
    <Center h="100vh" w="100vw" bg="gray.100">
      <VStack spacing={4}>
        <Spinner size="xl" thickness="4px" color="teal.500" />
        <Text fontSize="xl" color="gray.600">
          Loading...
        </Text>
      </VStack>
    </Center>
  );
}
