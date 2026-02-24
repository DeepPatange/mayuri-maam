import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AnimatedCounter({ target, suffix = '', duration = 2, label, icon }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(target);
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="neon-card p-8 text-center group"
    >
      <div className="relative z-10">
        <div className="text-3xl mb-3 text-primary group-hover:text-secondary transition-colors duration-300">
          {icon}
        </div>
        <div className="text-5xl font-heading font-black gradient-text mb-1">
          {count}{suffix}
        </div>
        <div className="text-text-secondary text-sm mt-2 font-medium tracking-wide uppercase">{label}</div>
      </div>
    </motion.div>
  );
}
