import { useState } from "react";

export default function useNameValidation() {
  const [name, setName] = useState("");
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    setName(nameValue);
  };
  return { name, handleNameChange };
}
