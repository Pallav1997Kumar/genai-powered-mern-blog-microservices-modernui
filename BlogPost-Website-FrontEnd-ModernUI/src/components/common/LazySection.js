import { lazy, Suspense, useEffect, useRef, useState } from "react";

function LazySection({
  loader,
  fallback = null,
  delay = 2000,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  const lazyRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();

          setTimeout(() => {
            setVisible(true);
          }, delay);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  if (visible && !lazyRef.current) {
    lazyRef.current = lazy(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(loader());
          }, delay);
        })
    );
  }

  const Component = lazyRef.current;

  return (
    <section ref={ref}>
      {Component ? (
        <Suspense fallback={fallback}>
          <Component />
        </Suspense>
      ) : (
        fallback
      )}
    </section>
  );
}

export default LazySection;