import { StudyType } from "../../public/enums/studyType";
//import { CriteriaType } from "../enums/criteriaType";
import { ReadingPriority } from "../../public/enums/readingPriority";
import { SelectionStatus } from "../../public/enums/selectionStatus";
import { ExtractionStatus } from "../../public/enums/extractionStatus";

export interface StudyInterface {
  studyId: number;
  systematicStudyId: number;
  studyType: StudyType;
  title: string;
  year: number;
  authors: string;
  venue: string;
  abstract: string;
  doi?: string | null;
  keywords: string[];
  searchSources: string[];
  references: string[];
  criteria: string[] /*CriteriaType*/;
  formAnswers: unknown[]; // Defina o tipo correto para a resposta do formulário
  robAnswers: unknown[]; // Defina o tipo correto para a resposta do ROB
  comments: string;
  readingPriority: ReadingPriority;
  selectionStatus: SelectionStatus;
  extractionStatus: ExtractionStatus;
}
