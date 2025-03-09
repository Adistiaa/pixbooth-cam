import { motion } from "framer-motion";
import { ChevronDown, Code, ShieldCheck, Clock, LayoutDashboard } from "lucide-react";

const features = [
  {
    title: "Keamanan Web",
    description: "Kami tidak memasang penyadap atau virus di wbesite ini untuk menjaga data Anda tetap aman.",
    icon: <ShieldCheck className="text-blue-400" size={20} />,
  },
  {
    title: "Performa Cepat",
    description: "Dibangun dengan teknologi modern untuk memastikan kecepatan dan efisiensi pengguna.",
    icon: <Clock className="text-green-400" size={20} />,
  },
  {
    title: "Tampilan Modern",
    description: "UI/UX yang didesain agar ramah pengguna dengan tampilan yang interaktif.",
    icon: <LayoutDashboard className="text-purple-400" size={20} />,
  },
  {
    title: "Teknologi Terbaru",
    description: "Dibangun dengan framework modern untuk menjaga stabilitas performa device.",
    icon: <Code className="text-yellow-400" size={20} />,
  },
];

const FeaturePage = () => {
  return (
    <div className="min-h-screen py-20 px-6 text-white flex flex-col items-center">
      <motion.h1
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Feature
      </motion.h1>
      
      <div className="w-full max-w-3xl space-y-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="collapse collapse-arrow bg-black/40 backdrop-blur-md border border-white/10 shadow-lg rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <input type="checkbox" />
            <div className="collapse-title flex items-center gap-2 font-semibold text-lg">
              {feature.icon} {feature.title}
            </div>
            <div className="collapse-content text-sm text-gray-300">
              {feature.description}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturePage;
