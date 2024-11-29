import { Flex } from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";
import DefaultNavigation from "./subcomponents/DefaultNav";
import AccordionNav from "./subcomponents/AccordionNavigation";
import UserInfos from "./subcomponents/UserInfos";
import MenuButton from "./subcomponents/MenuButton";
import { LARGE_SIZE, SMALL_SIZE, conteiner, content } from "./styles/sidebarStyles";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import "./styles.css"
import { Navigation } from "./Navigation";
import { MenuToggle } from "./MenuToggle";
import AppContext from "../../Context/AppContext";

interface ISidebarProps {
  type: string;
  defaultOpen: number;
}

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export default function Sidebar({defaultOpen, type}: ISidebarProps): JSX.Element {
  const context = useContext(AppContext);
  if(!context) {
    throw new Error("Failed to get the app context on sidebar");
  }
  const { sidebarState, setSidebarState } = context;
  const [isOpen, toggleOpen] = useCycle(false, true); 
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef); 
  const [navSize, setNavSize] = useState(LARGE_SIZE);

  const toggleNavSize = (): void => {
    setNavSize(navSize === SMALL_SIZE ? LARGE_SIZE : SMALL_SIZE);
  };

  const handleSidebarToggle = () => {
    console.log("Antes da mudança de estado:", sidebarState);

    if (sidebarState === 'open') {
      setSidebarState('collapsed'); 
    } else if (sidebarState === 'collapsed') {
      setSidebarState('open'); 
    } else {
      setSidebarState('semi-collapsed');
    }
  };

  return (
    <motion.div initial={false} animate={sidebarState} variants={sidebar} style={{ width: sidebarState === 'open' ? "350px" : "140px", transition: !isOpen ? "0s" : "1.5s" }}>
      <motion.nav
        initial={false}
        animate={sidebarState === 'open' ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        style={{ margin: "20px" }}
      >
        <motion.div
          initial={false}
          className="background"
          variants={sidebar}
          style={{ borderRadius: "30px" }}
        />
        <Navigation defaultOpen={defaultOpen} type={type} />
        {/* Passando a função handleSidebarToggle para o MenuToggle */}
        <MenuToggle toggle={handleSidebarToggle} />
      </motion.nav>
    </motion.div>
  );
}