"""
Parkinson's Disease Prediction - Flask API Server

Endpoints:
    GET  /api/health        - Health check
    POST /api/predict       - Predict from uploaded image
    POST /api/predict-canvas - Predict from canvas drawing (base64)
    GET  /api/model-info    - Model performance statistics
"""

import os
import json
import uuid
import base64
from io import BytesIO

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from PIL import Image
import numpy as np

from config import (
    MODEL_PATH, TRAINING_HISTORY_PATH, CLASS_INDICES_PATH,
    UPLOAD_FOLDER, STATIC_FOLDER, ALLOWED_EXTENSIONS, MAX_CONTENT_LENGTH, IMG_SIZE
)

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = MAX_CONTENT_LENGTH
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Ensure directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(STATIC_FOLDER, exist_ok=True)

# Global model reference
model = None


def load_model():
    """Load the trained model."""
    global model
    if os.path.exists(MODEL_PATH):
        import tensorflow as tf
        model = tf.keras.models.load_model(MODEL_PATH)
        print(f"Model loaded from {MODEL_PATH}")
    else:
        print(f"WARNING: Model not found at {MODEL_PATH}")
        print("Run 'python model/train_model.py' first to train the model.")


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def predict_image(img_array):
    """Run prediction on preprocessed image array."""
    prediction = model.predict(img_array, verbose=0)
    confidence = float(prediction[0][0])

    # sigmoid output: >0.5 = parkinson, <0.5 = healthy
    if confidence > 0.5:
        return "parkinson", confidence
    else:
        return "healthy", 1 - confidence


# ==================== ROUTES ====================

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "ok",
        "model_loaded": model is not None
    })


@app.route("/api/predict", methods=["POST"])
def predict():
    """Predict from an uploaded image file."""
    if model is None:
        return jsonify({"error": "Model not loaded. Train the model first."}), 503

    if "image" not in request.files:
        return jsonify({"error": "No image file provided."}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "No file selected."}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type. Use PNG, JPG, or JPEG."}), 415

    try:
        # Save uploaded file
        ext = file.filename.rsplit(".", 1)[1].lower()
        filename = f"{uuid.uuid4().hex}.{ext}"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)

        # Preprocess
        from utils.preprocessing import preprocess_image
        img_array = preprocess_image(filepath)

        # Predict
        label, confidence = predict_image(img_array)

        # Generate Grad-CAM
        from utils.grad_cam import generate_grad_cam
        grad_cam_filename = generate_grad_cam(model, img_array, filepath)

        # Save original for display
        original_filename = f"original_{filename}"
        original_dest = os.path.join(STATIC_FOLDER, original_filename)
        Image.open(filepath).convert("RGB").resize((IMG_SIZE, IMG_SIZE)).save(original_dest)

        response = {
            "prediction": label,
            "confidence": confidence,
            "original_url": f"/api/static/{original_filename}",
            "grad_cam_url": f"/api/static/{grad_cam_filename}" if grad_cam_filename else None,
        }

        # Clean up upload
        os.remove(filepath)

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500


@app.route("/api/predict-canvas", methods=["POST"])
def predict_canvas():
    """Predict from a base64-encoded canvas drawing."""
    if model is None:
        return jsonify({"error": "Model not loaded. Train the model first."}), 503

    data = request.get_json()
    if not data or "image_data" not in data:
        return jsonify({"error": "No image data provided."}), 400

    try:
        base64_data = data["image_data"]

        # Save canvas image for Grad-CAM
        if "," in base64_data:
            img_b64 = base64_data.split(",")[1]
        else:
            img_b64 = base64_data

        img_bytes = base64.b64decode(img_b64)
        temp_filename = f"{uuid.uuid4().hex}.png"
        temp_path = os.path.join(UPLOAD_FOLDER, temp_filename)

        # Save inverted version (for Grad-CAM display)
        canvas_img = Image.open(BytesIO(img_bytes)).convert("RGB")
        inverted = Image.fromarray(255 - np.array(canvas_img))
        inverted.save(temp_path)

        # Preprocess canvas image
        from utils.preprocessing import preprocess_canvas_image
        img_array = preprocess_canvas_image(base64_data)

        # Predict
        label, confidence = predict_image(img_array)

        # Generate Grad-CAM on the inverted image
        from utils.grad_cam import generate_grad_cam
        grad_cam_filename = generate_grad_cam(model, img_array, temp_path)

        # Save original for display
        original_filename = f"original_{temp_filename}"
        original_dest = os.path.join(STATIC_FOLDER, original_filename)
        inverted.resize((IMG_SIZE, IMG_SIZE)).save(original_dest)

        response = {
            "prediction": label,
            "confidence": confidence,
            "original_url": f"/api/static/{original_filename}",
            "grad_cam_url": f"/api/static/{grad_cam_filename}" if grad_cam_filename else None,
        }

        # Clean up
        os.remove(temp_path)

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500


@app.route("/api/model-info", methods=["GET"])
def model_info():
    """Return model performance statistics."""
    if not os.path.exists(TRAINING_HISTORY_PATH):
        return jsonify({"error": "No training data found. Train the model first."}), 404

    with open(TRAINING_HISTORY_PATH, "r") as f:
        data = json.load(f)

    return jsonify(data)


@app.route("/api/static/<path:filename>", methods=["GET"])
def serve_static(filename):
    """Serve static files (Grad-CAM images, etc.)."""
    return send_from_directory(STATIC_FOLDER, filename)


# ==================== MAIN ====================

if __name__ == "__main__":
    load_model()
    app.run(host="0.0.0.0", port=5001, debug=True)
