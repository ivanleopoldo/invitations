import { motion } from "motion/react";

export function ButtonAnimated({ children }: { children: React.ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      {children}
    </motion.div>
  );
}
