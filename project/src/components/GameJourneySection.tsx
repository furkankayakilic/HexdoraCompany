import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Map, MapPin, Compass, Flag, Trophy } from 'lucide-react';

const GameJourneySection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const journeySteps = [
    {
      icon: <Map size={28} />,
      title: "Akademiye Katıl",
      description: "Kaşif Akademisi'ne kayıt olarak maceraya başla.",
      step: 1,
    },
    {
      icon: <MapPin size={28} />,
      title: "Rotanı Belirle",
      description: "Dünya haritası üzerinde keşfedeceğin bölgeleri seç.",
      step: 2,
    },
    {
      icon: <Compass size={28} />,
      title: "Görevleri Tamamla",
      description: "Her ülkede kültürel ve coğrafi görevleri tamamla.",
      step: 3,
    },
    {
      icon: <Flag size={28} />,
      title: "Pasaportu Doldur",
      description: "Kaşif pasaportunu damgalar ve başarılarla doldur.",
      step: 4,
    },
    {
      icon: <Trophy size={28} />,
      title: "Süper Kaşif Ol",
      description: "Tüm rozetleri topla ve Süper Kaşif ünvanını kazan.",
      step: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="journey"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-primary-50"
    >
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-gray-800 mb-4">
            Oyun Yolculuğu
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dünya Kaşifi'nde maceraya çıkma adımların
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          {/* Map background with animation */}
          <div className="absolute inset-0 z-0 opacity-10">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="w-full h-full bg-world-map bg-center bg-contain bg-no-repeat"
            ></motion.div>
          </div>

          {/* Journey line */}
          <div className="absolute left-[50%] top-12 bottom-12 w-1 bg-primary-200 z-0 hidden md:block"></div>

          {/* Journey steps */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative z-10"
          >
            {journeySteps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex flex-col md:flex-row items-center mb-16 last:mb-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Step number with icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex-shrink-0 w-16 h-16 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-lg z-10 mb-4 md:mb-0"
                >
                  {step.icon}
                </motion.div>

                {/* Line to connect in mobile view */}
                <div className="h-8 w-1 bg-primary-200 md:hidden"></div>

                {/* Content */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`md:w-[calc(50%-3rem)] p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${
                    index % 2 === 0 ? 'md:ml-12' : 'md:mr-12'
                  }`}
                >
                  <h3 className="font-heading font-bold text-xl mb-2 text-primary-600">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GameJourneySection;