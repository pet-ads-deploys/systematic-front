import { ExtractionStatus } from "../../../public/enums/extractionStatus";
import { SelectionStatus } from "../../../public/enums/selectionStatus";
import { StudyInterface } from "../../../public/interfaces/IStudy";
import { KeywordInterface } from "../../../public/interfaces/KeywordInterface";
import useFetchStudyData from "./useFetchStudyData";
import { ExcutionFaseEnum } from "../../../public/enums/ExcutionFaseEnum";

export default function FilteredStudies(
  type: ExcutionFaseEnum
): (StudyInterface | KeywordInterface)[] | undefined {
  const studies = useFetchStudyData("../../../public/mocks/NewStudyData.json");
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
