import type { CardDefaultProps } from "./types";
import styles from "./cardDefault.module.css";

export default function CardDefault({
  children,
  width = "calc(100% - 1.5rem)",
  height = "calc(100% - 1rem)",
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
        borderRadius,
        margin: "0 auto",
      }}
    >
      <div
        className={styles.innerContent}
        style={{
          width: "100%",
          height: "100%",
          padding,
        }}
      >
        {children}
      </div>
    </section>
  );
}
