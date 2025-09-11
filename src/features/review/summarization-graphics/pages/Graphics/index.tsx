import { Box, Flex, Text } from "@chakra-ui/react";
import Header from "@components/structure/Header/Header";
import FlexLayout from "@components/structure/Flex/Flex";
import ChartsRenderer from "./subcomponents/ChartRenderer";
import FiltersModal from "../../components/menus/FilterMenu";
import SelectMenu from "../../components/menus/SelectMenu";
import { useGraphicsState } from "../../hooks/useGraphicsState";
import SectionMenu from "../../components/menus/SectionMenu";

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
    <FlexLayout navigationType="Accordion" defaultOpen={2}>
      <Box w="98%" m="1rem" h="fit-content">
        <Box
          w="100%"
          h="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          {/* Chart type */}
          <Flex
            w="100%"
            h="2.5rem"
            justifyContent="space-between"
            alignItems="center"
            mb="2rem"
          >
            <Header text="Graphics" />
            <SectionMenu onSelect={handleSectionChange} selected={section} />
          </Flex>

          {/*Section + Filters */}
          <Flex  
            w="100%"
            h="2.5rem"
            justifyContent="space-between"
            alignItems="center"
            mb="2rem"
          >
            {section === "Form Questions" ? (
              <SelectMenu
                options={allQuestions.filter((q) => q.questionId !== null)}
                selected={allQuestions.find(
                  (q) => q.questionId === selectedQuestionId
                )}
                onSelect={(q) =>
                  setSelectedQuestionId(q.questionId ?? undefined)
                }
                getLabel={(q) => q.code}
                getKey={(q) => q.questionId ?? q.code}
                placeholder="Choose Question"
              />
            ) : currentAllowedTypes.length > 0 ? (
              <SelectMenu
                options={currentAllowedTypes}
                selected={type}
                onSelect={setType}
                placeholder="Choose Layout"
              />
            ) : (
              <Text fontStyle="italic" color="gray.500">
                No visualization type available.
              </Text>
            )}
            {filtersBySection[section]?.length > 0 && (
              <FiltersModal
                availableFilters={filtersBySection[section]}
                filters={filters}
                setFilters={setFilters}
              />
            )}
          </Flex>

          <ChartsRenderer
            key={section + type + JSON.stringify(filters)}
            section={section}
            type={type}
            filters={filters}
            selectedQuestionId={selectedQuestionId}
          />
        </Box>
      </Box>
    </FlexLayout>
  );
}
