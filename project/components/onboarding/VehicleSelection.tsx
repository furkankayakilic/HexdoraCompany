import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Sparkles } from 'lucide-react-native';

const VEHICLE_OPTIONS = [
  {
    id: 'hali',
    name: 'Sihirli Halı',
    description: 'Hızlı ve heyecanlı bir yolculuk',
    image: require('@/assets/images/hali.png'),
  },
  {
    id: 'airplane',
    name: 'Uçak',
    description: 'Gökyüzünde süzülme keyfi',
    image: require('@/assets/images/ucak.png'),
  },
  {
    id: 'rocket',
    name: 'Roket',
    description: 'Uzaya doğru macera',
    image: require('@/assets/images/roket.png'),
  },
  {
    id: 'hotAirBalloon',
    name: 'Sıcak Hava Balonu',
    description: 'Sakin ve huzurlu bir yolculuk',
    image: require('@/assets/images/balon.png'),
  },
];

interface VehicleSelectionProps {
  selectedVehicle: string;
  onVehicleChange: (vehicle: string) => void;
}

export default function VehicleSelection({ 
  selectedVehicle, 
  onVehicleChange 
}: VehicleSelectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.selectionInfo}>
        <Text style={styles.selectionTitle}>
          Macera Aracını Seç! 🚀
        </Text>
        <Text style={styles.selectionDescription}>
          Seni nereye götürmesini istersin? ✨
        </Text>
      </View>
      
      <View style={styles.vehicleGrid}>
        {VEHICLE_OPTIONS.map((vehicle) => {
          const isSelected = selectedVehicle === vehicle.id;
          
          return (
            <TouchableOpacity
              key={vehicle.id}
              style={[
                styles.vehicleItem,
                isSelected && styles.selectedVehicleItem
              ]}
              onPress={() => onVehicleChange(vehicle.id)}
              activeOpacity={0.7}
            >
              <Image
                source={vehicle.image}
                style={styles.vehicleImage}
                resizeMode="contain"
              />
              <Text style={[
                styles.vehicleName,
                isSelected && styles.selectedVehicleName
              ]}>
                {vehicle.name}
              </Text>
              <Text style={[
                styles.vehicleDescription,
                isSelected && styles.selectedVehicleDescription
              ]}>
                {vehicle.description}
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
  vehicleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 5,
  },
  vehicleItem: {
    width: 100,
    height: 180,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  selectedVehicleItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: '#FF6A88',
    transform: [{ scale: 1.05 }],
  },
  vehicleImage: {
    width: 70,
    height: 70,
    marginBottom: 8,
  },
  vehicleName: {
    fontFamily: 'BubblegumSans_400Regular',
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  selectedVehicleName: {
    color: '#FF6A88',
  },
  vehicleDescription: {
    fontFamily: 'BubblegumSans_400Regular',
    fontSize: 11,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  selectedVehicleDescription: {
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