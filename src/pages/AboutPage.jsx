import { motion } from 'framer-motion';
import { FaHeartbeat, FaBrain, FaPencilAlt, FaDatabase, FaGraduationCap, FaShieldAlt } from 'react-icons/fa';
import InfoCard from '../components/InfoCard';

const sections = [
  {
    icon: <FaHeartbeat />,
    title: "About Parkinson's Disease",
    description: "Parkinson's disease is a progressive nervous system disorder affecting movement. It develops gradually, sometimes starting with a barely noticeable tremor in one hand. While tremors are common, the disorder also causes stiffness or slowing of movement. Over 10 million people worldwide live with Parkinson's disease.",
  },
  {
    icon: <FaPencilAlt />,
    title: 'The Spiral Drawing Test',
    description: 'A 2017 study by Zham et al. discovered that Parkinson\'s can be detected through spiral drawing analysis. Patients with Parkinson\'s draw slower and with lower pen pressure. The visual tremor patterns in drawings serve as biomarkers for early detection.',
  },
  {
    icon: <FaBrain />,
    title: 'Deep Learning Approach',
    description: 'We use EfficientNetB0, a state-of-the-art convolutional neural network pre-trained on ImageNet, fine-tuned on spiral and wave drawings. Transfer learning allows us to achieve high accuracy even with a limited dataset by leveraging features learned from millions of images.',
  },
  {
    icon: <FaDatabase />,
    title: 'Dataset',
    description: 'Our combined dataset consists of spiral and wave drawings from both healthy individuals and Parkinson\'s patients. Images are augmented with rotations, flips, zoom, and brightness adjustments to improve model robustness and generalization.',
  },
  {
    icon: <FaGraduationCap />,
    title: 'About This Project',
    description: 'This project was developed by Mayuri as part of an M.Tech program. It demonstrates the application of deep learning in healthcare, specifically for early Parkinson\'s disease detection using computer vision techniques.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Disclaimer',
    description: 'This tool is for educational and research purposes only. It should NOT be used as a substitute for professional medical diagnosis. If you suspect Parkinson\'s disease, please consult a qualified healthcare professional immediately.',
  },
];

const techStack = [
  { name: 'Python', category: 'backend' },
  { name: 'TensorFlow', category: 'ml' },
  { name: 'Keras', category: 'ml' },
  { name: 'EfficientNet', category: 'ml' },
  { name: 'Flask', category: 'backend' },
  { name: 'React', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Framer Motion', category: 'frontend' },
  { name: 'Vite', category: 'frontend' },
  { name: 'NumPy', category: 'ml' },
  { name: 'Scikit-learn', category: 'ml' },
  { name: 'OpenCV', category: 'ml' },
  { name: 'Grad-CAM', category: 'ml' },
];

const categoryColors = {
  ml: { bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.25)', text: '#a78bfa' },
  frontend: { bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.25)', text: '#22d3ee' },
  backend: { bg: 'rgba(244,114,182,0.1)', border: 'rgba(244,114,182,0.25)', text: '#f472b6' },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-12 relative mesh-bg">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1 rounded-full text-xs font-medium tracking-widest uppercase mb-4"
            style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)', color: '#06b6d4' }}>
            Project
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold gradient-text-warm mb-4">
            About the Project
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            Understanding Parkinson's disease detection through AI-powered analysis of hand drawings.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((item, i) => (
            <InfoCard key={i} {...item} delay={i * 0.1} />
          ))}
        </div>

        {/* Technologies Used */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 neon-card p-10"
        >
          <div className="relative z-10">
            <h2 className="text-2xl font-heading font-semibold text-center mb-8 gradient-text tracking-wider">
              Technologies Used
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech) => {
                const colors = categoryColors[tech.category];
                return (
                  <motion.span
                    key={tech.name}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="px-5 py-2.5 rounded-full text-sm font-medium cursor-default transition-all duration-300"
                    style={{
                      background: colors.bg,
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                    }}
                  >
                    {tech.name}
                  </motion.span>
                );
              })}
            </div>
            <div className="flex justify-center gap-6 mt-6">
              {Object.entries({ ml: 'ML/AI', frontend: 'Frontend', backend: 'Backend' }).map(([key, label]) => (
                <div key={key} className="flex items-center gap-2 text-xs text-text-secondary">
                  <div className="w-2 h-2 rounded-full" style={{ background: categoryColors[key].text }} />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
