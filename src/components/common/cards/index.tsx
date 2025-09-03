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
    <section className={styles.cardContainer}>
      <div
        className={withShadow ? styles.shadow : undefined}
        style={{
          width,             
          height,            
          backgroundColor,
          padding,
          borderRadius,
          margin: "0 auto",   
          overflowY: "auto",  
          overflowX: "hidden",
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </section>
  );
}