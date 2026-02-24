import { FaBrain, FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-surface/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaBrain className="text-primary" />
            <span className="text-text-secondary text-sm">
              NeuroDetect - Parkinson's Disease Prediction
            </span>
          </div>
          <div className="text-text-secondary text-sm flex items-center gap-1">
            Made with <FaHeart className="text-danger text-xs" /> by Mayuri | M.Tech Project 2026
          </div>
          <div className="text-text-secondary text-xs">
            For educational purposes only. Not for medical diagnosis.
          </div>
        </div>
      </div>
    </footer>
  );
}
