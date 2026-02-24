import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBrain, FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/upload', label: 'Upload' },
  { path: '/model', label: 'Model Info' },
  { path: '/about', label: 'About' },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-3'
      }`}
      style={{
        background: scrolled
          ? 'rgba(5, 5, 16, 0.85)'
          : 'rgba(5, 5, 16, 0.5)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? '1px solid rgba(124, 58, 237, 0.2)'
          : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <Link to="/" className="flex items-center gap-3 no-underline group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <FaBrain className="text-2xl text-primary relative z-10" />
              <div className="absolute inset-0 blur-lg bg-primary/40 rounded-full" />
            </motion.div>
            <span className="text-xl font-heading font-bold gradient-text tracking-wider">
              NEURODETECT
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 no-underline group"
              >
                <span className={`relative z-10 transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-white'
                    : 'text-text-secondary group-hover:text-white'
                }`}>
                  {link.label}
                </span>
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.25), rgba(6, 182, 212, 0.15))',
                      border: '1px solid rgba(124, 58, 237, 0.3)',
                    }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-text-secondary hover:text-primary bg-transparent border-none transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-primary/10"
            style={{ background: 'rgba(5, 5, 16, 0.95)', backdropFilter: 'blur(20px)' }}
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium no-underline transition-all ${
                    location.pathname === link.path
                      ? 'bg-primary/20 text-white border-l-2 border-primary'
                      : 'text-text-secondary hover:text-white hover:bg-surface-light/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
