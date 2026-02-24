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
      className={`relative rounded-2xl p-10 text-center cursor-pointer transition-all duration-500 ${
        isDragActive ? 'scale-[1.02]' : ''
      }`}
      style={{
        background: isDragActive
          ? 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.05))'
          : 'linear-gradient(135deg, rgba(15,15,35,0.6), rgba(26,26,62,0.4))',
        border: isDragActive
          ? '2px dashed rgba(124,58,237,0.6)'
          : '2px dashed rgba(124,58,237,0.2)',
        boxShadow: isDragActive
          ? '0 0 40px rgba(124,58,237,0.15), inset 0 0 40px rgba(124,58,237,0.05)'
          : 'none',
      }}
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
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 mx-auto rounded-xl"
                style={{ boxShadow: '0 0 30px rgba(124,58,237,0.2)' }}
              />
              <button
                onClick={clearFile}
                className="absolute -top-2 -right-2 bg-danger hover:bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-navy cursor-pointer transition-colors"
              >
                <FaTimes size={12} />
              </button>
            </div>
            <p className="text-text-secondary text-sm mt-4 font-medium">{fileName}</p>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-5"
          >
            <motion.div
              animate={isDragActive
                ? { scale: 1.2, y: -8 }
                : { scale: 1, y: [0, -5, 0] }
              }
              transition={isDragActive
                ? { duration: 0.3 }
                : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }
              className="relative"
            >
              <div className="text-6xl text-primary">
                {isDragActive ? <FaImage /> : <FaCloudUploadAlt />}
              </div>
              <div className="absolute inset-0 blur-xl bg-primary/20 scale-150" />
            </motion.div>
            <div>
              <p className="text-text-primary font-heading font-semibold text-lg tracking-wide">
                {isDragActive ? 'Drop your image here' : 'Drag & drop an image'}
              </p>
              <p className="text-text-secondary text-sm mt-2">
                or click to browse <span className="text-primary-light">(PNG, JPG, JPEG)</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
