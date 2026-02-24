import { motion } from 'framer-motion';

export default function ConfidenceGauge({ confidence, prediction }) {
  const percentage = Math.round(confidence * 100);
  const isParkinson = prediction === 'parkinson';
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const color = isParkinson ? '#ef4444' : '#22c55e';
  const bgColor = isParkinson ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)';

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100" cy="100" r={radius}
            fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="12"
          />
          {/* Animated progress arc */}
          <motion.circle
            cx="100" cy="100" r={radius}
            fill="none" stroke={color} strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-bold"
            style={{ color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {percentage}%
          </motion.span>
          <span className="text-text-secondary text-xs mt-1">Confidence</span>
        </div>
      </div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="px-6 py-2 rounded-full text-sm font-semibold"
        style={{ backgroundColor: bgColor, color }}
      >
        {isParkinson ? 'Parkinson\'s Detected' : 'Healthy'}
      </motion.div>
    </div>
  );
}
