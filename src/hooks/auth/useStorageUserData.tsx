import userToLoginProp from "../../../public/interfaces/userToLogin";

export default function useStorageUserData(data: userToLoginProp) {

    function storageUserData() {
        localStorage.setItem("username",data.username);
        console.log("username storage")
    }

    return storageUserData;
}