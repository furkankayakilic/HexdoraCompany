import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Languages, Map, Camera, Calculator, Cloud, PenTool } from 'lucide-react';

interface GameCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  index: number;
}

const GameCard: React.FC<GameCardProps> = ({ icon, title, description, color, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`p-6 rounded-xl shadow-md ${color} text-white`}
    >
      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-heading font-bold text-xl mb-2">{title}</h3>
      <p className="opacity-90">{description}</p>
    </motion.div>
  );
};

const MinigamesSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const games = [
    {
      icon: <Brain size={24} />,
      title: "Harita Dedektifi",
      description: "Dünya haritası üzerinde gizlenmiş lokasyonları bulma oyunu.",
      color: "bg-primary-500",
    },
    {
      icon: <Languages size={24} />,
      title: "Kelime Avcısı",
      description: "Farklı dillerde temel kelime ve ifadeleri öğrenme oyunu.",
      color: "bg-secondary-500",
    },
    {
      icon: <Map size={24} />,
      title: "Ülke Eşleştirme",
      description: "Ülke bayrakları, başkentler ve kültürel sembolleri eşleştirme oyunu.",
      color: "bg-accent-500",
    },
    {
      icon: <Camera size={24} />,
      title: "AR Fotoğrafçı",
      description: "Augmented Reality ile çevreni keşfet ve fotoğrafla.",
      color: "bg-success-500",
    },
    {
      icon: <Calculator size={24} />,
      title: "Gökyüzü Matematik",
      description: "Uçuş yüksekliği ve mesafeye dair matematik problemleri çöz.",
      color: "bg-warning-500",
    },
    {
      icon: <Cloud size={24} />,
      title: "Bulut Şekillendirici",
      description: "Bulutları şekillendirip boyayarak yaratıcılığını geliştir.",
      color: "bg-error-500",
    },
  ];

  return (
    <section id="minigames" className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">
            Mini Oyunlar
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Eğlenceli mini oyunlarla öğrenme macerasını pekiştir
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <GameCard
              key={index}
              icon={game.icon}
              title={game.title}
              description={game.description}
              color={game.color}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Tüm oyunlar çocukların eğlenerek öğrenmesi için tasarlanmıştır ve eğitimciler tarafından onaylanmıştır.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-gray-900 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="flex items-center">
              <PenTool className="mr-2" size={20} />
              Tüm Oyunları Keşfet
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default MinigamesSection;