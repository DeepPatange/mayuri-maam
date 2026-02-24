import { useState } from 'react';
import { predictImage, predictCanvas } from '../api/predictionApi';

export default function usePrediction() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predict = async (file, drawingType) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await predictImage(file, drawingType);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Prediction failed. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  const predictFromCanvas = async (base64Data, drawingType) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await predictCanvas(base64Data, drawingType);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Prediction failed. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setLoading(false);
  };

  return { result, loading, error, predict, predictFromCanvas, reset };
}
