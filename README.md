# NeuroDetect - Parkinson's Disease Prediction Using Deep Learning

**Project by: Mayuri** | M.Tech Project 2026

A full-stack web application that uses EfficientNetB0 (transfer learning) to detect Parkinson's disease from hand-drawn spiral and wave images with 90%+ accuracy.

---

## Features

- **AI-Powered Prediction** - Upload spiral/wave drawings for instant Parkinson's detection
- **Interactive Drawing Canvas** - Draw spirals directly in the browser
- **Grad-CAM Visualization** - See which regions the AI focuses on
- **Confidence Gauge** - Animated confidence score display
- **Model Performance Dashboard** - Training curves, confusion matrix, metrics
- **Modern UI** - Dark-themed, animated React frontend

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Tailwind CSS, Framer Motion, Recharts, Vite |
| **Backend** | Python, Flask, Flask-CORS |
| **ML Model** | TensorFlow/Keras, EfficientNetB0 (Transfer Learning) |
| **Visualization** | Grad-CAM, OpenCV |
| **Data Science** | NumPy, Scikit-learn, Pillow |

---

## Project Structure

```
mayuri/
├── backend/              # Flask API server
│   ├── app.py            # REST API endpoints
│   ├── config.py         # Configuration
│   ├── model/
│   │   └── train_model.py # Training pipeline
│   └── utils/
│       ├── preprocessing.py
│       └── grad_cam.py
├── frontend/             # React application
│   └── src/
│       ├── components/   # Reusable UI components
│       └── pages/        # Page components
├── dataset/              # Dataset scripts
├── notebooks/            # Original Jupyter notebook
└── output/               # Screenshots
```

---

## Setup & Run

### Prerequisites
- Python 3.9+
- Node.js 18+
- pip, npm

### 1. Install Dependencies

```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd ../frontend
npm install
```

### 2. Prepare Dataset

Download datasets from Kaggle:
- [Parkinson Disease Spiral Drawings](https://www.kaggle.com/datasets/team-ai/parkinson-disease-spiral-drawings)
- [Parkinson's Drawings](https://www.kaggle.com/datasets/kmader/parkinsons-drawings)

Extract into `dataset/` folder, then:
```bash
cd dataset
python combine_datasets.py
```

Or simply extract the included `drawings.zip` in the project root.

### 3. Train the Model

```bash
cd backend
python model/train_model.py
```

### 4. Start the Application

```bash
# Terminal 1: Backend (port 5000)
cd backend
python app.py

# Terminal 2: Frontend (port 5173)
cd frontend
npm run dev
```

Open http://localhost:5173 in your browser.

---

## Model Architecture

**EfficientNetB0 + Transfer Learning**

```
EfficientNetB0 (ImageNet weights, frozen)
    -> GlobalAveragePooling2D
    -> BatchNormalization -> Dropout(0.3)
    -> Dense(256, ReLU)
    -> BatchNormalization -> Dropout(0.3)
    -> Dense(1, Sigmoid)
```

**Training Strategy:**
- Phase 1: Train classification head only (lr=1e-3, 20 epochs)
- Phase 2: Fine-tune last 20 layers (lr=1e-5, 30 epochs)
- Data augmentation: rotation, shifts, shear, zoom, flips, brightness

---

## Key Improvements Over Original

| Aspect | Before | After |
|--------|--------|-------|
| Model | 2-layer CNN from scratch | EfficientNetB0 transfer learning |
| Dataset | 72 training images | 1000+ combined images |
| Accuracy | ~50% (random) | 90%+ |
| Interface | Jupyter notebook only | Full-stack web app |
| Interpretability | None | Grad-CAM heatmaps |
| Input method | File path only | Upload + draw in browser |

---

## Author

**Mayuri** - M.Tech Project, Parkinson's Disease Prediction Using Deep Learning
