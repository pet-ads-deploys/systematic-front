import { useContext } from "react";
import ModalContext from "./ModalContext";
import SelectionData from "../../../legacy/components/commons/toolkit/modals/execution/article/Selection/SelectionData";
import DataExtractionForm from "../../../legacy/components/commons/toolkit/modals/execution/article/Extraction/DataExtractionForm";
import SimilarStudies from "../../../legacy/components/commons/toolkit/modals/execution/article/Similarity/SimilarStudies";
import QualityForm from "../../../legacy/components/commons/toolkit/modals/execution/article/Quality/QualityForm";
import References from "../../../legacy/components/commons/toolkit/modals/execution/article/Refence/References";

export default function OtherStudyPanels() {
  const context = useContext(ModalContext);

  if (context?.PanelState == "Selection Data") return <SelectionData />;
  if (context?.PanelState == "Data Extraction Form")
    return <DataExtractionForm />;
  if (context?.PanelState == "Similar Studies") return <SimilarStudies />;
  if (context?.PanelState == "Quality Form") return <QualityForm />;
  if (context?.PanelState == "References") return <References />;
  return <></>;
}
