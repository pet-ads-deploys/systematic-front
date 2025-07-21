import { SetStateAction, useState } from "react";

export default function usePassWordValidation() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handlePasswordChange = (e: { target: { value: SetStateAction<string> } }) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e: { target: { value: SetStateAction<string> } }) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };
  return { password, confirmPassword, passwordMatch, handlePasswordChange, handleConfirmPasswordChange };
}
