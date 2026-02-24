import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBrain, FaMicrochip, FaDna } from 'react-icons/fa';

const orbs = [
  { size: 300, left: '10%', top: '15%', color: 'rgba(124, 58, 237, 0.15)', blur: 80, anim: 'orb-float-1', dur: '12s' },
  { size: 250, left: '70%', top: '10%', color: 'rgba(6, 182, 212, 0.12)', blur: 70, anim: 'orb-float-2', dur: '15s' },
  { size: 200, left: '50%', top: '65%', color: 'rgba(244, 114, 182, 0.1)', blur: 60, anim: 'orb-float-1', dur: '18s' },
  { size: 150, left: '85%', top: '60%', color: 'rgba(124, 58, 237, 0.1)', blur: 50, anim: 'orb-float-2', dur: '10s' },
];

const floatingIcons = [
  { Icon: FaMicrochip, left: '8%', top: '30%', delay: 0, size: 20 },
  { Icon: FaDna, left: '88%', top: '25%', delay: 1, size: 22 },
  { Icon: FaMicrochip, left: '75%', top: '75%', delay: 2, size: 18 },
  { Icon: FaDna, left: '15%', top: '70%', delay: 0.5, size: 16 },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg grid-bg">
      {/* Gradient sweep */}
      <div className="absolute inset-0 animate-gradient opacity-15" style={{ zIndex: 0 }} />

      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
        {orbs.map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.left,
              top: orb.top,
              background: orb.color,
              filter: `blur(${orb.blur}px)`,
              animation: `${orb.anim} ${orb.dur} ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Floating tech icons */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
        {floatingIcons.map(({ Icon, left, top, delay, size }, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/15"
            style={{ left, top }}
            animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay }}
          >
            <Icon size={size} />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-4 text-center" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Brain icon with glow ring */}
          <motion.div
            className="inline-block mb-8 relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="relative">
              <FaBrain className="text-8xl md:text-9xl text-primary relative z-10" />
              <div className="absolute inset-0 blur-2xl bg-primary/30 scale-150" />
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-primary/20"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute -inset-8 rounded-full border border-secondary/10"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-medium tracking-wider uppercase"
            style={{
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(6, 182, 212, 0.1))',
              border: '1px solid rgba(124, 58, 237, 0.25)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-primary-light">AI-Powered Deep Learning Platform</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black mb-6 leading-tight">
            <motion.span
              className="block gradient-text text-glow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Parkinson's
            </motion.span>
            <motion.span
              className="block text-text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Detection
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Advanced neural network analysis of hand-drawn spirals and waves
            to detect early signs of Parkinson's disease with <span className="text-primary-light font-semibold">93% accuracy</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/upload"
              className="group relative px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 flex items-center gap-3 no-underline overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                boxShadow: '0 0 30px rgba(124, 58, 237, 0.4), 0 0 60px rgba(124, 58, 237, 0.1)',
              }}
            >
              <span className="relative z-10">Start Analysis</span>
              <FaArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              to="/model"
              className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 no-underline text-primary-light hover:text-white"
              style={{
                border: '1px solid rgba(124, 58, 237, 0.3)',
                background: 'rgba(124, 58, 237, 0.05)',
              }}
            >
              View Model Architecture
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(transparent, #050510)' }} />
    </section>
  );
}
