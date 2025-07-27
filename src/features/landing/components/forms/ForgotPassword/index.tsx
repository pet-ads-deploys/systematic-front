import EventButton from "@components/common/buttons/EventButton";
import FormOptions from "../FormOptions";
import { FormControl, Box } from "@chakra-ui/react";
import RegisterInputs from "../Register/subcomponents/inputs/RegisterInputs";
import useHandleRegister from "../../../../auth/hooks/useHandleRegister";
import { bxconteiner, evbtn, formcontrolConteiner } from "./styles";

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
