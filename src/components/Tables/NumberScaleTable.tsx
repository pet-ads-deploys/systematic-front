import { FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react'
import { useEffect } from 'react';

interface Props {
    handleMinimalValue: (valueAsString: string, valueAsNumber: number) => void;
    handleMaximalValue: (valueAsString: string, valueAsNumber: number) => void;
    minimalValue: number;
    maximalValue: number;
}

const NumberScaleTable = ({handleMaximalValue, handleMinimalValue, minimalValue, maximalValue}: Props) => {

    // useEffect(() => {
    //     console.log(minimalValue, maximalValue);
    // }, [])

    return (
    <FormControl>
        <FormLabel>Min</FormLabel>
        <NumberInput mb={"2rem"} defaultValue={minimalValue} onChange={handleMinimalValue} min={0} max={maximalValue-1}>
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>

        <FormLabel>Max</FormLabel>
        <NumberInput defaultValue={maximalValue} onChange={handleMaximalValue} min={minimalValue+1} max={10}>
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    </FormControl>
  )
}

export default NumberScaleTable;