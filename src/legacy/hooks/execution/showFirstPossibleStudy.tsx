import FilteredStudies from "./FilteredStudies";
import { ExcutionFaseEnum } from "../../../../public/enums/ExcutionFaseEnum";
import { StudyInterface } from "../../../types/IStudy";

export default function showFirstPossibleStudy(
  type: ExcutionFaseEnum
): StudyInterface | undefined {
  const studies = FilteredStudies(type);
  return (studies as StudyInterface[])[0];
}
