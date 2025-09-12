import { Box, Text } from "@chakra-ui/react";
import { conteiner } from "./styles";
import Header from "@components/structure/Header/Header";
import FlexLayout from "@components/structure/Flex/Flex";
import ChartsRenderer from "./subcomponents/ChartRenderer";
import SectionMenu from "../../components/menus/SectionMenu";
import FiltersModal from "../../components/menus/FilterMenu";
import { useGraphicsState } from "../../hooks/useGraphicsState";
import SelectMenu from "../../components/menus/SelectMenu";

export default function Graphics() {
  const {
    allQuestions,
    selectedQuestionId,
    setSelectedQuestionId,
    section,
    handleSectionChange,
    type,
    setType,
    filters,
    setFilters,
    filtersBySection,
    currentAllowedTypes,
  } = useGraphicsState();

  return (
    <FlexLayout navigationType="Accordion">
      <Header text="Graphics" />
      <Box sx={conteiner}>
        <Box display="flex" gap="1rem" flexWrap="wrap" mb={5} alignItems="flex-start">
          
          {/* Section menu */}
          <SectionMenu onSelect={handleSectionChange} selected={section} />

          {/* Questions menu*/}
          {section === "Form Questions" && (
            <SelectMenu
              options={allQuestions.filter((q) => q.questionId !== null)}
              selected={allQuestions.find((q) => q.questionId === selectedQuestionId)}
              onSelect={(q) => setSelectedQuestionId(q.questionId ?? undefined)}
              getLabel={(q) => q.code}
              getKey={(q) => q.questionId ?? q.code}
              placeholder="Choose Question"
            />
          )}

          {/* Graphic type menu*/}
          {section !== "Form Questions" && currentAllowedTypes.length > 0 && (
            <SelectMenu
              options={currentAllowedTypes}
              selected={type}
              onSelect={setType}
              placeholder="Choose Layout"
            />
          )}

          {/* no view type*/}
          {section !== "Form Questions" && currentAllowedTypes.length === 0 && (
            <Text fontStyle="italic" color="gray.500" pl={5}>
              No visualization type available.
            </Text>
          )}

          {/* FilterModal*/}
          {filtersBySection[section]?.length > 0 && (
            <FiltersModal
              availableFilters={filtersBySection[section]}
              filters={filters}
              setFilters={setFilters}
            />
          )}
        </Box>

        {/* ChartsRenderer */}
        <ChartsRenderer
          key={section + type + JSON.stringify(filters)} // força atualização ao mudar filtros
          section={section}
          type={type}
          filters={filters}
          selectedQuestionId={selectedQuestionId}
        />
      </Box>
    </FlexLayout>
  );
}
