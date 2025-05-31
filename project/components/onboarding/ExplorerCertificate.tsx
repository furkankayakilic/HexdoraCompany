import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, Animated } from 'react-native';
import { Award } from 'lucide-react-native';

const AVATAR_IMAGES = {
  0: require('@/assets/images/avatar1.png'),
  1: require('@/assets/images/avatar2.png'),
  2: require('@/assets/images/avatar3.png'),
  3: require('@/assets/images/avatar4.png'),
};

interface ExplorerCertificateProps {
  avatar: {
    selectedAvatar: number;
  };
}

export default function ExplorerCertificate({ avatar }: ExplorerCertificateProps) {
  const fadeAnim = new Animated.Value(0);
  
  useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
    }).start();
  }, []);
  
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.certificateWrapper}>
        {/* Süslemeler */}
        <Text style={styles.cornerEmojiTopLeft}>🎈</Text>
        <Text style={styles.cornerEmojiTopRight}>⭐</Text>
        <Text style={styles.cornerEmojiBottomLeft}>🌍</Text>
        <Text style={styles.cornerEmojiBottomRight}>🎉</Text>
        <View style={styles.certificate}>
          <View style={styles.header}>
            <Award size={40} color="#FFB347" />
            <Text style={styles.title}>Kaşif Sertifikası</Text>
        </View>
          <View style={styles.avatarBadge}>
            <View style={styles.avatarGlow} />
            <Image
              source={AVATAR_IMAGES[avatar.selectedAvatar as keyof typeof AVATAR_IMAGES]}
              style={styles.avatar}
              resizeMode="contain"
            />
            <Text style={styles.badgeText}>Dünya Kaşifi</Text>
          </View>
          <Text style={styles.message}>
            🎊 Tebrikler! Artık resmi bir <Text style={styles.highlight}>Dünya Kaşifisin!</Text> 🌟
          </Text>
        </View>
        </View>
      </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E0F7FA',
  },
  certificateWrapper: {
    borderWidth: 6,
    borderColor: '#FFB347',
    borderRadius: 32,
    backgroundColor: '#FFFDF7',
    padding: 10,
    position: 'relative',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#FFB347',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  certificate: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontFamily: 'BubblegumSans_400Regular',
    fontSize: 30,
    color: '#FF6A88',
    marginLeft: 12,
    textShadowColor: '#FFB347',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  avatarBadge: {
    alignItems: 'center',
    marginBottom: 18,
    position: 'relative',
  },
  avatarGlow: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderRadius: 60,
    backgroundColor: '#FFB34733',
    zIndex: 0,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FF6A88',
    backgroundColor: '#FFF',
    zIndex: 1,
  },
  badgeText: {
    marginTop: 10,
    fontFamily: 'BubblegumSans_400Regular',
    fontSize: 18,
    color: '#43E97B',
    backgroundColor: '#FFF',
    paddingHorizontal: 18,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#43E97B',
    overflow: 'hidden',
    shadowColor: '#43E97B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  message: {
    fontFamily: 'BubblegumSans_400Regular',
    fontSize: 20,
    color: '#FF6A88',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 4,
  },
  highlight: {
    color: '#FFB347',
    fontWeight: 'bold',
  },
  cornerEmojiTopLeft: {
    position: 'absolute',
    top: -18,
    left: -10,
    fontSize: 32,
    zIndex: 10,
  },
  cornerEmojiTopRight: {
    position: 'absolute',
    top: -18,
    right: -10,
    fontSize: 32,
    zIndex: 10,
  },
  cornerEmojiBottomLeft: {
    position: 'absolute',
    bottom: -18,
    left: -10,
    fontSize: 32,
    zIndex: 10,
  },
  cornerEmojiBottomRight: {
    position: 'absolute',
    bottom: -18,
    right: -10,
    fontSize: 32,
    zIndex: 10,
  },
});