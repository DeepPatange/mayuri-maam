import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaLayerGroup, FaDatabase, FaArrowRight } from 'react-icons/fa';
import { AccuracyChart, LossChart, ConfusionMatrixChart } from '../components/ModelStats';
import InfoCard from '../components/InfoCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getModelInfo } from '../api/predictionApi';

const architectureLayers = [
  { name: 'EfficientNetB0 Base', detail: 'Pre-trained on ImageNet (frozen)', color: '#6366f1' },
  { name: 'Global Avg Pooling', detail: 'Reduces spatial dimensions', color: '#818cf8' },
  { name: 'BatchNorm + Dropout', detail: '0.3 dropout rate', color: '#06b6d4' },
  { name: 'Dense (256, ReLU)', detail: 'Feature learning', color: '#22d3ee' },
  { name: 'BatchNorm + Dropout', detail: '0.3 dropout rate', color: '#06b6d4' },
  { name: 'Dense (1, Sigmoid)', detail: 'Binary output', color: '#22c55e' },
];

export default function ModelInfoPage() {
  const [modelInfo, setModelInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getModelInfo()
      .then((res) => setModelInfo(res.data))
      .catch(() => setError('Could not load model info. Is the backend running?'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Model Information
            </span>
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Details about the deep learning model architecture, training process, and performance metrics.
          </p>
        </motion.div>

        {/* Architecture */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-text-primary mb-6 flex items-center gap-2">
            <FaLayerGroup className="text-primary" /> Model Architecture
          </h2>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex flex-col gap-3">
              {architectureLayers.map((layer, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: layer.color }}
                  />
                  <div className="flex-1 bg-surface-light rounded-xl px-4 py-3 flex items-center justify-between">
                    <span className="text-text-primary text-sm font-medium">{layer.name}</span>
                    <span className="text-text-secondary text-xs">{layer.detail}</span>
                  </div>
                  {i < architectureLayers.length - 1 && (
                    <FaArrowRight className="text-primary/30 text-xs shrink-0 hidden md:block" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Before vs After */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-text-primary mb-6 flex items-center gap-2">
            <FaBrain className="text-primary" /> Improvement Comparison
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard
              icon={<span className="text-danger">Before</span>}
              title="Basic CNN (Old)"
              description="2-layer CNN trained from scratch on 72 images. ~50% accuracy (random chance). No transfer learning, no augmentation."
            />
            <InfoCard
              icon={<span className="text-success">After</span>}
              title="EfficientNetB0 (New)"
              description={`Transfer learning with ImageNet weights, trained on 1000+ images. ${modelInfo?.accuracy ? Math.round(modelInfo.accuracy * 100) : '90+'}% accuracy with Grad-CAM interpretability.`}
            />
          </div>
        </section>

        {/* Performance Charts */}
        {loading && <LoadingSpinner text="Loading model metrics" />}
        {error && (
          <div className="glass-card rounded-xl p-6 text-center">
            <p className="text-text-secondary">{error}</p>
            <p className="text-text-secondary text-sm mt-2">Start the backend server and train the model to see metrics.</p>
          </div>
        )}

        {modelInfo && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-text-primary mb-6 flex items-center gap-2">
              <FaDatabase className="text-primary" /> Training Performance
            </h2>

            {/* Metrics Summary */}
            {modelInfo.metrics && (
              <div className="glass-card rounded-2xl p-6 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(modelInfo.metrics).map(([key, val]) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {typeof val === 'number' ? (val * 100).toFixed(1) + '%' : val}
                      </div>
                      <div className="text-text-secondary text-xs mt-1 capitalize">{key.replace('_', ' ')}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AccuracyChart history={modelInfo.training_history} />
              <LossChart history={modelInfo.training_history} />
            </div>

            {modelInfo.confusion_matrix && (
              <div className="mt-6">
                <ConfusionMatrixChart matrix={modelInfo.confusion_matrix} />
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
