

import { Node,Edge, ReactFlow,Controls,  } from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import { useFetchStudiesFunnel } from '../../../hooks/reports/useFetchStudiesFunnel';
import { Text } from '@chakra-ui/react';
import { useMemo } from 'react';

const nodes: Node[] = [
  { id: '1',  data: { label: 'Number of studies identified in searched sources ' }, position: { x: 50, y: 50 } },
  { id: '2',  data: { label: 'Number of studies identified in additional sources ' }, position: { x: 350, y: 50 } },
  { id: '3', data: { label: 'Number of studies after removing duplicates ' }, position: { x: 200, y: 150 } },
  { id: '4', data: { label: 'Number of studies screened ' }, position: { x: 200, y: 250 } },
  { id: '5', data: { label: 'Studies excluded ' }, position: { x: 400, y: 250 } },
  { id: '6', data: { label: 'Full-text studies assessed for eligibility ' }, position: { x: 200, y: 350 } },
  { id: '7', data: { label: 'Full-text studies excluded with reasons'  }, position: { x: 480, y: 350 } },
  { id: '8', data: { label: 'Studies included in qualitative synthesis ' }, position: { x: 200, y: 450 } },
  { id: '9', data: { label: 'Studies included in quantitative synthesis (meta-analysis)' }, position: { x: 200, y: 550 } },
];


const edges: Edge[] = [
  { id: 'e1_3', source: '1', target: '3' },
  { id: 'e2_3', source: '2', target: '3' },
  { id: 'e3_4', source: '3', target: '4' },
  { id: 'e4_5', source: '4', target: '5' },
  { id: 'e4_6', source: '4', target: '6' },
  { id: 'e6_7', source: '6', target: '7' },
  { id: 'e6_8', source: '6', target: '8' },
  { id: 'e8_9', source: '8', target: '9' },
];

export default function FlowChart() {
  const {funnelData,isLoading}= useFetchStudiesFunnel();
  const indetifiedStudiesTotal=Object.values(funnelData?.totalIdentifiedBySource ??{}).reduce((acc,studies)=>(acc+studies),0);
  const uniqueStudiesTotal=Object.values(funnelData?.totalAfterDuplicatesRemovedBySource??{}).reduce((acc,studies)=>(acc+studies),0);
  
  const flowChartData=[
    indetifiedStudiesTotal,
    -1,
    uniqueStudiesTotal,
    funnelData?.totalScreened,
    funnelData?.totalExcludedInScreening,
    funnelData?.totalFullTextAssessed,
    funnelData?.totalExcludedInFullText,
    funnelData?.totalIncluded,
    -1
  ]
const completedNodes = useMemo(() => {
  return nodes.map((node, index) => {
    const value = flowChartData[index];
    return {
      ...node,
      data: {
        ...node.data,
        label: node.data.label+ `(n=${value})`,
      },
    };
  });
}, [funnelData]);


  if(isLoading)
    return <Text>Loading chart...</Text>


  return (
      <ReactFlow  nodes={completedNodes} edges={edges} fitView proOptions={{ hideAttribution: true }} >
        <Controls />
      </ReactFlow>
    
  );
  
  

}

 
