// External library
import { useEffect, useState } from "react";

// Infra
import axios from "../../../../infrastructure/http/axiosClient";

// Hooks
import { useNavigation } from "@features/shared/hooks/useNavigation";
import getRequestOptions from "@features/auth/utils/getRequestOptions";

// Types
import { PICOC } from "../pages/Picoc/types";
import { ResearchQuestion } from "../pages/ResearchQuestions/types";
import { EligibilityCriteria } from "../pages/EligibilityCriteria/types";
import { InformationSourcesAndSearchStrategy } from "../pages/InformationSourcesAndSearchStrategy/types";
import { SelectionAndExtraction } from "../pages/SelectionAndExtraction/types";

// Constants

const defaultResearchQuestion: ResearchQuestion = {
  justification: "",
};

const defaultPicoc: PICOC = {
  population: "",
  intervention: "",
  control: "",
  outcome: "",
  context: "",
};

const defaultEligibilityCriteria: EligibilityCriteria = {
  studyTypeDefinition: "",
};

const defaultInformationSourcesAndSearchStrategy: InformationSourcesAndSearchStrategy =
  {
    searchMethod: "",
    searchString: "",
    sourcesSelectionCriteria: "",
  };

const defaultSelectionAndExtraction: SelectionAndExtraction = {
  dataCollectionProcess: "",
  selectionProcess: "",
};

