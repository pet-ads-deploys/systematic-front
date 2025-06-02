import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

interface ISidebarProps {
    type: string;
    defaultOpen: number;
  }

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export const Navigation = ({defaultOpen, type} : ISidebarProps) => (
  <motion.ul variants={variants}>
      <MenuItem defaultOpen={defaultOpen} type={type} />
  </motion.ul>
);
