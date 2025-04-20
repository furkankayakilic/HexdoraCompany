import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Compass, Plane } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/90 to-secondary-500/90 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-hero-pattern bg-center bg-cover"></div>
      </div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute right-[20%] top-[20%]"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        <MapPin size={48} className="text-accent-500 opacity-80" />
      </motion.div>
      
      <motion.div 
        className="absolute left-[15%] top-[35%]"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, delay: 0.5 }}
      >
        <Globe size={64} className="text-success-500 opacity-70" />
      </motion.div>
      
      <motion.div 
        className="absolute right-[25%] bottom-[25%]"
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 7, delay: 1 }}
      >
        <Compass size={56} className="text-warning-500 opacity-75" />
      </motion.div>
      
      <motion.div 
        className="absolute left-[25%] bottom-[30%]"
        animate={{ 
          x: [0, 100, 0],
          y: [0, -30, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      >
        <Plane size={48} className="text-white opacity-85" />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
            <span className="block">Dünya Kaşifi</span>
            <span className="text-2xl sm:text-3xl md:text-4xl text-success-500 block mt-2">
              ARTIRILMIŞ GERÇEKLİK TEMELLİ MOBİL UYGULAMA
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Çocuklar için eğlenceli ve eğitici bir macera! Kendi avatarını yarat, 
            dünyayı keşfet ve eğlenerek öğren. Augmented Reality teknolojisiyle gerçek dünyada
            sınırları aş!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#features"
              className="px-8 py-4 bg-accent-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Keşfe Başla
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#ar-experience"
              className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/40 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              AR Deneyimi
            </motion.a>
          </div>
        </motion.div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,160L48,144C96,128,192,96,288,90.7C384,85,480,107,576,128C672,149,768,171,864,170.7C960,171,1056,149,1152,122.7C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;