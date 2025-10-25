  // Components
import InputText from "@components/common/inputs/InputText";
import NavButton from "@components/common/buttons/NavigationButton";
import InputTextArea from "@components/common/inputs/InputTextArea";
import AlertInputText from "@components/common/inputs/AlertInputText";
import ProtocolFormLayout from "../../components/common/protocolForm";

// Pages component
import ResearcherFilter from "./subcomponents/ResearcherFilter";

// Service
import useCreateReview from "../../services/useStructureReview";

export default function GeneralDefinition() {
  const {
    generalDefinition,
    handleChangeGeneralDefinition,
    handlePost,
    handlePut,
    isReturn,
    isTitleValid,
  } = useCreateReview();

  const { title, description, objectives } = generalDefinition;

  return (
    <ProtocolFormLayout
      headerText="Protocol: General Definition"
      navButtons={(
        <>
          {!isReturn ? (
            <NavButton event={handlePost} text="Create new Review" />
          ) : (
            <NavButton event={handlePut} text="Next" />
          )}
        </>
      )}
    >
      {isTitleValid ? (
        <InputText
          value={title}
          label="Title"
          placeholder="Enter review title"
          type="text"
          nome="text"
          onChange={(event) =>
            handleChangeGeneralDefinition("title", event.target.value)
          }
          labelAbove={true}
        />
      ) : (
        <AlertInputText
          border="red"
          value={title}
          label="Title is required"
          placeholder="Enter review title"
          type="text"
          nome="text"
          onChange={(event) =>
            handleChangeGeneralDefinition("title", event.target.value)
          }
          labelAbove={true}
        />
      )}

      <InputTextArea
        value={description}
        label="Description"
        placeholder="Enter review description"
        onChange={(event) =>
          handleChangeGeneralDefinition("description", event.target.value)
        }
      />

      <InputTextArea
        value={objectives}
        label="Objectives"
        placeholder="What are your goals?"
        onChange={(event) =>
          handleChangeGeneralDefinition("objectives", event.target.value)
        }
      />
      <ResearcherFilter />
    </ProtocolFormLayout>
  );
}
