import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Download, ExternalLink } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-gray-800 mb-4">
            İletişime Geç
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dünya Kaşifi hakkında daha fazla bilgi almak veya sorularınız için bize ulaşın
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-50 p-8 rounded-2xl shadow-md"
          >
            <h3 className="font-heading font-bold text-2xl mb-6 text-gray-800">
              Bize Ulaşın
            </h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-500 mr-4 flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-800 mb-1">E-posta</h4>
                  <p className="text-gray-600">info@dunyakasifi.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-500 mr-4 flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-800 mb-1">Telefon</h4>
                  <p className="text-gray-600">+90 (212) 123 45 67</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-500 mr-4 flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-800 mb-1">Adres</h4>
                  <p className="text-gray-600">
                    Teknoloji Vadisi, İnovasyon Caddesi No:42<br />
                    İstanbul, Türkiye
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h4 className="font-heading font-bold text-xl mb-4 text-gray-800">
                Oyunumuzu Deneyin
              </h4>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="flex items-center px-6 py-3 bg-black text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <svg className="w-7 h-7 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.02-3.18-.96-1.14-.97-2.27-1.95-3.18-.96-.96 1.01.17 2.02 1.31 3 1.14.97 2.32 1.97 3.18.96 1.02-1.21-.31-2.05-1.31-3-1-.94-2-1.89-3.18-.96-.95 1.01.18 2.02 1.32 3 1.13.97 2.27 1.96 3.17.96 1.02-1.21-.17-2.05-1.31-3-1.13-.96-2.27-1.95-3.18-.96-.88 1.1.29 2.08 1.31 3 1.14.97 2.18.95 3.18-.96.95-1.01-.18-2.02-1.32-3-1.13-.97-2.27-1.96-3.18-.96-1.21.92.29 2.14 1.32 3 1.13.98 2.27 1.95 3.18.96.96-1.01-.18-2.02-1.32-3-1.13-.97-2.26-1.96-3.18-.96-1.01.99.27 2.08 1.32 3 1.14.97 2.18.92 3.18-.96.87-1.1-.32-2.08-1.32-3-1.13-.97-2.27-1.96-3.17-.96-.88 1.1.28 2.08 1.31 3 1.14.97 2.27 1.95 3.18.96.95-1.01-.18-2.02-1.32-3-1.13-.97-2.26-1.96-3.18-.96-1.01.99.27 2.08 1.32 3 1.14.97 2.27 1.95 3.18.96.95-1.01-.18-2.02-1.32-3-1.12-.97-2.26-1.98-3.17-.97-.96 1 .95 2.11 2.09 3.08 1.13.96.97-.22 0-1.19-1.14-.96-2.27-1.95-3.19-.97-.95 1.01.19 2.03 1.33 3 1.13.97 2.26 1.96 3.17.96.88-1.1-.28-2.08-1.31-3-1.14-.97-2.28-1.95-3.18-.96-.95 1.01.18 2.03 1.32 3 1.13.97 2.26 1.96 3.18.96 1.01-.99-.27-2.08-1.32-3-1.13-.97-2.27-1.95-3.18-.96-.95 1.01.18 2.03 1.32 3 1.13.97 2.27 1.95 3.18.96.95-1.01-.18-2.03-1.32-3-1.13-.97-2.26-1.96-3.17-.96-.96 1.01.17 2.02 1.31 3z"/>
                  </svg>
                  <div>
                    <div className="text-xs">App Store'dan İndir</div>
                    <div className="text-sm font-bold">iOS için</div>
                  </div>
                </motion.a>
                
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="flex items-center px-6 py-3 bg-black text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <svg className="w-7 h-7 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.61 1.814L13.75 12l-10.14 10.186a2.25 2.25 0 01-.515-1.436V3.25c0-.518.189-1.03.515-1.436zm8.382 10.186l2.322-2.322 8.586 4.992a2.313 2.313 0 000 4.018l-8.586 4.992-2.322-2.322 6.879-6.879-6.879-6.879zm1.643-1.643L22.868 3.25a2.257 2.257 0 00-.586-.468l-9.901 5.674 1.254 2.9zM12.348 13.643l1.254 2.9 9.9 5.675c.233-.14.42-.3.587-.47l-9.234-7.103-2.507-1.002z"/>
                  </svg>
                  <div>
                    <div className="text-xs">Google Play'dan İndir</div>
                    <div className="text-sm font-bold">Android için</div>
                  </div>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Subscribe form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-primary-500 to-secondary-600 p-8 rounded-2xl shadow-md text-white"
          >
            <h3 className="font-heading font-bold text-2xl mb-2">
              Haberdar Ol
            </h3>
            <p className="mb-6 text-white/80">
              Gelişmelerden haberdar olmak için bültenimize kaydolun
            </p>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  İsim
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Adınız"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="E-posta adresiniz"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/50"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Mesaj (Opsiyonel)
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Mesajınız..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/50"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-6 py-3 bg-white text-primary-600 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              >
                <Send size={18} className="mr-2" />
                Gönder
              </motion.button>
            </form>

            <div className="mt-8 flex items-center justify-center space-x-6">
              <motion.a
                whileHover={{ y: -3 }}
                href="#"
                className="text-white hover:text-white/80"
              >
                <Download size={24} />
              </motion.a>
              <motion.a
                whileHover={{ y: -3 }}
                href="#"
                className="text-white hover:text-white/80"
              >
                <ExternalLink size={24} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;