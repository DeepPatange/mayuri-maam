import { motion } from 'framer-motion';

export default function ConfidenceGauge({ confidence, prediction }) {
  const percentage = Math.round(confidence * 100);
  const isParkinson = prediction === 'parkinson';
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const color = isParkinson ? '#ef4444' : '#10b981';
  const glowColor = isParkinson ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)';
  const bgColor = isParkinson ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)';

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-52 h-52">
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-full blur-xl"
          style={{ background: glowColor }}
        />
        <svg className="w-full h-full -rotate-90 relative z-10" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100" cy="100" r={radius}
            fill="none" stroke="rgba(124,58,237,0.1)" strokeWidth="10"
          />
          {/* Track */}
          <circle
            cx="100" cy="100" r={radius}
            fill="none" stroke="rgba(124,58,237,0.05)" strokeWidth="10"
          />
          {/* Animated progress */}
          <motion.circle
            cx="100" cy="100" r={radius}
            fill="none" stroke={color} strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <motion.span
            className="text-5xl font-heading font-black"
            style={{ color }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            {percentage}%
          </motion.span>
          <span className="text-text-secondary text-xs mt-1 uppercase tracking-widest font-medium">Confidence</span>
        </div>
      </div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="px-6 py-2.5 rounded-full text-sm font-heading font-semibold tracking-wider"
        style={{
          backgroundColor: bgColor,
          color,
          border: `1px solid ${color}33`,
          boxShadow: `0 0 20px ${glowColor}`,
        }}
      >
        {isParkinson ? "PARKINSON'S DETECTED" : 'HEALTHY'}
      </motion.div>
    </div>
  );
}
