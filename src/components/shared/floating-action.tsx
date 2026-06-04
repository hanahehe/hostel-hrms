"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingActionProps {
  onClick: () => void;
  label?: string;
}

export function FloatingAction({ onClick, label = "Quick action" }: FloatingActionProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8"
    >
      <Button
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg shadow-primary/25 md:h-auto md:w-auto md:rounded-lg md:px-6"
        onClick={onClick}
        aria-label={label}
      >
        <Plus className="h-5 w-5 md:mr-2" />
        <span className="hidden md:inline">{label}</span>
      </Button>
    </motion.div>
  );
}
