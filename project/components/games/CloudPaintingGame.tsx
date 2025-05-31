import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PanResponder,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Eraser, RotateCcw, Star } from 'lucide-react-native';
import { useAppState } from '@/context/AppStateContext';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');
const CANVAS_PADDING = 20;
const CANVAS_WIDTH = width - CANVAS_PADDING * 2;
const CANVAS_HEIGHT = height * 0.6;

// Çocuklar için parlak ve canlı renkler
const COLORS = [
  '#FF6B6B', // Canlı Kırmızı
  '#4ECDC4', // Turkuaz
  '#FFE66D', // Parlak Sarı
  '#95E1D3', // Soft Yeşil
  '#FF8B8B', // Pembe
  '#A8E6CF', // Mint
  '#6A48F6', // Mor
  '#FFB347', // Turuncu
  '#B19CD9', // Lavanta
  '#98FB98', // Açık Yeşil
];

interface Point {
  x: number;
  y: number;
  color: string;
  size: number;
}

interface CloudPaintingGameProps {
  onComplete?: () => void;
  isCompleted?: boolean;
}

export default function CloudPaintingGame({ onComplete, isCompleted = false }: CloudPaintingGameProps) {
  const { updateProgress } = useAppState();
  const [points, setPoints] = useState<Point[]>([]);
  const [currentColor, setCurrentColor] = useState(COLORS[0]);
  const [brushSize, setBrushSize] = useState(25); // Daha büyük fırça
  const [isErasing, setIsErasing] = useState(false);
  const [showStars, setShowStars] = useState(false);
  
  const starAnimation = useRef(new Animated.Value(0)).current;
  const colorRef = useRef(currentColor);
  
  useEffect(() => { colorRef.current = currentColor; }, [currentColor]);

  const addPoint = (x: number, y: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPoints((currentPoints) => [
      ...currentPoints,
      {
        x,
        y,
        color: isErasing ? '#FFFFFF' : colorRef.current,
        size: isErasing ? brushSize * 2 : brushSize,
      },
    ]);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event) => {
        const { locationX, locationY } = event.nativeEvent;
        addPoint(locationX, locationY);
      },
      onPanResponderMove: (event) => {
        const { locationX, locationY } = event.nativeEvent;
        addPoint(locationX, locationY);
      },
    })
  ).current;

  const clearCanvas = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setPoints([]);
  };

  useEffect(() => {
    if (isCompleted) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setShowStars(true);
      
      // Yıldız animasyonu
      Animated.sequence([
        Animated.timing(starAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(starAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => setShowStars(false));
    }
  }, [isCompleted]);

  return (
    <SafeAreaView style={styles.safeContainer} edges={['bottom']}>
      <View style={styles.container}>
        <View style={styles.canvasContainer}>
          <Image
            source={require('@/assets/images/cloud-template.png')}
            style={styles.cloudTemplate}
            resizeMode="contain"
          />
          <View style={styles.canvas} {...panResponder.panHandlers}>
            {points.map((point, idx) => (
              <View
                key={idx}
                style={[
                  styles.point,
                  {
                    left: point.x - point.size / 2,
                    top: point.y - point.size / 2,
                    width: point.size,
                    height: point.size,
                    backgroundColor: point.color,
                    borderRadius: point.size / 2,
                  },
                ]}
              />
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
        </View>

        <View style={styles.toolbar}>
          <View style={styles.colorPicker}>
            {COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorButton,
                  {
                    backgroundColor: color,
                    borderWidth: currentColor === color && !isErasing ? 4 : 2,
                    borderColor: currentColor === color && !isErasing ? '#333' : '#DDD',
                    transform: [{ scale: currentColor === color && !isErasing ? 1.2 : 1 }],
                  },
                ]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setCurrentColor(color);
                  setIsErasing(false);
                }}
              />
            ))}
          </View>

          <View style={styles.tools}>
            <TouchableOpacity
              style={[styles.toolButton, isErasing && styles.activeToolButton]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                setIsErasing(!isErasing);
              }}
            >
              <Eraser size={32} color={isErasing ? '#6A48F6' : '#333'} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.toolButton} 
              onPress={clearCanvas}
            >
              <RotateCcw size={32} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    justifyContent: 'flex-start',
  },
  canvasContainer: {
    width: CANVAS_WIDTH,
    height: Math.min(CANVAS_HEIGHT, 400),
    marginHorizontal: CANVAS_PADDING,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginTop: 10,
  },
  cloudTemplate: {
    position: 'absolute',
    width: '110%',
    height: '100%',
    opacity: 0.2,
  },
  canvas: {
    flex: 1,
  },
  point: {
    position: 'absolute',
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
  toolbar: {
    padding: 20,
    marginTop: 20,
  },
  colorPicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 8,
    borderWidth: 2,
    borderColor: '#DDD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tools: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  toolButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  activeToolButton: {
    backgroundColor: '#E0F7FA',
    borderWidth: 2,
    borderColor: '#6A48F6',
  }
}); 