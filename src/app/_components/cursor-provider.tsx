"use client";

import { useEffect } from "react";

export default function CursorProvider() {
  useEffect(() => {
    const animated = document.querySelector(
      "section.animated",
    ) as HTMLElement | null;

    const handleMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = e.clientX / w;
      const y = e.clientY / h;

      if (animated) {
        animated.style.setProperty("--i0", x.toFixed(3));
        animated.style.setProperty("--j0", y.toFixed(3));
      }
    };

    document.addEventListener("mousemove", handleMove);
    return () => document.removeEventListener("mousemove", handleMove);
  }, []);

  return null;
}
