import { motion } from 'framer-motion';
import { FaBrain, FaUpload, FaCogs, FaCheckCircle, FaHeartbeat, FaPencilAlt, FaChartLine } from 'react-icons/fa';
import HeroSection from '../components/HeroSection';
import AnimatedCounter from '../components/AnimatedCounter';
import InfoCard from '../components/InfoCard';

const stats = [
  { target: 93, suffix: '%', label: 'Model Accuracy', icon: <FaChartLine /> },
  { target: 1000, suffix: '+', label: 'Training Images', icon: <FaBrain /> },
  { target: 1, suffix: 's', label: 'Prediction Speed', icon: <FaCogs /> },
];

const howItWorks = [
  {
    icon: <FaUpload />,
    title: '01. Upload',
    description: 'Upload a hand-drawn spiral or wave image from your device using our drag-and-drop interface.',
  },
  {
    icon: <FaCogs />,
    title: '02. Analyze',
    description: 'EfficientNetB0 deep learning model processes the image and identifies tremor-related patterns.',
  },
  {
    icon: <FaCheckCircle />,
    title: '03. Results',
    description: 'Get instant prediction with confidence score and Grad-CAM visualization of AI focus areas.',
  },
];

const aboutCards = [
  {
    icon: <FaHeartbeat />,
    title: "Parkinson's Disease",
    description: "A progressive nervous system disorder that affects movement. Symptoms start gradually, sometimes with a barely noticeable tremor in just one hand.",
  },
  {
    icon: <FaPencilAlt />,
    title: 'Spiral Drawing Test',
    description: "Research shows Parkinson's affects hand-drawing ability. Patients draw slower with lower pen pressure, revealing visible tremor patterns.",
  },
  {
    icon: <FaBrain />,
    title: 'CNN Detection',
    description: 'Convolutional Neural Networks learn subtle differences in drawings that indicate Parkinson\'s, achieving over 90% accuracy.',
  },
];

export default function HomePage() {
  return (
    <div className="relative">
      <HeroSection />

      {/* Stats Section */}
      <section className="relative max-w-5xl mx-auto px-4 -mt-8" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <AnimatedCounter key={i} {...stat} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="relative max-w-5xl mx-auto px-4 py-28 mesh-bg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative z-10"
        >
          <span className="inline-block px-4 py-1 rounded-full text-xs font-medium tracking-widest uppercase mb-4"
            style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', color: '#a78bfa' }}>
            Process
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold gradient-text">
            How It Works
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {howItWorks.map((item, i) => (
            <InfoCard key={i} {...item} delay={i * 0.15} />
          ))}
        </div>
      </section>

      {/* Understanding the Science */}
      <section className="relative max-w-5xl mx-auto px-4 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full text-xs font-medium tracking-widest uppercase mb-4"
            style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)', color: '#06b6d4' }}>
            Science
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold gradient-text-warm">
            Understanding the Science
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutCards.map((item, i) => (
            <InfoCard key={i} {...item} delay={i * 0.15} />
          ))}
        </div>
      </section>
    </div>
  );
}
