import { motion } from "framer-motion";

export interface SkeletonProps {
  width: string | number;
  height: string | number;
}

export default function SkeletonLoader({ width, height }: SkeletonProps) {
  return (
    <motion.div
      style={{
        width,
        height,
        borderRadius: "1rem",
        background: "linear-gradient(90deg, #eee, #e0e2e4, #eee)",
        backgroundSize: "200% 100%",
      }}
      animate={{
        backgroundPosition: ["200% 0%", "0% 0%"],
      }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
        ease: "linear",
      }}
    />
  );
}
