import { motion } from 'framer-motion';
import ConfidenceGauge from './ConfidenceGauge';
import GradCamViewer from './GradCamViewer';

export default function PredictionResult({ result }) {
  if (!result) return null;

  const { prediction, confidence, grad_cam_url, original_url } = result;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="glass-card rounded-2xl p-8">
        <h3 className="text-lg font-semibold text-text-primary mb-6 text-center">
          Prediction Result
        </h3>
        <ConfidenceGauge confidence={confidence} prediction={prediction} />
      </div>

      <GradCamViewer originalUrl={original_url} gradCamUrl={grad_cam_url} />

      <div className="glass-card rounded-xl p-4">
        <p className="text-text-secondary text-xs text-center">
          This prediction is for educational purposes only and should not be used for medical diagnosis.
          Please consult a healthcare professional.
        </p>
      </div>
    </motion.div>
  );
}
