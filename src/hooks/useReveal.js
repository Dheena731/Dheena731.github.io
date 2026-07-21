import { useEffect, useRef, useState } from 'react';

/** Fires once when the element scrolls into view. */
export function useReveal(options = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '-60px 0px -60px 0px', threshold: 0.06, ...options },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [options.rootMargin, options.threshold]);

  return [ref, shown];
}
