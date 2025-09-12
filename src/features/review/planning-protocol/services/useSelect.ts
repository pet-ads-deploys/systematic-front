import { useState, useEffect } from "react";
import useCreateProtocol from "./useCreateProtocol";
import Axios from "../../../../infrastructure/http/axiosClient";
import useToaster from "@components/feedback/Toaster";

export function useSelect(initialState: string[] = [], context: string) {
  const { sendSelectData } = useCreateProtocol();
  const toast = useToaster();

  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState<string[]>(initialState);

  useEffect(() => {
    const id = localStorage.getItem("systematicReviewId");
    const url = `systematic-study/${id}/protocol`;

    async function fetchSelectedValues() {
      const token = localStorage.getItem("accessToken");
      const options = {
        headers: { Authentication: `Bearer ${token}` },
      };
      let response = await Axios.get(url, options);

      if (context == "Languages") {
        setSelectedValues(response.data.content.studiesLanguages);
      } else setSelectedValues(response.data.content.informationSources);
    }

    fetchSelectedValues();
  }, []);

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleSelectAddButtonClick = () => {
    if (selectedValue === null) {
      toast({
        title: "Empty Field",
        description: "The field must be filled!",
        status: "warning",
      });
      return;
    }
    if (selectedValues.includes(`${selectedValue}`)) {
      toast({
        title: "Duplicate option",
        description: "This option already selected!",
        status: "warning",
      });
      setSelectedValue(null);
      return;
    }

    const updatedValues = [...selectedValues, selectedValue];
    setSelectedValues(updatedValues);
    sendSelectData(updatedValues, context);

    setSelectedValue(null);
  };

  const handleDeleteSelect = (index: number) => {
    setSelectedValues((prevSelectedValues) => {
      const updatedSelectedValues = [...prevSelectedValues];
      updatedSelectedValues.splice(index, 1);

      sendSelectData(updatedSelectedValues, context);

      return updatedSelectedValues;
    });
  };

  return {
    selectedValue,
    selectedValues,
    handleSelectChange,
    handleSelectAddButtonClick,
    handleDeleteSelect,
  };
}
