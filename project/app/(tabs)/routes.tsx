import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Calendar, Star, ChevronRight } from 'lucide-react-native';
import DestinationDetails from '@/components/routes/DestinationDetails';
import TaskList from '@/components/routes/TaskList';
import { useAppState } from '@/context/AppStateContext';

export default function RoutesScreen() {
  const { destinationId } = useLocalSearchParams();
  const { completedTasks } = useAppState();
  const [destination, setDestination] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    // Load destination data
    const loadDestinations = async () => {
      try {
        const worldMapData = require('@/assets/images/world-map.json');
        setDestinations(worldMapData.destinations);
        
        if (destinationId) {
          const selected = worldMapData.destinations.find(
            (dest) => dest.id === destinationId
          );
          setDestination(selected);
        } else if (worldMapData.destinations.length > 0) {
          setDestination(worldMapData.destinations[0]);
        }
      } catch (error) {
        console.error('Failed to load destinations:', error);
      }
    };

    loadDestinations();
  }, [destinationId]);

  const handleDestinationChange = (newDestination) => {
    setDestination(newDestination);
  };

  const getTaskCompletion = (destinationId) => {
    const destTasks = completedTasks[destinationId] || [];
    // Assuming each destination has 5 tasks
    return Math.round((destTasks.length / 5) * 100);
  };

  if (!destination) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['#FF69B4', '#4FACFE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerEmoji}>✈️</Text>
        <Text style={styles.headerTitle}>Seyahat Rotaları</Text>
          <Text style={styles.headerSubtitle}>Harika bir maceraya hazır mısın?</Text>
        </View>
        
        <View style={styles.destinationsCarousel}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
          >
            {destinations.map((dest) => (
              <TouchableOpacity
                key={dest.id}
                style={[
                  styles.destinationButton,
                  destination.id === dest.id && styles.activeDestinationButton
                ]}
                onPress={() => handleDestinationChange(dest)}
              >
                <Text style={styles.destinationEmoji}>
                  {dest.name.includes('Türkiye') ? '🇹🇷' :
                   dest.name.includes('İtalya') ? '🇮🇹' :
                   dest.name.includes('Fransa') ? '🇫🇷' :
                   dest.name.includes('İspanya') ? '🇪🇸' :
                   dest.name.includes('Japonya') ? '🇯🇵' :
                   '🌍'}
                </Text>
                <Text style={[
                  styles.destinationButtonText,
                  destination.id === dest.id && styles.activeDestinationButtonText
                ]}>
                  {dest.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.destinationHeader}>
          <Text style={styles.destinationName}>{destination.name}</Text>
          <View style={styles.destinationMeta}>
            <View style={styles.metaItem}>
              <Text style={styles.metaEmoji}>🗺️</Text>
              <Text style={styles.metaText}>{destination.continent}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaEmoji}>🏛️</Text>
              <Text style={styles.metaText}>{destination.capital}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressBarFill, 
              { width: `${getTaskCompletion(destination.id)}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
            {getTaskCompletion(destination.id) === 100 ? '🎉 Harika! Tüm görevleri tamamladın!' :
             getTaskCompletion(destination.id) > 50 ? '🚀 Çok iyi gidiyorsun!' :
             getTaskCompletion(destination.id) > 0 ? '💪 Devam et!' :
             '🌟 Maceraya başla!'}
        </Text>
        </View>
      </LinearGradient>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'details' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('details')}
        >
          <Text style={styles.tabEmoji}>📚</Text>
          <Text style={[
            styles.tabButtonText,
            activeTab === 'details' && styles.activeTabButtonText
          ]}>
            Detaylar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'tasks' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('tasks')}
        >
          <Text style={styles.tabEmoji}>✅</Text>
          <Text style={[
            styles.tabButtonText,
            activeTab === 'tasks' && styles.activeTabButtonText
          ]}>
            Görevler
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {activeTab === 'details' ? (
          <DestinationDetails destination={destination} />
        ) : (
          <TaskList destination={destination} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'BubblegumSans',
    fontSize: 24,
    color: '#666',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 10,
  },
  headerEmoji: {
    fontSize: 32,
    marginBottom: 5,
  },
  headerTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  destinationsCarousel: {
    marginBottom: 10,
  },
  destinationButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  activeDestinationButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    transform: [{ scale: 1.05 }],
  },
  destinationButtonText: {
    fontFamily: 'BubblegumSans',
    fontSize: 14,
    color: '#FFFFFF',
  },
  activeDestinationButtonText: {
    color: '#4FACFE',
  },
  destinationEmoji: {
    fontSize: 20,
    marginBottom: 3,
  },
  destinationHeader: {
    marginBottom: 10,
  },
  destinationName: {
    fontFamily: 'BubblegumSans',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  destinationMeta: {
    flexDirection: 'row',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  metaEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  metaText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  progressText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 5,
    textAlign: 'right',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#4FACFE',
    transform: [{ scale: 1.05 }],
  },
  tabButtonText: {
    fontFamily: 'BubblegumSans',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  activeTabButtonText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
  },
  tabEmoji: {
    fontSize: 18,
    marginBottom: 3,
  },
});