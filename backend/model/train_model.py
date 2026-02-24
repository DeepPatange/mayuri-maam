"""
Parkinson's Disease Detection - Model Training Script
Uses EfficientNetB0 with transfer learning for high accuracy.

Usage:
    python train_model.py

Make sure the dataset is prepared first (see dataset/README_DATASET.md).
"""

import os
import sys
import json
import numpy as np

# Add parent to path for config import
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import DATASET_PATHS, MODEL_PATH, TRAINING_HISTORY_PATH, CLASS_INDICES_PATH, IMG_SIZE

import tensorflow as tf
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.applications.efficientnet import preprocess_input
from tensorflow.keras.layers import (
    GlobalAveragePooling2D, Dense, Dropout, BatchNormalization
)
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import (
    EarlyStopping, ReduceLROnPlateau, ModelCheckpoint, CSVLogger
)
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.model_selection import train_test_split
from PIL import Image


def find_dataset():
    """Find the first available dataset directory."""
    for path in DATASET_PATHS:
        if os.path.exists(path):
            # Check if it has spiral or wave subdirectories
            for subdir in os.listdir(path):
                subpath = os.path.join(path, subdir)
                if os.path.isdir(subpath) and subdir.lower() in ("spiral", "wave"):
                    print(f"Found dataset at: {path}")
                    return path
    return None


def prepare_data(dataset_dir, drawing_type="spiral"):
    """
    Prepare image paths and labels for training.
    Returns paths for train/val/test splits.
    """
    healthy_dir = os.path.join(dataset_dir, drawing_type, "healthy")
    parkinson_dir = os.path.join(dataset_dir, drawing_type, "parkinson")

    # Also check for 'training' and 'testing' subdirectory structure
    if not os.path.exists(healthy_dir):
        # Try the training/testing structure
        healthy_train = os.path.join(dataset_dir, drawing_type, "training", "healthy")
        healthy_test = os.path.join(dataset_dir, drawing_type, "testing", "healthy")
        parkinson_train = os.path.join(dataset_dir, drawing_type, "training", "parkinson")
        parkinson_test = os.path.join(dataset_dir, drawing_type, "testing", "parkinson")

        if os.path.exists(healthy_train):
            healthy_dir = None
            parkinson_dir = None
            # Gather from both splits
            all_images = []
            all_labels = []
            for d in [healthy_train, healthy_test]:
                if os.path.exists(d):
                    for f in os.listdir(d):
                        if f.lower().endswith((".png", ".jpg", ".jpeg")):
                            all_images.append(os.path.join(d, f))
                            all_labels.append(0)
            for d in [parkinson_train, parkinson_test]:
                if os.path.exists(d):
                    for f in os.listdir(d):
                        if f.lower().endswith((".png", ".jpg", ".jpeg")):
                            all_images.append(os.path.join(d, f))
                            all_labels.append(1)
            return all_images, all_labels

    if healthy_dir and os.path.exists(healthy_dir):
        all_images = []
        all_labels = []
        for f in os.listdir(healthy_dir):
            if f.lower().endswith((".png", ".jpg", ".jpeg", ".bmp")):
                all_images.append(os.path.join(healthy_dir, f))
                all_labels.append(0)
        for f in os.listdir(parkinson_dir):
            if f.lower().endswith((".png", ".jpg", ".jpeg", ".bmp")):
                all_images.append(os.path.join(parkinson_dir, f))
                all_labels.append(1)
        return all_images, all_labels

    return [], []


def load_images(image_paths, labels):
    """Load and preprocess images into numpy arrays."""
    images = []
    valid_labels = []
    for path, label in zip(image_paths, labels):
        try:
            img = Image.open(path).convert("RGB").resize((IMG_SIZE, IMG_SIZE))
            img_array = np.array(img, dtype=np.float32)
            images.append(img_array)
            valid_labels.append(label)
        except Exception as e:
            print(f"  Skipping {path}: {e}")
    return np.array(images), np.array(valid_labels)


