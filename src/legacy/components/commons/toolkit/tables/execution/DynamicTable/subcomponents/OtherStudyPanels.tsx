import { useContext } from "react";
import ModalContext from "../../../../../../../context/ModalContext";
import SelectionData from "../../../../modals/execution/article/Selection/SelectionData";
import DataExtractionForm from "../../../../modals/execution/article/Extraction/DataExtractionForm";
import SimilarStudies from "../../../../modals/execution/article/Similarity/SimilarStudies";
import QualityForm from "../../../../modals/execution/article/Quality/QualityForm";
import References from "../../../../modals/execution/article/Refence/References";

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
