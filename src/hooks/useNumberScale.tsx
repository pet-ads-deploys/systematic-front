import { useState } from 'react'

const useNumberScale = () => {
  const [ minimalValue, setMinimalValue ] = useState(0);
  const [ maximalValue, setMaximalValue] = useState(10);

  function handleMinimalValue(valueAsString: string, valueAsNumber: number){
    if (!isNaN(valueAsNumber)) {
        setMinimalValue(valueAsNumber);
    }
}

function handleMaximalValue(valueAsString: string, valueAsNumber: number){
    if (!isNaN(valueAsNumber)) {
        setMaximalValue(valueAsNumber);
    }
}

  return { handleMaximalValue, handleMinimalValue, minimalValue, maximalValue };
}

export default useNumberScale;