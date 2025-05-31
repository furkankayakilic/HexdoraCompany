import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AVATAR_OPTIONS = [
  { id: 0, image: require('@/assets/images/avatar1.png'), name: 'Küçük Kaşif' },
  { id: 1, image: require('@/assets/images/avatar2.png'), name: 'Macera Perisi' },
  { id: 2, image: require('@/assets/images/avatar3.png'), name: 'Süper Kahraman' },
  { id: 3, image: require('@/assets/images/avatar4.png'), name: 'Uzay Yolcusu' },
];

interface AvatarCustomizationProps {
  avatar: {
    selectedAvatar: number;
  };
  onAvatarChange: (newAvatar: {
    selectedAvatar: number;
  }) => void;
}

export default function AvatarCustomization({ avatar, onAvatarChange }: AvatarCustomizationProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarGrid}>
        {AVATAR_OPTIONS.map((option) => (
              <TouchableOpacity
            key={option.id}
            style={[
              styles.avatarContainer,
              avatar.selectedAvatar === option.id && styles.selectedAvatarContainer
            ]}
            onPress={() => onAvatarChange({ selectedAvatar: option.id })}
              >
            <Image
              source={option.image}
              style={styles.avatarImage}
              resizeMode="contain"
            />
            <Text style={styles.avatarName}>{option.name}</Text>
            {avatar.selectedAvatar === option.id && (
              <View style={styles.checkBadge}>
                <Sparkles size={20} color="#FFFFFF" />
              </View>
            )}
              </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 10,
  },
  avatarContainer: {
    width: 130,
    height: 170,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedAvatarContainer: {
    backgroundColor: '#FFF',
    borderWidth: 3,
    borderColor: '#FF6A88',
    transform: [{ scale: 1.05 }],
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarName: {
    fontFamily: 'BubblegumSans_400Regular',
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  checkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
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