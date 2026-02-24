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

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About the Project
            </span>
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Understanding Parkinson's disease detection through AI-powered analysis of hand drawings.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((item, i) => (
            <InfoCard key={i} {...item} delay={i * 0.1} />
          ))}
        </div>

        {/* Technologies Used */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass-card rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold text-text-primary mb-6 text-center">
            Technologies Used
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Python', 'TensorFlow', 'Keras', 'EfficientNet', 'Flask',
              'React', 'Tailwind CSS', 'Framer Motion', 'Vite',
              'NumPy', 'Scikit-learn', 'OpenCV', 'Grad-CAM',
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-surface-light text-text-secondary text-sm border border-primary/10 hover:border-primary/30 hover:text-primary-light transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
