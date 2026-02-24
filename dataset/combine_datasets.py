"""
Dataset Combination Script
Merges multiple Parkinson's drawing datasets into a unified structure.
Deduplicates images by MD5 hash.

Usage:
    python combine_datasets.py

Place downloaded Kaggle datasets in this folder before running.
"""

import os
import shutil
import hashlib
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
OUTPUT_DIR = SCRIPT_DIR / "combined"
PROJECT_ROOT = SCRIPT_DIR.parent

# Categories to look for
CATEGORIES = {
    "spiral": {"healthy": ["healthy"], "parkinson": ["parkinson", "parkinsons"]},
    "wave": {"healthy": ["healthy"], "parkinson": ["parkinson", "parkinsons"]},
}


def md5_hash(filepath):
    """Compute MD5 hash of a file for deduplication."""
    h = hashlib.md5()
    with open(filepath, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()


def is_image(filename):
    """Check if file is an image."""
    return filename.lower().endswith((".png", ".jpg", ".jpeg", ".bmp", ".webp"))


def find_image_dirs(root_path):
    """Recursively find directories containing images matching our categories."""
    matches = []
    for dirpath, dirnames, filenames in os.walk(root_path):
        images = [f for f in filenames if is_image(f)]
        if images:
            matches.append((dirpath, images))
    return matches


def classify_directory(dirpath):
    """Determine drawing_type and class from directory path."""
    parts = dirpath.lower().replace("\\", "/")
    drawing_type = None
    label = None

    for dtype in CATEGORIES:
        if dtype in parts:
            drawing_type = dtype
            break

    if drawing_type:
        for class_name, aliases in CATEGORIES[drawing_type].items():
            for alias in aliases:
                if alias in parts:
                    label = class_name
                    break
            if label:
                break

    return drawing_type, label


def combine_datasets():
    """Main function to combine and deduplicate datasets."""
    print("=" * 50)
    print("Parkinson's Dataset Combiner")
    print("=" * 50)

    # Create output directories
    for dtype in CATEGORIES:
        for label in CATEGORIES[dtype]:
            out_dir = OUTPUT_DIR / dtype / label
            out_dir.mkdir(parents=True, exist_ok=True)

    # Track hashes for deduplication
    seen_hashes = {f"{dtype}/{label}": set()
                   for dtype in CATEGORIES
                   for label in CATEGORIES[dtype]}
    counts = {f"{dtype}/{label}": 0
              for dtype in CATEGORIES
              for label in CATEGORIES[dtype]}
    duplicates = 0

    # Search paths: dataset folder + project root (for existing drawings.zip extraction)
    search_paths = [SCRIPT_DIR, PROJECT_ROOT]

    for search_path in search_paths:
        image_dirs = find_image_dirs(search_path)
        for dirpath, images in image_dirs:
            # Skip the output directory
            if str(OUTPUT_DIR) in str(dirpath):
                continue

            drawing_type, label = classify_directory(dirpath)
            if not drawing_type or not label:
                continue

            key = f"{drawing_type}/{label}"
            dest_dir = OUTPUT_DIR / drawing_type / label

            for img_name in images:
                src = os.path.join(dirpath, img_name)
                file_hash = md5_hash(src)

                if file_hash in seen_hashes[key]:
                    duplicates += 1
                    continue

                seen_hashes[key].add(file_hash)
                # Use hash prefix in filename to avoid name collisions
                ext = Path(img_name).suffix
                dest_name = f"{file_hash[:8]}_{img_name}"
                dest = dest_dir / dest_name
                shutil.copy2(src, dest)
                counts[key] += 1

    # Print summary
    print("\nResults:")
    print("-" * 40)
    total = 0
    for key, count in counts.items():
        print(f"  {key}: {count} images")
        total += count
    print(f"\n  Total unique images: {total}")
    print(f"  Duplicates skipped: {duplicates}")
    print(f"\n  Output directory: {OUTPUT_DIR}")
    print("=" * 50)

    if total == 0:
        print("\nNo images found! Please:")
        print("1. Download datasets from Kaggle (see README_DATASET.md)")
        print("2. Extract them into this dataset/ folder")
        print("3. Or extract drawings.zip from the project root")


if __name__ == "__main__":
    combine_datasets()
