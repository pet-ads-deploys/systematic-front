// External library
import { jwtDecode } from "jwt-decode";

// Types
import type { UserData } from "../types";

interface DecodeTokenProps {
  decodeToken: (tokenEntry: string) => UserData;
  checkTokenExpiration: (tokenEntry: Pick<UserData, "exp">) => boolean;
}

export default function useDecodeToken(): DecodeTokenProps {
  const decodeToken = (tokenEntry: string) => {
    return jwtDecode<UserData>(tokenEntry);
  };

  const hasValidToken = (tokenEntry: Pick<UserData, "exp">) => {
    return tokenEntry.exp * 1000 > Date.now();
  };

  return { decodeToken, checkTokenExpiration: hasValidToken };
}
