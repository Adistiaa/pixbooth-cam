import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Feature", path: "/feature" },
  { name: "Contact", path: "/contact" },
];

function Navbar() {
  const location = useLocation(); // Ambil path saat ini
  const activeItem = navItems.find((item) => item.path === location.pathname)?.name || "React";

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-transparent">
      <div className="flex gap-4 px-6 py-2 bg-black/40 backdrop-blur-md rounded-full shadow-lg">
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
    </div>
  );
}

export default Navbar;
