import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const generateSimpleProblem = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const isAddition = Math.random() > 0.5;
  const operation = isAddition ? '+' : '-';
  const answer = isAddition ? num1 + num2 : num1 - num2;
  // Cevap negatif olmasın
  if (!isAddition && answer < 0) return generateSimpleProblem();
  return { num1, num2, operation, answer };
};

const generateOptions = (answer: number) => {
  const options = [answer];
  while (options.length < 4) {
    const offset = Math.floor(Math.random() * 5) + 1;
    const option = Math.random() > 0.5 ? answer + offset : answer - offset;
    if (!options.includes(option) && option >= 0) {
      options.push(option);
    }
  }
  return options.sort(() => Math.random() - 0.5);
};

export default function MathGame() {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(() => generateSimpleProblem());
  const [options, setOptions] = useState(() => generateOptions(question.answer));
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [questionCount, setQuestionCount] = useState(1);

  const nextQuestion = () => {
    const newQ = generateSimpleProblem();
    setQuestion(newQ);
    setOptions(generateOptions(newQ.answer));
    setSelected(null);
    setFeedback('');
    setQuestionCount((prev) => prev + 1);
  };

  const handleSelect = (option: number) => {
    setSelected(option);
    if (option === question.answer) {
      setScore((prev) => prev + 1);
      setFeedback('Tebrikler! 🎉');
    } else {
      setFeedback('Yanlış! Doğru cevap: ' + question.answer);
    }
    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#43E97B', '#38F9D7']} style={styles.header}>
        <Text style={styles.headerTitle}>Matematik Oyunu</Text>
        <Text style={styles.headerSubtitle}>Soru {questionCount} | Puan: {score}</Text>
      </LinearGradient>
      <View style={styles.problemContainer}>
        <Text style={styles.problemText}>
          {question.num1} {question.operation} {question.num2} = ?
        </Text>
      </View>
      <View style={styles.optionsContainer}>
        {options.map((option, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.optionButton,
              selected === option && (option === question.answer ? styles.correct : styles.incorrect),
            ]}
            onPress={() => handleSelect(option)}
            disabled={!!selected}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {!!feedback && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackText}>{feedback}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  header: {
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 28,
    color: '#fff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  problemContainer: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: 'center',
  },
  problemText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 36,
    color: '#333',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  optionButton: {
    width: (width - 80) / 2,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  optionText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 24,
    color: '#333',
  },
  correct: {
    borderColor: '#43E97B',
    backgroundColor: '#F0FFF4',
  },
  incorrect: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF0F0',
  },
  feedbackContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  feedbackText: {
    fontFamily: 'BubblegumSans',
    fontSize: 22,
    color: '#6A48F6',
    textAlign: 'center',
  },
}); 