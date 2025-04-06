import { Box, Flex } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import StudySelectionArea from "../StudySelectionArea";
import ArticleInterface from "../../../../../public/interfaces/ArticleInterface";
import { PageLayout } from "../LayoutFactory";
import ArticlesTable from "../../../../components/Tables/ArticlesTable/ArticlesTable";
import { GrPowerCycle } from "react-icons/gr";

interface HorizontalProps {
  orderElement: boolean;
  toggleLayoutOrder: () => void;
  articles: ArticleInterface[];
  page: PageLayout;
}

export const SplitHorizontal: React.FC<HorizontalProps> = ({
  orderElement,
  toggleLayoutOrder,
  articles,
  page,
}) => {
  const horizontalTransitionVariants = {
    initial: { opacity: 0, y: 5 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -5, transition: { duration: 0.5 } },
  };

  return (
    <Flex
      w="100%"
      h="100%"
      flexDirection="column"
      gap=".5rem"
      justifyContent="space-between"
    >
      <AnimatePresence mode="wait">
        {orderElement ? (
          <motion.div
            key="top"
            variants={horizontalTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ maxWidth: "100%", maxHeight: "45%" }}
          >
            <StudySelectionArea articles={articles} page={page} />
          </motion.div>
        ) : (
          <motion.div
            key="bottom"
            variants={horizontalTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ArticlesTable articles={articles} page={page} />
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
            variants={horizontalTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ArticlesTable articles={articles} page={page} />
          </motion.div>
        ) : (
          <motion.div
            key="top"
            variants={horizontalTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ maxWidth: "100%", maxHeight: "40%" }}
          >
            <StudySelectionArea
              articles={articles}
              page={page}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  );
};
