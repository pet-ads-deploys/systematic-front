import { Stack, Table, TableCaption, TableContainer, Thead, Tr,Td,Tbody,Tfoot,Th } from '@chakra-ui/react'

type Column={
    label:string
}
type Study = {
  id: string;
  title: string;
  author: string;
  year: number;
  venue: string;
  source: string;
  ic: string;
};


export const IncludedStudiesTable = () => {
    const columns:Column[]=[
    {label:"Id"},
    {label:"Title"},
    {label:"Author"},
    {label:"Year"},
    {label:"Venue"},
    {label:"Source"},
     {label:"IC"},
];

  const studies: Study[] = [
    {
      id: '001',
      title: 'A Survey on Deep Learning in Medical Imaging',
      author: 'Zhang et al.',
      year: 2021,
      venue: 'IEEE Transactions on Medical Imaging',
      source: 'IEEE',
      ic: 'IC1',
    },
    {
      id: '002',
      title: 'Understanding Transformer Models',
      author: 'Vaswani et al.',
      year: 2017,
      venue: 'NeurIPS',
      source: 'Scopus',
      ic: 'IC2',
    },
    {
      id: '003',
      title: 'A Comparative Study of ML Algorithms',
      author: 'Nguyen et al.',
      year: 2020,
      venue: 'ACM Computing Surveys',
      source: 'ACM Digital Library',
      ic: 'IC3',
    },
    {
      id: '004',
      title: 'Data Augmentation Techniques in NLP',
      author: 'Liu and Wang',
      year: 2022,
      venue: 'Journal of AI Research',
      source: 'Web of Science',
      ic: 'IC4',
    },
    {
      id: '005',
      title: 'Edge Computing in IoT Applications',
      author: 'Kumar et al.',
      year: 2019,
      venue: 'IEEE Internet of Things Journal',
      source: 'IEEE',
      ic: 'IC5',
    },
    {
      id: '006',
      title: 'Secure Federated Learning Frameworks',
      author: 'Singh et al.',
      year: 2023,
      venue: 'Elsevier Computer Networks',
      source: 'Web of Science',
      ic: 'IC1,IC3',
    },
    {
      id: '007',
      title: 'Ethical Challenges in AI Deployment',
      author: 'Brown and Smith',
      year: 2021,
      venue: 'AI & Society',
      source: 'Springer',
      ic: 'IC7',
    },
    {
      id: '008',
      title: 'Explainable AI: Techniques and Trends',
      author: 'Garcia et al.',
      year: 2022,
      venue: 'ACM Journal of Data Science',
      source: 'ACM Digital Library',
      ic: 'IC8',
    },
  ];
    return (
 <TableContainer>
  <Table>
    <Thead>
        <Tr>
            {columns.map((column)=>
            <Th key={column.label}>{column.label}</Th>
            )}
            
        </Tr>
    </Thead>
    <Tbody>
      {studies.map((studies)=>(
        <Tr key={studies.id} _hover={{ bg: 'gray.300' }}>
          <Td>{studies.id}</Td>
          <Td>{studies.title}</Td>
          <Td>{studies.author}</Td>
          <Td>{studies.year}</Td>
          <Td>{studies.venue}</Td>
          <Td>{studies.source}</Td>
          <Td>{studies.ic}</Td>

        </Tr>
      ))}
        
    </Tbody>
  </Table>
</TableContainer>
  )
}
