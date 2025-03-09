import React from "react";
import { motion } from "framer-motion";
import { Instagram, Github, Linkedin } from "lucide-react";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const hoverEffect = {
    whileHover: { scale: 1.05, transition: { duration: 0.3 } },
};

const technologies = [
    { name: "Vite.js", icon: "https://vite.dev/logo.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Tailwind CSS", icon: "https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg" },
    { name: "Framer Motion", icon: "https://user-images.githubusercontent.com/7850794/164965523-3eced4c4-6020-467e-acde-f11b7900ad62.png" },
    { name: "Lucide", icon: "https://lucide.dev/logo.dark.svg" },
];

const developers = [
    {
        nama: "Muhammad Adistia Pratama",
        role: "Full-Stack Developer",
        alasan: "Saya Muhammad Adistia Pratama,  siswa SMKN 69 Jakarta, Jurusan SIJA (Sistem Informatika Jaringan Aplikasi). Saya sebagai pelajar berusaha mencari berbagai pengalaman untuk menciptakan sebuah App/Web yang baik dan menarik untuk di gunakan.",
        img: "https://res.cloudinary.com/dxbkwpm3i/image/upload/v1740908252/WhatsApp_Image_2025-03-02_at_16.35.11_f8a5e4ec_dqk9mc.jpg",
        social: {
            instagram: "https://www.instagram.com/bad.single_player/",
            github: "https://www.github.com/Adistiaa",
            linkedin: "#",
        },
    },
    {
        nama: "Wahyu Andhika Rahadi",
        role: "Full-Stack Developer",
        alasan: "Saya Wahyu Andhika Rahadi, siswa SMKN 69 Jakarta, Jurusan SIJA (Sistem Informatika Jaringan Aplikasi). isi ya bang...",
        img: "https://res.cloudinary.com/dxbkwpm3i/image/upload/t_Edit/v1741500145/WhatsApp_Image_2025-03-09_at_12.53.45_13e1aed6_htcqxx.jpg",
        social: {
            instagram: "https://www.instagram.com/wahyuwuish/",
            github: "https://github.com/WahyuAndikaRahadi",
            linkedin: "#",
        },
    },
];

const About = () => {
    return (
        <div className="min-h-screen text-white px-6">
            {/* Tujuan */}
            <motion.section
                className="min-h-screen flex items-center justify-center"
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: true }}
            >
                <motion.div
                    className="max-w-3xl p-8 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg text-center"
                    {...hoverEffect}
                >
                    <h1 className="text-3xl font-bold mb-4">Objective</h1>
                    <p className="text-lg text-gray-300">
                        Website ini dibuat untuk melatih dan meningkatkan kemampuan pemrograman React dan Tailwind, serta ingin melatih kerja sama tim kami. Dengan ada nya web ini kami berharap dapat membantu orang yang ingin ke PhotoBooth tapi antara malas jalan dan tidak punya uang. Jadi di harapkan dengan adanya website ini bisa menjadi alternatif dan dapat membantu kalian, kami akan terus update untuk website ini dengan saran yang terbuka dari kalian.
                    </p>
                    <p className="text-lg text-gray-300 mt-4">IB: dietherdave</p>
                </motion.div>
            </motion.section>

            {/* Tech Stack */}
            <motion.section
                id="teknologi"
                className="min-h-screen flex flex-col items-center justify-center"
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl font-bold mb-8">Tech Stack</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={index}
                            className="p-4 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-center cursor-pointer"
                            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            onClick={() => window.open(`https://www.google.com/search?q=${tech.name}`, "_blank")}
                        >
                            <img src={tech.icon} alt={tech.name} className="w-12 h-12 mx-auto mb-2" />
                            <span className="text-xl font-semibold">{tech.name}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Developers */}
            <motion.section
                className="min-h-screen flex flex-col items-center justify-center"
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl font-bold mb-8">Developers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {developers.map((dev, index) => (
                        <motion.div
                            key={index}
                            className="p-6 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg text-center flex flex-col items-center"
                            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                        >
                            <img src={dev.img} alt={dev.nama} className="w-24 h-24 rounded-full mb-4" />
                            <h3 className="text-2xl font-semibold">{dev.nama}</h3>
                            <p className="text-gray-300">{dev.role}</p>
                            <p className="text-sm text-gray-400 my-3">{dev.alasan}</p>
                            <div className="flex justify-center gap-4 mt-4">
                                <a
                                    href={dev.social.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-pink-400 text-2xl"
                                >
                                    <Instagram />
                                </a>
                                <a
                                    href={dev.social.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white text-2xl"
                                >
                                    <Github />
                                </a>
                                <a
                                    href={dev.social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-blue-400 text-2xl"
                                >
                                    <Linkedin />
                                </a>
                            </div>

                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
};

export default About;
