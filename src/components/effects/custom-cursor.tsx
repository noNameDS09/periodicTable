
"use client";

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.3 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const [cursorVariant, setCursorVariant] = useState("default");
  const [hoveredElementDimensions, setHoveredElementDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => {
      setCursorVariant("clicking");
    };

    const handleMouseUp = () => {
      const elementUnderMouse = document.elementFromPoint(mouseX.get(), mouseY.get());
      if (elementUnderMouse) {
        const specificTile = elementUnderMouse.closest('[data-cursor-type="element-tile"]');
        if (specificTile) {
          setCursorVariant("elementHover");
          const rect = specificTile.getBoundingClientRect();
          setHoveredElementDimensions({ width: rect.width, height: rect.height });
          return;
        }
        if (elementUnderMouse.closest('a, button, [role="button"], [data-cursor-interactive]')) {
          setCursorVariant("interactive");
          setHoveredElementDimensions(null);
          return;
        }
      }
      setCursorVariant("default");
      setHoveredElementDimensions(null);
    };
    
    const handleContextualHover = (e: MouseEvent) => {
      if (cursorVariant === "clicking") return; 

      if (e.target instanceof HTMLElement) {
        const specificTile = e.target.closest('[data-cursor-type="element-tile"]');
        if (specificTile) {
          setCursorVariant("elementHover");
          const rect = specificTile.getBoundingClientRect();
          setHoveredElementDimensions({ width: rect.width, height: rect.height });
        } else if (e.target.closest('a, button, [role="button"], [data-cursor-interactive]')) {
          setCursorVariant("interactive");
          setHoveredElementDimensions(null);
        } else {
          setCursorVariant("default");
          setHoveredElementDimensions(null);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleContextualHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleContextualHover);
    };
  }, [mouseX, mouseY, cursorVariant]); 

  if (!isMounted) {
    return null;
  }

  const variants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: "hsla(var(--primary) / 0.15)",
      border: "1px solid hsl(var(--primary))",
      borderRadius: "9999px",
      scale: 1,
      opacity: 0.8,
      transition: { type: "spring", mass: 0.1, stiffness: 300, damping: 20 }
    },
    clicking: {
      width: 16,
      height: 16,
      backgroundColor: "hsla(var(--primary) / 0.3)",
      border: "1px solid hsl(var(--primary))",
      borderRadius: "9999px",
      scale: 0.9,
      opacity: 1,
      transition: { type: "spring", mass: 0.1, stiffness: 400, damping: 25 }
    },
    interactive: {
      width: 36, 
      height: 36,
      backgroundColor: "hsla(var(--accent) / 0.2)",
      border: "1px solid hsl(var(--accent))",
      borderRadius: "9999px",
      scale: 1.3,
      opacity: 0.9,
      transition: { type: "spring", mass: 0.15, stiffness: 250, damping: 18 }
    },
    elementHover: {
      width: hoveredElementDimensions?.width ?? 32,
      height: hoveredElementDimensions?.height ?? 32,
      backgroundColor: "hsla(var(--accent) / 0.1)", 
      border: "1.5px solid hsl(var(--accent))",
      borderRadius: "0.375rem", 
      scale: 1.0,
      opacity: 0.7,
      transition: { type: "spring", mass: 0.15, stiffness: 350, damping: 25 }
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      variants={variants}
      animate={cursorVariant}
      style={{
        x: springX,
        y: springY,
        translateX: "-50%", 
        translateY: "-50%",
      }}
    />
  );
}
