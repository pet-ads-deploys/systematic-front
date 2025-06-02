import { Stack, Table, TableCaption, TableContainer, Thead, Tr,Td,Tbody,Tfoot,Th } from '@chakra-ui/react'
import  { useEffect, useState } from 'react'
import useFetchDataBases from '../../../hooks/fetch/useFetchDataBases';
import { fetchStudiesBySource, HttpResponse } from '../../../hooks/reports/fetchStudiesBySources';

type Column={
    label:string
}
type Descripition={
    included: number,
    excluded: number,
    total: number,
    indexingRate: string,
    precisionRate:string
}


export const SearchSorcesTable = () => {
const { databases } = useFetchDataBases();
  const [loading, setLoading] = useState(true);
  const [studiesData, setStudiesData] = useState<HttpResponse[]>([]);
  const [dataStatistics, setDataStatistics] = useState<Descripition>({  
  included: 0,
  excluded: 0,
  total: 0,
  indexingRate: "0",
  precisionRate: "0"});

  const columns:Column[]=[
    {label:"Source"},
    {label:"Included"},
    {label:"Excluded"},
    {label:"Total"},
    {label:"Indexing Rate"},
    {label:"Precision Rate"},
];


  useEffect(() => {
    const loadData = async () => {
      setLoading(true); 
      if (databases.length === 0) return;

      try {
        const data = await fetchStudiesBySource(databases);
        setStudiesData(data);
      } catch (error) {
        console.error("Erro ao carregar gráfico:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [databases]);
  
 useEffect(() => {
  const includedTotal = studiesData.reduce((sum, data) => sum + data.included.length, 0);
  const excludedTotal = studiesData.reduce((sum, data) => sum + data.excluded.length, 0);
  const total = studiesData.reduce((sum, data) => sum + data.totalOfStudies, 0);
  const indexingRate = "0";
  const precisionRate = total > 0 ? ((includedTotal / total) * 100).toFixed(2) : "0";
  setDataStatistics({
    included: includedTotal,
    excluded: excludedTotal,
    total: total,
    indexingRate: indexingRate,
    precisionRate: precisionRate,
  });
}, [studiesData]); 


  return (
 <TableContainer>
  <Table variant='simple' >
    <Thead>
        <Tr>
            {columns.map((column)=>(
            <Th key={column.label} >{column.label} </Th>
        ))}
        </Tr>
    </Thead>
    <Tbody >
        {
            studiesData.map((data)=>(
                <Tr key= {data.source} _hover={{ bg: 'gray.300' }}>
                    <Td>{data.source}</Td>
                    <Td>{data.included.length}</Td>
                    <Td>{data.excluded.length}</Td>
                    <Td>{data.totalOfStudies}</Td>
                    <Td>...%</Td>
                    <Td>{(data.included.length/data.totalOfStudies*100).toFixed(2)}%</Td>
                </Tr>
            ))
        }
    </Tbody>
    <Tfoot bg="gray.300" fontWeight="bold">
      <Td>All Studies</Td>
      <Td>{dataStatistics.included}</Td>
      <Td>{dataStatistics.excluded}</Td>
      <Td>{dataStatistics.total}</Td>
      <Td>{dataStatistics.indexingRate}%</Td>
      <Td>{dataStatistics.precisionRate}%</Td>

    </Tfoot>

  </Table>
</TableContainer>
  )
}
