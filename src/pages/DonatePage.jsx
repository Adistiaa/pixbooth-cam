import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, User, Heart } from "lucide-react";
import emailjs from '@emailjs/browser';

const DonatePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    // Replace these with your actual EmailJS service, template, and user IDs
    emailjs.sendForm(
      'service_sdxsvji', 
      'template_g1qaz48', 
      form.current, 
      'DSfLqJnveZ7XpJG6w'
    )
    .then((result) => {
      setStatus({ type: 'success', message: 'Pesan berhasil dikirim!' });
      setFormData({ name: '', email: '', message: '', reason: '' });
      setLoading(false);
    }, (error) => {
      setStatus({ type: 'error', message: 'Terjadi kesalahan. Silakan coba lagi.' });
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white p-4 md:p-8">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact */}
        <motion.div
          className="bg-black/30 backdrop-blur-md p-6 rounded-lg shadow-lg border border-white/10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          {status && (
            <div className={`p-3 rounded-lg mb-4 ${status.type === 'success' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
              {status.message}
            </div>
          )}
          <form ref={form} className="space-y-4" onSubmit={sendEmail}>
            <div className="flex items-center bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-lg">
              <User className="text-gray-400 mr-2" />
              <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama" 
                className="w-full bg-transparent text-white focus:outline-none" 
                required 
              />
            </div>
            <div className="flex items-center bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-lg">
              <Mail className="text-gray-400 mr-2" />
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="Email" 
                className="w-full bg-transparent text-white focus:outline-none" 
                required 
              />
            </div>
            <div className="flex items-center bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-lg">
              <MapPin className="text-gray-400 mr-2" />
              <input 
                type="text" 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                placeholder="Pesan" 
                className="w-full bg-transparent text-white focus:outline-none" 
                required 
              />
            </div>
            <textarea 
              name="reason" 
              value={formData.reason}
              onChange={handleChange}
              placeholder="Alasan" 
              className="w-full bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-lg focus:outline-none" 
              rows="4"
              required
            ></textarea>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r bg-black/40 backdrop-blur-md border border-white/10 hover:opacity-80 p-2 rounded-lg font-semibold flex items-center justify-center"
            >
              {loading ? 'Mengirim...' : 'Kirim'}
            </button>
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