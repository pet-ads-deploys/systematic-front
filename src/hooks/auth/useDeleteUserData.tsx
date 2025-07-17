export default function useDeleteUserData() {

    function deleteUserData() {
        localStorage.removeItem("username");
        localStorage.removeItem("myReviewsLink");
        localStorage.removeItem("myRevisionsLink");
        console.log("dados apagados")
    }

    return deleteUserData;
}