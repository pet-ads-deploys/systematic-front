import { useEffect, useState } from "react";

interface IStudyData {
  title: string;
  authors: string[];
  year: string;
  venue: string;
  abstract: string;
  keywords: string[];
  studyType: string;
}

export default function useFilteredStudyData(rowData: (string | number)[], studyData: IStudyData[] | null) {
  const [selectedStudyData, setSelectedStudyData] = useState<IStudyData | null>(null);
  const [filteredStudyData, setFilteredStudyData] = useState<IStudyData[]>([]);

  useEffect(() => {
    if (rowData && studyData) {
      const filteredData = studyData.filter((data: IStudyData) => data.title === rowData[0]);
      setFilteredStudyData(filteredData);
      setSelectedStudyData(filteredData[0]);
    }
  }, [rowData, studyData]);

  return { filteredStudyData, selectedStudyData };
}
