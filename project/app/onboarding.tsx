import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions, Animated } from 'react-native';
import { router } from 'expo-router';
import { Check, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppState } from '@/context/AppStateContext';
import AvatarCustomization from '@/components/onboarding/AvatarCustomization';
import EquipmentSelection from '@/components/onboarding/EquipmentSelection';
import VehicleSelection from '@/components/onboarding/VehicleSelection';
import ExplorerCertificate from '@/components/onboarding/ExplorerCertificate';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const { setFirstTime, setAvatar, setEquipment, setVehicle } = useAppState();
  const [currentStep, setCurrentStep] = useState(0);
  const [avatar, setAvatarLocal] = useState({
    selectedAvatar: 0,
  });
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState(0);
  const [scaleAnim] = useState(new Animated.Value(1));

  const steps = [
    {
      title: 'Kaşif Olmaya Hazır mısın? 🌟',
      description: 'Harika bir maceraya başlamak üzeresin! Önce kendi kaşif karakterini yarat!',
      component: <AvatarCustomization 
        avatar={avatar} 
        onAvatarChange={setAvatarLocal} 
      />,
    },
    {
      title: 'Ekipmanlarını Seç 🎒',
      description: 'Bir kaşifin en önemli arkadaşları ekipmanlarıdır. Senin en sevdiğin ekipmanları seç!',
      component: <EquipmentSelection 
        selectedEquipment={selectedEquipment} 
        onEquipmentChange={setSelectedEquipment} 
      />,
    },
    {
      title: 'Aracını Seç 🚀',
      description: 'Dünyayı keşfetmek için harika bir araç seç! Uçmak mı, yüzmek mi, yoksa koşmak mı istersin?',
      component: <VehicleSelection 
        selectedVehicle={selectedVehicle} 
        onVehicleChange={setSelectedVehicle} 
      />,
    },
    {
      title: 'Kaşif Sertifikan Hazır! 🎉',
      description: 'Tebrikler! Artık resmi bir Dünya Kaşifisin! Maceraya başlamaya hazır mısın?',
      component: <ExplorerCertificate 
        avatar={avatar} 
      />,
    },
  ];

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const nextStep = () => {
    animateButton();
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save all settings and navigate to main app
      setAvatar(avatar);
      setEquipment(selectedEquipment);
      setVehicle(selectedVehicle);
      setFirstTime(false);
      router.replace('/(tabs)');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <LinearGradient
      colors={['#FF9A8B', '#FF6A88', '#FF8E53']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.stepsContainer}>
        {steps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.stepIndicator,
              currentStep >= index ? styles.activeStep : styles.inactiveStep,
            ]}
          >
            {currentStep > index && (
              <Sparkles size={12} color="#FF6A88" />
            )}
          </View>
        ))}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{steps[currentStep].title}</Text>
        <Text style={styles.description}>{steps[currentStep].description}</Text>
        
        <View style={styles.componentContainer}>
          {steps[currentStep].component}
        </View>
        
        <View style={styles.navigationButtons}>
          {currentStep > 0 && (
            <TouchableOpacity
              style={[styles.navButton, styles.backButton]}
              onPress={prevStep}
            >
              <ChevronLeft color="#FFFFFF" size={24} />
              <Text style={styles.navButtonText}>Geri</Text>
            </TouchableOpacity>
          )}
          
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={nextStep}
          >
            <Text style={styles.navButtonText}>
                {currentStep === steps.length - 1 ? 'Maceralara Başla! 🚀' : 'İlerle ✨'}
            </Text>
            <ChevronRight color="#FFFFFF" size={24} />
          </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  stepIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeStep: {
    backgroundColor: '#FFFFFF',
  },
  inactiveStep: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: 'BubblegumSans_400Regular',
    fontSize: 25,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  description: {
    fontFamily: 'BubblegumSans_400Regular',
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  componentContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 25,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  nextButton: {
    backgroundColor: '#FF6A88',
    borderWidth: 2,
    borderColor: '#FF8E53',
  },
  navButtonText: {
    fontFamily: 'BubblegumSans_400Regular',
    fontSize: 18,
    color: '#FFFFFF',
    marginHorizontal: 8,
  },
});