import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text, Tooltip } from '@chakra-ui/react'
import { tdSX } from '../../../pages/Execution/styles/CardsStyle'
import ArticleInterface from '../../../../public/interfaces/ArticleInterface'
import { useContext } from 'react'
import AppContext from '../../Context/AppContext'

interface Props {
    articles: ArticleInterface[];
}

export default function Collapsed({articles}: Props) {
    const context = useContext(AppContext);
    const setShowSelectionModal = context?.setShowSelectionModal;
    const setSelectionStudyIndex = context?.setSelectionStudyIndex;

    if(setShowSelectionModal && setSelectionStudyIndex) 
        return (
            <TableContainer 
                width={"80%"}
                mt={5}  
                borderRadius="15px 15px 15px 15px" 
                boxShadow="lg" 
                bg="#EBF0F3"
                overflowY={'auto'}
                maxH='75vh'
            >
                <Table
                    variant="simple"
                    colorScheme="#263C56"
                    size="md"
                    boxShadow="md"
                >
                    <Thead bg="#263C56" borderRadius={10}>
                        <Tr>
                            <Th textAlign='center' color="white">ID Paper</Th>
                            <Th textAlign='center' color="white">Title</Th>
                            <Th textAlign='center' color="white">Author</Th>
                            <Th textAlign='center' color="white">Journal</Th>
                        </Tr>
                        
                    </Thead>
                    <Tbody>
                        {articles ? articles.map((e, index) => <Tr
                            onClick={() => {
                                setSelectionStudyIndex(index);
                                setShowSelectionModal(true);
                            }}
                            key={index}
                            _hover={{ bg: "#F5F8F9" }}
                            transition="background-color 0.3s, box-shadow 0.3s"
                        >

                            <Td sx={tdSX}>{e.studyReviewId}</Td>
                            
                            <Td sx={tdSX}>
                                <Tooltip label={e.title} aria-label="Título completo"
                                hasArrow
                                placement="right" // Pode ser "top", "bottom", "left", "right"
                                fontSize="xs" // Tamanho da fonte
                                p={3} // Padding do tooltip>
                                >
                                    <Text sx={tdSX}>{e.title}</Text>
                                </Tooltip>
                            </Td>

                            <Td sx={tdSX}>
                                <Tooltip label={e.authors} aria-label="Título completo"
                                    hasArrow
                                    placement="right" // Pode ser "top", "bottom", "left", "right"
                                    fontSize="xs" // Tamanho da fonte
                                    p={3} // Padding do tooltip>
                                    >
                                        <Text sx={tdSX}>{e.authors}</Text>
                                </Tooltip>
                            </Td>
                            <Td sx={tdSX}>
                                <Tooltip label={e.venue} aria-label="Título completo"
                                    hasArrow
                                    placement="right" // Pode ser "top", "bottom", "left", "right"
                                    fontSize="xs" // Tamanho da fonte
                                    p={3} // Padding do tooltip>
                                    >
                                        <Text sx={tdSX}>{e.venue}</Text>
                                </Tooltip>
                            </Td>
                            
                        </Tr>) : <p>no articles Found</p>}
                    </Tbody>
                </Table>
            </TableContainer>
        )
}
