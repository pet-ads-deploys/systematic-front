import { useState } from "react";

import { useNavigate } from "react-router-dom";
import useLoginUser from "../services/useLoginUser";
import userToLoginProp from "../../../types/userToLogin";

export default function useHandleLogin() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isValid = error === "" && username !== "" && password !== "";
  const data: userToLoginProp = {
    username: username,
    password: password,
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username == "") {
      setUsernameError("Please, enter with your username");
    } else {
      setUsernameError("");
    }

    if (password == "") {
      setPasswordError("Please, enter with your password");
    } else if (password.length < 4) {
      setPasswordError("password need to have more than 6 letters");
      return;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      setIsSubmitting(true);
      try {
        const response = await useLoginUser(data);
        if ((await response).status == 200) {
          localStorage.setItem("accessToken", response.data.accessToken);
          navigate("/user");
        }
      } catch (err: any) {
        console.error(err.message);
        setError("Wrong username or password");
        setUsername("");
        setPassword("");
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  return {
    username,
    setUsername,
    password,
    setPassword,
    usernameError,
    setUsernameError,
    passwordError,
    setPasswordError,
    handleSubmit,
    error,
    setError,
    isSubmitting,
  };
}
