import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { MapPin } from 'lucide-react-native';

interface Destination {
  id: string;
  name: string;
  continent: string;
  capital: string;
  // other properties
}

interface DestinationCardProps {
  destination: Destination;
  isSelected: boolean;
  onSelect: () => void;
}

export default function DestinationCard({
  destination,
  isSelected,
  onSelect,
}: DestinationCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.selectedCard,
      ]}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View style={styles.pinContainer}>
          <MapPin
            size={24}
            color={isSelected ? '#FF6A88' : '#6A48F6'}
            fill={isSelected ? '#FFE4EA' : 'transparent'}
          />
        </View>
        <Text style={styles.destinationName}>{destination.name}</Text>
        <Text style={styles.destinationDetail}>{destination.continent}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    height: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  selectedCard: {
    backgroundColor: '#FFE4EA',
    borderColor: '#FF6B6B',
    borderWidth: 3,
    transform: [{ scale: 1.05 }],
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  pinContainer: {
    marginBottom: 15,
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  destinationName: {
    fontFamily: 'BubblegumSans',
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  destinationDetail: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});