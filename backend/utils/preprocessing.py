"""
Image preprocessing utilities for prediction.
"""

import numpy as np
from PIL import Image
from tensorflow.keras.applications.efficientnet import preprocess_input
from config import IMG_SIZE


def preprocess_image(image_path):
    """
    Load and preprocess an image file for model prediction.
    Returns preprocessed numpy array of shape (1, IMG_SIZE, IMG_SIZE, 3).
    """
    img = Image.open(image_path).convert("RGB")
    img = img.resize((IMG_SIZE, IMG_SIZE))
    img_array = np.array(img, dtype=np.float32)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return img_array


def preprocess_canvas_image(base64_data):
    """
    Preprocess a base64-encoded canvas image.
    Canvas draws white on black, but dataset images are typically
    dark drawings on white/light background, so we invert.
    """
    import base64
    from io import BytesIO

    # Remove data URL prefix if present
    if "," in base64_data:
        base64_data = base64_data.split(",")[1]

    img_bytes = base64.b64decode(base64_data)
    img = Image.open(BytesIO(img_bytes)).convert("RGB")

    # Invert colors (canvas is white-on-black, dataset is dark-on-light)
    img_array = np.array(img)
    img_array = 255 - img_array
    img = Image.fromarray(img_array)

    img = img.resize((IMG_SIZE, IMG_SIZE))
    img_array = np.array(img, dtype=np.float32)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return img_array
