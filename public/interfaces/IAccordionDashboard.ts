import { KeyedMutator } from "swr";

export default interface IAcordionDashboard {
  type: string;
  sessions: {
    id: string;
    systematicStudyd: string;
    userId: string;
    searchString: string;
    additionalInfo: string;
    timestamp: string;
    source: string;
    numberOfRelatedStudies: number;
  }[];
  mutate: KeyedMutator<
    {
      id: string;
      systematicStudyd: string;
      userId: string;
      searchString: string;
      additionalInfo: string;
      timestamp: string;
      source: string;
      numberOfRelatedStudies: number;
    }[]
  >;
}
