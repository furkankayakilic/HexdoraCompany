import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { User, MapPin, BookOpen, Gamepad, Globe, Award, Languages, PlaneTakeoff } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary-100 text-primary-500 mb-6">
        {icon}
      </div>
      <h3 className="font-heading font-bold text-xl mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: <User size={28} />,
      title: "Karakter Oluşturma",
      description: "Kendi avatarını tasarla, kıyafetler seç ve maceraya hazırlan. Kişiselleştirilmiş kaşif sertifikanı al!",
      delay: 0.1,
    },
    {
      icon: <MapPin size={28} />,
      title: "Uçuş Rotası",
      description: "Dinamik 3D dünya haritası üzerinde renkli duraklar ve hedeflerle dolu bir macera yolculuğu.",
      delay: 0.2,
    },
    {
      icon: <Globe size={28} />,
      title: "Coğrafi Keşifler",
      description: "Ülkelerin 3D haritaları ve ünlü yapılarını AR modelleriyle keşfet, gizlenmiş lokasyonları bul.",
      delay: 0.3,
    },
    {
      icon: <BookOpen size={28} />,
      title: "Kültürel Maceralar",
      description: "Her ülkenin geleneksel kıyafetlerini avatarına giydir, yöresel yemekleri keşfet ve kültürel sembolleri öğren.",
      delay: 0.4,
    },
    {
      icon: <Languages size={28} />,
      title: "Dil Öğrenme",
      description: "Her ülkenin temel selamlaşma ifadeleri ve basit kelimeleri eğlenceli aktivitelerle öğren.",
      delay: 0.5,
    },
    {
      icon: <PlaneTakeoff size={28} />,
      title: "Zenginleştirilmiş Görünüm",
      description: "AR ile bulutların üzerinde uçan hayvanlar ve fantastik figürler gör, şehirlerin önemli yapılarını keşfet.",
      delay: 0.6,
    },
    {
      icon: <Gamepad size={28} />,
      title: "Mini Oyunlar",
      description: "Gökyüzü Matematik Yarışması ve Hava Durumu Tahmincisi gibi eğlenceli mini oyunlarla öğrenme deneyimini pekiştir.",
      delay: 0.7,
    },
    {
      icon: <Award size={28} />,
      title: "Ödül Sistemi",
      description: "Kaşif pasaportuna her ülke için özel damgalar topla ve 'Süper Kaşif' seviyelerinde ilerle.",
      delay: 0.8,
    },
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-gray-800 mb-4">
            Oyun Özellikleri
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dünya Kaşifi'nin eşsiz özellikleriyle çocuklar hem eğlenecek hem öğrenecek
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;