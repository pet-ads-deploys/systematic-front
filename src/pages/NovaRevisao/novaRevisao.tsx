import { Box, FormControl } from "@chakra-ui/react";
import Header from "../../components/structure/Header/Header";
import InputText from "../../components/Inputs/InputText";
import NavButton from "@components/common/buttons/NavigationButton";
import InputTextArea from "../../components/Inputs/InputTextArea";
import ResearcherFilter from "../UserArea/subcomponents/ResearcherFilter";
import FlexLayout from "../../components/structure/Flex/Flex";

//importin hooks
import useCreateReview from "../../hooks/reviews/useCreateReview";
import AlertInputText from "../../components/Inputs/AlertInputText";

export default function NovaRevisao() {
  const {
    description,
    title,
    handleDescription,
    handleTitle,
    handlePost,
    handlePut,
    isReturn,
    isTitleValid,
  } = useCreateReview();

  return (
    <FlexLayout navigationType="Accordion" defaultOpen={0}>
      <Header text="New Systematic Review" />

      <FormControl
        m={"20px auto 0"}
        display={"flex"}
        gap={10}
        flexDir={"column"}
        w={"60vw"}
        alignItems={"center"}
      >
        {isTitleValid ? (
          <InputText
            value={title}
            label="Title"
            placeholder="Enter review title"
            type="text"
            nome="text"
            onChange={handleTitle}
            labelAbove={true}
          />
        ) : (
          <AlertInputText
            border="red"
            value={title}
            label="Title is required"
            placeholder="Enter review title"
            type="text"
            nome="text"
            onChange={handleTitle}
            labelAbove={true}
          />
        )}

        <InputTextArea
          value={description}
          label="Description"
          placeholder="Enter review description"
          onChange={handleDescription}
        ></InputTextArea>

        <ResearcherFilter />

        <Box
          w={"60vw"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"end"}
        >
          {!isReturn ? (
            <NavButton event={handlePost} text="Create new Review" />
          ) : (
            <NavButton event={handlePut} text="Next" />
          )}
        </Box>
      </FormControl>
    </FlexLayout>
  );
}
