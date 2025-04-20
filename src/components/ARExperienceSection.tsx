import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Smartphone, Eye, Zap, Lock } from 'lucide-react';

const ARExperienceSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Eye size={24} />,
      title: "Gerçek Dünya Zenginleştirme",
      description: "Augmented Reality teknolojisiyle gerçek dünyayı eğitici ve eğlenceli içeriklerle zenginleştir.",
    },
    {
      icon: <Zap size={24} />,
      title: "Anlık Etkileşim",
      description: "Gerçek zamanlı olarak dijital içeriklerle etkileşime geç ve öğrenmeyi hızlandır.",
    },
    {
      icon: <Lock size={24} />,
      title: "Güvenli Deneyim",
      description: "Ebeveyn kontrolleri ve çocuk dostu tasarım ile güvenli bir öğrenme ortamı.",
    },
  ];

  return (
    <section
      id="ar-experience"
      className="py-24 bg-gradient-to-br from-primary-900 to-secondary-900 text-white relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_60%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.2)_0%,transparent_60%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 mb-12 lg:mb-0"
          >
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-6">
              Artırılmış Gerçeklik Deneyimi
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Dünya Kaşifi'nin AR teknolojisi ile gerçek dünya ile dijital içerikleri birleştirerek
              benzersiz bir öğrenme deneyimi sunar. Telefonunu çevrene doğrult ve keşfe başla!
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 flex justify-center"
          >
            <div className="relative">
              {/* Phone frame */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 mx-auto"
              >
                <div className="w-[280px] h-[560px] bg-gray-900 rounded-[40px] p-3 shadow-2xl border-4 border-gray-800">
                  <div className="w-full h-full rounded-[32px] overflow-hidden relative bg-gray-800">
                    {/* AR app content */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 backdrop-blur-sm flex flex-col">
                      <div className="h-14 bg-black/30 flex items-center justify-between px-4">
                        <div className="text-xs font-semibold">AR Görünümü</div>
                        <Smartphone size={18} />
                      </div>
                      
                      <div className="flex-1 relative">
                        {/* Simplified AR content */}
                        <img 
                          src="https://images.pexels.com/photos/2433467/pexels-photo-2433467.jpeg?auto=compress&cs=tinysrgb&w=600" 
                          alt="Background scene"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        
                        {/* AR elements */}
                        <motion.div
                          animate={{
                            y: [0, -10, 0],
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                          className="absolute left-[20%] top-[30%] w-16 h-16 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center"
                        >
                          <img
                            src="https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=100"
                            alt="Landmark"
                            className="w-14 h-14 object-cover rounded"
                          />
                        </motion.div>
                        
                        <motion.div
                          animate={{
                            y: [0, -15, 0],
                            x: [0, 10, 0],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 1,
                          }}
                          className="absolute right-[15%] top-[60%] w-20 h-12 bg-primary-500/80 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center text-white text-xs p-2"
                        >
                          Eyfel Kulesi hakkında bilgi
                        </motion.div>
                      </div>
                      
                      <div className="h-16 bg-black/30 flex items-center justify-around px-4">
                        <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                        <div className="w-12 h-12 bg-white/80 rounded-full"></div>
                        <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                animate={{ 
                  rotate: [0, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-[5%] right-[5%] w-20 h-20 bg-accent-500/40 backdrop-blur-md rounded-full z-0"
              ></motion.div>
              
              <motion.div
                animate={{ 
                  rotate: [0, -8, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 7, repeat: Infinity, delay: 1 }}
                className="absolute bottom-[10%] left-[0%] w-24 h-24 bg-success-500/30 backdrop-blur-md rounded-full z-0"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ARExperienceSection;