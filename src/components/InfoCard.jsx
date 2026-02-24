import { motion } from 'framer-motion';

export default function InfoCard({ icon, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.03, y: -6 }}
      className="neon-card p-6 cursor-default group"
    >
      <div className="relative z-10">
        <div className="text-3xl mb-4 text-primary group-hover:text-secondary transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-3 tracking-wide">
          {title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed font-body">{description}</p>
      </div>
    </motion.div>
  );
}
