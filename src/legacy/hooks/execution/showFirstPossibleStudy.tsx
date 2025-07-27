import FilteredStudies from "./FilteredStudies";
import { ExcutionFaseEnum } from "../../../features/review/shared/types/enums/ExcutionFaseEnum";
import { StudyInterface } from "../../../features/review/shared/types/IStudy";

export default function showFirstPossibleStudy(
  type: ExcutionFaseEnum
): StudyInterface | undefined {
  const studies = FilteredStudies(type);
  return (studies as StudyInterface[])[0];
}
