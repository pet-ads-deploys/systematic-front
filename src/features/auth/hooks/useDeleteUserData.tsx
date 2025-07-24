export default function useDeleteUserData() {
  function deleteUserData() {
    localStorage.removeItem("username");
    localStorage.removeItem("myReviewsLink");
    localStorage.removeItem("myRevisionsLink");
  }

  return deleteUserData;
}
