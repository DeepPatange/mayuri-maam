# Dataset Download Instructions

## Step 1: Download from Kaggle

Download these two datasets:

1. **Parkinson Disease Spiral Drawings** (by team-ai)
   - URL: https://www.kaggle.com/datasets/team-ai/parkinson-disease-spiral-drawings
   - Click "Download" -> Save the zip file here

2. **Parkinson's Drawings** (by kmader)
   - URL: https://www.kaggle.com/datasets/kmader/parkinsons-drawings
   - Click "Download" -> Save the zip file here

## Step 2: Extract

Extract both zip files into this `dataset/` folder. You should see folders like:
```
dataset/
  spiral/
  wave/
  (or similar structure from each dataset)
```

## Step 3: Run combine script

```bash
cd dataset
python combine_datasets.py
```

This will create a unified `dataset/combined/` folder ready for training.

## Alternative: Use existing data

If you only have the original `drawings.zip` from the project root, extract it and the training script will still work (with lower accuracy due to fewer images).
