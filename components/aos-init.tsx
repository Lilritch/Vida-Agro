"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AOSInit() {
  const pathname = usePathname();

  useEffect(() => {
    let isActive = true;

    const loadAOS = async () => {
      const AOS = (await import("aos")).default;

      if (!isActive) {
        return;
      }

      AOS.init({
        duration: 700,
        once: true,
        offset: 90,
        easing: "ease-out-cubic",
        disable: () =>
          window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      });

      AOS.refresh();
    };

    void loadAOS();

    return () => {
      isActive = false;
    };
  }, [pathname]);

  return null;
}
