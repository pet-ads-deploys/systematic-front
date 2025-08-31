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

const useCreateProtocol = () => {
  // General-Definition
  const [goal, setGoal] = useState<string | null>(null);

  // Research-Questions
  const [researchQuestion, setResearchQuestion] = useState<ResearchQuestion>(
    defaultResearchQuestion
  );

  // Picoc
  const [picoc, setPicoc] = useState<PICOC>(defaultPicoc);

  // Aux
  const [flag, setFlag] = useState("");
  console.log(flag);
  //protocolTwo states
  const [searchString, setSearchString] = useState<string | null>(null);
  const [studyTypeDefinition, setStudyTypeDefinition] = useState<string | null>(
    null
  );
  const [dataCollectionProcess, setDataCollectionProcess] = useState<
    string | null
  >(null);
  const [researchQuestions, setResearchQuestions] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [studiesLanguages, setStydiesLanguages] = useState<string[]>([]);
  const [inclusionCriteria, setInclusionCriteria] = useState<string[]>([]);
  const [exclusionCriteria, setExclusionCriteria] = useState<string[]>([]);
  const [sourcesSelectionCriteria, setSourcesSelectionCriteria] = useState<
    string | null
  >(null);
  const [informationSources, setInformationSources] = useState<string[]>([]);
  const [searchMethod, setSearchMethod] = useState<string | null>(null);
  const [selectionProcess, setSelectionProcess] = useState<string | null>(null);
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
      setSearchString(data.searchString);
      setStudyTypeDefinition(data.studyTypeDefinition);
      setDataCollectionProcess(data.dataCollectionProcess);
      setSourcesSelectionCriteria(data.sourcesSelectionCriteria);
      setSearchMethod(data.searchMethod);
      setSelectionProcess(data.selectionProcess);
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
    createProtocol: updateProtocol,
    handleDataAndGoNext,
    handleDataAndReturn,
    setGoal,
    handleChangeResearchQuestion,
    handleChangePicoc,
    setSearchString,
    setStudyTypeDefinition,
    setDataCollectionProcess,
    setResearchQuestions,
    setKeywords,
    setStydiesLanguages,
    setInclusionCriteria,
    setExclusionCriteria,
    setSourcesSelectionCriteria,
    setInformationSources,
    setSearchMethod,
    setSelectionProcess,
    sendSelectData,
    sendAddText,
    setFlag,
    goal,
    researchQuestion,
    picoc,
    searchString,
    studyTypeDefinition,
    dataCollectionProcess,
    researchQuestions,
    keywords,
    studiesLanguages,
    inclusionCriteria,
    exclusionCriteria,
    sourcesSelectionCriteria,
    informationSources,
    searchMethod,
    selectionProcess,
    analysisAndSynthesisProcess,
  };
};

export default useCreateProtocol;
