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
    title: '1. Upload Image',
    description: 'Upload a hand-drawn spiral or wave image from your device using our simple drag-and-drop uploader.',
  },
  {
    icon: <FaCogs />,
    title: '2. AI Analyzes',
    description: 'Our deep learning model (EfficientNetB0) processes the image and identifies tremor-related patterns.',
  },
  {
    icon: <FaCheckCircle />,
    title: '3. Get Results',
    description: 'Receive an instant prediction with confidence score and Grad-CAM visualization showing what the AI detected.',
  },
];

const aboutCards = [
  {
    icon: <FaHeartbeat />,
    title: "What is Parkinson's Disease?",
    description: "A progressive nervous system disorder that affects movement. Symptoms start gradually, sometimes with a barely noticeable tremor in just one hand.",
  },
  {
    icon: <FaPencilAlt />,
    title: 'The Spiral Drawing Test',
    description: "Research shows Parkinson's affects hand-drawing ability. Patients draw slower with lower pen pressure, and their spirals show visible tremor patterns.",
  },
  {
    icon: <FaBrain />,
    title: 'How CNN Detects It',
    description: 'Convolutional Neural Networks can learn to see the subtle differences in drawings that indicate Parkinson\'s, achieving over 90% accuracy.',
  },
];

export default function HomePage() {
  return (
    <div>
      <HeroSection />

      {/* Stats Section */}
      <section className="max-w-5xl mx-auto px-4 py-12 relative" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <AnimatedCounter key={i} {...stat} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-4 py-24">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            How It Works
          </span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howItWorks.map((item, i) => (
            <InfoCard key={i} {...item} delay={i * 0.15} />
          ))}
        </div>
      </section>

      {/* About the Disease */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Understanding the Science
          </span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutCards.map((item, i) => (
            <InfoCard key={i} {...item} delay={i * 0.15} />
          ))}
        </div>
      </section>
    </div>
  );
}
