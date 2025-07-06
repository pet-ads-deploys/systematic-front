import { Node, Edge, ReactFlow, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import DownloadFunnelButton from "./DowloadFunnelButton";

type Props = {
  baseNodes: Node[];
  edges: Edge[];
};

export default function FlowChart({ baseNodes, edges}: Props) {
  return (
    <ReactFlow
      nodes={baseNodes}
      edges={edges}
      fitView
      proOptions={{ hideAttribution: true }}
    >
      <Controls />
      <DownloadFunnelButton/>
    </ReactFlow>
  );
} 