import { ExtractionStatus } from "../../../types/enums/extractionStatus";
import { SelectionStatus } from "../../../types/enums/selectionStatus";

import useFetchStudyData from "./useFetchStudyData";
import { ExcutionFaseEnum } from "../../../types/enums/ExcutionFaseEnum";
import { StudyInterface } from "../../../types/IStudy";
import { KeywordInterface } from "../../../types/KeywordInterface";

export default function FilteredStudies(
  type: ExcutionFaseEnum
): (StudyInterface | KeywordInterface)[] | undefined {
  const studies = useFetchStudyData("../../mocks/NewStudyData.json");
  let filterStudies: StudyInterface[] = [];

  if (studies) {
    if (type == ExcutionFaseEnum.SELECTION)
      filterStudies = (studies as StudyInterface[]).filter(
        (study) => study.selectionStatus === SelectionStatus.INCLUDED
      );
    else
      filterStudies = (studies as StudyInterface[]).filter(
        (study) =>
          study.selectionStatus === SelectionStatus.INCLUDED &&
          study.extractionStatus === ExtractionStatus.INCLUDED
      );
  }
  return filterStudies as StudyInterface[];
}
