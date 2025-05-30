import { useState } from 'react'

const useNumberScale = () => {
  const [minimalValue, setMinimalValue] = useState(0);
  const [maximalValue, setMaximalValue] = useState(10);

  // valueAsString: string
  function handleMinimalValue(valueAsNumber: number) {
    if (!isNaN(valueAsNumber)) {
      setMinimalValue(valueAsNumber);
    }
  }
  // valueAsString: string
  function handleMaximalValue(valueAsNumber: number) {
    if (!isNaN(valueAsNumber)) {
      setMaximalValue(valueAsNumber);
    }
  }

  return { handleMaximalValue, handleMinimalValue, minimalValue, maximalValue };
}

export default useNumberScale;