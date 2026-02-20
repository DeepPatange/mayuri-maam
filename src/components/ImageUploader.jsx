import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCloudUploadAlt, FaTimes, FaImage } from 'react-icons/fa';

export default function ImageUploader({ onImageChange }) {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
    onImageChange?.(file);
  }, [onImageChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.bmp', '.webp'] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  const clearFile = (e) => {
    e.stopPropagation();
    setPreview(null);
    setFileName('');
    onImageChange?.(null);
  };

  return (
    <div
      {...getRootProps()}
      className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
        isDragActive
          ? 'border-primary bg-primary/5'
          : 'border-text-secondary/20 hover:border-primary/50 hover:bg-surface-light/30'
      }`}
    >
      <input {...getInputProps()} />

      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative"
          >
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-xl shadow-lg"
            />
            <button
              onClick={clearFile}
              className="absolute top-2 right-2 bg-danger/80 hover:bg-danger text-white rounded-full w-8 h-8 flex items-center justify-center border-none cursor-pointer"
            >
              <FaTimes size={12} />
            </button>
            <p className="text-text-secondary text-sm mt-3">{fileName}</p>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              animate={isDragActive ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
              className="text-5xl text-primary/60"
            >
              {isDragActive ? <FaImage /> : <FaCloudUploadAlt />}
            </motion.div>
            <div>
              <p className="text-text-primary font-medium">
                {isDragActive ? 'Drop your image here' : 'Drag & drop an image here'}
              </p>
              <p className="text-text-secondary text-sm mt-1">
                or click to browse (PNG, JPG, JPEG)
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
