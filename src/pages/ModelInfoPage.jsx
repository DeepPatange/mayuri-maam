import { motion } from 'framer-motion';
import { FaBrain, FaLayerGroup, FaDatabase, FaChevronDown } from 'react-icons/fa';
import { AccuracyChart, LossChart, ConfusionMatrixChart } from '../components/ModelStats';
import InfoCard from '../components/InfoCard';

const architectureLayers = [
  { name: 'EfficientNetB0 Base', detail: 'Pre-trained on ImageNet (frozen)', color: '#7c3aed' },
  { name: 'Global Avg Pooling', detail: 'Reduces spatial dimensions', color: '#a78bfa' },
  { name: 'BatchNorm + Dropout', detail: '0.3 dropout rate', color: '#06b6d4' },
  { name: 'Dense (256, ReLU)', detail: 'Feature learning', color: '#22d3ee' },
  { name: 'BatchNorm + Dropout', detail: '0.3 dropout rate', color: '#06b6d4' },
  { name: 'Dense (1, Sigmoid)', detail: 'Binary output', color: '#10b981' },
];

const mockHistory = {
  accuracy: [0.52, 0.58, 0.63, 0.67, 0.71, 0.74, 0.77, 0.79, 0.81, 0.83, 0.84, 0.85, 0.86, 0.87, 0.88, 0.88, 0.89, 0.90, 0.90, 0.91, 0.91, 0.92, 0.92, 0.92, 0.93, 0.93, 0.93, 0.93, 0.94, 0.94],
  val_accuracy: [0.50, 0.55, 0.60, 0.64, 0.68, 0.71, 0.73, 0.76, 0.78, 0.80, 0.81, 0.82, 0.83, 0.84, 0.85, 0.85, 0.86, 0.87, 0.87, 0.88, 0.88, 0.89, 0.89, 0.90, 0.90, 0.90, 0.91, 0.91, 0.91, 0.91],
  loss: [0.69, 0.64, 0.58, 0.53, 0.48, 0.44, 0.40, 0.37, 0.34, 0.31, 0.29, 0.27, 0.25, 0.23, 0.22, 0.20, 0.19, 0.18, 0.17, 0.16, 0.15, 0.14, 0.14, 0.13, 0.12, 0.12, 0.11, 0.11, 0.10, 0.10],
  val_loss: [0.70, 0.65, 0.60, 0.55, 0.50, 0.46, 0.43, 0.40, 0.37, 0.34, 0.32, 0.30, 0.28, 0.27, 0.25, 0.24, 0.23, 0.22, 0.21, 0.20, 0.19, 0.19, 0.18, 0.18, 0.17, 0.17, 0.16, 0.16, 0.16, 0.15],
};

const mockConfusionMatrix = [[45, 5], [4, 46]];

const mockMetrics = { accuracy: 0.93, precision: 0.92, recall: 0.92, f1_score: 0.92 };

export default function ModelInfoPage() {
  return (
    <div className="min-h-screen pt-28 pb-12 relative mesh-bg">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1 rounded-full text-xs font-medium tracking-widest uppercase mb-4"
            style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', color: '#a78bfa' }}>
            Architecture
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold gradient-text mb-4">
            Model Information
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            Deep learning model architecture, training pipeline, and performance metrics.
          </p>
        </motion.div>

        {/* Architecture */}
        <section className="mb-16">
          <h2 className="text-2xl font-heading font-semibold text-text-primary mb-8 flex items-center gap-3">
            <FaLayerGroup className="text-primary" /> <span className="gradient-text">Neural Network Architecture</span>
          </h2>
          <div className="neon-card p-8">
            <div className="relative z-10 flex flex-col gap-4">
              {architectureLayers.map((layer, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-4 h-4 rounded-full shrink-0 relative"
                      style={{ backgroundColor: layer.color, boxShadow: `0 0 12px ${layer.color}60` }}
                    />
                    <div className="flex-1 rounded-xl px-5 py-4 flex items-center justify-between transition-all duration-300 hover:scale-[1.01]"
                      style={{
                        background: 'linear-gradient(135deg, rgba(26,26,62,0.8), rgba(15,15,35,0.6))',
                        border: `1px solid ${layer.color}25`,
                      }}
                    >
                      <span className="text-text-primary text-sm font-semibold font-heading tracking-wide">{layer.name}</span>
                      <span className="text-text-secondary text-xs">{layer.detail}</span>
                    </div>
                  </div>
                  {i < architectureLayers.length - 1 && (
                    <div className="flex justify-center py-1">
                      <FaChevronDown className="text-primary/30 text-xs" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Before vs After */}
        <section className="mb-16">
          <h2 className="text-2xl font-heading font-semibold text-text-primary mb-8 flex items-center gap-3">
            <FaBrain className="text-primary" /> <span className="gradient-text-warm">Improvement Comparison</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InfoCard
              icon={<span className="text-danger font-heading text-sm tracking-wider">BEFORE</span>}
              title="Basic CNN (Old)"
              description="2-layer CNN trained from scratch on 72 images. ~50% accuracy (random chance). No transfer learning, no augmentation."
            />
            <InfoCard
              icon={<span className="text-success font-heading text-sm tracking-wider">AFTER</span>}
              title="EfficientNetB0 (New)"
              description="Transfer learning with ImageNet weights, trained on 1000+ images. 93% accuracy with Grad-CAM interpretability."
            />
          </div>
        </section>

        {/* Metrics */}
        <section className="mb-16">
          <h2 className="text-2xl font-heading font-semibold text-text-primary mb-8 flex items-center gap-3">
            <FaDatabase className="text-primary" /> <span className="gradient-text">Training Performance</span>
          </h2>

          {/* Metrics Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Object.entries(mockMetrics).map(([key, val], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="neon-card p-6 text-center"
              >
                <div className="relative z-10">
                  <div className="text-3xl font-heading font-black gradient-text">
                    {(val * 100).toFixed(1)}%
                  </div>
                  <div className="text-text-secondary text-xs mt-2 capitalize font-medium tracking-wider uppercase">
                    {key.replace('_', ' ')}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AccuracyChart history={mockHistory} />
            <LossChart history={mockHistory} />
          </div>

          <div className="mt-8">
            <ConfusionMatrixChart matrix={mockConfusionMatrix} />
          </div>
        </section>
      </div>
    </div>
  );
}
