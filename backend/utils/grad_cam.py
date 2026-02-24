"""
Grad-CAM (Gradient-weighted Class Activation Mapping) visualization.
Shows which regions of the image the model focuses on for its prediction.
"""

import os
import uuid
import numpy as np
import cv2
import tensorflow as tf
from PIL import Image
from tensorflow.keras.applications.efficientnet import preprocess_input
from config import IMG_SIZE, STATIC_FOLDER


def generate_grad_cam(model, img_array, original_image_path):
    """
    Generate Grad-CAM heatmap overlay for a prediction.

    Args:
        model: Trained Keras model
        img_array: Preprocessed image array (1, 224, 224, 3)
        original_image_path: Path to original image for overlay

    Returns:
        Path to saved Grad-CAM image, or None on failure
    """
    try:
        # Find the last convolutional layer
        last_conv_layer = None
        for layer in reversed(model.layers):
            if isinstance(layer, tf.keras.layers.Conv2D):
                last_conv_layer = layer
                break
            # Also check inside the base model
            if hasattr(layer, 'layers'):
                for sub_layer in reversed(layer.layers):
                    if isinstance(sub_layer, tf.keras.layers.Conv2D):
                        last_conv_layer = sub_layer
                        break
                if last_conv_layer:
                    break

        if last_conv_layer is None:
            return None

        # Create gradient model
        grad_model = tf.keras.Model(
            inputs=model.input,
            outputs=[last_conv_layer.output, model.output]
        )

        # Compute gradients
        with tf.GradientTape() as tape:
            conv_outputs, predictions = grad_model(img_array)
            loss = predictions[:, 0]

        grads = tape.gradient(loss, conv_outputs)

        if grads is None:
            return None

        # Global average pooling of gradients
        pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

        # Weight the feature maps
        conv_outputs = conv_outputs[0]
        heatmap = conv_outputs @ pooled_grads[..., tf.newaxis]
        heatmap = tf.squeeze(heatmap)
        heatmap = tf.maximum(heatmap, 0) / (tf.math.reduce_max(heatmap) + 1e-8)
        heatmap = heatmap.numpy()

        # Resize heatmap to original image size
        heatmap = cv2.resize(heatmap, (IMG_SIZE, IMG_SIZE))
        heatmap = np.uint8(255 * heatmap)
        heatmap_colored = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)

        # Load and resize original image
        original = Image.open(original_image_path).convert("RGB").resize((IMG_SIZE, IMG_SIZE))
        original_np = np.array(original)
        original_bgr = cv2.cvtColor(original_np, cv2.COLOR_RGB2BGR)

        # Overlay heatmap on original
        overlay = cv2.addWeighted(original_bgr, 0.6, heatmap_colored, 0.4, 0)
        overlay_rgb = cv2.cvtColor(overlay, cv2.COLOR_BGR2RGB)

        # Save
        os.makedirs(STATIC_FOLDER, exist_ok=True)
        filename = f"gradcam_{uuid.uuid4().hex[:8]}.png"
        filepath = os.path.join(STATIC_FOLDER, filename)
        Image.fromarray(overlay_rgb).save(filepath)

        return filename

    except Exception as e:
        print(f"Grad-CAM generation failed: {e}")
        return None
