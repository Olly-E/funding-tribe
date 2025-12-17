"use client";

import { motion, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface CustomCursorProps {
  isModalOpen?: boolean;
}

const CustomCursor = ({ isModalOpen = false }: CustomCursorProps) => {
  const [, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [overModal, setOverModal] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const x = useSpring(0, { stiffness: 400, damping: 30 });
  const y = useSpring(0, { stiffness: 400, damping: 30 });
  const scale = useSpring(1, { stiffness: 400, damping: 25 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 5);
      y.set(e.clientY - 5);
    };

    const hover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Are we hovering a normal hover target? (links/buttons)
      const isHoverTarget = target.closest("a, button, .cursor-pointer");
      setHovered(Boolean(isHoverTarget));

      // Are we hovering the modal/sidebar itself?
      const isOverModal = target.closest(".modal, .sidebar"); // adjust your modal/sidebar class
      setOverModal(Boolean(isOverModal));

      if (!isModalOpen) {
        scale.set(isHoverTarget ? 2 : 1);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", hover);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", hover);
    };
  }, [x, y, scale, isModalOpen]);

  // Modal overrides scale
  useEffect(() => {
    if (isModalOpen) {
      scale.set(2.5);
    }
  }, [isModalOpen, scale]);

  if (!mounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999]
                 flex items-center justify-center
                 h-4 w-4 rounded-full
                 bg-white mix-blend-difference"
      style={{ x, y, scale }}
    >
      <AnimatePresence>
        {isModalOpen && !overModal && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="text-black text-xs font-bold"
          >
            ✕
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomCursor;
