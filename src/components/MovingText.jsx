import React from 'react';
import { motion } from 'framer-motion';

const MovingText = ({ text, speed = 2, className = '' }) => {
  return (
    <div className={`text-white ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={{ y: [0, -10, 0] }} // Bergerak naik turun
          transition={{
            duration: speed,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: index * 0.1, // Memberikan efek gelombang per huruf
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

export default MovingText;
