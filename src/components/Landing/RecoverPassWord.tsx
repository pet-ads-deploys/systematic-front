import EventButton from "../Buttons/EventButton";
import FormOptions from "./subcomponents/FormOptions";
import { FormControl, Box } from "@chakra-ui/react";
import RegisterInputs from "./subcomponents/inputs/RegisterInputs";
import useHandleRegister from "../../hooks/validation/useHandleRegister";
import { bxconteiner, evbtn, formcontrolConteiner } from "./styles/recoverStyles";

interface iRecoverProps {
  handleRender: (renderForm: string) => void;
}

export default function RecoverPassWord({ handleRender }: iRecoverProps) {
  const { handleEmailChange } = useHandleRegister(() => {});
  return (
    <Box w={"100%"} mb={"13em"} ml={"20%"}>
      <FormControl sx={formcontrolConteiner}>
        <RegisterInputs
          id="mail"
          placeholder={"Email ..."}
          handlechange={handleEmailChange}
        />
        <Box sx={bxconteiner}>
          <EventButton
            event={() => {
              window.alert("Recover mail sent!!!");
            }}
            text={"Recover Password"}
            sx={evbtn}
          />
          <FormOptions text={"Back"} onClick={() => handleRender("Login")} />
        </Box>
      </FormControl>
    </Box>
  );
}
