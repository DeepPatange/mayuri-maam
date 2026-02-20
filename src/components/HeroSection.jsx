import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBrain } from 'react-icons/fa';

// Fixed positions so they don't change on re-render
const particles = [
  { w: 120, h: 120, left: '10%', top: '20%', dur: 7 },
  { w: 80, h: 80, left: '80%', top: '15%', dur: 9 },
  { w: 150, h: 150, left: '60%', top: '70%', dur: 6 },
  { w: 100, h: 100, left: '25%', top: '75%', dur: 8 },
  { w: 60, h: 60, left: '90%', top: '50%', dur: 10 },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-gradient opacity-20" style={{ zIndex: 0 }} />

      {/* Floating particles - behind content */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.w,
              height: p.h,
              left: p.left,
              top: p.top,
              background: 'rgba(99, 102, 241, 0.08)',
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Content - on top */}
      <div className="relative max-w-4xl mx-auto px-4 text-center" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FaBrain className="text-7xl text-primary mx-auto" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary-light bg-clip-text text-transparent">
              Parkinson's Disease
            </span>
            <br />
            <span className="text-text-primary">Detection System</span>
          </h1>

          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-8">
            AI-powered analysis of hand-drawn spirals and waves to detect early signs
            of Parkinson's disease using deep learning
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/about"
              className="px-8 py-3 bg-primary hover:bg-primary-light rounded-xl text-white font-semibold transition-all duration-300 animate-pulse-glow flex items-center gap-2 no-underline"
            >
              Learn More <FaArrowRight />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
