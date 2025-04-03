import { Box, Flex } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import StudySelectionArea from "../StudySelectionArea";
import ArticleInterface from "../../../../../public/interfaces/ArticleInterface";
import { PageLayout } from "../LayoutFactory";
import ArticlesTable from "../../../../components/Tables/ArticlesTable/ArticlesTable";
import { GrPowerCycle } from "react-icons/gr";

interface VerticalProps {
  orderElement: boolean;
  toggleLayoutOrder: () => void;
  articles: ArticleInterface[];
  page: PageLayout;
}

export const SplitVertical: React.FC<VerticalProps> = ({
  orderElement,
  toggleLayoutOrder,
  articles,
  page,
}) => {
  const verticalTransitionVariants = {
    initial: { opacity: 0, x: 5 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -5, transition: { duration: 0.5 } },
  };

  return (
    <Flex
      w="calc(100% - 2rem)"
      h="100%"
      gap=".5rem"
      justifyContent="space-between"
    >
      <AnimatePresence mode="wait">
        {orderElement ? (
          <motion.div
            key="top"
            variants={verticalTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ minWidth: "38%", maxHeight: "100%" }}
          >
            <StudySelectionArea
              articles={articles}
              page={{ type: page.type }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="bottom"
            variants={verticalTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ maxWidth: "60%", maxHeight: "100%" }}
          >
            <ArticlesTable articles={articles} />
          </motion.div>
        )}
      </AnimatePresence>

      <Box display="flex" alignItems="center" justifyContent="center">
        <motion.button
          onClick={toggleLayoutOrder}
          style={{
            background: "#263C56",
            padding: ".75rem",
            borderRadius: ".5rem",
          }}
        >
          <motion.div
            animate={{ rotate: orderElement ? 0 : 180 }}
            transition={{ duration: 0.5 }}
          >
            <GrPowerCycle color="white" />
          </motion.div>
        </motion.button>
      </Box>

      <AnimatePresence mode="wait">
        {orderElement ? (
          <motion.div
            key="bottom"
            variants={verticalTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ maxWidth: "60%", maxHeight: "100%" }}
          >
            <ArticlesTable articles={articles} />
          </motion.div>
        ) : (
          <motion.div
            key="top"
            variants={verticalTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ minWidth: "38.5%", maxHeight: "100%" }}
          >
            <StudySelectionArea
              articles={articles}
              page={{ type: page.type }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  );
};
