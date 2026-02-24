import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaFire } from 'react-icons/fa';

export default function GradCamViewer({ originalUrl, gradCamUrl }) {
  const [opacity, setOpacity] = useState(70);
  const [showHeatmap, setShowHeatmap] = useState(true);

  if (!gradCamUrl) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <FaFire className="text-warning" />
          Grad-CAM Visualization
        </h3>
        <button
          onClick={() => setShowHeatmap(!showHeatmap)}
          className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary-light hover:bg-primary/30 transition-colors border-none cursor-pointer flex items-center gap-1"
        >
          <FaEye />
          {showHeatmap ? 'Show Original' : 'Show Heatmap'}
        </button>
      </div>

      <div className="relative rounded-xl overflow-hidden bg-navy">
        <img
          src={originalUrl}
          alt="Original"
          className="w-full h-auto max-h-64 object-contain"
        />
        {showHeatmap && gradCamUrl && (
          <img
            src={gradCamUrl}
            alt="Grad-CAM"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ opacity: opacity / 100 }}
          />
        )}
      </div>

      {showHeatmap && (
        <div className="mt-3 flex items-center gap-3">
          <span className="text-text-secondary text-xs">Opacity</span>
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(e.target.value)}
            className="flex-1 accent-primary"
          />
          <span className="text-text-secondary text-xs w-8">{opacity}%</span>
        </div>
      )}

      <p className="text-text-secondary text-xs mt-3">
        Highlighted regions show what the AI focused on during prediction.
      </p>
    </motion.div>
  );
}
