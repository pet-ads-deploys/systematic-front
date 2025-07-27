import { useState } from "react";

export default function useAffiliattionValidation() {
  const [affiliattion, setAffiliattion] = useState("");
  const handleAffiliattionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const AffiliattionValue = e.target.value;
    setAffiliattion(AffiliattionValue);
  };
  return { affiliattion, handleAffiliattionChange };
}
