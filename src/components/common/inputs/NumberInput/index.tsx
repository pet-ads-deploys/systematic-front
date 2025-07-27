import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'

interface INumberInputProps {
    label: string;
    value?: number;
  }

export default function SNumberInput({label, value}: INumberInputProps) {

  console.log(value);

    return (
      <FormControl maxW={"60vw"}>
        <FormLabel>{label}</FormLabel>
          <NumberInput value={value} size='md' maxW={24}>
              <NumberInputField/>
              <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
              </NumberInputStepper>
          </NumberInput>
      </FormControl>
    );
}