def build_model():
    """Build EfficientNetB0 transfer learning model."""
    # Load pre-trained base
    base_model = EfficientNetB0(
        weights="imagenet",
        include_top=False,
        input_shape=(IMG_SIZE, IMG_SIZE, 3)
    )
    base_model.trainable = False  # Freeze for Phase 1

    # Custom classification head
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = BatchNormalization()(x)
    x = Dropout(0.3)(x)
    x = Dense(256, activation="relu")(x)
    x = BatchNormalization()(x)
    x = Dropout(0.3)(x)
    x = Dense(1, activation="sigmoid")(x)

    model = Model(inputs=base_model.input, outputs=x)
    return model, base_model


def create_data_generators(X_train, y_train, X_val, y_val):
    """Create augmented data generators."""
    train_datagen = ImageDataGenerator(
        preprocessing_function=preprocess_input,
        rotation_range=30,
        width_shift_range=0.15,
        height_shift_range=0.15,
        shear_range=0.15,
        zoom_range=0.2,
        brightness_range=[0.8, 1.2],
        horizontal_flip=True,
        vertical_flip=True,
        fill_mode="nearest"
    )

    val_datagen = ImageDataGenerator(
        preprocessing_function=preprocess_input
    )

    train_gen = train_datagen.flow(X_train, y_train, batch_size=16)
    val_gen = val_datagen.flow(X_val, y_val, batch_size=16, shuffle=False)

    return train_gen, val_gen


