import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Check, Camera, BookOpen, Globe, MapPin, Star } from 'lucide-react-native';
import { useAppState } from '@/context/AppStateContext';

interface Destination {
  id: string;
  name: string;
  // other properties
}

interface TaskListProps {
  destination: Destination;
}

const AVATAR_IMAGES = {
  0: require('@/assets/images/avatar1.png'),
  1: require('@/assets/images/avatar2.png'),
  2: require('@/assets/images/avatar3.png'),
  3: require('@/assets/images/avatar4.png'),
};

export default function TaskList({ destination }: TaskListProps) {
  const { completedTasks, completeTask, avatar } = useAppState();
  
  const destinationTasks = completedTasks[destination.id] || [];
  
  const tasks = [
    {
      id: 'landmark',
      title: 'Ünlü Yerleri Keşfet',
      description: 'AR ile ünlü yapıları incele! 🏛️',
      icon: MapPin,
      color: '#FF6A88',
      emoji: '🗺️',
      guideMessage: 'Harika yapıları AR ile keşfetmeye ne dersin? Çok eğlenceli olacak! 🏰',
    },
    {
      id: 'language',
      title: 'Dil Öğren',
      description: 'Basit kelimeleri ve selamlaşmaları öğren! 🗣️',
      icon: Globe,
      color: '#6A48F6',
      emoji: '🌍',
      guideMessage: 'Yeni bir dil öğrenmek her zaman eğlencelidir! Hadi başlayalım! 🎯',
    },
    {
      id: 'culture',
      title: 'Kültürü Tanı',
      description: 'Kültür hakkında bilgiler öğren! 📚',
      icon: BookOpen,
      color: '#43E97B',
      emoji: '🎭',
      guideMessage: 'Bu ülkenin kültürü çok ilginç! Hadi birlikte öğrenelim! 🌟',
    },
    {
      id: 'photo',
      title: 'Fotoğraf Çek',
      description: 'Anılarını ölümsüzleştir! 📸',
      icon: Camera,
      color: '#4FACFE',
      emoji: '📷',
      guideMessage: 'Güzel anılar için fotoğraf çekmeyi unutma! 📸',
    },
    {
      id: 'quiz',
      title: 'Bilgi Yarışması',
      description: 'Öğrendiklerini test et! 🎯',
      icon: Star,
      color: '#FFB347',
      emoji: '🎯',
      guideMessage: 'Öğrendiklerini test etme zamanı! Hazır mısın? 🎮',
    },
  ];
  
  const handleCompleteTask = (taskId: string) => {
    completeTask(destination.id, taskId);
  };
  
  return (
    <View style={styles.container}>
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
            {destination.name} için harika görevlerimiz var! Hadi başlayalım! 🚀
          </Text>
        </View>
      </View>

      {tasks.map((task) => {
        const isCompleted = destinationTasks.includes(task.id);
        const TaskIcon = task.icon;
        
        return (
          <TouchableOpacity
            key={task.id}
            style={[
              styles.taskCard,
              isCompleted && styles.completedTaskCard
            ]}
            onPress={() => !isCompleted && handleCompleteTask(task.id)}
            activeOpacity={isCompleted ? 1 : 0.7}
          >
            <View style={[
              styles.iconContainer,
              { backgroundColor: `${task.color}20` }
            ]}>
              <Text style={styles.emoji}>{task.emoji}</Text>
              <TaskIcon size={24} color={task.color} />
            </View>
            
            <View style={styles.taskDetails}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskDescription}>
                {task.description}
              </Text>
            </View>
            
            <View style={[
              styles.taskStatus,
              isCompleted ? styles.completedStatus : styles.pendingStatus
            ]}>
              {isCompleted ? (
                <View style={styles.completedContainer}>
                  <Text style={styles.completedEmoji}>🎉</Text>
                <Check size={20} color="#43E97B" />
                </View>
              ) : (
                <Text style={styles.pendingText}>Yapılacak</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  guideMessageContainer: {
    marginLeft: 80,
    marginBottom: 20,
  },
  guideMessageBubble: {
    backgroundColor: '#F8F8F8',
    borderRadius: 15,
    padding: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  guideMessageText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  completedTaskCard: {
    backgroundColor: '#F8F8F8',
    borderColor: '#43E97B',
    transform: [{ scale: 1.02 }],
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  emoji: {
    fontSize: 20,
    marginBottom: 2,
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 18,
    color: '#333',
    marginBottom: 4,
  },
  taskDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#666',
  },
  taskStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginLeft: 10,
  },
  completedStatus: {
    backgroundColor: '#43E97B20',
  },
  pendingStatus: {
    backgroundColor: '#F8F8F8',
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  pendingText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#666',
  },
});