// External library
import { ImFileText2 } from "react-icons/im";

export default function CardIcon() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "5rem",
        height: "5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "3rem",
          height: "3rem",
          backgroundColor: "#EDF2F7",
          borderRadius: ".25rem",
        }}
      >
        <ImFileText2 color="black" size="1.75rem" />
      </div>
    </div>
  );
}
