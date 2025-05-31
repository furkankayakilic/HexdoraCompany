import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Switch, TextInput, ScrollView } from 'react-native';
import { Clock, Lock, Bell, Eye, X } from 'lucide-react-native';

interface ParentalControlsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ParentalControlsModal({ visible, onClose }: ParentalControlsModalProps) {
  const [screenTimeLimit, setScreenTimeLimit] = useState(60); // minutes
  const [contentFiltering, setContentFiltering] = useState(true);
  const [parentalPassword, setParentalPassword] = useState('1234');
  const [parentalPin, setParentalPin] = useState('');
  const [showPinEntry, setShowPinEntry] = useState(false);
  
  const handleSave = () => {
    if (showPinEntry) {
      if (parentalPin === parentalPassword) {
        setShowPinEntry(false);
        onClose();
      } else {
        // In a real app, we would show an error message
        setParentalPin('');
      }
    } else {
      setShowPinEntry(true);
    }
  };
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Ebeveyn Kontrolleri</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <X size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          {showPinEntry ? (
            <View style={styles.pinEntryContainer}>
              <Lock size={40} color="#FF4081" />
              <Text style={styles.pinEntryTitle}>Ebeveyn PIN Kodu</Text>
              <Text style={styles.pinEntrySubtitle}>
                Ayarları kaydetmek için ebeveyn PIN kodunu girin
              </Text>
              
              <TextInput
                style={styles.pinInput}
                value={parentalPin}
                onChangeText={setParentalPin}
                keyboardType="number-pad"
                maxLength={4}
                secureTextEntry
                placeholder="PIN kodunu gir (örn: 1234)"
              />
              
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Onayla</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <ScrollView style={styles.modalContent}>
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Clock size={20} color="#FF4081" />
                    <Text style={styles.sectionTitle}>Ekran Süresi</Text>
                  </View>
                  
                  <View style={styles.settingItem}>
                    <View style={styles.settingLabel}>
                      <Text style={styles.settingTitle}>Günlük Limit</Text>
                      <Text style={styles.settingDescription}>
                        {screenTimeLimit} dakika
                      </Text>
                    </View>
                    <View style={styles.timeSliderContainer}>
                      {[30, 60, 90, 120].map((time) => (
                        <TouchableOpacity
                          key={time}
                          style={[
                            styles.timeOption,
                            screenTimeLimit === time && styles.selectedTimeOption
                          ]}
                          onPress={() => setScreenTimeLimit(time)}
                        >
                          <Text style={[
                            styles.timeOptionText,
                            screenTimeLimit === time && styles.selectedTimeOptionText
                          ]}>
                            {time}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>
                
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Bell size={20} color="#4CAF50" />
                    <Text style={styles.sectionTitle}>İçerik Kontrolü</Text>
                  </View>
                  
                  <View style={styles.settingItem}>
                    <View style={styles.settingLabel}>
                      <Text style={styles.settingTitle}>İçerik Filtreleme</Text>
                      <Text style={styles.settingDescription}>
                        Yaşa uygun içerik kontrolü
                      </Text>
                    </View>
                    <Switch
                      trackColor={{ false: '#E0E0E0', true: '#C8E6C9' }}
                      thumbColor={contentFiltering ? '#4CAF50' : '#F5F5F5'}
                      ios_backgroundColor="#E0E0E0"
                      onValueChange={setContentFiltering}
                      value={contentFiltering}
                    />
                  </View>
                </View>
                
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Lock size={20} color="#673AB7" />
                    <Text style={styles.sectionTitle}>Güvenlik</Text>
                  </View>
                  
                  <View style={styles.settingItem}>
                    <View style={styles.settingLabel}>
                      <Text style={styles.settingTitle}>Ebeveyn PIN Kodu</Text>
                      <Text style={styles.settingDescription}>
                        Ebeveyn kontrollerine erişim için PIN
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.changeButton}>
                      <Text style={styles.changeButtonText}>Değiştir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.infoCard}>
                  <Eye size={20} color="#333" />
                  <Text style={styles.infoText}>
                    Çocuğunuzun aktivitelerini ve öğrenme ilerlemesini ebeveyn panelinden takip edebilirsiniz.
                  </Text>
                </View>
              </ScrollView>
              
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Kaydet</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 22,
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  modalContent: {
    maxHeight: '70%',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 18,
    color: '#333',
    marginLeft: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingLabel: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  settingDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#666',
  },
  timeSliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeOption: {
    width: 40,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    marginLeft: 5,
    borderRadius: 5,
  },
  selectedTimeOption: {
    backgroundColor: '#FF4081',
  },
  timeOptionText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 12,
    color: '#666',
  },
  selectedTimeOptionText: {
    color: '#FFFFFF',
  },
  changeButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  changeButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#666',
  },
  infoCard: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#FF4081',
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  pinEntryContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  pinEntryTitle: {
    fontFamily: 'BubblegumSans',
    fontSize: 20,
    color: '#333',
    marginTop: 15,
    marginBottom: 5,
  },
  pinEntrySubtitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  pinInput: {
    width: '80%',
    height: 50,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});