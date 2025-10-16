import {Table, Tbody, Tr, Td, TableContainer} from "@chakra-ui/react";
import DeleteButton from "@components/common/buttons/DeleteButton";
import { tbConteiner } from "./styles.ts"

interface SelectInfosTableProps {
  selectedItems: string[];
  onDeleteItem: (index: number) => void;
}

export default function SelectInfosTable({
  selectedItems,
  onDeleteItem,
}: SelectInfosTableProps) {
  return (
    <TableContainer sx={tbConteiner}>
      <Table variant="simple" size="md">
        <Tbody className="tableBody">
          {selectedItems.map((item, index) => (
            <Tr key={index}>
              <Td whiteSpace={"normal"} wordBreak={"break-word"} py={"1"}>
                {item}
              </Td>
              <Td textAlign={"right"} py={"1"}>
                <DeleteButton
                  index={index}
                  handleDelete={() => onDeleteItem(index)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}