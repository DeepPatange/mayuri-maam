import axios from 'axios';
import { API_BASE } from '../constants';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
});

export const predictImage = (file, drawingType) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('drawing_type', drawingType);
  return api.post('/api/predict', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const predictCanvas = (base64Data, drawingType) => {
  return api.post('/api/predict-canvas', {
    image_data: base64Data,
    drawing_type: drawingType,
  });
};

export const getModelInfo = () => api.get('/api/model-info');

export const healthCheck = () => api.get('/api/health');
