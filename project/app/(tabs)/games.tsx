import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Dimensions, ColorValue, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Lock, Star } from 'lucide-react-native';
import { useAppState } from '@/context/AppStateContext';
import ARLandmarkGame from '@/components/games/ARLandmarkGame';
import LanguageGame from '@/components/games/LanguageGame';
import CloudPaintingGame from '@/components/games/CloudPaintingGame';
import MathGame from '@/components/games/mathgame';
import CountryQuiz from '@/components/games/CountryQuiz';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

interface Game {
  id: string;
  title: string;
  description: string;
  color: [string, string];
  locked: boolean;
  component?: React.ReactNode;
}

const AVATAR_IMAGES = {
  0: require('@/assets/images/avatar1.png'),
  1: require('@/assets/images/avatar2.png'),
  2: require('@/assets/images/avatar3.png'),
  3: require('@/assets/images/avatar4.png'),
};

export default function GamesScreen() {
  const { completedTasks, avatar } = useAppState();
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const scaleAnim = useState(new Animated.Value(1))[0];

  // Calculate total progress across all destinations
  const calculateTotalProgress = () => {
    const totalTasks = Object.values(completedTasks).reduce(
      (sum, tasks) => sum + tasks.length, 0
    );
    // Assuming there are 25 total tasks (5 per destination, 5 destinations)
    return Math.round((totalTasks / 25) * 100);
  };

  const games: Game[] = [
    {
      id: 'landmarks',
      title: 'AR Landmark Keşfi',
      description: 'Dünyanın meşhur yerlerini AR ile keşfet!',
      color: ['#6A48F6', '#9172FC'],
      locked: false,
      component: <ARLandmarkGame />
    },
    {
      id: 'language',
      title: 'Dil Öğrenme Oyunu',
      description: 'Farklı dillerde yeni kelimeler öğren!',
      color: ['#FE5F75', '#FC9EC6'],
      locked: false,
      component: <LanguageGame />
    },
    {
      id: 'country_quiz',
      title: 'Ülke Bilgi Yarışması',
      description: 'Ülkeler hakkında bilgini test et!',
      color: ['#FFB347', '#FFCC33'],
      locked: false,
      component: <CountryQuiz />
    },
    {
      id: 'clouds',
      title: 'Bulut Boyama',
      description: 'Gökyüzündeki bulutları boya ve şekillendir!',
      color: ['#4FACFE', '#00F2FE'] as [string, string],
      locked: calculateTotalProgress() < 20, // Locked until 20% progress
      component: <CloudPaintingGame />
    },
    {
      id: 'math',
      title: 'Matematik Macerası',
      description: 'Uçuş sırasında matematik bilgini test et!',
      color: ['#43E97B', '#38F9D7'] as [string, string],
      locked: calculateTotalProgress() < 40, // Locked until 40% progress
      component: <MathGame />,
    },
  ];

  const handlePressIn = (index: number) => {
    setPressedIndex(index);
    Animated.spring(scaleAnim, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = () => {
    setPressedIndex(null);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {activeGame ? (
        <View style={styles.gameContainer}>
          <View style={styles.gameHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setActiveGame(null)}
            >
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
            <Text style={styles.gameTitle}>{activeGame.title}</Text>
          </View>
          <View style={styles.gameContent}>
            {activeGame.component}
          </View>
        </View>
      ) : (
        <>
          <LinearGradient
            colors={['#6A48F6', '#FC9EC6', '#4FACFE'] as [string, string, string]}
            style={styles.header}
          >
            <Text style={styles.headerTitle}>Eğitici Oyunlar</Text>
            <Text style={styles.headerSubtitle}>
              Eğlenceli oyunlarla dünyayı öğren!
            </Text>
          </LinearGradient>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{calculateTotalProgress()}%</Text>
              <Text style={styles.statLabel}>Genel İlerleme</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{
                Object.values(completedTasks).reduce((sum, tasks) => sum + tasks.length, 0)
              }</Text>
              <Text style={styles.statLabel}>Tamamlanan Görev</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{
                games.filter(game => !game.locked).length
              }</Text>
              <Text style={styles.statLabel}>Açık Oyun</Text>
            </View>
          </View>

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
                Hangi oyunu oynamak istersin? 🎲
              </Text>
            </View>
          </View>

          <ScrollView 
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.gamesScrollContainer}
            decelerationRate="fast"
            snapToInterval={CARD_WIDTH + 20}
            snapToAlignment="center"
          >
            {games.map((game, idx) => (
              <Animated.View
                key={game.id}
                style={[
                  styles.animatedCard,
                  pressedIndex === idx && { transform: [{ scale: scaleAnim }] }
                ]}
              >
                <TouchableOpacity
                  onPressIn={() => handlePressIn(idx)}
                  onPressOut={handlePressOut}
                  onPress={() => !game.locked && setActiveGame(game)}
                  activeOpacity={game.locked ? 1 : 0.7}
                >
                  <LinearGradient
                    colors={game.color}
                    style={[
                      styles.gameCard,
                      game.locked && styles.lockedGameCard
                    ]}
                  >
                    {game.locked && (
                      <View style={styles.lockOverlay}>
                        <Lock size={40} color="#FFFFFF" />
                        <Text style={styles.lockText}>
                          Daha fazla görev tamamla!
                        </Text>
                      </View>
                    )}
                    <View style={styles.gameCardContent}>
                      <Text style={styles.gameCardEmoji}>🧩</Text>
                      <Text style={styles.gameCardTitle}>{game.title}</Text>
                      <Text style={styles.gameCardDescription}>
                        {game.description}
                      </Text>
                      {!game.locked && (
                        <View style={styles.playButton}>
                          <Play size={24} color="#FFFFFF" />
                        </View>
                      )}
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>

          <View style={styles.dotsContainer}>
            {games.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === 0 && styles.activeDot
                ]}
              />
            ))}
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 28,
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontFamily: 'BubblegumSans',
    fontSize: 24,
    color: '#333',
  },
  statLabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: '#666',
  },
  gamesScrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  gameCard: {
    width: CARD_WIDTH,
    height: 200,
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  lockedGameCard: {
    opacity: 0.7,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  lockText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 10,
  },
  gameCardContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  gameCardTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 24,
    color: '#FFFFFF',
  },
  gameCardDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 20,
  },
  playButton: {
    alignSelf: 'flex-end',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDD',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#6A48F6',
    width: 20,
  },
  gameContainer: {
    flex: 1,
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#6A48F6',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  gameTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 20,
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
    marginRight: 50, // To center the text accounting for the close button
  },
  gameContent: {
    flex: 1,
  },
  animatedCard: {
    marginVertical: 10,
  },
  gameCardEmoji: {
    fontSize: 32,
    alignSelf: 'center',
    marginBottom: 8,
  },
  guideContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingHorizontal: 15,
    marginTop: 15,
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
});