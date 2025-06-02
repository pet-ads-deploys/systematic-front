import { motion } from "framer-motion";
import { LARGE_SIZE } from "./styles/sidebarStyles";
import DefaultNavigation from "./subcomponents/DefaultNav";
import AccordionNav from "./subcomponents/AccordionNavigation";

interface ISidebarProps {
    type: string;
    defaultOpen: number;
}

const variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

export const MenuItem = ({ defaultOpen, type }: ISidebarProps) => {
    return (
        <motion.li
            variants={variants}
        >
            {type === "Default" && <DefaultNavigation navSize={LARGE_SIZE} />}
            {type === "Accordion" && <AccordionNav navSize={LARGE_SIZE} defaultOpen={defaultOpen} />}

        </motion.li>
    );
};