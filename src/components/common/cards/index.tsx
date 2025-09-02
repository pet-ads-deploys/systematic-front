import type { CardDefaultProps } from "./types";
import styles from "./cardDefault.module.css";

export default function CardDefault({
  children,
  width = "60vw",
  height = "auto",
  backgroundColor = "transparent",
  padding = "0",
  borderRadius = "0",
  withShadow = false,
}: CardDefaultProps) {
  return (
    <section
      className={`${styles.cardContainer} ${withShadow ? styles.shadow : ""}`}
      style={{
        width,
        height,
        backgroundColor,
        padding,
        borderRadius,
        margin: "0 auto", 
      }}
    >
      {children}
    </section>
  );
}