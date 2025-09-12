// styles.ts
export const conteiner = {
  mt: 5,
  w: "100%", // pega só o espaço disponível no FlexLayout
  h: "calc(100vh - 7.5rem)",
};

export const dataBaseconteiner = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(32rem, 1fr))",
  justifyContent: "start", 
  boxSizing: "border-box",
  w: "100%",
  gap: "2rem",
  mt: 10,
  h: "100%",
  margin: "0 !important",
  maxHeight: "calc(100vh - 1.5rem)",
  padding: "2rem",
};