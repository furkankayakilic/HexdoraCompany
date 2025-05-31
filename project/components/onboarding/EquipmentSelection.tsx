import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Sparkles } from 'lucide-react-native';

const EQUIPMENT_OPTIONS = [
  {
    id: 'binoculars',
    name: 'Dürbün',
    description: 'Uzaktaki yerleri görmek için',
    image: require('@/assets/images/durbun.png'),
  },
  {
    id: 'compass',
    name: 'Sihirli Pusula',
    description: 'Yolunu kaybetmemek için',
    image: require('@/assets/images/pusula.png'),
  },
  {
    id: 'notebook',
    name: 'Not Defteri',
    description: 'Notlar almak için',
    image: require('@/assets/images/defter.png'),
  },
  {
    id: 'camera',
    name: 'Kamera',
    description: 'Anılarını kaydetmek için',
    image: require('@/assets/images/kamera.png'),
  },
  {
    id: 'map',
    name: 'Harita',
    description: 'Yolunu bulmak için',
    image: require('@/assets/images/harita.png'),
  },
  {
    id: 'snack',
    name: 'Atıştırmalık',
    description: 'Acıktığında yemek için',
    image: require('@/assets/images/atistirma.png'),
  },
];

interface EquipmentSelectionProps {
  selectedEquipment: string[];
  onEquipmentChange: (equipment: string[]) => void;
}

export default function EquipmentSelection({ 
  selectedEquipment, 
  onEquipmentChange 
}: EquipmentSelectionProps) {
  
  const toggleEquipment = (id: string) => {
    if (selectedEquipment.includes(id)) {
      onEquipmentChange(selectedEquipment.filter(item => item !== id));
    } else {
      if (selectedEquipment.length < 4) { // Limit to 4 equipment
        onEquipmentChange([...selectedEquipment, id]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectionInfo}>
        <Text style={styles.selectionTitle}>
          {selectedEquipment.length}/4 Ekipman Seçildi ✨
        </Text>
        <Text style={styles.selectionDescription}>
          En fazla 4 ekipman seçebilirsin! 🎒
        </Text>
      </View>
      
      <View style={styles.equipmentGrid}>
        {EQUIPMENT_OPTIONS.map((equipment) => {
          const isSelected = selectedEquipment.includes(equipment.id);
          
          return (
            <TouchableOpacity
              key={equipment.id}
              style={[
                styles.equipmentItem,
                isSelected && styles.selectedEquipmentItem
              ]}
              onPress={() => toggleEquipment(equipment.id)}
              activeOpacity={0.7}
            >
              <Image
                source={equipment.image}
                style={styles.equipmentImage}
                resizeMode="contain"
              />
              <Text style={[
                styles.equipmentName,
                isSelected && styles.selectedEquipmentName
              ]}>
                {equipment.name}
              </Text>
              <Text style={[
                styles.equipmentDescription,
                isSelected && styles.selectedEquipmentDescription
              ]}>
                {equipment.description}
              </Text>
              {isSelected && (
                <View style={styles.checkBadge}>
                  <Sparkles size={16} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectionInfo: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  selectionTitle: {
    fontFamily: 'BubblegumSans_400Regular',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 5,
    textAlign: 'center',
  },
  selectionDescription: {
    fontFamily: 'BubblegumSans_400Regular',
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  equipmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 5,
  },
  equipmentItem: {
    width: 95,
    height: 180,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  selectedEquipmentItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: '#FF6A88',
    transform: [{ scale: 1.05 }],
  },
  equipmentImage: {
    width: 70,
    height: 70,
    marginBottom: 8,
  },
  equipmentName: {
    fontFamily: 'BubblegumSans_400Regular',
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  selectedEquipmentName: {
    color: '#FF6A88',
  },
  equipmentDescription: {
    fontFamily: 'BubblegumSans_400Regular',
    fontSize: 11,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  selectedEquipmentDescription: {
    color: '#666',
  },
  checkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6A88',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});