const useCreateProtocol = () => {
  // General-Definition
  const [goal, setGoal] = useState<string | null>(null);

  // Research-Questions
  const [researchQuestion, setResearchQuestion] = useState<ResearchQuestion>(
    defaultResearchQuestion
  );

  // Picoc
  const [picoc, setPicoc] = useState<PICOC>(defaultPicoc);

  // Eligibility-Criteria
  const [eligibilityCriteria, setEligibilityCriteria] =
    useState<EligibilityCriteria>(defaultEligibilityCriteria);

  // Information-Sources-And-Search-Strategy
  const [
    informationSourcesAndSearchStrategy,
    setInformationSourcesAndSearchStrategy,
  ] = useState<InformationSourcesAndSearchStrategy>(
    defaultInformationSourcesAndSearchStrategy
  );

  // Selection-And-Extraction
  const [selectionAndExtraction, setSelectionAndExtraction] =
    useState<SelectionAndExtraction>(defaultSelectionAndExtraction);

  // Aux
  const [flag, setFlag] = useState("");
  console.log(flag);

  const [researchQuestions, setResearchQuestions] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [studiesLanguages, setStydiesLanguages] = useState<string[]>([]);
  const [inclusionCriteria, setInclusionCriteria] = useState<string[]>([]);
  const [exclusionCriteria, setExclusionCriteria] = useState<string[]>([]);
  const [informationSources, setInformationSources] = useState<string[]>([]);

  const [analysisAndSynthesisProcess, setAnalysisAndSynthesisProcess] =
    useState<string | null>(null);

  const handleChangeResearchQuestion = (
    key: keyof ResearchQuestion,
    value: string
  ) => {
    setResearchQuestion((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChangePicoc = (key: keyof PICOC, value: string) => {
    setPicoc((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChangeEligibilityCriteria = (
    key: keyof EligibilityCriteria,
    value: string
  ) => {
    setEligibilityCriteria((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChangeInformationSourcesAndSearchStrategy = (
    key: keyof InformationSourcesAndSearchStrategy,
    value: string
  ) => {
    setInformationSourcesAndSearchStrategy((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChangeSelectionAndExtraction = (
    key: keyof SelectionAndExtraction,
    value: string
  ) => {
    setSelectionAndExtraction((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const { toGo, toBack } = useNavigation();

  const id = localStorage.getItem("systematicReviewId") || "";
  const url = `http://localhost:8080/systematic-study/${id}/protocol`;
  const options = getRequestOptions();

  useEffect(() => {
    async function fetch() {
      const response = await axios.get(url, options);
      const data = response.data.content;

      setGoal(data.goal);

      handleChangeResearchQuestion("justification", data.justification);

      handleChangeEligibilityCriteria(
        "studyTypeDefinition",
        data.studyTypeDefinition
      );
      handleChangeInformationSourcesAndSearchStrategy(
        "searchString",
        data.searchString
      );
      handleChangeInformationSourcesAndSearchStrategy(
        "sourcesSelectionCriteria",
        data.sourcesSelectionCriteria
      );
      handleChangeInformationSourcesAndSearchStrategy(
        "searchMethod",
        data.searchMethod
      );

      handleChangeSelectionAndExtraction(
        "dataCollectionProcess",
        data.dataCollectionProcess
      );
      handleChangeSelectionAndExtraction(
        "selectionProcess",
        data.selectionProcess
      );

      setAnalysisAndSynthesisProcess(data.analysisAndSynthesisProcess);

      if (data.picoc != null) {
        handleChangePicoc("population", data.picoc.population);
        handleChangePicoc("intervention", data.picoc.intervention);
        handleChangePicoc("control", data.picoc.control);
        handleChangePicoc("outcome", data.picoc.outcome);
        handleChangePicoc("context", data.picoc.context);
      }
    }

    fetch();
  }, []);

  //protocolOne

  async function updateProtocol() {
    const { justification } = researchQuestion;
    const { studyTypeDefinition } = eligibilityCriteria;
    const { searchMethod, searchString, sourcesSelectionCriteria } =
      informationSourcesAndSearchStrategy;
    const { dataCollectionProcess, selectionProcess } = selectionAndExtraction;

    const data = {
      goal,
      justification,
      picoc,
      searchString,
      studyTypeDefinition,
      dataCollectionProcess,
      sourcesSelectionCriteria,
      searchMethod,
      selectionProcess,
    };

    return await axios.put(url, data, options);
  }

  async function handleDataAndGoNext(path: string, isNavigateToNext: boolean) {
    try {
      await updateProtocol();
      if (!isNavigateToNext) toBack();
      toGo(path);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDataAndReturn() {
    try {
      await updateProtocol();
      toBack();
    } catch (err) {
      console.log(err);
    }
  }

  //protocolTwo

  async function sendSelectData(data: string[], context: string) {
    let content;

    try {
      if (context == "Languages") content = { studiesLanguages: data };
      else content = { informationSources: data };

      await axios.put(url, content, options);
    } catch (err) {
      console.log(err);
    }
  }

  async function sendAddText(data: string[], context: string) {
    let content;

    if (context == "Research Questions") content = { researchQuestions: data };
    if (context == "Keywords") content = { keywords: data };
    if (context == "Inclusion criteria") {
      const array: { description: string; type: string }[] = data.map(
        (item: string) => {
          return { description: item, type: "INCLUSION" };
        }
      );

      const response = await axios.get(url, options);
      let aux: { description: string; type: string }[] =
        response.data.content.eligibilityCriteria;
      aux = aux.filter((item) => {
        if (item.type == "EXCLUSION") return item;
      });

      content = [...aux, ...array];
      content = { eligibilityCriteria: content };
    }
    if (context == "Exclusion criteria") {
      const array: { description: string; type: string }[] = data.map(
        (item: string) => {
          return { description: item, type: "EXCLUSION" };
        }
      );

      const response = await axios.get(url, options);
      let aux: { description: string; type: string }[] =
        response.data.content.eligibilityCriteria;
      aux = aux.filter((item) => {
        if (item.type == "INCLUSION") return item;
      });

      content = [...aux, ...array];
      content = { eligibilityCriteria: content };
    }

    try {
      console.log(content);
      await axios.put(url, content, options);
    } catch (err) {
      console.log(err);
    }
  }

  return {
    goal,
    researchQuestion,
    researchQuestions,
    picoc,
    eligibilityCriteria,
    informationSourcesAndSearchStrategy,
    selectionAndExtraction,

    keywords,
    studiesLanguages,
    inclusionCriteria,
    exclusionCriteria,
    informationSources,
    analysisAndSynthesisProcess,

    handleChangeResearchQuestion,
    handleChangePicoc,
    handleChangeEligibilityCriteria,
    handleChangeInformationSourcesAndSearchStrategy,
    handleChangeSelectionAndExtraction,

    setGoal,
    setResearchQuestions,
    setKeywords,
    setStydiesLanguages,
    setInclusionCriteria,
    setExclusionCriteria,
    setInformationSources,

    sendSelectData,
    sendAddText,
    createProtocol: updateProtocol,
    handleDataAndGoNext,
    handleDataAndReturn,
    setFlag,
  };
};

export default useCreateProtocol;
