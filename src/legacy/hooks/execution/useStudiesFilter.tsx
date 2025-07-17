import { StudyInterface } from "../../../../public/interfaces/IStudy";

interface StudieFilterProps {
  studiesToFilter: StudyInterface[];
  searchString: string;
  tableType: string;
  filterStatus: string | null;
}

export default function useStudiesFilter({
  studiesToFilter,
  searchString,
  tableType,
  filterStatus,
}: StudieFilterProps): StudyInterface[] {
  if (tableType == "selection")
    studiesToFilter = studiesToFilter.filter(
      (study) => (study as StudyInterface).selectionStatus == filterStatus
    );
  if (tableType == "extraction")
    studiesToFilter = studiesToFilter.filter(
      (study) => (study as StudyInterface).extractionStatus == filterStatus
    );

  if (!searchString) return studiesToFilter;
  return studiesToFilter.filter((study) => study.title.includes(searchString));
}
