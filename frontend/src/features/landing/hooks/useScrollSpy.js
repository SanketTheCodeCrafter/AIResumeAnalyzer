import { useState, useEffect } from 'react';

export function useScrollSpy(selectors, options = {}) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = selectors.map((selector) => document.querySelector(selector)).filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, { rootMargin: "0px 0px -40% 0px", ...options });

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selectors, options]);

  return activeId;
}
