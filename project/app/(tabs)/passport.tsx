import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Award, BookOpen, Bookmark, Check } from 'lucide-react-native';
import { useAppState } from '@/context/AppStateContext';
import { Destination } from '@/types';

const { width } = Dimensions.get('window');

const AVATAR_IMAGES = {
  0: require('@/assets/images/avatar1.png'),
  1: require('@/assets/images/avatar2.png'),
  2: require('@/assets/images/avatar3.png'),
  3: require('@/assets/images/avatar4.png'),
};

export default function PassportScreen() {
  const { avatar, completedTasks } = useAppState();
  const [activeTab, setActiveTab] = useState('passport');
  
  // Load destination data
  const worldMapData = require('@/assets/images/world-map.json');
  const destinations = worldMapData.destinations;
  
  // Calculate badges achieved
  const achievedBadges = destinations.filter((destination: Destination) => {
    const destTasks = completedTasks[destination.id] || [];
    return destTasks.length > 0; // Has at least one completed task
  });
  
  // Calculate learned languages
  const learnedLanguages = destinations.filter((destination: Destination) => {
    const destTasks = completedTasks[destination.id] || [];
    return destTasks.includes('language'); // Completed language task
  });

  // Create virtual passport data
  const passportData = {
    name: 'Dünya Kaşifi',
    issueDate: new Date().toLocaleDateString(),
    level: Math.min(Math.floor(Object.values(completedTasks).flat().length / 3) + 1, 10),
    stampCount: achievedBadges.length,
    countries: achievedBadges.length,
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['#FF69B4', '#4FACFE']}
        style={styles.header}
      >
        <Text style={styles.headerEmoji}>📚</Text>
        <Text style={styles.headerTitle}>Kaşif Pasaportu</Text>
        <Text style={styles.headerSubtitle}>
          Dünya yolculuğundaki maceralarını takip et! 🌍✨
        </Text>
      </LinearGradient>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'passport' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('passport')}
        >
          <Text style={styles.tabEmoji}>📖</Text>
          <Text style={[
            styles.tabButtonText,
            activeTab === 'passport' && styles.activeTabButtonText
          ]}>
            Pasaport
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'badges' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('badges')}
        >
          <Text style={styles.tabEmoji}>🏆</Text>
          <Text style={[
            styles.tabButtonText,
            activeTab === 'badges' && styles.activeTabButtonText
          ]}>
            Rozetler
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'languages' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('languages')}
        >
          <Text style={styles.tabEmoji}>🗣️</Text>
          <Text style={[
            styles.tabButtonText,
            activeTab === 'languages' && styles.activeTabButtonText
          ]}>
            Diller
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {activeTab === 'passport' && (
          <View style={styles.passportContainer}>
            <View style={styles.passportCover}>
              <Text style={styles.passportTitle}>DÜNYA KAŞİFİ</Text>
              <Text style={styles.passportTitle}>PASAPORTU</Text>
              <Text style={styles.passportSubtitle}>Kaşif Akademisi 🌟</Text>
              
              <View style={styles.passportPhotoContainer}>
                <Image
                  source={AVATAR_IMAGES[avatar.selectedAvatar as keyof typeof AVATAR_IMAGES]}
                  style={styles.passportPhoto}
                  resizeMode="contain"
                />
              </View>
              
              <Text style={styles.passportName}>{passportData.name}</Text>
              <Text style={styles.passportDetail}>
                🎯 Seviye: {passportData.level} - Süper Kaşif
              </Text>
              <Text style={styles.passportDetail}>
                🌍 Ziyaret: {passportData.countries} ülke
              </Text>
              <Text style={styles.passportDetail}>
                📅 Yayın Tarihi: {passportData.issueDate}
              </Text>
            </View>
            
            <View style={styles.passportStats}>
              <View style={styles.statItem}>
                <View style={styles.statCircle}>
                  <Text style={styles.statEmoji}>🎯</Text>
                  <Text style={styles.statValue}>{passportData.level}</Text>
                </View>
                <Text style={styles.statLabel}>Seviye</Text>
              </View>
              <View style={styles.statItem}>
                <View style={styles.statCircle}>
                  <Text style={styles.statEmoji}>🏆</Text>
                  <Text style={styles.statValue}>{passportData.stampCount}</Text>
                </View>
                <Text style={styles.statLabel}>Damga</Text>
              </View>
              <View style={styles.statItem}>
                <View style={styles.statCircle}>
                  <Text style={styles.statEmoji}>🗣️</Text>
                  <Text style={styles.statValue}>{learnedLanguages.length}</Text>
                </View>
                <Text style={styles.statLabel}>Dil</Text>
              </View>
            </View>
          </View>
        )}
        
        {activeTab === 'badges' && (
          <View style={styles.badgesContainer}>
            {destinations.map((destination: Destination) => {
              const hasCompleted = (completedTasks[destination.id] || []).length > 0;
              
              return (
                <View key={destination.id} style={styles.badgeCard}>
                  <View style={[
                    styles.badgeIcon,
                    hasCompleted ? styles.badgeIconCompleted : styles.badgeIconLocked
                  ]}>
                    <Text style={styles.badgeEmoji}>
                      {destination.name.includes('Türkiye') ? '🇹🇷' :
                       destination.name.includes('İtalya') ? '🇮🇹' :
                       destination.name.includes('Fransa') ? '🇫🇷' :
                       destination.name.includes('İspanya') ? '🇪🇸' :
                       destination.name.includes('Japonya') ? '🇯🇵' :
                       '🌍'}
                    </Text>
                    {hasCompleted && (
                      <View style={styles.badgeCheck}>
                        <Text style={styles.checkEmoji}>✨</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.badgeName}>
                    {destination.badge}
                  </Text>
                  <Text style={styles.badgeDescription}>
                    {hasCompleted 
                      ? `🎉 ${destination.name} keşfedildi!` 
                      : `🔒 ${destination.name} henüz keşfedilmedi.`
                    }
                  </Text>
                </View>
              );
            })}
          </View>
        )}
        
        {activeTab === 'languages' && (
          <View style={styles.languagesContainer}>
            {destinations.map((destination: Destination) => {
              const hasCompletedLanguage = (completedTasks[destination.id] || []).includes('language');
              
              return (
                <View key={destination.id} style={styles.languageCard}>
                  <View style={styles.languageHeader}>
                    <Text style={styles.languageEmoji}>
                      {destination.name.includes('Türkiye') ? '🇹🇷' :
                       destination.name.includes('İtalya') ? '🇮🇹' :
                       destination.name.includes('Fransa') ? '🇫🇷' :
                       destination.name.includes('İspanya') ? '🇪🇸' :
                       destination.name.includes('Japonya') ? '🇯🇵' :
                       '🌍'}
                    </Text>
                    <Text style={styles.languageTitle}>
                      {destination.name} Dili
                    </Text>
                  </View>
                  
                  <View style={styles.greetingsContainer}>
                    {(Object.entries(destination.greetings) as [string, string][]).map(([key, value]) => (
                      <View key={key} style={styles.greetingItem}>
                        <Text style={styles.greetingType}>
                          {key === 'hello' ? '👋 Merhaba' : 
                           key === 'goodbye' ? '👋 Hoşçakal' : 
                           '🙏 Teşekkürler'}:
                        </Text>
                        <Text style={[
                          styles.greetingText,
                          !hasCompletedLanguage && styles.greetingTextLocked
                        ]}>
                          {hasCompletedLanguage ? value : '🔒'}
                        </Text>
                      </View>
                    ))}
                  </View>
                  
                  <View style={[
                    styles.languageStatus,
                    hasCompletedLanguage 
                      ? styles.languageStatusComplete 
                      : styles.languageStatusIncomplete
                  ]}>
                    <Text style={styles.languageStatusText}>
                      {hasCompletedLanguage 
                        ? '🎉 Öğrenildi!' 
                        : '🔒 Henüz öğrenilmedi'
                      }
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
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
  header: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
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
    fontFamily: 'Nunito-Regular',
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.95,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
  },
  activeTabButton: {
    backgroundColor: '#4FACFE',
    shadowColor: '#4FACFE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  tabEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  tabButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: '#666',
  },
  activeTabButtonText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  passportContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  passportCover: {
    backgroundColor: '#4FACFE',
    padding: 25,
    alignItems: 'center',
    paddingBottom: 35,
    borderBottomWidth: 3,
    borderBottomColor: '#357ABD',
  },
  passportTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 28,
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  passportSubtitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.95,
    marginTop: 8,
    marginBottom: 25,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  passportPhotoContainer: {
    padding: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  passportPhoto: {
    width: 60,
    height: 140,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  passportName: {
    fontFamily: 'BubblegumSans',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  passportDetail: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  passportStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 25,
    backgroundColor: '#F8F8F8',
  },
  statItem: {
    alignItems: 'center',
  },
  statCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'BubblegumSans',
    fontSize: 24,
    color: '#4FACFE',
  },
  statLabel: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: '#666',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  badgeCard: {
    width: (width - 50) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  badgeIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  badgeEmoji: {
    fontSize: 40,
  },
  badgeIconCompleted: {
    backgroundColor: 'rgba(79, 172, 254, 0.1)',
    borderWidth: 2,
    borderColor: '#4FACFE',
  },
  badgeIconLocked: {
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  badgeCheck: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4FACFE',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  checkEmoji: {
    fontSize: 14,
  },
  badgeName: {
    fontFamily: 'BubblegumSans',
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 6,
  },
  badgeDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  languagesContainer: {
    marginBottom: 20,
  },
  languageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  languageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  languageEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  languageTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 24,
    color: '#333',
  },
  greetingsContainer: {
    marginBottom: 20,
  },
  greetingItem: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  greetingType: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: '#666',
    width: 110,
  },
  greetingText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    color: '#333',
  },
  greetingTextLocked: {
    color: '#CCC',
  },
  languageStatus: {
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  languageStatusComplete: {
    backgroundColor: 'rgba(79, 172, 254, 0.1)',
    borderWidth: 2,
    borderColor: '#4FACFE',
  },
  languageStatusIncomplete: {
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  languageStatusText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: '#4FACFE',
  },
});