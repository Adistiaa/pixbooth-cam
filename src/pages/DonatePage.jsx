import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, User, Heart } from "lucide-react";

const DonatePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-white p-19">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact */}
        <motion.div
          className="bg-black/30 backdrop-blur-md p-6 rounded-lg shadow-lg border border-white/10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <form className="space-y-4">
            <div className="flex items-center bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-lg">
              <User className="text-gray-400 mr-2" />
              <input type="text" placeholder="Nama" className="w-full bg-transparent text-white focus:outline-none" />
            </div>
            <div className="flex items-center bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-lg">
              <Mail className="text-gray-400 mr-2" />
              <input type="email" placeholder="Email" className="w-full bg-transparent text-white focus:outline-none" />
            </div>
            <div className="flex items-center bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-lg">
              <MapPin className="text-gray-400 mr-2" />
              <input type="text" placeholder="Alamat" className="w-full bg-transparent text-white focus:outline-none" />
            </div>
            <textarea placeholder="Alasan" className="w-full bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-lg focus:outline-none" rows="4"></textarea>
            <button className="w-full bg-gradient-to-r bg-black/40 backdrop-blur-md border border-white/10 hover:opacity-80 p-2 rounded-lg font-semibold">Kirim</button>
          </form>
        </motion.div>

        {/* Donasi */}
        <motion.div
          className="bg-black/30 backdrop-blur-md p-6 rounded-lg shadow-lg border border-white/10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Heart className="text-red-500 mr-2" /> Donasi Kalo Ada Aja Ya
          </h2>
          <p className="text-gray-400 mb-4">Dukung projek ini dengan donasi untuk berkembang! Tapi kalo memang tidak ada tidak masalah</p>
          <div className="space-y-2">
            <button className="w-full bg-black/40 backdrop-blur-md border border-white/10 hover:opacity-80 p-2 rounded-lg font-semibold">Donasi via Bank</button>
            <button className="w-full bg-black/40 backdrop-blur-md border border-white/10 hover:opacity-80 p-2 rounded-lg font-semibold">Donasi via PayPal</button>
            <button className="w-full bg-black/40 backdrop-blur-md border border-white/10 hover:opacity-80 p-2 rounded-lg font-semibold">Donasi via Crypto</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DonatePage;
