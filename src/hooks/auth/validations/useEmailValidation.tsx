import { useState } from "react";

export default function useEmailValidation() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const handleEmailchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setValidEmail(isMailValid(emailValue));
  };
  const isMailValid = (email: string) => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    return regEx.test(email);
  };

  return { email, validEmail, handleEmailchange, isMailValid };
}
