import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)

# Model
MODEL_PATH = os.path.join(BASE_DIR, "model", "parkinsons_model.h5")
CLASS_INDICES_PATH = os.path.join(BASE_DIR, "model", "class_indices.json")
TRAINING_HISTORY_PATH = os.path.join(BASE_DIR, "model", "training_history.json")
IMG_SIZE = 224

# Dataset paths (in order of preference)
DATASET_PATHS = [
    os.path.join(PROJECT_ROOT, "dataset", "combined"),  # Combined datasets
    os.path.join(PROJECT_ROOT, "drawings"),              # Original extracted drawings
]

# Upload
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
STATIC_FOLDER = os.path.join(BASE_DIR, "static")
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "bmp", "webp"}
MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # 10 MB
