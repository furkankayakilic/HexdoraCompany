import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { MapPin, Globe, Info } from 'lucide-react-native';
import { useAppState } from '@/context/AppStateContext';

interface Destination {
  id: string;
  name: string;
  continent: string;
  capital: string;
  landmarks: string[];
  facts: string[];
  // other properties
}

interface DestinationDetailsProps {
  destination: Destination;
}

const AVATAR_IMAGES = {
  0: require('@/assets/images/avatar1.png'),
  1: require('@/assets/images/avatar2.png'),
  2: require('@/assets/images/avatar3.png'),
  3: require('@/assets/images/avatar4.png'),
};

export default function DestinationDetails({ destination }: DestinationDetailsProps) {
  const { avatar } = useAppState();

  return (
    <View style={styles.container}>
      <View style={styles.infoCard}>
        <View style={styles.guideContainer}>
          <View style={styles.guideAvatar}>
            <Image
              source={AVATAR_IMAGES[avatar.selectedAvatar as keyof typeof AVATAR_IMAGES]}
              style={styles.avatarImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              {destination.name} hakkında temel bilgileri öğrenelim! 🌍
            </Text>
          </View>
        </View>
        
        <View style={styles.infoContent}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Kıta:</Text>
          <Text style={styles.infoValue}>{destination.continent}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Başkent:</Text>
          <Text style={styles.infoValue}>{destination.capital}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.factsCard}>
        <View style={styles.guideContainer}>
          <View style={styles.guideAvatar}>
            <Image
              source={AVATAR_IMAGES[avatar.selectedAvatar as keyof typeof AVATAR_IMAGES]}
              style={styles.avatarImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              İşte {destination.name} hakkında ilginç bilgiler! 🤓
            </Text>
          </View>
        </View>
        
        <View style={styles.factsContent}>
        {destination.facts.map((fact, index) => (
          <View key={index} style={styles.factItem}>
            <View style={styles.factBullet} />
            <Text style={styles.factText}>{fact}</Text>
          </View>
        ))}
        </View>
      </View>
      
      <View style={styles.landmarksCard}>
        <View style={styles.guideContainer}>
          <View style={styles.guideAvatar}>
            <Image
              source={AVATAR_IMAGES[avatar.selectedAvatar as keyof typeof AVATAR_IMAGES]}
              style={styles.avatarImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              {destination.name}'in en ünlü yerlerini keşfedelim! 🏛️
            </Text>
          </View>
        </View>
        
        <View style={styles.landmarksContent}>
          {destination.landmarks.map((landmark, index) => (
            <View key={index} style={styles.landmarkItem}>
              <View style={styles.landmarkImagePlaceholder}>
                <Text style={styles.landmarkImageText}>
                  {landmark.charAt(0)}
                </Text>
              </View>
              <Text style={styles.landmarkName}>{landmark}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  guideContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  guideAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  speechBubble: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  speechText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  infoContent: {
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    padding: 15,
    marginTop: 10,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoLabel: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#666',
    width: 100,
  },
  infoValue: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  factsContent: {
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    padding: 15,
    marginTop: 10,
  },
  factsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  factItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  factBullet: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6A48F6',
    marginTop: 6,
    marginRight: 12,
  },
  factText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  landmarksContent: {
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    padding: 15,
    marginTop: 10,
  },
  landmarksCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  landmarkItem: {
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
  },
  landmarkImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  landmarkImageText: {
    fontFamily: 'BubblegumSans',
    fontSize: 32,
    color: '#43E97B',
  },
  landmarkName: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});