interface Criterion {
    description: string;
    type: string;
  }
  
  interface Picoc {
    population: string;
    intervention: string;
    control: string;
    outcome: string;
    context: string;
  }
  
  export interface Protocol {
    id: string;
    systematicStudy: string;
    goal: string;
    justification: string;
    researchQuestions: string[];
    keywords: string[];
    searchString: string;
    informationSources: string[];
    sourcesSelectionCriteria: string;
    searchMethod: string;
    studiesLanguages: string[];
    studyTypeDefinition: string;
    selectionProcess: string;
    eligibilityCriteria: Criterion[];
    dataCollectionProcess: string;
    analysisAndSynthesisProcess: string;
    extractionQuestions: string[];
    robQuestions: string[];
    picoc: Picoc;
  }