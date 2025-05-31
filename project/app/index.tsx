import { useEffect } from 'react';
import { StyleSheet, View, Text, Image, Animated, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Plane, MapPin, Globe } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppState } from '@/context/AppStateContext';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const { isFirstTime } = useAppState();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Basitleştirilmiş animasyon
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      if (isFirstTime) {
        router.replace('/onboarding');
      } else {
        router.replace('/(tabs)');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isFirstTime]);

  return (
    <LinearGradient
      colors={['#4FACFE', '#00F2FE', '#6A48F6']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Globe size={120} color="#FFF" strokeWidth={1.5} />
          <Text style={styles.title}>
            Dünya Kaşifi
          </Text>
          <Text style={styles.subtitle}>
            Kaşif Akademisi
          </Text>
        </View>

        <View style={styles.iconRow}>
          <View style={styles.iconContainer}>
            <Plane color="#FFF" size={28} />
          </View>
          <View style={styles.iconContainer}>
            <MapPin color="#FFF" size={28} />
          </View>
          <View style={styles.iconContainer}>
            <Globe color="#FFF" size={28} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontFamily: 'System',  // Geçici olarak sistem fontunu kullanıyoruz
    fontSize: 52,
    color: '#FFFFFF',
    marginTop: 25,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontWeight: 'bold',
  },
  subtitle: {
    fontFamily: 'System',  // Geçici olarak sistem fontunu kullanıyoruz
    fontSize: 28,
    color: '#FFFFFF',
    marginTop: 12,
    opacity: 0.95,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontWeight: '600',
  },
  iconRow: {
    flexDirection: 'row',
    width: width * 0.6,
    justifyContent: 'space-around',
    marginTop: 40,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});