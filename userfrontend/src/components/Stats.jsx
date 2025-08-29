import React, { useEffect, useRef, useState } from 'react';

function useCountUp(target, durationMs) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now) => {
              const progress = Math.min(1, (now - start) / durationMs);
              setValue(Math.floor(progress * target));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, durationMs]);

  return { value, ref };
}

function StatCard({ label, target }) {
  const { value, ref } = useCountUp(target, 1200);
  return (
    <div ref={ref} className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-teal-100">
      <div className="text-3xl font-extrabold text-teal-700">{value.toLocaleString()}</div>
      <div className="mt-1 text-sm text-teal-700">{label}</div>
    </div>
  );
}

const Stats = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-teal-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Happy Customers" target={2400} />
          <StatCard label="Appointments Completed" target={5300} />
          <StatCard label="Years of Service" target={12} />
          <StatCard label="Dedicated Doctors" target={8} />
        </div>
      </div>
    </section>
  );
}

export default Stats;


