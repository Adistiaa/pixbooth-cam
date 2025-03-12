import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Feature", path: "/feature" },
  { name: "Contact", path: "/contact" },
  { name: "PhotoBooth", path: "/cam" },
];

function Navbar() {
  const location = useLocation();
  const activeItem = navItems.find((item) => item.path === location.pathname)?.name || "React";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-transparent w-11/12 md:w-auto">
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-4 px-6 py-2 bg-black/40 backdrop-blur-md rounded-full shadow-lg">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="relative px-4 py-2 text-white font-semibold transition-colors"
          >
            {activeItem === item.name && (
              <motion.span
                layoutId="highlight"
                className="absolute inset-0 bg-gray-700 rounded-full z-[-1]"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            {item.name}
          </Link>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex justify-between items-center px-4 py-2 bg-black/40 backdrop-blur-md rounded-full shadow-lg">
          <span className="text-white font-semibold">{activeItem}</span>
          <button
            onClick={toggleMenu}
            className="text-white p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-2 py-2 px-4 bg-black/80 backdrop-blur-md rounded-xl shadow-lg"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block py-2 text-white font-medium hover:bg-gray-700 hover:bg-opacity-40 rounded px-3"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Navbar;