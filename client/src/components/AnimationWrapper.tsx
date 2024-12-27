import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

type Props = {
  children: React.ReactNode;
  initial?: Record<string, number>;
  animate?: Record<string, number>;
  transition?: Record<string, number>;
  keyvalue: string;
  className?: string;
};

function AnimationWrapper({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 0.6 },
  keyvalue,
  className,
}: Props) {
  return (
    <AnimatePresence>
      <motion.div
        key={keyvalue}
        initial={initial}
        animate={animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimationWrapper;
