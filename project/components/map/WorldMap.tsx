import React from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { Destination } from '@/types';

const { width } = Dimensions.get('window');

interface WorldMapProps {
  destinations: Destination[];
  selectedDestination: Destination | null;
  onSelectDestination: (destination: Destination) => void;
  vehicleType: number;
}

export default function WorldMap({ 
  destinations, 
  selectedDestination,
  onSelectDestination,
  vehicleType 
}: WorldMapProps) {
  
  const getMapCoordinates = (latitude: number, longitude: number) => {
    // Map is 360 degrees horizontally, 180 degrees vertically
    // Convert longitude from -180/180 to 0/360
    const x = ((longitude + 180) / 360) * width * 0.9;
    
    // Convert latitude from -90/90 to 0/180, then flip (since y is top-down)
    const mapHeight = width * 0.5;
    const y = ((90 - latitude) / 180) * mapHeight;
    
    return { x, y };
  };

  return (
    <View style={styles.mapContainer}>
      <View style={styles.mapBackground}>
        <Image
          source={require('../../assets/images/world-map-blue.png')}
          style={styles.mapImage}
          resizeMode="contain"
        />
      </View>
      
      {destinations.map((destination) => {
        const coords = getMapCoordinates(
          destination.coordinates.latitude,
          destination.coordinates.longitude
        );
        
        const isSelected = selectedDestination?.id === destination.id;
        
        return (
          <View
            key={destination.id}
            style={[
              styles.mapMarker,
              {
                left: coords.x,
                top: coords.y,
              },
              isSelected && styles.selectedMapMarker,
            ]}
            onTouchEnd={() => onSelectDestination(destination)}
          >
            <MapPin
              size={isSelected ? 28 : 24}
              color={isSelected ? '#FF6A88' : '#6A48F6'}
              fill={isSelected ? '#FFE4EA' : 'transparent'}
            />
          </View>
        );
      })}
      
      {selectedDestination && (
        <View 
          style={[
            styles.vehicleIcon,
            {
              left: getMapCoordinates(
                selectedDestination.coordinates.latitude,
                selectedDestination.coordinates.longitude
              ).x - 20,
              top: getMapCoordinates(
                selectedDestination.coordinates.latitude,
                selectedDestination.coordinates.longitude
              ).y - 40,
            }
          ]}
        >
          <View style={[
            styles.dummyVehicle,
            vehicleType === 0 ? { backgroundColor: '#FF9A8B' } :
            vehicleType === 1 ? { backgroundColor: '#4FACFE' } :
            vehicleType === 2 ? { backgroundColor: '#43E97B' } :
            { backgroundColor: '#A9C9FF' }
          ]} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F8F8F8',
  },
  mapBackground: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  mapImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  mapMarker: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -20,
    marginTop: -40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  selectedMapMarker: {
    zIndex: 10,
    transform: [{ scale: 1.2 }],
  },
  vehicleIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  dummyVehicle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});