def train():
    """Main training pipeline."""
    print("=" * 60)
    print("  Parkinson's Disease Detection - Model Training")
    print("=" * 60)

    # 1. Find dataset
    dataset_dir = find_dataset()
    if not dataset_dir:
        print("\nERROR: No dataset found!")
        print("Please either:")
        print("  1. Download Kaggle datasets and run dataset/combine_datasets.py")
        print("  2. Extract drawings.zip in the project root")
        sys.exit(1)

    # 2. Gather data from both spiral and wave
    print("\nGathering images...")
    all_images = []
    all_labels = []

    for drawing_type in ["spiral", "wave"]:
        images, labels = prepare_data(dataset_dir, drawing_type)
        print(f"  {drawing_type}: {len(images)} images")
        all_images.extend(images)
        all_labels.extend(labels)

    if len(all_images) == 0:
        print("\nERROR: No images found in dataset!")
        sys.exit(1)

    print(f"\nTotal images: {len(all_images)}")
    print(f"  Healthy: {all_labels.count(0)}")
    print(f"  Parkinson: {all_labels.count(1)}")

    # 3. Load images
    print("\nLoading and preprocessing images...")
    X, y = load_images(all_images, all_labels)
    print(f"  Loaded: {X.shape[0]} images of size {X.shape[1:]}")

    # 4. Split data (70/15/15)
    X_train, X_temp, y_train, y_temp = train_test_split(
        X, y, test_size=0.3, stratify=y, random_state=42
    )
    X_val, X_test, y_val, y_test = train_test_split(
        X_temp, y_temp, test_size=0.5, stratify=y_temp, random_state=42
    )
    print(f"\n  Train: {len(X_train)} | Val: {len(X_val)} | Test: {len(X_test)}")

    # 5. Create data generators
    train_gen, val_gen = create_data_generators(X_train, y_train, X_val, y_val)

    # 6. Build model
    print("\nBuilding EfficientNetB0 model...")
    model, base_model = build_model()
    model.summary()

    # 7. Callbacks
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    callbacks = [
        EarlyStopping(monitor="val_loss", patience=8, restore_best_weights=True, verbose=1),
        ReduceLROnPlateau(monitor="val_loss", factor=0.5, patience=3, min_lr=1e-7, verbose=1),
        ModelCheckpoint(MODEL_PATH, monitor="val_accuracy", save_best_only=True, verbose=1),
    ]

    # ========== PHASE 1: Train top layers only ==========
    print("\n" + "=" * 60)
    print("  PHASE 1: Training classification head (base frozen)")
    print("=" * 60)

    model.compile(
        optimizer=Adam(learning_rate=1e-3),
        loss="binary_crossentropy",
        metrics=["accuracy"]
    )

    history1 = model.fit(
        train_gen,
        steps_per_epoch=max(len(X_train) // 16, 1),
        epochs=20,
        validation_data=val_gen,
        validation_steps=max(len(X_val) // 16, 1),
        callbacks=callbacks,
        verbose=1
    )

    # ========== PHASE 2: Fine-tune top layers of base ==========
    print("\n" + "=" * 60)
    print("  PHASE 2: Fine-tuning (unfreezing last 20 layers)")
    print("=" * 60)

    # Unfreeze last 20 layers
    base_model.trainable = True
    for layer in base_model.layers[:-20]:
        layer.trainable = False

    model.compile(
        optimizer=Adam(learning_rate=1e-5),
        loss="binary_crossentropy",
        metrics=["accuracy"]
    )

    history2 = model.fit(
        train_gen,
        steps_per_epoch=max(len(X_train) // 16, 1),
        epochs=30,
        validation_data=val_gen,
        validation_steps=max(len(X_val) // 16, 1),
        callbacks=callbacks,
        verbose=1
    )

    # 8. Evaluate on test set
    print("\n" + "=" * 60)
    print("  Final Evaluation on Test Set")
    print("=" * 60)

    # Preprocess test data
    from tensorflow.keras.applications.efficientnet import preprocess_input as preprocess_fn
    X_test_processed = preprocess_fn(X_test.copy())
    test_loss, test_accuracy = model.evaluate(X_test_processed, y_test, verbose=0)
    print(f"\n  Test Accuracy: {test_accuracy:.4f}")
    print(f"  Test Loss: {test_loss:.4f}")

    # Predictions for confusion matrix
    y_pred_prob = model.predict(X_test_processed, verbose=0)
    y_pred = (y_pred_prob > 0.5).astype(int).flatten()

    from sklearn.metrics import confusion_matrix, classification_report, precision_score, recall_score, f1_score
    cm = confusion_matrix(y_test, y_pred)
    print("\n  Confusion Matrix:")
    print(f"    {cm}")
    print("\n  Classification Report:")
    print(classification_report(y_test, y_pred, target_names=["Healthy", "Parkinson"]))

    # 9. Save training history and metrics
    combined_history = {}
    for key in history1.history:
        combined_history[key] = history1.history[key] + history2.history[key]

    # Convert numpy values to Python floats for JSON serialization
    for key in combined_history:
        combined_history[key] = [float(v) for v in combined_history[key]]

    metrics = {
        "accuracy": float(test_accuracy),
        "precision": float(precision_score(y_test, y_pred)),
        "recall": float(recall_score(y_test, y_pred)),
        "f1_score": float(f1_score(y_test, y_pred)),
    }

    training_data = {
        "training_history": combined_history,
        "metrics": metrics,
        "confusion_matrix": cm.tolist(),
        "model_architecture": "EfficientNetB0 + Transfer Learning",
        "input_size": IMG_SIZE,
        "total_images": len(all_images),
        "train_size": len(X_train),
        "val_size": len(X_val),
        "test_size": len(X_test),
    }

    with open(TRAINING_HISTORY_PATH, "w") as f:
        json.dump(training_data, f, indent=2)
    print(f"\n  Training history saved to: {TRAINING_HISTORY_PATH}")

    # Save class indices
    class_indices = {"healthy": 0, "parkinson": 1}
    with open(CLASS_INDICES_PATH, "w") as f:
        json.dump(class_indices, f)

    print(f"  Model saved to: {MODEL_PATH}")
    print("\n" + "=" * 60)
    print("  Training Complete!")
    print("=" * 60)


if __name__ == "__main__":
    train()
