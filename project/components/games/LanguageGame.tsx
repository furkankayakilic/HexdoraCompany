import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Animated } from 'react-native';
import { Volume as VolumeUp, Check, X } from 'lucide-react-native';
import { useAppState } from '@/context/AppStateContext';

type LanguageWord = {
  original: string;
  translation: string;
};

export default function LanguageGame() {
  const [currentDestination, setCurrentDestination] = useState(null);
  const [words, setWords] = useState<LanguageWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { completeTask } = useAppState();
  
  const fadeAnim = new Animated.Value(1);
  
  // Load destination data
  const worldMapData = require('@/assets/images/world-map.json');
  const destinations = worldMapData.destinations;
  
  useEffect(() => {
    // Select a random destination
    const randomDestIndex = Math.floor(Math.random() * destinations.length);
    const destination = destinations[randomDestIndex];
    setCurrentDestination(destination);
    
    // Create word pairs from the destination's greetings
    const wordPairs = Object.entries(destination.greetings).map(([key, value]) => ({
      original: key === 'hello' ? 'Merhaba' : 
              key === 'goodbye' ? 'Hoşçakal' : 'Teşekkürler',
      translation: value as string,
    }));
    
    setWords(wordPairs);
    prepareQuestion(0, wordPairs, destination);
  }, []);
  
  const prepareQuestion = (index: number, wordList: LanguageWord[], destination) => {
    if (index >= wordList.length) {
      setGameComplete(true);
      completeTask(destination.id, 'language');
      return;
    }
    
    // Get the correct answer
    const correctAnswer = wordList[index].translation;
    
    // Generate 3 wrong options
    const wrongOptions = [];
    const allTranslations = destinations.flatMap(
      dest => Object.values(dest.greetings)
    ).filter(word => word !== correctAnswer);
    
    while (wrongOptions.length < 3 && allTranslations.length > 0) {
      const randomIndex = Math.floor(Math.random() * allTranslations.length);
      const option = allTranslations.splice(randomIndex, 1)[0];
      if (!wrongOptions.includes(option)) {
        wrongOptions.push(option);
      }
    }
    
    // Combine correct and wrong options and shuffle
    const allOptions = [correctAnswer, ...wrongOptions];
    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }
    
    setOptions(allOptions);
    setCurrentWordIndex(index);
    setSelectedOption(null);
  };
  
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    
    const isCorrect = option === words[currentWordIndex].translation;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowResults(true);
    
    // Wait and proceed to next question
    setTimeout(() => {
      fadeOut(() => {
        setShowResults(false);
        prepareQuestion(currentWordIndex + 1, words, currentDestination);
        fadeIn();
      });
    }, 1500);
  };
  
  const fadeOut = (callback: () => void) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(callback);
  };
  
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  
  const playSound = () => {
    // In a real app, this would play the pronunciation
    console.log('Playing pronunciation');
  };
  
  if (!currentDestination || words.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }
  
  if (gameComplete) {
    return (
      <View style={styles.container}>
        <View style={styles.gameCompleteCard}>
          <Text style={styles.gameCompleteTitle}>Tebrikler!</Text>
          <Text style={styles.gameCompleteScore}>
            Skorun: {score}/{words.length}
          </Text>
          <Text style={styles.gameCompleteMessage}>
            {currentDestination.name} dilindeki tüm kelimeleri öğrendin!
          </Text>
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.gameHeader}>
        <Text style={styles.languageTitle}>
          {currentDestination.name} Dili
        </Text>
        <Text style={styles.scoreText}>
          Skor: {score}/{words.length}
        </Text>
      </View>
      
      <Animated.View 
        style={[styles.gameContent, { opacity: fadeAnim }]}
      >
        <View style={styles.wordCard}>
          <Text style={styles.wordPrompt}>
            "{words[currentWordIndex].original}" nasıl denir?
          </Text>
          <TouchableOpacity
            style={styles.soundButton}
            onPress={playSound}
          >
            <VolumeUp size={24} color="#6A48F6" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.optionsContainer}>
          {options.map((option, index) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === words[currentWordIndex].translation;
            let optionStyle = styles.optionButton;
            let textStyle = styles.optionText;
            
            if (showResults) {
              if (isCorrect) {
                optionStyle = styles.correctOption;
                textStyle = styles.correctOptionText;
              } else if (isSelected && !isCorrect) {
                optionStyle = styles.incorrectOption;
                textStyle = styles.incorrectOptionText;
              }
            } else if (isSelected) {
              optionStyle = styles.selectedOption;
            }
            
            return (
              <TouchableOpacity
                key={index}
                style={[styles.optionButton, optionStyle]}
                onPress={() => !showResults && handleOptionSelect(option)}
                disabled={showResults}
              >
                <Text style={[styles.optionText, textStyle]}>
                  {option}
                </Text>
                
                {showResults && isCorrect && (
                  <View style={styles.resultIcon}>
                    <Check size={16} color="#FFFFFF" />
                  </View>
                )}
                
                {showResults && isSelected && !isCorrect && (
                  <View style={[styles.resultIcon, styles.incorrectIcon]}>
                    <X size={16} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  loadingText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  languageTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 22,
    color: '#333',
  },
  scoreText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#6A48F6',
  },
  gameContent: {
    flex: 1,
  },
  wordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  wordPrompt: {
    fontFamily: 'BubblegumSans',
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  soundButton: {
    backgroundColor: '#F0F0FF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    flex: 1,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#F0F0FF',
    borderColor: '#6A48F6',
    borderWidth: 2,
  },
  correctOption: {
    backgroundColor: '#F0FFF0',
    borderColor: '#43E97B',
    borderWidth: 2,
  },
  incorrectOption: {
    backgroundColor: '#FFF0F0',
    borderColor: '#FF6A88',
    borderWidth: 2,
  },
  optionText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#333',
  },
  correctOptionText: {
    color: '#43E97B',
  },
  incorrectOptionText: {
    color: '#FF6A88',
  },
  resultIcon: {
    backgroundColor: '#43E97B',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  incorrectIcon: {
    backgroundColor: '#FF6A88',
  },
  gameCompleteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  gameCompleteTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 30,
    color: '#6A48F6',
    marginBottom: 15,
  },
  gameCompleteScore: {
    fontFamily: 'BubblegumSans',
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
  },
  gameCompleteMessage: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});