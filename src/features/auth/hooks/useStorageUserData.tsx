// Types
import type { AccessCredentials } from "../types";

export default function useStorageUserData(data: AccessCredentials) {
  function storageUserData() {
    localStorage.setItem("username", data.username);
    const dado = localStorage.getItem("username");
    console.log("nome armazenado", dado);
  }

  return storageUserData;
}
