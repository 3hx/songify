import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FormTransitionProps {
  children: ReactNode;
}

export function FormTransition({ children }: FormTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}