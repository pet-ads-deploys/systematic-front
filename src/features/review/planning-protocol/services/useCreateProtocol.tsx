// External library
import { useEffect, useState } from "react";

// Infra
import axios from "../../../../infrastructure/http/axiosClient";

// Hooks
import { useNavigation } from "@features/shared/hooks/useNavigation";
import getRequestOptions from "@features/auth/utils/getRequestOptions";

const useCreateProtocol = () => {
  const [flag, setFlag] = useState("");

  //protocolOne States
  const [goal, setGoal] = useState<string | null>(null);
  const [justification, setJustification] = useState<string | null>(null);
  const [population, setPopulation] = useState<string | null>(null);
  const [intervention, setIntervention] = useState<string | null>(null);
  const [control, setControl] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<string | null>(null);
  const [context, setContext] = useState<string | null>(null);

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

  const { toGo } = useNavigation();

  const id = localStorage.getItem("systematicReviewId");
  const options = getRequestOptions();

  const url = `http://localhost:8080/systematic-study/${id}/protocol`;

  useEffect(() => {
    const url = `http://localhost:8080/systematic-study/${id}/protocol`;

    async function fetch() {
      const response = await axios.get(url, options);
      const data = response.data.content;

      setGoal(data.goal);
      setJustification(data.justification);
      setSearchString(data.searchString);
      setStudyTypeDefinition(data.studyTypeDefinition);
      setDataCollectionProcess(data.dataCollectionProcess);
      setSourcesSelectionCriteria(data.sourcesSelectionCriteria);
      setSearchMethod(data.searchMethod);
      setSelectionProcess(data.selectionProcess);
      setAnalysisAndSynthesisProcess(data.analysisAndSynthesisProcess);

      if (data.picoc != null) {
        setPopulation(data.picoc.population);
        setIntervention(data.picoc.intervention);
        setControl(data.picoc.control);
        setOutcome(data.picoc.outcome);
        setContext(data.picoc.context);
      }
    }

    fetch();
  }, []);

  //protocolOne

  async function createProtocol() {
    const picoc = { population, intervention, control, outcome, context };

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

  async function handleDataAndGoNext() {
    try {
      await createProtocol();

      if (flag == "protocol") toGo(`/review/planning/protocol-part-II/${id}`);

      if (flag == "protocolTwo")
        toGo(`/review/planning/protocol-part-III/${id}`);

      if (flag == "protocolThree") toGo(`/review/execution/extraction`);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDataAndReturn() {
    const id = localStorage.getItem("systematicReviewId");

    try {
      await createProtocol();
      if (flag == "protocol") toGo(`/review/planning/general-definition`);
      if (flag == "protocolTwo")
        toGo(`/review/planning/protocol/research-questions/${id}`);
      if (flag == "protocolThree")
        toGo(`/review/planning/protocol-part-II/${id}`);
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
    createProtocol,
    handleDataAndGoNext,
    handleDataAndReturn,
    setGoal,
    setJustification,
    setPopulation,
    setIntervention,
    setControl,
    setOutcome,
    setContext,
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
    goal,
    justification,
    population,
    intervention,
    control,
    outcome,
    context,
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
    setFlag,
  };
};

export default useCreateProtocol;
