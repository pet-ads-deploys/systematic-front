// External librayr
import { Flex, Text } from "@chakra-ui/react";

// Components
import ArticleHeader from "../../../table/header/ArticleHeader";

// Types
import type { ArticlePreviewProps } from "../StudyData";

export default function ArticlePreview({ studyData }: ArticlePreviewProps) {
  const { abstract, studyType, year, venue, title, authors, keywords } =
    studyData;

  return (
    <Flex
      w="100%"
      flexDirection="column"
      padding="1rem"
      paddingTop="0rem"
      fontFamily="Times New Roman, serif"
      h="fit-content"
    >
      <Flex
        display="flex"
        lineHeight="1"
        gap="2rem"
        flexDirection="column"
        w="100%"
        p=".25rem"
        h="100%"
      >
        <ArticleHeader studyData={studyData} />
        <Flex>
          <Text marginBottom=".45rem" w="30%" align="left">
            <Text fontSize="clamp(.75rem, 1vw, .85rem)" fontWeight="bold">
              Type: {studyType}
            </Text>
          </Text>
          <Text
            fontSize="clamp(0.85rem, 1.2vw, 1rem)"
            align="right"
            as="i"
            fontWeight="Bold"
            w="70%"
          >
            {venue}, {year}
          </Text>
        </Flex>
        <Text
          fontSize="clamp(1.15rem, 2vw, 1.25rem)"
          fontWeight="bold"
          fontFamily="Boboni"
          lineHeight="1.4rem"
          align="center"
          whiteSpace="normal"
          wordBreak="break-word"
          overflowWrap="break-word"
          maxWidth="100%"
        >
          {title}
        </Text>
        <Text p="0.25rem" lineHeight="1.5rem" fontWeight="Bold" align="center">
          {authors}
        </Text>
        <Flex
          fontFamily="Literata"
          flexDirection="column"
          align="right"
          gap="1rem"
          pb="3.75rem"
        >
          <Text
            fontSize="clamp(.7rem, 1vw, .85rem)"
            lineHeight="1.5rem"
            textAlign="justify"
          >
            <b>Abstract:</b> {abstract}
          </Text>
          <Text
            fontSize="clamp(.7rem, 1vw, .85rem)"
            lineHeight="1.5rem"
            textAlign="justify"
          >
            <b>Keywords:</b> {keywords}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
