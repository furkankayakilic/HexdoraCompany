import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { User, Shirt, Compass, Camera, Palette, Crown, Award } from 'lucide-react';

const CharacterCreationSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    { icon: <User size={20} />, name: "Avatar" },
    { icon: <Shirt size={20} />, name: "Kıyafetler" },
    { icon: <Compass size={20} />, name: "Ekipman" },
    { icon: <Camera size={20} />, name: "Aksesuarlar" },
    { icon: <Crown size={20} />, name: "Yetkinlikler" },
  ];

  const tabContent = [
    {
      title: "Avatarını Tasarla",
      description: "Karakterinin saç stili, göz rengi, ten rengi ve daha birçok özelliğini seçerek kendi benzersiz avatarını oluştur.",
      image: "https://images.pexels.com/photos/7046979/pexels-photo-7046979.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Kıyafetlerini Seç",
      description: "Farkli ülkelerin geleneksel kıyafetlerinden modern kıyafetlere kadar birçok seçenek arasından tercihini yap.",
      image: "https://images.pexels.com/photos/5531004/pexels-photo-5531004.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Keşif Ekipmanlarını Belirle",
      description: "Sanal dürbün, sihirli pusula, not defteri ve fotoğraf makinesi gibi ekipmanları seçerek macerana hazırlan.",
      image: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Aksesuarlarını Tamamla",
      description: "Şapka, gözlük, çanta ve daha birçok aksesuar ile karakterini kişiselleştir ve tarzını yansıt.",
      image: "https://images.pexels.com/photos/6931066/pexels-photo-6931066.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Favori Araçlarını Belirle",
      description: "Macerada kullanacağın sihirli halı, küçük uçak, roket veya sıcak hava balonu gibi araçlar arasından seçim yap.",
      image: "https://images.pexels.com/photos/6931033/pexels-photo-6931033.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    <section id="characters" className="py-24 bg-secondary-50 relative overflow-hidden">
      {/* Background decorations */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-20 right-20 w-32 h-32 bg-accent-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-20 left-20 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-gray-800 mb-4">
            Karakter Oluşturma
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kendi benzersiz kaşif karakterini oluştur ve maceraya hazırlan
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tab navigation */}
          <div className="flex overflow-x-auto scrollbar-hide p-4 bg-gray-50 border-b">
            {tabs.map((tab, index) => (
              <motion.button
                key={index}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTab(index)}
                className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap mr-2 transition-colors ${
                  selectedTab === index
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </motion.button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="md:w-1/2 mb-8 md:mb-0 md:pr-8"
              >
                <h3 className="font-heading font-bold text-2xl mb-4 text-gray-800">
                  {tabContent[selectedTab].title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {tabContent[selectedTab].description}
                </p>
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden"
                      >
                        <Award size={20} className="text-primary-500" />
                      </div>
                    ))}
                  </div>
                  <span className="ml-4 text-sm text-gray-500">
                    200+ çocuk bu seçimi yaptı
                  </span>
                </div>
              </motion.div>

              <motion.div
                key={`img-${selectedTab}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="md:w-1/2 relative"
              >
                <div className="rounded-xl overflow-hidden shadow-lg aspect-square">
                  <img
                    src={tabContent[selectedTab].image}
                    alt={tabContent[selectedTab].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Decorative elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center text-white z-10"
                >
                  <Palette size={24} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharacterCreationSection;