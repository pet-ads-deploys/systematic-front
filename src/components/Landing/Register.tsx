import SelectInput from "../Inputs/SelectInput";
import EventButton from "@components/common/buttons/EventButton";
import { FormControl, Box } from "@chakra-ui/react";
import PasswordInput from "../Inputs/PasswordInput";
import FormOptions from "./subcomponents/FormOptions";
import RegisterInputs from "./subcomponents/inputs/RegisterInputs";
import useHandleRegister from "../../features/auth/hooks/useHandleRegister";
import { bxconteiner, evbtn, formcontrol } from "./styles/RegisterStyle";

interface iRegisterProps {
  handleRender: (renderForm: string) => void;
}

export default function Register({ handleRender }: iRegisterProps) {
  const {
    handleNameChange,
    selectedValue,
    setState,
    handleEmailChange,
    handleAffiliationChange,
    passwordMatch,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleRegister,
  } = useHandleRegister(() => handleRender("Register"));
  return (
    <>
      <form onSubmit={handleRegister}>
        <FormControl sx={formcontrol}>
          <RegisterInputs
            id="nome"
            placeholder={"Name ..."}
            handlechange={handleNameChange}
          />
          <RegisterInputs
            id="mail"
            placeholder={"Email ..."}
            handlechange={handleEmailChange}
          />
          <RegisterInputs
            id="affiliation"
            placeholder={"Affiliation ..."}
            handlechange={handleAffiliationChange}
          />

          <SelectInput
            values={[
              "Select a country",
              "Brazil",
              "England",
              "France",
              "Spain",
            ]}
            names={["Select a country", "Brazil", "England", "France", "Spain"]}
            onSelect={(value: string) => setState(value)}
            selectedValue={selectedValue}
            page={"register"}
          />
          <PasswordInput
            text="Password..."
            handlechange={handlePasswordChange}
            isValid={passwordMatch}
          />
          <PasswordInput
            text="Confirm  password... "
            handlechange={handleConfirmPasswordChange}
            isValid={passwordMatch}
          />

          <Box sx={bxconteiner}>
            <EventButton type="submit" text="Create Account" sx={evbtn} />
            <FormOptions
              text="Already have an account? "
              onClick={() => handleRender("Login")}
            />
          </Box>
        </FormControl>
      </form>
    </>
  );
}
