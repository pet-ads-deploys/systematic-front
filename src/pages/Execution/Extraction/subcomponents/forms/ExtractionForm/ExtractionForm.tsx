import { Box, Text } from "@chakra-ui/react";
import HeaderForm from "../HeaderForm/HeaderForm";
import TextualResponse from "../Responses/Textual/Textual";
import NumberScale from "../Responses/NumberScale/NumberScale";
import { useFetchExtractionQuestions } from "../../../../../../hooks/fetch/useFetchExtractionQuestions";


export default function ExtractionForm() {
  const {questions} = useFetchExtractionQuestions()
  const hasQuestions = questions ? questions.length > 0 : false

  return (
    <Box w="97%" gap="1.5rem">
      <HeaderForm text="Estudo Analítico sobre os Potenciais Efeitos Colaterais da Concomitância Alimentar de Leite e Manga" />
      <Box gap="2rem">
        {hasQuestions ? (
          questions?.map((question) => {
            switch (question.questionType) {
              case "TEXTUAL":
                return (
                  <TextualResponse
                    key={question.code}
                    question={question.description}
                  />
                );
              case "NUMBERED_SCALE":
                return (
                  <NumberScale
                    key={question.code}
                    question={question.description}
                    minValue={question.higher}
                    maxValue={question.lower}
                  />
                );
              default:
                return null;
            }
          })
        ) : (
          <Text>No questions found.</Text>
        )}
      </Box>
    </Box>
  );
}
