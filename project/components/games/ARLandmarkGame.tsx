import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { Camera as CameraIcon, Compass, X } from 'lucide-react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useAppState } from '@/context/AppStateContext';

export default function ARLandmarkGame() {
  const [permission, requestPermission] = useCameraPermissions();
  const [selectedLandmark, setSelectedLandmark] = useState(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const { completeTask } = useAppState();
  
  // Load landmark data
  const worldMapData = require('@/assets/images/world-map.json');
  const destinations = worldMapData.destinations;
  
  // Flatten all landmarks into a single array
  const allLandmarks = destinations.reduce((acc, destination) => {
    return acc.concat(
      destination.landmarks.map(landmark => ({
        name: landmark,
        country: destination.name,
        destinationId: destination.id,
      }))
    );
  }, []);
  
  const [landmarks, setLandmarks] = useState(allLandmarks);
  
  // Select a random landmark when the component mounts
  useEffect(() => {
    if (landmarks.length > 0) {
      const randomIndex = Math.floor(Math.random() * landmarks.length);
      setSelectedLandmark(landmarks[randomIndex]);
    }
  }, []);
  
  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };
  
  const handleFoundLandmark = () => {
    if (selectedLandmark) {
      // Mark the task as completed
      completeTask(selectedLandmark.destinationId, 'landmark');
      
      // Remove the found landmark from the list
      setLandmarks(landmarks.filter(
        landmark => landmark.name !== selectedLandmark.name
      ));
      
      // Select another random landmark if available
      if (landmarks.length > 1) {
        let filteredLandmarks = landmarks.filter(
          landmark => landmark.name !== selectedLandmark.name
        );
        const randomIndex = Math.floor(Math.random() * filteredLandmarks.length);
        setSelectedLandmark(filteredLandmarks[randomIndex]);
      } else {
        setSelectedLandmark(null);
      }
    }
  };
  
  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Kamera izni kontrol ediliyor...</Text>
      </View>
    );
  }
  
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Kamera kullanarak ünlü yerleri keşfetmek için izin gerekiyor.
        </Text>
        <TouchableOpacity 
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>İzin Ver</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webContainer}>
        <View style={styles.webARSimulation}>
          <Text style={styles.webARTitle}>
            AR Simülasyonu
          </Text>
          
          {selectedLandmark ? (
            <View style={styles.webARContent}>
              <Text style={styles.targetText}>
                Hedef: {selectedLandmark.name}
              </Text>
              <Text style={styles.countryText}>
                Ülke: {selectedLandmark.country}
              </Text>
              
              <View style={styles.simulatedARView}>
                <View style={styles.simulatedLandmark}>
                  <Text style={styles.simulatedLandmarkText}>
                    {selectedLandmark.name.charAt(0)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.foundButton}
                  onPress={handleFoundLandmark}
                >
                  <Text style={styles.foundButtonText}>Buldum!</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text style={styles.completedText}>
              Tebrikler! Tüm hedefleri buldun!
            </Text>
          )}
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        {selectedLandmark && (
          <View style={styles.overlay}>
            <View style={styles.targetCard}>
              <Compass size={24} color="#FFFFFF" />
              <Text style={styles.targetText}>
                Bul: {selectedLandmark.name}
              </Text>
              <Text style={styles.countryText}>
                Ülke: {selectedLandmark.country}
              </Text>
            </View>
            
            <TouchableOpacity
              style={styles.foundButton}
              onPress={handleFoundLandmark}
            >
              <Text style={styles.foundButtonText}>Buldum!</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.flipButton}
              onPress={toggleCameraFacing}
            >
              <CameraIcon size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 20,
  },
  targetCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  targetText: {
    fontFamily: 'BubblegumSans',
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 10,
  },
  countryText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  foundButton: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: '#6A48F6',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  foundButtonText: {
    fontFamily: 'BubblegumSans',
    fontSize: 18,
    color: '#FFFFFF',
  },
  flipButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    margin: 20,
  },
  permissionButton: {
    backgroundColor: '#6A48F6',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
  },
  permissionButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  webContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  webARSimulation: {
    width: '90%',
    height: '90%',
    backgroundColor: '#333',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  webARTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 30,
  },
  webARContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  simulatedARView: {
    width: '100%',
    height: 300,
    backgroundColor: '#444',
    borderRadius: 15,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  simulatedLandmark: {
    width: 100,
    height: 100,
    backgroundColor: '#6A48F6',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  simulatedLandmarkText: {
    fontFamily: 'BubblegumSans',
    fontSize: 36,
    color: '#FFFFFF',
  },
  completedText: {
    fontFamily: 'BubblegumSans',
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});