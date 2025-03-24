import { useState, useEffect } from "react";
import axios from "axios";

export function useVerifyIfLoggedIn() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const verifyLogin = async () => {
            try {
                let response = await axios.post("http://localhost:8080/api/v1/auth/refresh", {}, { withCredentials: true });
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
