import { FaBrain, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-primary/10" style={{ background: 'linear-gradient(180deg, rgba(5,5,16,0) 0%, rgba(15,15,35,0.8) 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <FaBrain className="text-primary text-lg" />
              <span className="font-heading text-sm font-bold gradient-text tracking-wider">NEURODETECT</span>
            </div>
            <p className="text-text-secondary text-xs">AI-Powered Parkinson's Detection</p>
          </div>

          {/* Links */}
          <div className="flex justify-center gap-6">
            {[{ path: '/', label: 'Home' }, { path: '/upload', label: 'Upload' }, { path: '/model', label: 'Model' }, { path: '/about', label: 'About' }].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-text-secondary text-xs hover:text-primary-light transition-colors no-underline"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Credits */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <div className="text-text-secondary text-sm flex items-center gap-1">
              Made with <FaHeart className="text-accent text-xs" /> by Mayuri
            </div>
            <div className="text-text-secondary text-xs opacity-60">
              M.Tech Project 2026 | Educational use only
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="mt-8 h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #7c3aed, #06b6d4, #f472b6, transparent)' }} />
      </div>
    </footer>
  );
}
