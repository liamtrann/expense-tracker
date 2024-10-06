import React from "react";
import { motion } from "framer-motion";

interface MotionWrapperProps {
  children: React.ReactNode;
  initial?: object;
  animate?: object;
  exit?: object;
  transition?: object;
}

const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  exit = { opacity: 0, y: -20 },
  transition = { duration: 0.5 },
}) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
