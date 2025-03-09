import { motion } from "framer-motion";
import { Camera, Heart } from "lucide-react";
import Button from "../components/ui/Button";
import TextTyping from "../components/TextTyping";
import MovingText from "../components/MovingText";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white text-center p-5">
      <motion.h1 
        className="text-6xl font-extrabold text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <MovingText
        text="PixBooth"
        speed={1.5}
      />
      </motion.h1>
      <motion.p 
      className="text-gray-100 mb-5 text-lg "
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0  }}
      transition={{ duration: 0.5, delay: 0.2 }}
      >
        Created By <TextTyping />
      </motion.p>
      <div className="flex gap-4">
        <Button link="/cam" text="Start" icon={<Camera size={20} />} />
        <Button link="/contact" text="Donate" icon={<Heart size={20} />} />
      </div>
    </div>
  );
};

export default HomePage;
