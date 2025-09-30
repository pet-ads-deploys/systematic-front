// External library
import { useState } from "react";

// Hooks
import { useAuth } from "@features/auth/hooks/useAuth";
import { useNavigation } from "@features/shared/hooks/useNavigation";

// Constants
import { PASSWORD_LENGHT } from "@features/auth/constants/user";

// Types
import type { AccessCredentials } from "@features/auth/types";

// Guards
import { isLeft } from "@features/shared/errors/pattern/Either";
import useToaster from "@components/feedback/Toaster";

export default function useHandleLogin() {
  const [credentials, setCredentials] = useState<AccessCredentials>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toGo } = useNavigation();
  const result = useAuth();
  const Toaster = useToaster();

  const handleChangeCredentials = (
    field: keyof typeof credentials,
    value: string
  ) => {
    setCredentials((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateFields = () => {
    const errors = {
      username: "",
      password: "",
      general: "",
    };

    if (!credentials.username) {
      errors.username = "Please, enter your username";
    }

    if (!credentials.password) {
      errors.password = "Please, enter your password";
    }

    if (
      credentials.password.length < PASSWORD_LENGHT.MIN ||
      credentials.password.length > PASSWORD_LENGHT.MAX
    ) {
      errors.password = `Password must be at least ${PASSWORD_LENGHT.MIN} characters and at most ${PASSWORD_LENGHT.MAX} characters`;
    }

    setErrors((prev) => ({ ...prev, ...errors }));
    return (
      errors.username === "" && errors.password === "" && errors.general === ""
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateFields()) return;

    setIsSubmitting(true);
    try {
      if (isLeft(result)) return;

      const { login } = result.value;

      const loginResult = await login(credentials);

      if (isLeft(loginResult)) {
        const errorMessage = loginResult.value.message;
        setErrors((prev) => ({
          ...prev,
          general: errorMessage,
        }));
        handleChangeCredentials("password", "");
        Toaster({
          title: "Login failed",
          description: errorMessage,
          status: "error",
        });
        return;
      }
      toGo("/home");

      setIsSubmitting(false);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: "Wrong username or password",
      }));
      handleChangeCredentials("password", "");
      Toaster({
        title: "Login failed",
        description: "Incorrect username or password.",
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    credentials,
    errors,
    isSubmitting,
    handleChangeCredentials,
    handleSubmit,
  };
}
