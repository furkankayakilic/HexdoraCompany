import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import { router } from 'expo-router';
import { Globe, Map, Info } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import WorldMap from '@/components/map/WorldMap';
import DestinationCard from '@/components/map/DestinationCard';
import { useAppState } from '@/context/AppStateContext';
import { Destination } from '@/types';

export default function WorldExploreScreen() {
  const { avatar, vehicle } = useAppState();
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    // Load destination data
    const loadDestinations = async () => {
      try {
        // In a real app, this would be fetched from an API
        const worldMapData = require('@/assets/images/world-map.json');
        setDestinations(worldMapData.destinations);
      } catch (error) {
        console.error('Failed to load destinations:', error);
      }
    };

    loadDestinations();
  }, []);

  const handleDestinationSelect = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  const handleStartExploration = () => {
    if (selectedDestination) {
      router.push({
        pathname: '/(tabs)/routes',
        params: { destinationId: selectedDestination.id }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['#4FACFE', '#00F2FE']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerEmoji}>🌍</Text>
          <Text style={styles.headerTitle}>Dünya Haritası</Text>
          <Text style={styles.headerSubtitle}>Keşfetmek istediğin yeri seç! ✨</Text>
        </View>
      </LinearGradient>

      <View style={styles.mapContainer}>
        <WorldMap 
          destinations={destinations} 
          selectedDestination={selectedDestination}
          onSelectDestination={handleDestinationSelect}
          vehicleType={vehicle}
        />
      </View>

      <View style={styles.destinationsContainer}>
        <Text style={styles.sectionTitle}>Popüler Yerler 🗺️</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.destinationCardsContainer}
        >
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              isSelected={selectedDestination?.id === destination.id}
              onSelect={() => handleDestinationSelect(destination)}
            />
          ))}
        </ScrollView>
      </View>

      {selectedDestination && (
        <View style={styles.selectedDestinationContainer}>
          <View style={styles.destinationInfo}>
            <Text style={styles.destinationTitle}>
              {selectedDestination.name.includes('Türkiye') ? '🇹🇷 ' :
               selectedDestination.name.includes('İtalya') ? '🇮🇹 ' :
               selectedDestination.name.includes('Fransa') ? '🇫🇷 ' :
               selectedDestination.name.includes('İspanya') ? '🇪🇸 ' :
               selectedDestination.name.includes('Japonya') ? '🇯🇵 ' :
               '🌍 '}
              {selectedDestination.name}
            </Text>
            <Text style={styles.destinationDetails}>
              🌎 {selectedDestination.continent} • 🏛️ {selectedDestination.capital}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.exploreButton}
            onPress={handleStartExploration}
          >
            <Text style={styles.exploreButtonText}>Keşfet 🚀</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 0 : 40,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    marginTop: 10,
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  headerTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 32,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.95,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  mapContainer: {
    height: 160,
    margin: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  destinationsContainer: {
    paddingHorizontal: 15,
    marginTop: 5,
  },
  sectionTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 22,
    color: '#333',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  destinationCardsContainer: {
    paddingVertical: 8,
    paddingRight: 15,
  },
  selectedDestinationContainer: {
    position: 'absolute',
    bottom: 80,
    left: 15,
    right: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  destinationInfo: {
    flex: 1,
    marginRight: 10,
  },
  destinationTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 22,
    color: '#333',
    marginBottom: 4,
  },
  destinationDetails: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: '#666',
  },
  exploreButton: {
    backgroundColor: '#4FACFE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#4FACFE',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  exploreButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});