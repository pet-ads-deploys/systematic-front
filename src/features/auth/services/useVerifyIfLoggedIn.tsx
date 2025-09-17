// External library
import { useState, useEffect } from "react";

// Service
import Axios from "../../../infrastructure/http/axiosClient";

export function useVerifyIfLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const response = await Axios.post("auth/refresh", {});
        console.log(response);
        if (response.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Login verification failed:", err);
        setIsLoggedIn(false);
      } finally {
        setIsChecking(false);
      }
    };

    verifyLogin();
  }, []);

  return { isLoggedIn, isChecking };
}
