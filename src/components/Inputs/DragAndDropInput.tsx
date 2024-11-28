import { useDropzone } from "react-dropzone";
import { Box, Icon, Text, VStack } from "@chakra-ui/react";
import { FaFileAlt } from "react-icons/fa";

export default function DragAndDrop({ handleFileChange }) {
  const onDrop = (acceptedFiles: File[]) => {
    handleFileChange({ acceptedFiles });
};


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/x-bibtex': [".bib"], 'application/rdf+xml': [".ris"]}

  });

  return (
    <Box
      {...getRootProps()}
      border="2px dashed"
      borderColor={isDragActive ? "#3367a8" : "#263C56"}
      borderRadius="md"
      p={6}
      textAlign="center"
      cursor="pointer"
      _hover={{ borderColor: "#3a76c4" }}
      transition="border-color 0.3s ease"
    >
      <input {...getInputProps()} accept=".bib,.ris"/>
      <VStack spacing={2}>
        <Icon as={FaFileAlt} boxSize={6} color="#263C56" />
        <Text fontSize="md" color="#263C56">
          {isDragActive ? "Drop the files here..." : "Drag & Drop your files or click to select"}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Supported formats: .bib, .ris
        </Text>
      </VStack>
    </Box>
  );
}
