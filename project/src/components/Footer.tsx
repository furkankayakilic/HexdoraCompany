import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Mail, Phone, Instagram, Twitter, Facebook, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = [
    {
      title: "Keşfet",
      links: [
        { name: "Ana Sayfa", href: "#hero" },
        { name: "Özellikler", href: "#features" },
        { name: "Oyun Yolculuğu", href: "#journey" },
        { name: "Karakterler", href: "#characters" },
        { name: "Mini Oyunlar", href: "#minigames" },
      ],
    },
    {
      title: "Kaynaklar",
      links: [
        { name: "Yardım Merkezi", href: "#" },
        { name: "Eğitimciler İçin", href: "#" },
        { name: "Ebeveyn Rehberi", href: "#" },
        { name: "Gizlilik Politikası", href: "#" },
        { name: "Kullanım Şartları", href: "#" },
      ],
    },
    {
      title: "İletişim",
      links: [
        { name: "İletişim", href: "#contact" },
        { name: "Destek", href: "#" },
        { name: "İş Birlikleri", href: "#" },
        { name: "Basın Kiti", href: "#" },
        { name: "Kariyer", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Instagram size={20} />, href: "#" },
    { icon: <Twitter size={20} />, href: "#" },
    { icon: <Facebook size={20} />, href: "#" },
    { icon: <Linkedin size={20} />, href: "#" },
    { icon: <Github size={20} />, href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <Globe className="h-8 w-8 text-primary-500 mr-2" />
              <span className="font-heading font-bold text-xl text-white">Dünya Kaşifi</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Artırılmış gerçeklik teknolojisiyle çocukların dünyayı keşfetmesini ve
              eğlenerek öğrenmesini sağlayan eğitici bir mobil oyun.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail size={18} className="text-gray-400 mr-3" />
                <span className="text-gray-400">info@dunyakasifi.com</span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="text-gray-400 mr-3" />
                <span className="text-gray-400">+90 (212) 123 45 67</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((column, idx) => (
            <div key={idx}>
              <h3 className="font-heading font-bold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-primary-500 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Dünya Kaşifi. Tüm hakları saklıdır.
          </p>

          <div className="flex space-x-4">
            {socialLinks.map((link, idx) => (
              <motion.a
                key={idx}
                whileHover={{ y: -3 }}
                href={link.href}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-colors duration-300"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;