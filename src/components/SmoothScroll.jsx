import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    const restoreScroll = () => {
      const target = window.location.hash
        ? document.querySelector(window.location.hash)
        : null;
      if (target) {
        lenis.scrollTo(target, { immediate: true });
      } else {
        lenis.scrollTo(0, { immediate: true });
      }
    };

    restoreScroll();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
