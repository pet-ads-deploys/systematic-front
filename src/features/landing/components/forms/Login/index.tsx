import { useState } from "react";
import EventButton from "@components/common/buttons/EventButton";
import { useGetTokens } from "../../../../auth/services/useGetTokens";
import { FormControl, Box } from "@chakra-ui/react";
import PasswordInput from "../../../../../components/common/inputs/PasswordInput";
import FormOptions from "../FormOptions";
import RegisterInputs from "../Register/subcomponents/inputs/RegisterInputs";
import { bxconteiner, evbtn, formcontrol } from "./styles";

interface iLoginProps {
  handleRender: (renderForm: string) => void;
}
export default function Login({ handleRender }: iLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Box w={"100%"} mb={"13em"} ml={"20%"}>
      <FormControl sx={formcontrol}>
        <RegisterInputs
          id="username"
          placeholder={"username ..."}
          handlechange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <PasswordInput
          text="Password..."
          handlechange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Box sx={bxconteiner}>
          <EventButton
            event={async () => {
              console.log(password, username);
              //window.alert("Loged-in!!!");
              await useGetTokens({ password, username });
            }}
            text={"Log in"}
            sx={evbtn}
          />

          <FormOptions
            text="Forgot Password?"
            onClick={() => handleRender("Password")}
          />
        </Box>
      </FormControl>
    </Box>
  );
}
