export const Cardstyles = {
  display: "flex",
  flexDirection: { base: "column", md: "row" },
  // alignItems: "center",
  alignItems: { base: "left", md: "center" },
  justifyContent: "space-between",

  w: { base: "100%", sm: "90%", md: "750px", lg: "950px" },
  // minH: { base: "auto", md: "3vh" },
  h: { base: "25vh", md: "10vh" },

  borderRadius: "0",
  boxShadow: "none",
  // border: "1px solid #E2E8F0",
  borderBottom: "1px solid #E2E8F0",
  borderTop: "1px solid #E2E8F0",
  bgColor: "white",
  padding: "1rem",
  gap: { base: ".25rem", md: "1rem" },
};

export const CardInfosConteiner = {
  flex: 1,
  display: "flex",
  justifyContent: { base: "center", md: "flex-start" },
  alignItems: "center",
  px: 4,
  py: 2,
};
