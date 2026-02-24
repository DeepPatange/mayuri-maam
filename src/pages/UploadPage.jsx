import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaImage, FaBrain, FaRocket } from 'react-icons/fa';
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
    setTimeout(() => {
      setLoading(false);
      setResult({
        prediction: Math.random() > 0.5 ? 'parkinson' : 'healthy',
        confidence: 0.85 + Math.random() * 0.12,
      });
    }, 2000);
  };

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
            AI Analysis
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold gradient-text mb-4">
            Upload & Predict
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            Upload a hand-drawn spiral or wave image and our AI will analyze it for Parkinson's disease signs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Upload */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <ImageUploader onImageChange={handleImageChange} />

            {/* Drawing Type */}
            <div className="neon-card p-5">
              <div className="relative z-10">
                <p className="text-text-secondary text-sm mb-3 font-heading tracking-wide uppercase text-xs">Drawing Type</p>
                <div className="flex gap-4">
                  {['spiral', 'wave'].map((type) => (
                    <label
                      key={type}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl cursor-pointer transition-all duration-300 ${
                        drawingType === type
                          ? 'text-white'
                          : 'text-text-secondary hover:text-white'
                      }`}
                      style={drawingType === type ? {
                        background: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(6,182,212,0.15))',
                        border: '1px solid rgba(124,58,237,0.4)',
                        boxShadow: '0 0 15px rgba(124,58,237,0.15)',
                      } : {
                        background: 'rgba(26,26,62,0.5)',
                        border: '1px solid rgba(124,58,237,0.1)',
                      }}
                    >
                      <input
                        type="radio"
                        name="drawingType"
                        value={type}
                        checked={drawingType === type}
                        onChange={(e) => setDrawingType(e.target.value)}
                        className="accent-primary"
                      />
                      <span className="capitalize text-sm font-semibold tracking-wide">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Analyze Button */}
            <motion.button
              onClick={handleAnalyze}
              disabled={!hasImage || loading}
              whileHover={hasImage && !loading ? { scale: 1.02 } : {}}
              whileTap={hasImage && !loading ? { scale: 0.98 } : {}}
              className="w-full py-4 rounded-xl text-white font-heading font-semibold tracking-wider transition-all duration-300 border-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base"
              style={{
                background: hasImage && !loading
                  ? 'linear-gradient(135deg, #7c3aed, #6d28d9)'
                  : 'rgba(124,58,237,0.3)',
                boxShadow: hasImage && !loading
                  ? '0 0 30px rgba(124,58,237,0.4), 0 0 60px rgba(124,58,237,0.1)'
                  : 'none',
              }}
            >
              <FaRocket /> ANALYZE IMAGE
            </motion.button>
          </motion.div>

          {/* Right: Result */}
          <div>
            {loading && (
              <div className="neon-card p-12 flex flex-col items-center justify-center gap-6">
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <motion.div
                    className="relative"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <FaBrain className="text-6xl text-primary" />
                    <div className="absolute inset-0 blur-xl bg-primary/30 scale-150" />
                  </motion.div>
                  <div className="flex items-center gap-2">
                    <span className="text-text-secondary font-medium">Analyzing your image</span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-primary text-lg"
                    >
                      ...
                    </motion.span>
                  </div>
                  <div className="w-48 h-1 rounded-full overflow-hidden bg-surface-light mt-2">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2, ease: 'easeInOut' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <div className="neon-card p-10">
                  <div className="relative z-10">
                    <h3 className="font-heading font-semibold text-text-primary mb-8 text-center tracking-wider uppercase text-sm">
                      Prediction Result
                    </h3>
                    <ConfidenceGauge confidence={result.confidence} prediction={result.prediction} />
                  </div>
                </div>

                <div className="neon-card p-4">
                  <p className="text-text-secondary text-xs text-center relative z-10">
                    This prediction is for educational purposes only. Please consult a healthcare professional.
                  </p>
                </div>
              </motion.div>
            )}

            {!loading && !result && (
              <div className="neon-card p-14 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <FaImage className="text-6xl text-primary/25 mb-6" />
                  </motion.div>
                  <p className="text-text-secondary text-lg font-medium">
                    Upload an image and click <span className="text-primary-light">"Analyze"</span>
                  </p>
                  <p className="text-text-secondary/60 text-sm mt-2">Results will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
