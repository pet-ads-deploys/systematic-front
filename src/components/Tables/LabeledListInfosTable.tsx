import EditButton from "@components/common/buttons/EditButton";
import DeleteButton from "@components/common/buttons/DeleteButton";
import { useEditLabeledList } from "../../hooks/useEditLabeledList";
import { tbConteiner } from "./styles/infosTableStyles";
import { Table, Tbody, Tr, Td, TableContainer, Input } from "@chakra-ui/react";

interface InfosTableProps {
  AddTexts: Record<string, number>; // Agora é um objeto
  onDeleteAddedText: (label: string) => void; // Alterado para lidar com labels como chave
  typeField: string;
}

export default function InfosLabeled({
  AddTexts,
  onDeleteAddedText,
  typeField,
}: InfosTableProps) {
  const { editLabel, handleEdit, handleSaveEdit, editedValue, handleChange } =
    useEditLabeledList({
      AddTexts,
      onSaveEdit: (
        editedValue: { label: string; value: number },
        editLabel: string
      ) => {
        AddTexts[editLabel] = editedValue.value; // Atualizando valor do label
      },
    });

  return (
    <TableContainer sx={tbConteiner}>
      <Table variant="simple" size="md">
        <Tbody className="tableBody">
          {Object.entries(AddTexts).map(([label, value], index) => (
            <Tr key={label}>
              <Td>
                {editLabel === label ? (
                  <>
                    <Input
                      name="label"
                      value={editedValue.label}
                      onChange={handleChange}
                      placeholder="Edit label"
                    />
                    <Input
                      name="value"
                      value={editedValue.value}
                      onChange={handleChange}
                      placeholder="Edit value"
                      mt={2}
                      type="number"
                    />
                  </>
                ) : (
                  `${label}: ${value}`
                )}
              </Td>
              <Td textAlign={"right"}>
                <DeleteButton
                  index={index}
                  handleDelete={() => onDeleteAddedText(label)}
                />
                {typeField !== "select" && (
                  <EditButton
                    index={index}
                    editIndex={editLabel === label ? index : -1}
                    handleEdit={() => handleEdit(label)}
                    handleSaveEdit={handleSaveEdit}
                  />
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
