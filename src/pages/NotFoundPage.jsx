import React from 'react'
import { motion } from "framer-motion";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white text-center p-5">
        <motion.h1 
        className="text-9xl font-extrabold text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>
      <motion.p 
      className="text-gray-100 mb-5 text-lg "
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0  }}
      transition={{ duration: 0.5, delay: 0.2 }}
      >
        N0t_F0und
      </motion.p>
    </div>
  )
}

export default NotFoundPage