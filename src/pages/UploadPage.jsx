import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaImage, FaBrain } from 'react-icons/fa';
import ImageUploader from '../components/ImageUploader';
import ConfidenceGauge from '../components/ConfidenceGauge';

export default function UploadPage() {
  const [hasImage, setHasImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [drawingType, setDrawingType] = useState('spiral');

  const handleImageChange = (file) => {
    setHasImage(!!file);
    setResult(null);
  };

  const handleAnalyze = () => {
    setLoading(true);
    setResult(null);
    // Mock prediction after a delay
    setTimeout(() => {
      setLoading(false);
      setResult({
        prediction: Math.random() > 0.5 ? 'parkinson' : 'healthy',
        confidence: 0.85 + Math.random() * 0.12,
      });
    }, 2000);
  };

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
              Upload & Predict
            </span>
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Upload a hand-drawn spiral or wave image and our AI will analyze it for signs of Parkinson's disease.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Upload */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <ImageUploader onImageChange={handleImageChange} />

            {/* Drawing Type */}
            <div className="glass-card rounded-2xl p-4">
              <p className="text-text-secondary text-sm mb-3">Drawing Type:</p>
              <div className="flex gap-4">
                {['spiral', 'wave'].map((type) => (
                  <label
                    key={type}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition-all ${
                      drawingType === type
                        ? 'bg-primary/20 text-primary-light border border-primary/30'
                        : 'bg-surface-light text-text-secondary border border-transparent hover:border-primary/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="drawingType"
                      value={type}
                      checked={drawingType === type}
                      onChange={(e) => setDrawingType(e.target.value)}
                      className="accent-primary"
                    />
                    <span className="capitalize text-sm font-medium">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={!hasImage || loading}
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold transition-all duration-300 border-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <FaImage /> Analyze Image
            </button>
          </motion.div>

          {/* Right: Result */}
          <div>
            {loading && (
              <div className="flex flex-col items-center justify-center gap-4 py-12">
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{ rotate: { duration: 2, repeat: Infinity, ease: 'linear' }, scale: { duration: 1, repeat: Infinity } }}
                >
                  <FaBrain className="text-5xl text-primary" />
                </motion.div>
                <div className="flex items-center gap-1">
                  <span className="text-text-secondary text-sm">Analyzing your image</span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-primary"
                  >
                    ...
                  </motion.span>
                </div>
              </div>
            )}

            {result && (
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
                  <ConfidenceGauge confidence={result.confidence} prediction={result.prediction} />
                </div>

                <div className="glass-card rounded-xl p-4">
                  <p className="text-text-secondary text-xs text-center">
                    This prediction is for educational purposes only and should not be used for medical diagnosis.
                    Please consult a healthcare professional.
                  </p>
                </div>
              </motion.div>
            )}

            {!loading && !result && (
              <div className="glass-card rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
                <FaImage className="text-5xl text-primary/20 mb-4" />
                <p className="text-text-secondary">
                  Upload an image and click "Analyze" to see the prediction results here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
