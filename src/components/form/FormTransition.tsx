import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FormTransitionProps {
  children: ReactNode;
}

export function FormTransition({ children }: FormTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
