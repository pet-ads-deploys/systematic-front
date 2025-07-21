import { useVerifyIfLoggedIn } from "../services/useVerifyIfLoggedIn";

export default async function useRecoverUserData(
  setUsername: React.Dispatch<React.SetStateAction<string | null>>
) {
  const userData = localStorage.getItem("username");
  const verifyIfLoggedInResponse = await useVerifyIfLoggedIn();

  if (verifyIfLoggedInResponse.isLoggedIn) setUsername(userData);
  else {
    localStorage.clean();
    setUsername(userData);
  }
}
