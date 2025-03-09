import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Button = ({ link, text, icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link
        to={link}
        className="btn btn-soft flex items-center gap-2 px-5 py-3 text-lg font-semibold shadow-lg"
      >
        {icon} {text}
      </Link>
    </motion.div>
  );
};

export default Button;
