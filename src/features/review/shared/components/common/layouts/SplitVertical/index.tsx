import { Flex } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import StudySelectionArea from "../../../structure/StudySelectionArea";
import ArticleInterface from "../../../../types/ArticleInterface";
import { PageLayout } from "../../../structure/LayoutFactory";
import ArticlesTable from "../../../../../../../components/Tables/ArticlesTable/ArticlesTable";

interface VerticalProps {
  isInverted: boolean;
  articles: ArticleInterface[];
  page: PageLayout;
}

export const SplitVertical: React.FC<VerticalProps> = ({
  isInverted,
  articles,
  page,
}) => {
  const verticalTransitionVariants = {
    initial: { opacity: 0, x: 5 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -5, transition: { duration: 0.5 } },
  };

  return (
    <Flex w="100%" h="100%" gap="1rem" justifyContent="space-between">
      {isInverted ? (
        <AnimatePresence mode="wait">
          <motion.div
            key="top"
            variants={verticalTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ minWidth: "35%", maxHeight: "100%" }}
          >
            <StudySelectionArea articles={articles} page={page} />
          </motion.div>
          <motion.div
            key="bottom"
            variants={verticalTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ maxWidth: "65%", maxHeight: "100%" }}
          >
            <ArticlesTable articles={articles} page={page} />
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key="bottom"
            variants={verticalTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ maxWidth: "65%", maxHeight: "100%" }}
          >
            <ArticlesTable articles={articles} page={page} />
          </motion.div>
          <motion.div
            key="top"
            variants={verticalTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ minWidth: "35%", maxHeight: "100%" }}
          >
            <StudySelectionArea articles={articles} page={page} />
          </motion.div>
        </AnimatePresence>
      )}
    </Flex>
  );
};
