import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { RotateCcw, Star, Trophy } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useAppState } from '@/context/AppStateContext';

const { width } = Dimensions.get('window');

interface Question {
  country: string;
  emoji: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

const QUESTIONS: Question[] = [
  {
    country: 'Türkiye',
    emoji: '🇹🇷',
    question: 'Türkiye\'nin başkenti neresidir?',
    options: ['İstanbul', 'Ankara', 'İzmir', 'Bursa'],
    correctAnswer: 'Ankara'
  },
  {
    country: 'İtalya',
    emoji: '🇮🇹',
    question: 'İtalya\'nın şekli neye benzer?',
    options: ['Çizme', 'Üçgen', 'Daire', 'Kare'],
    correctAnswer: 'Çizme'
  },
  {
    country: 'Fransa',
    emoji: '🇫🇷',
    question: 'Fransa\'nın en ünlü kulesi hangisidir?',
    options: ['Pisa Kulesi', 'Eyfel Kulesi', 'Big Ben', 'Kız Kulesi'],
    correctAnswer: 'Eyfel Kulesi'
  },
  {
    country: 'İspanya',
    emoji: '🇪🇸',
    question: 'İspanya\'da en çok konuşulan dil hangisidir?',
    options: ['İngilizce', 'Fransızca', 'İspanyolca', 'Almanca'],
    correctAnswer: 'İspanyolca'
  },
  {
    country: 'Japonya',
    emoji: '🇯🇵',
    question: 'Japonya\'nın başkenti neresidir?',
    options: ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya'],
    correctAnswer: 'Tokyo'
  },
  {
    country: 'Brezilya',
    emoji: '🇧🇷',
    question: 'Brezilya\'nın en ünlü ormanı hangisidir?',
    options: ['Amazon Ormanı', 'Kara Orman', 'Sherwood Ormanı', 'Bambu Ormanı'],
    correctAnswer: 'Amazon Ormanı'
  }
];

export default function CountryQuiz() {
  const { updateProgress } = useAppState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showStars, setShowStars] = useState(false);
  
  const starAnimation = new Animated.Value(0);
  const shakeAnimation = new Animated.Value(0);

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setScore(prevScore => prevScore + 1);
      setShowStars(true);
      Animated.sequence([
        Animated.timing(starAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(starAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => setShowStars(false));
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }

    setTimeout(() => {
      if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
        updateProgress('country_quiz', 'completed');
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  if (showResult) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultContainer}>
          <Trophy size={80} color="#FFD700" />
          <Text style={styles.resultTitle}>Tebrikler!</Text>
          <Text style={styles.resultScore}>
            {score} / {QUESTIONS.length} doğru
          </Text>
          <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
            <RotateCcw size={24} color="#FFFFFF" />
            <Text style={styles.resetButtonText}>Tekrar Oyna</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ülke Bilgi Yarışması</Text>
        <Text style={styles.subtitle}>
          Soru {currentQuestionIndex + 1} / {QUESTIONS.length}
        </Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.countryEmoji}>{currentQuestion.emoji}</Text>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === option && styles.selectedOption,
              selectedAnswer && option === currentQuestion.correctAnswer && styles.correctOption,
              selectedAnswer && selectedAnswer === option && option !== currentQuestion.correctAnswer && styles.wrongOption,
            ]}
            onPress={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
          >
            <Text style={[
              styles.optionText,
              selectedAnswer === option && styles.selectedOptionText,
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {showStars && (
        <Animated.View
          style={[
            styles.starsContainer,
            {
              opacity: starAnimation,
              transform: [
                {
                  scale: starAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Star size={40} color="#FFD700" />
          <Star size={40} color="#FFD700" />
          <Star size={40} color="#FFD700" />
        </Animated.View>
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
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'BubblegumSans',
    fontSize: 28,
    color: '#333',
  },
  subtitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  questionContainer: {
    alignItems: 'center',
    padding: 20,
  },
  countryEmoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  questionText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    padding: 20,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedOption: {
    backgroundColor: '#6A48F6',
  },
  correctOption: {
    backgroundColor: '#4CAF50',
  },
  wrongOption: {
    backgroundColor: '#F44336',
  },
  optionText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  starsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 36,
    color: '#333',
    marginTop: 20,
  },
  resultScore: {
    fontFamily: 'Nunito-Bold',
    fontSize: 24,
    color: '#666',
    marginTop: 10,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6A48F6',
    padding: 15,
    borderRadius: 25,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resetButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
}); 