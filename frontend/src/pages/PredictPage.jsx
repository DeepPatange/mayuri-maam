import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaImage } from 'react-icons/fa';
import ImageUploader from '../components/ImageUploader';
import PredictionResult from '../components/PredictionResult';
import LoadingSpinner from '../components/LoadingSpinner';
import usePrediction from '../hooks/usePrediction';
import { DRAWING_TYPES } from '../constants';

export default function PredictPage() {
  const [file, setFile] = useState(null);
  const [drawingType, setDrawingType] = useState(DRAWING_TYPES.SPIRAL);
  const { result, loading, error, predict, reset } = usePrediction();

  const handlePredict = () => {
    if (!file) return;
    predict(file, drawingType);
  };

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    reset();
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
            <ImageUploader onFileSelect={handleFileSelect} disabled={loading} />

            {/* Drawing Type */}
            <div className="glass-card rounded-2xl p-4">
              <p className="text-text-secondary text-sm mb-3">Drawing Type:</p>
              <div className="flex gap-4">
                {Object.values(DRAWING_TYPES).map((type) => (
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

            {/* Predict Button */}
            <button
              onClick={handlePredict}
              disabled={!file || loading}
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold transition-all duration-300 border-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <FaImage /> Analyze Image
            </button>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card rounded-xl p-4 border border-danger/30"
              >
                <p className="text-danger text-sm">{error}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Right: Results */}
          <div>
            {loading && <LoadingSpinner text="Analyzing your image" />}
            {result && <PredictionResult result={result} />}
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
