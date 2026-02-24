import { motion } from 'framer-motion';
import { FaBrain } from 'react-icons/fa';

export default function LoadingSpinner({ text = 'Analyzing...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ rotate: { duration: 2, repeat: Infinity, ease: 'linear' }, scale: { duration: 1, repeat: Infinity } }}
      >
        <FaBrain className="text-5xl text-primary" />
      </motion.div>
      <div className="flex items-center gap-1">
        <span className="text-text-secondary text-sm">{text}</span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-primary"
        >
          ...
        </motion.span>
      </div>
    </div>
  );
}
